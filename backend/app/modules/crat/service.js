import { CratAssessment, CratAnswer, CratDomain, CratQuestion, CratDomainScore } from './model.js';

export const createAssessment = async ({ project_id, created_by }) => CratAssessment.create({ project_id, created_by });
export const listAssessments = async (project_id) => CratAssessment.findAll({ where: { project_id }, order: [['id','DESC']] });
export const upsertAnswer = async ({ assessment_id, question_id, rating, score, attachment_name, attachment_url }) =>
  CratAnswer.upsert({ assessment_id, question_id, rating, score, attachment_name, attachment_url });

export const seedDomains = async () => {
  const names = ['Commercial','Financial','Operations','Legal'];
  for (let i = 0; i < names.length; i++) {
    await CratDomain.findOrCreate({ where: { name: names[i] }, defaults: { display_order: i } });
  }
};

export default { createAssessment, listAssessments, upsertAnswer, seedDomains };






