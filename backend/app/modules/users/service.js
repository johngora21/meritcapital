import bcrypt from 'bcryptjs';
import { User } from './model.js';
import { Investor } from '../investors/model.js';

export const createUser = async ({ email, password, full_name, role }) => {
  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password_hash, full_name, role });
  if (role === 'investor') {
    await Investor.create({ user_id: user.id, verified: false });
  }
  return user;
};

export const findByEmail = async (email) => User.findOne({ where: { email } });

export const listUsers = async () => User.findAll({ order: [['id', 'DESC']] });

export default { createUser, findByEmail, listUsers };

