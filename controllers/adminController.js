const User = require('../models/User');

exports.getAdminPanel = async (req, res) => {
  const users = await User.find({ deletedAt: null });
  res.render('admin', { users });
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { deletedAt: new Date() });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error deleting user' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    const user = new User({ username, password, isAdmin: Boolean(isAdmin) });
    await user.save();
    res.redirect('/admin');
  } catch (error) {
    res.render('admin', { error: 'Error creating user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, isAdmin } = req.body;
    await User.findByIdAndUpdate(req.params.id, { 
      username,
      isAdmin: Boolean(isAdmin),
      updatedAt: new Date()
    });
    res.redirect('/admin');
  } catch (error) {
    res.render('admin', { error: 'Error updating user' });
  }
};