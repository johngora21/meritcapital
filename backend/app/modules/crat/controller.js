import svc from './service.js';

export const seed = async (_req, res, next) => { try { await svc.seedDomains(); res.json({ ok: true }); } catch (e) { next(e); } };
export const create = async (req, res, next) => { try { const a = await svc.createAssessment({ project_id: req.body.project_id, created_by: req.user.id }); res.status(201).json({ data: a }); } catch (e) { next(e); } };
export const list = async (req, res, next) => { try { res.json({ data: await svc.listAssessments(req.params.project_id) }); } catch (e) { next(e); } };

export default { seed, create, list };

// Minimal projects list for CRAT dropdown
import { Project } from '../projects/model.js';
export const projectsDropdown = async (_req, res, next) => {
  try {
    const rows = await Project.findAll({ attributes: ['id','name'], order: [['name','ASC']] });
    res.json({ data: rows.map(r => ({ id: String(r.id), name: r.name })) });
  } catch (e) { next(e); }
};

