import svc from './service.js';
import { HttpError } from '../../core/http/error.js';

export const list = async (req, res, next) => {
  try {
    const isAdmin = req.user?.role === 'admin' || req.user?.role === 'superadmin';
    const data = isAdmin ? await svc.listAll() : await svc.listMine(req.user.id);
    res.json({ data });
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    if (req.user.role !== 'investor' && req.user.role !== 'superadmin') throw new HttpError(403, 'Forbidden');
    const inv = await svc.create({ ...req.body, investor_user_id: req.user.id });
    res.status(201).json({ data: inv });
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    if (req.user.role !== 'investor' && req.user.role !== 'superadmin') throw new HttpError(403, 'Forbidden');
    await svc.remove(req.params.id, req.user.id);
    res.status(204).end();
  } catch (e) { next(e); }
};

export default { list, create, remove };






