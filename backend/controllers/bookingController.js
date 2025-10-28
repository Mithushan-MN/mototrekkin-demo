// src/controllers/bookingController.js
import Booking from "../models/Booking.js";
import nodemailer from "nodemailer";

// Helper function to format date
const formatDate = (date) => {
  return date ? new Date(date).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" }) : "N/A";
};

export const createBooking = async (req, res) => {
  try {
    const bookingData = { ...req.body, userId: req.user.id };
    console.log("bookingController: Creating booking", { userId: req.user.id, bookingData });

    // Validate email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("bookingController: Email configuration missing", {
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS ? "Set" : "Missing",
      });
      return res.status(500).json({ message: "Email configuration missing" });
    }

    // Validate email addresses
    if (!bookingData.email) {
      console.error("bookingController: User email missing in bookingData");
      return res.status(400).json({ message: "User email is required" });
    }
    if (!process.env.ADMIN_EMAIL) {
      console.error("bookingController: ADMIN_EMAIL not set in .env");
    }

    const booking = new Booking(bookingData);
    const savedBooking = await booking.save();
    console.log("bookingController: Booking saved", { bookingId: savedBooking._id });

    // Configure Nodemailer inside the function
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("bookingController: Nodemailer configuration error", {
            error: error.message,
            EMAIL_USER: process.env.EMAIL_USER,
            EMAIL_PASS: process.env.EMAIL_PASS ? "Set" : "Missing",
          });
          reject(error);
        } else {
          console.log("bookingController: Nodemailer configuration verified successfully");
          resolve(success);
        }
      });
    });

    // Prepare email content
    const userEmailContent = `
      Dear ${bookingData.firstName} ${bookingData.lastName},
      
      Thank you for booking a service with MotoTrekkin! Your booking details are as follows:
      
      Booking ID: ${savedBooking._id}
      Motorcycle: ${bookingData.motorcycleMake} ${bookingData.motorcycleModel}
      Preferred Date & Time: ${formatDate(bookingData.preferredDateTime)}
      Work Required: ${bookingData.summaryOfWork || "N/A"}
      Status: ${savedBooking.status || "Pending"}
      
      We will contact you to confirm your appointment. If you have any questions, please reach out at 02 4072 4511 or reply to this email.
      
      Best regards,
      The MotoTrekkin Team
    `;

    const adminEmailContent = `
      New Booking Received
      
      Booking ID: ${savedBooking._id}
      User: ${bookingData.firstName} ${bookingData.lastName} (${bookingData.email})
      Motorcycle: ${bookingData.motorcycleMake} ${bookingData.motorcycleModel}
      Preferred Date & Time: ${formatDate(bookingData.preferredDateTime)}
      Work Required: ${bookingData.summaryOfWork || "N/A"}
      Status: ${savedBooking.status || "Pending"}
      
      Please review the booking and contact the user to confirm the appointment.
    `;

    let emailStatus = { userEmailSent: false, adminEmailSent: false, errors: [] };

    // Send email to user
    try {
      await transporter.sendMail({
        from: `"MotoTrekkin" <${process.env.EMAIL_USER}>`,
        to: bookingData.email,
        subject: "MotoTrekkin - Booking Confirmation",
        text: userEmailContent,
      });
      console.log("bookingController: User email sent", { to: bookingData.email });
      emailStatus.userEmailSent = true;
    } catch (emailErr) {
      console.error("bookingController: Failed to send user email", {
        to: bookingData.email,
        error: emailErr.message,
      });
      emailStatus.errors.push(`User email failed: ${emailErr.message}`);
    }

    // Send email to admin
    try {
      await transporter.sendMail({
        from: `"MotoTrekkin" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "MotoTrekkin - New Booking Notification",
        text: adminEmailContent,
      });
      console.log("bookingController: Admin email sent", { to: process.env.ADMIN_EMAIL });
      emailStatus.adminEmailSent = true;
    } catch (emailErr) {
      console.error("bookingController: Failed to send admin email", {
        to: process.env.ADMIN_EMAIL,
        error: emailErr.message,
      });
      emailStatus.errors.push(`Admin email failed: ${emailErr.message}`);
    }

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: savedBooking._id,
      emailStatus,
    });
  } catch (err) {
    console.error("bookingController: Failed to create booking", err.message);
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("bookingController: getBookings called", { userId, reqUser: req.user });

    const query = userId ? { userId } : {};
    if (userId && req.user.id !== userId && req.user.role !== "admin") {
      console.log("bookingController: Access denied", { userId, reqUserId: req.user.id, role: req.user.role });
      return res.status(403).json({ message: "Access denied" });
    }
    const bookings = await Booking.find(query);
    console.log("bookingController: Bookings fetched", { count: bookings.length });
    res.json(bookings);
  } catch (err) {
    console.error("bookingController: Failed to fetch bookings", err.message);
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    console.log("bookingController: Booking fetched by ID", { bookingId: booking._id });
    res.json(booking);
  } catch (err) {
    console.error("bookingController: Failed to fetch booking", err.message);
    res.status(500).json({ message: "Failed to fetch booking", error: err.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    console.log("bookingController: Booking updated", { bookingId: booking._id });
    res.json({ message: "Booking updated", booking });
  } catch (err) {
    console.error("bookingController: Failed to update booking", err.message);
    res.status(500).json({ message: "Failed to update booking", error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    console.log("bookingController: Booking deleted", { bookingId: booking._id });
    res.json({ message: "Booking deleted" });
  } catch (err) {
    console.error("bookingController: Failed to delete booking", err.message);
    res.status(500).json({ message: "Failed to delete booking", error: err.message });
  }
};