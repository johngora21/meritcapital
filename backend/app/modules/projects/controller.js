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
  try { 
    const defaultStatus = 'Pending';
    const incoming = req.body || {};
    const projectData = { ...incoming, owner_id: req.user.id, status: incoming.status || defaultStatus };
    const p = await svc.createProject(projectData); 
    res.status(201).json({ data: p }); 
  } catch (e) { next(e); }
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
  project_title: p.project_title || '',
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
  status: p.status || 'Pending',
  lastUpdated: p.last_updated ? new Date(p.last_updated).toISOString() : new Date().toISOString(),
  
  // Additional fields for detailed view
  tagline: p.tagline || '',
  founder_name: p.founder_name || '',
  founder_role: p.founder_role || '',
  founder_email: p.founder_email || '',
  founder_phone: p.founder_phone || '',
  founder_linkedin: p.founder_linkedin || '',
  headquarters_country: p.headquarters_country || '',
  headquarters_city: p.headquarters_city || '',
  legal_structure: p.legal_structure || '',
  registration_number: p.registration_number || '',
  tax_id: p.tax_id || '',
  primary_market: p.primary_market || '',
  target_markets: p.target_markets ? (Array.isArray(p.target_markets) ? p.target_markets : p.target_markets.split(',').map(s => s.trim())) : [],
  operating_countries: p.operating_countries ? (Array.isArray(p.operating_countries) ? p.operating_countries : p.operating_countries.split(',').map(s => s.trim())) : [],
  problem_statement: p.problem_statement || '',
  solution_description: p.solution_description || '',
  key_features: p.key_features || '',
  target_customer: p.target_customer || '',
  value_proposition: p.value_proposition || '',
  market_size: p.market_size || '',
  competitive_advantage: p.competitive_advantage || '',
  main_competitors: p.main_competitors || '',
  market_penetration: p.market_penetration || '',
  customer_acquisition_cost: p.customer_acquisition_cost || '',
  customer_lifetime_value: p.customer_lifetime_value || '',
  monthly_active_users: p.monthly_active_users || '',
  revenue_growth_rate: p.revenue_growth_rate || '',
  key_performance_indicators: p.key_performance_indicators || '',
  funding_stage: p.funding_stage || '',
  funding_raised: p.funding_raised || '',
  monthly_burn_rate: p.monthly_burn_rate || '',
  runway: p.runway || '',
  product_type: p.product_type ? (Array.isArray(p.product_type) ? p.product_type : p.product_type.split(',').map(s => s.trim())) : [],
  seeking_investment: p.seeking_investment || '',
  investment_amount_needed: p.investment_amount_needed || '',
  use_of_funds: p.use_of_funds || '',
  previous_investors: p.previous_investors || '',
  investment_timeline: p.investment_timeline || '',
  intellectual_property: p.intellectual_property ? (Array.isArray(p.intellectual_property) ? p.intellectual_property : p.intellectual_property.split(',').map(s => s.trim())) : [],
  social_mission: p.social_mission || '',
  impact_metrics: p.impact_metrics || '',
  sdg_alignment: p.sdg_alignment ? (Array.isArray(p.sdg_alignment) ? p.sdg_alignment : p.sdg_alignment.split(',').map(s => s.trim())) : [],
  beneficiaries: p.beneficiaries || '',
  regulatory_compliance: p.regulatory_compliance || '',
  data_privacy_compliance: p.data_privacy_compliance || '',
  preferred_contact_method: p.preferred_contact_method || '',
  best_time_to_contact: p.best_time_to_contact || '',
  demo_video: p.demo_video || '',
  press_coverage: p.press_coverage || '',
  awards_recognition: p.awards_recognition || '',
  partnerships: p.partnerships || ''
  , pitch_deck_name: p.pitch_deck_name || ''
  , business_plan_name: p.business_plan_name || ''
  , co_founders: (() => {
    try {
      return p.co_founders ? JSON.parse(p.co_founders) : [];
    } catch (e) {
      console.log('Error parsing co_founders:', e, p.co_founders);
      return [];
    }
  })()
  , team_members: (() => {
    try {
      return p.team_members ? JSON.parse(p.team_members) : [];
    } catch (e) {
      console.log('Error parsing team_members:', e, p.team_members);
      return [];
    }
  })()
});

export const listCards = async (_req, res, next) => {
  try {
    const rows = await svc.listProjects();
    const data = rows.map(mapProjectToCard);
    res.json({ data });
  } catch (e) { next(e); }
};

export const listMyProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const rows = await svc.listProjectsByOwner(userId);
    const data = rows.map(mapProjectToCard);
    res.json({ data });
  } catch (e) { next(e); }
};

export const updateProjectStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected', 'Active'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be Pending, Approved, Rejected, or Active' });
    }
    
    await svc.updateProjectStatus(id, status);
    res.json({ message: 'Project status updated successfully' });
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

