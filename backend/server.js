import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { stripe } from "./controllers/bikeBookingController.js"; // Import Stripe instance
import bookingRoutes from "./routes/bookingRoutes.js"; // For service bookings
import bikeBookingRoutes from "./routes/bikeBookingRoutes.js"; // For bike hire bookings
import authRoutes from "./routes/authRoutes.js";
import BikeBooking from "./models/BikeBooking.js"; // Import for webhook

import nzsiRegistrationRoutes from './routes/nzsiRegistration.js';
import mdpPhase2Routes from './routes/mdpPhase2Routes.js';
import MDPPhase2Registration from './models/MDPPhase2Registration.js';
import mdpPhase2BikesRouter from './routes/mdpPhase2Bikes.js'; // Added import

dotenv.config();

// Recreate __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Environment variables:", {
  MONGO_URI: process.env.MONGO_URI ? "Set" : "Missing",
  PORT: process.env.PORT,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? "Set" : "Missing",
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET ? "Set" : "Missing",
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/json" })); // For Stripe webhook
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Optional: Serve bike images from backend if not using frontend public directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Routes

app.use("/api/bookings", bookingRoutes); // For general service bookings
app.use("/api/bikeBookings", bikeBookingRoutes); // For bike hire bookings
app.use("/api/auth", authRoutes);

app.use('/api/nzsiRegistrations', nzsiRegistrationRoutes);
app.use('/api/nzsiRegistrations/user/:userId', nzsiRegistrationRoutes);

app.use('/api/mdpPhase2Registrations', mdpPhase2Routes);
app.use('/api/bikes', mdpPhase2BikesRouter);

// Stripe webhook
app.post("/api/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(500).send("Webhook secret not configured");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const bookingId = event.data.object.metadata.bookingId;
    console.log("Payment succeeded for bike booking:", bookingId);
    BikeBooking.findByIdAndUpdate(bookingId, { paymentStatus: "paid" }, { new: true })
      .then(() => console.log(`Updated bike booking ${bookingId} to paid`))
      .catch((err) => console.error("Failed to update bike booking:", err));
  }

  res.json({ received: true });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));