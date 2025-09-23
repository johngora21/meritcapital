'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ResourceTemplate = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'template' | 'canvas' | 'guide' | 'checklist';
  imageUrl: string;
  downloads: number;
  fileSize: string;
  tags: string[];
};

const resourceTemplates: ResourceTemplate[] = [
  {
    id: '1',
    title: 'Business Model Canvas',
    description: 'A strategic management template for developing new or documenting existing business models.',
    category: 'Strategy',
    type: 'canvas',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    downloads: 2450,
    fileSize: '2.1 MB',
    tags: ['Strategy', 'Business Model', 'Planning']
  },
  {
    id: '2',
    title: 'Lean Canvas Template',
    description: 'A one-page business plan template that helps you deconstruct your idea into its key assumptions.',
    category: 'Strategy',
    type: 'canvas',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop',
    downloads: 1890,
    fileSize: '1.8 MB',
    tags: ['Lean Startup', 'MVP', 'Validation']
  },
  {
    id: '3',
    title: 'Pitch Deck Template',
    description: 'Professional pitch deck template with 15 slides covering all essential investor presentation elements.',
    category: 'Pitching',
    type: 'template',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&auto=format&fit=crop',
    downloads: 3200,
    fileSize: '5.2 MB',
    tags: ['Pitching', 'Investors', 'Presentation']
  },
  {
    id: '4',
    title: 'Financial Projections Template',
    description: 'Excel template for creating 3-year financial projections including P&L, cash flow, and balance sheet.',
    category: 'Finance',
    type: 'template',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=1200&q=80&auto=format&fit=crop',
    downloads: 1780,
    fileSize: '3.4 MB',
    tags: ['Finance', 'Projections', 'Excel']
  },
  {
    id: '5',
    title: 'Customer Journey Map',
    description: 'Template to map out customer touchpoints and experiences throughout their journey with your product.',
    category: 'Marketing',
    type: 'canvas',
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80&auto=format&fit=crop',
    downloads: 1420,
    fileSize: '1.5 MB',
    tags: ['Customer Experience', 'UX', 'Mapping']
  },
  {
    id: '6',
    title: 'SWOT Analysis Template',
    description: 'Comprehensive SWOT analysis template to evaluate strengths, weaknesses, opportunities, and threats.',
    category: 'Strategy',
    type: 'template',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&auto=format&fit=crop',
    downloads: 2100,
    fileSize: '1.2 MB',
    tags: ['Analysis', 'Strategy', 'Planning']
  },
  {
    id: '7',
    title: 'Startup Checklist',
    description: 'Comprehensive checklist covering legal, financial, operational, and marketing tasks for new startups.',
    category: 'Operations',
    type: 'checklist',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    downloads: 1650,
    fileSize: '0.8 MB',
    tags: ['Checklist', 'Startup', 'Tasks']
  },
  {
    id: '8',
    title: 'Value Proposition Canvas',
    description: 'Template to design products and services that customers actually want and need.',
    category: 'Strategy',
    type: 'canvas',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop',
    downloads: 1980,
    fileSize: '2.3 MB',
    tags: ['Value Proposition', 'Product Design', 'Customer']
  },
  {
    id: '9',
    title: 'Marketing Plan Template',
    description: 'Complete marketing plan template including strategy, tactics, budget, and timeline.',
    category: 'Marketing',
    type: 'template',
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80&auto=format&fit=crop',
    downloads: 2250,
    fileSize: '4.1 MB',
    tags: ['Marketing', 'Strategy', 'Planning']
  },
  {
    id: '10',
    title: 'Team Building Guide',
    description: 'Step-by-step guide for building and managing high-performing startup teams.',
    category: 'Operations',
    type: 'guide',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop',
    downloads: 1350,
    fileSize: '3.2 MB',
    tags: ['Team Building', 'Management', 'HR']
  },
  {
    id: '11',
    title: 'Legal Compliance Checklist',
    description: 'Essential legal requirements checklist for startups including registrations, licenses, and contracts.',
    category: 'Legal',
    type: 'checklist',
    imageUrl: 'https://images.unsplash.com/photo-1555371363-3e3f0d5d6c7a?w=1200&q=80&auto=format&fit=crop',
    downloads: 1120,
    fileSize: '1.1 MB',
    tags: ['Legal', 'Compliance', 'Startup']
  },
  {
    id: '12',
    title: 'Product Roadmap Template',
    description: 'Visual template for planning and communicating product development roadmap and milestones.',
    category: 'Product',
    type: 'template',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&auto=format&fit=crop',
    downloads: 1890,
    fileSize: '2.8 MB',
    tags: ['Product', 'Roadmap', 'Planning']
  }
];


export default function ResourceTemplatesPage() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    description: '',
    category: '',
    type: 'template' as 'template' | 'canvas' | 'guide' | 'checklist',
    imageUrl: '',
    downloads: 0,
    fileSize: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !newTemplate.tags.includes(newTag.trim())) {
      setNewTemplate({ ...newTemplate, tags: [...newTemplate.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewTemplate({ ...newTemplate, tags: newTemplate.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleAddTemplate = async () => {
    try {
      const response = await fetch('/api/v1/resources/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newTemplate)
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewTemplate({
          title: '',
          description: '',
          category: '',
          type: 'template',
          imageUrl: '',
          downloads: 0,
          fileSize: '',
          tags: []
        });
        // Refresh the page or update the list
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding template:', error);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'template': return '#3b82f6';
      case 'canvas': return '#8b5cf6';
      case 'guide': return '#10b981';
      case 'checklist': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <>
      <style jsx>{`
        .rt-head-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }
        .rt-head-content > div:first-child {
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
        .rc-tag-input-group {
          display: flex;
          gap: 8px;
          max-width: 400px;
        }
        .rc-tag-input-group input {
          flex: 1;
        }
        .rc-add-tag-btn {
          background: var(--mc-sidebar-bg);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .rc-add-tag-btn:hover {
          background: var(--mc-sidebar-bg-hover);
          transform: translateY(-1px);
        }
        .rc-tags-display {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .rc-tag-item {
          background: #f3f4f6;
          color: #374151;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .rc-remove-tag {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
        }
        .rc-remove-tag:hover {
          color: #ef4444;
        }
      `}</style>
      <div className="rt-wrap">
      <button 
        className="rt-back-btn"
        onClick={() => router.push('/resources')}
      >
        ← Back
      </button>
      
      <div className="rt-head">
        <div className="rt-head-content">
          <div>
            <h1 className="rt-title">Resource Templates</h1>
            <p className="rt-subtitle">Download templates, canvases, guides, and checklists to accelerate your startup journey</p>
          </div>
          <button
            className="proj-add-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span>+</span> Add Template
          </button>
        </div>
      </div>

      <div className="rt-grid">
        {resourceTemplates.map((template) => (
          <div key={template.id} className="rt-card">
            <div className="rt-card-header">
              <div className="rt-image">
                <img src={template.imageUrl} alt={template.title} />
                <div className="rt-type-badge" style={{ backgroundColor: getTypeColor(template.type) }}>
                  {template.type.charAt(0).toUpperCase() + template.type.slice(1)}
                </div>
              </div>
            </div>
            <div className="rt-card-body">
              <h3 className="rt-title">{template.title}</h3>
              <p className="rt-description">{template.description}</p>
              <div className="rt-tags">
                {template.tags.map((tag, index) => (
                  <span key={index} className="rt-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="rt-card-footer">
              <div className="rt-footer-left">
                <div className="rt-meta">
                  <span className="rt-downloads">{template.downloads.toLocaleString()} downloads</span>
                  <span className="rt-size">{template.fileSize}</span>
                </div>
              </div>
              <div className="rt-footer-right">
                <button className="rt-download-btn">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Template Modal */}
      {showAddModal && (
        <div className="proj-add-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="proj-add-modal" onClick={(e) => e.stopPropagation()}>
            <button className="proj-add-modal-close" onClick={() => setShowAddModal(false)}>
              ×
            </button>
            <div className="proj-add-modal-content">
              <div className="proj-add-modal-header">
                <h2>Add New Template</h2>
                <p>Create a new template for the resource library</p>
              </div>
              <div className="proj-add-modal-body">
                <form className="proj-add-form">
                  <div className="proj-add-form-group">
                    <label>Template Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., Business Plan Template"
                      value={newTemplate.title}
                      onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                    />
                  </div>

                  <div className="proj-add-form-group">
                    <label>Description *</label>
                    <textarea
                      placeholder="Brief description of the template"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="proj-add-form-row">
                    <div className="proj-add-form-group">
                      <label>Category *</label>
                      <input
                        type="text"
                        placeholder="e.g., Strategy, Finance, Marketing"
                        value={newTemplate.category}
                        onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                      />
                    </div>
                    <div className="proj-add-form-group">
                      <label>Type *</label>
                      <select
                        value={newTemplate.type}
                        onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value as any })}
                      >
                        <option value="template">Template</option>
                        <option value="canvas">Canvas</option>
                        <option value="guide">Guide</option>
                        <option value="checklist">Checklist</option>
                      </select>
                    </div>
                  </div>

                  <div className="proj-add-form-row">
                    <div className="proj-add-form-group">
                      <label>File Size</label>
                      <input
                        type="text"
                        placeholder="e.g., 2.1 MB"
                        value={newTemplate.fileSize}
                        onChange={(e) => setNewTemplate({ ...newTemplate, fileSize: e.target.value })}
                      />
                    </div>
                    <div className="proj-add-form-group">
                      <label>Downloads</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={newTemplate.downloads}
                        onChange={(e) => setNewTemplate({ ...newTemplate, downloads: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="proj-add-form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={newTemplate.imageUrl}
                      onChange={(e) => setNewTemplate({ ...newTemplate, imageUrl: e.target.value })}
                    />
                  </div>

                  <div className="proj-add-form-group">
                    <label>Tags</label>
                    <div className="rc-tag-input-group">
                      <input
                        type="text"
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <button type="button" className="rc-add-tag-btn" onClick={addTag}>
                        Add
                      </button>
                    </div>
                    {newTemplate.tags.length > 0 && (
                      <div className="rc-tags-display">
                        {newTemplate.tags.map((tag, index) => (
                          <div key={index} className="rc-tag-item">
                            {tag}
                            <button
                              type="button"
                              className="rc-remove-tag"
                              onClick={() => removeTag(tag)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
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
                  onClick={handleAddTemplate}
                >
                  Add Template
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
