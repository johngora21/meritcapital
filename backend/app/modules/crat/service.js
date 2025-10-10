import { CratAssessment, CratAnswer, CratDomain, CratQuestion, CratDomainScore } from './model.js';

export const createAssessment = async ({ project_id, created_by }) => CratAssessment.create({ project_id, created_by });
export const listAssessments = async (project_id) => CratAssessment.findAll({ where: { project_id }, order: [['id','DESC']] });
export const getLatestAssessmentByProject = async (project_id) => CratAssessment.findOne({ where: { project_id }, order: [['id','DESC']] });

export const upsertAnswer = async ({ assessment_id, question_id, rating, score, attachment_name, attachment_url }) =>
  CratAnswer.upsert({ assessment_id, question_id, rating, score, attachment_name, attachment_url });

export const upsertAnswerByKey = async ({ assessment_id, section_title, sub_domain, question_text, rating, score, attachment_url }) => {
  const [answer, created] = await CratAnswer.findOrCreate({
    where: {
      assessment_id,
      section_title,
      sub_domain
    },
    defaults: {
      assessment_id,
      section_title,
      sub_domain,
      question_text,
      rating,
      score,
      attachment_url
    }
  });

  if (!created) {
    await answer.update({ rating, score, attachment_url });
  }
  
  return answer;
};

export const seedDomains = async () => {
  const names = ['Commercial','Financial','Operations','Legal'];
  for (let i = 0; i < names.length; i++) {
    await CratDomain.findOrCreate({ where: { name: names[i] }, defaults: { display_order: i } });
  }
};

export const seedQuestions = async () => {
  // Get domains
  const commercialDomain = await CratDomain.findOne({ where: { name: 'Commercial' } });
  const financialDomain = await CratDomain.findOne({ where: { name: 'Financial' } });
  const operationsDomain = await CratDomain.findOne({ where: { name: 'Operations' } });
  const legalDomain = await CratDomain.findOne({ where: { name: 'Legal' } });

  // Commercial questions
  const commercialQuestions = [
    { domain_id: commercialDomain.id, question_text: 'Is the market demand clear and substantial?', display_order: 1 },
    { domain_id: commercialDomain.id, question_text: 'What is the market share potential?', display_order: 2 },
    { domain_id: commercialDomain.id, question_text: 'Are sales growing consistently?', display_order: 3 },
    { domain_id: commercialDomain.id, question_text: 'Are customer segments well-defined?', display_order: 4 },
    { domain_id: commercialDomain.id, question_text: 'Are payment terms reasonable?', display_order: 5 },
    { domain_id: commercialDomain.id, question_text: 'Is the sales strategy effective?', display_order: 6 },
    { domain_id: commercialDomain.id, question_text: 'Is product development on track?', display_order: 7 },
    { domain_id: commercialDomain.id, question_text: 'Is product distribution efficient?', display_order: 8 },
    { domain_id: commercialDomain.id, question_text: 'Is product pricing competitive?', display_order: 9 },
    { domain_id: commercialDomain.id, question_text: 'What is the level of competition?', display_order: 10 },
    { domain_id: commercialDomain.id, question_text: 'What is the competitive advantage?', display_order: 11 },
    { domain_id: commercialDomain.id, question_text: 'Is the marketing strategy effective?', display_order: 12 },
    { domain_id: commercialDomain.id, question_text: 'Is packaging and branding strong?', display_order: 13 },
    { domain_id: commercialDomain.id, question_text: 'Is product promotion working?', display_order: 14 }
  ];

  // Financial questions
  const financialQuestions = [
    { domain_id: financialDomain.id, question_text: 'Is the business profitable?', display_order: 1 },
    { domain_id: financialDomain.id, question_text: 'Is the balance sheet healthy?', display_order: 2 },
    { domain_id: financialDomain.id, question_text: 'Are cash flows positive?', display_order: 3 },
    { domain_id: financialDomain.id, question_text: 'Are financial projections realistic?', display_order: 4 },
    { domain_id: financialDomain.id, question_text: 'Is financial management sound?', display_order: 5 },
    { domain_id: financialDomain.id, question_text: 'Are financial records accurate?', display_order: 6 },
    { domain_id: financialDomain.id, question_text: 'Are tax obligations met?', display_order: 7 },
    { domain_id: financialDomain.id, question_text: 'Are financial controls in place?', display_order: 8 }
  ];

  // Operations questions
  const operationsQuestions = [
    { domain_id: operationsDomain.id, question_text: 'Is the vision clear?', display_order: 1 },
    { domain_id: operationsDomain.id, question_text: 'Is the management structure clear?', display_order: 2 },
    { domain_id: operationsDomain.id, question_text: 'Does the team have credible track record?', display_order: 3 },
    { domain_id: operationsDomain.id, question_text: 'Is the management fully committed?', display_order: 4 },
    { domain_id: operationsDomain.id, question_text: 'Does the team have relevant technical competence?', display_order: 5 },
    { domain_id: operationsDomain.id, question_text: 'Is performance measured?', display_order: 6 },
    { domain_id: operationsDomain.id, question_text: 'Does the company have proper PD and training?', display_order: 7 },
    { domain_id: operationsDomain.id, question_text: 'Is data collected and properly managed?', display_order: 8 },
    { domain_id: operationsDomain.id, question_text: 'Is there an MIS for operations?', display_order: 9 },
    { domain_id: operationsDomain.id, question_text: 'Is the MIS effective?', display_order: 10 },
    { domain_id: operationsDomain.id, question_text: 'Is quality check a norm?', display_order: 11 },
    { domain_id: operationsDomain.id, question_text: 'Are there quality control personnel?', display_order: 12 },
    { domain_id: operationsDomain.id, question_text: 'Is the platform optimally utilized?', display_order: 13 },
    { domain_id: operationsDomain.id, question_text: 'Is customer relationship management organized?', display_order: 14 },
    { domain_id: operationsDomain.id, question_text: 'Is there a clear business strategy?', display_order: 15 },
    { domain_id: operationsDomain.id, question_text: 'Is strategic planning effective?', display_order: 16 }
  ];

  // Legal questions
  const legalQuestions = [
    { domain_id: legalDomain.id, question_text: 'Are corporate documents in order?', display_order: 1 },
    { domain_id: legalDomain.id, question_text: 'Is compliance maintained?', display_order: 2 },
    { domain_id: legalDomain.id, question_text: 'Are contracts properly drafted?', display_order: 3 },
    { domain_id: legalDomain.id, question_text: 'Are employee contracts in place?', display_order: 4 },
    { domain_id: legalDomain.id, question_text: 'Are vendor contracts secure?', display_order: 5 },
    { domain_id: legalDomain.id, question_text: 'Is IP ownership clear?', display_order: 6 },
    { domain_id: legalDomain.id, question_text: 'Are trademarks protected?', display_order: 7 },
    { domain_id: legalDomain.id, question_text: 'Are patents filed?', display_order: 8 },
    { domain_id: legalDomain.id, question_text: 'Is the entrepreneurial character strong?', display_order: 9 },
    { domain_id: legalDomain.id, question_text: 'Is personal legal liability minimized?', display_order: 10 },
    { domain_id: legalDomain.id, question_text: 'Is there a succession plan?', display_order: 11 },
    { domain_id: legalDomain.id, question_text: 'Is the board of directors effective?', display_order: 12 },
    { domain_id: legalDomain.id, question_text: 'Are governance policies clear?', display_order: 13 },
    { domain_id: legalDomain.id, question_text: 'Is risk management in place?', display_order: 14 },
    { domain_id: legalDomain.id, question_text: 'Are audit procedures established?', display_order: 15 },
    { domain_id: legalDomain.id, question_text: 'Is transparency maintained?', display_order: 16 },
    { domain_id: legalDomain.id, question_text: 'Are legal advisors engaged?', display_order: 17 },
    { domain_id: legalDomain.id, question_text: 'Is regulatory compliance ensured?', display_order: 18 }
  ];

  // Insert all questions
  await CratQuestion.bulkCreate([...commercialQuestions, ...financialQuestions, ...operationsQuestions, ...legalQuestions]);
};

export const getQuestionsByDomain = async () => {
  const domains = await CratDomain.findAll({
    include: [{
      model: CratQuestion,
      as: 'questions',
      order: [['display_order', 'ASC']]
    }],
    order: [['display_order', 'ASC']]
  });
  
  return domains.map(domain => ({
    id: domain.id,
    name: domain.name,
    questions: domain.questions.map(q => ({
      id: q.id,
      question_text: q.question_text,
      display_order: q.display_order
    }))
  }));
};

export const getAssessmentWithAnswers = async (assessment_id) => {
  const assessment = await CratAssessment.findByPk(assessment_id);
  const answers = await CratAnswer.findAll({
    where: { assessment_id }
  });
  
  return {
    ...assessment.toJSON(),
    answers: answers.map(answer => ({
      id: answer.id,
      section_title: answer.section_title,
      sub_domain: answer.sub_domain,
      question_text: answer.question_text,
      rating: answer.rating,
      score: answer.score,
      attachment_url: answer.attachment_url
    }))
  };
};

export const calculateDomainScores = async (assessment_id) => {
  const answers = await CratAnswer.findAll({
    where: { assessment_id }
  });
  
  // Map section titles to domains (based on frontend hardcoded sections)
  // Handle both numbered and unnumbered section titles
  const sectionToDomain = {
    // Commercial (with and without numbers)
    '1. Market Demand & Share': 'Commercial',
    'Market Demand & Share': 'Commercial',
    '2. Sales & Traction': 'Commercial',
    'Sales & Traction': 'Commercial',
    '3. Product Development': 'Commercial',
    'Product Development': 'Commercial',
    '4. Competition': 'Commercial',
    'Competition': 'Commercial',
    '5. Marketing': 'Commercial',
    'Marketing': 'Commercial',
    
    // Financial (with and without numbers)
    '1. Profitability': 'Financial',
    'Profitability': 'Financial',
    '2. Balance Sheet': 'Financial',
    'Balance Sheet': 'Financial',
    '3. Cash Flows': 'Financial',
    'Cash Flows': 'Financial',
    '4. Projections': 'Financial',
    'Projections': 'Financial',
    '5. Financial Management': 'Financial',
    'Financial Management': 'Financial',
    
    // Operations (with and without numbers)
    '1. Management Capacity': 'Operations',
    'Management Capacity': 'Operations',
    '2. MIS': 'Operations',
    'MIS': 'Operations',
    '3. Quality Management': 'Operations',
    'Quality Management': 'Operations',
    '4. Overall Operations': 'Operations',
    'Overall Operations': 'Operations',
    '5. Strategy & Planning': 'Operations',
    'Strategy & Planning': 'Operations',
    
    // Legal (with and without numbers)
    '1. Corporate Documents & Compliance': 'Legal',
    'Corporate Documents & Compliance': 'Legal',
    '2. Contracts & Agreements': 'Legal',
    'Contracts & Agreements': 'Legal',
    '3. Intellectual Property': 'Legal',
    'Intellectual Property': 'Legal',
    '4. Entrepreneur & Family': 'Legal',
    'Entrepreneur & Family': 'Legal',
    '5. Corporate Governance': 'Legal',
    'Corporate Governance': 'Legal'
  };
  
  const domainScores = {};
  
  // Calculate scores by domain
  answers.forEach(answer => {
    const domainName = sectionToDomain[answer.section_title];
    if (domainName) {
      if (!domainScores[domainName]) {
        domainScores[domainName] = {
          domain_name: domainName,
          actual_score: 0,
          total_possible: 0,
          questions_answered: 0
        };
      }
      
      if (answer.score !== null) {
        domainScores[domainName].actual_score += answer.score;
        domainScores[domainName].questions_answered += 1;
      }
      domainScores[domainName].total_possible += 2; // Max score per question is 2
    }
  });
  
  // Calculate readiness percentages
  const results = Object.values(domainScores).map(domain => ({
    ...domain,
    readiness_pct: domain.total_possible > 0 ? 
      Math.round((domain.actual_score / domain.total_possible) * 100 * 100) / 100 : 0
  }));
  
  // Calculate total scores
  const totalActualScore = results.reduce((sum, domain) => sum + domain.actual_score, 0);
  const totalTargetScore = results.reduce((sum, domain) => sum + domain.total_possible, 0);
  const totalReadinessPercentage = totalTargetScore > 0 ? 
    Math.round((totalActualScore / totalTargetScore) * 100 * 100) / 100 : 0;

  return {
    domain_scores: results,
    total_actual_score: totalActualScore,
    total_target_score: totalTargetScore,
    total_readiness_percentage: totalReadinessPercentage
  };
};

export const saveDomainScores = async (assessment_id) => {
  console.log(`[saveDomainScores] Starting for assessment ${assessment_id}`);
  
  const scores = await calculateDomainScores(assessment_id);
  console.log(`[saveDomainScores] Calculated scores:`, JSON.stringify(scores, null, 2));
  
  // Get domain IDs from domain names
  const domains = await CratDomain.findAll();
  const domainNameToId = {};
  domains.forEach(domain => {
    domainNameToId[domain.name] = domain.id;
  });
  console.log(`[saveDomainScores] Domain name to ID mapping:`, domainNameToId);
  
  // Save each domain score
  for (const domainScore of scores.domain_scores) {
    const domainId = domainNameToId[domainScore.domain_name];
    console.log(`[saveDomainScores] Processing domain ${domainScore.domain_name} (ID: ${domainId})`);
    
    if (domainId) {
      const result = await CratDomainScore.upsert({
        assessment_id: assessment_id,
        domain_id: domainId,
        actual_score: domainScore.actual_score,
        target_score: domainScore.total_possible,
        readiness_pct: domainScore.readiness_pct
      });
      console.log(`[saveDomainScores] Saved domain score for ${domainScore.domain_name}:`, result);
    } else {
      console.log(`[saveDomainScores] WARNING: No domain ID found for ${domainScore.domain_name}`);
    }
  }
  
  console.log(`[saveDomainScores] Completed for assessment ${assessment_id}`);
  return scores;
};

export default { 
  createAssessment, 
  listAssessments,
  getLatestAssessmentByProject,
  upsertAnswer,
  upsertAnswerByKey, 
  seedDomains, 
  seedQuestions,
  getQuestionsByDomain,
  getAssessmentWithAnswers,
  calculateDomainScores,
  saveDomainScores
};