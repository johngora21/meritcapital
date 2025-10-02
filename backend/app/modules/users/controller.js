import jwt from 'jsonwebtoken';
import { env } from '../../../../backend/config/env.js';
import { HttpError } from '../../core/http/error.js';
import usersService from './service.js';
import bcrypt from 'bcryptjs';

export const list = async (_req, res, next) => {
  try {
    const users = await usersService.listUsers();
    res.json({ data: users });
  } catch (e) { next(e); }
};

export const signup = async (req, res, next) => {
  try {
    const { email, password, full_name, role } = req.body;
    const allowedRoles = ['entrepreneur','investor'];
    if (!allowedRoles.includes(role)) throw new HttpError(403, 'Signup not allowed for this role');
    const existing = await usersService.findByEmail(email);
    if (existing) throw new HttpError(409, 'Email already in use');
    const user = await usersService.createUser({ email, password, full_name, role });
    const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: '7d' });
    res.status(201).json({ data: { id: user.id, email: user.email, full_name: user.full_name, role: user.role }, token });
  } catch (e) { next(e); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.findByEmail(email);
    if (!user) throw new HttpError(401, 'Invalid credentials');
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new HttpError(401, 'Invalid credentials');
    const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: '7d' });
    res.json({ data: { id: user.id, email: user.email, full_name: user.full_name, role: user.role }, token });
  } catch (e) { next(e); }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { full_name, phone, location, bio, company, position, website, linkedin, twitter, avatar } = req.body;
    
    const user = await usersService.updateUser(userId, {
      full_name,
      phone,
      location,
      bio,
      company,
      position,
      website,
      linkedin,
      twitter,
      avatar
    });
    
    if (!user) throw new HttpError(404, 'User not found');
    res.json({ data: user });
  } catch (e) { next(e); }
};

export default { list, signup, login, updateProfile };

