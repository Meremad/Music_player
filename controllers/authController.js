// controllers/authController.js
const User = require('../models/User');
const MainPageItem = require('../models/MainPageItem');

exports.getHome = async (req, res) => {
  try {
    const mainPageItems = await MainPageItem.find({ deletedAt: null });
    res.render('index', { mainPageItems });
  } catch (error) {
    console.error('Error fetching main page items:', error);
    res.status(500).send('Server error');
  }
};

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { error: 'Username already exists' });
    }
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error('Registration error:', error);
    res.render('register', { error: 'An error occurred during registration' });
  }
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.comparePassword(password))) {
      req.session.user = { id: user._id, username: user.username, isAdmin: user.isAdmin };
      res.redirect('/player');
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'An error occurred during login' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.redirect('/');
  });
};