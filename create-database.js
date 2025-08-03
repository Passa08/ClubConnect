const { Client } = require('pg');

async function createDatabase() {
  // Connect to default postgres database
  const client = new Client({
    user: 'postgres',
    password: 'your_postgres_password_here', // Replace with your actual password
    host: 'localhost',
    port: 5432,
    database: 'postgres'
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Create the clubconnect database
    await client.query('CREATE DATABASE clubconnect');
    console.log('Database "clubconnect" created successfully!');

  } catch (error) {
    if (error.code === '42P04') {
      console.log('Database "clubconnect" already exists');
    } else {
      console.error('Error creating database:', error.message);
    }
  } finally {
    await client.end();
  }
}

createDatabase(); 