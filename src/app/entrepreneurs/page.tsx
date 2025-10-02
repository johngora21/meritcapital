"use client";
import React from 'react';

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';

type Startup = {
  id: string;
  name: string;
  founder: string;
  description: string;
  location: string;
  stage: 'Idea' | 'MVP' | 'Early Stage' | 'Growth' | 'Scale' | 'Mature';
  industry: string;
  image: string;
  founded: string;
  employees: string;
  revenue: string;
  tags: string[];
  linkedin?: string;
  website?: string;
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
        const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || '') : '';
        const res = await fetch(`${API}/projects/cards`, { headers: token ? { Authorization: `Bearer ${token}` } : undefined, credentials: 'include' });
        const data = await res.json().catch(() => ({}));
        const rows: any[] = data?.data || [];
        // Only approved/exposed projects: assume status === 'Active'
        const approved = rows.filter((p: any) => (p?.status || '').toLowerCase() === 'active');
        const mapped: Startup[] = approved.map((p: any) => ({
          id: String(p.id),
          name: p.name || '',
          founder: p.founder || '',
          description: p.description || '',
          location: p.location || '',
          stage: (p.stage || 'Idea') as Startup['stage'],
          industry: p.industry || '',
          image: p.image || p.imageUrl || '',
          founded: p.founded || '',
          employees: p.employees || '',
          revenue: p.revenue || '',
          tags: Array.isArray(p.tags) ? p.tags : [],
          linkedin: p.linkedin,
          website: p.website,
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
                <div className="ent-industry-overlay">{startup.industry}</div>
              </div>
            </div>
            
            <div className="ent-card-body">
              <h3 className="ent-title">{startup.name}</h3>
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
                <span className="ent-location">{startup.location}</span>
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
            <div className="ent-modal-content">
              <div className="ent-modal-header">
                <div className="ent-modal-image">
                  <img src={selectedStartup.image} alt={selectedStartup.name} />
                </div>
              </div>
              
              <div className="ent-modal-body">
                <div className="ent-modal-header-info">
                  <h2 className="ent-modal-title">{selectedStartup.name}</h2>
                  {selectedStartup.founder && (
                    <p className="ent-modal-founder">Founded by {selectedStartup.founder}</p>
                  )}
                </div>
                
                <p className="ent-modal-description">{selectedStartup.description}</p>
                
                <div className="ent-modal-details">
                  <div className="ent-modal-section">
                    <h3>Company Profile</h3>
                    <div className="ent-modal-meta">
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Stage:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.stage}</span>
                      </div>
                      {selectedStartup.founded && (
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Founded:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.founded}</span>
                      </div>
                      )}
                      {selectedStartup.employees && (
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Employees:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.employees}</span>
                      </div>
                      )}
                      {selectedStartup.revenue && (
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Revenue:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.revenue}</span>
                      </div>
                      )}
                      {selectedStartup.location && (
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Location:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.location}</span>
                      </div>
                      )}
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Industry:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.industry}</span>
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
                        <span key={item} className="ent-modal-seeking-item">{item}</span>
                      ))}
                    </div>
                  </div>
                  )}

                  <div className="ent-modal-section">
                    <h3>Actions</h3>
                    <div className="ent-modal-links">
                      <button className="ent-modal-link ent-contact-btn">Contact</button>
                      <button className="ent-modal-link ent-partner-btn">Partner</button>
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


