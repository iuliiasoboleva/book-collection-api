import express from 'express';
import { registerUser, loginUser, getCurrentUser, updateUserRole } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getCurrentUser);
router.put('/:id/role', authenticate, authorizeAdmin, updateUserRole);

export default router;
