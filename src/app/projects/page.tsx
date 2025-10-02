"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

type Project = {
  id: string;
  name: string;
  description: string;
  stage: 'Idea' | 'MVP' | 'Early Stage' | 'Growth' | 'Scale' | 'Mature';
  industry: string;
  image: string;
  founded: string;
  employees: string;
  revenue: string;
  tags: string[];
  website?: string;
  linkedin?: string;
  seeking: string[];
  status: 'Active' | 'Paused' | 'Completed' | 'Archived';
  lastUpdated: string;
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

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';

function useProjects(): Project[] {
  const [items, setItems] = React.useState<Project[]>([]);
  React.useEffect(() => {
    fetch(`${API}/projects/cards`, { credentials: 'include' })
      .then(r => r.json())
      .then((data) => setItems((data?.data || []) as Project[]))
      .catch(() => setItems([]));
  }, []);
  return items;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const projects = useProjects();
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedStage, setSelectedStage] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  const filtered = projects.filter((project) => {
    const matchesQuery = project.name.toLowerCase().includes(query.toLowerCase()) || 
                        project.description.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || project.industry === selectedIndustry;
    const matchesStage = selectedStage === "" || project.stage === selectedStage;
    const matchesStatus = selectedStatus === "" || project.status === selectedStatus;
    return matchesQuery && matchesIndustry && matchesStage && matchesStatus;
  });

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const openAddModal = () => {
    router.push('/projects/add');
  };

  const stageOptions = [
    "Idea",
    "MVP", 
    "Early Stage",
    "Growth",
    "Scale",
    "Mature"
  ];

  const statusOptions = [
    "Active",
    "Paused",
    "Completed",
    "Archived"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Paused': return '#f59e0b';
      case 'Completed': return '#3b82f6';
      case 'Archived': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="proj-wrap">
      <div className="proj-head">
        <div className="proj-head-content">
          <h2>My Projects</h2>
          <p>Manage your startup projects and track their progress</p>
        </div>
        <button className="proj-add-btn" onClick={openAddModal}>
          <span>+</span>
          Add Project
        </button>
      </div>
      
      <div className="proj-toolbar">
        <div className="proj-filters">
          <input
            className="proj-search"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="proj-industry-filter"
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
            className="proj-stage-filter"
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
          >
            <option value="">All Stages</option>
            {stageOptions.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          <select
            className="proj-status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="proj-grid">
        {filtered.map((project) => (
          <div key={project.id} className="proj-card" onClick={() => openModal(project)}>
            <div className="proj-card-header">
              <div className="proj-image">
                <img src={project.image} alt={project.name} />
                <div className="proj-industry-overlay">{project.industry}</div>
                <div className="proj-status-badge" style={{ backgroundColor: getStatusColor(project.status) }}>
                  {project.status}
                </div>
              </div>
            </div>
            
            <div className="proj-card-body">
              <h3 className="proj-title">{project.name}</h3>
              <p className="proj-description">{project.description}</p>
              
              <div className="proj-meta-simple">
                <div className="proj-meta-item">
                  <span className="proj-meta-label">Stage:</span>
                  <span className="proj-meta-value">{project.stage}</span>
                </div>
                <div className="proj-meta-item">
                  <span className="proj-meta-label">Revenue:</span>
                  <span className="proj-meta-value">{project.revenue}</span>
                </div>
              </div>

              <div className="proj-tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="proj-tag">{tag}</span>
                ))}
                {project.tags.length > 3 && (
                  <span className="proj-tag">+{project.tags.length - 3} more</span>
                )}
              </div>
            </div>

            <div className="proj-card-footer">
              <div className="proj-footer-left">
                <span className="proj-last-updated">Updated: {formatDate(project.lastUpdated)}</span>
              </div>
              <div className="proj-footer-right">
                <button className="proj-edit-btn">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="proj-modal-overlay" onClick={closeModal}>
          <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
            <button className="proj-modal-close" onClick={closeModal}>×</button>
            <div className="proj-modal-content">
              <div className="proj-modal-header">
                <div className="proj-modal-image">
                  <img src={selectedProject.image} alt={selectedProject.name} />
                  <div className="proj-modal-industry-overlay">{selectedProject.industry}</div>
                  <div className="proj-modal-status-badge" style={{ backgroundColor: getStatusColor(selectedProject.status) }}>
                    {selectedProject.status}
                  </div>
                </div>
              </div>
              
              <div className="proj-modal-body">
                <div className="proj-modal-header-info">
                  <h2 className="proj-modal-title">{selectedProject.name}</h2>
                </div>
                
                <p className="proj-modal-description">{selectedProject.description}</p>
                
                <div className="proj-modal-details">
                  <div className="proj-modal-section">
                    <h3>Project Details</h3>
                    <div className="proj-modal-meta">
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Stage:</span>
                        <span className="proj-modal-meta-value">{selectedProject.stage}</span>
                      </div>
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Founded:</span>
                        <span className="proj-modal-meta-value">{selectedProject.founded}</span>
                      </div>
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Employees:</span>
                        <span className="proj-modal-meta-value">{selectedProject.employees}</span>
                      </div>
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Revenue:</span>
                        <span className="proj-modal-meta-value">{selectedProject.revenue}</span>
                      </div>
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Industry:</span>
                        <span className="proj-modal-meta-value">{selectedProject.industry}</span>
                      </div>
                      <div className="proj-modal-meta-item">
                        <span className="proj-modal-meta-label">Last Updated:</span>
                        <span className="proj-modal-meta-value">{formatDate(selectedProject.lastUpdated)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="proj-modal-section">
                    <h3>Focus Areas</h3>
                    <div className="proj-modal-tags">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="proj-modal-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="proj-modal-section">
                    <h3>Currently Seeking</h3>
                    <div className="proj-modal-seeking">
                      {selectedProject.seeking.map((item) => (
                        <span key={item} className="proj-modal-seeking-item">{item}</span>
                      ))}
                    </div>
                  </div>

                  <div className="proj-modal-section">
                    <h3>Actions</h3>
                    <div className="proj-modal-links">
                      <button className="proj-modal-link proj-edit-btn-modal">Edit Project</button>
                      <button className="proj-modal-link proj-delete-btn">Delete</button>
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


