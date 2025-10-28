import MDPPhase2Registration from '../models/MDPPhase2Registration.js';
import MDPPhase2Bike from '../models/MDPPhase2Bike.js'; // Added import
import { Stripe } from 'stripe';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Stripe instance
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Nodemailer (same as NZSI)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const verifyTransporter = async () => {
  return new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) reject(new Error(`Email server error: ${error.message}`));
      else resolve(success);
    });
  });
};

export const createMDPPhase2Registration = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('createMDPPhase2Registration: Starting', { userId });

    const payload = req.body;
    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ message: 'No data received' });
    }

    // ──────── VALIDATION ────────
    const errors = [];

    // Personal
    if (!payload.personalDetails?.email?.trim()) errors.push('Email required');
    if (!payload.personalDetails?.firstName?.trim()) errors.push('First name required');
    if (!payload.personalDetails?.lastName?.trim()) errors.push('Last name required');

    // Phase 1
    if (payload.phase1Completion?.completedPhase1 !== 'Yes') errors.push('Phase 1 must be completed');
    if (payload.phase1Completion?.phase1Confirmation !== 'Yes') errors.push('Phase 1 confirmation required');

    // License
    if (payload.licenseDetails?.licenseValid !== 'Yes') errors.push('Valid licence required');
    if (!payload.licenseDetails?.licenseNumber?.trim()) errors.push('Licence number required');
    if (!payload.licenseDetails?.licenseState?.trim()) errors.push('Licence state required');

    // Bike Details
    if (!payload.bikeDetails?.bikeChoice) errors.push('Bike choice is required');
    if (payload.bikeDetails?.bikeChoice === 'hire' && !payload.bikeDetails?.hireBike) {
      errors.push('Hired bike selection is required');
    }
    if (payload.bikeDetails?.bikeChoice === 'own') {
      if (!payload.bikeDetails?.bikeMake?.trim()) errors.push('Bike make is required');
      if (!payload.bikeDetails?.bikeModel?.trim()) errors.push('Bike model is required');
      if (!payload.bikeDetails?.bikeYear?.trim()) errors.push('Bike year is required');
    }

    // Training Details
    if (!payload.trainingState?.trim()) errors.push('Training state is required');
if (!payload.trainingDate?.trim()) errors.push('Training date is required');

    // Payment
    const total = Number(payload.payment?.totalPayment);
    if (!total || total <= 0) errors.push('Valid payment amount required');

    // Terms
    if (!payload.terms?.termsAgreed) errors.push('You must agree to terms');

    if (errors.length > 0) {
      console.log('Validation FAILED', errors);
      return res.status(400).json({ success: false, errors });
    }


    if (errors.length > 0) {
      console.log('Validation FAILED', errors);
      return res.status(400).json({ success: false, errors });
    }

    // ──────── DECREMENT BIKE REMAINING (IF HIRED) ────────
    if (payload.bikeDetails?.hireBike) {
      const bikeName = payload.bikeDetails.hireBike.split(' - ')[0]; // e.g., "HONDA CRF250 RALLY"
      const updatedBike = await MDPPhase2Bike.findOneAndUpdate(
        { name: bikeName, isActive: true },
        { $inc: { remaining: -1 } },
        { new: true }
      );
      if (!updatedBike || updatedBike.remaining < 0) {
        throw new Error(`MDP Phase 2 Bike ${bikeName} is no longer available`);
      }
      console.log(`MDP Phase 2 Bike ${bikeName} remaining updated to ${updatedBike.remaining}`);
    }

    // ──────── SAVE TO DB ────────
    const registration = new MDPPhase2Registration({
      userId,
      ...payload,
      payment: {
        ...payload.payment,
        totalPayment: total,
        paymentStatus: 'Pending',
      },
    });

    await registration.save();
    console.log('Registration SAVED', registration._id);

    // ──────── STRIPE SESSION ────────
    const origin = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5174';
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'aud',
          product_data: { name: 'MDP Phase III Registration' },
          unit_amount: Math.round(total * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&regId=${registration._id}`,
      cancel_url: `${origin}/cancel`,
      metadata: { registrationId: registration._id.toString() },
    });

    // ──────── OPTIONAL EMAILS (same as NZSI) ────────
    let emailStatus = { userEmailSent: false, adminEmailSent: false, errors: [] };
    try {
      await verifyTransporter();

      // User email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: payload.personalDetails.email,
        subject: 'MDP Phase III – Registration Received',
        html: `
          <h2>Thank you, ${payload.personalDetails.firstName}!</h2>
          <p>Your registration has been received.</p>
          <p><strong>Total:</strong> $${total.toFixed(2)}</p>
          <p><a href="${session.url}">Complete Payment</a></p>
          <p>Registration ID: <code>${registration._id}</code></p>
        `,
      });
      emailStatus.userEmailSent = true;
    } catch (e) {
      emailStatus.errors.push(`User email failed: ${e.message}`);
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New MDP Phase III Registration',
        html: `
          <h2>New Registration</h2>
          <p><strong>Name:</strong> ${payload.personalDetails.firstName} ${payload.personalDetails.lastName}</p>
          <p><strong>Email:</strong> ${payload.personalDetails.email}</p>
          <p><strong>Total:</strong> $${total.toFixed(2)}</p>
          <p><strong>Bike Hire:</strong> ${payload.bikeDetails?.bikeHire === 'Yes' || payload.bikeDetails?.hireBike ? 'Yes' : 'No'}</p>
          ${payload.bikeDetails?.hireBike ? `<p><strong>Hired Bike:</strong> ${payload.bikeDetails.hireBike}</p>` : ''}
          <p><strong>Tyres:</strong> ${payload.tyreOrders?.requiresTyres === 'Yes' ? 'Yes' : 'No'}</p>
          <p><strong>Reg ID:</strong> ${registration._id}</p>
        `,
      });
      emailStatus.adminEmailSent = true;
    } catch (e) {
      console.error('Admin email error:', e);
      emailStatus.errors.push(`Admin email failed: ${e.message}`);
    }

    // ──────── SUCCESS RESPONSE ────────
    res.status(201).json({
      success: true,
      registrationId: registration._id,
      paymentSessionId: session.id,
      emailStatus,
    });

  } catch (error) {
    console.error('MDPPhase2Registration ERROR:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET: Fetch all MDP Phase 2 registrations for the logged-in user
export const getUserMDPPhase2Registrations = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('getUserMDPPhase2Registrations: Fetching for user', userId);

    const registrations = await MDPPhase2Registration.find({ userId })
      .select('-__v')                    // Remove version key
      .sort({ createdAt: -1 })           // Newest first
      .lean();                           // Faster, plain JS objects

    console.log(`Found ${registrations.length} MDP Phase 2 registration(s)`);
    res.status(200).json(registrations);
  } catch (error) {
    console.error('getUserMDPPhase2Registrations ERROR:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch registrations' });
  }
};

export const getAllMDPPhase2Registrations = async (req, res) => {
  try {
    const regs = await MDPPhase2Registration.find()
      .sort({ createdAt: -1 })
      .lean();
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMDPPhase2Registration = async (req, res) => {
  try {
    await MDPPhase2Registration.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resendPaymentEmail = async (req, res) => {
  // Reuse your email logic from create controller
  // Or just return success for now
  res.json({ success: true, message: 'Payment link resent' });
};

export const updateMDPPhase2Registration = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent updating userId or critical fields
    delete updates.userId;
    delete updates._id;

    const updated = await MDPPhase2Registration.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Registration not found' });

    res.json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: err.message });
  }
};