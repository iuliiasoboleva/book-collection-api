import express from 'express';
import { addBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorizeAdmin, addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', authenticate, authorizeAdmin, updateBook);
router.delete('/:id', authenticate, authorizeAdmin, deleteBook);

export default router;
