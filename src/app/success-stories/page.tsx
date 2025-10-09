"use client";
import React from 'react';

const API = 'http://localhost:4000/api/v1';

type Story = {
  id: string;
  title: string;
  description: string;
  date: string;
  videoUrl: string;
  youtubeUrl: string;
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


export default function SuccessStoriesPage() {
  const [query, setQuery] = React.useState("");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedStory, setSelectedStory] = React.useState<Story | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editingStory, setEditingStory] = React.useState<Story | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [items, setItems] = React.useState<Story[]>([]);
  const [newStory, setNewStory] = React.useState({
    title: '',
    description: '',
    videoUrl: '',
    imageUrl: '',
    poster: '',
    fullStory: '',
    industry: '',
    youtubeUrl: ''
  });

  React.useEffect(() => {
    const loadRole = async () => {
      try {
        const res = await fetch(`${API}/auth/me`, { credentials: 'include' });
        if (!res.ok) {
          setIsAdmin(false);
          return;
        }
        const data = await res.json().catch(() => ({}));
        const role = ((data?.data?.role || data?.role || '') as string).toLowerCase();
        setIsAdmin(role === 'admin');
      } catch (error) {
        setIsAdmin(false);
      }
    };
    loadRole();
  }, []);

  React.useEffect(() => {
    const loadStories = async () => {
      try {
            const res = await fetch('http://localhost:4000/api/v1/success-stories/cards');
            if (!res.ok) {
              console.log('❌ API response not ok:', res.status, res.statusText);
              setItems([]);
              return;
            }
        const json = await res.json().catch(() => ({}));
            const stories = Array.isArray(json?.data) ? json.data : [];
            setItems(stories);
          } catch (error) {
            console.error('❌ Error loading stories:', error);
        setItems([]);
      }
    };
    loadStories();
  }, []);

  const filtered = items.filter((s) => {
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
      // Validate required fields
      if (!newStory.title.trim()) {
        alert('Please enter a story title');
        return;
      }
      if (!newStory.fullStory.trim()) {
        alert('Please enter story content');
        return;
      }
      if (!newStory.industry) {
        alert('Please select an industry');
        return;
      }

      // Create/update story with base64 data (like projects and opportunities)
      const storyData = {
        title: newStory.title,
        full_story: newStory.fullStory,
        industry: newStory.industry,
        image_url: newStory.imageUrl || null,
        video_url: newStory.videoUrl || null,
        youtube_url: newStory.youtubeUrl || null
      };

      const url = isEditMode && editingStory
        ? `http://localhost:4000/api/v1/success-stories/${editingStory.id}`
        : 'http://localhost:4000/api/v1/success-stories';
      
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(storyData)
      });

      if (response.ok) {
        try {
          const res2 = await fetch('/api/v1/success-stories/cards', { credentials: 'include' });
          const json2 = await res2.json().catch(() => ({}));
          setItems(Array.isArray(json2?.data) ? json2.data : []);
        } catch {}
        setShowAddModal(false);
        setIsEditMode(false);
        setEditingStory(null);
        setNewStory({
          title: '',
          description: '',
          videoUrl: '',
          imageUrl: '',
          poster: '',
          fullStory: '',
          industry: '',
          youtubeUrl: ''
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || 'Unknown error';
        console.error('Story operation error:', response.status, errorData);
        if (response.status === 401) {
          alert('You must be logged in to add stories. Please log in first.');
        } else if (response.status === 403) {
          alert('Only admins can add stories. You need admin privileges.');
        } else if (response.status === 404) {
          alert('Story not found. It may have been deleted by another user.');
        } else {
          alert(`Failed to ${isEditMode ? 'update' : 'add'} story: ${response.status} - ${errorMessage}`);
        }
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
          display: flex;
          flex-direction: column;
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
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
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
          flex-shrink: 0;
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
        {filtered.map((s) => (
          <article key={s.id} className="ss-card" onClick={() => openModal(s)}>
            <div className="ss-media">
              <img 
                src={s.poster ? (s.poster.startsWith('/uploads') ? `http://localhost:4000${s.poster}` : s.poster) : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop'} 
                alt={s.title} 
                className="ss-poster" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop';
                }}
              />
              <div className="ss-play-overlay">
                <div className="ss-play-icon">▶</div>
              </div>
            </div>
            <div className="ss-body">
              <h3 className="ss-title">{s.title}</h3>
              <p className="ss-desc">{s.description}</p>
            </div>
            <div className="ss-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="ss-date">Published: {s.publishedDate}</span>
              {isAdmin && (
                <div className="ss-admin-controls" style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingStory(s);
                      setIsEditMode(true);
                      setNewStory({
                        title: s.title,
                        description: s.description,
                        videoUrl: s.videoUrl,
                        imageUrl: s.poster,
                        poster: s.poster,
                        fullStory: s.fullStory,
                        industry: s.industry,
                        youtubeUrl: s.youtubeUrl || ''
                      });
                      setShowAddModal(true);
                    }}
                    title="Edit Story"
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
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (confirm(`Are you sure you want to delete "${s.title}"?`)) {
                        if (!s.id) {
                          alert('Error: Story ID is missing');
                          return;
                        }
                        try {
                          const response = await fetch(`http://localhost:4000/api/v1/success-stories/${s.id}`, {
                            method: 'DELETE',
                            credentials: 'include'
                          });

                          if (response.ok) {
                            // Remove the story from the local state
                            setItems(items.filter(item => item.id !== s.id));
                            alert('Story deleted successfully');
                          } else {
                            const errorData = await response.json().catch(() => ({}));
                            console.error('Delete error:', response.status, errorData);
                            alert(`Failed to delete story: ${response.status} - ${errorData.message || 'Unknown error'}`);
                          }
                        } catch (error) {
                          console.error('Error deleting story:', error);
                          alert('Failed to delete story. Please try again.');
                        }
                      }
                    }}
                    title="Delete Story"
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
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {selectedStory && (
        <div className="ss-modal-overlay" onClick={closeModal}>
          <div className="ss-modal" onClick={(e) => e.stopPropagation()} style={{ 
            width: '80vw', 
            maxWidth: '1000px', 
            height: '95vh', 
            maxHeight: '900px',
            overflow: 'auto',
            minHeight: '600px'
          }}>
            <button className="ss-modal-close" onClick={closeModal}>×</button>
            <div className="ss-modal-content" style={{ height: '100%', overflowY: 'auto' }}>
              
              {/* Debug info */}
              {(() => { console.log('🎥 Video URL Debug:', { videoUrl: selectedStory.videoUrl, youtubeUrl: selectedStory.youtubeUrl, isYouTube: selectedStory.youtubeUrl?.includes('youtube.com') || selectedStory.youtubeUrl?.includes('youtu.be') }); return null; })()}
              <div className="ss-modal-video" style={{ marginBottom: '20px' }}>
                {/* Priority: Uploaded video first, then YouTube */}
                {selectedStory.videoUrl ? (
                  <video 
                    controls 
                    autoPlay
                    className="ss-modal-video-player"
                    style={{ width: '100%', height: 'auto', aspectRatio: '16/9', borderRadius: '8px', display: 'block' }}
                  >
                    <source src={selectedStory.videoUrl.startsWith('/uploads') ? `http://localhost:4000${selectedStory.videoUrl}` : selectedStory.videoUrl} />
                    Your browser does not support the video tag.
                  </video>
                ) : selectedStory.youtubeUrl && (selectedStory.youtubeUrl.includes('youtube.com') || selectedStory.youtubeUrl.includes('youtu.be')) ? (
                  <div style={{ 
                    width: '100%', 
                    aspectRatio: '16/9',
                    background: '#000', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: '8px'
                  }}>
                    <div style={{ textAlign: 'center', color: 'white' }}>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style={{ marginBottom: '16px' }}>
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <p style={{ margin: 0, fontSize: '16px' }}>YouTube Video</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.8 }}>Click "Watch on YouTube" below to view</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    width: '100%', 
                    aspectRatio: '16/9',
                    background: '#f3f4f6', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: '8px',
                    color: '#6b7280'
                  }}>
                    <p>No video available</p>
                  </div>
                )}
              </div>
              <div className="ss-modal-body">
                <h2 className="ss-modal-title">{selectedStory.title}</h2>
                <div className="ss-modal-story" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <h3>Story</h3>
                  <p style={{ whiteSpace: 'pre-wrap', overflowY: 'auto', maxHeight: '60vh', padding: '8px 0' }}>{selectedStory.fullStory}</p>
                </div>
                <div className="ss-modal-meta">
                  <span className="ss-modal-published">Created: {selectedStory.publishedDate}</span>
                </div>
                {selectedStory.youtubeUrl && (selectedStory.youtubeUrl.includes('youtube.com') || selectedStory.youtubeUrl.includes('youtu.be')) && (
                  <div className="ss-modal-actions" style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <a 
                      href={selectedStory.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        background: '#ff0000',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Story Modal */}
      {showAddModal && (
        <div className="proj-add-modal-overlay" onClick={() => {
          setShowAddModal(false);
          setIsEditMode(false);
          setEditingStory(null);
        }}>
          <div className="proj-add-modal" onClick={(e) => e.stopPropagation()}>
            <button className="proj-add-modal-close" onClick={() => {
              setShowAddModal(false);
              setIsEditMode(false);
              setEditingStory(null);
            }}>
              ×
            </button>
            <div className="proj-add-modal-content">
              <div className="proj-add-modal-header">
                <h2>{isEditMode ? 'Edit Success Story' : 'Add New Success Story'}</h2>
                <p>{isEditMode ? 'Update the success story details' : 'Create a new inspiring success story'}</p>
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
                  </div>

                  <div className="proj-add-form-group">
                    <label>Video Upload *</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            setNewStory({ ...newStory, videoUrl: result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
                      Upload MP4, WebM, or other video formats
                    </p>
                  </div>

                    <div className="proj-add-form-group">
                      <label>YouTube URL</label>
                      <input
                        type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                        value={newStory.youtubeUrl}
                        onChange={(e) => setNewStory({ ...newStory, youtubeUrl: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
                        Alternative to video upload - paste YouTube URL here
                    </p>
                    </div>

                    <div className="proj-add-form-group">
                    <label>Poster Image *</label>
                      <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Compress image to reduce data URL size (like projects)
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d');
                          const img = new Image();
                          
                          img.onload = () => {
                            // Resize to max 400px width while maintaining aspect ratio
                            const maxWidth = 400;
                            const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
                            canvas.width = img.width * ratio;
                            canvas.height = img.height * ratio;
                            
                            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                            
                            // Convert to data URL with 80% quality to reduce size
                            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                            setNewStory({ ...newStory, imageUrl: dataUrl, poster: dataUrl });
                          };
                          
                          const reader = new FileReader();
                          reader.onload = () => {
                            img.src = reader.result as string;
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {newStory.poster && (
                      <img src={newStory.poster} alt="Poster preview" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
                    )}
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
                  {isEditMode ? 'Update Story' : 'Add Story'}
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


