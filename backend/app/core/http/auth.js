import { HttpError } from './error.js';
import { Session } from '../../modules/auth/session.model.js';
import { User } from '../../modules/users/model.js';

const cookieName = 'mc_session';

export const authenticate = async (req, _res, next) => {
  console.log('Auth middleware - cookies:', req.cookies);
  const token = req.cookies?.[cookieName];
  console.log('Auth middleware - token:', token ? 'present' : 'missing');
  if (!token) return next(new HttpError(401, 'Unauthorized'));
  const row = await Session.findOne({ where: { token } });
  if (!row) return next(new HttpError(401, 'Unauthorized'));
  const user = await User.findByPk(row.user_id);
  if (!user) return next(new HttpError(401, 'Unauthorized'));
  req.user = { id: user.id, email: user.email, full_name: user.full_name, role: user.role };
  next();
};

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user) return next(new HttpError(401, 'Unauthorized'));
  if (roles.length && !roles.includes(req.user.role)) {
    return next(new HttpError(403, 'Forbidden'));
  }
  next();
};

export default authenticate;

