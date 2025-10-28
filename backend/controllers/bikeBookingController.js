// controllers/bikeBookingController.js
import dotenv from "dotenv";
import BikeBooking from "../models/BikeBooking.js";
import Stripe from "stripe";
import nodemailer from "nodemailer";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = { from: process.env.EMAIL_USER, to, subject, text };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, message: info.response };
  } catch (error) {
    console.error("Email sending failed:", error.message);
    return { success: false, message: error.message };
  }
};

const formatDate = (date) => {
  try {
    return date ? new Date(date).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" }) : "N/A";
  } catch (error) {
    console.error("Error formatting date:", error.message);
    return "Invalid Date";
  }
};

// Helper: Calculate gear cost
const calculateGearUSD = (gear, days) => {
  if (!gear) return 0;
  return (
    (gear.helmet ? 45 : 0) +
    (gear.jacket ? 65 : 0) +
    (gear.gloves ? 25 : 0)
  ) * days;
};

// Helper: Calculate add-ons cost
const calculateAddOnsUSD = (addOns, days) => {
  if (!addOns) return 0;
  return (
    (addOns.excessReduction ? 32 : 0) +
    (addOns.tyreProtection ? 23 : 0) +
    (addOns.windscreen ? 10 : 0)
  ) * days;
};

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received file:", req.file);

    const {
      pickupDate, returnDate, pickupTime, returnTime, totalDays, bikeModel, bikePrice,
      gearOption, subGearOption, gear, addOns, riderDetails, emergencyContact,
      licenceValid, licenceNumber, licenceExpiry, licenceState, agreementAccepted, paymentOption,
    } = req.body;

    // Validation
    if (!pickupDate || !returnDate || !bikeModel || !agreementAccepted || !paymentOption) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!licenceNumber?.trim() || !licenceExpiry || !licenceState?.trim()) {
      return res.status(400).json({ message: "Licence details required" });
    }
    if (!["Yes", "No"].includes(licenceValid) || licenceValid === "No") {
      return res.status(400).json({ message: "Valid licence required" });
    }

    const licenceFile = req.file?.path;
    if (!licenceFile) return res.status(400).json({ message: "Licence file required" });

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Authentication required" });

    const riderDetailsObj = riderDetails ? JSON.parse(riderDetails) : {};
    if (!riderDetailsObj.email) return res.status(400).json({ message: "Email required" });

    // Parse JSON fields
    const gearObj = gear ? JSON.parse(gear) : {};
    const addOnsObj = addOns ? JSON.parse(addOns) : {};

    // Calculate costs
    const totalDaysNum = Number(totalDays) || 0;
    const bikeRentalUSD = Number(bikePrice) * totalDaysNum;

    const gearUSD =
      gearOption === "Bike hire + gear" && subGearOption === "Package Option - $100/day"
        ? 100.0 * totalDaysNum
        : gearOption === "Bike hire + gear" && subGearOption === "Individually"
        ? calculateGearUSD(gearObj, totalDaysNum)
        : 0;

    const addOnsUSD = calculateAddOnsUSD(addOnsObj, totalDaysNum);

    const subtotalUSD = bikeRentalUSD + gearUSD + addOnsUSD;
    const merchantFeeUSD = subtotalUSD * 0.015 + 0.02;
    const totalAmountUSD = subtotalUSD + merchantFeeUSD;
    const totalAmountCents = Math.round(totalAmountUSD * 100);

    // Save booking with breakdown
    const bikeBooking = new BikeBooking({
      userId,
      pickupDate: new Date(pickupDate),
      returnDate: new Date(returnDate),
      pickupTime,
      returnTime,
      totalDays: totalDaysNum,
      bikeModel,
      bikePrice: Number(bikePrice),
      gearOption,
      subGearOption,
      gear: gearObj,
      addOns: addOnsObj,
      riderDetails: riderDetailsObj,
      emergencyContact: emergencyContact ? JSON.parse(emergencyContact) : {},
      licenceDetails: {
        licenceValid,
        licenceNumber,
        licenceExpiry: new Date(licenceExpiry),
        licenceState,
        licenceFile,
      },
      agreementAccepted: Boolean(agreementAccepted),
      paymentOption,
      subtotalUSD: Number(subtotalUSD.toFixed(2)),
      merchantFeeUSD: Number(merchantFeeUSD.toFixed(2)),
      totalAmountUSD: Number(totalAmountUSD.toFixed(2)),
    });

    const savedBooking = await bikeBooking.save();
    console.log("Booking saved:", savedBooking._id);

    // Send emails
    const userEmailContent = `
      Dear ${riderDetailsObj.firstName || "Customer"},
      Thank you for your booking!
      Booking ID: ${savedBooking._id}
      Bike: ${bikeModel}
      Pickup: ${formatDate(pickupDate)} @ ${pickupTime}
      Return: ${formatDate(returnDate)} @ ${returnTime}
      Subtotal: $${subtotalUSD.toFixed(2)} USD
      Total: $${totalAmountUSD.toFixed(2)} USD
      Status: ${savedBooking.paymentStatus}
      We will contact you soon.
      MotoTrekkin Team
    `;

    const adminEmailContent = `
      New Booking: ${savedBooking._id}
      User: ${riderDetailsObj.firstName} ${riderDetailsObj.lastName} (${riderDetailsObj.email})
      Bike: ${bikeModel} | $${bikePrice}/day
      Dates: ${formatDate(pickupDate)} → ${formatDate(returnDate)}
      Subtotal: $${subtotalUSD.toFixed(2)}
      Total: $${totalAmountUSD.toFixed(2)}
      Status: ${savedBooking.paymentStatus}
    `;

    const emailStatus = { userEmailSent: false, adminEmailSent: false, errors: [] };
    if (riderDetailsObj.email) {
      const userRes = await sendEmail(riderDetailsObj.email, "Booking Confirmation", userEmailContent);
      emailStatus.userEmailSent = userRes.success;
      if (!userRes.success) emailStatus.errors.push({ user: userRes.message });
    }
    const adminRes = await sendEmail(process.env.ADMIN_EMAIL || "admin@example.com", "New Booking", adminEmailContent);
    emailStatus.adminEmailSent = adminRes.success;
    if (!adminRes.success) emailStatus.errors.push({ admin: adminRes.message });

    // Create Stripe session
    let paymentResponse = { id: null };
    try {
      paymentResponse = await createPaymentSession(req, res, {
        amount: totalAmountCents,
        currency: "usd",
        description: `Bike Hire: ${bikeModel}`,
        bookingId: savedBooking._id,
      });
    } catch (err) {
      console.error("Payment session failed:", err.message);
    }

    res.status(201).json({
      message: "Booking created",
      bookingId: savedBooking._id.toString(),
      emailStatus,
      paymentSessionId: paymentResponse.id,
    });
  } catch (error) {
    console.error("createBooking error:", error.stack);
    if (!res.headersSent) res.status(400).json({ message: error.message });
  }
};

// CREATE PAYMENT SESSION
export const createPaymentSession = async (req, res, { amount, currency, description, bookingId }) => {
  try {
    if (!amount || amount <= 0) throw new Error("Invalid amount");
    const origin = req.headers.origin || "http://localhost:5174";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: currency || "usd",
          product_data: { name: description },
          unit_amount: Math.round(amount),
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${bookingId}`,
      cancel_url: `${origin}/cancel?bookingId=${bookingId}`,
      metadata: { bookingId: bookingId.toString() },
    });
    return { id: session.id };
  } catch (error) {
    console.error("createPaymentSession error:", error.message);
    throw error;
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ message: "Session ID required" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      await BikeBooking.findByIdAndUpdate(session.metadata.bookingId, { paymentStatus: "paid" });
      res.json({ status: "success", bookingId: session.metadata.bookingId });
    } else {
      res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to verify payment" });
  }
};

// GET USER BOOKINGS
export const getBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await BikeBooking.find({ userId }).sort({ createdAt: -1 });
    if (!bookings.length) return res.status(404).json({ message: "No bookings" });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch" });
  }
};

// GET ALL (ADMIN)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BikeBooking.find().sort({ createdAt: -1 });
    if (!bookings.length) return res.status(404).json({ message: "No bookings" });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch" });
  }
};

// DELETE (ADMIN)
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BikeBooking.findById(id);
    if (!booking) return res.status(404).json({ message: "Not found" });
    await BikeBooking.deleteOne({ _id: id });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete" });
SPD
  }
};

// GET BY ID (ADMIN)
export const getBookingById = async (req, res) => {
  try {
    const booking = await BikeBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE (ADMIN)
export const updateBooking = async (req, res) => {
  try {
    const updates = req.body;
    const booking = await BikeBooking.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Updated", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { stripe };