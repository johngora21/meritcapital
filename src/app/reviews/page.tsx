"use client";
import React from 'react';

type ReviewItem = {
  id: string;
  projectName: string;
  founder: string;
  industry: string;
  location?: string;
  stage: string;
  submittedAt: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  description?: string;
  // Optional extended fields mirrored from add project page
  tagline?: string;
  website?: string;
  founderRole?: string;
  founderEmail?: string;
  founderPhone?: string;
  founderLinkedin?: string;
  teamSize?: string;
  teamMembers?: Array<{ name?: string; role?: string; email?: string; phone?: string; linkedin?: string }>;
  coFounders?: Array<{ name?: string; role?: string; email?: string; phone?: string; linkedin?: string }>;
  businessStage?: string;
  foundedDate?: string;
  legalStructure?: string;
  registrationNumber?: string;
  taxId?: string;
  headquartersCountry?: string;
  headquartersCity?: string;
  primaryMarket?: string;
  targetMarkets?: string[];
  operatingCountries?: string[];
  currentRevenue?: string;
  fundingRaised?: string;
  fundingStage?: string;
  monthlyBurnRate?: string;
  runway?: string;
  productType?: string[];
  problemStatement?: string;
  solutionDescription?: string;
  keyFeatures?: string;
  targetCustomer?: string;
  valueProposition?: string;
  marketSize?: string;
  competitiveAdvantage?: string;
  mainCompetitors?: string;
  marketPenetration?: string;
  customerAcquisitionCost?: string;
  customerLifetimeValue?: string;
  monthlyActiveUsers?: string;
  revenueGrowthRate?: string;
  keyPerformanceIndicators?: string;
  seekingInvestment?: string;
  investmentAmountNeeded?: string;
  useOfFunds?: string;
  previousInvestors?: string;
  investmentTimeline?: string;
  intellectualProperty?: string[];
  regulatoryCompliance?: string;
  dataPrivacyCompliance?: string;
  socialMission?: string;
  impactMetrics?: string;
  sdgAlignment?: string[];
  beneficiaries?: string;
  demoVideo?: string;
  pressCoverage?: string;
  awardsRecognition?: string;
  partnerships?: string;
  preferredContactMethod?: string;
  bestTimeToContact?: string;
};

const seededReviews: ReviewItem[] = [
  {
    id: 'r1',
    projectName: 'TechStart Africa',
    founder: 'Amina Yusuf',
    industry: 'Digital Technology',
    location: 'Nairobi, Kenya',
    stage: 'Series A',
    submittedAt: '2024-11-28',
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80&auto=format&fit=crop',
    status: 'pending',
    description: 'Fintech platform scaling across East Africa with solid traction.',
    // Basic
    tagline: 'Inclusive finance for emerging markets',
    website: 'https://techstart.africa',
    headquartersCountry: 'Kenya',
    headquartersCity: 'Nairobi',
    foundedDate: '2021-05-01',
    legalStructure: 'LLC',
    registrationNumber: 'KE-TS-2021-0092',
    taxId: 'PIN-A1B2C3D4',
    // Founder & Team
    founderRole: 'CEO',
    founderEmail: 'amina@techstart.africa',
    founderPhone: '+254700000001',
    founderLinkedin: 'https://linkedin.com/in/amina-yusuf',
    teamSize: '11-20',
    coFounders: [
      { name: 'James Otieno', role: 'CTO' },
      { name: 'Faith Mburu', role: 'COO' }
    ],
    teamMembers: [
      { name: 'Lydia', role: 'Head of Product' },
      { name: 'Peter', role: 'Lead Engineer' }
    ],
    // Product & Service
    productType: ['Software/SaaS', 'Mobile App'],
    problemStatement: 'SMEs lack affordable, fast access to working capital.',
    solutionDescription: 'AI-driven risk scoring enables instant micro-facility approvals.',
    keyFeatures: 'Instant KYC; Mobile wallet; Analytics dashboard',
    targetCustomer: 'Micro and small businesses',
    valueProposition: 'Lower default rates and faster disbursements than incumbents.',
    // Market & Competition
    marketSize: 'Regional ($1M - $10M)',
    marketPenetration: '1-5%',
    primaryMarket: 'East Africa',
    targetMarkets: ['Kenya','Uganda','Tanzania'],
    operatingCountries: ['Kenya'],
    competitiveAdvantage: 'Proprietary alternate data models, local agent network',
    mainCompetitors: 'M-Kopa, Tala, Branch',
    // Growth & Metrics
    customerAcquisitionCost: '$8',
    customerLifetimeValue: '$120',
    monthlyActiveUsers: '50,000',
    revenueGrowthRate: '18% MoM',
    keyPerformanceIndicators: 'Approval rate; NPL < 3%; Repeat usage 42%',
    // Funding & Investment
    currentRevenue: '$100K - $500K',
    fundingRaised: '$500K - $1M',
    fundingStage: 'Seed',
    monthlyBurnRate: '$35,000',
    runway: '14 months',
    seekingInvestment: 'Yes',
    investmentAmountNeeded: '$2,000,000',
    useOfFunds: 'Engineering hires; market expansion; compliance',
    previousInvestors: 'Angel Syndicate EA; Green Capital',
    investmentTimeline: '6 months',
    // Legal & Compliance
    intellectualProperty: ['Trademarks','Trade Secrets'],
    regulatoryCompliance: 'Partially Compliant',
    dataPrivacyCompliance: 'GDPR Compliant',
    // Social Impact
    socialMission: 'Financial inclusion for underserved SMEs',
    impactMetrics: 'Jobs created; % women-led SMEs financed',
    sdgAlignment: ['Decent Work and Economic Growth','Industry, Innovation and Infrastructure'],
    beneficiaries: 'SMEs in urban and peri-urban areas',
    // Additional Information
    demoVideo: 'https://youtu.be/demo-techstart',
    pressCoverage: 'TechCrunch; Disrupt Africa',
    awardsRecognition: 'AFRIFIN 2024 finalist',
    partnerships: 'Safaricom; Equity Bank',
    // Contact Preferences
    preferredContactMethod: 'Email',
    bestTimeToContact: 'Weekdays 10am-4pm EAT'
  },
  {
    id: 'r2',
    projectName: 'GreenFields Ltd',
    founder: 'Joseph Mwangi',
    industry: 'Agriculture',
    location: 'Dar es Salaam, Tanzania',
    stage: 'Growth Stage',
    submittedAt: '2024-11-26',
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80&auto=format&fit=crop',
    status: 'pending',
    description: 'Sustainable farming solutions expanding distribution across the region.',
    productType: ['Physical Product','Service'],
    operatingCountries: ['Tanzania','Zambia'],
    fundingStage: 'Series A',
    currentRevenue: '$500K - $1M',
    socialMission: 'Support smallholder farmers with climate-smart inputs'
  },
  {
    id: 'r3',
    projectName: 'MedTech Solutions',
    founder: 'Grace Nkurunziza',
    industry: 'Health',
    location: 'Kigali, Rwanda',
    stage: 'Mature',
    submittedAt: '2024-11-25',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80&auto=format&fit=crop',
    status: 'rejected',
    description: 'Health tech platform serving 10K+ providers seeking growth capital.',
    fundingRaised: '$1M - $5M',
    marketSize: 'National ($10M - $100M)'
  }
];

export default function ReviewsPage() {
  const [items, setItems] = React.useState<ReviewItem[]>(seededReviews);
  const [query, setQuery] = React.useState('');
  const [selectedIndustry, setSelectedIndustry] = React.useState<string>('');
  const [selectedStage, setSelectedStage] = React.useState<string>('');
  const [selectedCountry, setSelectedCountry] = React.useState<string>('');
  const [selected, setSelected] = React.useState<ReviewItem | null>(null);

  const stages = [
    'Idea', 'MVP', 'Early Stage', 'Growth', 'Scale', 'Mature', 'Seed', 'Series A', 'Series B'
  ];

  const industries = [
    'Agriculture', 'Digital Technology', 'Education', 'Energy', 'Finance', 'Health', 'Impact & Sustainability'
  ];

  const countries = [
    'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Congo-Brazzaville)','Costa Rica','Cote d’Ivoire','Croatia','Cuba','Cyprus','Czechia (Czech Republic)','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini (fmr. "Swaziland")','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Holy See','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar (formerly Burma)','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine State','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States of America','Uruguay','Uzbekistan','Vanuatu','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
  ];

  const filtered = items.filter((x) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === '' ||
      x.projectName.toLowerCase().includes(q) ||
      x.founder.toLowerCase().includes(q) ||
      (x.description || '').toLowerCase().includes(q);
    const matchesIndustry = selectedIndustry === '' || x.industry === selectedIndustry;
    const matchesStage = selectedStage === '' || x.stage === selectedStage;
    const matchesCountry = selectedCountry === '' || (x.location || '') === selectedCountry;
    return matchesQuery && matchesIndustry && matchesStage && matchesCountry;
  });

  const updateStatus = (id: string, next: ReviewItem['status']) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, status: next } : x)));
  };

  return (
    <div className="proj-wrap">
      <div className="proj-head">
        <div className="proj-head-content">
        <h2>Project Reviews</h2>
          <p>Review and moderate submitted projects</p>
        </div>
      </div>

      <div className="proj-toolbar">
        <div className="ent-filters">
          <input
            className="ent-search"
            placeholder="Search projects or founders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="ent-stage-filter"
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
          >
            <option value="">All Stages</option>
            {stages.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            className="ent-industry-filter"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            <option value="">All Industries</option>
            {industries.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <select
            className="ent-industry-filter"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="ent-grid">
        {filtered.map((proj) => (
          <div key={proj.id} className="ent-card" onClick={() => setSelected(proj)}>
            <div className="ent-card-header">
              <div className="ent-image">
                <img src={proj.imageUrl} alt={proj.projectName} />
                <div className="ent-industry-overlay">{proj.industry}</div>
              </div>
            </div>
            <div className="ent-card-body">
              <h3 className="ent-title">{proj.projectName}</h3>
              <p className="ent-founder">{proj.founder ? `Founded by ${proj.founder}` : ''}</p>
              {proj.description && (
                <p className="ent-description">{proj.description}</p>
              )}
              <div className="ent-meta-simple">
                <div className="ent-meta-item">
                  <span className="ent-meta-label">Stage:</span>
                  <span className="ent-meta-value">{proj.stage}</span>
                </div>
                <div className="ent-meta-item">
                  <span className="ent-meta-label">Submitted:</span>
                  <span className="ent-meta-value">{new Date(proj.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="ent-card-footer">
              <div className="ent-footer-left">
                <span className="ent-location">{proj.location || ''}</span>
              </div>
              <div className="ent-footer-right" style={{ display: 'flex', gap: 8 }}>
                <button className="rc-btn rc-btn--danger" onClick={() => updateStatus(proj.id, 'rejected')}>Reject</button>
                <button className="rc-btn" onClick={() => updateStatus(proj.id, 'approved')}>Approve</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="ent-modal-overlay" onClick={() => setSelected(null)}>
          <div className="ent-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ent-modal-close" onClick={() => setSelected(null)}>×</button>
            <div className="ent-modal-content">
              <div className="ent-modal-header">
                <div className="ent-modal-image">
                  <img src={selected.imageUrl} alt={selected.projectName} />
                </div>
              </div>
              <div className="ent-modal-body">
                <div className="ent-modal-header-info">
                  <h2 className="ent-modal-title">{selected.projectName}</h2>
                  {selected.founder && (
                    <p className="ent-modal-founder">Founded by {selected.founder}</p>
                  )}
                </div>
                {selected.description && (
                  <p className="ent-modal-description">{selected.description}</p>
                )}

                <div className="ent-modal-details">
                  <div className="ent-modal-section">
                    <h3>Basic Information</h3>
                    <div className="ent-modal-meta">
                      {selected.tagline && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Tagline:</span><span className="ent-modal-meta-value">{selected.tagline}</span></div>)}
                      {selected.website && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Website:</span><span className="ent-modal-meta-value">{selected.website}</span></div>)}
                      {selected.headquartersCountry && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">HQ Country:</span><span className="ent-modal-meta-value">{selected.headquartersCountry}</span></div>)}
                      {selected.headquartersCity && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">HQ City:</span><span className="ent-modal-meta-value">{selected.headquartersCity}</span></div>)}
                    </div>
                  </div>
                  <div className="ent-modal-section">
                    <h3>Project Details</h3>
                    <div className="ent-modal-meta">
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Stage:</span>
                        <span className="ent-modal-meta-value">{selected.stage}</span>
                      </div>
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Industry:</span>
                        <span className="ent-modal-meta-value">{selected.industry}</span>
                      </div>
                      {selected.location && (
                        <div className="ent-modal-meta-item">
                          <span className="ent-modal-meta-label">Location:</span>
                          <span className="ent-modal-meta-value">{selected.location}</span>
                        </div>
                      )}
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Submitted:</span>
                        <span className="ent-modal-meta-value">{new Date(selected.submittedAt).toLocaleDateString()}</span>
                      </div>
                      {selected.foundedDate && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Founded:</span><span className="ent-modal-meta-value">{selected.foundedDate}</span></div>)}
                      {selected.legalStructure && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Legal Structure:</span><span className="ent-modal-meta-value">{selected.legalStructure}</span></div>)}
                      {selected.registrationNumber && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Registration #:</span><span className="ent-modal-meta-value">{selected.registrationNumber}</span></div>)}
                      {selected.taxId && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Tax ID:</span><span className="ent-modal-meta-value">{selected.taxId}</span></div>)}
                    </div>
                  </div>

                  <div className="ent-modal-section">
                    <h3>Founder & Team</h3>
                    <div className="ent-modal-meta">
                      {selected.founderRole && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Founder Role:</span><span className="ent-modal-meta-value">{selected.founderRole}</span></div>)}
                      {selected.founderEmail && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Founder Email:</span><span className="ent-modal-meta-value">{selected.founderEmail}</span></div>)}
                      {selected.founderPhone && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Founder Phone:</span><span className="ent-modal-meta-value">{selected.founderPhone}</span></div>)}
                      {selected.founderLinkedin && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Founder Portfolio:</span><span className="ent-modal-meta-value">{selected.founderLinkedin}</span></div>)}
                      {selected.teamSize && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Team Size:</span><span className="ent-modal-meta-value">{selected.teamSize}</span></div>)}
                    </div>
                    {selected.coFounders && selected.coFounders.length > 0 && (
                      <div className="ent-modal-section">
                        <h4>Co-founders</h4>
                        <ul className="rc-modal-list">
                          {selected.coFounders.map((c, idx) => (
                            <li key={idx}>{[c.name, c.role].filter(Boolean).join(' — ')}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selected.teamMembers && selected.teamMembers.length > 0 && (
                      <div className="ent-modal-section">
                        <h4>Team Members</h4>
                        <ul className="rc-modal-list">
                          {selected.teamMembers.map((m, idx) => (
                            <li key={idx}>{[m.name, m.role].filter(Boolean).join(' — ')}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="ent-modal-section">
                    <h3>Product & Service</h3>
                    {selected.productType && selected.productType.length > 0 && (
                      <div className="ent-modal-tags">
                        {selected.productType.map((t) => (<span key={t} className="ent-modal-tag">{t}</span>))}
                      </div>
                    )}
                    {selected.problemStatement && (<p className="ent-modal-description">Problem: {selected.problemStatement}</p>)}
                    {selected.solutionDescription && (<p className="ent-modal-description">Solution: {selected.solutionDescription}</p>)}
                    {selected.keyFeatures && (<p className="ent-modal-description">Key Features: {selected.keyFeatures}</p>)}
                    {selected.targetCustomer && (<p className="ent-modal-description">Target Customer: {selected.targetCustomer}</p>)}
                    {selected.valueProposition && (<p className="ent-modal-description">Value Proposition: {selected.valueProposition}</p>)}
                  </div>

                  <div className="ent-modal-section">
                    <h3>Market & Competition</h3>
                    <div className="ent-modal-meta">
                      {selected.marketSize && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Market Size:</span><span className="ent-modal-meta-value">{selected.marketSize}</span></div>)}
                      {selected.marketPenetration && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Market Penetration:</span><span className="ent-modal-meta-value">{selected.marketPenetration}</span></div>)}
                      {selected.primaryMarket && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Primary Market:</span><span className="ent-modal-meta-value">{selected.primaryMarket}</span></div>)}
                    </div>
                    {selected.targetMarkets && selected.targetMarkets.length > 0 && (
                      <div className="ent-modal-tags" style={{ marginTop: 8 }}>
                        {selected.targetMarkets.map((m) => (<span key={m} className="ent-modal-tag">{m}</span>))}
                      </div>
                    )}
                    {selected.operatingCountries && selected.operatingCountries.length > 0 && (
                      <div className="ent-modal-tags" style={{ marginTop: 8 }}>
                        {selected.operatingCountries.map((c) => (<span key={c} className="ent-modal-tag">{c}</span>))}
                      </div>
                    )}
                    {selected.competitiveAdvantage && (<p className="ent-modal-description">Advantage: {selected.competitiveAdvantage}</p>)}
                    {selected.mainCompetitors && (<p className="ent-modal-description">Competitors: {selected.mainCompetitors}</p>)}
                  </div>

                  <div className="ent-modal-section">
                    <h3>Growth & Metrics</h3>
                    <div className="ent-modal-meta">
                      {selected.customerAcquisitionCost && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">CAC:</span><span className="ent-modal-meta-value">{selected.customerAcquisitionCost}</span></div>)}
                      {selected.customerLifetimeValue && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">LTV:</span><span className="ent-modal-meta-value">{selected.customerLifetimeValue}</span></div>)}
                      {selected.monthlyActiveUsers && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">MAU:</span><span className="ent-modal-meta-value">{selected.monthlyActiveUsers}</span></div>)}
                      {selected.revenueGrowthRate && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Growth Rate:</span><span className="ent-modal-meta-value">{selected.revenueGrowthRate}</span></div>)}
                      {selected.keyPerformanceIndicators && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">KPIs:</span><span className="ent-modal-meta-value">{selected.keyPerformanceIndicators}</span></div>)}
                    </div>
                  </div>

                  <div className="ent-modal-section">
                    <h3>Funding & Investment</h3>
                    <div className="ent-modal-meta">
                      {selected.currentRevenue && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Current Revenue:</span><span className="ent-modal-meta-value">{selected.currentRevenue}</span></div>)}
                      {selected.fundingRaised && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Funding Raised:</span><span className="ent-modal-meta-value">{selected.fundingRaised}</span></div>)}
                      {selected.fundingStage && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Funding Stage:</span><span className="ent-modal-meta-value">{selected.fundingStage}</span></div>)}
                      {selected.monthlyBurnRate && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Burn Rate:</span><span className="ent-modal-meta-value">{selected.monthlyBurnRate}</span></div>)}
                      {selected.runway && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Runway:</span><span className="ent-modal-meta-value">{selected.runway}</span></div>)}
                      {selected.seekingInvestment && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Seeking Investment:</span><span className="ent-modal-meta-value">{selected.seekingInvestment}</span></div>)}
                      {selected.investmentAmountNeeded && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Amount Needed:</span><span className="ent-modal-meta-value">{selected.investmentAmountNeeded}</span></div>)}
                      {selected.useOfFunds && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Use of Funds:</span><span className="ent-modal-meta-value">{selected.useOfFunds}</span></div>)}
                      {selected.investmentTimeline && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Investment Timeline:</span><span className="ent-modal-meta-value">{selected.investmentTimeline}</span></div>)}
                      {selected.previousInvestors && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Previous Investors:</span><span className="ent-modal-meta-value">{selected.previousInvestors}</span></div>)}
                    </div>
                  </div>

                  <div className="ent-modal-section">
                    <h3>Legal & Compliance</h3>
                    <div className="ent-modal-meta">
                      {selected.regulatoryCompliance && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Regulatory:</span><span className="ent-modal-meta-value">{selected.regulatoryCompliance}</span></div>)}
                      {selected.dataPrivacyCompliance && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Data Privacy:</span><span className="ent-modal-meta-value">{selected.dataPrivacyCompliance}</span></div>)}
                    </div>
                    {selected.intellectualProperty && selected.intellectualProperty.length > 0 && (
                      <div className="ent-modal-tags" style={{ marginTop: 8 }}>
                        {selected.intellectualProperty.map((ip) => (<span key={ip} className="ent-modal-tag">{ip}</span>))}
                      </div>
                    )}
                  </div>

                  <div className="ent-modal-section">
                    <h3>Social Impact</h3>
                    {selected.socialMission && (<p className="ent-modal-description">Mission: {selected.socialMission}</p>)}
                    {selected.impactMetrics && (<p className="ent-modal-description">Impact Metrics: {selected.impactMetrics}</p>)}
                    {selected.sdgAlignment && selected.sdgAlignment.length > 0 && (
                      <div className="ent-modal-tags" style={{ marginTop: 8 }}>
                        {selected.sdgAlignment.map((s) => (<span key={s} className="ent-modal-tag">{s}</span>))}
                      </div>
                    )}
                    {selected.beneficiaries && (<p className="ent-modal-description">Beneficiaries: {selected.beneficiaries}</p>)}
                  </div>

                  <div className="ent-modal-section">
                    <h3>Additional Information</h3>
                    {selected.demoVideo && (<p className="ent-modal-description">Demo Video: {selected.demoVideo}</p>)}
                    {selected.pressCoverage && (<p className="ent-modal-description">Press: {selected.pressCoverage}</p>)}
                    {selected.awardsRecognition && (<p className="ent-modal-description">Awards: {selected.awardsRecognition}</p>)}
                    {selected.partnerships && (<p className="ent-modal-description">Partnerships: {selected.partnerships}</p>)}
                  </div>

                  <div className="ent-modal-section">
                    <h3>Contact Preferences</h3>
                    <div className="ent-modal-meta">
                      {selected.preferredContactMethod && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Preferred Method:</span><span className="ent-modal-meta-value">{selected.preferredContactMethod}</span></div>)}
                      {selected.bestTimeToContact && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Best Time:</span><span className="ent-modal-meta-value">{selected.bestTimeToContact}</span></div>)}
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

