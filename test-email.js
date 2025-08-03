const { sendVerificationEmail } = require('./services/emailService');

async function testEmail() {
  try {
    console.log('Testing email service...');
    
    const result = await sendVerificationEmail(
      'test@example.com',
      'test-token-123',
      'Test User'
    );
    
    console.log('Email service result:', result);
    
  } catch (error) {
    console.error('Email test failed:', error);
  } finally {
    process.exit();
  }
}

testEmail(); 