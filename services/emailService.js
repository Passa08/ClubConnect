const nodemailer = require('nodemailer');

// Email service that works for both development and production
const sendVerificationEmail = async (email, token, name) => {
  // Get the base URL from environment or default to localhost
  const baseUrl = process.env.BASE_URL || 
                  process.env.RENDER_EXTERNAL_URL || 
                  'http://localhost:3000';
  
  const verificationUrl = `${baseUrl}/verify/${token}`;
  
  // Check if we have email credentials for production
  const hasEmailCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;
  
  if (hasEmailCredentials && process.env.NODE_ENV === 'production') {
    // Send real email in production
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email - ClubConnect',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0078d4;">Welcome to ClubConnect!</h2>
            <p>Hello ${name},</p>
            <p>Thank you for registering with ClubConnect. Please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: #0078d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Verify Email Address
              </a>
            </div>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
            <p>This link will expire in 24 hours.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              This email was sent from ClubConnect - Sherubtse College's volunteer management platform.
            </p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Verification email sent successfully to:', email);
      return true;
    } catch (error) {
      console.error('❌ Failed to send email:', error.message);
      // Fall back to console logging
    }
  }
  
  // Console logging for development or when email fails
  console.log('\n=== EMAIL VERIFICATION ===');
  console.log(`To: ${email}`);
  console.log(`Subject: Verify Your Email - ClubConnect`);
  console.log(`Message: Welcome ${name}! Please click this link to verify your email:`);
  console.log(`Link: ${verificationUrl}`);
  console.log('=== END EMAIL ===\n');
  
  // For development/testing, we'll return true to simulate successful email sending
  return true;
};

module.exports = { sendVerificationEmail }; 