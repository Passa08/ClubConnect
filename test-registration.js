const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('./models/user');

async function testRegistration() {
  try {
    console.log('Testing user creation...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'member',
      isVerified: false,
      verificationToken: crypto.randomBytes(32).toString('hex')
    };
    
    console.log('Test data:', testData);
    
    const user = await User.create(testData);
    console.log('User created successfully:', user.id);
    
    // Clean up
    await user.destroy();
    console.log('Test user cleaned up');
    
  } catch (error) {
    console.error('Registration test failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error details:', error.errors);
  } finally {
    process.exit();
  }
}

testRegistration(); 