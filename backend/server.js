require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const reviewRoutes = require('./routes/reviews.js');

const app = express();

// CORS: allow deployed frontend with credentials
app.use(cors({
  origin: 'https://movie-reviews-qo9a.onrender.com', // your frontend link
  credentials: true
}));

app.use(express.json());

// Session config for HTTPS (Render uses HTTPS)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true,       // must be true for HTTPS
    sameSite: 'none'    // required for cross-site cookies
  }
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on Render at port ${PORT}`));
