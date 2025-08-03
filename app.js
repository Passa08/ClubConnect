const express = require('express');
const session = require('express-session');
const db = require('./public/config/db');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-here',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/clubs', require('./routes/clubRoutes'));
app.use('/campaigns', require('./routes/campaignRoutes'));

// Sync DB and Start Server
db.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

app.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
  });
