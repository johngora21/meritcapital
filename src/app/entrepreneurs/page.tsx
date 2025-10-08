"use client";
import React from 'react';

// Ensure API base always includes /api/v1
const RAW_API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
const API = RAW_API_BASE.includes('/api/') ? RAW_API_BASE : `${RAW_API_BASE.replace(/\/$/, '')}/api/v1`;

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
          seeking: Array.isArray(p.seeking) ? p.seeking : (p.seeking ? String(p.seeking).split(',').map((s: string) => s.trim()).filter(Boolean) : []),
        }));
        setItems(mapped);
      } catch {
        setItems([]);
      }
    };
    load();
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
              <div className="proj-modal-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px', paddingBottom: '20px', paddingTop: '16px', maxHeight: '100px', borderBottom: '1px solid #e5e7eb' }}>
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

                  {null}
                </div>

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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


