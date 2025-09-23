"use client";
import React, { useState } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Video = {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  completed: boolean;
  videoUrl: string;
  instructor: string;
  views: number;
};

type Module = {
  id: string;
  title: string;
  description: string;
  videos: Video[];
};

type Program = {
  id: string;
  name: string;
  description: string;
  duration: string;
  organization: string;
  imageUrl: string;
  enrolled: boolean;
  progress: number;
  modules: Module[];
};

// Sample program data with video modules
const programData: Program = {
  id: 'startup-accelerator',
  name: 'Startup Accelerator Program',
  description: '12-week intensive program covering all aspects of building a successful startup',
  duration: '12 weeks',
  organization: 'Merit Capital Academy',
  imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop',
  enrolled: true,
  progress: 35,
  modules: [
    {
      id: 'module1',
      title: 'Business Model Canvas',
      description: 'Learn how to create and validate your business model',
      videos: [
        {
          id: 'video1',
          title: 'Introduction to Business Model Canvas',
          description: 'Understanding the 9 building blocks of a successful business model',
          duration: '15:30',
          thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80&auto=format&fit=crop',
          completed: true,
          videoUrl: '#',
          instructor: 'Sarah Johnson',
          views: 1250
        },
        {
          id: 'video2',
          title: 'Value Proposition Design',
          description: 'How to create compelling value propositions that resonate with customers',
          duration: '22:45',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format&fit=crop',
          completed: true,
          videoUrl: '#',
          instructor: 'Mike Chen',
          views: 980
        },
        {
          id: 'video3',
          title: 'Customer Segments & Channels',
          description: 'Identifying your target customers and reaching them effectively',
          duration: '18:20',
          thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80&auto=format&fit=crop',
          completed: false,
          videoUrl: '#',
          instructor: 'Lisa Wang',
          views: 756
        }
      ]
    },
    {
      id: 'module2',
      title: 'Market Research & Validation',
      description: 'Conduct effective market research and validate your business idea',
      videos: [
        {
          id: 'video4',
          title: 'Market Research Fundamentals',
          description: 'Essential techniques for understanding your target market',
          duration: '25:10',
          thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80&auto=format&fit=crop',
          completed: false,
          videoUrl: '#',
          instructor: 'David Kim',
          views: 892
        },
        {
          id: 'video5',
          title: 'Customer Interview Techniques',
          description: 'How to conduct effective customer interviews and gather insights',
          duration: '20:35',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80&auto=format&fit=crop',
          completed: false,
          videoUrl: '#',
          instructor: 'Alex Morgan',
          views: 634
        }
      ]
    },
    {
      id: 'module3',
      title: 'Financial Planning & Projections',
      description: 'Create financial models and understand key startup metrics',
      videos: [
        {
          id: 'video6',
          title: 'Financial Modeling Basics',
          description: 'Building your first financial model from scratch',
          duration: '32:15',
          thumbnail: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=400&q=80&auto=format&fit=crop',
          completed: false,
          videoUrl: '#',
          instructor: 'Jennifer Lee',
          views: 445
        },
        {
          id: 'video7',
          title: 'Key Metrics & KPIs',
          description: 'Understanding the metrics that matter for your startup',
          duration: '28:40',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format&fit=crop',
          completed: false,
          videoUrl: '#',
          instructor: 'Robert Taylor',
          views: 312
        }
      ]
    }
  ]
};

export default function LearnPage() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="learn-page">
      {/* Header */}
      <div className="learn-header">
        <button 
          className="learn-back-btn" 
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="learn-header-content">
          <div className="learn-header-image">
            <img src={programData.imageUrl} alt={programData.name} />
          </div>
          <div className="learn-header-info">
            <h1 className="learn-title">{programData.name}</h1>
            <p className="learn-description">{programData.description}</p>
            <div className="learn-meta">
              <span className="learn-organization">By {programData.organization}</span>
              <span className="learn-duration">{programData.duration}</span>
            </div>
            <div className="learn-progress">
              <div className="learn-progress-bar">
                <div 
                  className="learn-progress-fill" 
                  style={{ width: `${programData.progress}%` }}
                ></div>
              </div>
              <span className="learn-progress-text">{programData.progress}% Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modules */}
      <div className="learn-content">
        {programData.modules.map((module) => (
          <div key={module.id} className="learn-module">
            <div className="learn-module-header">
              <h2 className="learn-module-title">{module.title}</h2>
              <p className="learn-module-description">{module.description}</p>
            </div>
            <div className="learn-videos-grid">
              {module.videos.map((video) => (
                <div 
                  key={video.id} 
                  className={`learn-video-card ${video.completed ? 'completed' : ''}`}
                  onClick={() => openVideoModal(video)}
                >
                  <div className="learn-video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="learn-video-overlay">
                      <div className="learn-video-play">
                        <Play size={24} />
                      </div>
                    </div>
                    <div className="learn-video-duration">
                      <Clock size={12} />
                      {video.duration}
                    </div>
                    {video.completed && (
                      <div className="learn-video-completed">
                        <CheckCircle size={16} />
                      </div>
                    )}
                  </div>
                  <div className="learn-video-content">
                    <h3 className="learn-video-title">{video.title}</h3>
                    <p className="learn-video-description">{video.description}</p>
                    <div className="learn-video-meta">
                      <span className="learn-video-instructor">{video.instructor}</span>
                      <span className="learn-video-views">{video.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="learn-modal-overlay" onClick={closeVideoModal}>
          <div className="learn-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="learn-modal-close" 
              onClick={closeVideoModal}
            >
              ×
            </button>
            <div className="learn-modal-content">
              <div className="learn-modal-video">
                <div className="learn-video-player">
                  <img src={selectedVideo.thumbnail} alt={selectedVideo.title} />
                  <div className="learn-video-play-overlay">
                    <div className="learn-video-play-button">
                      <Play size={48} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="learn-modal-body">
                <h2 className="learn-modal-title">{selectedVideo.title}</h2>
                <p className="learn-modal-description">{selectedVideo.description}</p>
                <div className="learn-modal-meta">
                  <span className="learn-modal-instructor">Instructor: {selectedVideo.instructor}</span>
                  <span className="learn-modal-duration">
                    <Clock size={16} />
                    {selectedVideo.duration}
                  </span>
                  <span className="learn-modal-views">{selectedVideo.views} views</span>
                </div>
                <div className="learn-modal-actions">
                  <button className="learn-watch-btn">
                    {selectedVideo.completed ? 'Watch Again' : 'Start Watching'}
                  </button>
                  {!selectedVideo.completed && (
                    <button className="learn-mark-complete-btn">
                      Mark as Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
