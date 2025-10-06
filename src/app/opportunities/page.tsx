"use client";
import React from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

type Opportunity = {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  type: 'Funding Round' | 'Partnership' | 'Investment' | 'Acquisition' | 'Merger';
  industry: string;
  industries?: string[];
  deadline: string;
  postedDate: string;
  image: string;
  status: 'Open' | 'Closing Soon' | 'Closed';
  amount: string;
  stage: string;
  equity?: string;
  tags: string[];
  investors?: string[];
  eligibility?: string[];
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

const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Series A Funding Round",
    company: "TechStart Africa",
    description: "Seeking $2M Series A funding to scale our fintech platform across East Africa. Strong traction with 50K+ active users and $1M ARR.",
    location: "Nairobi, Kenya",
    type: "Funding Round",
    industry: "Digital Technology",
    deadline: "2024-12-31",
    postedDate: "2024-11-15",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80&auto=format&fit=crop",
    status: "Open",
    amount: "$2,000,000",
    stage: "Series A",
    equity: "15-20%",
    tags: ["Fintech", "Mobile Money", "Financial Inclusion", "Scale-up"],
    investors: ["Acumen Fund", "TLcom Capital", "Partech Partners"]
  },
  {
    id: "2",
    title: "Strategic Partnership Opportunity",
    company: "GreenFields Ltd",
    description: "Seeking strategic partners to expand sustainable farming solutions across Tanzania. Looking for distribution partners and technology collaborators.",
    location: "Dar es Salaam, Tanzania",
    type: "Partnership",
    industry: "Agriculture",
    deadline: "2024-12-20",
    postedDate: "2024-11-10",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80&auto=format&fit=crop",
    status: "Closing Soon",
    amount: "Partnership",
    stage: "Growth Stage",
    tags: ["Agriculture", "Sustainability", "Distribution", "Technology"],
    investors: ["FUNGUO Programme", "IFAD", "GIZ"]
  },
  {
    id: "3",
    title: "Investment Opportunity",
    company: "Merit Capital Partners",
    description: "Portfolio company seeking follow-on investment. Proven business model with 200% YoY growth and expanding to 3 new markets.",
    location: "Kampala, Uganda",
    type: "Investment",
    industry: "Finance",
    deadline: "2025-01-15",
    postedDate: "2024-11-20",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format&fit=crop",
    status: "Open",
    amount: "$500,000",
    stage: "Series B",
    equity: "8-12%",
    tags: ["Microfinance", "SME Lending", "Digital Banking", "Growth"],
    investors: ["Merit Capital", "Omidyar Network", "FMO"]
  },
  {
    id: "4",
    title: "Acquisition Opportunity",
    company: "MedTech Solutions",
    description: "Established health tech company with 10K+ healthcare providers on platform. Seeking acquisition or strategic investment for expansion.",
    location: "Kigali, Rwanda",
    type: "Acquisition",
    industry: "Health",
    deadline: "2024-12-10",
    postedDate: "2024-11-05",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80&auto=format&fit=crop",
    status: "Closing Soon",
    amount: "$1,500,000",
    stage: "Mature",
    equity: "100%",
    tags: ["Health Tech", "Telemedicine", "Healthcare", "Platform"],
    investors: ["Rwanda Development Board", "African Development Bank"]
  },
  {
    id: "5",
    title: "Seed Funding Round",
    company: "EduForward Initiative",
    description: "Early-stage edtech startup seeking seed funding to develop AI-powered learning platform for African students.",
    location: "Addis Ababa, Ethiopia",
    type: "Funding Round",
    industry: "Education",
    deadline: "2025-01-30",
    postedDate: "2024-11-25",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80&auto=format&fit=crop",
    status: "Open",
    amount: "$300,000",
    stage: "Seed",
    equity: "20-25%",
    tags: ["EdTech", "AI", "Learning Platform", "Students"],
    investors: ["Addis Ababa University", "Mastercard Foundation"]
  },
  {
    id: "6",
    title: "Merger Opportunity",
    company: "SolarPower Africa",
    description: "Established solar energy company seeking merger with complementary renewable energy businesses to create market leader.",
    location: "Lagos, Nigeria",
    type: "Merger",
    industry: "Energy",
    deadline: "2024-12-25",
    postedDate: "2024-11-12",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=80&auto=format&fit=crop",
    status: "Open",
    amount: "Merger",
    stage: "Mature",
    tags: ["Solar Energy", "Renewable", "Infrastructure", "Market Leader"],
    investors: ["Shell Foundation", "Energy Access Ventures", "CDC Group"]
  }
];

export default function OpportunitiesPage() {
  const [query, setQuery] = React.useState("");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedOpportunity, setSelectedOpportunity] = React.useState<Opportunity | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingOpportunityId, setEditingOpportunityId] = React.useState<string | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [items, setItems] = React.useState<Opportunity[]>([]);
  const [newOpportunity, setNewOpportunity] = React.useState({
    title: '',
    company: '',
    description: '',
    location: '',
    type: 'Funding Round' as Opportunity['type'],
    industry: [] as string[],
    deadline: '',
    amount: '',
    stage: '',
    equity: '',
    tags: [] as string[],
    investors: [] as string[],
    image: '',
    eligibility: [] as string[]
  });
  const [newTag, setNewTag] = React.useState('');
  const [newInvestor, setNewInvestor] = React.useState('');
  const [eligibilityText, setEligibilityText] = React.useState('');
  const [showIndustryDropdown, setShowIndustryDropdown] = React.useState(false);

  React.useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/opportunities`, { credentials: 'include' });
        const json = await res.json().catch(() => ({}));
        setItems(Array.isArray(json?.data) ? json.data : []);
      } catch {}
    };
    loadItems();

    const loadRole = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
        const res = await fetch(`${API_BASE}/api/v1/auth/me`, {
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

  const addTag = () => {
    if (newTag.trim() && !newOpportunity.tags.includes(newTag.trim())) {
      setNewOpportunity({...newOpportunity, tags: [...newOpportunity.tags, newTag.trim()]});
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewOpportunity({...newOpportunity, tags: newOpportunity.tags.filter(tag => tag !== tagToRemove)});
  };

  const addInvestor = () => {
    if (newInvestor.trim() && !newOpportunity.investors.includes(newInvestor.trim())) {
      setNewOpportunity({...newOpportunity, investors: [...newOpportunity.investors, newInvestor.trim()]});
      setNewInvestor('');
    }
  };

  const removeInvestor = (investorToRemove: string) => {
    setNewOpportunity({...newOpportunity, investors: newOpportunity.investors.filter(investor => investor !== investorToRemove)});
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.opp-dropdown-container')) {
        setShowIndustryDropdown(false);
      }
    };

    if (showIndustryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showIndustryDropdown]);

  const filtered = items.filter((opp) => {
    const matchesQuery = opp.title.toLowerCase().includes(query.toLowerCase()) || 
                        opp.company.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || opp.industry === selectedIndustry;
    const matchesStage = selectedType === "" || opp.stage === selectedType;
    return matchesQuery && matchesIndustry && matchesStage;
  });

  const openModal = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const closeModal = () => {
    setSelectedOpportunity(null);
  };

  const handleEditOpportunity = (opportunity: Opportunity) => {
    setNewOpportunity({
      title: opportunity.title,
      company: opportunity.company,
      description: opportunity.description,
      location: opportunity.location,
      type: opportunity.type,
      industry: opportunity.industries || [opportunity.industry],
      deadline: opportunity.deadline,
      amount: opportunity.amount,
      stage: opportunity.stage,
      equity: opportunity.equity || '',
      tags: opportunity.tags || [],
      investors: opportunity.investors || [],
      image: opportunity.image || '',
      eligibility: opportunity.eligibility || []
    });
    setIsEditing(true);
    setEditingOpportunityId(opportunity.id);
    setShowAddModal(true);
  };


  const handleDeleteOpportunity = async (opportunityId: string) => {
    if (confirm('Are you sure you want to delete this opportunity?')) {
      try {
        const response = await fetch(`${API_BASE}/api/v1/opportunities/${opportunityId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          setItems(prev => prev.filter(opp => opp.id !== opportunityId));
          if (selectedOpportunity?.id === opportunityId) {
            setSelectedOpportunity(null);
          }
        } else {
          console.error('Failed to delete opportunity');
          alert('Failed to delete opportunity. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting opportunity:', error);
        alert('Error deleting opportunity. Please try again.');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'var(--mc-sidebar-bg)';
      case 'Closing Soon': return '#f59e0b';
      case 'Closed': return '#ef4444';
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

  const handleAddOpportunity = async () => {
    try {
      const opportunityData = {
        ...newOpportunity,
        industry: newOpportunity.industry[0] || '',
        industries: newOpportunity.industry,
        postedDate: isEditing && editingOpportunityId ? items.find(opp => opp.id === editingOpportunityId)?.postedDate || new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        image: newOpportunity.image || "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80&auto=format&fit=crop",
        eligibility: eligibilityText.split(/\r?\n/).map(s => s.trim()).filter(Boolean),
        status: "Open" as const
      } as Opportunity;

      const url = isEditing && editingOpportunityId ? `${API_BASE}/api/v1/opportunities/${editingOpportunityId}` : `${API_BASE}/api/v1/opportunities`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(opportunityData)
      });

      if (response.ok) {
        const returned = await response.json().catch(() => null);
        const opportunity: Opportunity | null = returned?.data ? returned.data : null;
        
        if (isEditing && editingOpportunityId) {
          setItems((prev) => prev.map(opp => 
            opp.id === editingOpportunityId ? (opportunity || opportunityData) : opp
          ));
        } else {
          setItems((prev) => [opportunity || opportunityData, ...prev]);
        }
        
        setShowAddModal(false);
        setIsEditing(false);
        setEditingOpportunityId(null);
        setSelectedOpportunity(null);
        setNewOpportunity({
          title: '',
          company: '',
          description: '',
          location: '',
          type: 'Funding Round' as Opportunity['type'],
          industry: [],
          deadline: '',
          amount: '',
          stage: '',
          equity: '',
          tags: [],
          investors: [],
          image: '',
          eligibility: []
        });
        setNewTag('');
        setNewInvestor('');
        setEligibilityText('');
      } else {
        console.error(`Failed to ${isEditing ? 'update' : 'add'} opportunity`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} opportunity:`, error);
    }
  };

  return (
    <>
      <style jsx>{`
        .opp-wrap { display: grid; gap: 24px; padding: 24px; }
        
        .opp-head { 
          display: flex; flex-direction: column; gap: 8px;
          padding-bottom: 16px; 
        }
        .opp-head h2 { margin: 0; font-size: 28px; font-weight: 800; color: #111827; }
        .opp-head p { margin: 0; color: #6b7280; font-size: 14px; }
        
        .opp-toolbar { 
          display: flex; justify-content: flex-end; align-items: flex-start; 
          gap: 16px; flex-wrap: wrap; 
          flex-direction: column;
          align-items: flex-end;
        }
        .opp-filters { display: flex; gap: 12px; flex-wrap: wrap; order: 1; margin-top: 16px; }
        
        .opp-search, .opp-industry-filter, .opp-type-filter {
          padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;
          font-size: 14px; background: white; min-width: 150px;
        }
        .opp-search:focus, .opp-industry-filter:focus, .opp-type-filter:focus {
          outline: none; border-color: var(--mc-sidebar-bg); box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
        }
        
        .opp-add-btn {
          padding: 10px 20px; background: var(--mc-sidebar-bg); color: white; border: none;
          border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px;
          transition: background-color 0.2s;
        }
        .opp-add-btn:hover { background: var(--mc-sidebar-bg-hover); }

        /* Ensure the actual rendered button (proj-add-btn) aligns to the top too */
        .proj-add-btn {
          padding: 10px 20px; background: var(--mc-sidebar-bg); color: white; border: none;
          border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px;
          transition: background-color 0.2s; align-self: flex-end; order: 0;
        }
        .proj-add-btn:hover { background: var(--mc-sidebar-bg-hover); }
        
        .opp-grid { 
          display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
          gap: 20px; 
        }
        
        .opp-card { 
          background: white; border: 1px solid #e5e7eb; border-radius: 8px;
          overflow: hidden; cursor: pointer; transition: all 0.2s;
        }
        .opp-card:hover { 
          border-color: var(--mc-sidebar-bg); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        
        .opp-card-header { position: relative; height: 200px; overflow: hidden; }
        .opp-image { width: 100%; height: 100%; }
        .opp-image img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
        
        .opp-card-body { padding: 16px; }
        .opp-card-title { 
          font-size: 16px; font-weight: 700; color: #111827; 
          margin: 0 0 4px; line-height: 1.3;
        }
        .opp-card-company { 
          color: #6b7280; font-size: 14px; margin: 0 0 8px; 
        }
        .opp-card-description { 
          color: #4b5563; font-size: 13px; line-height: 1.4; 
          margin: 0 0 12px; display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        
        .opp-card-meta { 
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 12px; font-size: 12px; color: #6b7280;
        }
        .opp-card-location { display: flex; align-items: center; gap: 4px; }
        .opp-card-deadline { display: flex; align-items: center; gap: 4px; }
        
        .opp-card-footer { 
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 12px; border-top: 1px solid #f3f4f6;
        }
        .opp-card-amount { 
          font-weight: 700; color: #1f2937; font-size: 14px; 
        }
        .opp-card-stage { 
          background: #f3f4f6; color: #374151; padding: 4px 8px;
          border-radius: 4px; font-size: 12px; font-weight: 500;
        }
        
        .opp-industries {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .opp-industry-tag {
          background: #f3f4f6;
          color: #374151;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .opp-admin-actions {
          position: absolute;
          top: 8px;
          right: 8px;
          display: flex;
          gap: 4px;
          z-index: 10;
        }
        .opp-edit-btn, .opp-delete-btn {
          background: rgba(0, 0, 0, 0.6);
          border: none;
          color: white;
          padding: 6px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .opp-edit-btn:hover {
          background: rgba(0, 0, 0, 0.8);
        }
        .opp-delete-btn {
          background: rgba(220, 38, 38, 0.8);
          color: white;
        }
        .opp-delete-btn:hover {
          background: rgba(185, 28, 28, 0.9);
        }
        
        .opp-modal-overlay { 
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8); z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        
        .opp-modal { 
          background: white; border-radius: 12px; max-width: 720px; 
          width: 100%; max-height: 95vh; overflow: hidden;
          position: relative;
        }
        
        .opp-modal-close { 
          position: absolute; top: 16px; right: 16px; z-index: 10;
          background: rgba(0,0,0,0.5); color: white; border: none;
          width: 32px; height: 32px; border-radius: 50%; font-size: 18px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .opp-modal-close:hover { background: rgba(0,0,0,0.7); }
        
        .opp-modal-content { padding: 16px; }
        .opp-modal-header { margin-bottom: 8px; }
        .opp-modal-header h2 { 
          margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; 
        }
        
        .opp-modal-body { margin-bottom: 16px; }
        .opp-form { display: flex; flex-direction: column; gap: 16px; }
        .opp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .opp-form-group { display: flex; flex-direction: column; gap: 6px; }
        .opp-form-group label { 
          font-weight: 600; color: #374151; font-size: 14px; 
        }
        .opp-form-group input, .opp-form-group select, .opp-form-group textarea {
          padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px;
          font-size: 14px; background: white; transition: border-color 0.2s;
        }
        .opp-form-group input:focus, .opp-form-group select:focus, .opp-form-group textarea:focus {
          outline: none; border-color: var(--mc-sidebar-bg); box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
        }
        .opp-form-group textarea { resize: vertical; min-height: 80px; }
        
        .opp-modal-footer { 
          display: flex; justify-content: flex-end; gap: 12px;
          padding-top: 20px; border-top: 1px solid #e5e7eb;
        }
        .opp-modal-btn { 
          padding: 10px 20px; border-radius: 8px; font-weight: 600; 
          cursor: pointer; font-size: 14px; transition: all 0.2s;
        }
        .opp-modal-btn--secondary { 
          background: #f3f4f6; color: #374151; border: 1px solid #d1d5db;
        }
        .opp-modal-btn--secondary:hover { background: #e5e7eb; }
        .opp-modal-btn--primary { 
          background: var(--mc-sidebar-bg); color: white; border: none;
        }
        .opp-modal-btn--primary:hover { 
          background: var(--mc-sidebar-bg-hover); transform: translateY(-1px); 
        }
        
        .opp-tag-input-group, .opp-investor-input-group {
          display: flex; gap: 8px; margin-bottom: 8px;
        }
        .opp-tag-input-group input, .opp-investor-input-group input {
          flex: 1; margin-bottom: 0;
        }
        .opp-add-tag-btn, .opp-add-investor-btn {
          padding: 10px 16px; background: var(--mc-sidebar-bg); color: white; border: none;
          border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px;
          transition: background-color 0.2s; white-space: nowrap;
        }
        .opp-add-tag-btn:hover, .opp-add-investor-btn:hover {
          background: var(--mc-sidebar-bg-hover);
        }
        
        .opp-tags-display, .opp-investors-display {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;
        }
        .opp-tag-item, .opp-investor-item {
          display: inline-flex; align-items: center; gap: 4px;
          background: #f3f4f6; color: #374151; padding: 4px 8px;
          border-radius: 4px; font-size: 12px; font-weight: 500;
        }
        .opp-remove-tag, .opp-remove-investor {
          background: none; border: none; color: #6b7280; cursor: pointer;
          font-size: 16px; line-height: 1; padding: 0; margin-left: 4px;
        }
        .opp-remove-tag:hover, .opp-remove-investor:hover {
          color: #ef4444;
        }
        
        .opp-image-preview {
          margin-top: 8px;
        }
        .opp-preview-img {
          width: 100px; height: 100px; object-fit: cover; 
          border-radius: 8px; border: 1px solid #d1d5db;
        }
        
        .opp-dropdown-container {
          position: relative; width: 100%;
        }
        .opp-dropdown-trigger {
          width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; 
          border-radius: 8px; background: white; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 14px; color: #374151; transition: border-color 0.2s;
        }
        .opp-dropdown-trigger:hover {
          border-color: var(--mc-sidebar-bg);
        }
        .opp-dropdown-trigger:focus {
          outline: none; border-color: var(--mc-sidebar-bg); box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
        }
        .opp-dropdown-arrow {
          font-size: 12px; color: #6b7280; transition: transform 0.2s;
        }
        .opp-dropdown-menu {
          position: absolute; top: 100%; left: 0; right: 0; z-index: 10;
          background: white; border: 1px solid #d1d5db; border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); max-height: 200px;
          overflow-y: auto; margin-top: 4px;
        }
        .opp-dropdown-item {
          display: flex; align-items: center; gap: 8px; padding: 8px 12px;
          cursor: pointer; transition: background-color 0.2s;
        }
        .opp-dropdown-item:hover {
          background: #f8fafc;
        }
        .opp-dropdown-item input[type="checkbox"] {
          margin: 0; cursor: pointer; width: 16px; height: 16px;
          accent-color: var(--mc-sidebar-bg);
        }
        .opp-dropdown-item span {
          font-size: 14px; color: #374151; cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .opp-toolbar { flex-direction: column; align-items: stretch; }
          .opp-filters { justify-content: stretch; }
          .opp-search, .opp-industry-filter, .opp-type-filter { min-width: auto; }
          .opp-grid { grid-template-columns: 1fr; }
          .opp-form-row { grid-template-columns: 1fr; }
          .opp-industry-checkboxes { grid-template-columns: repeat(2, 1fr); }
          .opp-modal { margin: 10px; max-height: calc(100vh - 20px); }
        }
      `}</style>
      
      <div className="opp-wrap">
      <div className="opp-head">
        <h2>Opportunities</h2>
        <p>Discover exciting career opportunities and partnerships</p>
      </div>
      
      <div className="opp-toolbar">
        <div className="opp-filters">
          <input
            className="opp-search"
            placeholder="Search opportunities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="opp-industry-filter"
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
            className="opp-type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Stages</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
            <option value="Series B">Series B</option>
            <option value="Growth Stage">Growth Stage</option>
            <option value="Mature">Mature</option>
          </select>
        </div>
        {isAdmin && (
        <button 
          className="proj-add-btn"
          onClick={() => setShowAddModal(true)}
        >
          <span>+</span> Add Opportunity
        </button>
        )}
      </div>

      <div className="opp-grid">
        {filtered.map((opp) => (
          <div key={opp.id} className="opp-card" onClick={() => openModal(opp)}>
            <div className="opp-card-header">
              <div className="opp-image">
                <img src={opp.image || "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80&auto=format&fit=crop"} alt={opp.company} />
              </div>
              {isAdmin && (
                <div className="opp-admin-actions" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="opp-edit-btn"
                    onClick={() => handleEditOpportunity(opp)}
                    title="Edit Opportunity"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button 
                    className="opp-delete-btn"
                    onClick={() => handleDeleteOpportunity(opp.id)}
                    title="Delete Opportunity"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"/>
                      <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="opp-card-body">
              <h3 className="opp-title">{opp.title}</h3>
              <p className="opp-company">{opp.company}</p>
              <p className="opp-description">{opp.description}</p>
              
              <div className="opp-meta-simple">
                <div className="opp-meta-item">
                  <span className="opp-meta-label">Amount:</span>
                  <span className="opp-meta-value">{opp.amount}</span>
                </div>
                <div className="opp-meta-item">
                  <span className="opp-meta-label">Stage:</span>
                  <span className="opp-meta-value">{opp.stage}</span>
                </div>
              </div>

              {(opp.industries && opp.industries.length > 0) && (
                <div className="opp-industries">
                  {opp.industries.map((ind) => (
                    <span key={ind} className="opp-industry-tag">
                      {ind}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="opp-card-footer">
              <div className="opp-footer-left">
                <span className="opp-deadline">Deadline: {formatDate(opp.deadline)}</span>
              </div>
              <div className="opp-footer-right">
                <button className="opp-apply-btn">Apply</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOpportunity && (
        <div className="opp-modal-overlay" onClick={closeModal}>
          <div className="opp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="opp-modal-close" onClick={closeModal}>×</button>
            <div className="opp-modal-image" style={{height: '28vh'}}>
              <img src={selectedOpportunity.image || "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80&auto=format&fit=crop"} alt={selectedOpportunity.company} />
            </div>
            <div className="opp-modal-content">
              <div className="opp-modal-body">
                <div className="opp-modal-header-info">
                  <h2 className="opp-modal-title">{selectedOpportunity.title}</h2>
                  <p className="opp-modal-company">{selectedOpportunity.company}</p>
                </div>
                <div className="opp-modal-details">
                  <div className="opp-modal-section">
                    <h3>Investment Details</h3>
                    <div className="opp-modal-meta">
                      <div className="opp-modal-meta-item">
                        <span className="opp-modal-meta-label">Amount:</span>
                        <span className="opp-modal-meta-value">{selectedOpportunity.amount}</span>
                      </div>
                      <div className="opp-modal-meta-item">
                        <span className="opp-modal-meta-label">Stage:</span>
                        <span className="opp-modal-meta-value">{selectedOpportunity.stage}</span>
                      </div>
                      {selectedOpportunity.equity && (
                        <div className="opp-modal-meta-item">
                          <span className="opp-modal-meta-label">Equity:</span>
                          <span className="opp-modal-meta-value">{selectedOpportunity.equity}</span>
                        </div>
                      )}
                      <div className="opp-modal-meta-item">
                        <span className="opp-modal-meta-label">Location:</span>
                        <span className="opp-modal-meta-value">{selectedOpportunity.location}</span>
                      </div>
                      <div className="opp-modal-meta-item">
                        <span className="opp-modal-meta-label">Type:</span>
                        <span className="opp-modal-meta-value">{selectedOpportunity.type}</span>
                      </div>
                    </div>
                  </div>

                  {selectedOpportunity.investors && selectedOpportunity.investors.length > 0 && (
                    <div className="opp-modal-section">
                      <h3>Current Investors</h3>
                      <div className="opp-modal-investors">
                        {selectedOpportunity.investors.map((investor, index) => (
                          <span key={index} className="opp-modal-investor">{investor}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedOpportunity.industries && selectedOpportunity.industries.length > 0 && (
                    <div className="opp-modal-section">
                      <h3>Industries</h3>
                      <div className="opp-modal-tags">
                        {selectedOpportunity.industries.map((ind) => (
                          <span key={ind} className="opp-modal-tag">{ind}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description below Current Investors */}
                  {selectedOpportunity.description && (
                    <div className="opp-modal-section">
                      <h3>Description</h3>
                      <p className="opp-modal-description">{selectedOpportunity.description}</p>
                    </div>
                  )}

                  {/* Eligibility below Description */}
                  {Array.isArray(selectedOpportunity.eligibility) && selectedOpportunity.eligibility.length > 0 && (
                    <div className="opp-modal-section">
                      <h3>Eligibility</h3>
                      <ul className="opp-eligibility-list">
                        {selectedOpportunity.eligibility.map((rule, idx) => (
                          <li key={idx} className="opp-eligibility-item">{rule}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="opp-modal-section">
                    <h3>Tags</h3>
                    <div className="opp-modal-tags">
                      {selectedOpportunity.tags.map((tag) => (
                        <span key={tag} className="opp-modal-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="opp-modal-timeline">
                    <div className="opp-modal-timeline-item">
                      <span className="opp-modal-timeline-label">Posted:</span>
                      <span className="opp-modal-timeline-value">{formatDate(selectedOpportunity.postedDate)}</span>
                    </div>
                    <div className="opp-modal-timeline-item">
                      <span className="opp-modal-timeline-label">Deadline:</span>
                      <span className="opp-modal-timeline-value">{formatDate(selectedOpportunity.deadline)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Opportunity Modal */}
      {showAddModal && (
        <div className="opp-modal-overlay" onClick={() => { setShowAddModal(false); setIsEditing(false); setEditingOpportunityId(null); }}>
          <div className="opp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="opp-modal-close" onClick={() => { setShowAddModal(false); setIsEditing(false); setEditingOpportunityId(null); }}>×</button>
            <div className="opp-modal-content">
              <div className="opp-modal-header">
                <h2>{isEditing ? 'Edit Opportunity' : 'Add New Opportunity'}</h2>
              </div>
              
              <div className="opp-modal-body">
                <div className="opp-form">
                  <div className="opp-form-row">
                    <div className="opp-form-group">
                      <label>Title *</label>
                      <input
                        type="text"
                        value={newOpportunity.title}
                        onChange={(e) => setNewOpportunity({...newOpportunity, title: e.target.value})}
                        placeholder="e.g., Series A Funding Round"
                      />
                    </div>
                    <div className="opp-form-group">
                      <label>Company *</label>
                      <input
                        type="text"
                        value={newOpportunity.company}
                        onChange={(e) => setNewOpportunity({...newOpportunity, company: e.target.value})}
                        placeholder="e.g., TechStart Africa"
                      />
                    </div>
                  </div>

                  <div className="opp-form-row">
                    <div className="opp-form-group">
                      <label>Location *</label>
                      <input
                        type="text"
                        value={newOpportunity.location}
                        onChange={(e) => setNewOpportunity({...newOpportunity, location: e.target.value})}
                        placeholder="e.g., Nairobi, Kenya"
                      />
                    </div>
                    <div className="opp-form-group">
                      <label>Industry *</label>
                      <div className="opp-dropdown-container">
                        <button
                          type="button"
                          className="opp-dropdown-trigger"
                          onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                        >
                          {newOpportunity.industry.length === 0 
                            ? 'Select Industries' 
                            : `${newOpportunity.industry.length} selected`
                          }
                          <span className="opp-dropdown-arrow">▼</span>
                        </button>
                        {showIndustryDropdown && (
                          <div className="opp-dropdown-menu">
                            {industries.map((industry) => (
                              <label key={industry} className="opp-dropdown-item">
                                <input
                                  type="checkbox"
                                  checked={newOpportunity.industry.includes(industry)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setNewOpportunity({
                                        ...newOpportunity, 
                                        industry: [...newOpportunity.industry, industry]
                                      });
                                    } else {
                                      setNewOpportunity({
                                        ...newOpportunity, 
                                        industry: newOpportunity.industry.filter(ind => ind !== industry)
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
                  </div>

                  <div className="opp-form-row">
                    <div className="opp-form-group">
                      <label>Type *</label>
                      <select
                        value={newOpportunity.type}
                        onChange={(e) => setNewOpportunity({...newOpportunity, type: e.target.value as any})}
                      >
                        <option value="Funding Round">Funding Round</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Investment">Investment</option>
                        <option value="Acquisition">Acquisition</option>
                        <option value="Merger">Merger</option>
                      </select>
                    </div>
                    <div className="opp-form-group">
                      <label>Stage *</label>
                      <select
                        value={newOpportunity.stage}
                        onChange={(e) => setNewOpportunity({...newOpportunity, stage: e.target.value})}
                      >
                        <option value="">Select Stage</option>
                        <option value="Seed">Seed</option>
                        <option value="Series A">Series A</option>
                        <option value="Series B">Series B</option>
                        <option value="Growth Stage">Growth Stage</option>
                        <option value="Mature">Mature</option>
                      </select>
                    </div>
                  </div>

                  <div className="opp-form-row">
                    <div className="opp-form-group">
                      <label>Amount *</label>
                      <input
                        type="text"
                        value={newOpportunity.amount}
                        onChange={(e) => setNewOpportunity({...newOpportunity, amount: e.target.value})}
                        placeholder="e.g., $2,000,000"
                      />
                    </div>
                    <div className="opp-form-group">
                      <label>Equity</label>
                      <input
                        type="text"
                        value={newOpportunity.equity}
                        onChange={(e) => setNewOpportunity({...newOpportunity, equity: e.target.value})}
                        placeholder="e.g., 15-20%"
                      />
                    </div>
                  </div>

                  <div className="opp-form-row">
                    <div className="opp-form-group">
                      <label>Deadline *</label>
                      <input
                        type="date"
                        value={newOpportunity.deadline}
                        onChange={(e) => setNewOpportunity({...newOpportunity, deadline: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="opp-form-group">
                    <label>Description *</label>
                    <textarea
                      value={newOpportunity.description}
                      onChange={(e) => setNewOpportunity({...newOpportunity, description: e.target.value})}
                      placeholder="Describe the opportunity..."
                      rows={3}
                    />
                  </div>

                  <div className="opp-form-group">
                    <label>Eligibility</label>
                    <textarea
                      value={eligibilityText}
                      onChange={(e) => setEligibilityText(e.target.value)}
                      placeholder="Enter eligibility rules (one per line)"
                      rows={3}
                    />
                    {newOpportunity.eligibility && newOpportunity.eligibility.length > 0 && (
                      <div className="opp-eligibility-display">
                        {newOpportunity.eligibility.map((rule, index) => (
                          <span key={index} className="opp-eligibility-item">
                            {rule}
                            <button type="button" className="opp-remove-eligibility" onClick={() => {
                              setNewOpportunity({
                                ...newOpportunity,
                                eligibility: newOpportunity.eligibility.filter(r => r !== rule)
                              });
                            }}>×</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="opp-form-group">
                    <label>Tags</label>
                    <div className="opp-tag-input-group">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Enter a tag (e.g., Fintech)"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <button type="button" className="opp-add-tag-btn" onClick={addTag}>
                        Add Tag
                      </button>
                    </div>
                    {newOpportunity.tags.length > 0 && (
                      <div className="opp-tags-display">
                        {newOpportunity.tags.map((tag, index) => (
                          <span key={index} className="opp-tag-item">
                            {tag}
                            <button type="button" className="opp-remove-tag" onClick={() => removeTag(tag)}>×</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="opp-form-group">
                    <label>Current Investors</label>
                    <div className="opp-investor-input-group">
                      <input
                        type="text"
                        value={newInvestor}
                        onChange={(e) => setNewInvestor(e.target.value)}
                        placeholder="Enter an investor (e.g., Acumen Fund)"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInvestor())}
                      />
                      <button type="button" className="opp-add-investor-btn" onClick={addInvestor}>
                        Add Investor
                      </button>
                    </div>
                    {newOpportunity.investors.length > 0 && (
                      <div className="opp-investors-display">
                        {newOpportunity.investors.map((investor, index) => (
                          <span key={index} className="opp-investor-item">
                            {investor}
                            <button type="button" className="opp-remove-investor" onClick={() => removeInvestor(investor)}>×</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="opp-form-group">
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
                            setNewOpportunity({...newOpportunity, image: event.target?.result as string});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {newOpportunity.image && (
                      <div className="opp-image-preview">
                        <img 
                          src={newOpportunity.image} 
                          alt="Preview" 
                          className="opp-preview-img"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="opp-modal-footer">
                <button 
                  className="opp-modal-btn opp-modal-btn--secondary"
                  onClick={() => { setShowAddModal(false); setIsEditing(false); setEditingOpportunityId(null); }}
                >
                  Cancel
                </button>
                <button 
                  className="opp-modal-btn opp-modal-btn--primary"
                  onClick={handleAddOpportunity}
                >
                  {isEditing ? 'Update Opportunity' : 'Add Opportunity'}
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


