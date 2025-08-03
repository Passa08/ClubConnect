const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user');
const { sendVerificationEmail } = require('../services/emailService');

// Show registration form
exports.showRegister = (req, res) => {
  res.render('register-debug');
};

// Handle user registration
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    console.log('Registration attempt:', { name, email, role });
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.send('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    console.log('Creating user with data:', {
      name,
      email,
      role: role || 'member',
      isVerified: false,
      verificationToken
    });
    
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || 'member',
      verificationToken,
      isVerified: false
    });

    console.log('User created successfully:', user.id);

    // Get the base URL for verification links
    const baseUrl = process.env.BASE_URL || 
                    process.env.RENDER_EXTERNAL_URL || 
                    'http://localhost:3000';

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationToken, name);
    
    if (emailSent) {
      res.send(`
        <h2>Registration Successful!</h2>
        <p>Please check your email (${email}) and click the verification link to activate your account.</p>
        <p><a href="/login">Go to Login</a></p>
      `);
    } else {
      res.send(`
        <h2>Registration Successful!</h2>
        <p>Account created but verification email could not be sent. Please contact support.</p>
        <p><a href="/login">Go to Login</a></p>
      `);
    }
  } catch (err) {
    console.error('Registration error details:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    if (err.errors) {
      console.error('Validation errors:', err.errors);
    }
    res.send('Registration failed: ' + err.message + '<br><a href="/register">Try Again</a>');
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ where: { verificationToken: token } });
    
    if (!user) {
      return res.send('Invalid or expired verification token');
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.send(`
      <h2>Email Verified Successfully!</h2>
      <p>Your account has been activated. You can now login.</p>
      <p><a href="/login">Go to Login</a></p>
    `);
  } catch (err) {
    res.send('Verification failed: ' + err.message);
  }
};

// Show login form
exports.showLogin = (req, res) => {
  res.render('login');
};

// Handle login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('🔐 Login attempt for email:', email);
  console.log('📊 Request body:', { email, password: password ? '[HIDDEN]' : 'undefined' });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('❌ Login failed: User not found for email:', email);
      return res.send('User not found');
    }

    console.log('✅ User found:', { id: user.id, name: user.name, role: user.role, isVerified: user.isVerified });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Login failed: Incorrect password for user:', user.id);
      return res.send('Incorrect password');
    }

    console.log('✅ Password verified for user:', user.id);

    if (!user.isVerified) {
      console.log('❌ Login failed: Account not verified for user:', user.id);
      return res.send(`
        <h2>Account Not Verified</h2>
        <p>Please check your email and click the verification link to activate your account.</p>
        <p><a href="/login">Try Again</a></p>
      `);
    }

    // Set user session
    req.session.userId = user.id;
    console.log('✅ Login successful for user:', user.id);
    console.log('🔄 Session userId set to:', req.session.userId);
    console.log('🔄 Redirecting to dashboard...');
    
    // Force session save before redirect
    req.session.save((err) => {
      if (err) {
        console.error('❌ Session save error:', err);
        return res.send('Login failed: Session error');
      }
      console.log('✅ Session saved successfully');
      console.log('✅ Final session data:', { userId: req.session.userId });
      console.log('🔄 Redirecting to /dashboard');
      res.redirect('/dashboard');
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.send('Login failed: ' + err.message);
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
