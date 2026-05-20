import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role, schoolIds } = req.body;
    if (role === 'admin') {
      return res.status(403).json({ error: 'No se permite registrar admin desde este endpoint' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email ya registrado' });
    const user = await User.create({ name, email, password, role, schoolIds });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
