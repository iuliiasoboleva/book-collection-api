import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!authHeader) {
    console.error('No Authorization header provided');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!token) {
    console.error('Token is missing or malformed in Authorization header:', authHeader);
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Authenticated user:', req.user);
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.error('User not found:', req.user.id);
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== 1) {
      console.error('User is not an admin:', user.role);
      return res.status(403).json({ error: 'Forbidden' });
    }

    console.log('Authorized admin:', user.username);
    next();
  } catch (err) {
    console.error('Authorization error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
