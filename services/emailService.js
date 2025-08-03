// Simple email service for testing - logs verification links instead of sending emails
const sendVerificationEmail = async (email, token, name) => {
  const verificationUrl = `http://localhost:3000/verify/${token}`;
  
  console.log('\n=== EMAIL VERIFICATION ===');
  console.log(`To: ${email}`);
  console.log(`Subject: Verify Your Email - ClubConnect`);
  console.log(`Message: Welcome ${name}! Please click this link to verify your email:`);
  console.log(`Link: ${verificationUrl}`);
  console.log('=== END EMAIL ===\n');
  
  // For testing, we'll return true to simulate successful email sending
  return true;
};

module.exports = { sendVerificationEmail }; 