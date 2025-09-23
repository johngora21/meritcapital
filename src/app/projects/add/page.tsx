"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type FormData = {
  // Basic Information
  startupName: string;
  tagline: string;
  description: string;
  website: string;
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
  "Software/SaaS",
  "Mobile App",
  "E-commerce",
  "Physical Product",
  "Service",
  "Platform",
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

export default function AddStartupPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>({
    startupName: '',
    tagline: '',
    description: '',
    website: '',
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
  const totalSteps = 6;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    router.push('/projects');
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
          <input
            type="text"
            value={formData.headquartersCountry}
            onChange={(e) => handleInputChange('headquartersCountry', e.target.value)}
            placeholder="e.g., Kenya"
            required
          />
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
            onChange={(e) => handleFileChange('logo', e.target.files?.[0] || null)}
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
          onChange={(e) => handleInputChange('targetMarkets', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
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
            placeholder="e.g., $50"
          />
        </div>
        <div className="startup-form-group">
          <label>Customer Lifetime Value</label>
          <input
            type="text"
            value={formData.customerLifetimeValue}
            onChange={(e) => handleInputChange('customerLifetimeValue', e.target.value)}
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
            placeholder="e.g., 10,000"
          />
        </div>
        <div className="startup-form-group">
          <label>Revenue Growth Rate</label>
          <input
            type="text"
            value={formData.revenueGrowthRate}
            onChange={(e) => handleInputChange('revenueGrowthRate', e.target.value)}
            placeholder="e.g., 20% monthly"
          />
        </div>
      </div>
      
      <div className="startup-form-group">
        <label>Key Performance Indicators</label>
        <textarea
          value={formData.keyPerformanceIndicators}
          onChange={(e) => handleInputChange('keyPerformanceIndicators', e.target.value)}
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
          placeholder="Describe your social impact mission"
          rows={3}
        />
      </div>
      <div className="startup-form-group">
        <label>Impact Metrics</label>
        <textarea
          value={formData.impactMetrics}
          onChange={(e) => handleInputChange('impactMetrics', e.target.value)}
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
          placeholder="List any press coverage or media mentions"
          rows={2}
        />
      </div>
      <div className="startup-form-group">
        <label>Awards & Recognition</label>
        <textarea
          value={formData.awardsRecognition}
          onChange={(e) => handleInputChange('awardsRecognition', e.target.value)}
          placeholder="List any awards or recognition received"
          rows={2}
        />
      </div>
      <div className="startup-form-group">
        <label>Partnerships</label>
        <textarea
          value={formData.partnerships}
          onChange={(e) => handleInputChange('partnerships', e.target.value)}
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

      <form onSubmit={handleSubmit} className="startup-form">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}

        <div className="startup-form-actions">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="startup-form-btn startup-form-btn-secondary">
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button type="button" onClick={nextStep} className="startup-form-btn startup-form-btn-primary">
              Next
            </button>
          ) : (
            <button type="submit" className="startup-form-btn startup-form-btn-primary">
              Submit Application
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
