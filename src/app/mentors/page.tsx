"use client";
import React from 'react';

type Mentor = {
  id: string;
  name: string;
  title: string;
  company: string;
  description: string;
  location: string;
  expertise: string;
  industry: string;
  image: string;
  experience: string;
  rating: number;
  sessions: number;
  tags: string[];
  availability: string;
  languages: string[];
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

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Grace Mwangi",
    title: "Senior Business Advisor",
    company: "KPMG East Africa",
    description: "Experienced business advisor with 15+ years in strategy consulting and business development across East Africa. Specializes in scaling startups and corporate transformation.",
    location: "Nairobi, Kenya",
    expertise: "Business Strategy",
    industry: "Finance",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80&auto=format&fit=crop",
    experience: "15+ years",
    rating: 4.9,
    sessions: 120,
    tags: ["Strategy", "Scaling", "East Africa", "Corporate"],
    availability: "Available",
    languages: ["English", "Swahili"]
  },
  {
    id: "2",
    name: "James Ochieng",
    title: "Tech Innovation Lead",
    company: "Microsoft Africa",
    description: "Technology innovation expert with deep experience in digital transformation and product development. Helps startups leverage cutting-edge technology for growth.",
    location: "Lagos, Nigeria",
    expertise: "Technology Innovation",
    industry: "Digital Technology",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    experience: "12+ years",
    rating: 4.8,
    sessions: 95,
    tags: ["Digital Transformation", "Product Development", "West Africa", "Innovation"],
    availability: "Available",
    languages: ["English", "French"]
  },
  {
    id: "3",
    name: "Fatima Hassan",
    title: "Investment Director",
    company: "Partech Partners",
    description: "Investment professional with extensive experience in African markets. Specializes in fundraising, investor relations, and financial modeling for growth-stage companies.",
    location: "Cape Town, South Africa",
    expertise: "Investment & Finance",
    industry: "Finance",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
    experience: "10+ years",
    rating: 4.9,
    sessions: 80,
    tags: ["Fundraising", "Investor Relations", "Financial Modeling", "Southern Africa"],
    availability: "Available",
    languages: ["English", "Afrikaans"]
  },
  {
    id: "4",
    name: "Michael Chen",
    title: "Operations Excellence Lead",
    company: "McKinsey & Company",
    description: "Operations and process optimization expert with proven track record in improving efficiency and scaling operations for African businesses across various sectors.",
    location: "Kigali, Rwanda",
    expertise: "Operations & Process",
    industry: "Digital Technology",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    experience: "13+ years",
    rating: 4.7,
    sessions: 110,
    tags: ["Operations", "Process Optimization", "East Africa", "Efficiency"],
    availability: "Available",
    languages: ["English", "Kinyarwanda"]
  },
  {
    id: "5",
    name: "Dr. Amina Ndege",
    title: "Agricultural Innovation Specialist",
    company: "AGRA (Alliance for a Green Revolution)",
    description: "Agricultural innovation expert with deep knowledge of sustainable farming practices and agri-tech solutions. Helps farmers and agribusinesses adopt modern technologies.",
    location: "Dar es Salaam, Tanzania",
    expertise: "Agricultural Innovation",
    industry: "Agriculture",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
    experience: "14+ years",
    rating: 4.8,
    sessions: 75,
    tags: ["AgriTech", "Sustainable Farming", "Tanzania", "Innovation"],
    availability: "Available",
    languages: ["English", "Swahili"]
  },
  {
    id: "6",
    name: "David Kimani",
    title: "Marketing & Brand Strategy Lead",
    company: "Google Africa",
    description: "Marketing and brand strategy expert with extensive experience in digital marketing, brand building, and customer acquisition across African markets.",
    location: "Nairobi, Kenya",
    expertise: "Marketing & Brand",
    industry: "Digital Technology",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    experience: "11+ years",
    rating: 4.9,
    sessions: 100,
    tags: ["Digital Marketing", "Brand Building", "East Africa", "Customer Acquisition"],
    availability: "Available",
    languages: ["English", "Swahili"]
  }
];

export default function MentorsPage() {
  const [query, setQuery] = React.useState("");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedExpertise, setSelectedExpertise] = React.useState("");
  const [selectedMentor, setSelectedMentor] = React.useState<Mentor | null>(null);

  const filtered = mentors.filter((mentor) => {
    const matchesQuery = mentor.name.toLowerCase().includes(query.toLowerCase()) || 
                        mentor.company.toLowerCase().includes(query.toLowerCase()) ||
                        mentor.expertise.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || mentor.industry === selectedIndustry;
    const matchesExpertise = selectedExpertise === "" || mentor.expertise === selectedExpertise;
    return matchesQuery && matchesIndustry && matchesExpertise;
  });

  const openModal = (mentor: Mentor) => {
    setSelectedMentor(mentor);
  };

  const closeModal = () => {
    setSelectedMentor(null);
  };

  const expertiseOptions = [
    "Business Strategy",
    "Technology Innovation", 
    "Investment & Finance",
    "Operations & Process",
    "Agricultural Innovation",
    "Marketing & Brand"
  ];

  return (
    <div className="ment-wrap">
      <div className="ment-head">
        <h2>Mentors</h2>
        <p>Connect with experienced mentors and business advisors</p>
      </div>
      
      <div className="ment-toolbar">
        <div className="ment-filters">
          <input
            className="ment-search"
            placeholder="Search mentors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="ment-industry-filter"
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
            className="ment-expertise-filter"
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
          >
            <option value="">All Expertise</option>
            {expertiseOptions.map((expertise) => (
              <option key={expertise} value={expertise}>
                {expertise}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ment-grid">
        {filtered.map((mentor) => (
          <div key={mentor.id} className="ment-card" onClick={() => openModal(mentor)}>
            <div className="ment-card-header">
              <div className="ment-image">
                <img src={mentor.image} alt={mentor.name} />
              </div>
            </div>
            
            <div className="ment-card-body">
              <h3 className="ment-title">{mentor.name}</h3>
              <p className="ment-company">{mentor.title} at {mentor.company}</p>
              <p className="ment-description">{mentor.description}</p>
              
              <div className="ment-meta-simple">
                <div className="ment-meta-item">
                  <span className="ment-meta-label">Expertise:</span>
                  <span className="ment-meta-value">{mentor.expertise}</span>
                </div>
                <div className="ment-meta-item">
                  <span className="ment-meta-label">Rating:</span>
                  <span className="ment-meta-value">★ {mentor.rating}</span>
                </div>
              </div>

              <div className="ment-tags">
                {mentor.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="ment-tag">{tag}</span>
                ))}
                {mentor.tags.length > 3 && (
                  <span className="ment-tag">+{mentor.tags.length - 3} more</span>
                )}
              </div>
            </div>

            <div className="ment-card-footer">
              <div className="ment-footer-left">
                <span className="ment-availability">{mentor.availability}</span>
              </div>
              <div className="ment-footer-right">
                <button className="ment-connect-btn">Connect</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMentor && (
        <div className="ment-modal-overlay" onClick={closeModal}>
          <div className="ment-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ment-modal-close" onClick={closeModal}>×</button>
            <div className="ment-modal-content">
              <div className="ment-modal-header">
                <div className="ment-modal-image">
                  <img src={selectedMentor.image} alt={selectedMentor.name} />
                </div>
              </div>
              
              <div className="ment-modal-body">
                <div className="ment-modal-header-info">
                  <h2 className="ment-modal-title">{selectedMentor.name}</h2>
                  <p className="ment-modal-company">{selectedMentor.title} at {selectedMentor.company}</p>
                </div>
                
                <p className="ment-modal-description">{selectedMentor.description}</p>
                
                <div className="ment-modal-details">
                  <div className="ment-modal-section">
                    <h3>Mentor Profile</h3>
                    <div className="ment-modal-meta">
                      <div className="ment-modal-meta-item">
                        <span className="ment-modal-meta-label">Expertise:</span>
                        <span className="ment-modal-meta-value">{selectedMentor.expertise}</span>
                      </div>
                      <div className="ment-modal-meta-item">
                        <span className="ment-modal-meta-label">Experience:</span>
                        <span className="ment-modal-meta-value">{selectedMentor.experience}</span>
                      </div>
                      <div className="ment-modal-meta-item">
                        <span className="ment-modal-meta-label">Rating:</span>
                        <span className="ment-modal-meta-value">★ {selectedMentor.rating}</span>
                      </div>
                      <div className="ment-modal-meta-item">
                        <span className="ment-modal-meta-label">Sessions Completed:</span>
                        <span className="ment-modal-meta-value">{selectedMentor.sessions}</span>
                      </div>
                      <div className="ment-modal-meta-item">
                        <span className="ment-modal-meta-label">Location:</span>
                        <span className="ment-modal-meta-value">{selectedMentor.location}</span>
                      </div>
                      <div className="ment-modal-meta-item">
                        <span className="ment-modal-meta-label">Availability:</span>
                        <span className="ment-modal-meta-value">{selectedMentor.availability}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ment-modal-section">
                    <h3>Focus Areas</h3>
                    <div className="ment-modal-tags">
                      {selectedMentor.tags.map((tag) => (
                        <span key={tag} className="ment-modal-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="ment-modal-section">
                    <h3>Languages</h3>
                    <div className="ment-modal-languages">
                      {selectedMentor.languages.map((language) => (
                        <span key={language} className="ment-modal-language">{language}</span>
                      ))}
                    </div>
                  </div>

                  <div className="ment-modal-section">
                    <h3>Actions</h3>
                    <div className="ment-modal-links">
                      <button className="ment-modal-link ment-contact-btn">Contact</button>
                      <button className="ment-modal-link ment-schedule-btn">Schedule Session</button>
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


