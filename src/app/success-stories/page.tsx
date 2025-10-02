"use client";
import React from 'react';

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';

type Story = {
  title: string;
  description: string;
  date: string;
  videoUrl: string;
  poster: string;
  fullStory: string;
  publishedDate: string;
  industry: string;
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

const stories: Story[] = [
  {
    title: "Amala Technologies: Transforming Financial Inclusion with Digital Solutions for SACCOs and MFIs",
    description:
      "Amala Technologies is a Tanzanian fintech startup that provides core banking solutions for financial institutions like SACCOS and MFIs.",
    date: "8/10/2025",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80&auto=format&fit=crop",
    fullStory: "Amala Technologies is a Tanzanian fintech startup that provides core banking solutions for financial institutions like SACCOS and MFIs. With a portfolio of over 32,600 clients and TZS 246 billion in disbursed loans, Amala digitizes operations, enhancing efficiency in client management, loans, and savings. Their innovative platform drives financial inclusion and empowers institutions to offer better services to their communities.",
    publishedDate: "8/10/2025, 5:40:15 PM",
    industry: "Finance"
  },
  {
    title: "Kiasi App: Empowering Tanzanians with Smart Savings and Financial Goals",
    description:
      "KiasiApp is helping Tanzanians achieve their financial goals with a digital piggy bank that enables small mobile money deposits.",
    date: "8/10/2025",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    poster: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80&auto=format&fit=crop",
    fullStory: "KiasiApp is helping Tanzanians achieve their financial goals with a digital piggy bank that enables small mobile money deposits. With 200+ subscribers, KiasiApp empowers users to save easily and securely for their future. Explore how KiasiApp is making financial management simple and accessible for everyone!",
    publishedDate: "8/10/2025, 5:40:15 PM",
    industry: "Finance"
  },
  {
    title: "Breaking Barriers in Menstrual Health: Dr. Iddah's Innovation Empowering Women and Girls in Tanzania",
    description:
      "FHT Company is transforming access to menstrual products in Tanzania with its locally produced sanitary pads.",
    date: "8/10/2025",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://images.unsplash.com/photo-1542736667-069246bdbc74?w=1200&q=80&auto=format&fit=crop",
    fullStory: "FHT Company is transforming access to menstrual products in Tanzania with its locally produced sanitary pads. Supported by the FUNGUO Programme, this initiative empowers women and girls in underserved communities to manage their periods with dignity, improving health outcomes and creating employment opportunities.",
    publishedDate: "8/10/2025, 4:30:20 PM",
    industry: "Health"
  },
  {
    title: "Zena Msonde: Revolutionizing Tanzania's Transport System with Smart Tech",
    description:
      "Through IoT and e-ticketing solutions, passengers enjoy smoother, safer travel while companies reduce fraud and improve efficiency.",
    date: "8/10/2025",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    poster: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80&auto=format&fit=crop",
    fullStory: "Through IoT and e-ticketing solutions, passengers enjoy smoother, safer travel while companies reduce fraud and improve efficiency. Backed by the FUNGUO Programme, Zena is proving technology can drive real change.",
    publishedDate: "8/10/2025, 3:15:45 PM",
    industry: "Digital Technology"
  },
  {
    title: "Transforming Waste into Sustainable Building Solutions with Arena Recycling",
    description:
      "Hellena is revolutionizing waste management by transforming waste into sustainable building materials.",
    date: "8/10/2025",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&q=80&auto=format&fit=crop",
    fullStory: "Hellena is revolutionizing waste management by transforming waste into sustainable building materials, proving that business can drive positive change.",
    publishedDate: "8/10/2025, 2:20:30 PM",
    industry: "Impact & Sustainability"
  },
  {
    title: "Dr. Mwambela: Revolutionizing Agriculture with Eco-Friendly Solutions",
    description:
      "Plant Biodefenders protects crops while safeguarding the environment.",
    date: "8/10/2025",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    poster: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80&auto=format&fit=crop",
    fullStory: "Plant Biodefenders protects crops while safeguarding the environment. With support from FUNGUO, Dr. Mwambela turned her vision into reality.",
    publishedDate: "8/10/2025, 1:45:15 PM",
    industry: "Agriculture"
  },
  {
    title: "Sea Weed Cafe: Empowering Coastal Communities with Sustainable Innovation",
    description:
      "Sea Weed Cafe harnesses seaweed resources to create nutritious, high-value products.",
    date: "8/10/2025",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://images.unsplash.com/photo-1543255006-c5064bf9eacf?w=1200&q=80&auto=format&fit=crop",
    fullStory: "Sea Weed Cafe harnesses seaweed resources to create nutritious, high-value products—empowering coastal communities and promoting healthier diets.",
    publishedDate: "8/10/2025, 12:30:00 PM",
    industry: "Agriculture"
  },
];

export default function SuccessStoriesPage() {
  const [query, setQuery] = React.useState("");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedStory, setSelectedStory] = React.useState<Story | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [items, setItems] = React.useState<Story[]>(stories);
  const [newStory, setNewStory] = React.useState({
    title: '',
    description: '',
    date: '',
    videoUrl: '',
    poster: '',
    fullStory: '',
    publishedDate: '',
    industry: ''
  });

  React.useEffect(() => {
    const loadRole = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
        const res = await fetch(`${API}/auth/me`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          credentials: 'include'
        });
        const data = await res.json().catch(() => ({}));
        setIsAdmin((data?.data?.role || '').toLowerCase() === 'admin');
      } catch {
        setIsAdmin(false);
      }
    };
    loadRole();
  }, []);

  const filtered = stories.filter((s) => {
    const matchesQuery = s.title.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || s.industry === selectedIndustry;
    return matchesQuery && matchesIndustry;
  });

  const openModal = (story: Story) => {
    setSelectedStory(story);
  };

  const closeModal = () => {
    setSelectedStory(null);
  };

  const handleAddStory = async () => {
    try {
      const response = await fetch('/api/v1/success-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newStory)
      });

      if (response.ok) {
        const returned = await response.json().catch(() => null);
        const created: Story = returned?.data || {
          ...newStory,
          publishedDate: newStory.publishedDate || new Date().toLocaleString(),
        };
        setItems((prev) => [...prev, created]);
        setShowAddModal(false);
        setNewStory({
          title: '',
          description: '',
          date: '',
          videoUrl: '',
          poster: '',
          fullStory: '',
          publishedDate: '',
          industry: ''
        });
      }
    } catch (error) {
      console.error('Error adding story:', error);
    }
  };

  return (
    <>
      <style jsx>{`
        .ss-head-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }
        .ss-head-content > div:first-child {
          flex: 1;
        }
        .proj-add-btn {
          background: var(--mc-sidebar-bg);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .proj-add-btn:hover {
          background: var(--mc-sidebar-bg-hover);
          transform: translateY(-1px);
        }
        .proj-add-btn span {
          font-size: 18px;
          font-weight: 700;
        }
        .proj-add-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .proj-add-modal {
          background: white;
          border-radius: 12px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          position: relative;
        }
        .proj-add-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0,0,0,0.5);
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          z-index: 1001;
        }
        .proj-add-modal-close:hover {
          background: rgba(0,0,0,0.7);
        }
        .proj-add-modal-content {
          padding: 20px;
        }
        .proj-add-modal-content h2 {
          margin: 0 0 8px 0;
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
        }
        .proj-add-modal-content p {
          margin: 0 0 16px 0;
          font-size: 14px;
          color: #6b7280;
        }
        .proj-add-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .proj-add-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .proj-add-form-group label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }
        .proj-add-form-group input, .proj-add-form-group textarea, .proj-add-form-group select {
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 10px 12px;
          font-family: inherit;
          font-size: 14px;
        }
        .proj-add-form-group input:focus, .proj-add-form-group textarea:focus, .proj-add-form-group select:focus {
          outline: none;
          border-color: var(--mc-sidebar-bg);
          box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
        }
        .proj-add-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .proj-add-form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
        }
        .proj-add-cancel-btn {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .proj-add-cancel-btn:hover {
          background: #e5e7eb;
        }
        .proj-add-save-btn {
          background: var(--mc-sidebar-bg);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .proj-add-save-btn:hover {
          background: var(--mc-sidebar-bg-hover);
        }
      `}</style>
      <div className="ss-wrap">
      <div className="ss-head">
        <div className="ss-head-content">
          <div>
            <h2>Success Stories</h2>
            <p>Inspiring stories of entrepreneurial success</p>
          </div>
          {isAdmin && (
          <button
            className="proj-add-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span>+</span> Add Story
          </button>
          )}
        </div>
      </div>
      <div className="ss-toolbar">
        <div className="ss-filters">
          <input
            className="ss-search"
            placeholder="Search success stories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="ss-industry-filter"
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
        </div>
      </div>
      <div className="ss-grid">
        {items.filter((s) => {
          const matchesQuery = s.title.toLowerCase().includes(query.toLowerCase());
          const matchesIndustry = selectedIndustry === "" || s.industry === selectedIndustry;
          return matchesQuery && matchesIndustry;
        }).map((s) => (
          <article key={s.title} className="ss-card" onClick={() => openModal(s)}>
            <div className="ss-media">
              <img src={s.poster} alt={s.title} className="ss-poster" />
              <div className="ss-play-overlay">
                <div className="ss-play-icon">▶</div>
              </div>
            </div>
            <div className="ss-body">
              <h3 className="ss-title">{s.title}</h3>
              <p className="ss-desc">{s.description}</p>
            </div>
            <div className="ss-footer">
              <span className="ss-date">Published: {s.publishedDate}</span>
            </div>
          </article>
        ))}
      </div>

      {selectedStory && (
        <div className="ss-modal-overlay" onClick={closeModal}>
          <div className="ss-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ss-modal-close" onClick={closeModal}>×</button>
            <div className="ss-modal-content">
              <div className="ss-modal-video">
                <video controls autoPlay className="ss-modal-video-player">
                  <source src={selectedStory.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="ss-modal-body">
                <h2 className="ss-modal-title">{selectedStory.title}</h2>
                <div className="ss-modal-story">
                  <h3>Story</h3>
                  <p>{selectedStory.fullStory}</p>
                </div>
                <div className="ss-modal-meta">
                  <span className="ss-modal-published">Published: {selectedStory.publishedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Story Modal */}
      {showAddModal && (
        <div className="proj-add-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="proj-add-modal" onClick={(e) => e.stopPropagation()}>
            <button className="proj-add-modal-close" onClick={() => setShowAddModal(false)}>
              ×
            </button>
            <div className="proj-add-modal-content">
              <div className="proj-add-modal-header">
                <h2>Add New Success Story</h2>
                <p>Create a new inspiring success story</p>
              </div>
              <div className="proj-add-modal-body">
                <form className="proj-add-form">
                  <div className="proj-add-form-group">
                    <label>Story Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., Amala Technologies: Transforming Financial Inclusion with Digital Solutions for SACCOs and MFIs"
                      value={newStory.title}
                      onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                    />
                  </div>

                  <div className="proj-add-form-group">
                    <label>Story Content *</label>
                    <textarea
                      placeholder="Complete story content (first part will be shown as brief description on the card)"
                      value={newStory.fullStory}
                      onChange={(e) => setNewStory({ ...newStory, fullStory: e.target.value })}
                      rows={5}
                    />
                  </div>

                  <div className="proj-add-form-row">
                    <div className="proj-add-form-group">
                      <label>Industry *</label>
                      <select
                        value={newStory.industry}
                        onChange={(e) => setNewStory({ ...newStory, industry: e.target.value })}
                      >
                        <option value="">Select Industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="proj-add-form-group">
                      <label>Published Date *</label>
                      <input
                        type="text"
                        placeholder="e.g., 8/10/2025, 5:40:15 PM"
                        value={newStory.publishedDate}
                        onChange={(e) => setNewStory({ ...newStory, publishedDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="proj-add-form-row">
                    <div className="proj-add-form-group">
                      <label>Video URL *</label>
                      <input
                        type="url"
                        placeholder="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                        value={newStory.videoUrl}
                        onChange={(e) => setNewStory({ ...newStory, videoUrl: e.target.value })}
                      />
                    </div>
                    <div className="proj-add-form-group">
                      <label>Poster Image URL *</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80&auto=format&fit=crop"
                        value={newStory.poster}
                        onChange={(e) => setNewStory({ ...newStory, poster: e.target.value })}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="proj-add-form-actions">
                <button
                  type="button"
                  className="proj-add-cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="proj-add-save-btn"
                  onClick={handleAddStory}
                >
                  Add Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

// removed duplicate default export


