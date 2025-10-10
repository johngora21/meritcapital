import svc from './service.js';
import { Project } from '../projects/model.js';

export const seed = async (_req, res, next) => { 
  try { 
    await svc.seedDomains(); 
    await svc.seedQuestions(); 
    res.json({ ok: true }); 
  } catch (e) { next(e); } 
};

export const create = async (req, res, next) => { 
  try { 
    const a = await svc.createAssessment({ project_id: req.body.project_id, created_by: req.user.id }); 
    res.status(201).json({ data: a }); 
  } catch (e) { next(e); } 
};

export const list = async (req, res, next) => { 
  try { 
    res.json({ data: await svc.listAssessments(req.params.project_id) }); 
  } catch (e) { next(e); } 
};

export const getLatestAssessment = async (req, res, next) => { 
  try { 
    const assessment = await svc.getLatestAssessmentByProject(req.params.project_id);
    res.json({ data: assessment }); 
  } catch (e) { next(e); } 
};

export const getQuestions = async (req, res, next) => {
  try {
    const questions = await svc.getQuestionsByDomain();
    res.json({ data: questions });
  } catch (e) { next(e); }
};

export const getAssessment = async (req, res, next) => {
  try {
    const assessment = await svc.getAssessmentWithAnswers(req.params.assessment_id);
    // Disable caching to ensure fresh data
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.json({ data: assessment });
  } catch (e) { next(e); }
};

export const saveAnswer = async (req, res, next) => {
  try {
    const { assessment_id, section_title, sub_domain, question_text, rating, attachment_url } = req.body;
    const score = rating === 'yes' ? 2 : rating === 'maybe' ? 1 : 0;
    
    console.log('Save Answer Request:', { assessment_id, section_title, sub_domain, rating, score });
    
    await svc.upsertAnswerByKey({ 
      assessment_id, 
      section_title, 
      sub_domain, 
      question_text,
      rating, 
      score, 
      attachment_url 
    });
    
    // Save domain scores after each answer
    console.log('Calculating and saving domain scores...');
    await svc.saveDomainScores(assessment_id);
    console.log('Domain scores saved successfully');
    
    console.log('Answer saved successfully');
    res.json({ ok: true });
  } catch (e) { 
    console.error('Error saving answer:', e);
    next(e); 
  }
};

export const calculateScores = async (req, res, next) => {
  try {
    const scores = await svc.calculateDomainScores(req.params.assessment_id);
    res.json({ data: scores });
  } catch (e) { next(e); }
};

// Projects list for CRAT dropdown - role-based access
export const projectsDropdown = async (req, res, next) => {
  try {
    const userRole = req.user.role;
    let rows;
    
    if (userRole === 'entrepreneur') {
      // Entrepreneurs can only see their own projects
      rows = await Project.findAll({ 
        where: { owner_id: req.user.id },
        attributes: ['id','name'], 
        order: [['name','ASC']] 
      });
    } else {
      // Admin, investor, mentor can see all projects
      rows = await Project.findAll({ 
        attributes: ['id','name'], 
        order: [['name','ASC']] 
      });
    }
    
    res.json({ data: rows.map(r => ({ id: String(r.id), name: r.name })) });
  } catch (e) { next(e); }
};

export default { seed, create, list, getLatestAssessment, getQuestions, getAssessment, saveAnswer, calculateScores, projectsDropdown };

