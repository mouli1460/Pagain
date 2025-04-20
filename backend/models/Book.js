const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  seller: {
    type: String,
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  sellerPhone: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);
