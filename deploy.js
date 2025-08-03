const db = require('./public/config/db');
const User = require('./models/user');
const Club = require('./models/club');
const Campaign = require('./models/campaign');
const bcrypt = require('bcryptjs');

async function deploy() {
  try {
    console.log('🚀 Starting deployment...');
    
    // Sync database
    await db.sync({ force: true });
    console.log('✅ Database synced successfully');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@clubconnect.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
      verificationToken: null
    });
    console.log('✅ Admin user created');
    
    // Create clubs
    const clubs = await Club.bulkCreate([
      {
        name: 'Rovers',
        description: 'Youth development and leadership club focusing on outdoor activities and community service',
        contact_whatsapp: '97512345678'
      },
      {
        name: 'Tarayana',
        description: 'Community development and rural empowerment organization',
        contact_whatsapp: '97523456789'
      },
      {
        name: 'YVIA',
        description: 'Youth Volunteers in Action - promoting youth engagement and social responsibility',
        contact_whatsapp: '97534567890'
      },
      {
        name: 'Y-peers',
        description: 'Youth peer education and reproductive health awareness club',
        contact_whatsapp: '97545678901'
      },
      {
        name: 'UNISCO',
        description: 'United Nations International Student Conference Organization',
        contact_whatsapp: '97556789012'
      },
      {
        name: 'Democracy',
        description: 'Promoting democratic values and civic engagement among youth',
        contact_whatsapp: '97567890123'
      },
      {
        name: 'Social Service',
        description: 'Community service and social welfare activities',
        contact_whatsapp: '97578901234'
      },
      {
        name: 'GNH',
        description: 'Gross National Happiness club - promoting happiness and well-being',
        contact_whatsapp: '97589012345'
      },
      {
        name: 'Art Club',
        description: 'Creative arts, cultural activities, and artistic expression',
        contact_whatsapp: '97590123456'
      },
      {
        name: 'Health Club',
        description: 'Health awareness, fitness, and wellness promotion',
        contact_whatsapp: '97501234567'
      }
    ]);
    console.log('✅ Clubs created successfully');
    
    // Create sample campaigns
    await Campaign.bulkCreate([
      {
        title: 'Beach Cleanup Drive',
        description: 'Join us for a community beach cleanup to keep our environment clean and beautiful',
        date: '2024-02-15',
        active: true,
        clubId: clubs[0].id
      },
      {
        title: 'Rural Education Support',
        description: 'Volunteer to teach and support education in rural communities',
        date: '2024-02-20',
        active: true,
        clubId: clubs[1].id
      },
      {
        title: 'Youth Leadership Workshop',
        description: 'Develop leadership skills and learn about community service',
        date: '2024-02-25',
        active: true,
        clubId: clubs[2].id
      },
      {
        title: 'Health Awareness Campaign',
        description: 'Promote health awareness and provide basic health checkups',
        date: '2024-03-01',
        active: true,
        clubId: clubs[9].id
      },
      {
        title: 'Art Exhibition',
        description: 'Showcase local artists and promote cultural expression',
        date: '2024-03-05',
        active: true,
        clubId: clubs[8].id
      }
    ]);
    console.log('✅ Sample campaigns created');
    
    console.log('\n🎉 Deployment completed successfully!');
    console.log('📧 Admin login: admin@clubconnect.com / admin123');
    console.log('🏛️ Created clubs:', clubs.map(club => club.name).join(', '));
    
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

deploy(); 