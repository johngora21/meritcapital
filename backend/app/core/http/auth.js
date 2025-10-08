import { HttpError } from './error.js';
import { Session } from '../../modules/auth/session.model.js';
import { User } from '../../modules/users/model.js';

const cookieName = 'mc_session';

export const authenticate = async (req, _res, next) => {
  // Support both cookie-based session and Bearer token
  let token = req.cookies?.[cookieName];
  if (!token) {
    const auth = req.headers?.authorization || '';
    if (auth.startsWith('Bearer ')) token = auth.slice(7).trim();
  }
  if (!token) return next(new HttpError(401, 'Unauthorized'));
  const row = await Session.findOne({ where: { token } });
  if (!row) return next(new HttpError(401, 'Unauthorized'));
  if (row.expires_at && new Date(row.expires_at).getTime() < Date.now()) {
    // Cleanup expired session token
    try { await Session.destroy({ where: { token } }); } catch {}
    return next(new HttpError(401, 'Unauthorized'));
  }
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

