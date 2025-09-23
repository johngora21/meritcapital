import svc from './service.js';
import { HttpError } from '../../core/http/error.js';

export const list = async (_req, res, next) => { try { res.json({ data: await svc.list() }); } catch (e) { next(e); } };
export const get = async (req, res, next) => { try { const x = await svc.get(req.params.id); if (!x) throw new HttpError(404,'Not found'); res.json({ data: x }); } catch (e) { next(e); } };
export const create = async (req, res, next) => { try { const x = await svc.create(req.body); res.status(201).json({ data: x }); } catch (e) { next(e); } };
export const update = async (req, res, next) => { try { const x = await svc.update(req.params.id, req.body); if (!x) throw new HttpError(404,'Not found'); res.json({ data: x }); } catch (e) { next(e); } };
export const remove = async (req, res, next) => { try { await svc.remove(req.params.id); res.status(204).end(); } catch (e) { next(e); } };

export default { list, get, create, update, remove };

// DTO for investors page
const mapToCard = (i) => ({
  id: String(i.id),
  name: i.name || '',
  company: i.firm || i.company || '',
  description: i.description || '',
  location: i.location || '',
  type: i.type || 'Venture Capital',
  industry: i.industry || '',
  image: i.image_url || '',
  portfolio: Number(i.portfolio || 0),
  investments: i.investments || '',
  stage: i.stage || '',
  tags: i.tags ? String(i.tags).split(',').map(t=>t.trim()).filter(Boolean) : [],
  website: i.website || undefined,
  linkedin: i.linkedin || undefined,
});

export const listCards = async (_req, res, next) => {
  try { const rows = await svc.list(); res.json({ data: rows.map(mapToCard) }); } catch (e) { next(e); }
};

