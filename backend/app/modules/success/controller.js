import svc from './service.js';
import { HttpError } from '../../core/http/error.js';

export const list = async (_req, res, next) => { try { res.json({ data: await svc.list() }); } catch (e) { next(e); } };
export const get = async (req, res, next) => { try { const x = await svc.get(req.params.id); if (!x) throw new HttpError(404,'Not found'); res.json({ data: x }); } catch (e) { next(e); } };
export const create = async (req, res, next) => { try { const x = await svc.create(req.body); res.status(201).json({ data: x }); } catch (e) { next(e); } };
export const update = async (req, res, next) => { try { const x = await svc.update(req.params.id, req.body); if (!x) throw new HttpError(404,'Not found'); res.json({ data: x }); } catch (e) { next(e); } };
export const remove = async (req, res, next) => { try { await svc.remove(req.params.id); res.status(204).end(); } catch (e) { next(e); } };

export default { list, get, create, update, remove };

// DTO for success stories
const mapToCard = (s) => ({
  title: s.title,
  description: s.summary || s.description || '',
  date: s.date || '',
  videoUrl: s.video_url || '',
  poster: s.image_url || '',
  fullStory: s.full_story || s.summary || '',
  publishedDate: s.published_date || new Date().toLocaleString(),
  industry: s.industry || '',
});

export const listCards = async (_req, res, next) => {
  try { const rows = await svc.list(); res.json({ data: rows.map(mapToCard) }); } catch (e) { next(e); }
};

