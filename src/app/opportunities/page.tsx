"use client";
import React from 'react';

type Opportunity = {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  type: 'Funding Round' | 'Partnership' | 'Investment' | 'Acquisition' | 'Merger';
  industry: string;
  deadline: string;
  postedDate: string;
  image: string;
  status: 'Open' | 'Closing Soon' | 'Closed';
  amount: string;
  stage: string;
  equity?: string;
  tags: string[];
  investors?: string[];
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

const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Series A Funding Round",
    company: "TechStart Africa",
    description: "Seeking $2M Series A funding to scale our fintech platform across East Africa. Strong traction with 50K+ active users and $1M ARR.",
    location: "Nairobi, Kenya",
    type: "Funding Round",
    industry: "Digital Technology",
    deadline: "2024-12-31",
    postedDate: "2024-11-15",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80&auto=format&fit=crop",
    status: "Open",
    amount: "$2,000,000",
    stage: "Series A",
    equity: "15-20%",
    tags: ["Fintech", "Mobile Money", "Financial Inclusion", "Scale-up"],
    investors: ["Acumen Fund", "TLcom Capital", "Partech Partners"]
  },
  {
    id: "2",
    title: "Strategic Partnership Opportunity",
    company: "GreenFields Ltd",
    description: "Seeking strategic partners to expand sustainable farming solutions across Tanzania. Looking for distribution partners and technology collaborators.",
    location: "Dar es Salaam, Tanzania",
    type: "Partnership",
    industry: "Agriculture",
    deadline: "2024-12-20",
    postedDate: "2024-11-10",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80&auto=format&fit=crop",
    status: "Closing Soon",
    amount: "Partnership",
    stage: "Growth Stage",
    tags: ["Agriculture", "Sustainability", "Distribution", "Technology"],
    investors: ["FUNGUO Programme", "IFAD", "GIZ"]
  },
  {
    id: "3",
    title: "Investment Opportunity",
    company: "Merit Capital Partners",
    description: "Portfolio company seeking follow-on investment. Proven business model with 200% YoY growth and expanding to 3 new markets.",
    location: "Kampala, Uganda",
    type: "Investment",
    industry: "Finance",
    deadline: "2025-01-15",
    postedDate: "2024-11-20",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format&fit=crop",
    status: "Open",
    amount: "$500,000",
    stage: "Series B",
    equity: "8-12%",
    tags: ["Microfinance", "SME Lending", "Digital Banking", "Growth"],
    investors: ["Merit Capital", "Omidyar Network", "FMO"]
  },
  {
    id: "4",
    title: "Acquisition Opportunity",
    company: "MedTech Solutions",
    description: "Established health tech company with 10K+ healthcare providers on platform. Seeking acquisition or strategic investment for expansion.",
    location: "Kigali, Rwanda",
    type: "Acquisition",
    industry: "Health",
    deadline: "2024-12-10",
    postedDate: "2024-11-05",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80&auto=format&fit=crop",
    status: "Closing Soon",
    amount: "$1,500,000",
    stage: "Mature",
    equity: "100%",
    tags: ["Health Tech", "Telemedicine", "Healthcare", "Platform"],
    investors: ["Rwanda Development Board", "African Development Bank"]
  },
  {
    id: "5",
    title: "Seed Funding Round",
    company: "EduForward Initiative",
    description: "Early-stage edtech startup seeking seed funding to develop AI-powered learning platform for African students.",
    location: "Addis Ababa, Ethiopia",
    type: "Funding Round",
    industry: "Education",
    deadline: "2025-01-30",
    postedDate: "2024-11-25",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80&auto=format&fit=crop",
    status: "Open",
    amount: "$300,000",
    stage: "Seed",
    equity: "20-25%",
    tags: ["EdTech", "AI", "Learning Platform", "Students"],
    investors: ["Addis Ababa University", "Mastercard Foundation"]
  },
  {
    id: "6",
    title: "Merger Opportunity",
    company: "SolarPower Africa",
    description: "Established solar energy company seeking merger with complementary renewable energy businesses to create market leader.",
    location: "Lagos, Nigeria",
    type: "Merger",
    industry: "Energy",
    deadline: "2024-12-25",
    postedDate: "2024-11-12",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=80&auto=format&fit=crop",
    status: "Open",
    amount: "Merger",
    stage: "Mature",
    tags: ["Solar Energy", "Renewable", "Infrastructure", "Market Leader"],
    investors: ["Shell Foundation", "Energy Access Ventures", "CDC Group"]
  }
];

export default function OpportunitiesPage() {
  const [query, setQuery] = React.useState("");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedOpportunity, setSelectedOpportunity] = React.useState<Opportunity | null>(null);

  const filtered = opportunities.filter((opp) => {
    const matchesQuery = opp.title.toLowerCase().includes(query.toLowerCase()) || 
                        opp.company.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || opp.industry === selectedIndustry;
    const matchesStage = selectedType === "" || opp.stage === selectedType;
    return matchesQuery && matchesIndustry && matchesStage;
  });

  const openModal = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const closeModal = () => {
    setSelectedOpportunity(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return '#10b981';
      case 'Closing Soon': return '#f59e0b';
      case 'Closed': return '#ef4444';
      default: return '#6b7280';
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
    <div className="opp-wrap">
      <div className="opp-head">
        <h2>Opportunities</h2>
        <p>Discover exciting career opportunities and partnerships</p>
      </div>
      
      <div className="opp-toolbar">
        <div className="opp-filters">
          <input
            className="opp-search"
            placeholder="Search opportunities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="opp-industry-filter"
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
            className="opp-type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Stages</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
            <option value="Series B">Series B</option>
            <option value="Growth Stage">Growth Stage</option>
            <option value="Mature">Mature</option>
          </select>
        </div>
      </div>

      <div className="opp-grid">
        {filtered.map((opp) => (
          <div key={opp.id} className="opp-card" onClick={() => openModal(opp)}>
            <div className="opp-card-header">
              <div className="opp-image">
                <img src={opp.image} alt={opp.company} />
              </div>
            </div>
            
            <div className="opp-card-body">
              <h3 className="opp-title">{opp.title}</h3>
              <p className="opp-company">{opp.company}</p>
              <p className="opp-description">{opp.description}</p>
              
              <div className="opp-meta-simple">
                <div className="opp-meta-item">
                  <span className="opp-meta-label">Amount:</span>
                  <span className="opp-meta-value">{opp.amount}</span>
                </div>
                <div className="opp-meta-item">
                  <span className="opp-meta-label">Stage:</span>
                  <span className="opp-meta-value">{opp.stage}</span>
                </div>
              </div>

              <div className="opp-tags">
                {opp.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="opp-tag">{tag}</span>
                ))}
                {opp.tags.length > 3 && (
                  <span className="opp-tag">+{opp.tags.length - 3} more</span>
                )}
              </div>
            </div>

            <div className="opp-card-footer">
              <div className="opp-footer-left">
                <span className="opp-deadline">Deadline: {formatDate(opp.deadline)}</span>
              </div>
              <div className="opp-footer-right">
                <button className="opp-apply-btn">Apply</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOpportunity && (
        <div className="opp-modal-overlay" onClick={closeModal}>
          <div className="opp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="opp-modal-close" onClick={closeModal}>×</button>
            <div className="opp-modal-content">
              <div className="opp-modal-header">
                <div className="opp-modal-image">
                  <img src={selectedOpportunity.image} alt={selectedOpportunity.company} />
                </div>
              </div>
              
              <div className="opp-modal-body">
                <div className="opp-modal-header-info">
                  <h2 className="opp-modal-title">{selectedOpportunity.title}</h2>
                  <p className="opp-modal-company">{selectedOpportunity.company}</p>
                </div>
                
                <p className="opp-modal-description">{selectedOpportunity.description}</p>
                
                <div className="opp-modal-details">
                  <div className="opp-modal-section">
                    <h3>Investment Details</h3>
                    <div className="opp-modal-meta">
                      <div className="opp-modal-meta-item">
                        <span className="opp-modal-meta-label">Amount:</span>
                        <span className="opp-modal-meta-value">{selectedOpportunity.amount}</span>
                      </div>
                      <div className="opp-modal-meta-item">
                        <span className="opp-modal-meta-label">Stage:</span>
                        <span className="opp-modal-meta-value">{selectedOpportunity.stage}</span>
                      </div>
                      {selectedOpportunity.equity && (
                        <div className="opp-modal-meta-item">
                          <span className="opp-modal-meta-label">Equity:</span>
                          <span className="opp-modal-meta-value">{selectedOpportunity.equity}</span>
                        </div>
                      )}
                      <div className="opp-modal-meta-item">
                        <span className="opp-modal-meta-label">Location:</span>
                        <span className="opp-modal-meta-value">{selectedOpportunity.location}</span>
                      </div>
                      <div className="opp-modal-meta-item">
                        <span className="opp-modal-meta-label">Type:</span>
                        <span className="opp-modal-meta-value">{selectedOpportunity.type}</span>
                      </div>
                    </div>
                  </div>

                  {selectedOpportunity.investors && selectedOpportunity.investors.length > 0 && (
                    <div className="opp-modal-section">
                      <h3>Current Investors</h3>
                      <div className="opp-modal-investors">
                        {selectedOpportunity.investors.map((investor, index) => (
                          <span key={index} className="opp-modal-investor">{investor}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="opp-modal-section">
                    <h3>Tags</h3>
                    <div className="opp-modal-tags">
                      {selectedOpportunity.tags.map((tag) => (
                        <span key={tag} className="opp-modal-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="opp-modal-timeline">
                    <div className="opp-modal-timeline-item">
                      <span className="opp-modal-timeline-label">Posted:</span>
                      <span className="opp-modal-timeline-value">{formatDate(selectedOpportunity.postedDate)}</span>
                    </div>
                    <div className="opp-modal-timeline-item">
                      <span className="opp-modal-timeline-label">Deadline:</span>
                      <span className="opp-modal-timeline-value">{formatDate(selectedOpportunity.deadline)}</span>
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


