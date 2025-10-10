"use client";
import { Tabs, BarChart } from '@/components';
import { Eye, Trash2, Paperclip } from 'lucide-react';
import React from 'react';

// Minimal project shape for dropdown purposes
type CratProject = {
  id: string | number;
  name: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  stage: string;
  industry: string;
  status: string;
  revenue: string;
  lastUpdated: string;
  imageUrl: string;
  tags: string[];
};

const API = 'http://localhost:4000/api/v1';

export default function CratPage() {
  const [tab, setTab] = React.useState(0);
  const [projects, setProjects] = React.useState<CratProject[]>([]);
  const [loadingProjects, setLoadingProjects] = React.useState<boolean>(true);
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | number | ''>('');
  const [ratings, setRatings] = React.useState<Record<string, 'yes' | 'maybe' | 'no'>>({});
  const [attachments, setAttachments] = React.useState<Record<string, string>>({});
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [assessmentId, setAssessmentId] = React.useState<string | null>(null);
  const [scores, setScores] = React.useState<any>(null);
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const getKey = (section: string, sub: string) => `${section}|${sub}`;
  const getScoreFromRating = (r?: 'yes' | 'maybe' | 'no') => (r === 'yes' ? 2 : r === 'maybe' ? 1 : 0);

  const addSectionNumber = (sectionTitle: string): string => {
    // Map section titles to their numbered versions
    const sectionMap: Record<string, string> = {
      // Commercial
      'Market Demand & Share': '1. Market Demand & Share',
      'Sales & Traction': '2. Sales & Traction', 
      'Product Development': '3. Product Development',
      'Competition': '4. Competition',
      'Marketing': '5. Marketing',
      
      // Financial
      'Profitability': '1. Profitability',
      'Balance Sheet': '2. Balance Sheet',
      'Cash Flows': '3. Cash Flows',
      'Projections': '4. Projections',
      'Financial Management': '5. Financial Management',
      
      // Operations
      'Management Capacity': '1. Management Capacity',
      'MIS': '2. MIS',
      'Quality Management': '3. Quality Management',
      'Overall Operations': '4. Overall Operations',
      'Strategy & Planning': '5. Strategy & Planning',
      
      // Legal
      'Corporate Documents & Compliance': '1. Corporate Documents & Compliance',
      'Contracts & Agreements': '2. Contracts & Agreements',
      'Intellectual Property': '3. Intellectual Property',
      'Entrepreneur & Family': '4. Entrepreneur & Family',
      'Corporate Governance': '5. Corporate Governance'
    };
    
    return sectionMap[sectionTitle] || sectionTitle; // Return with number if mapped, otherwise return original
  };

  React.useEffect(() => {
    const load = async () => {
      try {
        console.log('API constant:', API);
        const url = `${API}/crat/projects/dropdown`;
        console.log('Fetching from URL:', url);
        const res = await fetch(url, { credentials: 'include' });
        console.log('Response status:', res.status);
        const data = await res.json().catch(() => ({}));
        console.log('Response data:', data);
        const items: any[] = data?.data || [];
        const mapped: CratProject[] = items.map((p: any) => ({ id: p.id, name: p.name }));
        setProjects(mapped);
        setSelectedProjectId((prev) => (prev !== '' ? prev : (mapped[0]?.id ?? '')));
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    };
    load();
  }, []);

  // Load questions when component mounts
  React.useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await fetch(`${API}/crat/questions`, { credentials: 'include' });
        const data = await res.json().catch(() => ({}));
        console.log('Loaded questions from API:', data?.data);
        setQuestions(data?.data || []);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };
    loadQuestions();
  }, []);

  // Create or load assessment when project is selected
  React.useEffect(() => {
    if (selectedProjectId) {
      loadOrCreateAssessment();
    }
  }, [selectedProjectId]);

  const loadOrCreateAssessment = async () => {
    try {
      // First, try to find existing assessment for this project
      const res = await fetch(`${API}/crat/project/${selectedProjectId}/latest`, { 
        credentials: 'include' 
      });
      
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.data?.id) {
          console.log('Found existing assessment:', data.data.id);
          setAssessmentId(data.data.id);
          await loadExistingAnswers(data.data.id);
          return;
        }
      }
      
      // If no existing assessment found, create a new one
      console.log('No existing assessment found, creating new one');
      await createAssessment();
    } catch (error) {
      console.error('Error loading or creating assessment:', error);
      // Fallback to creating new assessment
      await createAssessment();
    }
  };

  const createAssessment = async () => {
    try {
      const res = await fetch(`${API}/crat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ project_id: selectedProjectId })
      });
      const data = await res.json().catch(() => ({}));
      if (data?.data?.id) {
        setAssessmentId(data.data.id);
        // Load existing answers for this assessment
        await loadExistingAnswers(data.data.id);
      }
    } catch (error) {
      console.error('Error creating assessment:', error);
    }
  };

  const loadExistingAnswers = async (assessmentId: string) => {
    try {
      console.log('Loading existing answers for assessment:', assessmentId);
      const res = await fetch(`${API}/crat/assessment/${assessmentId}?t=${Date.now()}`, { 
        credentials: 'include',
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const data = await res.json().catch(() => ({}));
      
      console.log('Raw API response data:', data);
      console.log('Data structure:', JSON.stringify(data, null, 2));
      
      if (data?.data?.answers) {
        console.log('Loaded existing answers:', data.data.answers);
        console.log('Number of answers loaded:', data.data.answers.length);
        
        // Convert answers to ratings state
        const existingRatings: Record<string, 'yes' | 'maybe' | 'no'> = {};
        const existingAttachments: Record<string, string> = {};
        
        data.data.answers.forEach((answer: any) => {
          // Add numerical prefix to section_title to match calculation function expectations
          const sectionTitleWithNumber = addSectionNumber(answer.section_title);
          const key = getKey(sectionTitleWithNumber, answer.sub_domain);
          existingRatings[key] = answer.rating || 'no';
          if (answer.attachment_url) {
            existingAttachments[key] = answer.attachment_url;
          }
          
          console.log(`Mapped answer: ${answer.section_title} -> ${sectionTitleWithNumber} -> ${key} = ${answer.rating}`);
        });
        
        console.log('Final existingRatings object:', existingRatings);
        
        console.log('Setting existing ratings:', existingRatings);
        setRatings(existingRatings);
        setAttachments(existingAttachments);
        
        console.log('Ratings state should now be updated with', Object.keys(existingRatings).length, 'items');
        console.log('Sample existing ratings:', Object.entries(existingRatings).slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading existing answers:', error);
    }
  };

  const saveAnswer = async (questionId: string, answer: string, attachment?: string) => {
    if (!assessmentId) return;
    
    try {
      await fetch(`${API}/crat/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          assessment_id: assessmentId,
          question_id: questionId,
          answer_text: answer,
          attachment_url: attachment || null
        })
      });
      
      // Recalculate scores after saving answer
      calculateScores();
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  const calculateScores = async () => {
    if (!assessmentId) return;
    
    try {
      const res = await fetch(`${API}/crat/calculate-scores/${assessmentId}`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json().catch(() => ({}));
      if (data?.data) {
        setScores(data.data);
      }
    } catch (error) {
      console.error('Error calculating scores:', error);
    }
  };

  const getDomainName = (currentTab: number) => {
    switch (currentTab) {
      case 1: return 'Commercial';
      case 2: return 'Financial';
      case 3: return 'Operations';
      case 4: return 'Legal';
      default: return 'Legal';
    }
  };

  const handleRatingChange = (sectionTitle: string, subDomain: string, newRating: 'yes' | 'maybe' | 'no', domainName: string) => {
    const key = getKey(sectionTitle, subDomain);
    console.log(`Rating changed: ${key} = ${newRating} (Domain: ${domainName}, Tab: ${tab})`);
    setRatings((prev) => {
      const updated = { ...prev, [key]: newRating };
      console.log('Updated ratings:', updated);
      return updated;
    });
    // Note: We only save to DB when user clicks "Save Assessment" button
  };

  const calculateCurrentTabTotalScore = () => {
    const currentDomainName = getDomainName(tab);
    let totalScore = 0;
    let maxScore = 0;

    console.log(`=== Calculating Total Score for ${currentDomainName} (Tab: ${tab}) ===`);
    console.log('Current ratings:', ratings);
    console.log('Current ratings keys:', Object.keys(ratings));
    console.log('Current ratings count:', Object.keys(ratings).length);

    // Get all sections for the current tab (hardcoded)
    const sections = tab === 1 ? [
      { title: '1. Market Demand & Share', rows: [{ sub: 'Demand', q: 'Is there sufficient evidence for demand of your product?' }, { sub: 'Market share', q: 'Is the market share growing?' }] },
      { title: '2. Sales & Traction', rows: [{ sub: 'Sales', q: 'Are sales growing on a monthly/quarterly/annual basis?' }, { sub: 'Customer segments', q: 'Are there customer segments and clear focus?' }, { sub: 'Payment terms', q: 'Are payment terms in favor of the company?' }, { sub: 'Sales strategy', q: 'Is the sales strategy consistent with growth plans?' }] },
      { title: '3. Product Development', rows: [{ sub: 'Product development', q: 'Are there clear product road maps?' }, { sub: 'Product distribution', q: 'Are products properly distributed?' }, { sub: 'Product pricing basis', q: 'Are products properly priced?' }] },
      { title: '4. Competition', rows: [{ sub: 'Level of competition', q: 'Do you understand the level of competition and have you conducted analysis?' }, { sub: 'Competitive advantage', q: 'Does the company have a clear competitive advantage?' }] },
      { title: '5. Marketing', rows: [{ sub: 'Marketing strategy', q: 'Is the marketing strategy consistent with growth plans?' }, { sub: 'Packaging & branding', q: "Are the company's products properly packed and branded?" }, { sub: 'Product promotion', q: 'Is there a clear promotion strategy?' }] }
    ] : tab === 2 ? [
      { title: '1. Profitability', rows: [{ sub: 'Revenue', q: 'Is revenue growing?' }, { sub: 'Cost management', q: 'Are unit costs declining?' }] },
      { title: '2. Balance Sheet', rows: [{ sub: 'Working capital management', q: 'Is WC well managed?' }, { sub: 'Assets management', q: 'Are assets well managed?' }, { sub: 'Debt manageability', q: 'Is debt properly managed?' }, { sub: 'OBS Items', q: 'Are OBS items in favor of the company?' }] },
      { title: '3. Cash Flows', rows: [{ sub: 'Operating cash flow', q: 'Is OCF stable and growing?' }, { sub: 'Capital expenses', q: 'Has the company made notable and necessary CAPEX?' }] },
      { title: '4. Projections', rows: [{ sub: 'Assumptions', q: 'Are assumptions realistic (based on existing facts)?' }] },
      { title: '5. Financial Management', rows: [{ sub: 'Quality of financial records', q: 'Does the company have proper financial records?' }, { sub: 'Financial reporting', q: 'Are financials properly reported?' }, { sub: 'Internal controls', q: 'Do internal controls exist?' }, { sub: 'Tax liability', q: 'Are all taxes fully paid?' }] }
    ] : tab === 3 ? [
      { title: '1. Management Capacity', rows: [{ sub: 'Vision clarity', q: 'Is the vision clear?' }, { sub: 'Management structure', q: 'Is the management structure clear?' }, { sub: 'Track record', q: 'Does the team have credible track record?' }, { sub: 'Management commitment', q: 'Is the management fully committed?' }, { sub: 'Team capacity', q: 'Does the team have relevant technical competence?' }, { sub: 'Performance measurement', q: 'Is performance measured?' }, { sub: 'Professional development', q: 'Does the company have a proper PD and or on-job training?' }] },
      { title: '2. MIS', rows: [{ sub: 'Data management', q: 'Is data collected and properly managed?' }, { sub: 'System used', q: 'Is there an MIS for handling organization operations?' }, { sub: 'System effectiveness', q: 'Is the MIS used effective?' }] },
      { title: '3. Quality Management', rows: [{ sub: 'Quality control', q: 'Is quality check a norm at the company?' }, { sub: 'Quality management team', q: 'Are there personnel in charge of quality control?' }] },
      { title: '4. Overall Operations', rows: [{ sub: 'Platform utilization', q: 'Is the platform optimally utilized?' }, { sub: 'Customer relations', q: 'Is customer relationship management organized?' }] },
      { title: '5. Strategy & Planning', rows: [{ sub: 'Business strategy', q: 'Does the company have a business strategy?' }, { sub: 'Organization Planning', q: 'Is there a formal planning process?' }] }
    ] : [
      { title: '1. Corporate Documents & Compliance', rows: [{ sub: 'Business incorporation', q: 'Is the business incorporated/registered?' }, { sub: 'Tax Identification', q: 'Does the company have tax identification number?' }, { sub: 'Tax compliance', q: 'Is the business up to date with the required taxes?' }, { sub: 'Business Licence', q: 'Does the business have required licenses?' }, { sub: 'Sector specific compliance', q: 'Does the company have other certifications per the respective industry regulations?' }] },
      { title: '2. Contracts & Agreements', rows: [{ sub: 'Lease agreements', q: 'Are lease agreements available and clear?' }, { sub: 'Customer contracts', q: 'Are customer agreements available and clear?' }, { sub: 'Supplier contracts', q: 'Are supplier agreements available and clear?' }, { sub: 'Employees contracts', q: 'Do employees have contracts (including the founders)?' }] },
      { title: '3. Intellectual Property', rows: [{ sub: 'IP ownership', q: 'Does the company own copyrights to its source codes/or patent to its solution?' }] },
      { title: '4. Entrepreneur & Family', rows: [{ sub: 'Entrepreneurial character', q: 'Is the entrepreneur adaptable, resilient, and reliable?' }, { sub: 'Personal legal liability', q: 'Does the management team have any personal liability that would affect the company?' }, { sub: 'Succession plan', q: 'Does the succession plan exist?' }] },
      { title: '5. Corporate Governance', rows: [{ sub: 'Board of directors', q: 'Does the company have an active BOD?' }] }
    ];

    console.log(`Found ${sections.length} sections for ${currentDomainName}`);

    // Calculate total for all sections in current tab
    sections.forEach(section => {
      section.rows.forEach(row => {
        const keyWithNumbers = getKey(section.title, row.sub);
        const keyWithoutNumbers = getKey(section.title.replace(/^\d+\.\s*/, ''), row.sub);
        
        // Try both formats - with and without numbers
        const rating = ratings[keyWithNumbers] || ratings[keyWithoutNumbers] || 'no';
        const score = getScoreFromRating(rating);
        
        console.log(`Section: ${section.title}, Row: ${row.sub}`);
        console.log(`  Key with numbers: ${keyWithNumbers}`);
        console.log(`  Key without numbers: ${keyWithoutNumbers}`);
        console.log(`  Rating: ${rating}`);
        console.log(`  Score: ${score}`);
        
        totalScore += score;
        maxScore += 2; // Max score per question is 2
      });
    });

    console.log(`Final Total Score: ${totalScore}/${maxScore} (${maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0}%)`);
    return { totalScore, maxScore, percentage: maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0 };
  };

  const calculateAllDomainsTotalScore = () => {
    let totalScore = 0;
    let maxScore = 0;

    // Calculate for all 4 domains using hardcoded sections
    const allSections = [
      // Commercial (tab 1)
      { title: '1. Market Demand & Share', rows: [{ sub: 'Demand', q: 'Is there sufficient evidence for demand of your product?' }, { sub: 'Market share', q: 'Is the market share growing?' }] },
      { title: '2. Sales & Traction', rows: [{ sub: 'Sales', q: 'Are sales growing on a monthly/quarterly/annual basis?' }, { sub: 'Customer segments', q: 'Are there customer segments and clear focus?' }, { sub: 'Payment terms', q: 'Are payment terms in favor of the company?' }, { sub: 'Sales strategy', q: 'Is the sales strategy consistent with growth plans?' }] },
      { title: '3. Product Development', rows: [{ sub: 'Product development', q: 'Are there clear product road maps?' }, { sub: 'Product distribution', q: 'Are products properly distributed?' }, { sub: 'Product pricing basis', q: 'Are products properly priced?' }] },
      { title: '4. Competition', rows: [{ sub: 'Level of competition', q: 'Do you understand the level of competition and have you conducted analysis?' }, { sub: 'Competitive advantage', q: 'Does the company have a clear competitive advantage?' }] },
      { title: '5. Marketing', rows: [{ sub: 'Marketing strategy', q: 'Is the marketing strategy consistent with growth plans?' }, { sub: 'Packaging & branding', q: "Are the company's products properly packed and branded?" }, { sub: 'Product promotion', q: 'Is there a clear promotion strategy?' }] },
      
      // Financial (tab 2)
      { title: '1. Profitability', rows: [{ sub: 'Revenue', q: 'Is revenue growing?' }, { sub: 'Cost management', q: 'Are unit costs declining?' }] },
      { title: '2. Balance Sheet', rows: [{ sub: 'Working capital management', q: 'Is WC well managed?' }, { sub: 'Assets management', q: 'Are assets well managed?' }, { sub: 'Debt manageability', q: 'Is debt properly managed?' }, { sub: 'OBS Items', q: 'Are OBS items in favor of the company?' }] },
      { title: '3. Cash Flows', rows: [{ sub: 'Operating cash flow', q: 'Is OCF stable and growing?' }, { sub: 'Capital expenses', q: 'Has the company made notable and necessary CAPEX?' }] },
      { title: '4. Projections', rows: [{ sub: 'Assumptions', q: 'Are assumptions realistic (based on existing facts)?' }] },
      { title: '5. Financial Management', rows: [{ sub: 'Quality of financial records', q: 'Does the company have proper financial records?' }, { sub: 'Financial reporting', q: 'Are financials properly reported?' }, { sub: 'Internal controls', q: 'Do internal controls exist?' }, { sub: 'Tax liability', q: 'Are all taxes fully paid?' }] },
      
      // Operations (tab 3)
      { title: '1. Management Capacity', rows: [{ sub: 'Vision clarity', q: 'Is the vision clear?' }, { sub: 'Management structure', q: 'Is the management structure clear?' }, { sub: 'Track record', q: 'Does the team have credible track record?' }, { sub: 'Management commitment', q: 'Is the management fully committed?' }, { sub: 'Team capacity', q: 'Does the team have relevant technical competence?' }, { sub: 'Performance measurement', q: 'Is performance measured?' }, { sub: 'Professional development', q: 'Does the company have a proper PD and or on-job training?' }] },
      { title: '2. MIS', rows: [{ sub: 'Data management', q: 'Is data collected and properly managed?' }, { sub: 'System used', q: 'Is there an MIS for handling organization operations?' }, { sub: 'System effectiveness', q: 'Is the MIS used effective?' }] },
      { title: '3. Quality Management', rows: [{ sub: 'Quality control', q: 'Is quality check a norm at the company?' }, { sub: 'Quality management team', q: 'Are there personnel in charge of quality control?' }] },
      { title: '4. Overall Operations', rows: [{ sub: 'Platform utilization', q: 'Is the platform optimally utilized?' }, { sub: 'Customer relations', q: 'Is customer relationship management organized?' }] },
      { title: '5. Strategy & Planning', rows: [{ sub: 'Business strategy', q: 'Does the company have a business strategy?' }, { sub: 'Organization Planning', q: 'Is there a formal planning process?' }] },
      
      // Legal (tab 4)
      { title: '1. Corporate Documents & Compliance', rows: [{ sub: 'Business incorporation', q: 'Is the business incorporated/registered?' }, { sub: 'Tax Identification', q: 'Does the company have tax identification number?' }, { sub: 'Tax compliance', q: 'Is the business up to date with the required taxes?' }, { sub: 'Business Licence', q: 'Does the business have required licenses?' }, { sub: 'Sector specific compliance', q: 'Does the company have other certifications per the respective industry regulations?' }] },
      { title: '2. Contracts & Agreements', rows: [{ sub: 'Lease agreements', q: 'Are lease agreements available and clear?' }, { sub: 'Customer contracts', q: 'Are customer agreements available and clear?' }, { sub: 'Supplier contracts', q: 'Are supplier agreements available and clear?' }, { sub: 'Employees contracts', q: 'Do employees have contracts (including the founders)?' }] },
      { title: '3. Intellectual Property', rows: [{ sub: 'IP ownership', q: 'Does the company own copyrights to its source codes/or patent to its solution?' }] },
      { title: '4. Entrepreneur & Family', rows: [{ sub: 'Entrepreneurial character', q: 'Is the entrepreneur adaptable, resilient, and reliable?' }, { sub: 'Personal legal liability', q: 'Does the management team have any personal liability that would affect the company?' }, { sub: 'Succession plan', q: 'Does the succession plan exist?' }] },
      { title: '5. Corporate Governance', rows: [{ sub: 'Board of directors', q: 'Does the company have an active BOD?' }] }
    ];

    // Calculate total for all sections across all domains
    allSections.forEach(section => {
      section.rows.forEach(row => {
        const keyWithNumbers = getKey(section.title, row.sub);
        const keyWithoutNumbers = getKey(section.title.replace(/^\d+\.\s*/, ''), row.sub);
        
        // Try both formats - with and without numbers
        const rating = ratings[keyWithNumbers] || ratings[keyWithoutNumbers] || 'no';
        const score = getScoreFromRating(rating);
        totalScore += score;
        maxScore += 2; // Max score per question is 2
      });
    });

    return { totalScore, maxScore, percentage: maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0 };
  };

  const calculateIndividualDomainScore = (domainName: string) => {
    let totalScore = 0;
    let maxScore = 0;

    // Get sections for the specific domain (EXACTLY matching the frontend display)
    const sections = domainName === 'Commercial' ? [
      { title: '1. Market Demand & Share', rows: [{ sub: 'Demand', q: 'Is there sufficient evidence for demand of your product?' }, { sub: 'Market share', q: 'Is the market share growing?' }] },
      { title: '2. Sales & Traction', rows: [{ sub: 'Sales', q: 'Are sales growing on a monthly/quarterly/annual basis?' }, { sub: 'Customer segments', q: 'Are there customer segments and clear focus?' }, { sub: 'Payment terms', q: 'Are payment terms in favor of the company?' }, { sub: 'Sales strategy', q: 'Is the sales strategy consistent with growth plans?' }] },
      { title: '3. Product Development', rows: [{ sub: 'Product development', q: 'Are there clear product road maps?' }, { sub: 'Product distribution', q: 'Are products properly distributed?' }, { sub: 'Product pricing basis', q: 'Are products properly priced?' }] },
      { title: '4. Competition', rows: [{ sub: 'Level of competition', q: 'Do you understand the level of competition and have you conducted analysis?' }, { sub: 'Competitive advantage', q: 'Does the company have a clear competitive advantage?' }] },
      { title: '5. Marketing', rows: [{ sub: 'Marketing strategy', q: 'Is the marketing strategy consistent with growth plans?' }, { sub: 'Packaging & branding', q: "Are the company's products properly packed and branded?" }, { sub: 'Product promotion', q: 'Is there a clear promotion strategy?' }] }
    ] : domainName === 'Financial' ? [
      { title: '1. Profitability', rows: [{ sub: 'Revenue', q: 'Is revenue growing?' }, { sub: 'Cost management', q: 'Are unit costs declining?' }] },
      { title: '2. Balance Sheet', rows: [{ sub: 'Working capital management', q: 'Is WC well managed?' }, { sub: 'Assets management', q: 'Are assets well managed?' }, { sub: 'Debt manageability', q: 'Is debt properly managed?' }, { sub: 'OBS Items', q: 'Are OBS items in favor of the company?' }] },
      { title: '3. Cash Flows', rows: [{ sub: 'Operating cash flow', q: 'Is OCF stable and growing?' }, { sub: 'Capital expenses', q: 'Has the company made notable and necessary CAPEX?' }] },
      { title: '4. Projections', rows: [{ sub: 'Assumptions', q: 'Are assumptions realistic (based on existing facts)?' }] },
      { title: '5. Financial Management', rows: [{ sub: 'Quality of financial records', q: 'Does the company have proper financial records?' }, { sub: 'Financial reporting', q: 'Are financials properly reported?' }, { sub: 'Internal controls', q: 'Do internal controls exist?' }, { sub: 'Tax liability', q: 'Are all taxes fully paid?' }] }
    ] : domainName === 'Operations' ? [
      { title: '1. Management Capacity', rows: [{ sub: 'Vision clarity', q: 'Is the vision clear?' }, { sub: 'Management structure', q: 'Is the management structure clear?' }, { sub: 'Track record', q: 'Does the team have credible track record?' }, { sub: 'Management commitment', q: 'Is the management fully committed?' }, { sub: 'Team capacity', q: 'Does the team have relevant technical competence?' }, { sub: 'Performance measurement', q: 'Is performance measured?' }, { sub: 'Professional development', q: 'Does the company have a proper PD and or on-job training?' }] },
      { title: '2. MIS', rows: [{ sub: 'Data management', q: 'Is data collected and properly managed?' }, { sub: 'System used', q: 'Is there an MIS for handling organization operations?' }, { sub: 'System effectiveness', q: 'Is the MIS used effective?' }] },
      { title: '3. Quality Management', rows: [{ sub: 'Quality control', q: 'Is quality check a norm at the company?' }, { sub: 'Quality management team', q: 'Are there personnel in charge of quality control?' }] },
      { title: '4. Overall Operations', rows: [{ sub: 'Platform utilization', q: 'Is the platform optimally utilized?' }, { sub: 'Customer relations', q: 'Is customer relationship management organized?' }] },
      { title: '5. Strategy & Planning', rows: [{ sub: 'Business strategy', q: 'Does the company have a business strategy?' }, { sub: 'Organization Planning', q: 'Is there a formal planning process?' }] }
    ] : [
      { title: '1. Corporate Documents & Compliance', rows: [{ sub: 'Business incorporation', q: 'Is the business incorporated/registered?' }, { sub: 'Tax Identification', q: 'Does the company have tax identification number?' }, { sub: 'Tax compliance', q: 'Is the business up to date with the required taxes?' }, { sub: 'Business Licence', q: 'Does the business have required licenses?' }, { sub: 'Sector specific compliance', q: 'Does the company have other certifications per the respective industry regulations?' }] },
      { title: '2. Contracts & Agreements', rows: [{ sub: 'Lease agreements', q: 'Are lease agreements available and clear?' }, { sub: 'Customer contracts', q: 'Are customer agreements available and clear?' }, { sub: 'Supplier contracts', q: 'Are supplier agreements available and clear?' }, { sub: 'Employees contracts', q: 'Do employees have contracts (including the founders)?' }] },
      { title: '3. Intellectual Property', rows: [{ sub: 'IP ownership', q: 'Does the company own copyrights to its source codes/or patent to its solution?' }] },
      { title: '4. Entrepreneur & Family', rows: [{ sub: 'Entrepreneurial character', q: 'Is the entrepreneur adaptable, resilient, and reliable?' }, { sub: 'Personal legal liability', q: 'Does the management team have any personal liability that would affect the company?' }, { sub: 'Succession plan', q: 'Does the succession plan exist?' }] },
      { title: '5. Corporate Governance', rows: [{ sub: 'Board of directors', q: 'Does the company have an active BOD?' }] }
    ];

    // Calculate total for this domain using local ratings
    sections.forEach(section => {
      section.rows.forEach(row => {
        const keyWithNumbers = getKey(section.title, row.sub);
        const keyWithoutNumbers = getKey(section.title.replace(/^\d+\.\s*/, ''), row.sub);
        
        // Try both formats - with and without numbers
        const rating = ratings[keyWithNumbers] || ratings[keyWithoutNumbers] || 'no';
        const score = getScoreFromRating(rating);
        totalScore += score;
        maxScore += 2; // Max score per question is 2
      });
    });

    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    // Calculate contribution percentage based on actual frontend max scores
    // Real frontend counts: Commercial(28) + Financial(26) + Operations(32) + Legal(28) = 114 points
    const totalPossibleScore = 114;
    const contributionPercentage = maxScore > 0 ? Math.round((maxScore / totalPossibleScore) * 100) : 0;

    return { 
      actual_score: totalScore, 
      target_score: maxScore, 
      readiness_percentage: percentage,
      contribution_percentage: contributionPercentage
    };
  };

  const calculateSectionScore = (sectionTitle: string, rows: any[], domainName: string) => {
    let totalScore = 0;
    let maxScore = 0;
    
    // Use hardcoded rows for consistency with calculateCurrentTabTotalScore
    rows.forEach(row => {
      const key = getKey(sectionTitle, row.sub);
      const rating = ratings[key] || 'no';
      const score = getScoreFromRating(rating);
      totalScore += score;
      maxScore += 2; // Max score per question is 2
    });
    
    return { totalScore, maxScore, percentage: maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0 };
  };

  const saveSectionToDatabase = async (sectionTitle: string, rows: any[], domainName: string) => {
    if (!assessmentId) return;
    
    try {
      const sectionScore = calculateSectionScore(sectionTitle, rows, domainName);
      
      // Save each answer to database
      for (const row of rows) {
        const key = getKey(sectionTitle, row.sub);
        const rating = ratings[key] || 'no';
        const attachment = attachments[key] || '';
        
        // Find the corresponding question in the database
        const question = questions.find((q: any) => 
          q.question_text && 
          q.question_text.toLowerCase().includes(row.sub.toLowerCase()) && 
          q.domain?.name === domainName
        );
        
        if (question) {
          await fetch(`${API}/crat/answer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              assessment_id: assessmentId,
              question_id: question.id,
              rating: rating,
              attachment_url: attachment || null
            })
          });
        }
      }
      
      // Recalculate overall scores after saving
      await calculateScores();
      
      console.log(`Section ${sectionTitle} saved with score: ${sectionScore.totalScore}/${sectionScore.maxScore} (${sectionScore.percentage}%)`);
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  const saveDomainToDatabase = async (sections: any[], domainName: string) => {
    console.log('Save button clicked!', { assessmentId, domainName });
    console.log('Current ratings state:', ratings);
    console.log('Ratings state keys:', Object.keys(ratings));
    console.log('Ratings state count:', Object.keys(ratings).length);
    
    if (!assessmentId) {
      console.error('No assessmentId found! Cannot save.');
      alert('No assessment found. Please select a project first.');
      return;
    }
    
    try {
      console.log(`Starting to save ${domainName} domain...`);
      
      // Get hardcoded sections for this domain (same as frontend)
      const domainSections = domainName === 'Commercial' ? [
        { title: '1. Market Demand & Share', rows: [{ sub: 'Demand', q: 'Is there sufficient evidence for demand of your product?' }, { sub: 'Market share', q: 'Is the market share growing?' }] },
        { title: '2. Sales & Traction', rows: [{ sub: 'Sales', q: 'Are sales growing on a monthly/quarterly/annual basis?' }, { sub: 'Customer segments', q: 'Are there customer segments and clear focus?' }, { sub: 'Payment terms', q: 'Are payment terms in favor of the company?' }, { sub: 'Sales strategy', q: 'Is the sales strategy consistent with growth plans?' }] },
        { title: '3. Product Development', rows: [{ sub: 'Product development', q: 'Are there clear product road maps?' }, { sub: 'Product distribution', q: 'Are products properly distributed?' }, { sub: 'Product pricing basis', q: 'Are products properly priced?' }] },
        { title: '4. Competition', rows: [{ sub: 'Level of competition', q: 'Do you understand the level of competition and have you conducted analysis?' }, { sub: 'Competitive advantage', q: 'Does the company have a clear competitive advantage?' }] },
        { title: '5. Marketing', rows: [{ sub: 'Marketing strategy', q: 'Is the marketing strategy consistent with growth plans?' }, { sub: 'Packaging & branding', q: "Are the company's products properly packed and branded?" }, { sub: 'Product promotion', q: 'Is there a clear promotion strategy?' }] }
      ] : domainName === 'Financial' ? [
        { title: '1. Profitability', rows: [{ sub: 'Revenue', q: 'Is revenue growing?' }, { sub: 'Cost management', q: 'Are unit costs declining?' }] },
        { title: '2. Balance Sheet', rows: [{ sub: 'Working capital management', q: 'Is WC well managed?' }, { sub: 'Assets management', q: 'Are assets well managed?' }, { sub: 'Debt manageability', q: 'Is debt properly managed?' }, { sub: 'OBS Items', q: 'Are OBS items in favor of the company?' }] },
        { title: '3. Cash Flows', rows: [{ sub: 'Operating cash flow', q: 'Is OCF stable and growing?' }, { sub: 'Capital expenses', q: 'Has the company made notable and necessary CAPEX?' }] },
        { title: '4. Projections', rows: [{ sub: 'Assumptions', q: 'Are assumptions realistic (based on existing facts)?' }] },
        { title: '5. Financial Management', rows: [{ sub: 'Quality of financial records', q: 'Does the company have proper financial records?' }, { sub: 'Financial reporting', q: 'Are financials properly reported?' }, { sub: 'Internal controls', q: 'Do internal controls exist?' }, { sub: 'Tax liability', q: 'Are all taxes fully paid?' }] }
      ] : domainName === 'Operations' ? [
        { title: '1. Management Capacity', rows: [{ sub: 'Vision clarity', q: 'Is the vision clear?' }, { sub: 'Management structure', q: 'Is the management structure clear?' }, { sub: 'Track record', q: 'Does the team have credible track record?' }, { sub: 'Management commitment', q: 'Is the management fully committed?' }, { sub: 'Team capacity', q: 'Does the team have relevant technical competence?' }, { sub: 'Performance measurement', q: 'Is performance measured?' }, { sub: 'Professional development', q: 'Does the company have a proper PD and or on-job training?' }] },
        { title: '2. MIS', rows: [{ sub: 'Data management', q: 'Is data collected and properly managed?' }, { sub: 'System used', q: 'Is there an MIS for handling organization operations?' }, { sub: 'System effectiveness', q: 'Is the MIS used effective?' }] },
        { title: '3. Quality Management', rows: [{ sub: 'Quality control', q: 'Is quality check a norm at the company?' }, { sub: 'Quality management team', q: 'Are there personnel in charge of quality control?' }] },
        { title: '4. Overall Operations', rows: [{ sub: 'Platform utilization', q: 'Is the platform optimally utilized?' }, { sub: 'Customer relations', q: 'Is customer relationship management organized?' }] },
        { title: '5. Strategy & Planning', rows: [{ sub: 'Business strategy', q: 'Does the company have a business strategy?' }, { sub: 'Organization Planning', q: 'Is there a formal planning process?' }] }
      ] : [
        { title: '1. Corporate Documents & Compliance', rows: [{ sub: 'Business incorporation', q: 'Is the business incorporated/registered?' }, { sub: 'Tax Identification', q: 'Does the company have tax identification number?' }, { sub: 'Tax compliance', q: 'Is the business up to date with the required taxes?' }, { sub: 'Business Licence', q: 'Does the business have required licenses?' }, { sub: 'Sector specific compliance', q: 'Does the company have other certifications per the respective industry regulations?' }] },
        { title: '2. Contracts & Agreements', rows: [{ sub: 'Lease agreements', q: 'Are lease agreements available and clear?' }, { sub: 'Customer contracts', q: 'Are customer agreements available and clear?' }, { sub: 'Supplier contracts', q: 'Are supplier agreements available and clear?' }, { sub: 'Employees contracts', q: 'Do employees have contracts (including the founders)?' }] },
        { title: '3. Intellectual Property', rows: [{ sub: 'IP ownership', q: 'Does the company own copyrights to its source codes/or patent to its solution?' }] },
        { title: '4. Entrepreneur & Family', rows: [{ sub: 'Entrepreneurial character', q: 'Is the entrepreneur adaptable, resilient, and reliable?' }, { sub: 'Personal legal liability', q: 'Does the management team have any personal liability that would affect the company?' }, { sub: 'Succession plan', q: 'Does the succession plan exist?' }] },
        { title: '5. Corporate Governance', rows: [{ sub: 'Board of directors', q: 'Does the company have an active BOD?' }] }
      ];
      
      // Save each rating for this domain
      for (const section of domainSections) {
        for (const row of section.rows) {
          const key = getKey(section.title, row.sub);
          const rating = ratings[key] || 'no';
          const attachment = attachments[key] || '';
          
          console.log(`Saving rating for ${key}: ${rating}`);
          
          // Save to a simple key-value store in the backend
          const response = await fetch(`${API}/crat/answer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              assessment_id: assessmentId,
              section_title: section.title,
              sub_domain: row.sub,
              question_text: row.q,
              rating: rating,
              attachment_url: attachment || null
            })
          });
          
          if (!response.ok) {
            throw new Error(`Failed to save answer: ${response.status} ${response.statusText}`);
          }
        }
      }
      
      console.log(`Domain ${domainName} saved successfully`);
      setSuccessMessage(`✅ ${domainName} Assessment saved successfully!`);
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving domain:', error);
      alert(`Error saving ${domainName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const selectedProject = projects.find(p => `${p.id}` === `${selectedProjectId}`) || null;

  return (
    <div>
      {successMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#22c55e',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {successMessage}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>Capital Readiness Assessment Tool</h2>
        <div className="crat-project-dropdown">
          <select
            id="project-select"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="crat-project-select"
            disabled={loadingProjects || projects.length === 0}
          >
            {loadingProjects && <option value="">Loading projects...</option>}
            {!loadingProjects && projects.length === 0 && <option value="">No projects found</option>}
            {!loadingProjects && projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Tabs items={["Overview","Commercial","Finance","Operation","Legal"]} activeIndex={tab} onChange={setTab} />
      {tab === 0 && (
      <div className="mc-overview">
        <div className="mc-hscroll">
          <div className="mc-hrow">
            <div className="mc-stat-card mc-stat-card--total">
              <div className="mc-stat-header">Total</div>
              <div className="mc-stat-body">
                {(() => {
                  const allDomainsScore = calculateAllDomainsTotalScore();
                  const totalReadiness = allDomainsScore.percentage;
                  // Color coding for actual score based on percentage of target score
                  const actualVsTargetPercentage = allDomainsScore.maxScore > 0 ? (allDomainsScore.totalScore / allDomainsScore.maxScore) * 100 : 0;
                  const actualScoreColor = actualVsTargetPercentage >= 80 ? '#22c55e' : actualVsTargetPercentage >= 50 ? '#f59e0b' : '#ef4444';
                  
                  return (
                    <>
                      <div className="mc-stat-row"><span>Actual Score</span><strong style={{color: actualScoreColor}}>{allDomainsScore.totalScore}</strong></div>
                <div className="mc-stat-row"><span>AS% Contribution</span><strong>100%</strong></div>
                      <div className="mc-stat-row"><span>Target Score</span><strong>{allDomainsScore.maxScore}</strong></div>
                <div className="mc-stat-row"><span>TS% Contribution</span><strong>100%</strong></div>
                      <div className="mc-stat-row"><span>(AS/TS) Readiness</span><strong style={{color: actualScoreColor}}>{totalReadiness}%</strong></div>
                    </>
                  );
                })()}
              </div>
            </div>
            {[
              { name: 'Commercial' },
              { name: 'Financial' },
              { name: 'Operations' },
              { name: 'Legal' },
            ].map((d) => {
              const domainScore = calculateIndividualDomainScore(d.name);
              const readiness = domainScore.readiness_percentage;
              const status = readiness >= 70 ? 'Ready' : readiness >= 50 ? 'Partially Ready' : 'Not Ready';
              
              // Color coding for status
              const statusColor = readiness >= 70 ? '#22c55e' : readiness >= 50 ? '#3b82f6' : '#ef4444';
              
              // Color coding for actual score based on percentage of target score
              const actualVsTargetPercentage = domainScore.target_score > 0 ? (domainScore.actual_score / domainScore.target_score) * 100 : 0;
              const actualScoreColor = actualVsTargetPercentage >= 80 ? '#22c55e' : actualVsTargetPercentage >= 50 ? '#f59e0b' : '#ef4444';
              
              return (
              <div key={d.name} className="mc-stat-card">
                <div className="mc-stat-header">{d.name}</div>
                <div className="mc-stat-body">
                    <div className="mc-stat-row"><span>Actual Score</span><strong style={{color: actualScoreColor}}>{domainScore.actual_score}</strong></div>
                    <div className="mc-stat-row"><span>AS% Contribution</span><strong>{domainScore.contribution_percentage}%</strong></div>
                    <div className="mc-stat-row"><span>Target Score</span><strong>{domainScore.target_score}</strong></div>
                    <div className="mc-stat-row"><span>TS% Contribution</span><strong>{domainScore.contribution_percentage}%</strong></div>
                    <div className="mc-stat-row"><span>(AS/TS) Readiness</span><strong style={{color: actualScoreColor}}>{readiness}%</strong></div>
                    <div className="mc-stat-row"><span>Status</span><strong style={{color: statusColor}}>{status}</strong></div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
        <div className="mc-overview__grid">
          <div className="mc-card">
            <h2>Capital Readiness Assessment Scores</h2>
            <p>Your readiness across key business domains</p>
            <BarChart 
              labels={["Total","Commercial","Financial","Operations","Legal"]} 
              values={[
                calculateAllDomainsTotalScore().percentage,
                calculateIndividualDomainScore('Commercial').readiness_percentage,
                calculateIndividualDomainScore('Financial').readiness_percentage,
                calculateIndividualDomainScore('Operations').readiness_percentage,
                calculateIndividualDomainScore('Legal').readiness_percentage
              ]} 
            />
          </div>
          <div className="mc-card">
            <h2>Overall Readiness</h2>
            <div className="mc-ring" style={{ ['--pct' as any]: (() => {
              const allDomainsScore = calculateAllDomainsTotalScore();
              return allDomainsScore.percentage / 100;
            })() }} />
            <div className="mc-ring__center">{(() => {
              const allDomainsScore = calculateAllDomainsTotalScore();
              return allDomainsScore.percentage;
            })()}%</div>
            <div className="mc-ring__label">
              <div className="mc-ring__title">
                {(() => {
                  const allDomainsScore = calculateAllDomainsTotalScore();
                  return allDomainsScore.percentage >= 70 ? 'Ready' : 
                         allDomainsScore.percentage >= 50 ? 'Partially Ready' : 'Not Ready';
                })()}
              </div>
              <div className="mc-ring__state">Overall assessment score across domains</div>
            </div>
          </div>
        </div>
      </div>
      )}
      {tab === 4 && (
      <div className="mc-domain">
        {[
          {
            title: '1. Corporate Documents & Compliance',
            rows: [
              { sub: 'Business incorporation', q: 'Is the business incorporated/registered?', attach: 'BRELA incorporation Certificate, MEMART' },
              { sub: 'Tax Identification', q: 'Does the company have tax identification number?', attach: 'TIN Certificate' },
              { sub: 'Tax compliance', q: 'Is the business up to date with the required taxes?', attach: 'Current tax fillings' },
              { sub: 'Business Licence', q: 'Does the business have required licenses?', attach: 'Business licence certificate' },
              { sub: 'Sector specific compliance', q: 'Does the company have other certifications per the respective industry regulations?', attach: 'BOT Licence etc' },
            ],
          },
          {
            title: '2. Contracts & Agreements',
            rows: [
              { sub: 'Lease agreements', q: 'Are lease agreements available and clear?', attach: 'Contract' },
              { sub: 'Customer contracts', q: 'Are customer agreements available and clear?', attach: 'Contract' },
              { sub: 'Supplier contracts', q: 'Are supplier agreements available and clear?', attach: 'Contract' },
              { sub: 'Employees contracts', q: 'Do employees have contracts (including the founders)?', attach: 'Contract' },
            ],
          },
          {
            title: '3. Intellectual Property',
            rows: [
              { sub: 'IP ownership', q: 'Does the company own copyrights to its source codes/or patent to its solution?', attach: 'Copyrights' },
            ],
          },
          {
            title: '4. Entrepreneur & Family',
            rows: [
              { sub: 'Entrepreneurial character', q: 'Is the entrepreneur adaptable, resilient, and reliable?', attach: 'Track record, pitch, innovation in business' },
              { sub: 'Personal legal liability', q: 'Does the management team have any personal liability that would affect the company?', attach: 'Credit reports' },
              { sub: 'Succession plan', q: 'Does the succession plan exist?', attach: 'Succession plans/Contracts/JD' },
            ],
          },
          {
            title: '5. Corporate Governance',
            rows: [
              { sub: 'Board of directors', q: 'Does the company have an active BOD?', attach: 'List of board members + CVs' },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="mc-card">
            <h2>{section.title}</h2>
            <div className="mc-list mc-list--head">
              <div>Sub Domain</div>
              <div>Question</div>
              <div>Rating</div>
              <div>Score</div>
              <div>Attachment</div>
              <div>Actions</div>
            </div>
            {section.rows.map((r) => (
              <div key={r.sub} className="mc-list">
                <div>{r.sub}</div>
                <div>{r.q}</div>
                <div>
                  <select
                    className="mc-select"
                    value={ratings[getKey(section.title, r.sub)] || 'no'}
                    onChange={(e) => handleRatingChange(section.title, r.sub, e.target.value as any, getDomainName(tab))}
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>{getScoreFromRating(ratings[getKey(section.title, r.sub)])}</div>
                <div>
                  <input
                    id={`file-${getKey(section.title, r.sub)}`}
                    type="file"
                    aria-label={`Upload attachment for ${r.sub}`}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setAttachments((prev) => ({ ...prev, [getKey(section.title, r.sub)]: file ? file.name : '' }));
                    }}
                  />
                  <button
                    className={"mc-icon-link" + (attachments[getKey(section.title, r.sub)] ? " mc-icon-link--ok" : "")}
                    aria-label="Upload attachment"
                    onClick={() => {
                      const el = document.getElementById(`file-${getKey(section.title, r.sub)}`) as HTMLInputElement | null;
                      el?.click();
                    }}
                  >
                    <Paperclip size={16} />
                  </button>
                  {attachments[getKey(section.title, r.sub)] && (
                    <span className="mc-file-name" title={attachments[getKey(section.title, r.sub)]}>
                      {attachments[getKey(section.title, r.sub)]}
                    </span>
                  )}
                </div>
                <div className="mc-actions">
                  <button className="mc-icon-link" aria-label="View"><Eye size={16} /></button>
                  <button className="mc-icon-link mc-icon-link--danger" aria-label="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <div className="mc-total-row">Section Score: {(() => {
              const sectionScore = calculateSectionScore(section.title, section.rows, getDomainName(tab));
              return `${sectionScore.totalScore}/${sectionScore.maxScore} (${sectionScore.percentage}%)`;
            })()}</div>
          </div>
        ))}
        <div className="mc-card mc-card--compact">
          <h2>Total Score</h2>
          <div className="mc-total-row">{(() => {
            const currentTabScore = calculateCurrentTabTotalScore();
            return currentTabScore.totalScore;
          })()}</div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button 
              onClick={() => {
                const domainName = getDomainName(tab);
                console.log(`Saving ${domainName} domain with current ratings:`, ratings);
                saveDomainToDatabase([], domainName); // Pass empty sections since we'll use questions from database
              }}
              style={{
                backgroundColor: '#2c3e50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#34495e'}
              onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2c3e50'}
            >
              Save {getDomainName(tab)} Assessment
            </button>
          </div>
        </div>
      </div>
      )}
      {tab === 2 && (
      <div className="mc-domain">
        {[
          {
            title: '1. Profitability',
            rows: [
              { sub: 'Revenue', q: 'Is revenue growing?' },
              { sub: 'Cost management', q: 'Are unit costs declining?' },
            ],
          },
          {
            title: '2. Balance Sheet',
            rows: [
              { sub: 'Working capital management', q: 'Is WC well managed?' },
              { sub: 'Assets management', q: 'Are assets well managed?' },
              { sub: 'Debt manageability', q: 'Is debt properly managed?' },
              { sub: 'OBS Items', q: 'Are OBS items in favor of the company?' },
            ],
          },
          {
            title: '3. Cash Flows',
            rows: [
              { sub: 'Operating cash flow', q: 'Is OCF stable and growing?' },
              { sub: 'Capital expenses', q: 'Has the company made notable and necessary CAPEX?' },
            ],
          },
          {
            title: '4. Projections',
            rows: [
              { sub: 'Assumptions', q: 'Are assumptions realistic (based on existing facts)?' },
            ],
          },
          {
            title: '5. Financial Management',
            rows: [
              { sub: 'Quality of financial records', q: 'Does the company have proper financial records?' },
              { sub: 'Financial reporting', q: 'Are financials properly reported?' },
              { sub: 'Internal controls', q: 'Do internal controls exist?' },
              { sub: 'Tax liability', q: 'Are all taxes fully paid?' },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="mc-card">
            <h2>{section.title}</h2>
            <div className="mc-list mc-list--head">
              <div>Sub Domain</div>
              <div>Question</div>
              <div>Rating</div>
              <div>Score</div>
              <div>Attachment</div>
              <div>Actions</div>
            </div>
            {section.rows.map((r) => (
              <div key={r.sub} className="mc-list">
                <div>{r.sub}</div>
                <div>{r.q}</div>
                <div>
                  <select
                    className="mc-select"
                    value={ratings[getKey(section.title, r.sub)] || 'no'}
                    onChange={(e) => handleRatingChange(section.title, r.sub, e.target.value as any, getDomainName(tab))}
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>{getScoreFromRating(ratings[getKey(section.title, r.sub)])}</div>
                <div>
                  <input
                    id={`file-${getKey(section.title, r.sub)}`}
                    type="file"
                    aria-label={`Upload attachment for ${r.sub}`}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setAttachments((prev) => ({ ...prev, [getKey(section.title, r.sub)]: file ? file.name : '' }));
                    }}
                  />
                  <button
                    className={"mc-icon-link" + (attachments[getKey(section.title, r.sub)] ? " mc-icon-link--ok" : "")}
                    aria-label="Upload attachment"
                    onClick={() => {
                      const el = document.getElementById(`file-${getKey(section.title, r.sub)}`) as HTMLInputElement | null;
                      el?.click();
                    }}
                  >
                    <Paperclip size={16} />
                  </button>
                  {attachments[getKey(section.title, r.sub)] && (
                    <span className="mc-file-name" title={attachments[getKey(section.title, r.sub)]}>
                      {attachments[getKey(section.title, r.sub)]}
                    </span>
                  )}
                </div>
                <div className="mc-actions">
                  <button className="mc-icon-link" aria-label="View"><Eye size={16} /></button>
                  <button className="mc-icon-link mc-icon-link--danger" aria-label="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <div className="mc-total-row">Section Score: {(() => {
              const sectionScore = calculateSectionScore(section.title, section.rows, getDomainName(tab));
              return `${sectionScore.totalScore}/${sectionScore.maxScore} (${sectionScore.percentage}%)`;
            })()}</div>
          </div>
        ))}
        <div className="mc-card mc-card--compact">
          <h2>Total Score</h2>
          <div className="mc-total-row">{(() => {
            const currentTabScore = calculateCurrentTabTotalScore();
            return currentTabScore.totalScore;
          })()}</div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button 
              onClick={() => {
                const domainName = getDomainName(tab);
                console.log(`Saving ${domainName} domain with current ratings:`, ratings);
                saveDomainToDatabase([], domainName); // Pass empty sections since we'll use questions from database
              }}
              style={{
                backgroundColor: '#2c3e50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#34495e'}
              onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2c3e50'}
            >
              Save {getDomainName(tab)} Assessment
            </button>
          </div>
        </div>
      </div>
      )}
      {tab === 3 && (
      <div className="mc-domain">
        {[
          {
            title: '1. Management Capacity',
            rows: [
              { sub: 'Vision clarity', q: 'Is the vision clear?', attach: 'Vision statement' },
              { sub: 'Management structure', q: 'Is the management structure clear?', attach: 'Organogram' },
              { sub: 'Track record', q: 'Does the team have credible track record?', attach: 'Management CVs' },
              { sub: 'Management commitment', q: 'Is the management fully committed?', attach: 'Works schedules and contracts' },
              { sub: 'Team capacity', q: 'Does the team have relevant technical competence?', attach: 'CVs' },
              { sub: 'Performance measurement', q: 'Is performance measured?', attach: 'KPIs' },
              { sub: 'Professional development', q: 'Does the company have a proper PD and or on-job training?', attach: 'Organization PD plans/Job training modules' },
            ],
          },
          {
            title: '2. MIS',
            rows: [
              { sub: 'Data management', q: 'Is data collected and properly managed?', attach: 'Data protection policy' },
              { sub: 'System used', q: 'Is there an MIS for handling organization operations?', attach: 'MIS' },
              { sub: 'System effectiveness', q: 'Is the MIS used effective?', attach: 'MIS' },
            ],
          },
          {
            title: '3. Quality Management',
            rows: [
              { sub: 'Quality control', q: 'Is quality check a norm at the company?', attach: 'Quality manuals, quality control reports' },
              { sub: 'Quality management team', q: 'Are there personnel in charge of quality control?', attach: 'JD' },
            ],
          },
          {
            title: '4. Overall Operations',
            rows: [
              { sub: 'Platform utilization', q: 'Is the platform optimally utilized?', attach: 'Actual vis-a-vis ideal' },
              { sub: 'Customer relations', q: 'Is customer relationship management organized?', attach: 'CRM/Platform/MIS/Automated Real-Time Responses' },
            ],
          },
          {
            title: '5. Strategy & Planning',
            rows: [
              { sub: 'Business strategy', q: 'Does the company have a business strategy?', attach: 'Strategy documents' },
              { sub: 'Organization Planning', q: 'Is there a formal planning process?', attach: 'Planning doc/tool' },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="mc-card">
            <h2>{section.title}</h2>
            <div className="mc-list mc-list--head">
              <div>Sub Domain</div>
              <div>Question</div>
              <div>Rating</div>
              <div>Score</div>
              <div>Attachment</div>
              <div>Actions</div>
            </div>
            {section.rows.map((r) => (
              <div key={r.sub} className="mc-list">
                <div>{r.sub}</div>
                <div>{r.q}</div>
                <div>
                  <select
                    className="mc-select"
                    value={ratings[getKey(section.title, r.sub)] || 'no'}
                    onChange={(e) => handleRatingChange(section.title, r.sub, e.target.value as any, getDomainName(tab))}
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>{getScoreFromRating(ratings[getKey(section.title, r.sub)])}</div>
                <div>
                  <input
                    id={`file-${getKey(section.title, r.sub)}`}
                    type="file"
                    aria-label={`Upload attachment for ${r.sub}`}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setAttachments((prev) => ({ ...prev, [getKey(section.title, r.sub)]: file ? file.name : '' }));
                    }}
                  />
                  <button
                    className={"mc-icon-link" + (attachments[getKey(section.title, r.sub)] ? " mc-icon-link--ok" : "")}
                    aria-label="Upload attachment"
                    onClick={() => {
                      const el = document.getElementById(`file-${getKey(section.title, r.sub)}`) as HTMLInputElement | null;
                      el?.click();
                    }}
                  >
                    <Paperclip size={16} />
                  </button>
                  {attachments[getKey(section.title, r.sub)] && (
                    <span className="mc-file-name" title={attachments[getKey(section.title, r.sub)]}>
                      {attachments[getKey(section.title, r.sub)]}
                    </span>
                  )}
                </div>
                <div className="mc-actions">
                  <button className="mc-icon-link" aria-label="View"><Eye size={16} /></button>
                  <button className="mc-icon-link mc-icon-link--danger" aria-label="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <div className="mc-total-row">Section Score: {(() => {
              const sectionScore = calculateSectionScore(section.title, section.rows, getDomainName(tab));
              return `${sectionScore.totalScore}/${sectionScore.maxScore} (${sectionScore.percentage}%)`;
            })()}</div>
          </div>
        ))}
        <div className="mc-card mc-card--compact">
          <h2>Total Score</h2>
          <div className="mc-total-row">{(() => {
            const currentTabScore = calculateCurrentTabTotalScore();
            return currentTabScore.totalScore;
          })()}</div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button 
              onClick={() => {
                const domainName = getDomainName(tab);
                console.log(`Saving ${domainName} domain with current ratings:`, ratings);
                saveDomainToDatabase([], domainName); // Pass empty sections since we'll use questions from database
              }}
              style={{
                backgroundColor: '#2c3e50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#34495e'}
              onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2c3e50'}
            >
              Save {getDomainName(tab)} Assessment
            </button>
          </div>
        </div>
      </div>
      )}
      {tab === 1 && (
      <div className="mc-domain">
        {[
          {
            title: '1. Market Demand & Share',
            rows: [
              { sub: 'Demand', q: 'Is there sufficient evidence for demand of your product?' },
              { sub: 'Market share', q: 'Is the market share growing?' },
            ],
          },
          {
            title: '2. Sales & Traction',
            rows: [
              { sub: 'Sales', q: 'Are sales growing on a monthly/quarterly/annual basis?' },
              { sub: 'Customer segments', q: 'Are there customer segments and clear focus?' },
              { sub: 'Payment terms', q: 'Are payment terms in favor of the company?' },
              { sub: 'Sales strategy', q: 'Is the sales strategy consistent with growth plans?' },
            ],
          },
          {
            title: '3. Product Development',
            rows: [
              { sub: 'Product development', q: 'Are there clear product road maps?' },
              { sub: 'Product distribution', q: 'Are products properly distributed?' },
              { sub: 'Product pricing basis', q: 'Are products properly priced?' },
            ],
          },
          {
            title: '4. Competition',
            rows: [
              { sub: 'Level of competition', q: 'Do you understand the level of competition and have you conducted analysis?' },
              { sub: 'Competitive advantage', q: 'Does the company have a clear competitive advantage?' },
            ],
          },
          {
            title: '5. Marketing',
            rows: [
              { sub: 'Marketing strategy', q: 'Is the marketing strategy consistent with growth plans?' },
              { sub: 'Packaging & branding', q: "Are the company's products properly packed and branded?" },
              { sub: 'Product promotion', q: 'Is there a clear promotion strategy?' },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="mc-card">
            <h2>{section.title}</h2>
            <div className="mc-list mc-list--head">
              <div>Sub Domain</div>
              <div>Question</div>
              <div>Rating</div>
              <div>Score</div>
              <div>Attachment</div>
              <div>Actions</div>
            </div>
            {section.rows.map((r, idx) => (
              <div key={r.sub} className="mc-list">
                <div>{r.sub}</div>
                <div>{r.q}</div>
                <div>
                  <select
                    className="mc-select"
                    value={ratings[getKey(section.title, r.sub)] || 'no'}
                    onChange={(e) => handleRatingChange(section.title, r.sub, e.target.value as any, getDomainName(tab))}
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>{getScoreFromRating(ratings[getKey(section.title, r.sub)])}</div>
                <div>
                  <input
                    id={`file-${getKey(section.title, r.sub)}`}
                    type="file"
                    aria-label={`Upload attachment for ${r.sub}`}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setAttachments((prev) => ({ ...prev, [getKey(section.title, r.sub)]: file ? file.name : '' }));
                    }}
                  />
                  <button
                    className={"mc-icon-link" + (attachments[getKey(section.title, r.sub)] ? " mc-icon-link--ok" : "")}
                    aria-label="Upload attachment"
                    onClick={() => {
                      const el = document.getElementById(`file-${getKey(section.title, r.sub)}`) as HTMLInputElement | null;
                      el?.click();
                    }}
                  >
                    <Paperclip size={16} />
                  </button>
                  {attachments[getKey(section.title, r.sub)] && (
                    <span className="mc-file-name" title={attachments[getKey(section.title, r.sub)]}>
                      {attachments[getKey(section.title, r.sub)]}
                    </span>
                  )}
                </div>
                <div className="mc-actions">
                  <button className="mc-icon-link" aria-label="View"><Eye size={16} /></button>
                  <button className="mc-icon-link mc-icon-link--danger" aria-label="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <div className="mc-total-row">Section Score: {(() => {
              const sectionScore = calculateSectionScore(section.title, section.rows, getDomainName(tab));
              return `${sectionScore.totalScore}/${sectionScore.maxScore} (${sectionScore.percentage}%)`;
            })()}</div>
          </div>
        ))}
        <div className="mc-card mc-card--compact">
          <h2>Total Score</h2>
          <div className="mc-total-row">{(() => {
            const currentTabScore = calculateCurrentTabTotalScore();
            return currentTabScore.totalScore;
          })()}</div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button 
              onClick={() => {
                const domainName = getDomainName(tab);
                console.log(`Saving ${domainName} domain with current ratings:`, ratings);
                saveDomainToDatabase([], domainName); // Pass empty sections since we'll use questions from database
              }}
              style={{
                backgroundColor: '#2c3e50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#34495e'}
              onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2c3e50'}
            >
              Save {getDomainName(tab)} Assessment
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

