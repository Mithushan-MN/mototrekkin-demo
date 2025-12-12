import nodemailer from 'nodemailer';

const sendContactEmail = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    // Create transporter (Gmail example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to YOU (shop owner)
    await transporter.sendMail({
      from: `"Moto Trekkin Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'mithushan123456@gmail.com', // Change to your email
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <small>Sent from JSW Powersports website</small>
      `,
    });

    // Auto-reply to customer (optional but professional)
    await transporter.sendMail({
      from: `"Moto Trekkin Adventures" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Moto Trekkin Adventures!',
      html: `
        <h3>Hi ${name},</h3>
        <p>Thanks for reaching out! We've received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
        <p>Talk soon!<br><strong>JSW Powersports Team</strong><br>(07) 5529 2616</p>
      `,
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
};

export { sendContactEmail };