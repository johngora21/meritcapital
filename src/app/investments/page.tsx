"use client";
import React from 'react';

type InvestmentItem = {
  id: string;
  name: string;
  industry: string;
  stage: string;
  amount: string;
  date: string;
  image: string;
  location?: string;
  founder?: string;
  description?: string;
  revenue?: string;
  tags?: string[];
};

// Seeded demo; replace with API when available
const seededInvestments: InvestmentItem[] = [
  { id: 'i1', name: 'TechStart Africa', industry: 'Digital Technology', stage: 'Series A', amount: '$200,000', date: '2024-07-10', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80&auto=format&fit=crop', location: 'Nairobi, Kenya', founder: 'Amina Yusuf', description: 'Fintech platform scaling across East Africa.', revenue: '$100K - $500K', tags: ['Fintech','SME','Payments'] },
  { id: 'i2', name: 'GreenFields Ltd', industry: 'Agriculture', stage: 'Growth Stage', amount: '$120,000', date: '2024-09-02', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80&auto=format&fit=crop', location: 'Dar es Salaam, Tanzania', founder: 'Joseph Mwangi', description: 'Sustainable farming solutions and distribution.', revenue: '$500K - $1M', tags: ['AgriTech','Sustainability'] },
  { id: 'i3', name: 'MedTech Solutions', industry: 'Health', stage: 'Mature', amount: '$300,000', date: '2024-11-18', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80&auto=format&fit=crop', location: 'Kigali, Rwanda', founder: 'Grace Nkurunziza', description: 'Health tech platform for providers.', revenue: '$1M - $5M', tags: ['HealthTech','Platform'] },
];

export default function InvestmentsPage() {
  const [query, setQuery] = React.useState('');
  const [items, setItems] = React.useState<InvestmentItem[]>(seededInvestments);

  const filtered = items.filter((x) =>
    x.name.toLowerCase().includes(query.toLowerCase()) ||
    x.industry.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="ent-wrap">
      <div className="ent-head">
        <h2>Investments</h2>
        <p>Your portfolio of startup investments</p>
      </div>

      <div className="ent-toolbar">
        <div className="ent-filters">
          <input
            className="ent-search"
            placeholder="Search startups or industries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="ent-grid">
        {filtered.map((s) => (
          <div key={s.id} className="ent-card">
            <div className="ent-card-header">
              <div className="ent-image">
                <img src={s.image} alt={s.name} />
                <div className="ent-industry-overlay">{s.industry}</div>
              </div>
            </div>

            <div className="ent-card-body">
              <h3 className="ent-title">{s.name}</h3>
              <p className="ent-founder">{s.founder ? `Founded by ${s.founder}` : ''}</p>
              {s.description && <p className="ent-description">{s.description}</p>}
              <div className="ent-meta-simple">
                <div className="ent-meta-item">
                  <span className="ent-meta-label">Stage:</span>
                  <span className="ent-meta-value">{s.stage}</span>
                </div>
                <div className="ent-meta-item">
                  <span className="ent-meta-label">Invested:</span>
                  <span className="ent-meta-value">{s.amount}</span>
                </div>
              </div>
              {s.tags && s.tags.length > 0 && (
                <div className="ent-tags">
                  {s.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="ent-tag">{tag}</span>
                  ))}
                  {s.tags.length > 3 && (
                    <span className="ent-tag">+{s.tags.length - 3} more</span>
                  )}
                </div>
              )}
            </div>

            <div className="ent-card-footer">
              <div className="ent-footer-left">
                <span className="ent-location">{s.location || ''}</span>
              </div>
              <div className="ent-footer-right">
                <span className="ent-location">Invested on {new Date(s.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

