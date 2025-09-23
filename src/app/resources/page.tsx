"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components';

type ResourceCategory = { name: string; imageUrl: string };
type Program = { name: string; description: string; duration: string; startDate: string; endDate: string; organization: string; imageUrl: string; enrolled: boolean; closed: boolean; tags: string[]; industry: string };
type Lesson = { title: string; instructor: string; duration: string; imageUrl: string; views: number; industry: string; description: string; tags: string[] };

const resourceCategories: ResourceCategory[] = [
  { name: 'Finance and Fundraising', imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=1200&q=80&auto=format&fit=crop' },
  { name: 'Marketing & Sales', imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80&auto=format&fit=crop' },
  { name: 'Technology & Innovation', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&auto=format&fit=crop' },
  { name: 'Leadership & Personal Development', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&auto=format&fit=crop' },
  { name: 'Impact & Sustainability', imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80&auto=format&fit=crop' },
  { name: 'Legal & Compliance', imageUrl: 'https://images.unsplash.com/photo-1555371363-3e3f0d5d6c7a?w=1200&q=80&auto=format&fit=crop' },
];

const programs: Program[] = [
  { name: 'Startup Accelerator Program', description: '12-week intensive program covering all aspects of building a successful startup', duration: '12 weeks', startDate: 'March 1, 2024', endDate: 'May 24, 2024', organization: 'Merit Capital Academy', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop', enrolled: false, closed: false, tags: ['Business', 'Strategy', 'Growth'], industry: 'Digital Technology' },
  { name: 'Financial Management Masterclass', description: 'Learn essential financial skills for entrepreneurs and startup founders', duration: '8 weeks', startDate: 'February 15, 2024', endDate: 'April 11, 2024', organization: 'Finance Institute', imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=1200&q=80&auto=format&fit=crop', enrolled: true, closed: false, tags: ['Finance', 'Accounting', 'Funding'], industry: 'Finance' },
  { name: 'Digital Marketing Bootcamp', description: 'Master digital marketing strategies to grow your startup', duration: '6 weeks', startDate: 'January 8, 2024', endDate: 'February 16, 2024', organization: 'Marketing Pro Academy', imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80&auto=format&fit=crop', enrolled: false, closed: true, tags: ['Marketing', 'Digital', 'Growth'], industry: 'Digital Technology' },
  { name: 'Leadership Development Program', description: 'Build essential leadership skills for startup success', duration: '10 weeks', startDate: 'April 1, 2024', endDate: 'June 7, 2024', organization: 'Leadership Institute', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&auto=format&fit=crop', enrolled: false, closed: false, tags: ['Leadership', 'Management', 'Team'], industry: 'Education' },
  { name: 'Tech Innovation Workshop', description: 'Explore cutting-edge technologies and their business applications', duration: '4 weeks', startDate: 'March 15, 2024', endDate: 'April 12, 2024', organization: 'Tech Innovation Hub', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&auto=format&fit=crop', enrolled: true, closed: false, tags: ['Technology', 'Innovation', 'AI'], industry: 'Digital Technology' },
  { name: 'Impact Entrepreneurship', description: 'Learn to build sustainable and socially impactful businesses', duration: '8 weeks', startDate: 'February 1, 2024', endDate: 'March 28, 2024', organization: 'Impact Ventures', imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80&auto=format&fit=crop', enrolled: false, closed: true, tags: ['Sustainability', 'Social Impact', 'ESG'], industry: 'Impact & Sustainability' },
  { name: 'AgriTech Innovation Program', description: 'Program focused on agricultural technology and sustainable farming practices', duration: '10 weeks', startDate: 'May 1, 2024', endDate: 'July 10, 2024', organization: 'AgriTech Institute', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop', enrolled: false, closed: false, tags: ['Agriculture', 'Technology', 'Sustainability'], industry: 'Agriculture' },
  { name: 'HealthTech Accelerator', description: 'Accelerator program for healthcare technology startups', duration: '14 weeks', startDate: 'June 1, 2024', endDate: 'September 15, 2024', organization: 'Health Innovation Lab', imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&q=80&auto=format&fit=crop', enrolled: false, closed: false, tags: ['Healthcare', 'Technology', 'Innovation'], industry: 'Health' },
  { name: 'Clean Energy Ventures', description: 'Program for startups in renewable energy and clean technology', duration: '12 weeks', startDate: 'July 1, 2024', endDate: 'September 25, 2024', organization: 'Energy Innovation Center', imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80&auto=format&fit=crop', enrolled: false, closed: false, tags: ['Energy', 'Sustainability', 'Clean Tech'], industry: 'Energy' },
];

const lessons: Lesson[] = [
  { title: 'Pitching Your Startup to Investors', instructor: 'Sarah Johnson', duration: '45 min', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&auto=format&fit=crop', views: 1250, industry: 'Finance', description: 'Learn how to craft compelling pitches that capture investor attention and secure funding for your startup.', tags: ['Pitching', 'Investors', 'Funding'] },
  { title: 'Building a Strong Team Culture', instructor: 'Michael Chen', duration: '38 min', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop', views: 980, industry: 'Education', description: 'Discover strategies for creating an inclusive, productive workplace culture that drives team success.', tags: ['Team Building', 'Culture', 'Leadership'] },
  { title: 'Digital Marketing Fundamentals', instructor: 'Emma Rodriguez', duration: '52 min', imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80&auto=format&fit=crop', views: 2100, industry: 'Digital Technology', description: 'Master the essential digital marketing strategies to grow your startup and reach your target audience.', tags: ['Marketing', 'Digital', 'Growth'] },
  { title: 'Financial Planning for Startups', instructor: 'David Kim', duration: '41 min', imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=1200&q=80&auto=format&fit=crop', views: 1750, industry: 'Finance', description: 'Essential financial planning and management skills every entrepreneur needs to build a sustainable business.', tags: ['Finance', 'Planning', 'Management'] },
  { title: 'Legal Essentials for Entrepreneurs', instructor: 'Lisa Thompson', duration: '35 min', imageUrl: 'https://images.unsplash.com/photo-1555371363-3e3f0d5d6c7a?w=1200&q=80&auto=format&fit=crop', views: 890, industry: 'Education', description: 'Navigate the legal landscape of entrepreneurship with key insights on contracts, IP, and compliance.', tags: ['Legal', 'Compliance', 'Contracts'] },
  { title: 'Scaling Your Business', instructor: 'Alex Morgan', duration: '48 min', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&auto=format&fit=crop', views: 1420, industry: 'Digital Technology', description: 'Proven strategies for scaling your startup from early stage to market leader.', tags: ['Scaling', 'Growth', 'Strategy'] },
  { title: 'AgriTech Innovation Trends', instructor: 'Maria Garcia', duration: '42 min', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop', views: 756, industry: 'Agriculture', description: 'Explore the latest agricultural technology trends and opportunities for innovation in farming.', tags: ['Agriculture', 'Technology', 'Innovation'] },
  { title: 'Healthcare Technology Solutions', instructor: 'Dr. James Wilson', duration: '38 min', imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&q=80&auto=format&fit=crop', views: 634, industry: 'Health', description: 'Learn about emerging healthcare technologies and how to build solutions that improve patient care.', tags: ['Healthcare', 'Technology', 'Innovation'] },
  { title: 'Sustainable Business Practices', instructor: 'Elena Rodriguez', duration: '44 min', imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80&auto=format&fit=crop', views: 892, industry: 'Impact & Sustainability', description: 'Build a business that creates positive environmental and social impact while remaining profitable.', tags: ['Sustainability', 'Impact', 'ESG'] },
  { title: 'Renewable Energy Opportunities', instructor: 'Dr. Robert Green', duration: '40 min', imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80&auto=format&fit=crop', views: 445, industry: 'Energy', description: 'Discover investment opportunities and business models in the growing renewable energy sector.', tags: ['Energy', 'Renewable', 'Investment'] },
];

export default function ResourcesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResource, setNewResource] = useState({
    name: '',
    description: '',
    duration: '',
    startDate: '',
    endDate: '',
    organization: '',
    industry: [] as string[],
    tags: [] as string[],
    type: 'program' as 'program' | 'lesson' | 'template',
    imageUrl: ''
  });
  const [newTag, setNewTag] = useState('');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

  const addTag = () => {
    if (newTag.trim() && !newResource.tags.includes(newTag.trim())) {
      setNewResource({...newResource, tags: [...newResource.tags, newTag.trim()]});
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewResource({...newResource, tags: newResource.tags.filter(tag => tag !== tagToRemove)});
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.rc-dropdown-container')) {
        setShowIndustryDropdown(false);
      }
    };

    if (showIndustryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showIndustryDropdown]);

  const industries = [
    'All Industries',
    'Agriculture',
    'Digital Technology', 
    'Education',
    'Finance',
    'Health',
    'Impact & Sustainability',
    'Energy'
  ];

  const tabs = ['Programs', 'Lessons', 'Resources'];

  const openProgramModal = (program: Program) => {
    setSelectedProgram(program);
    document.body.style.overflow = 'hidden';
  };

  const closeProgramModal = () => {
    setSelectedProgram(null);
    document.body.style.overflow = 'unset';
  };

  const openLessonModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    document.body.style.overflow = 'hidden';
  };

  const closeLessonModal = () => {
    setSelectedLesson(null);
    document.body.style.overflow = 'unset';
  };

  const handleProgramAction = (program: Program) => {
    if (program.closed) return;
    
    if (program.enrolled) {
      // Navigate to learning page for enrolled programs
      router.push(`/resources/learn/${program.name.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      // Open modal for enrollment
      openProgramModal(program);
    }
  };

  // Filter programs based on search and industry
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesIndustry = selectedIndustry === 'All Industries' || program.industry === selectedIndustry;
    
    return matchesSearch && matchesIndustry;
  });

  // Filter lessons based on search and industry
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustry === 'All Industries' || lesson.industry === selectedIndustry;
    
    return matchesSearch && matchesIndustry;
  });

  const handleAddResource = async () => {
    try {
      const resourceData = {
        ...newResource,
        imageUrl: newResource.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop",
        enrolled: false,
        closed: false
      };

      const endpoint = newResource.type === 'program' ? '/api/v1/resources/programs' : '/api/v1/resources/lessons';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(resourceData)
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewResource({
          name: '',
          description: '',
          duration: '',
          startDate: '',
          endDate: '',
          organization: '',
          industry: [],
          tags: [],
          type: 'program' as 'program' | 'lesson' | 'template',
          imageUrl: ''
        });
        setNewTag('');
        // Refresh the page or update the resources list
        window.location.reload();
      } else {
        console.error('Failed to add resource');
      }
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  const renderPrograms = () => (
    <>
      {/* Search and Filters */}
      <div className="rc-toolbar">
        <div className="rc-filters">
          <div className="rc-search">
            <input
              type="text"
              placeholder="Search programs, organizations, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rc-search-input"
            />
          </div>
          <div className="rc-industry-filter">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="rc-industry-select"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rc-grid rc-grid--three">
        {filteredPrograms.map((program) => (
        <div key={program.name} className="rc-card" onClick={() => openProgramModal(program)} style={{ cursor: 'pointer' }}>
          <div className="rc-media" aria-hidden>
            <img
              className="rc-img"
              src={program.imageUrl}
              alt=""
              loading="lazy"
            />
            {program.enrolled && (
              <div className="rc-badge rc-badge--enrolled">Enrolled</div>
            )}
          </div>
          <div className="rc-body">
            <div className="rc-title">{program.name}</div>
            <div className="rc-sub">{program.description}</div>
            <div className="rc-tags">
              {program.tags.map((tag, index) => (
                <span key={index} className="rc-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="rc-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="rc-meta">Duration: {program.duration}</div>
              <button 
                className={program.closed ? 'rc-btn rc-btn--disabled' : (program.enrolled ? 'rc-btn rc-btn--green' : 'rc-btn')}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProgramAction(program);
                }}
              >
                {program.closed ? 'Closed' : (program.enrolled ? 'Continue' : 'Enroll')}
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );

  const renderLessons = () => (
    <>
      {/* Search and Filters */}
      <div className="rc-toolbar">
        <div className="rc-filters">
          <div className="rc-search">
            <input
              type="text"
              placeholder="Search lessons, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rc-search-input"
            />
          </div>
          <div className="rc-industry-filter">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="rc-industry-select"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rc-grid rc-grid--three">
        {filteredLessons.map((lesson) => (
        <div key={lesson.title} className="rc-card" onClick={() => openLessonModal(lesson)} style={{ cursor: 'pointer' }}>
          <div className="rc-media" aria-hidden>
            <img
              className="rc-img"
              src={lesson.imageUrl}
              alt=""
              loading="lazy"
            />
            <div className="rc-play-overlay">
              <div className="rc-play-icon">▶</div>
            </div>
            <div className="rc-duration-overlay">
              {lesson.duration}
            </div>
          </div>
          <div className="rc-body">
            <div className="rc-title">{lesson.title}</div>
            <div className="rc-sub">By {lesson.instructor}</div>
            <div className="rc-description">{lesson.description}</div>
            <div className="rc-tags">
              {lesson.tags.map((tag, index) => (
                <span key={index} className="rc-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="rc-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="rc-meta">{lesson.views.toLocaleString()} views</div>
              <button 
                className="rc-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle watch lesson action
                  console.log('Watch lesson:', lesson.title);
                }}
              >
                Watch
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );

  const renderResources = () => (
    <>
      {/* Search and Filters */}
      <div className="rc-toolbar">
        <div className="rc-filters">
          <div className="rc-search">
            <input
              type="text"
              placeholder="Search resources, categories, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rc-search-input"
            />
          </div>
          <div className="rc-industry-filter">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="rc-industry-select"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="proj-add-btn"
          onClick={() => {
            setNewResource({ ...newResource, type: 'template' });
            setShowAddModal(true);
          }}
        >
          <span>+</span> Add Template
        </button>
      </div>

      <div className="rc-grid rc-grid--three">
        {resourceCategories.map((cat) => (
          <div 
            key={cat.name} 
            className="rc-card" 
            onClick={() => router.push('/resources/templates')}
            style={{ cursor: 'pointer' }}
          >
            <div className="rc-media" aria-hidden>
              <img
                className="rc-img"
                src={cat.imageUrl}
                alt=""
                loading="lazy"
              />
            </div>
            <div className="rc-body">
              <div className="rc-title">{cat.name}</div>
              <div className="rc-sub">Curated guides and templates</div>
            </div>
            <div className="rc-footer">
              <button className="rc-link">View Resources</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <style jsx>{`
        .rc-wrap { display: grid; gap: 24px; padding: 24px; }
        
        .rc-head { 
          display: flex; flex-direction: column; gap: 8px;
          padding-bottom: 16px; border-bottom: 1px solid #e5e7eb; 
        }
        .rc-header-top {
          display: flex; justify-content: flex-end; align-items: center;
          gap: 16px; margin-bottom: 16px;
        }
        .rc-head h2 { margin: 0; font-size: 28px; font-weight: 800; color: #111827; }
        .rc-head p { margin: 0; color: #6b7280; font-size: 14px; }
        
        .rc-toolbar { 
          display: flex; justify-content: space-between; align-items: center; 
          gap: 16px; flex-wrap: wrap; margin-bottom: 20px;
        }
        .rc-filters { display: flex; gap: 12px; flex-wrap: wrap; }
        
        .rc-search, .rc-industry-filter {
          padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;
          font-size: 14px; background: white; min-width: 150px;
        }
        .rc-search:focus, .rc-industry-filter:focus {
          outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .rc-add-btn {
          padding: 10px 20px; background: #3b82f6; color: white; border: none;
          border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px;
          transition: background-color 0.2s;
        }
        .rc-add-btn:hover { background: #2563eb; }
        
        .rc-grid { 
          display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
          gap: 20px; 
        }
        
        .rc-card { 
          background: white; border: 1px solid #e5e7eb; border-radius: 8px;
          overflow: hidden; cursor: pointer; transition: all 0.2s;
        }
        .rc-card:hover { 
          border-color: #3b82f6; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        
        .rc-card-header { position: relative; height: 120px; overflow: hidden; }
        .rc-image { width: 100%; height: 100%; }
        .rc-image img { width: 100%; height: 100%; object-fit: cover; }
        
        .rc-card-body { padding: 16px; }
        .rc-card-title { 
          font-size: 16px; font-weight: 700; color: #111827; 
          margin: 0 0 4px; line-height: 1.3;
        }
        .rc-card-subtitle { 
          color: #6b7280; font-size: 14px; margin: 0 0 8px; 
        }
        .rc-card-description { 
          color: #4b5563; font-size: 13px; line-height: 1.4; 
          margin: 0 0 12px; display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        
        .rc-card-meta { 
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 12px; font-size: 12px; color: #6b7280;
        }
        .rc-card-duration { display: flex; align-items: center; gap: 4px; }
        .rc-card-views { display: flex; align-items: center; gap: 4px; }
        
        .rc-card-footer { 
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 12px; border-top: 1px solid #f3f4f6;
        }
        .rc-card-status { 
          font-weight: 600; font-size: 12px; padding: 4px 8px;
          border-radius: 4px; text-transform: uppercase;
        }
        .rc-card-status.enrolled { 
          background: #dcfce7; color: #166534; 
        }
        .rc-card-status.closed { 
          background: #fee2e2; color: #dc2626; 
        }
        .rc-card-status.open { 
          background: #dbeafe; color: #1d4ed8; 
        }
        .rc-card-industry { 
          background: #f3f4f6; color: #374151; padding: 4px 8px;
          border-radius: 4px; font-size: 12px; font-weight: 500;
        }
        
        .rc-modal-overlay { 
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8); z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        
        .rc-modal { 
          background: white; border-radius: 12px; max-width: 600px; 
          width: 100%; max-height: 80vh; overflow: hidden;
          position: relative;
        }
        
        .rc-modal-close { 
          position: absolute; top: 16px; right: 16px; z-index: 10;
          background: rgba(0,0,0,0.5); color: white; border: none;
          width: 32px; height: 32px; border-radius: 50%; font-size: 18px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .rc-modal-close:hover { background: rgba(0,0,0,0.7); }
        
        .rc-modal-content { padding: 20px; }
        .rc-modal-header { margin-bottom: 12px; }
        .rc-modal-header h2 { 
          margin: 0; font-size: 20px; font-weight: 600; color: #1f2937; 
        }
        
        .rc-modal-body { margin-bottom: 20px; }
        .rc-form { display: flex; flex-direction: column; gap: 16px; }
        .rc-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .rc-form-group { display: flex; flex-direction: column; gap: 6px; }
        .rc-form-group label { 
          font-weight: 600; color: #374151; font-size: 14px; 
        }
        .rc-form-group input, .rc-form-group select, .rc-form-group textarea {
          padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px;
          font-size: 14px; background: white; transition: border-color 0.2s;
        }
        .rc-form-group input:focus, .rc-form-group select:focus, .rc-form-group textarea:focus {
          outline: none; border-color: var(--mc-sidebar-bg); box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
        }
        .rc-form-group textarea { resize: vertical; min-height: 80px; }
        
        .rc-modal-footer { 
          display: flex; justify-content: flex-end; gap: 12px;
          padding-top: 20px; border-top: 1px solid #e5e7eb;
        }
        .rc-modal-btn { 
          padding: 10px 20px; border-radius: 8px; font-weight: 600; 
          cursor: pointer; font-size: 14px; transition: all 0.2s;
        }
        .rc-modal-btn--secondary { 
          background: #f3f4f6; color: #374151; border: 1px solid #d1d5db;
        }
        .rc-modal-btn--secondary:hover { background: #e5e7eb; }
        .rc-modal-btn--primary { 
          background: var(--mc-sidebar-bg); color: white; border: none;
        }
        .rc-modal-btn--primary:hover { 
          background: var(--mc-sidebar-bg-hover); transform: translateY(-1px); 
        }
        
        .rc-tag-input-group {
          display: flex; gap: 8px; margin-bottom: 8px;
        }
        .rc-tag-input-group input {
          flex: 1; margin-bottom: 0;
        }
        .rc-add-tag-btn {
          padding: 10px 16px; background: #10b981; color: white; border: none;
          border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px;
          transition: background-color 0.2s; white-space: nowrap;
        }
        .rc-add-tag-btn:hover {
          background: #059669;
        }
        
        .rc-tags-display {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;
        }
        .rc-tag-item {
          display: inline-flex; align-items: center; gap: 4px;
          background: #f3f4f6; color: #374151; padding: 4px 8px;
          border-radius: 4px; font-size: 12px; font-weight: 500;
        }
        .rc-remove-tag {
          background: none; border: none; color: #6b7280; cursor: pointer;
          font-size: 16px; line-height: 1; padding: 0; margin-left: 4px;
        }
        .rc-remove-tag:hover {
          color: #ef4444;
        }
        
        .rc-image-preview {
          margin-top: 8px;
        }
        .rc-preview-img {
          width: 100px; height: 100px; object-fit: cover; 
          border-radius: 8px; border: 1px solid #d1d5db;
        }
        
        .rc-dropdown-container {
          position: relative; width: 100%;
        }
        .rc-dropdown-trigger {
          width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; 
          border-radius: 8px; background: white; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 14px; color: #374151; transition: border-color 0.2s;
        }
        .rc-dropdown-trigger:hover {
          border-color: #3b82f6;
        }
        .rc-dropdown-trigger:focus {
          outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .rc-dropdown-arrow {
          font-size: 12px; color: #6b7280; transition: transform 0.2s;
        }
        .rc-dropdown-menu {
          position: absolute; top: 100%; left: 0; right: 0; z-index: 10;
          background: white; border: 1px solid #d1d5db; border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); max-height: 200px;
          overflow-y: auto; margin-top: 4px;
        }
        .rc-dropdown-item {
          display: flex; align-items: center; gap: 8px; padding: 8px 12px;
          cursor: pointer; transition: background-color 0.2s;
        }
        .rc-dropdown-item:hover {
          background: #f8fafc;
        }
        .rc-dropdown-item input[type="checkbox"] {
          margin: 0; cursor: pointer; width: 16px; height: 16px;
          accent-color: #3b82f6;
        }
        .rc-dropdown-item span {
          font-size: 14px; color: #374151; cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .rc-header-top { flex-direction: column; align-items: stretch; }
          .rc-toolbar { flex-direction: column; align-items: stretch; }
          .rc-filters { justify-content: stretch; }
          .rc-search, .rc-industry-filter { min-width: auto; }
          .rc-grid { grid-template-columns: 1fr; }
          .rc-form-row { grid-template-columns: 1fr; }
          .rc-industry-checkboxes { grid-template-columns: repeat(2, 1fr); }
          .rc-modal { margin: 10px; max-height: calc(100vh - 20px); }
        }
      `}</style>
      
      <div className="rc-wrap">
      <div className="rc-head">
        <div className="rc-header-top">
          <button
            className="proj-add-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span>+</span> Add Resource
          </button>
        </div>
        <Tabs
          items={tabs}
          activeIndex={activeTab}
          onChange={setActiveTab}
        />
      </div>
      
      {activeTab === 0 && renderPrograms()}
      {activeTab === 1 && renderLessons()}
      {activeTab === 2 && renderResources()}

      {/* Program Modal */}
      {selectedProgram && (
        <div className="rc-modal-overlay" onClick={closeProgramModal}>
          <div className="rc-modal" onClick={(e) => e.stopPropagation()}>
            <button className="rc-modal-close" onClick={closeProgramModal}>
              ×
            </button>
            <div className="rc-modal-image-container">
              <img
                className="rc-modal-image"
                src={selectedProgram.imageUrl}
                alt=""
              />
              {selectedProgram.enrolled && (
                <div className="rc-modal-badge">Enrolled</div>
              )}
              {selectedProgram.closed && (
                <div className="rc-modal-badge rc-modal-badge--closed">Closed</div>
              )}
            </div>
            <div className="rc-modal-content">
              <div className="rc-modal-body">
                <div className="rc-modal-title">{selectedProgram.name}</div>
                <div className="rc-modal-description">{selectedProgram.description}</div>
                
                <div className="rc-modal-details">
                  <div className="rc-modal-section">
                    <h4>Program Details</h4>
                    <div className="rc-modal-meta">
                      <div className="rc-modal-meta-row">
                        <div className="rc-modal-meta-item">
                          <span className="rc-modal-meta-label">Duration:</span>
                          <span className="rc-modal-meta-value">{selectedProgram.duration}</span>
                        </div>
                        <div className="rc-modal-meta-item">
                          <span className="rc-modal-meta-label">Status:</span>
                          <span className="rc-modal-meta-value">
                            {selectedProgram.closed ? 'Closed' : (selectedProgram.enrolled ? 'Enrolled' : 'Open for Enrollment')}
                          </span>
                        </div>
                      </div>
                      <div className="rc-modal-meta-row">
                        <div className="rc-modal-meta-item">
                          <span className="rc-modal-meta-label">Start Date:</span>
                          <span className="rc-modal-meta-value">{selectedProgram.startDate}</span>
                        </div>
                        <div className="rc-modal-meta-item">
                          <span className="rc-modal-meta-label">End Date:</span>
                          <span className="rc-modal-meta-value">{selectedProgram.endDate}</span>
                        </div>
                      </div>
                      <div className="rc-modal-meta-row">
                        <div className="rc-modal-meta-item">
                          <span className="rc-modal-meta-label">Organization:</span>
                          <span className="rc-modal-meta-value">{selectedProgram.organization}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rc-modal-section">
                    <h4>Topics Covered</h4>
                    <div className="rc-modal-tags">
                      {selectedProgram.tags.map((tag, index) => (
                        <span key={index} className="rc-modal-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="rc-modal-section">
                    <h4>What You'll Learn</h4>
                    <ul className="rc-modal-list">
                      <li>Comprehensive understanding of {selectedProgram.name.toLowerCase()}</li>
                      <li>Practical skills and real-world applications</li>
                      <li>Industry best practices and case studies</li>
                      <li>Networking opportunities with fellow entrepreneurs</li>
                      <li>Certificate of completion upon finishing</li>
                    </ul>
                  </div>
                </div>

                <div className="rc-modal-actions">
                  <button 
                    className={selectedProgram.closed ? 'rc-modal-btn rc-modal-btn--disabled' : (selectedProgram.enrolled ? 'rc-modal-btn rc-modal-btn--green' : 'rc-modal-btn')}
                    disabled={selectedProgram.closed}
                    onClick={() => {
                      if (!selectedProgram.closed) {
                        if (selectedProgram.enrolled) {
                          // Navigate to learning page
                          router.push(`/resources/learn/${selectedProgram.name.toLowerCase().replace(/\s+/g, '-')}`);
                        } else {
                          // Handle enrollment logic here
                          console.log('Enroll in program:', selectedProgram.name);
                          // You can add enrollment logic here
                        }
                        closeProgramModal();
                      }
                    }}
                  >
                    {selectedProgram.closed ? 'Closed' : (selectedProgram.enrolled ? 'Continue Program' : 'Enroll Now')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {selectedLesson && (
        <div className="ss-modal-overlay" onClick={closeLessonModal}>
          <div className="ss-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="ss-modal-close" 
              onClick={closeLessonModal}
            >
              ×
            </button>
            <div className="ss-modal-content">
              <div className="ss-modal-video">
                <div className="ss-modal-video-player">
                  <video 
                    controls 
                    poster={selectedLesson.imageUrl}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="ss-modal-body">
                <h2 className="ss-modal-title">{selectedLesson.title}</h2>
                <div className="ss-modal-story">
                  <p><strong>By {selectedLesson.instructor}</strong></p>
                  <p>{selectedLesson.description}</p>
                </div>
                <div className="ss-modal-tags">
                  {selectedLesson.tags.map((tag, index) => (
                    <span key={index} className="ss-modal-tag">{tag}</span>
                  ))}
                </div>
                <div className="ss-modal-meta">
                  <div className="ss-modal-published">
                    Duration: {selectedLesson.duration} • {selectedLesson.views.toLocaleString()} views
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="rc-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="rc-modal" onClick={(e) => e.stopPropagation()}>
            <button className="rc-modal-close" onClick={() => setShowAddModal(false)}>×</button>
            <div className="rc-modal-content">
              <div className="rc-modal-header">
                <h2>Add New Resource</h2>
              </div>
              
              <div className="rc-modal-body">
                <div className="rc-form">
                  <div className="rc-form-group">
                    <label>Resource Type *</label>
                    <select
                      value={newResource.type}
                      onChange={(e) => setNewResource({...newResource, type: e.target.value as 'program' | 'lesson' | 'template'})}
                    >
                      <option value="program">Program</option>
                      <option value="lesson">Lesson</option>
                      <option value="template">Template</option>
                    </select>
                  </div>

                  <div className="rc-form-group">
                    <label>{newResource.type === 'program' ? 'Program Name' : newResource.type === 'lesson' ? 'Lesson Title' : 'Template Title'} *</label>
                    <input
                      type="text"
                      value={newResource.name}
                      onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                      placeholder={newResource.type === 'program' ? 'e.g., Startup Accelerator Program' : newResource.type === 'lesson' ? 'e.g., Pitching Your Startup to Investors' : 'e.g., Business Plan Template'}
                    />
                  </div>

                  {newResource.type !== 'template' && (
                    <div className="rc-form-group">
                      <label>Description *</label>
                      <textarea
                        value={newResource.description}
                        onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                        placeholder="Describe the resource..."
                        rows={3}
                      />
                    </div>
                  )}

                  {newResource.type !== 'template' && (
                    <>
                      <div className="rc-form-row">
                        <div className="rc-form-group">
                          <label>Industry *</label>
                          <div className="rc-dropdown-container">
                            <button
                              type="button"
                              className="rc-dropdown-trigger"
                              onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                            >
                              {newResource.industry.length === 0 
                                ? 'Select Industries' 
                                : `${newResource.industry.length} selected`
                              }
                              <span className="rc-dropdown-arrow">▼</span>
                            </button>
                            {showIndustryDropdown && (
                              <div className="rc-dropdown-menu">
                                {industries.filter(i => i !== 'All Industries').map((industry) => (
                                  <label key={industry} className="rc-dropdown-item">
                                    <input
                                      type="checkbox"
                                      checked={newResource.industry.includes(industry)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setNewResource({
                                            ...newResource, 
                                            industry: [...newResource.industry, industry]
                                          });
                                        } else {
                                          setNewResource({
                                            ...newResource, 
                                            industry: newResource.industry.filter(ind => ind !== industry)
                                          });
                                        }
                                      }}
                                    />
                                    <span>{industry}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rc-form-group">
                          <label>Duration *</label>
                          <input
                            type="text"
                            value={newResource.duration}
                            onChange={(e) => setNewResource({...newResource, duration: e.target.value})}
                            placeholder={newResource.type === 'program' ? 'e.g., 12 weeks' : 'e.g., 45 min'}
                          />
                        </div>
                      </div>

                      {newResource.type === 'program' && (
                        <>
                          <div className="rc-form-row">
                            <div className="rc-form-group">
                              <label>Start Date *</label>
                              <input
                                type="date"
                                value={newResource.startDate}
                                onChange={(e) => setNewResource({...newResource, startDate: e.target.value})}
                              />
                            </div>
                            <div className="rc-form-group">
                              <label>End Date *</label>
                              <input
                                type="date"
                                value={newResource.endDate}
                                onChange={(e) => setNewResource({...newResource, endDate: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="rc-form-group">
                            <label>Organization *</label>
                            <input
                              type="text"
                              value={newResource.organization}
                              onChange={(e) => setNewResource({...newResource, organization: e.target.value})}
                              placeholder="e.g., Merit Capital Academy"
                            />
                          </div>
                        </>
                      )}

                      {newResource.type === 'lesson' && (
                        <div className="rc-form-group">
                          <label>Instructor *</label>
                          <input
                            type="text"
                            value={newResource.organization}
                            onChange={(e) => setNewResource({...newResource, organization: e.target.value})}
                            placeholder="e.g., Sarah Johnson"
                          />
                        </div>
                      )}

                      <div className="rc-form-group">
                        <label>Tags</label>
                        <div className="rc-tag-input-group">
                          <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Enter a tag (e.g., Business)"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          />
                          <button type="button" className="rc-add-tag-btn" onClick={addTag}>
                            Add Tag
                          </button>
                        </div>
                        {newResource.tags.length > 0 && (
                          <div className="rc-tags-display">
                            {newResource.tags.map((tag, index) => (
                              <span key={index} className="rc-tag-item">
                                {tag}
                                <button type="button" className="rc-remove-tag" onClick={() => removeTag(tag)}>×</button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="rc-form-group">
                    <label>Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Convert to base64 for now (in production, you'd upload to a file service)
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setNewResource({...newResource, imageUrl: event.target?.result as string});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {newResource.imageUrl && (
                      <div className="rc-image-preview">
                        <img 
                          src={newResource.imageUrl} 
                          alt="Preview" 
                          className="rc-preview-img"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rc-modal-footer">
                <button 
                  className="rc-modal-btn rc-modal-btn--secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="rc-modal-btn rc-modal-btn--primary"
                  onClick={handleAddResource}
                >
                  Add {newResource.type === 'program' ? 'Program' : newResource.type === 'lesson' ? 'Lesson' : 'Template'}
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


