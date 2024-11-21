import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};