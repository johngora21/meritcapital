"use client";
import React from 'react';

// Use same-origin API base to ensure cookies are sent with credentials
const API = '/api/v1';

type Startup = {
  id: string;
  name: string;
  project_title?: string;
  founder: string;
  description: string;
  location: string;
  stage: 'Idea' | 'MVP' | 'Early Stage' | 'Growth' | 'Scale' | 'Mature';
  industry: string;
  image: string;
  founded: string;
  employees: string;
  revenue: string;
  funding: string;
  headquarters_country: string;
  headquarters_city: string;
  tagline: string;
  tags: string[];
  linkedin?: string;
  website?: string;
  demoVideo?: string;
  seeking: string[];
  // Detailed fields to mirror projects modal
  founder_name?: string;
  founder_role?: string;
  founder_email?: string;
  founder_phone?: string;
  founder_linkedin?: string;
  legal_structure?: string;
  registration_number?: string;
  tax_id?: string;
  primary_market?: string;
  target_markets?: string[];
  operating_countries?: string[];
  problem_statement?: string;
  solution_description?: string;
  key_features?: string;
  target_customer?: string;
  value_proposition?: string;
  market_size?: string;
  competitive_advantage?: string;
  main_competitors?: string;
  market_penetration?: string;
  customer_acquisition_cost?: string;
  customer_lifetime_value?: string;
  monthly_active_users?: string;
  revenue_growth_rate?: string;
  key_performance_indicators?: string;
  funding_stage?: string;
  funding_raised?: string;
  monthly_burn_rate?: string;
  runway?: string;
  product_type?: string[];
  seeking_investment?: string;
  investment_amount_needed?: string;
  use_of_funds?: string;
  previous_investors?: string;
  investment_timeline?: string;
  intellectual_property?: string[];
  social_mission?: string;
  impact_metrics?: string;
  sdg_alignment?: string[];
  beneficiaries?: string;
  regulatory_compliance?: string;
  data_privacy_compliance?: string;
  preferred_contact_method?: string;
  best_time_to_contact?: string;
  demo_video?: string;
  press_coverage?: string;
  awards_recognition?: string;
  partnerships?: string;
  pitch_deck_name?: string;
  business_plan_name?: string;
  co_founders?: any[];
  team_members?: any[];
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

export default function StartupsPage() {
  const [query, setQuery] = React.useState("");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedStage, setSelectedStage] = React.useState("");
  const [selectedStartup, setSelectedStartup] = React.useState<Startup | null>(null);
  const [items, setItems] = React.useState<Startup[]>([]);
  const [userRole, setUserRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/projects/cards`, { credentials: 'include' });
        const data = await res.json().catch(() => ({}));
        const rows: any[] = data?.data || [];
        // Only approved/exposed projects: assume status === 'Active'
        const approved = rows.filter((p: any) => (p?.status || '').toLowerCase() === 'active');
        const mapped: Startup[] = approved.map((p: any) => ({
          id: String(p.id),
          name: p.name || '',
          project_title: p.project_title || undefined,
          founder: p.founder || '',
          description: p.description || '',
          location: p.location || '',
          stage: (p.stage || 'Idea') as Startup['stage'],
          industry: p.industry || '',
          image: p.image || p.imageUrl || '',
          founded: p.founded || '',
          employees: p.employees || '',
          revenue: p.revenue || '',
          funding: p.funding_stage || '',
          headquarters_country: p.headquarters_country || '',
          headquarters_city: p.headquarters_city || '',
          tagline: p.tagline || '',
          tags: Array.isArray(p.tags) ? p.tags : [],
          linkedin: p.linkedin,
          website: p.website,
          demoVideo: p.demo_video,
          demo_video: p.demo_video,
          seeking: Array.isArray(p.seeking) ? p.seeking : (p.seeking ? String(p.seeking).split(',').map((s: string) => s.trim()).filter(Boolean) : []),
          // Detailed fields
          founder_name: p.founder_name,
          founder_role: p.founder_role,
          founder_email: p.founder_email,
          founder_phone: p.founder_phone,
          founder_linkedin: p.founder_linkedin,
          legal_structure: p.legal_structure,
          registration_number: p.registration_number,
          tax_id: p.tax_id,
          primary_market: p.primary_market,
          target_markets: Array.isArray(p.target_markets) ? p.target_markets : (p.target_markets ? String(p.target_markets).split(',').map((s: string) => s.trim()).filter(Boolean) : []),
          operating_countries: Array.isArray(p.operating_countries) ? p.operating_countries : (p.operating_countries ? String(p.operating_countries).split(',').map((s: string) => s.trim()).filter(Boolean) : []),
          problem_statement: p.problem_statement,
          solution_description: p.solution_description,
          key_features: p.key_features,
          target_customer: p.target_customer,
          value_proposition: p.value_proposition,
          market_size: p.market_size,
          competitive_advantage: p.competitive_advantage,
          main_competitors: p.main_competitors,
          market_penetration: p.market_penetration,
          customer_acquisition_cost: p.customer_acquisition_cost,
          customer_lifetime_value: p.customer_lifetime_value,
          monthly_active_users: p.monthly_active_users,
          revenue_growth_rate: p.revenue_growth_rate,
          key_performance_indicators: p.key_performance_indicators,
          funding_stage: p.funding_stage,
          funding_raised: p.funding_raised,
          monthly_burn_rate: p.monthly_burn_rate,
          runway: p.runway,
          product_type: Array.isArray(p.product_type) ? p.product_type : (p.product_type ? String(p.product_type).split(',').map((s: string) => s.trim()).filter(Boolean) : []),
          seeking_investment: p.seeking_investment,
          investment_amount_needed: p.investment_amount_needed,
          use_of_funds: p.use_of_funds,
          previous_investors: p.previous_investors,
          investment_timeline: p.investment_timeline,
          intellectual_property: Array.isArray(p.intellectual_property) ? p.intellectual_property : (p.intellectual_property ? String(p.intellectual_property).split(',').map((s: string) => s.trim()).filter(Boolean) : []),
          social_mission: p.social_mission,
          impact_metrics: p.impact_metrics,
          sdg_alignment: Array.isArray(p.sdg_alignment) ? p.sdg_alignment : (p.sdg_alignment ? String(p.sdg_alignment).split(',').map((s: string) => s.trim()).filter(Boolean) : []),
          beneficiaries: p.beneficiaries,
          regulatory_compliance: p.regulatory_compliance,
          data_privacy_compliance: p.data_privacy_compliance,
          preferred_contact_method: p.preferred_contact_method,
          best_time_to_contact: p.best_time_to_contact,
          press_coverage: p.press_coverage,
          awards_recognition: p.awards_recognition,
          partnerships: p.partnerships,
          pitch_deck_name: p.pitch_deck_name,
          business_plan_name: p.business_plan_name,
          co_founders: p.co_founders || [],
          team_members: p.team_members || [],
        }));
        setItems(mapped);
      } catch {
        setItems([]);
      }
    };
    load();
  }, []);

  // Check user role
  React.useEffect(() => {
    const checkUserRole = async () => {
      try {
        const res = await fetch(`${API}/auth/me`, { credentials: 'include' });
        const user = await res.json();
        setUserRole(user?.data?.role || user?.role || null);
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    };
    checkUserRole();
  }, []);

  const filtered = items.filter((startup) => {
    const matchesQuery = startup.name.toLowerCase().includes(query.toLowerCase()) || 
                        startup.founder.toLowerCase().includes(query.toLowerCase()) ||
                        startup.description.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || startup.industry === selectedIndustry;
    const matchesStage = selectedStage === "" || startup.stage === selectedStage;
    return matchesQuery && matchesIndustry && matchesStage;
  });

  const openModal = (startup: Startup) => {
    setSelectedStartup(startup);
  };

  const closeModal = () => {
    setSelectedStartup(null);
  };

  const stageOptions = [
    "Idea",
    "MVP", 
    "Early Stage",
    "Growth",
    "Scale",
    "Mature"
  ];

  // Helper function to determine if user should see detailed modal
  const shouldShowDetailedModal = () => {
    return userRole && ['admin', 'investor', 'mentor'].includes(userRole);
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="ent-wrap">
      <div className="ent-head">
        <h2>Startups</h2>
        <p>Discover innovative startups and their ventures</p>
      </div>
      
      <div className="ent-toolbar">
        <div className="ent-filters">
          <input
            className="ent-search"
            placeholder="Search startups..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="ent-industry-filter"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <select
            className="ent-stage-filter"
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
          >
            <option value="">All Stages</option>
            {stageOptions.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ent-grid">
        {filtered.map((startup) => (
          <div key={startup.id} className="ent-card" onClick={() => openModal(startup)}>
            <div className="ent-card-header">
              <div className="ent-image">
                <img src={startup.image} alt={startup.name} />
              </div>
            </div>
            
            <div className="ent-card-body">
              <h3 className="ent-title">{startup.project_title || startup.name}</h3>
              <p className="ent-company-name" style={{ margin: '4px 0 12px 0', fontSize: '14px', color: '#6b7280' }}>{startup.name}</p>
              <p className="ent-founder">{startup.founder ? `Founded by ${startup.founder}` : ''}</p>
              <p className="ent-description">{startup.description}</p>
              
              <div className="ent-meta-simple">
                <div className="ent-meta-item">
                  <span className="ent-meta-label">Stage:</span>
                  <span className="ent-meta-value">{startup.stage}</span>
                </div>
                <div className="ent-meta-item">
                  <span className="ent-meta-label">Revenue:</span>
                  <span className="ent-meta-value">{startup.revenue}</span>
                </div>
                <div className="ent-meta-item">
                  <span className="ent-meta-label">Funding:</span>
                  <span className="ent-meta-value">{startup.funding}</span>
                </div>
              </div>


              <div className="ent-tags">
                {startup.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="ent-tag">{tag}</span>
                ))}
                {startup.tags.length > 3 && (
                  <span className="ent-tag">+{startup.tags.length - 3} more</span>
                )}
              </div>
            </div>

            <div className="ent-card-footer">
              <div className="ent-footer-left">
                <span className="ent-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {startup.headquarters_city ? `${startup.headquarters_city}, ${startup.headquarters_country}` : startup.headquarters_country}
                </span>
              </div>
              <div className="ent-footer-right">
                <button className="ent-connect-btn">Connect</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedStartup && (
        <div className="ent-modal-overlay" onClick={closeModal}>
          <div className="ent-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ent-modal-close" onClick={closeModal}>×</button>
            <div className="ent-modal-content" style={{ maxHeight: '95vh', overflowY: 'auto' }}>
              <div className="proj-modal-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px', paddingBottom: '20px', paddingTop: '20px', minHeight: '100px', maxHeight: '100px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, marginLeft: '20px' }}>
                  <img 
                    src={selectedStartup.image} 
                    alt={selectedStartup.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  </div>
                <div className="proj-modal-header-info" style={{ flex: 1 }}>
                  {selectedStartup.project_title && <h2 className="proj-modal-project-title" style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '600', color: '#111827' }}>{selectedStartup.project_title}</h2>}
                  {selectedStartup.tagline && <h3 className="proj-modal-tagline" style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '500', color: '#374151' }}>{selectedStartup.tagline}</h3>}
                  <p className="proj-modal-company-name" style={{ margin: '0', fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>{selectedStartup.name}</p>
                  {null}
                </div>
              </div>
              
              <div className="ent-modal-body">
                
                <div className="ent-modal-details">
                  {shouldShowDetailedModal() ? (
                    <>
                      <div className="ent-modal-section">
                        <h3>Project Details</h3>
                        <div className="ent-modal-meta">
                          <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Stage:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.stage}</span></div>
                          {selectedStartup.founded && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Founded:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.founded}</span></div>)}
                          {selectedStartup.employees && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Employees:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.employees}</span></div>)}
                          {selectedStartup.revenue && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Revenue:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.revenue}</span></div>)}
                          <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Industry:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.industry}</span></div>
                          {selectedStartup.funding && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Funding Stage:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.funding}</span></div>)}
                        </div>
                      </div>

                      {(selectedStartup.legal_structure || selectedStartup.registration_number || selectedStartup.tax_id) && (
                        <div className="ent-modal-section">
                          <h3>Legal & Business Structure</h3>
                          <div className="ent-modal-meta">
                            {selectedStartup.legal_structure && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Legal Structure:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.legal_structure}</span></div>)}
                            {selectedStartup.registration_number && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Registration Number:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.registration_number}</span></div>)}
                            {selectedStartup.tax_id && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Tax ID:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.tax_id}</span></div>)}
                          </div>
                        </div>
                      )}

                      {(selectedStartup.product_type || selectedStartup.intellectual_property) && (
                        <div className="ent-modal-section">
                          <h3>Product & IP</h3>
                          <div className="ent-modal-meta">
                            {selectedStartup.product_type && selectedStartup.product_type.length > 0 && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Product Type:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.product_type.join(', ')}</span></div>)}
                            {selectedStartup.intellectual_property && selectedStartup.intellectual_property.length > 0 && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Intellectual Property:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.intellectual_property.join(', ')}</span></div>)}
                          </div>
                        </div>
                      )}

                      {(selectedStartup.regulatory_compliance || selectedStartup.data_privacy_compliance) && (
                        <div className="ent-modal-section">
                          <h3>Compliance</h3>
                          <div className="ent-modal-meta">
                            {selectedStartup.regulatory_compliance && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Regulatory Compliance:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.regulatory_compliance}</span></div>)}
                            {selectedStartup.data_privacy_compliance && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Data Privacy Compliance:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.data_privacy_compliance}</span></div>)}
                          </div>
                        </div>
                      )}

                      {(selectedStartup.headquarters_country || selectedStartup.headquarters_city) && (
                        <div className="ent-modal-section">
                          <h3>Location</h3>
                          <div className="ent-modal-meta">
                            {selectedStartup.headquarters_city && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">City:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.headquarters_city}</span></div>)}
                            {selectedStartup.headquarters_country && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Country:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.headquarters_country}</span></div>)}
                          </div>
                        </div>
                      )}

                      {selectedStartup.founder_name && (
                        <div className="ent-modal-section">
                          <h3>Founder Information</h3>
                          <div className="ent-modal-meta">
                            <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Founder:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.founder_name}</span></div>
                            {selectedStartup.founder_role && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Role:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.founder_role}</span></div>)}
                            {selectedStartup.founder_email && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Email:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.founder_email}</span></div>)}
                          </div>
                        </div>
                      )}

                      {((selectedStartup.co_founders && selectedStartup.co_founders.length > 0) || (selectedStartup.team_members && selectedStartup.team_members.length > 0)) && (
                        <div className="ent-modal-section">
                          <h3>Team Information</h3>
                          {selectedStartup.co_founders && selectedStartup.co_founders.length > 0 && (
                            <div style={{ marginBottom: '16px' }}>
                              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Co-founders</h4>
                              {selectedStartup.co_founders.map((coFounder: any, index: number) => (
                                <div key={index} className="ent-modal-meta" style={{ marginBottom: '8px' }}>
                                  <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Name:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{coFounder.name}</span></div>
                                  <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Role:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{coFounder.role}</span></div>
                                  {coFounder.email && <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Email:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{coFounder.email}</span></div>}
                                  {coFounder.phone && <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Phone:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{coFounder.phone}</span></div>}
                                </div>
                              ))}
                            </div>
                          )}
                          {selectedStartup.team_members && selectedStartup.team_members.length > 0 && (
                            <div>
                              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Other Team Members</h4>
                              {selectedStartup.team_members.map((member: any, index: number) => (
                                <div key={index} className="ent-modal-meta" style={{ marginBottom: '8px' }}>
                                  <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Name:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{member.name}</span></div>
                                  <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Role:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{member.role}</span></div>
                                  {member.email && <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Email:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{member.email}</span></div>}
                                  {member.phone && <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Phone:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{member.phone}</span></div>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {selectedStartup.preferred_contact_method && (
                        <div className="ent-modal-section">
                          <h3>Contact</h3>
                          <div className="ent-modal-meta">
                            <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Contact:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.preferred_contact_method}</span></div>
                          </div>
                        </div>
                      )}

                      <div className="ent-modal-section">
                        <h3>Description</h3>
                        <p className="ent-modal-text" style={{ fontSize: '13px' }}>{selectedStartup.description}</p>
                      </div>

                      {selectedStartup.problem_statement && (
                        <div className="ent-modal-section">
                          <h3>Problem Statement</h3>
                          <p className="ent-modal-text" style={{ fontSize: '13px' }}>{selectedStartup.problem_statement}</p>
                        </div>
                      )}

                      {selectedStartup.solution_description && (
                        <div className="ent-modal-section">
                          <h3>Solution</h3>
                          <p className="ent-modal-text" style={{ fontSize: '13px' }}>{selectedStartup.solution_description}</p>
                        </div>
                      )}

                      {selectedStartup.key_features && (
                        <div className="ent-modal-section">
                          <h3>Key Features</h3>
                          <p className="ent-modal-text" style={{ fontSize: '13px' }}>{selectedStartup.key_features}</p>
                        </div>
                      )}

                      {(selectedStartup.primary_market || (selectedStartup.target_markets && selectedStartup.target_markets.length > 0) || selectedStartup.market_size || selectedStartup.main_competitors || selectedStartup.market_penetration) && (
                        <div className="ent-modal-section">
                          <h3>Market Analysis</h3>
                          <div className="ent-modal-meta">
                            {selectedStartup.primary_market && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Primary Market:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.primary_market}</span></div>)}
                            {selectedStartup.target_markets && selectedStartup.target_markets.length > 0 && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Target Markets:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.target_markets.join(', ')}</span></div>)}
                            {selectedStartup.market_size && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Market Size:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.market_size}</span></div>)}
                            {selectedStartup.main_competitors && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Main Competitors:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.main_competitors}</span></div>)}
                            {selectedStartup.market_penetration && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Market Penetration:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.market_penetration}</span></div>)}
                          </div>
                        </div>
                      )}

                      {(selectedStartup.customer_acquisition_cost || selectedStartup.customer_lifetime_value || selectedStartup.monthly_active_users || selectedStartup.revenue_growth_rate) && (
                        <div className="ent-modal-section">
                          <h3>Business Metrics</h3>
                          <div className="ent-modal-meta">
                            {selectedStartup.customer_acquisition_cost && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Customer Acquisition Cost:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.customer_acquisition_cost}</span></div>)}
                            {selectedStartup.customer_lifetime_value && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Customer Lifetime Value:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.customer_lifetime_value}</span></div>)}
                            {selectedStartup.monthly_active_users && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Monthly Active Users:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.monthly_active_users}</span></div>)}
                            {selectedStartup.revenue_growth_rate && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Revenue Growth Rate:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.revenue_growth_rate}</span></div>)}
                          </div>
                        </div>
                      )}

                      {selectedStartup.key_performance_indicators && (
                        <div className="ent-modal-section">
                          <h3>Key Performance Indicators</h3>
                          <p className="ent-modal-text" style={{ fontSize: '13px' }}>{selectedStartup.key_performance_indicators}</p>
                        </div>
                      )}

                      {selectedStartup.value_proposition && (
                        <div className="ent-modal-section">
                          <h3>Value Proposition</h3>
                          <p className="ent-modal-text" style={{ fontSize: '13px' }}>{selectedStartup.value_proposition}</p>
                        </div>
                      )}

                      {(selectedStartup.investment_amount_needed || selectedStartup.seeking_investment || selectedStartup.previous_investors || selectedStartup.investment_timeline) && (
                        <div className="ent-modal-section">
                          <h3>Investment Information</h3>
                          <div className="ent-modal-meta">
                            {selectedStartup.seeking_investment && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Seeking Investment:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.seeking_investment}</span></div>)}
                            {selectedStartup.investment_amount_needed && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Amount Needed:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.investment_amount_needed}</span></div>)}
                            {selectedStartup.use_of_funds && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Use of Funds:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.use_of_funds}</span></div>)}
                            {selectedStartup.previous_investors && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Previous Investors:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.previous_investors}</span></div>)}
                            {selectedStartup.investment_timeline && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Investment Timeline:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.investment_timeline}</span></div>)}
                          </div>
                        </div>
                      )}

                      {(selectedStartup.monthly_burn_rate || selectedStartup.runway) && (
                        <div className="ent-modal-section">
                          <h3>Financial Metrics</h3>
                          <div className="ent-modal-meta">
                            {selectedStartup.monthly_burn_rate && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Monthly Burn Rate:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.monthly_burn_rate}</span></div>)}
                            {selectedStartup.runway && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Runway:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.runway}</span></div>)}
                          </div>
                        </div>
                      )}

                      <div className="ent-modal-section">
                        <h3>Currently Seeking</h3>
                        <div className="ent-modal-seeking">
                          {selectedStartup.seeking.map((item) => (<span key={item} className="proj-tag">{item}</span>))}
                        </div>
                      </div>

                      {selectedStartup.social_mission && (
                        <div className="ent-modal-section">
                          <h3>Social Mission</h3>
                          <p className="ent-modal-text" style={{ fontSize: '13px' }}>{selectedStartup.social_mission}</p>
                        </div>
                      )}

                      {(selectedStartup.sdg_alignment || selectedStartup.beneficiaries) && (
                        <div className="ent-modal-section">
                          <h3>Impact & SDGs</h3>
                          <div className="ent-modal-meta">
                            {selectedStartup.sdg_alignment && selectedStartup.sdg_alignment.length > 0 && (
                              <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">SDG Alignment:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.sdg_alignment.join(', ')}</span></div>
                            )}
                            {selectedStartup.beneficiaries && (
                              <div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Beneficiaries:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.beneficiaries}</span></div>
                            )}
                          </div>
                        </div>
                      )}

                      {(selectedStartup.demo_video || selectedStartup.website || selectedStartup.press_coverage || selectedStartup.awards_recognition || selectedStartup.partnerships || selectedStartup.pitch_deck_name || selectedStartup.business_plan_name) && (
                        <div className="ent-modal-section">
                          <h3>Additional Information</h3>
                          <div className="ent-modal-meta">
                            {selectedStartup.demo_video && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Demo Video:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.demo_video}</span></div>)}
                            {selectedStartup.press_coverage && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Press Coverage:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.press_coverage}</span></div>)}
                            {selectedStartup.awards_recognition && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Awards & Recognition:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.awards_recognition}</span></div>)}
                            {selectedStartup.partnerships && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Partnerships:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.partnerships}</span></div>)}
                            {selectedStartup.pitch_deck_name && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Pitch Deck:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.pitch_deck_name}</span></div>)}
                            {selectedStartup.business_plan_name && (<div className="ent-modal-meta-item"><span className="ent-modal-meta-label">Business Plan:</span><span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.business_plan_name}</span></div>)}
                          </div>
                        </div>
                      )}

                      {(selectedStartup.website || selectedStartup.demoVideo || selectedStartup.demo_video) && (
                        <div className="ent-modal-section">
                          <h3>Actions</h3>
                          <div className="ent-modal-meta">
                            <div className="ent-modal-meta-item">
                              <div className="ent-modal-links">
                                {selectedStartup.website && (
                                  <a className="ent-modal-link ent-contact-btn" href={selectedStartup.website} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px' }}>Website</a>
                                )}
                                {(selectedStartup.demoVideo || selectedStartup.demo_video) && (
                                  <a className="ent-modal-link ent-partner-btn" href={selectedStartup.demoVideo || selectedStartup.demo_video} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px' }}>Demo</a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    // Simple modal for entrepreneurs
                    <>
                      <div className="ent-modal-section">
                        <h3>Company Profile</h3>
                        <div className="ent-modal-meta">
                          <div className="ent-modal-meta-item">
                            <span className="ent-modal-meta-label">Stage:</span>
                            <span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.stage}</span>
                          </div>
                          {selectedStartup.founded && (
                          <div className="ent-modal-meta-item">
                            <span className="ent-modal-meta-label">Founded:</span>
                            <span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.founded}</span>
                          </div>
                          )}
                          {selectedStartup.employees && (
                          <div className="ent-modal-meta-item">
                            <span className="ent-modal-meta-label">Employees:</span>
                            <span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.employees}</span>
                          </div>
                          )}
                          {selectedStartup.revenue && (
                          <div className="ent-modal-meta-item">
                            <span className="ent-modal-meta-label">Revenue:</span>
                            <span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.revenue}</span>
                          </div>
                          )}
                          {selectedStartup.location && (
                          <div className="ent-modal-meta-item">
                            <span className="ent-modal-meta-label">Location:</span>
                            <span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.location}</span>
                          </div>
                          )}
                          <div className="ent-modal-meta-item">
                            <span className="ent-modal-meta-label">Industry:</span>
                            <span className="ent-modal-meta-value" style={{ fontSize: '13px' }}>{selectedStartup.industry}</span>
                          </div>
                        </div>
                      </div>

                      {selectedStartup.tags?.length > 0 && (
                      <div className="ent-modal-section">
                        <h3>Focus Areas</h3>
                        <div className="ent-modal-tags">
                          {selectedStartup.tags.map((tag) => (
                            <span key={tag} className="ent-modal-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                      )}

                      {selectedStartup.seeking?.length > 0 && (
                      <div className="ent-modal-section">
                        <h3>Currently Seeking</h3>
                        <div className="ent-modal-seeking">
                          {selectedStartup.seeking.map((item) => (
                            <span key={item} className="proj-tag">{item}</span>
                          ))}
                        </div>
                      </div>
                      )}

                      {selectedStartup.description && (
                      <div className="ent-modal-section">
                          <h3>Description</h3>
                          <p className="ent-modal-description" style={{ fontSize: '13px' }}>{selectedStartup.description}</p>
                        </div>
                      )}

                      {/* Actions - always last */}
                      <div className="ent-modal-section" style={{ marginTop: '24px' }}>
                          <h3>Actions</h3>
                          <div className="ent-modal-links">
                          {selectedStartup.website && (
                            <a
                              className="ent-modal-link ent-contact-btn"
                              href={selectedStartup.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ padding: '6px 12px' }}
                            >
                              Website
                            </a>
                          )}
                          {selectedStartup.demoVideo && (
                            <a
                              className="ent-modal-link ent-partner-btn"
                              href={selectedStartup.demoVideo}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ padding: '6px 12px' }}
                            >
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


