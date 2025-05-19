const express = require('express');
const router = express.Router();
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');

router.post('/books/:id/reviews', auth, addReview);
router.put('/reviews/:id', auth, updateReview);
router.delete('/reviews/:id', auth, deleteReview);

module.exports = router;