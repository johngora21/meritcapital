"use client";
import React from 'react';

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

  return (
    <div className="ss-wrap">
      <div className="ss-head">
        <h2>Success Stories</h2>
        <p>Inspiring stories of entrepreneurial success</p>
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
        {filtered.map((s) => (
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
    </div>
  );
}

// removed duplicate default export


