require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const session = require('express-session');
const passport = require('passport');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const forgotPasswordRoute = require('./routes/forgot');
const profileRoute = require('./routes/profile');
const path = require('path');
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 60 * 60 * 1000 // 1 hour session
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile); // You would typically store or check the profile in your DB
}));

// Serialization of the user for the session
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user); 
  // done(null, user.id); // Assuming user object has an 'id' property
  done(null, { id: user.id, userType: user.userType });
});


passport.deserializeUser((userSession, done) => {
  const { id, userType } = userSession;
  let query = '';
  if (userType === 'individual') {
    query = 'SELECT * FROM individual_users WHERE id = $1';
  } else if (userType === 'organization') {
    query = 'SELECT * FROM organization_users WHERE id = $1';
  }

  pool.query(query, [id], (err, results) => {
    if (err) {
      return done(err);
    }
    if (results.rows.length > 0) {
      return done(null, { ...results.rows[0], userType });
    } else {
      console.error('User not found with ID:', id);
      return done(new Error('User not found'), null);
    }
  });
});


// Include your existing routes
app.use('/signup', signupRoute(pool));
app.use('/login', loginRoute(pool)); // OAuth routes are now included here
app.use('/auth', forgotPasswordRoute(pool));
app.use('/profile', profileRoute(pool));
app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, './routes/privacy.html'));
}); 
app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, './routes/terms.html'));
}); 

// Handle preflight requests
app.options('*', cors());
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  async function(req, res) {
    try {
      // On successful Facebook login, get Facebook user details
      const facebookId = req.user.id; // Assuming req.user contains the Facebook user data

      // Retrieve userId from session
      const userId = req.cookies.userId;
      const userType = req.cookies.userType;
      
      if (!userId) {
        return res.status(400).send("User not logged in or session expired.");
      }

      // Update the user's record with the Facebook ID
      if(userType === 'individual') {
        await pool.query('UPDATE individual_users SET facebook_id = $1 WHERE id = $2', [facebookId, userId]);
      }
      else if(userType === 'organization') {
        await pool.query('UPDATE organization_users SET facebook_id = $1 WHERE id = $2', [facebookId, userId]);
      }

      res.redirect('http://localhost:3001/profile');  // Redirect back to profile page on success
    } catch (err) {
      console.error('Error linking Facebook account:', err);
      res.status(500).send("Error linking Facebook account.");
    }
  }
);


// Connect to the database
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to the database');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

