const db = require('./public/config/db');
const User = require('./models/user');

async function testDatabase() {
  try {
    // Test database connection
    await db.authenticate();
    console.log('Database connection successful!');
    
    // Test User model
    const userCount = await User.count();
    console.log('Current users in database:', userCount);
    
    // Test creating a user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'member',
      isVerified: false,
      verificationToken: 'test-token'
    });
    
    console.log('Test user created successfully:', testUser.id);
    
    // Clean up test user
    await testUser.destroy();
    console.log('Test user cleaned up');
    
  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    process.exit();
  }
}

testDatabase(); 