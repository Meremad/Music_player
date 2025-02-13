// controllers/adminController.js
const MainPageItem = require('../models/MainPageItem');
const User = require('../models/User');
const Post = require('../models/Post');

exports.getAdminPanel = async (req, res) => {
  const items = await MainPageItem.find({ deletedAt: null });
  res.render('admin-items', { items });
};

exports.getMainPageItems = async (req, res) => {
  try {
    const items = await MainPageItem.find({ deletedAt: null });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createMainPageItem = async (req, res) => {
  try {
    const { name_en, name_ru, description_en, description_ru, images } = req.body;

    if (!name_en || !name_ru || !description_en || !description_ru || !images || images.length !== 3) {
      return res.status(400).json({ error: 'All fields are required, including exactly 3 images' });
    }

    const newItem = new MainPageItem({
      name_en,
      name_ru,
      description_en,
      description_ru,
      images
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
};

exports.updateMainPageItem = async (req, res) => {
  try {
    const updatedItem = await MainPageItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

exports.deleteMainPageItem = async (req, res) => {
  try {
    const item = await MainPageItem.deleteOne({ id: req.params.id });
    res.json({ message: 'Item marked as deleted', item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
  res.render('admin', { users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
  res.render('admin-posts', { posts });
  } catch (err) {
    console.error('Error during getting posts:', err);
    res.status(500).json({ message: 'server error' });
  }
}
