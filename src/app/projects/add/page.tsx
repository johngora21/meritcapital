"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type FormData = {
  // Basic Information
  startupName: string;
  projectTitle: string;
  tagline: string;
  description: string;
  website: string;
  imageUrl: string;
  logo: File | null;
  
  // Founder Information
  founderName: string;
  founderRole: string;
  founderEmail: string;
  founderPhone: string;
  founderLinkedin: string;
  teamSize: string;
  teamMembers: Array<{
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    linkedin: string;
  }>;
  coFounders: Array<{
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    linkedin: string;
  }>;
  
  // Business Details
  industry: string;
  businessStage: string;
  foundedDate: string;
  legalStructure: string;
  registrationNumber: string;
  taxId: string;
  
  // Location & Market
  headquartersCountry: string;
  headquartersCity: string;
  primaryMarket: string;
  targetMarkets: string[];
  operatingCountries: string[];
  
  // Financial Information
  currentRevenue: string;
  fundingRaised: string;
  fundingStage: string;
  monthlyBurnRate: string;
  runway: string;
  
  // Product/Service
  productType: string[];
  problemStatement: string;
  solutionDescription: string;
  keyFeatures: string;
  targetCustomer: string;
  valueProposition: string;
  
  // Market & Competition
  marketSize: string;
  competitiveAdvantage: string;
  mainCompetitors: string;
  marketPenetration: string;
  
  // Growth & Metrics
  customerAcquisitionCost: string;
  customerLifetimeValue: string;
  monthlyActiveUsers: string;
  revenueGrowthRate: string;
  keyPerformanceIndicators: string;
  
  // Funding & Investment
  seekingInvestment: string;
  investmentAmountNeeded: string;
  useOfFunds: string;
  previousInvestors: string;
  investmentTimeline: string;
  
  // Legal & Compliance
  intellectualProperty: string[];
  regulatoryCompliance: string;
  dataPrivacyCompliance: string;
  
  // Social Impact
  socialMission: string;
  impactMetrics: string;
  sdgAlignment: string[];
  beneficiaries: string;
  
  // Additional Information
  pitchDeck: File | null;
  businessPlan: File | null;
  pitchDeckName?: string;
  businessPlanName?: string;
  demoVideo: string;
  pressCoverage: string;
  awardsRecognition: string;
  partnerships: string;
  
  // Contact Preferences
  preferredContactMethod: string;
  bestTimeToContact: string;
  newsletterSubscription: boolean;
  marketingCommunications: boolean;
};

const industries = [
  "Agriculture",
  "Digital Technology", 
  "Education",
  "Energy",
  "Finance",
  "Health",
  "Impact & Sustainability"
];

const businessStages = [
  "Idea",
  "MVP",
  "Early Stage",
  "Growth",
  "Scale",
  "Mature"
];

const legalStructures = [
  "Sole Proprietorship",
  "Partnership",
  "LLC",
  "Corporation",
  "Non-profit"
];

const revenueRanges = [
  "Pre-revenue",
  "$0 - $10K",
  "$10K - $50K",
  "$50K - $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M+"
];

const fundingStages = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Growth",
  "IPO"
];

const productTypes = [
  "Service",
  "Physical Product",
  "Software/App",
  "Other"
];

const marketSizes = [
  "Local (< $1M)",
  "Regional ($1M - $10M)",
  "National ($10M - $100M)",
  "Global ($100M+)"
];

const marketPenetrations = [
  "0-1%",
  "1-5%",
  "5-10%",
  "10-25%",
  "25%+"
];

const seekingInvestmentOptions = [
  "Yes",
  "No",
  "Maybe"
];

const intellectualPropertyOptions = [
  "Patents",
  "Trademarks",
  "Copyrights",
  "Trade Secrets",
  "None"
];

const regulatoryComplianceOptions = [
  "Fully Compliant",
  "Partially Compliant",
  "Not Compliant",
  "Not Applicable"
];

const dataPrivacyComplianceOptions = [
  "GDPR Compliant",
  "CCPA Compliant",
  "Other",
  "Not Applicable"
];

const contactMethodOptions = [
  "Email",
  "Phone",
  "LinkedIn"
];

const sdgOptions = [
  "No Poverty",
  "Zero Hunger",
  "Good Health and Well-being",
  "Quality Education",
  "Gender Equality",
  "Clean Water and Sanitation",
  "Affordable and Clean Energy",
  "Decent Work and Economic Growth",
  "Industry, Innovation and Infrastructure",
  "Reduced Inequalities",
  "Sustainable Cities and Communities",
  "Responsible Consumption and Production",
  "Climate Action",
  "Life Below Water",
  "Life on Land",
  "Peace, Justice and Strong Institutions",
  "Partnerships for the Goals"
];

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export default function AddStartupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const projectId = searchParams.get('id');
  const [formData, setFormData] = React.useState<FormData>({
    startupName: '',
    projectTitle: '',
    tagline: '',
    description: '',
    website: '',
    imageUrl: '',
    logo: null,
    founderName: '',
    founderRole: '',
    founderEmail: '',
    founderPhone: '',
    founderLinkedin: '',
    teamSize: '',
    teamMembers: [],
    coFounders: [],
    industry: '',
    businessStage: '',
    foundedDate: '',
    legalStructure: '',
    registrationNumber: '',
    taxId: '',
    headquartersCountry: '',
    headquartersCity: '',
    primaryMarket: '',
    targetMarkets: [],
    operatingCountries: [],
    currentRevenue: '',
    fundingRaised: '',
    fundingStage: '',
    monthlyBurnRate: '',
    runway: '',
    productType: [],
    problemStatement: '',
    solutionDescription: '',
    keyFeatures: '',
    targetCustomer: '',
    valueProposition: '',
    marketSize: '',
    competitiveAdvantage: '',
    mainCompetitors: '',
    marketPenetration: '',
    customerAcquisitionCost: '',
    customerLifetimeValue: '',
    monthlyActiveUsers: '',
    revenueGrowthRate: '',
    keyPerformanceIndicators: '',
    seekingInvestment: '',
    investmentAmountNeeded: '',
    useOfFunds: '',
    previousInvestors: '',
    investmentTimeline: '',
    intellectualProperty: [],
    regulatoryCompliance: '',
    dataPrivacyCompliance: '',
    socialMission: '',
    impactMetrics: '',
    sdgAlignment: [],
    beneficiaries: '',
    pitchDeck: null,
    businessPlan: null,
    pitchDeckName: '',
    businessPlanName: '',
    demoVideo: '',
    pressCoverage: '',
    awardsRecognition: '',
    partnerships: '',
    preferredContactMethod: '',
    bestTimeToContact: '',
    newsletterSubscription: false,
    marketingCommunications: false
  });

  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const totalSteps = 6;

  // Load project data when editing
  React.useEffect(() => {
    if (isEdit && projectId) {
      const loadProjectData = async () => {
        try {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
          const response = await fetch(`${API_BASE}/api/v1/projects/${projectId}`, {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
          
          if (!response.ok) {
            // If unauthorized, redirect to login
            if (response.status === 401) {
              router.push('/authentication/login');
              return;
            }
            throw new Error(`Failed to load project: ${response.status} ${response.statusText}`);
          }
          
          const project = await response.json();
          console.log('Loaded project data:', project);
          
          if (project.data) {
            const data = project.data;
            console.log('Setting form data with:', data);
            setFormData({
              startupName: data.name || '',
              projectTitle: data.project_title || '',
              tagline: data.tagline || '',
              description: data.description || '',
              website: data.website || '',
              imageUrl: data.image_url || '',
              logo: null,
              founderName: data.founder_name || '',
              founderRole: data.founder_role || '',
              founderEmail: data.founder_email || '',
              founderPhone: data.founder_phone || '',
              founderLinkedin: data.founder_linkedin || '',
              teamSize: data.employees || '',
              teamMembers: (() => {
                try {
                  return data.team_members ? JSON.parse(data.team_members) : [];
                } catch (e) {
                  console.log('Error parsing team_members:', e, data.team_members);
                  return [];
                }
              })(),
              coFounders: (() => {
                try {
                  return data.co_founders ? JSON.parse(data.co_founders) : [];
                } catch (e) {
                  console.log('Error parsing co_founders:', e, data.co_founders);
                  return [];
                }
              })(),
              industry: data.industry || '',
              businessStage: data.stage || '',
              foundedDate: data.founded || '',
              legalStructure: data.legal_structure || '',
              registrationNumber: data.registration_number || '',
              taxId: data.tax_id || '',
              headquartersCountry: data.headquarters_country || '',
              headquartersCity: data.headquarters_city || '',
              primaryMarket: data.primary_market || '',
              targetMarkets: Array.isArray(data.target_markets)
                ? data.target_markets
                : (typeof data.target_markets === 'string'
                    ? data.target_markets.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : []),
              operatingCountries: Array.isArray(data.operating_countries)
                ? data.operating_countries
                : (typeof data.operating_countries === 'string'
                    ? data.operating_countries.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : []),
              problemStatement: data.problem_statement || '',
              solutionDescription: data.solution_description || '',
              keyFeatures: data.key_features || '',
              targetCustomer: data.target_customer || '',
              valueProposition: data.value_proposition || '',
              marketSize: data.market_size || '',
              competitiveAdvantage: data.competitive_advantage || '',
              mainCompetitors: data.main_competitors || '',
              marketPenetration: data.market_penetration || '',
              customerAcquisitionCost: data.customer_acquisition_cost || '',
              customerLifetimeValue: data.customer_lifetime_value || '',
              monthlyActiveUsers: data.monthly_active_users || '',
              revenueGrowthRate: data.revenue_growth_rate || '',
              keyPerformanceIndicators: data.key_performance_indicators || '',
              currentRevenue: data.revenue_text || '',
              fundingStage: data.funding_stage || '',
              fundingRaised: data.funding_raised || '',
              monthlyBurnRate: data.monthly_burn_rate || '',
              runway: data.runway || '',
              productType: Array.isArray(data.product_type)
                ? data.product_type
                : (typeof data.product_type === 'string'
                    ? data.product_type.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : []),
              seekingInvestment: data.seeking_investment || '',
              investmentAmountNeeded: data.investment_amount_needed || '',
              useOfFunds: data.use_of_funds || '',
              previousInvestors: data.previous_investors || '',
              investmentTimeline: data.investment_timeline || '',
              intellectualProperty: Array.isArray(data.intellectual_property)
                ? data.intellectual_property
                : (typeof data.intellectual_property === 'string'
                    ? data.intellectual_property.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : []),
              socialMission: data.social_mission || '',
              impactMetrics: data.impact_metrics || '',
              sdgAlignment: Array.isArray(data.sdg_alignment)
                ? data.sdg_alignment
                : (typeof data.sdg_alignment === 'string'
                    ? data.sdg_alignment.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : []),
              beneficiaries: data.beneficiaries || '',
              regulatoryCompliance: data.regulatory_compliance || '',
              dataPrivacyCompliance: data.data_privacy_compliance || '',
              preferredContactMethod: data.preferred_contact_method || '',
              bestTimeToContact: data.best_time_to_contact || '',
              demoVideo: data.demo_video || '',
              pressCoverage: data.press_coverage || '',
              awardsRecognition: data.awards_recognition || '',
              partnerships: data.partnerships || '',
              pitchDeckName: data.pitch_deck_name || '',
              businessPlanName: data.business_plan_name || '',
              newsletterSubscription: false,
              marketingCommunications: false
            });
          }
        } catch (error) {
          console.error('Error loading project data:', error);
          setSubmitError('Failed to load project data for editing');
        }
      };
      loadProjectData();
    }
  }, [isEdit, projectId]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: keyof FormData, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const addTeamMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: '',
      role: '',
      email: '',
      phone: '',
      linkedin: ''
    };
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, newMember]
    }));
  };

  const removeTeamMember = (id: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== id)
    }));
  };

  const updateTeamMember = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    }));
  };

  const addCoFounder = () => {
    const newCoFounder = {
      id: Date.now().toString(),
      name: '',
      role: '',
      email: '',
      phone: '',
      linkedin: ''
    };
    setFormData(prev => ({
      ...prev,
      coFounders: [...prev.coFounders, newCoFounder]
    }));
  };

  const removeCoFounder = (id: string) => {
    setFormData(prev => ({
      ...prev,
      coFounders: prev.coFounders.filter(coFounder => coFounder.id !== id)
    }));
  };

  const updateCoFounder = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      coFounders: prev.coFounders.map(coFounder =>
        coFounder.id === id ? { ...coFounder, [field]: value } : coFounder
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Don't submit if we're not on the final step
    if (currentStep < totalSteps) {
      console.log('Preventing form submission - not on final step. Current step:', currentStep, 'Total steps:', totalSteps);
      nextStep();
      return false;
    }
    
    console.log('Submitting form - on final step:', currentStep);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Transform form data to match backend schema
      const projectData = {
        name: formData.startupName,
        project_title: formData.projectTitle,
        description: formData.description,
        stage: formData.businessStage,
        industry: formData.industry,
        image_url: formData.imageUrl || '',
        founded: formData.foundedDate,
        employees: formData.teamSize,
        revenue_text: formData.currentRevenue,
        website: formData.website,
        linkedin: formData.founderLinkedin,
        seeking: [
          ...(formData.seekingInvestment === 'Yes' ? ['Investment'] : []),
          'Partnership',
          'Mentorship'
        ].join(', '),
        status: 'Active',
        last_updated: new Date().toISOString(),
        // Additional comprehensive fields
        tagline: formData.tagline,
        founder_name: formData.founderName,
        founder_role: formData.founderRole,
        founder_email: formData.founderEmail,
        founder_phone: formData.founderPhone,
        founder_linkedin: formData.founderLinkedin,
        headquarters_country: formData.headquartersCountry,
        headquarters_city: formData.headquartersCity,
        legal_structure: formData.legalStructure,
        registration_number: formData.registrationNumber,
        tax_id: formData.taxId,
        primary_market: formData.primaryMarket,
        target_markets: Array.isArray(formData.targetMarkets) ? 
          (formData.targetMarkets.length === 1 ? formData.targetMarkets[0] : formData.targetMarkets.join(', ')) : '',
        operating_countries: Array.isArray(formData.operatingCountries) ? formData.operatingCountries.join(', ') : '',
        problem_statement: formData.problemStatement,
        solution_description: formData.solutionDescription,
        key_features: formData.keyFeatures,
        target_customer: formData.targetCustomer,
        value_proposition: formData.valueProposition,
        market_size: formData.marketSize,
        competitive_advantage: formData.competitiveAdvantage,
        main_competitors: formData.mainCompetitors,
        market_penetration: formData.marketPenetration,
        customer_acquisition_cost: formData.customerAcquisitionCost,
        customer_lifetime_value: formData.customerLifetimeValue,
        monthly_active_users: formData.monthlyActiveUsers,
        revenue_growth_rate: formData.revenueGrowthRate,
        key_performance_indicators: formData.keyPerformanceIndicators,
        funding_stage: formData.fundingStage,
        funding_raised: formData.fundingRaised,
        monthly_burn_rate: formData.monthlyBurnRate,
        runway: formData.runway,
        product_type: Array.isArray(formData.productType) ? formData.productType.join(', ') : '',
        seeking_investment: formData.seekingInvestment,
        investment_amount_needed: formData.investmentAmountNeeded,
        use_of_funds: formData.useOfFunds,
        previous_investors: formData.previousInvestors,
        investment_timeline: formData.investmentTimeline,
        intellectual_property: Array.isArray(formData.intellectualProperty) ? formData.intellectualProperty.join(', ') : '',
        social_mission: formData.socialMission,
        impact_metrics: formData.impactMetrics,
        sdg_alignment: Array.isArray(formData.sdgAlignment) ? formData.sdgAlignment.join(', ') : '',
        beneficiaries: formData.beneficiaries,
        regulatory_compliance: formData.regulatoryCompliance,
        data_privacy_compliance: formData.dataPrivacyCompliance,
        preferred_contact_method: formData.preferredContactMethod,
        best_time_to_contact: formData.bestTimeToContact,
        demo_video: formData.demoVideo,
        press_coverage: formData.pressCoverage,
        awards_recognition: formData.awardsRecognition,
        partnerships: formData.partnerships,
        pitch_deck_name: formData.pitchDeck?.name || formData.pitchDeckName || '',
        business_plan_name: formData.businessPlan?.name || formData.businessPlanName || '',
        co_founders: JSON.stringify(formData.coFounders),
        team_members: JSON.stringify(formData.teamMembers)
      };

      const url = isEdit ? `${API_BASE}/api/v1/projects/${projectId}` : `${API_BASE}/api/v1/projects`;
      const method = isEdit ? 'PUT' : 'POST';
      
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      
      const response = await fetch(url, {
        method,
        headers,
        credentials: 'include',
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // If unauthorized, redirect to login
        if (response.status === 401) {
          router.push('/authentication/login');
          return;
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Success - redirect to projects page
    router.push('/projects');
      
    } catch (error) {
      console.error('Error submitting project:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <div className="startup-form-section">
      <h3>Basic Information</h3>
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Startup Name *</label>
          <input
            type="text"
            value={formData.startupName}
            onChange={(e) => handleInputChange('startupName', e.target.value)}
            placeholder="Enter your startup name"
            required
          />
        </div>
        <div className="startup-form-group">
          <label>Project Title *</label>
          <input
            type="text"
            value={formData.projectTitle}
            onChange={(e) => handleInputChange('projectTitle', e.target.value)}
            placeholder="Enter your project title"
            required
          />
        </div>
        <div className="startup-form-group">
          <label>Tagline/Slogan</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => handleInputChange('tagline', e.target.value)}
            placeholder="A short, memorable tagline"
          />
        </div>
      </div>
      
      {/* Location Information */}
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Headquarters Country *</label>
          <select
            value={formData.headquartersCountry}
            onChange={(e) => handleInputChange('headquartersCountry', e.target.value)}
            required
          >
            <option value="">Select a country</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Eswatini">Eswatini</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Greece">Greece</option>
            <option value="Grenada">Grenada</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Honduras">Honduras</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Ivory Coast">Ivory Coast</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia">Micronesia</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="North Korea">North Korea</option>
            <option value="North Macedonia">North Macedonia</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Palestine">Palestine</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Qatar">Qatar</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Korea">South Korea</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City">Vatican City</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
        </div>
        <div className="startup-form-group">
          <label>Headquarters City *</label>
          <input
            type="text"
            value={formData.headquartersCity}
            onChange={(e) => handleInputChange('headquartersCity', e.target.value)}
            placeholder="e.g., Nairobi"
            required
          />
        </div>
      </div>
      
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Website URL</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://yourstartup.com"
          />
        </div>
        <div className="startup-form-group">
          <label>Logo/Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleFileChange('logo', file);
              if (file) {
                // Compress image to reduce data URL size
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                
                img.onload = () => {
                  // Resize to max 400px width while maintaining aspect ratio
                  const maxWidth = 400;
                  const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
                  canvas.width = img.width * ratio;
                  canvas.height = img.height * ratio;
                  
                  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                  
                  // Convert to data URL with 80% quality to reduce size
                  const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                  handleInputChange('imageUrl', dataUrl);
                };
                
                const reader = new FileReader();
                reader.onload = () => {
                  img.src = reader.result as string;
                };
                reader.readAsDataURL(file);
              } else {
                handleInputChange('imageUrl', '');
              }
            }}
            className="startup-form-file-input"
          />
          {formData.logo && (
            <div className="startup-form-file-info">
              <span className="startup-form-file-name">{formData.logo.name}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="startup-form-group">
        <label>Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="Describe your startup in 500-1000 characters"
          rows={4}
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="startup-form-section">
      <h3>Founder & Team Information</h3>
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Founder Name *</label>
          <input
            type="text"
            value={formData.founderName}
            onChange={(e) => handleInputChange('founderName', e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>
        <div className="startup-form-group">
          <label>Founder Role *</label>
          <input
            type="text"
            value={formData.founderRole}
            onChange={(e) => handleInputChange('founderRole', e.target.value)}
            placeholder="e.g., CEO, Founder"
            required
          />
        </div>
      </div>
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Founder Email *</label>
          <input
            type="email"
            value={formData.founderEmail}
            onChange={(e) => handleInputChange('founderEmail', e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="startup-form-group">
          <label>Founder Phone *</label>
          <input
            type="tel"
            value={formData.founderPhone}
            onChange={(e) => handleInputChange('founderPhone', e.target.value)}
            placeholder="+1234567890"
            required
          />
        </div>
      </div>
      <div className="startup-form-group startup-form-group-small">
        <label>Portfolio Link</label>
        <input
          type="url"
          value={formData.founderLinkedin}
          onChange={(e) => handleInputChange('founderLinkedin', e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>
      <div className="startup-form-group startup-form-group-small">
        <label>Team Size *</label>
        <select
          value={formData.teamSize}
          onChange={(e) => handleInputChange('teamSize', e.target.value)}
          required
        >
          <option value="">Select team size</option>
          <option value="1">Just me</option>
          <option value="2-5">2-5 people</option>
          <option value="6-10">6-10 people</option>
          <option value="11-20">11-20 people</option>
          <option value="21-50">21-50 people</option>
          <option value="51+">51+ people</option>
        </select>
      </div>

      {/* Co-founders Section */}
      <div className="startup-form-team-section">
        <div className="startup-form-team-header">
          <h4>Co-founders</h4>
          <button type="button" onClick={addCoFounder} className="startup-form-add-team-btn">
            + Add Co-founder
          </button>
        </div>
        
        {formData.coFounders.map((coFounder, index) => (
          <div key={coFounder.id} className="startup-form-team-member">
            <div className="startup-form-team-member-header">
              <h5>Co-founder {index + 1}</h5>
              <button 
                type="button" 
                onClick={() => removeCoFounder(coFounder.id)}
                className="startup-form-remove-team-btn"
              >
                Remove
              </button>
            </div>
            
            <div className="startup-form-row">
              <div className="startup-form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={coFounder.name}
                  onChange={(e) => updateCoFounder(coFounder.id, 'name', e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="startup-form-group">
                <label>Role *</label>
                <input
                  type="text"
                  value={coFounder.role}
                  onChange={(e) => updateCoFounder(coFounder.id, 'role', e.target.value)}
                  placeholder="e.g., CTO, COO"
                  required
                />
              </div>
            </div>
            
            <div className="startup-form-row">
              <div className="startup-form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={coFounder.email}
                  onChange={(e) => updateCoFounder(coFounder.id, 'email', e.target.value)}
                  placeholder="email@company.com"
                  required
                />
              </div>
              <div className="startup-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={coFounder.phone}
                  onChange={(e) => updateCoFounder(coFounder.id, 'phone', e.target.value)}
                  placeholder="+1234567890"
                />
              </div>
            </div>
            
            <div className="startup-form-group startup-form-group-small">
              <label>Portfolio Link</label>
              <input
                type="url"
                value={coFounder.linkedin}
                onChange={(e) => updateCoFounder(coFounder.id, 'linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Other Team Members Section */}
      <div className="startup-form-team-section">
        <div className="startup-form-team-header">
          <h4>Other Team Members</h4>
          <button type="button" onClick={addTeamMember} className="startup-form-add-team-btn">
            + Add Team Member
          </button>
        </div>
        
        {formData.teamMembers.map((member, index) => (
          <div key={member.id} className="startup-form-team-member">
            <div className="startup-form-team-member-header">
              <h5>Team Member {index + 1}</h5>
              <button 
                type="button" 
                onClick={() => removeTeamMember(member.id)}
                className="startup-form-remove-team-btn"
              >
                Remove
              </button>
            </div>
            
            <div className="startup-form-row">
              <div className="startup-form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="startup-form-group">
                <label>Role *</label>
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                  placeholder="e.g., Developer, Marketing Manager"
                  required
                />
              </div>
            </div>
            
            <div className="startup-form-row">
              <div className="startup-form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                  placeholder="email@company.com"
                  required
                />
              </div>
              <div className="startup-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={member.phone}
                  onChange={(e) => updateTeamMember(member.id, 'phone', e.target.value)}
                  placeholder="+1234567890"
                />
              </div>
            </div>
            
            <div className="startup-form-group startup-form-group-small">
              <label>Portfolio Link</label>
              <input
                type="url"
                value={member.linkedin}
                onChange={(e) => updateTeamMember(member.id, 'linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="startup-form-section">
      <h3>Legal & Compliance</h3>
      
      {/* Business Details */}
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Industry *</label>
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            required
          >
            <option value="">Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        <div className="startup-form-group">
          <label>Business Stage *</label>
          <select
            value={formData.businessStage}
            onChange={(e) => handleInputChange('businessStage', e.target.value)}
            required
          >
            <option value="">Select stage</option>
            {businessStages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Founded Date *</label>
          <input
            type="date"
            value={formData.foundedDate}
            onChange={(e) => handleInputChange('foundedDate', e.target.value)}
            required
          />
        </div>
        <div className="startup-form-group">
          <label>Legal Structure *</label>
          <select
            value={formData.legalStructure}
            onChange={(e) => handleInputChange('legalStructure', e.target.value)}
            required
          >
            <option value="">Select structure</option>
            {legalStructures.map(structure => (
              <option key={structure} value={structure}>{structure}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Registration Number</label>
          <input
            type="text"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            placeholder="Company registration number"
          />
        </div>
        <div className="startup-form-group">
          <label>Tax ID</label>
          <input
            type="text"
            value={formData.taxId}
            onChange={(e) => handleInputChange('taxId', e.target.value)}
            placeholder="Tax identification number"
          />
        </div>
      </div>

      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Regulatory Compliance *</label>
          <select
            value={formData.regulatoryCompliance}
            onChange={(e) => handleInputChange('regulatoryCompliance', e.target.value)}
            required
          >
            <option value="">Select compliance status</option>
            {regulatoryComplianceOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="startup-form-group">
          <label>Data Privacy Compliance *</label>
          <select
            value={formData.dataPrivacyCompliance}
            onChange={(e) => handleInputChange('dataPrivacyCompliance', e.target.value)}
            required
          >
            <option value="">Select compliance status</option>
            {dataPrivacyComplianceOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Legal & Compliance */}
      <div className="startup-form-group">
        <label>Intellectual Property *</label>
        <div className="startup-form-checkbox-group">
          {intellectualPropertyOptions.map(option => (
            <label key={option} className="startup-form-checkbox-item">
              <input
                type="checkbox"
                checked={formData.intellectualProperty.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      intellectualProperty: [...prev.intellectualProperty, option]
                    }));
                  } else {
                    setFormData(prev => ({
                      ...prev,
                      intellectualProperty: prev.intellectualProperty.filter(item => item !== option)
                    }));
                  }
                }}
              />
              <span className="startup-form-checkbox-label">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="startup-form-section">
      <h3>Product & Market Information</h3>
      
      {/* Product Type */}
      <div className="startup-form-group">
        <label>Product Type *</label>
        <div className="startup-form-checkbox-group">
          {productTypes.map(type => (
            <label key={type} className="startup-form-checkbox-item">
              <input
                type="checkbox"
                checked={formData.productType.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      productType: [...prev.productType, type]
                    }));
                  } else {
                    setFormData(prev => ({
                      ...prev,
                      productType: prev.productType.filter(t => t !== type)
                    }));
                  }
                }}
              />
              <span className="startup-form-checkbox-label">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="startup-form-group">
        <label>Problem Statement *</label>
        <textarea
          value={formData.problemStatement}
          onChange={(e) => handleInputChange('problemStatement', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="What problem does your startup solve? (200-500 characters)"
          rows={3}
          required
        />
      </div>
      <div className="startup-form-group">
        <label>Solution Description *</label>
        <textarea
          value={formData.solutionDescription}
          onChange={(e) => handleInputChange('solutionDescription', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="How does your startup solve this problem? (300-800 characters)"
          rows={4}
          required
        />
      </div>
      <div className="startup-form-group">
        <label>Key Features *</label>
        <textarea
          value={formData.keyFeatures}
          onChange={(e) => handleInputChange('keyFeatures', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="List your key features (one per line)"
          rows={3}
          required
        />
      </div>
      <div className="startup-form-group">
        <label>Target Customer *</label>
        <input
          type="text"
          value={formData.targetCustomer}
          onChange={(e) => handleInputChange('targetCustomer', e.target.value)}
          placeholder="Who is your target customer?"
          required
        />
      </div>
      <div className="startup-form-group">
        <label>Value Proposition *</label>
        <textarea
          value={formData.valueProposition}
          onChange={(e) => handleInputChange('valueProposition', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="What makes your solution unique? (100-300 characters)"
          rows={2}
          required
        />
      </div>

      {/* Market & Competition */}
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Market Size *</label>
          <select
            value={formData.marketSize}
            onChange={(e) => handleInputChange('marketSize', e.target.value)}
            required
          >
            <option value="">Select market size</option>
            {marketSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div className="startup-form-group">
          <label>Market Penetration *</label>
          <select
            value={formData.marketPenetration}
            onChange={(e) => handleInputChange('marketPenetration', e.target.value)}
            required
          >
            <option value="">Select penetration</option>
            {marketPenetrations.map(penetration => (
              <option key={penetration} value={penetration}>{penetration}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="startup-form-group">
        <label>Competitive Advantage *</label>
        <textarea
          value={formData.competitiveAdvantage}
          onChange={(e) => handleInputChange('competitiveAdvantage', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="What gives you a competitive edge?"
          rows={3}
          required
        />
      </div>
      <div className="startup-form-group">
        <label>Main Competitors</label>
        <textarea
          value={formData.mainCompetitors}
          onChange={(e) => handleInputChange('mainCompetitors', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="List your main competitors"
          rows={2}
        />
      </div>

      {/* Market Information */}
      <div className="startup-form-group">
        <label>Primary Market *</label>
        <input
          type="text"
          value={formData.primaryMarket}
          onChange={(e) => handleInputChange('primaryMarket', e.target.value)}
          placeholder="e.g., East Africa"
          required
        />
      </div>
      <div className="startup-form-group">
        <label>Target Markets</label>
        <input
          type="text"
          value={formData.targetMarkets.join(', ')}
          onChange={(e) => {
            const value = e.target.value;
            // Don't process immediately, just store the raw text
            setFormData(prev => ({
              ...prev,
              targetMarkets: [value] // Store as single item temporarily
            }));
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="e.g., Kenya, Uganda, Tanzania (comma separated)"
        />
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="startup-form-section">
      <h3>Growth & Metrics</h3>
      
      {/* Growth & Metrics */}
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Customer Acquisition Cost</label>
          <input
            type="text"
            value={formData.customerAcquisitionCost}
            onChange={(e) => handleInputChange('customerAcquisitionCost', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentStep < totalSteps) {
                e.preventDefault();
                nextStep();
              }
            }}
            placeholder="e.g., $50"
          />
        </div>
        <div className="startup-form-group">
          <label>Customer Lifetime Value</label>
          <input
            type="text"
            value={formData.customerLifetimeValue}
            onChange={(e) => handleInputChange('customerLifetimeValue', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentStep < totalSteps) {
                e.preventDefault();
                nextStep();
              }
            }}
            placeholder="e.g., $500"
          />
        </div>
      </div>
      
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Monthly Active Users</label>
          <input
            type="text"
            value={formData.monthlyActiveUsers}
            onChange={(e) => handleInputChange('monthlyActiveUsers', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentStep < totalSteps) {
                e.preventDefault();
                nextStep();
              }
            }}
            placeholder="e.g., 10,000"
          />
        </div>
        <div className="startup-form-group">
          <label>Revenue Growth Rate</label>
          <input
            type="text"
            value={formData.revenueGrowthRate}
            onChange={(e) => handleInputChange('revenueGrowthRate', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentStep < totalSteps) {
                e.preventDefault();
                nextStep();
              }
            }}
            placeholder="e.g., 20% monthly"
          />
        </div>
      </div>
      
      <div className="startup-form-group">
        <label>Key Performance Indicators</label>
        <textarea
          value={formData.keyPerformanceIndicators}
          onChange={(e) => handleInputChange('keyPerformanceIndicators', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="List your key metrics (one per line)"
          rows={3}
        />
      </div>

      {/* Social Impact */}
      <div className="startup-form-group">
        <label>Social Mission</label>
        <textarea
          value={formData.socialMission}
          onChange={(e) => handleInputChange('socialMission', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="Describe your social impact mission"
          rows={3}
        />
      </div>
      <div className="startup-form-group">
        <label>Impact Metrics</label>
        <textarea
          value={formData.impactMetrics}
          onChange={(e) => handleInputChange('impactMetrics', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="How do you measure your social impact?"
          rows={2}
        />
      </div>
      <div className="startup-form-group">
        <label>SDG Alignment</label>
        <div className="startup-form-checkbox-group">
          {sdgOptions.map(sdg => (
            <label key={sdg} className="startup-form-checkbox-item">
              <input
                type="checkbox"
                checked={formData.sdgAlignment.includes(sdg)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      sdgAlignment: [...prev.sdgAlignment, sdg]
                    }));
                  } else {
                    setFormData(prev => ({
                      ...prev,
                      sdgAlignment: prev.sdgAlignment.filter(item => item !== sdg)
                    }));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && currentStep < totalSteps) {
                    e.preventDefault();
                    nextStep();
                  }
                }}
              />
              <span className="startup-form-checkbox-label">{sdg}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="startup-form-group">
        <label>Beneficiaries</label>
        <input
          type="text"
          value={formData.beneficiaries}
          onChange={(e) => handleInputChange('beneficiaries', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="Who benefits from your solution?"
        />
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="startup-form-section">
      <h3>Funding & Investment</h3>
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Current Revenue *</label>
          <select
            value={formData.currentRevenue}
            onChange={(e) => handleInputChange('currentRevenue', e.target.value)}
            required
          >
            <option value="">Select revenue range</option>
            {revenueRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
        <div className="startup-form-group">
          <label>Funding Raised *</label>
          <select
            value={formData.fundingRaised}
            onChange={(e) => handleInputChange('fundingRaised', e.target.value)}
            required
          >
            <option value="">Select funding raised</option>
            <option value="Bootstrapped">Bootstrapped</option>
            {revenueRanges.slice(1).map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Monthly Burn Rate</label>
          <input
            type="text"
            value={formData.monthlyBurnRate}
            onChange={(e) => handleInputChange('monthlyBurnRate', e.target.value)}
            placeholder="e.g., $5,000"
          />
        </div>
        <div className="startup-form-group">
          <label>Runway</label>
          <input
            type="text"
            value={formData.runway}
            onChange={(e) => handleInputChange('runway', e.target.value)}
            placeholder="e.g., 12 months"
          />
        </div>
      </div>
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Funding Stage *</label>
          <select
            value={formData.fundingStage}
            onChange={(e) => handleInputChange('fundingStage', e.target.value)}
            required
          >
            <option value="">Select funding stage</option>
            {fundingStages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>
        <div className="startup-form-group">
          <label>Seeking Investment *</label>
          <select
            value={formData.seekingInvestment}
            onChange={(e) => handleInputChange('seekingInvestment', e.target.value)}
            required
          >
            <option value="">Select option</option>
            {seekingInvestmentOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {formData.seekingInvestment === 'Yes' && (
        <>
          <div className="startup-form-group">
            <label>Investment Amount Needed</label>
            <input
              type="text"
              value={formData.investmentAmountNeeded}
              onChange={(e) => handleInputChange('investmentAmountNeeded', e.target.value)}
              placeholder="e.g., $500,000"
            />
          </div>
          <div className="startup-form-group">
            <label>Use of Funds</label>
            <textarea
              value={formData.useOfFunds}
              onChange={(e) => handleInputChange('useOfFunds', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
                  e.preventDefault();
                  nextStep();
                }
              }}
              placeholder="How will you use the investment?"
              rows={3}
            />
          </div>
          <div className="startup-form-group">
            <label>Investment Timeline</label>
            <input
              type="text"
              value={formData.investmentTimeline}
              onChange={(e) => handleInputChange('investmentTimeline', e.target.value)}
              placeholder="e.g., 6 months"
            />
          </div>
        </>
      )}

      <div className="startup-form-group">
        <label>Previous Investors</label>
        <textarea
          value={formData.previousInvestors}
          onChange={(e) => handleInputChange('previousInvestors', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="List any previous investors"
          rows={2}
        />
      </div>

      {/* Additional Information */}
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Pitch Deck</label>
          <input
            type="file"
            accept=".pdf,.ppt,.pptx"
            onChange={(e) => handleFileChange('pitchDeck', e.target.files?.[0] || null)}
            className="startup-form-file-input"
          />
          {formData.pitchDeck && (
            <div className="startup-form-file-info">
              <span className="startup-form-file-name">{formData.pitchDeck.name}</span>
            </div>
          )}
        </div>
        <div className="startup-form-group">
          <label>Business Plan</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange('businessPlan', e.target.files?.[0] || null)}
            className="startup-form-file-input"
          />
          {formData.businessPlan && (
            <div className="startup-form-file-info">
              <span className="startup-form-file-name">{formData.businessPlan.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="startup-form-group startup-form-group-small">
        <label>Demo Video URL</label>
        <input
          type="url"
          value={formData.demoVideo}
          onChange={(e) => handleInputChange('demoVideo', e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>
      <div className="startup-form-group">
        <label>Press Coverage</label>
        <textarea
          value={formData.pressCoverage}
          onChange={(e) => handleInputChange('pressCoverage', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="List any press coverage or media mentions"
          rows={2}
        />
      </div>
      <div className="startup-form-group">
        <label>Awards & Recognition</label>
        <textarea
          value={formData.awardsRecognition}
          onChange={(e) => handleInputChange('awardsRecognition', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="List any awards or recognition received"
          rows={2}
        />
      </div>
      <div className="startup-form-group">
        <label>Partnerships</label>
        <textarea
          value={formData.partnerships}
          onChange={(e) => handleInputChange('partnerships', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < totalSteps) {
              e.preventDefault();
              nextStep();
            }
          }}
          placeholder="List any key partnerships"
          rows={2}
        />
      </div>

      {/* Contact Preferences */}
      <div className="startup-form-row">
        <div className="startup-form-group">
          <label>Preferred Contact Method *</label>
          <select
            value={formData.preferredContactMethod}
            onChange={(e) => handleInputChange('preferredContactMethod', e.target.value)}
            required
          >
            <option value="">Select contact method</option>
            {contactMethodOptions.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
        <div className="startup-form-group">
          <label>Best Time to Contact</label>
          <input
            type="text"
            value={formData.bestTimeToContact}
            onChange={(e) => handleInputChange('bestTimeToContact', e.target.value)}
            placeholder="e.g., Weekdays 9-5 PM EST"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        .startup-form-error {
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
          color: #dc2626;
        }
        .startup-form-error p {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
        }
        .startup-form-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
      
    <div className="startup-form-wrap">
      <div className="startup-form-header">
        <button className="startup-form-back-btn" onClick={() => router.back()}>
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      <div className="startup-form-progress">
        <div className="startup-form-progress-bar">
          <div 
            className="startup-form-progress-fill" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <span className="startup-form-progress-text">Step {currentStep} of {totalSteps}</span>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="startup-form"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && currentStep < totalSteps) {
            e.preventDefault();
            e.stopPropagation();
            nextStep();
            return false;
          }
        }}
      >
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}

        {submitError && (
          <div className="startup-form-error">
            <p>{submitError}</p>
          </div>
        )}

        <div className="startup-form-actions">
          {currentStep > 1 && (
            <button 
              type="button" 
              onClick={prevStep} 
              className="startup-form-btn startup-form-btn-secondary"
              disabled={isSubmitting}
            >
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button 
              type="button" 
              onClick={nextStep} 
              className="startup-form-btn startup-form-btn-primary"
              disabled={isSubmitting}
            >
              Next
            </button>
          ) : (
            <button 
              type="submit" 
              className="startup-form-btn startup-form-btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (isEdit ? 'Update Project' : 'Submit Application')}
            </button>
          )}
        </div>
      </form>
    </div>
    </>
  );
}
