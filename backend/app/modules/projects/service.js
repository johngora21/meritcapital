import { Project, ProjectTag, ProjectReview, ProjectMentorAssignment } from './model.js';

export const listProjects = async () => Project.findAll({ include: [{ model: ProjectTag, as: 'tags' }] });
export const getProject = async (id) => Project.findByPk(id, { include: [{ model: ProjectTag, as: 'tags' }] });
export const createProject = async (data) => Project.create(data);
export const updateProject = async (id, data) => {
  const p = await Project.findByPk(id);
  if (!p) return null;
  return p.update(data);
};
export const deleteProject = async (id) => Project.destroy({ where: { id } });

export default { listProjects, getProject, createProject, updateProject, deleteProject };

export const reviewProject = async ({ project_id, reviewer_user_id, decision, notes }) => {
  const proj = await Project.findByPk(project_id);
  if (!proj) return null;
  await ProjectReview.create({ project_id, reviewer_user_id, decision, notes });
  return proj.update({ status: decision === 'approve' ? 'Approved' : 'Rejected' });
};

export const assignMentor = async ({ project_id, mentor_user_id }) => {
  const proj = await Project.findByPk(project_id);
  if (!proj) return null;
  return ProjectMentorAssignment.create({ project_id, mentor_user_id });
};

export const listPending = async () => Project.findAll({ where: { status: 'Active' } });

export const reviewsService = { reviewProject, assignMentor, listPending };

