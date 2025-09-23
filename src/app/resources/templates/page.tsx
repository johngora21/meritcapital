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
    </div>
  );
}
