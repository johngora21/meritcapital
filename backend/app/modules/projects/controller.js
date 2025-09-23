import svc, { reviewsService } from './service.js';
import { HttpError } from '../../core/http/error.js';

export const list = async (_req, res, next) => {
  try { res.json({ data: await svc.listProjects() }); } catch (e) { next(e); }
};
export const get = async (req, res, next) => {
  try {
    const item = await svc.getProject(req.params.id);
    if (!item) throw new HttpError(404, 'Not found');
    res.json({ data: item });
  } catch (e) { next(e); }
};
export const create = async (req, res, next) => {
  try { const p = await svc.createProject(req.body); res.status(201).json({ data: p }); } catch (e) { next(e); }
};
export const update = async (req, res, next) => {
  try {
    const p = await svc.updateProject(req.params.id, req.body);
    if (!p) throw new HttpError(404, 'Not found');
    res.json({ data: p });
  } catch (e) { next(e); }
};
export const remove = async (req, res, next) => {
  try { await svc.deleteProject(req.params.id); res.status(204).end(); } catch (e) { next(e); }
};

export default { list, get, create, update, remove };

// Map DB project to frontend ProjectDto for cards/modal
const mapProjectToCard = (p) => ({
  id: String(p.id),
  name: p.name,
  description: p.description || '',
  stage: p.stage,
  industry: p.industry || '',
  image: p.image_url || '',
  founded: p.founded || '',
  employees: p.employees || '',
  revenue: p.revenue_text || '',
  tags: Array.isArray(p.tags) ? p.tags.map(t => t.tag || t) : [],
  website: p.website || undefined,
  linkedin: p.linkedin || undefined,
  seeking: p.seeking ? p.seeking.split(',').map(s => s.trim()).filter(Boolean) : [],
  status: p.status,
  lastUpdated: p.last_updated ? new Date(p.last_updated).toISOString() : new Date().toISOString(),
});

export const listCards = async (_req, res, next) => {
  try {
    const rows = await svc.listProjects();
    const data = rows.map(mapProjectToCard);
    res.json({ data });
  } catch (e) { next(e); }
};

export const listPending = async (_req, res, next) => {
  try {
    const rows = await reviewsService.listPending();
    res.json({ data: rows });
  } catch (e) { next(e); }
};

export const review = async (req, res, next) => {
  try {
    const updated = await reviewsService.reviewProject({
      project_id: req.params.id,
      reviewer_user_id: req.user.id,
      decision: req.body.decision,
      notes: req.body.notes || null,
    });
    if (!updated) throw new HttpError(404, 'Not found');
    res.json({ data: updated });
  } catch (e) { next(e); }
};

export const assignMentor = async (req, res, next) => {
  try {
    const rec = await reviewsService.assignMentor({
      project_id: req.params.id,
      mentor_user_id: req.body.mentor_user_id,
    });
    if (!rec) throw new HttpError(404, 'Not found');
    res.status(201).json({ data: rec });
  } catch (e) { next(e); }
};

