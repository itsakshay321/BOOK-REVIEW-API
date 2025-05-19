const Book = require('../models/Book');
const Review = require('../models/Review');

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews');
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const reviews = await Review.find({ book: book._id });
    const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / (reviews.length || 1);

    res.json({ ...book.toObject(), avgRating, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { author: new RegExp(query, 'i') }
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};