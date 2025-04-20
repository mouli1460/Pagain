const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Book = require("../models/Book");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Add a book
// Add a book
router.post("/add-book", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      author,
      price,
      isbn,
      seller,
      sellerName,       // New field
      sellerPhone,      // New field
      year,
      description,
      userId,
      userEmail,
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newBook = new Book({
      title,
      author,
      price,
      isbn,
      image,
      seller,
      sellerName,
      sellerPhone,
      year,
      description,
      userId,
      userEmail,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


// Get all books
router.get("/getallbooks", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Get a specific book
router.get("/getbook/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Get books by user
router.get("/get-books-by-user/:userId", async (req, res) => {
  try {
    const books = await Book.find({ userId: req.params.userId }); // userId should be stored in the book document
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Delete a book (only by owner)
// DELETE route to delete a book by ID and associated userId
router.delete('/delete/:id', async (req, res) => {
  try {
    const { userId } = req.body; // Destructure userId from the request body
    const bookId = req.params.id; // Get the book ID from URL parameters

    // Ensure userId is present in the request body
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Proceed with deleting the book if userId is valid
    const deletedBook = await Book.findOneAndDelete({ _id: bookId, userId: userId });

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found or you are not authorized to delete this book' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
