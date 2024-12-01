// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String, // URLs of uploaded images
      },
    ],
    links: [
      {
        type: String, // URLs of external links
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
