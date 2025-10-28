// controllers/nzsiRegistrationController.js
import { Stripe } from 'stripe';
import NZSIRegistration from '../models/NZSIRegistration.js';
import { updateBikeRemaining } from './bikeController.js';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

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
      if (error) {
        console.error('Nodemailer verification failed', error.message);
        reject(new Error(`Email server error: ${error.message}`));
      } else {
        console.log('Nodemailer configuration verified');
        resolve(success);
      }
    });
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// CREATE
// ─────────────────────────────────────────────────────────────────────────────
export const createNZSIRegistration = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('createNZSIRegistration: Creating registration', {
      userId,
      body: req.body,
      file: req.file ? {
        originalname: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
      } : 'No file',
    });

    const parsedData = {};
    const licenceFields = ['licenceValid', 'licenceNumber', 'licenceExpiryDate', 'licenceState'];

    licenceFields.forEach(field => {
      if (req.body[field]) parsedData[field] = req.body[field];
    });

    for (const key in req.body) {
      if (!licenceFields.includes(key) && key !== 'licenceFile') {
        try { parsedData[key] = JSON.parse(req.body[key]); }
        catch { parsedData[key] = req.body[key]; }
      }
    }

    const licenceDetails = {
      licenceValid: (parsedData.licenceValid || 'No').trim(),
      licenceNumber: (parsedData.licenceNumber || '').toString().trim(),
      licenceExpiryDate: parsedData.licenceExpiryDate || null,
      licenceState: (parsedData.licenceState || '').toString().trim(),
    };

    const validationErrors = [];

    if (!parsedData.personalDetails?.email?.trim()) validationErrors.push('User email is required');
    if (!parsedData.personalDetails?.firstName?.trim()) validationErrors.push('First name is required');
    if (!parsedData.personalDetails?.lastName?.trim()) validationErrors.push('Last name is required');

    if (licenceDetails.licenceValid !== 'Yes') validationErrors.push("Licence must be valid for this event");
    if (!licenceDetails.licenceNumber) validationErrors.push('Licence number is required');
    if (!licenceDetails.licenceState) validationErrors.push('Licence state is required');

    let expiryDate = null;
    if (licenceDetails.licenceExpiryDate) {
      expiryDate = new Date(licenceDetails.licenceExpiryDate);
      if (isNaN(expiryDate.getTime()) || expiryDate.getFullYear() < 2000 || expiryDate.getFullYear() > 2035) {
        validationErrors.push('Valid licence expiry date is required (2000-2035)');
      } else if (expiryDate < new Date()) {
        validationErrors.push('Licence must not be expired');
      }
    } else {
      validationErrors.push('Licence expiry date is required');
    }

    if (!req.file) validationErrors.push('Licence file upload is required');
    else if (!['image/jpeg', 'image/png', 'application/pdf'].includes(req.file.mimetype)) {
      validationErrors.push('Licence file must be JPEG, PNG, or PDF');
    }

    if (!parsedData.motorcycle?.hireOption) validationErrors.push('Motorcycle hire option is required');
    if (parsedData.motorcycle?.hireOption === 'Hire a Motorcycle' && !parsedData.motorcycle?.selectedMotorcycle) {
      validationErrors.push('Selected motorcycle is required when hiring');
    }

    const totalPayment = parseFloat(parsedData.payment?.totalPayment || 0);
    if (!totalPayment || isNaN(totalPayment) || totalPayment <= 0) validationErrors.push('Valid total payment is required');

    if (!parsedData.terms?.agreeToTerms) validationErrors.push('You must agree to the terms and conditions');

    if (validationErrors.length > 0) {
      console.log('createNZSIRegistration: Validation FAILED', validationErrors);
      return res.status(400).json({
        success: false,
        message: validationErrors.join(', '),
        errors: validationErrors
      });
    }

    console.log('createNZSIRegistration: ALL VALIDATION PASSED');

    const licenceFilePath = path.join(__dirname, '../Uploads', req.file.filename);
    await fs.access(licenceFilePath).catch(() => {
      throw new Error('License file not found on server');
    });

    if (parsedData.motorcycle?.hireOption === 'Hire a Motorcycle' && parsedData.motorcycle?.selectedMotorcycle) {
      await updateBikeRemaining(parsedData.motorcycle.selectedMotorcycle);
    }

    const registration = new NZSIRegistration({
      userId,
      personalDetails: parsedData.personalDetails,
      emergencyContacts: parsedData.emergencyContacts || {},
      medicalInfo: parsedData.medicalInfo || {},
      experience: parsedData.experience || {},
      motorcycle: parsedData.motorcycle,
      licenceDetails: {
        ...licenceDetails,
        licenceExpiryDate: expiryDate,
        licenceFilePath,
        licenceFileName: req.file.filename,
      },
      equipment: parsedData.equipment || {},
      accommodation: parsedData.accommodation || {},
      group: parsedData.group || {},
      terms: parsedData.terms || {},
      payment: {
        paymentOption: parsedData.payment?.paymentOption,
        totalPayment,
        paymentStatus: 'Pending',
      },
    });

    await registration.save();
    console.log('createNZSIRegistration: Registration SAVED', { registrationId: registration._id });

    const origin = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5174';
    if (!origin.startsWith('http')) {
      throw new Error('Invalid frontend URL configuration.');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'aud',
          product_data: {
            name: 'NZ South Island 2025 Registration',
            description: `Registration for ${parsedData.personalDetails?.firstName} ${parsedData.personalDetails?.lastName}`,
          },
          unit_amount: Math.round(totalPayment * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&registrationId=${registration._id}`,
      cancel_url: `${origin}/cancel?registrationId=${registration._id}`,
      metadata: { registrationId: registration._id.toString() },
    });
    console.log('createNZSIRegistration: Stripe session CREATED', { sessionId: session.id });

    await verifyTransporter();
    const emailStatus = { userEmailSent: false, adminEmailSent: false, errors: [] };

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: parsedData.personalDetails?.email,
        subject: 'NZ South Island 2025 Registration Confirmation',
        html: `
          <h2>Registration Confirmation</h2>
          <p>Dear ${parsedData.personalDetails?.firstName},</p>
          <p>Your registration for NZ South Island 2025 has been received.</p>
          <p>Total Payment: $${totalPayment.toFixed(2)}</p>
          <p><a href="${session.url}">Complete Payment Here</a></p>
          <p>Registration ID: ${registration._id}</p>
        `,
      });
      console.log('createNZSIRegistration: User email SENT');
      emailStatus.userEmailSent = true;
    } catch (err) {
      console.error('createNZSIRegistration: User email ERROR', err.message);
      emailStatus.errors.push(`User email failed: ${err.message}`);
    }

    try {
      const adminEmailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New NZSI Registration',
        html: `
          <h2>New Registration</h2>
          <p><strong>Name:</strong> ${parsedData.personalDetails?.firstName} ${parsedData.personalDetails?.last包裹Name}</p>
          <p><strong>Email:</strong> ${parsedData.personalDetails?.email}</p>
          <p><strong>Total Payment:</strong> $${totalPayment.toFixed(2)}</p>
          <p><strong>Registration ID:</strong> ${registration._id}</p>
          <p><strong>Motorcycle:</strong> ${parsedData.motorcycle?.hireOption === 'Hire a Motorcycle' 
            ? parsedData.motorcycle?.selectedMotorcycle 
            : 'Own Bike'}</p>
          <p><strong>Licence Expiry:</strong> ${expiryDate ? expiryDate.toLocaleDateString() : 'N/A'}</p>
          <p><strong>Accommodation:</strong> ${parsedData.accommodation?.accommodationPreference || 'N/A'}</p>
        `,
        attachments: [{
          filename: req.file.originalname,
          path: licenceFilePath,
          contentType: req.file.mimetype,
        }],
      };

      await transporter.sendMail(adminEmailOptions);
      console.log('createNZSIRegistration: Admin email SENT');
      emailStatus.adminEmailSent = true;
    } catch (err) {
      console.error('createNZSIRegistration: Admin email ERROR', err.message);
      emailStatus.errors.push(`Admin email failed: ${err.message}`);
    }

    res.status(201).json({
      success: true,
      message: 'Registration created successfully',
      registrationId: registration._id,
      emailStatus,
      paymentSessionId: session.id,
      paymentUrl: session.url
    });

  } catch (error) {
    console.error('createNZSIRegistration: ERROR', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET ALL
// ─────────────────────────────────────────────────────────────────────────────
export const getAllRegistrations = async (req, res) => {
  try {
    console.log('getAllRegistrations: Fetching all NZSI registrations');
    const registrations = await NZSIRegistration.find()
      .populate('userId', 'email firstName lastName')
      .sort({ createdAt: -1 });
    console.log('getAllRegistrations: Found', registrations.length, 'registrations');
    res.status(200).json(registrations);
  } catch (error) {
    console.error('getAllRegistrations: Error', error.message);
    res.status(500).json({ message: 'Failed to fetch registrations', error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET USER
// ─────────────────────────────────────────────────────────────────────────────
export const getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('getUserRegistrations: Fetching registrations for user', userId);
    const registrations = await NZSIRegistration.find({ userId })
      .sort({ createdAt: -1 });
    console.log('getUserRegistrations: Found', registrations.length, 'registrations');
    if (!registrations.length) {
      return res.status(404).json({ message: 'No registrations found for this user' });
    }
    res.status(200).json(registrations);
  } catch (error) {
    console.error('getUserRegistrations: Error', error.message);
    res.status(500).json({ message: 'Failed to fetch user registrations', error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE (ADMIN) — NO VALIDATION ERRORS
// ─────────────────────────────────────────────────────────────────────────────
export const updateNZSIRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await NZSIRegistration.findById(id);
    if (!existing) return res.status(404).json({ message: 'Not found' });

    const parsedData = {};
    const licenceFields = ['licenceValid', 'licenceNumber', 'licenceExpiryDate', 'licenceState'];

    licenceFields.forEach(field => {
      if (req.body[field] !== undefined) parsedData[field] = req.body[field];
    });

    for (const key in req.body) {
      if (!licenceFields.includes(key) && key !== 'licenceFile') {
        try { parsedData[key] = JSON.parse(req.body[key]); }
        catch { parsedData[key] = req.body[key]; }
      }
    }

    // MINIMAL VALIDATION — ONLY FOR FIELDS SENT
    const validationErrors = [];

    if (parsedData.personalDetails) {
      if (!parsedData.personalDetails.email?.trim()) validationErrors.push('Email required');
      if (!parsedData.personalDetails.firstName?.trim()) validationErrors.push('First name required');
      if (!parsedData.personalDetails.lastName?.trim()) validationErrors.push('Last name required');
    }

    if (parsedData.licenceValid !== undefined && parsedData.licenceValid !== 'Yes') {
      validationErrors.push('Licence must be valid');
    }
    if (parsedData.licenceNumber !== undefined && !parsedData.licenceNumber?.trim()) {
      validationErrors.push('Licence number required');
    }
    if (parsedData.licenceState !== undefined && !parsedData.licenceState?.trim()) {
      validationErrors.push('Licence state required');
    }

    if (parsedData.licenceExpiryDate) {
      const expiry = new Date(parsedData.licenceExpiryDate);
      if (isNaN(expiry.getTime()) || expiry.getFullYear() < 2000 || expiry.getFullYear() > 2035) {
        validationErrors.push('Valid expiry date required');
      } else if (expiry < new Date()) {
        validationErrors.push('Licence expired');
      }
    }

    if (parsedData.motorcycle?.hireOption === 'Hire a Motorcycle' && !parsedData.motorcycle.selectedMotorcycle) {
      validationErrors.push('Selected bike required');
    }

    const totalPayment = parseFloat(parsedData.payment?.totalPayment || existing.payment.totalPayment || 0);
    if (parsedData.payment?.totalPayment !== undefined && (!totalPayment || totalPayment <= 0)) {
      validationErrors.push('Valid total required');
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({ success: false, message: validationErrors.join(', ') });
    }

    // FILE HANDLING
    let licenceFilePath = existing.licenceDetails.licenceFilePath;
    let licenceFileName = existing.licenceDetails.licenceFileName;

    if (req.file) {
      licenceFilePath = path.join(__dirname, '../Uploads', req.file.filename);
      licenceFileName = req.file.filename;
      if (existing.licenceDetails.licenceFilePath) {
        await fs.unlink(existing.licenceDetails.licenceFilePath).catch(() => {});
      }
    }

    // BIKE STOCK
    const wasHiring = existing.motorcycle.hireOption === 'Hire a Motorcycle' && existing.motorcycle.selectedMotorcycle;
    const isHiring = parsedData.motorcycle?.hireOption === 'Hire a Motorcycle' && parsedData.motorcycle?.selectedMotorcycle;

    if (wasHiring && !isHiring) await updateBikeRemaining(existing.motorcycle.selectedMotorcycle, +1);
    if (!wasHiring && isHiring) await updateBikeRemaining(parsedData.motorcycle.selectedMotorcycle, -1);

    // BUILD UPDATE OBJECT — ONLY WHAT WAS SENT
    const updateObj = { $set: {} };

    if (parsedData.personalDetails) updateObj.$set.personalDetails = parsedData.personalDetails;
    if (parsedData.accommodation) updateObj.$set.accommodation = parsedData.accommodation;
    if (parsedData.motorcycle) updateObj.$set.motorcycle = parsedData.motorcycle;
    if (parsedData.payment) {
      updateObj.$set.payment = {
        ...existing.payment,
        ...parsedData.payment,
        totalPayment: totalPayment || existing.payment.totalPayment,
      };
    }

    const licenceUpdate = {};
    if (parsedData.licenceValid !== undefined) licenceUpdate.licenceValid = parsedData.licenceValid;
    if (parsedData.licenceNumber !== undefined) licenceUpdate.licenceNumber = parsedData.licenceNumber?.trim();
    if (parsedData.licenceExpiryDate !== undefined) {
      licenceUpdate.licenceExpiryDate = parsedData.licenceExpiryDate ? new Date(parsedData.licenceExpiryDate) : null;
    }
    if (parsedData.licenceState !== undefined) licenceUpdate.licenceState = parsedData.licenceState?.trim();
    if (req.file) {
      licenceUpdate.licenceFilePath = licenceFilePath;
      licenceUpdate.licenceFileName = licenceFileName;
    }

    if (Object.keys(licenceUpdate).length > 0) {
      updateObj.$set.licenceDetails = { ...existing.licenceDetails, ...licenceUpdate };
    }

    // SKIP MONGOOSE VALIDATION
    const updated = await NZSIRegistration.findByIdAndUpdate(
      id,
      updateObj,
      { new: true, runValidators: false }
    );

    // STRIPE + EMAILS
    let paymentUrl = null;
    if (updated.payment.paymentStatus === 'Paid' && existing.payment.paymentStatus !== 'Paid') {
      const origin = req.headers.origin || process.env.FRONTEND_URL;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'aud',
            product_data: { name: 'NZSI Payment (Admin)' },
            unit_amount: Math.round(totalPayment * 100),
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${origin}/admin/nzsi-registrations`,
        cancel_url: `${origin}/admin/nzsi-registrations`,
        metadata: { registrationId: id },
      });
      paymentUrl = session.url;
    }

    await verifyTransporter();
    const emailStatus = { user: false, admin: false, errors: [] };

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: updated.personalDetails.email,
        subject: 'NZSI Registration Updated',
        html: `<p>Your registration has been updated. Total: $${totalPayment.toFixed(2)}. ${paymentUrl ? `<a href="${paymentUrl}">Pay Now</a>` : ''}</p>`,
      });
      emailStatus.user = true;
    } catch (err) { emailStatus.errors.push(err.message); }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'NZSI Registration Updated',
        html: `<p>ID: ${id}<br>Name: ${updated.personalDetails.firstName} ${updated.personalDetails.lastName}<br>Total: $${totalPayment.toFixed(2)}</p>`,
        attachments: licenceFilePath ? [{ filename: req.file?.originalname || licenceFileName, path: licenceFilePath }] : [],
      });
      emailStatus.admin = true;
    } catch (err) { emailStatus.errors.push(err.message); }

    res.json({ success: true, registration: updated, paymentUrl, emailStatus });

  } catch (error) {
    console.error('updateNZSIRegistration: ERROR', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────────────────────────────────────
export const deleteNZSIRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const reg = await NZSIRegistration.findById(id);
    if (!reg) return res.status(404).json({ message: 'Not found' });

    if (reg.motorcycle.hireOption === 'Hire a Motorcycle' && reg.motorcycle.selectedMotorcycle) {
      await updateBikeRemaining(reg.motorcycle.selectedMotorcycle, +1);
    }

    if (reg.licenceDetails.licenceFilePath) {
      await fs.unlink(reg.licenceDetails.licenceFilePath).catch(() => {});
14    }

    await NZSIRegistration.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// RESEND PAYMENT
// ─────────────────────────────────────────────────────────────────────────────
export const resendPaymentEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const reg = await NZSIRegistration.findById(id);
    if (!reg) return res.status(404).json({ message: 'Not found' });

    const total = reg.payment.totalPayment;
    const origin = req.headers.origin || process.env.FRONTEND_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'aud',
          product_data: { name: 'NZSI Payment (Resend)' },
          unit_amount: Math.round(total * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/admin/nzsi-registrations`,
      cancel_url: `${origin}/admin/nzsi-registrations`,
      metadata: { registrationId: id },
    });

    await verifyTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: reg.personalDetails.email,
      subject: 'Payment Link (Resent)',
      html: `<p>Pay here: <a href="${session.url}">Pay Now</a></p>`,
    });

    res.json({ success: true, paymentUrl: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};