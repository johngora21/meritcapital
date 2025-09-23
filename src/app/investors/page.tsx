"use client";
import React from 'react';

type Investor = {
  id: string;
  name: string;
  company: string;
  description: string;
  location: string;
  type: 'Venture Capital' | 'Angel Investor' | 'Private Equity' | 'Corporate VC' | 'Family Office';
  industry: string;
  image: string;
  portfolio: number;
  investments: string;
  stage: string;
  tags: string[];
  website?: string;
  linkedin?: string;
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

const investors: Investor[] = [
  {
    id: "1",
    name: "Dr. Sarah Mwangi",
    company: "Acumen Fund",
    description: "Managing Director at Acumen Fund, focused on impact investments across East Africa. Led investments in 15+ companies creating social impact.",
    location: "Nairobi, Kenya",
    type: "Venture Capital",
    industry: "Impact & Sustainability",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80&auto=format&fit=crop",
    portfolio: 15,
    investments: "$50M+",
    stage: "Seed to Series A",
    tags: ["Impact Investing", "Social Enterprise", "East Africa", "Healthcare"],
    website: "acumen.org",
    linkedin: "sarah-mwangi"
  },
  {
    id: "2",
    name: "James Ochieng",
    company: "TLcom Capital",
    description: "Partner at TLcom Capital, specializing in technology investments across Africa. Expert in fintech and digital infrastructure.",
    location: "Lagos, Nigeria",
    type: "Venture Capital",
    industry: "Digital Technology",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    portfolio: 22,
    investments: "$100M+",
    stage: "Series A to B",
    tags: ["Fintech", "Digital Infrastructure", "West Africa", "Mobile"],
    website: "tlcom.vc",
    linkedin: "james-ochieng"
  },
  {
    id: "3",
    name: "Fatima Hassan",
    company: "Partech Partners",
    description: "Investment Director at Partech Partners, leading investments in African tech startups. Strong focus on education and healthcare technology.",
    location: "Cape Town, South Africa",
    type: "Venture Capital",
    industry: "Education",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
    portfolio: 18,
    investments: "$75M+",
    stage: "Seed to Series A",
    tags: ["EdTech", "HealthTech", "Southern Africa", "Innovation"],
    website: "partechpartners.com",
    linkedin: "fatima-hassan"
  },
  {
    id: "4",
    name: "Michael Chen",
    company: "Omidyar Network",
    description: "Principal at Omidyar Network, focused on financial inclusion and property rights. Leading investments in fintech and proptech across Africa.",
    location: "Kigali, Rwanda",
    type: "Venture Capital",
    industry: "Finance",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    portfolio: 12,
    investments: "$40M+",
    stage: "Seed to Growth",
    tags: ["Financial Inclusion", "Proptech", "East Africa", "Blockchain"],
    website: "omidyar.com",
    linkedin: "michael-chen"
  },
  {
    id: "5",
    name: "Dr. Amina Ndege",
    company: "FMO Ventures",
    description: "Investment Manager at FMO Ventures, specializing in sustainable agriculture and renewable energy investments across Africa.",
    location: "Dar es Salaam, Tanzania",
    type: "Venture Capital",
    industry: "Agriculture",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
    portfolio: 8,
    investments: "$25M+",
    stage: "Early Stage",
    tags: ["AgriTech", "Renewable Energy", "Sustainability", "Tanzania"],
    website: "fmo.nl",
    linkedin: "amina-ndege"
  },
  {
    id: "6",
    name: "David Kimani",
    company: "Merit Capital Partners",
    description: "Founding Partner at Merit Capital Partners, focused on growth-stage investments in East African companies. Expert in scaling operations.",
    location: "Nairobi, Kenya",
    type: "Private Equity",
    industry: "Finance",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    portfolio: 30,
    investments: "$200M+",
    stage: "Growth to Exit",
    tags: ["Growth Capital", "Operations", "East Africa", "Scaling"],
    website: "meritcapital.com",
    linkedin: "david-kimani"
  }
];

export default function InvestorsPage() {
  const [query, setQuery] = React.useState("");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedInvestor, setSelectedInvestor] = React.useState<Investor | null>(null);

  const filtered = investors.filter((inv) => {
    const matchesQuery = inv.name.toLowerCase().includes(query.toLowerCase()) || 
                        inv.company.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || inv.industry === selectedIndustry;
    const matchesType = selectedType === "" || inv.type === selectedType;
    return matchesQuery && matchesIndustry && matchesType;
  });

  const openModal = (investor: Investor) => {
    setSelectedInvestor(investor);
  };

  const closeModal = () => {
    setSelectedInvestor(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="inv-wrap">
      <div className="inv-head">
        <h2>Investors</h2>
        <p>Connect with leading investors and funding partners</p>
      </div>
      
      <div className="inv-toolbar">
        <div className="inv-filters">
          <input
            className="inv-search"
            placeholder="Search investors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="inv-industry-filter"
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
            className="inv-type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Venture Capital">Venture Capital</option>
            <option value="Angel Investor">Angel Investor</option>
            <option value="Private Equity">Private Equity</option>
            <option value="Corporate VC">Corporate VC</option>
            <option value="Family Office">Family Office</option>
          </select>
        </div>
      </div>

      <div className="inv-grid">
        {filtered.map((inv) => (
          <div key={inv.id} className="inv-card" onClick={() => openModal(inv)}>
            <div className="inv-card-header">
              <div className="inv-image">
                <img src={inv.image} alt={inv.name} />
              </div>
            </div>
            
            <div className="inv-card-body">
              <h3 className="inv-title">{inv.name}</h3>
              <p className="inv-company">{inv.company}</p>
              <p className="inv-description">{inv.description}</p>
              
              <div className="inv-meta-simple">
                <div className="inv-meta-item">
                  <span className="inv-meta-label">Type:</span>
                  <span className="inv-meta-value">{inv.type}</span>
                </div>
                <div className="inv-meta-item">
                  <span className="inv-meta-label">Portfolio:</span>
                  <span className="inv-meta-value">{inv.portfolio} companies</span>
                </div>
              </div>

              <div className="inv-tags">
                {inv.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="inv-tag">{tag}</span>
                ))}
                {inv.tags.length > 3 && (
                  <span className="inv-tag">+{inv.tags.length - 3} more</span>
                )}
              </div>
            </div>

            <div className="inv-card-footer">
              <div className="inv-footer-left">
                <span className="inv-location">{inv.location}</span>
              </div>
              <div className="inv-footer-right">
                <button className="inv-connect-btn">Connect</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedInvestor && (
        <div className="inv-modal-overlay" onClick={closeModal}>
          <div className="inv-modal" onClick={(e) => e.stopPropagation()}>
            <button className="inv-modal-close" onClick={closeModal}>×</button>
            <div className="inv-modal-content">
              <div className="inv-modal-header">
                <div className="inv-modal-image">
                  <img src={selectedInvestor.image} alt={selectedInvestor.name} />
                </div>
              </div>
              
              <div className="inv-modal-body">
                <div className="inv-modal-header-info">
                  <h2 className="inv-modal-title">{selectedInvestor.name}</h2>
                  <p className="inv-modal-company">{selectedInvestor.company}</p>
                </div>
                
                <p className="inv-modal-description">{selectedInvestor.description}</p>
                
                <div className="inv-modal-details">
                  <div className="inv-modal-section">
                    <h3>Investment Profile</h3>
                    <div className="inv-modal-meta">
                      <div className="inv-modal-meta-item">
                        <span className="inv-modal-meta-label">Type:</span>
                        <span className="inv-modal-meta-value">{selectedInvestor.type}</span>
                      </div>
                      <div className="inv-modal-meta-item">
                        <span className="inv-modal-meta-label">Portfolio Size:</span>
                        <span className="inv-modal-meta-value">{selectedInvestor.portfolio} companies</span>
                      </div>
                      <div className="inv-modal-meta-item">
                        <span className="inv-modal-meta-label">Total Investments:</span>
                        <span className="inv-modal-meta-value">{selectedInvestor.investments}</span>
                      </div>
                      <div className="inv-modal-meta-item">
                        <span className="inv-modal-meta-label">Investment Stage:</span>
                        <span className="inv-modal-meta-value">{selectedInvestor.stage}</span>
                      </div>
                      <div className="inv-modal-meta-item">
                        <span className="inv-modal-meta-label">Location:</span>
                        <span className="inv-modal-meta-value">{selectedInvestor.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="inv-modal-section">
                    <h3>Focus Areas</h3>
                    <div className="inv-modal-tags">
                      {selectedInvestor.tags.map((tag) => (
                        <span key={tag} className="inv-modal-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="inv-modal-section">
                    <h3>Actions</h3>
                    <div className="inv-modal-links">
                      <button className="inv-modal-link inv-contact-btn">Contact</button>
                      <button className="inv-modal-link inv-portfolio-btn">Portfolio</button>
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


