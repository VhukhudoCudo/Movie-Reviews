require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const reviewRoutes = require('./routes/reviews.js');

const app = express();

// CORS configuration to allow both local dev and deployed frontend
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://movie-reviews-qo9a.onrender.com' // deployed frontend
  ],
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB error:', err));

app.use('/auth', authRoutes);
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
