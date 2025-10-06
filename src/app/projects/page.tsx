"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

type Project = {
  id: string;
  name: string;
  description: string;
  stage: 'Idea' | 'MVP' | 'Early Stage' | 'Growth' | 'Scale' | 'Mature';
  industry: string;
  image: string;
  founded: string;
  employees: string;
  revenue: string;
  tags: string[];
  website?: string;
  linkedin?: string;
  seeking: string[];
  status: 'Pending' | 'Approved' | 'Rejected';
  lastUpdated: string;
  
  // Additional comprehensive fields
  tagline?: string;
  founder_name?: string;
  founder_role?: string;
  founder_email?: string;
  founder_phone?: string;
  founder_linkedin?: string;
  headquarters_country?: string;
  headquarters_city?: string;
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

const API = 'http://localhost:4000/api/v1';

function useProjects(): Project[] {
  const [items, setItems] = React.useState<Project[]>([]);
  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
        const res = await fetch(`${API}/projects/cards`, { 
          credentials: 'include',
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const json = await res.json().catch(() => ({}));
        setItems((json?.data || []) as Project[]);
      } catch (error) {
        console.error('Error loading projects:', error);
        setItems([]);
      }
    };
    loadProjects();
  }, []);
  return items;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const projects = useProjects();
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedStage, setSelectedStage] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const filtered = projects.filter((project) => {
    const matchesQuery = project.name.toLowerCase().includes(query.toLowerCase()) || 
                        project.description.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || project.industry === selectedIndustry;
    const matchesStage = selectedStage === "" || project.stage === selectedStage;
    const matchesStatus = selectedStatus === "" || project.status === selectedStatus;
    return matchesQuery && matchesIndustry && matchesStage && matchesStatus;
  });

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const openAddModal = () => {
    router.push('/projects/add');
  };

  // Check if user is admin
  React.useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
        console.log('Token:', token ? 'exists' : 'missing');
        if (token) {
          const res = await fetch(`${API}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const user = await res.json();
          console.log('User data:', user);
          console.log('User role:', user?.role);
          const adminStatus = user?.role === 'admin';
          console.log('Is admin:', adminStatus);
          setIsAdmin(adminStatus);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };
    checkAdmin();
  }, []);

  const handleEditProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation(); // Prevent opening modal
    console.log('Edit button clicked for project:', project.name);
    router.push(`/projects/add?id=${project.id}&edit=true`);
  };

  const handleDeleteProject = async (e: React.MouseEvent, project: Project) => {
    e.stopPropagation(); // Prevent opening modal
    
    if (!confirm(`Are you sure you want to delete "${project.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
      const response = await fetch(`${API}/projects/${project.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      // Refresh the page to show updated list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const stageOptions = [
    "Idea",
    "MVP", 
    "Early Stage",
    "Growth",
    "Scale",
    "Mature"
  ];

  const statusOptions = [
    "Pending",
    "Approved",
    "Rejected"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Rejected': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="proj-wrap">
      <div className="proj-head">
        <div className="proj-head-content">
          <h2>My Projects</h2>
          <p>Manage your startup projects and track their progress</p>
        </div>
        <button className="proj-add-btn" onClick={openAddModal}>
          <span>+</span>
          Add Project
        </button>
      </div>
      
      <div className="proj-toolbar">
        <div className="proj-filters">
          <input
            className="proj-search"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="proj-industry-filter"
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
            className="proj-stage-filter"
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
          <select
            className="proj-status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="proj-grid">
        {filtered.map((project) => (
          <div key={project.id} className="proj-card" onClick={() => openModal(project)}>
            <div className="proj-card-header">
              <div className="proj-image">
                <img src={project.image} alt={project.name} />
                <div className="proj-industry-overlay">{project.industry}</div>
                <div className="proj-status-badge" style={{ backgroundColor: getStatusColor(project.status) }}>
                  {project.status}
                </div>
              </div>
            </div>
            
            <div className="proj-card-body">
              <h3 className="proj-title">{project.name}</h3>
              {project.tagline && <p className="proj-tagline">{project.tagline}</p>}
              <p className="proj-description">{project.description}</p>
              
              <div className="proj-meta-simple">
                <div className="proj-meta-item">
                  <span className="proj-meta-label">Stage:</span>
                  <span className="proj-meta-value">{project.stage}</span>
                </div>
                <div className="proj-meta-item">
                  <span className="proj-meta-label">Revenue:</span>
                  <span className="proj-meta-value">{project.revenue}</span>
                </div>
                {project.funding_stage && (
                  <div className="proj-meta-item">
                    <span className="proj-meta-label">Funding:</span>
                    <span className="proj-meta-value">{project.funding_stage}</span>
                  </div>
                )}
              </div>

              <div className="proj-tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="proj-tag">{tag}</span>
                ))}
                {project.tags.length > 3 && (
                  <span className="proj-tag">+{project.tags.length - 3} more</span>
                )}
              </div>
            </div>

            <div className="proj-card-footer">
              <div className="proj-footer-left">
                <span className="proj-last-updated">Updated: {formatDate(project.lastUpdated)}</span>
              </div>
              <div className="proj-footer-right" style={{ display: 'flex', gap: '8px' }}>
                {(isAdmin || true) && (
                  <>
                    <button 
                      onClick={(e) => handleEditProject(e, project)}
                      title="Edit Project"
                      style={{
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#10b981'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => handleDeleteProject(e, project)}
                      title="Delete Project"
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#c82333'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="proj-modal-overlay" onClick={closeModal}>
          <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
            <button className="proj-modal-close" onClick={closeModal}>×</button>
            <div className="proj-modal-content">
              <div className="proj-modal-header">
                <div className="proj-modal-image">
                  <img src={selectedProject.image} alt={selectedProject.name} />
                  <div className="proj-modal-industry-overlay">{selectedProject.industry}</div>
                  <div className="proj-modal-status-badge" style={{ backgroundColor: getStatusColor(selectedProject.status) }}>
                    {selectedProject.status}
                  </div>
                </div>
              </div>
              
              <div className="proj-modal-body">
                <div className="proj-modal-header-info">
                  <h2 className="proj-modal-title">{selectedProject.name}</h2>
                  {selectedProject.tagline && <p className="proj-modal-tagline">{selectedProject.tagline}</p>}
                </div>
                
                <div className="proj-modal-details">
                  <div className="proj-modal-section">
                    <h3>Project Details</h3>
                    <div className="proj-modal-meta">
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Stage:</span>
                        <span className="proj-modal-meta-value">{selectedProject.stage}</span>
                      </div>
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Founded:</span>
                        <span className="proj-modal-meta-value">{selectedProject.founded}</span>
                      </div>
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Employees:</span>
                        <span className="proj-modal-meta-value">{selectedProject.employees}</span>
                      </div>
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Revenue:</span>
                        <span className="proj-modal-meta-value">{selectedProject.revenue}</span>
                      </div>
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Industry:</span>
                        <span className="proj-modal-meta-value">{selectedProject.industry}</span>
                      </div>
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Last Updated:</span>
                        <span className="proj-modal-meta-value">{formatDate(selectedProject.lastUpdated)}</span>
                      </div>
                      {selectedProject.funding_stage && (
                        <div className="proj-modal-meta-item">
                          <span className="proj-modal-meta-label">Funding Stage:</span>
                          <span className="proj-modal-meta-value">{selectedProject.funding_stage}</span>
                        </div>
                      )}
                      {selectedProject.funding_raised && (
                        <div className="proj-modal-meta-item">
                          <span className="proj-modal-meta-label">Funding Raised:</span>
                          <span className="proj-modal-meta-value">{selectedProject.funding_raised}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedProject.founder_name && (
                    <div className="proj-modal-section">
                      <h3>Founder Information</h3>
                      <div className="proj-modal-meta">
                        <div className="proj-modal-meta-item">
                          <span className="proj-modal-meta-label">Founder:</span>
                          <span className="proj-modal-meta-value">{selectedProject.founder_name}</span>
                        </div>
                        {selectedProject.founder_role && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Role:</span>
                            <span className="proj-modal-meta-value">{selectedProject.founder_role}</span>
                          </div>
                        )}
                        {selectedProject.founder_email && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Email:</span>
                            <span className="proj-modal-meta-value">{selectedProject.founder_email}</span>
                          </div>
                        )}
                        {selectedProject.founder_linkedin && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">LinkedIn:</span>
                            <span className="proj-modal-meta-value">{selectedProject.founder_linkedin}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(selectedProject.legal_structure || selectedProject.registration_number || selectedProject.tax_id) && (
                    <div className="proj-modal-section">
                      <h3>Legal & Business Structure</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.legal_structure && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Legal Structure:</span>
                            <span className="proj-modal-meta-value">{selectedProject.legal_structure}</span>
                          </div>
                        )}
                        {selectedProject.registration_number && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Registration Number:</span>
                            <span className="proj-modal-meta-value">{selectedProject.registration_number}</span>
                          </div>
                        )}
                        {selectedProject.tax_id && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Tax ID:</span>
                            <span className="proj-modal-meta-value">{selectedProject.tax_id}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(selectedProject.headquarters_country || selectedProject.headquarters_city) && (
                    <div className="proj-modal-section">
                      <h3>Location</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.headquarters_city && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">City:</span>
                            <span className="proj-modal-meta-value">{selectedProject.headquarters_city}</span>
                          </div>
                        )}
                        {selectedProject.headquarters_country && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Country:</span>
                            <span className="proj-modal-meta-value">{selectedProject.headquarters_country}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(selectedProject.primary_market || selectedProject.target_markets || selectedProject.operating_countries) && (
                    <div className="proj-modal-section">
                      <h3>Market Information</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.primary_market && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Primary Market:</span>
                            <span className="proj-modal-meta-value">{selectedProject.primary_market}</span>
                          </div>
                        )}
                        {selectedProject.target_markets && selectedProject.target_markets.length > 0 && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Target Markets:</span>
                            <span className="proj-modal-meta-value">{selectedProject.target_markets.join(', ')}</span>
                          </div>
                        )}
                        {selectedProject.operating_countries && selectedProject.operating_countries.length > 0 && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Operating Countries:</span>
                            <span className="proj-modal-meta-value">{selectedProject.operating_countries.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="proj-modal-section">
                    <h3>Description</h3>
                    <p className="proj-modal-text">{selectedProject.description}</p>
                  </div>

                  {selectedProject.problem_statement && (
                    <div className="proj-modal-section">
                      <h3>Problem Statement</h3>
                      <p className="proj-modal-text">{selectedProject.problem_statement}</p>
                    </div>
                  )}

                  {selectedProject.solution_description && (
                    <div className="proj-modal-section">
                      <h3>Solution</h3>
                      <p className="proj-modal-text">{selectedProject.solution_description}</p>
                    </div>
                  )}

                  {selectedProject.key_features && (
                    <div className="proj-modal-section">
                      <h3>Key Features</h3>
                      <p className="proj-modal-text">{selectedProject.key_features}</p>
                    </div>
                  )}

                  {(selectedProject.market_size || selectedProject.main_competitors || selectedProject.market_penetration) && (
                    <div className="proj-modal-section">
                      <h3>Market Analysis</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.market_size && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Market Size:</span>
                            <span className="proj-modal-meta-value">{selectedProject.market_size}</span>
                          </div>
                        )}
                        {selectedProject.main_competitors && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Main Competitors:</span>
                            <span className="proj-modal-meta-value">{selectedProject.main_competitors}</span>
                          </div>
                        )}
                        {selectedProject.market_penetration && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Market Penetration:</span>
                            <span className="proj-modal-meta-value">{selectedProject.market_penetration}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(selectedProject.customer_acquisition_cost || selectedProject.customer_lifetime_value || selectedProject.monthly_active_users) && (
                    <div className="proj-modal-section">
                      <h3>Business Metrics</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.customer_acquisition_cost && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Customer Acquisition Cost:</span>
                            <span className="proj-modal-meta-value">{selectedProject.customer_acquisition_cost}</span>
                          </div>
                        )}
                        {selectedProject.customer_lifetime_value && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Customer Lifetime Value:</span>
                            <span className="proj-modal-meta-value">{selectedProject.customer_lifetime_value}</span>
                          </div>
                        )}
                        {selectedProject.monthly_active_users && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Monthly Active Users:</span>
                            <span className="proj-modal-meta-value">{selectedProject.monthly_active_users}</span>
                          </div>
                        )}
                        {selectedProject.revenue_growth_rate && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Revenue Growth Rate:</span>
                            <span className="proj-modal-meta-value">{selectedProject.revenue_growth_rate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedProject.key_performance_indicators && (
                    <div className="proj-modal-section">
                      <h3>Key Performance Indicators</h3>
                      <p className="proj-modal-text">{selectedProject.key_performance_indicators}</p>
                    </div>
                  )}

                  {selectedProject.value_proposition && (
                    <div className="proj-modal-section">
                      <h3>Value Proposition</h3>
                      <p className="proj-modal-text">{selectedProject.value_proposition}</p>
                    </div>
                  )}

                  {selectedProject.social_mission && (
                    <div className="proj-modal-section">
                      <h3>Social Mission</h3>
                      <p className="proj-modal-text">{selectedProject.social_mission}</p>
                    </div>
                  )}

                  {(selectedProject.investment_amount_needed || selectedProject.seeking_investment || selectedProject.previous_investors || selectedProject.investment_timeline) && (
                    <div className="proj-modal-section">
                      <h3>Investment Information</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.seeking_investment && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Seeking Investment:</span>
                            <span className="proj-modal-meta-value">{selectedProject.seeking_investment}</span>
                          </div>
                        )}
                        {selectedProject.investment_amount_needed && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Amount Needed:</span>
                            <span className="proj-modal-meta-value">{selectedProject.investment_amount_needed}</span>
                          </div>
                        )}
                        {selectedProject.use_of_funds && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Use of Funds:</span>
                            <span className="proj-modal-meta-value">{selectedProject.use_of_funds}</span>
                          </div>
                        )}
                        {selectedProject.previous_investors && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Previous Investors:</span>
                            <span className="proj-modal-meta-value">{selectedProject.previous_investors}</span>
                          </div>
                        )}
                        {selectedProject.investment_timeline && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Investment Timeline:</span>
                            <span className="proj-modal-meta-value">{selectedProject.investment_timeline}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(selectedProject.monthly_burn_rate || selectedProject.runway) && (
                    <div className="proj-modal-section">
                      <h3>Financial Metrics</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.monthly_burn_rate && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Monthly Burn Rate:</span>
                            <span className="proj-modal-meta-value">{selectedProject.monthly_burn_rate}</span>
                          </div>
                        )}
                        {selectedProject.runway && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Runway:</span>
                            <span className="proj-modal-meta-value">{selectedProject.runway}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(selectedProject.product_type || selectedProject.intellectual_property) && (
                    <div className="proj-modal-section">
                      <h3>Product & IP</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.product_type && selectedProject.product_type.length > 0 && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Product Type:</span>
                            <span className="proj-modal-meta-value">{selectedProject.product_type.join(', ')}</span>
                          </div>
                        )}
                        {selectedProject.intellectual_property && selectedProject.intellectual_property.length > 0 && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Intellectual Property:</span>
                            <span className="proj-modal-meta-value">{selectedProject.intellectual_property.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="proj-modal-section">
                    <h3>Focus Areas</h3>
                    <div className="proj-modal-tags">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="proj-modal-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="proj-modal-section">
                    <h3>Currently Seeking</h3>
                    <div className="proj-modal-seeking">
                      {selectedProject.seeking.map((item) => (
                        <span key={item} className="proj-modal-seeking-item">{item}</span>
                      ))}
                    </div>
                  </div>

                  {(selectedProject.sdg_alignment || selectedProject.beneficiaries) && (
                    <div className="proj-modal-section">
                      <h3>Impact & SDGs</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.sdg_alignment && selectedProject.sdg_alignment.length > 0 && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">SDG Alignment:</span>
                            <span className="proj-modal-meta-value">{selectedProject.sdg_alignment.join(', ')}</span>
                          </div>
                        )}
                        {selectedProject.beneficiaries && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Beneficiaries:</span>
                            <span className="proj-modal-meta-value">{selectedProject.beneficiaries}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(selectedProject.regulatory_compliance || selectedProject.data_privacy_compliance) && (
                    <div className="proj-modal-section">
                      <h3>Compliance</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.regulatory_compliance && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Regulatory Compliance:</span>
                            <span className="proj-modal-meta-value">{selectedProject.regulatory_compliance}</span>
                          </div>
                        )}
                        {selectedProject.data_privacy_compliance && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Data Privacy Compliance:</span>
                            <span className="proj-modal-meta-value">{selectedProject.data_privacy_compliance}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(selectedProject.demo_video || selectedProject.press_coverage || selectedProject.awards_recognition || selectedProject.partnerships) && (
                    <div className="proj-modal-section">
                      <h3>Additional Information</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.demo_video && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Demo Video:</span>
                            <span className="proj-modal-meta-value">{selectedProject.demo_video}</span>
                          </div>
                        )}
                        {selectedProject.press_coverage && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Press Coverage:</span>
                            <span className="proj-modal-meta-value">{selectedProject.press_coverage}</span>
                          </div>
                        )}
                        {selectedProject.awards_recognition && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Awards & Recognition:</span>
                            <span className="proj-modal-meta-value">{selectedProject.awards_recognition}</span>
                          </div>
                        )}
                        {selectedProject.partnerships && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Partnerships:</span>
                            <span className="proj-modal-meta-value">{selectedProject.partnerships}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(selectedProject.preferred_contact_method || selectedProject.best_time_to_contact) && (
                    <div className="proj-modal-section">
                      <h3>Contact Preferences</h3>
                      <div className="proj-modal-meta">
                        {selectedProject.preferred_contact_method && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Preferred Contact Method:</span>
                            <span className="proj-modal-meta-value">{selectedProject.preferred_contact_method}</span>
                          </div>
                        )}
                        {selectedProject.best_time_to_contact && (
                          <div className="proj-modal-meta-item">
                            <span className="proj-modal-meta-label">Best Time to Contact:</span>
                            <span className="proj-modal-meta-value">{selectedProject.best_time_to_contact}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="proj-modal-section">
                    <h3>Actions</h3>
                    <div className="proj-modal-links">
                      <button className="proj-modal-link proj-edit-btn-modal">Edit Project</button>
                      <button className="proj-modal-link proj-delete-btn">Delete</button>
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
