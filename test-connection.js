const db = require('./public/config/db');
const User = require('./models/user');
const Club = require('./models/club');
const Campaign = require('./models/campaign');

async function testConnection() {
  try {
    // Test database connection
    await db.authenticate();
    console.log('✅ SQLite database connection successful!');
    console.log('📁 Database file: ./database.sqlite');
    
    // Count records in each table
    const userCount = await User.count();
    const clubCount = await Club.count();
    const campaignCount = await Campaign.count();
    
    console.log('\n📊 Database Statistics:');
    console.log(`Users: ${userCount}`);
    console.log(`Clubs: ${clubCount}`);
    console.log(`Campaigns: ${campaignCount}`);
    
    // Show some sample data
    console.log('\n👥 Recent Users:');
    const users = await User.findAll({ limit: 5 });
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.role}`);
    });
    
    console.log('\n🏛️ Available Clubs:');
    const clubs = await Club.findAll();
    clubs.forEach(club => {
      console.log(`- ${club.name}`);
    });
    
    console.log('\n🎯 Active Campaigns:');
    const campaigns = await Campaign.findAll({
      include: [Club],
      where: { active: true }
    });
    campaigns.forEach(campaign => {
      console.log(`- ${campaign.title} (${campaign.Club.name})`);
    });
    
    console.log('\n🔗 To view in TablePlus:');
    console.log('1. Open TablePlus');
    console.log('2. Click "Create a new connection"');
    console.log('3. Select "SQLite"');
    console.log('4. Choose file: ./database.sqlite');
    console.log('5. Click "Connect"');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    process.exit();
  }
}

testConnection(); 