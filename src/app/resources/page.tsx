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
    <div className="rc-wrap">
      <div className="rc-head">
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
    </div>
  );
}

// removed duplicate default export


