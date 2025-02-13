const { Schema, model } = require('mongoose');
const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  Date: { type: Date, default: Date.now },
  img: { type: String, required: true },
  song: { type: String, required: true },
  username: { type: String, required: true }
}); 


module.exports = model('Post', PostSchema);