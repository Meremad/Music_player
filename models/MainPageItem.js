// models/MainPageItem.js
const mongoose = require('mongoose');

const MainPageItemSchema = new mongoose.Schema({
  name_en: { type: String, required: true },
  name_ru: { type: String, required: true },
  description_en: { type: String, required: true },
  description_ru: { type: String, required: true },
  images: { type: [String], required: true, validate: [arrayLimit, '{PATH} must have exactly 3 images'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
});

function arrayLimit(val) {
  return val.length === 3;
}

module.exports = mongoose.model('MainPageItem', MainPageItemSchema);