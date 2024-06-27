import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = new User({ username, password, email, role: 0 });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUserRole = async (req, res) => {
  const { role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

