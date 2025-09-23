"use client";
import React from 'react';

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

const startups: Startup[] = [
  {
    id: "1",
    name: "AgriTech Solutions",
    founder: "Grace Mwangi",
    description: "Founder of AgriTech Solutions, revolutionizing smallholder farming through mobile technology and data analytics. Helping farmers increase yields by 40% through smart irrigation and crop monitoring.",
    location: "Nairobi, Kenya",
    stage: "Growth",
    industry: "Agriculture",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80&auto=format&fit=crop",
    founded: "2020",
    employees: "15-20",
    revenue: "$500K+",
    tags: ["AgriTech", "Mobile Technology", "Data Analytics", "Smallholder Farming"],
    linkedin: "grace-mwangi",
    website: "agritechsolutions.ke",
    seeking: ["Series A Funding", "Strategic Partnerships", "Market Expansion"]
  },
  {
    id: "2",
    name: "FinFlow",
    founder: "James Ochieng",
    description: "CEO of FinFlow, a fintech startup providing digital payment solutions for SMEs across East Africa. Processed over $10M in transactions with 50,000+ active merchants.",
    location: "Lagos, Nigeria",
    stage: "Scale",
    industry: "Finance",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    founded: "2019",
    employees: "25-30",
    revenue: "$2M+",
    tags: ["Fintech", "Digital Payments", "SME Banking", "West Africa"],
    linkedin: "james-ochieng",
    website: "finflow.ng",
    seeking: ["Series B Funding", "Talent Acquisition", "Regional Expansion"]
  },
  {
    id: "3",
    name: "EduLearn Africa",
    founder: "Fatima Hassan",
    description: "Founder of EduLearn Africa, an edtech platform providing quality education to underserved communities. Reached 100,000+ students across 15 African countries with localized content.",
    location: "Cape Town, South Africa",
    stage: "Growth",
    industry: "Education",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
    founded: "2021",
    employees: "20-25",
    revenue: "$800K+",
    tags: ["EdTech", "Online Learning", "Localized Content", "Southern Africa"],
    linkedin: "fatima-hassan",
    website: "edulearn.africa",
    seeking: ["Series A Funding", "Content Partnerships", "Technology Upgrades"]
  },
  {
    id: "4",
    name: "HealthConnect",
    founder: "Michael Chen",
    description: "CEO of HealthConnect, a healthtech startup connecting patients with healthcare providers through telemedicine. Served 200,000+ patients and partnered with 500+ healthcare providers.",
    location: "Kigali, Rwanda",
    stage: "Early Stage",
    industry: "Health",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    founded: "2022",
    employees: "10-15",
    revenue: "$300K+",
    tags: ["HealthTech", "Telemedicine", "Healthcare Access", "East Africa"],
    linkedin: "michael-chen",
    website: "healthconnect.rw",
    seeking: ["Seed Funding", "Healthcare Partnerships", "Regulatory Support"]
  },
  {
    id: "5",
    name: "CleanEnergy Solutions",
    founder: "Dr. Amina Ndege",
    description: "Founder of CleanEnergy Solutions, developing affordable solar solutions for rural communities. Installed 10,000+ solar systems and provided clean energy to 50,000+ people.",
    location: "Dar es Salaam, Tanzania",
    stage: "Growth",
    industry: "Energy",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
    founded: "2020",
    employees: "18-22",
    revenue: "$1.2M+",
    tags: ["Clean Energy", "Solar Technology", "Rural Development", "Tanzania"],
    linkedin: "amina-ndege",
    website: "cleanenergy.tz",
    seeking: ["Series A Funding", "Manufacturing Partnerships", "Distribution Networks"]
  },
  {
    id: "6",
    name: "LogiTech Africa",
    founder: "David Kimani",
    description: "CEO of LogiTech Africa, a logistics technology company optimizing supply chains across East Africa. Reduced delivery times by 60% and cut logistics costs by 30% for 500+ businesses.",
    location: "Nairobi, Kenya",
    stage: "Scale",
    industry: "Digital Technology",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    founded: "2018",
    employees: "35-40",
    revenue: "$3M+",
    tags: ["Logistics", "Supply Chain", "Technology", "East Africa"],
    linkedin: "david-kimani",
    website: "logitech.africa",
    seeking: ["Series B Funding", "Regional Expansion", "Technology Partnerships"]
  }
];

export default function StartupsPage() {
  const [query, setQuery] = React.useState("");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedStage, setSelectedStage] = React.useState("");
  const [selectedStartup, setSelectedStartup] = React.useState<Startup | null>(null);

  const filtered = startups.filter((startup) => {
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
              <p className="ent-founder">Founded by {startup.founder}</p>
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
                  <p className="ent-modal-founder">Founded by {selectedStartup.founder}</p>
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
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Founded:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.founded}</span>
                      </div>
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Employees:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.employees}</span>
                      </div>
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Revenue:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.revenue}</span>
                      </div>
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Location:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.location}</span>
                      </div>
                      <div className="ent-modal-meta-item">
                        <span className="ent-modal-meta-label">Industry:</span>
                        <span className="ent-modal-meta-value">{selectedStartup.industry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ent-modal-section">
                    <h3>Focus Areas</h3>
                    <div className="ent-modal-tags">
                      {selectedStartup.tags.map((tag) => (
                        <span key={tag} className="ent-modal-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="ent-modal-section">
                    <h3>Currently Seeking</h3>
                    <div className="ent-modal-seeking">
                      {selectedStartup.seeking.map((item) => (
                        <span key={item} className="ent-modal-seeking-item">{item}</span>
                      ))}
                    </div>
                  </div>

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


