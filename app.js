require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./public/config/db');

const app = express();

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-secret-key-here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

// Check if we have complete PostgreSQL credentials for session store
const hasCompletePostgresCredentials = 
  process.env.DB_HOST && 
  process.env.DB_USER && 
  process.env.DB_PASS && 
  process.env.DB_NAME &&
  process.env.DB_HOST !== 'localhost' &&
  process.env.DB_HOST !== '127.0.0.1';

// Use PostgreSQL session store only if we have complete credentials
if (process.env.NODE_ENV === 'production' && hasCompletePostgresCredentials) {
  try {
    const pgSession = require('connect-pg-simple')(session);
    sessionConfig.store = new pgSession({
      conObject: {
        connectionString: process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
      }
    });
    console.log('✅ Using PostgreSQL session store');
  } catch (error) {
    console.log('⚠️ PostgreSQL session store failed, using MemoryStore:', error.message);
  }
} else {
  console.log('✅ Using MemoryStore for sessions (PostgreSQL credentials incomplete)');
}

app.use(session(sessionConfig));

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/clubs', require('./routes/clubRoutes'));
app.use('/campaigns', require('./routes/campaignRoutes'));

// Sync database and start server
db.sync()
  .then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database sync failed:', err);
  });

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});
