const bcrypt = require('bcryptjs');
const db = require('./public/config/db');
const User = require('./models/user');

async function createTestUser() {
  try {
    console.log('🚀 Creating test user...');
    
    // Sync database
    await db.sync();
    console.log('✅ Database synced');
    
    // Check if test user already exists
    const existingUser = await User.findOne({ where: { email: 'admin@clubconnect.com' } });
    
    if (existingUser) {
      console.log('✅ Test user already exists');
      console.log('📧 Email: admin@clubconnect.com');
      console.log('🔑 Password: admin123');
      console.log('👤 Role: admin');
      console.log('✅ Verified: true');
      return;
    }
    
    // Create test admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const testUser = await User.create({
      name: 'Test Admin',
      email: 'admin@clubconnect.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
      verificationToken: null
    });
    
    console.log('✅ Test user created successfully!');
    console.log('📧 Email: admin@clubconnect.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    console.log('✅ Verified: true');
    console.log('🆔 User ID:', testUser.id);
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    process.exit(0);
  }
}

createTestUser(); 