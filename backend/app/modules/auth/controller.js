import { Session } from './session.model.js';
import { User } from '../users/model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { HttpError } from '../../core/http/error.js';
import { Investor } from '../investors/model.js';
import { PasswordReset } from './reset.model.js';
import { env } from '../../../config/env.js';

const cookieName = 'mc_session';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new HttpError(401, 'Invalid credentials');
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new HttpError(401, 'Invalid credentials');
    // Require superadmin to verify investors before login
    if (user.role === 'investor') {
      const investor = await Investor.findOne({ where: { user_id: user.id } });
      if (!investor || !investor.verified) {
        throw new HttpError(403, 'Your investor account is pending verification');
      }
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7*24*60*60*1000);
    await Session.create({ user_id: user.id, token, user_agent: req.headers['user-agent'] || '', ip: req.ip || '', expires_at: expiresAt });
    const isProd = env.nodeEnv === 'production';
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      maxAge: 7*24*60*60*1000,
    });
    res.json({ data: { id: user.id, email: user.email, full_name: user.full_name, role: user.role } });
  } catch (e) { next(e); }
};

export const me = async (req, res, _next) => {
  if (!req.user) return res.status(401).json({ error: true, message: 'Unauthorized' });
  res.json({ data: req.user });
};

export const logout = async (req, res, _next) => {
  const token = req.cookies[cookieName];
  if (token) await Session.destroy({ where: { token } });
  const isProd = env.nodeEnv === 'production';
  res.cookie(cookieName, '', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax', path: '/', maxAge: 0 });
  res.status(204).end();
};


export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new HttpError(400, 'Email is required');
    const user = await User.findOne({ where: { email } });
    // Always respond 200 to avoid user enumeration
    if (!user) return res.json({ message: 'If that email exists, a reset link was sent.' });
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await PasswordReset.create({ user_id: user.id, token, expires_at: expiresAt });
    // TODO: Integrate email service. For now, return token in dev.
    res.json({ message: 'If that email exists, a reset link was sent.', token });
  } catch (e) { next(e); }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) throw new HttpError(400, 'Token and password are required');
    const pr = await PasswordReset.findOne({ where: { token } });
    if (!pr || pr.used_at || (pr.expires_at && pr.expires_at.getTime() < Date.now())) {
      throw new HttpError(400, 'Invalid or expired token');
    }
    const user = await User.findByPk(pr.user_id);
    if (!user) throw new HttpError(404, 'User not found');
    const hash = await bcrypt.hash(password, 10);
    user.password_hash = hash;
    await user.save();
    pr.used_at = new Date();
    await pr.save();
    res.json({ message: 'Password reset successful' });
  } catch (e) { next(e); }
};


