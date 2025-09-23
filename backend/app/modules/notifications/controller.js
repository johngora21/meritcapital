import svc from './service.js';
import { HttpError } from '../../core/http/error.js';

export const myNotifications = async (req, res, next) => { try { res.json({ data: await svc.list(req.user.id) }); } catch (e) { next(e); } };
export const create = async (req, res, next) => { try { const x = await svc.create(req.body); res.status(201).json({ data: x }); } catch (e) { next(e); } };
export const read = async (req, res, next) => { try { const x = await svc.markRead(req.params.id, req.user.id); if (!x) throw new HttpError(404,'Not found'); res.json({ data: x }); } catch (e) { next(e); } };

export default { myNotifications, create, read };

