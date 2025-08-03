const bcrypt = require('bcryptjs');
const db = require('./public/config/db');
const User = require('./models/user');

async function testLogin() {
  try {
    console.log('🧪 Testing login functionality...');
    
    // Sync database
    await db.sync();
    console.log('✅ Database synced');
    
    // Test user credentials
    const testEmail = 'admin@clubconnect.com';
    const testPassword = 'admin123';
    
    console.log('🔍 Looking for user with email:', testEmail);
    
    // Find user
    const user = await User.findOne({ where: { email: testEmail } });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ User found:', {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    });
    
    // Test password verification
    const isMatch = await bcrypt.compare(testPassword, user.password);
    
    if (isMatch) {
      console.log('✅ Password verification successful');
    } else {
      console.log('❌ Password verification failed');
    }
    
    // Test login conditions
    if (!user.isVerified) {
      console.log('❌ User account not verified');
    } else {
      console.log('✅ User account is verified');
    }
    
    console.log('\n📋 Login Test Summary:');
    console.log('📧 Email:', testEmail);
    console.log('🔑 Password:', testPassword);
    console.log('👤 User exists:', !!user);
    console.log('🔐 Password correct:', isMatch);
    console.log('✅ Account verified:', user.isVerified);
    console.log('🎯 Can login:', !!user && isMatch && user.isVerified);
    
  } catch (error) {
    console.error('❌ Test error:', error);
  } finally {
    process.exit(0);
  }
}

testLogin(); 