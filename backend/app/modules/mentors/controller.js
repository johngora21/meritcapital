import svc from './service.js';
import { HttpError } from '../../core/http/error.js';

export const list = async (_req, res, next) => { try { res.json({ data: await svc.list() }); } catch (e) { next(e); } };
export const get = async (req, res, next) => { try { const x = await svc.get(req.params.id); if (!x) throw new HttpError(404,'Not found'); res.json({ data: x }); } catch (e) { next(e); } };
export const create = async (req, res, next) => { try { const x = await svc.create(req.body); res.status(201).json({ data: x }); } catch (e) { next(e); } };
export const update = async (req, res, next) => { try { const x = await svc.update(req.params.id, req.body); if (!x) throw new HttpError(404,'Not found'); res.json({ data: x }); } catch (e) { next(e); } };
export const remove = async (req, res, next) => { try { await svc.remove(req.params.id); res.status(204).end(); } catch (e) { next(e); } };

export default { list, get, create, update, remove };

// DTO for mentors page
const mapToCard = (m) => ({
  id: String(m.id),
  name: m.name || m.full_name || '',
  title: m.title || '',
  company: m.company || '',
  description: m.bio || m.description || '',
  location: m.location || '',
  expertise: m.expertise || '',
  industry: m.industry || '',
  image: m.image_url || '',
  experience: m.experience || '',
  rating: Number(m.rating || 0),
  sessions: Number(m.sessions || 0),
  tags: m.tags ? String(m.tags).split(',').map(t=>t.trim()).filter(Boolean) : [],
  availability: m.availability || 'Available',
  languages: m.languages ? String(m.languages).split(',').map(t=>t.trim()).filter(Boolean) : [],
});

export const listCards = async (_req, res, next) => {
  try { const rows = await svc.list(); res.json({ data: rows.map(mapToCard) }); } catch (e) { next(e); }
};

