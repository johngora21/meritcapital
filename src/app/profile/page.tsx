"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera } from 'lucide-react';

type UserProfile = {
  id: number;
  full_name: string;
  email: string;
  role: 'admin' | 'mentor' | 'investor' | 'entrepreneur';
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  created_at: string;
  last_login?: string;
  company?: string;
  position?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
};

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const res = await fetch(`${API}/auth/me`, { credentials: 'include' });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data?.data || null);
        setEditForm(data?.data || {});
      } else {
        router.push('/authentication/login');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      router.push('/authentication/login');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setEditForm(user || {});
  };

  const handleCancel = () => {
    setEditing(false);
    setEditForm(user || {});
    setAvatarPreview(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editForm)
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data?.data || editForm);
        setEditing(false);
        setAvatarPreview(null);
        alert('Profile updated successfully!');
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('Failed to update profile:', errorData);
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
        setEditForm({ ...editForm, avatar: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };


  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#dc2626';
      case 'mentor': return '#059669';
      case 'investor': return '#2563eb';
      case 'entrepreneur': return '#7c3aed';
      default: return '#6b7280';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Super Admin';
      case 'mentor': return 'Mentor';
      case 'investor': return 'Investor';
      case 'entrepreneur': return 'Entrepreneur';
      default: return role;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">
          <div className="profile-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>Profile Not Found</h2>
          <p>Unable to load your profile. Please try again.</p>
          <button 
            className="profile-button profile-button-primary"
            onClick={() => router.push('/dashboard')}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .profile-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Poppins', sans-serif;
        }


        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .profile-title {
          font-size: 32px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .profile-subtitle {
          font-size: 16px;
          color: #6b7280;
          margin: 8px 0 0 0;
        }

        .profile-actions {
          display: flex;
          gap: 12px;
        }

        .profile-button {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Poppins', sans-serif;
        }

        .profile-button-primary {
          background: var(--mc-sidebar-bg);
          color: white;
        }

        .profile-button-primary:hover {
          background: var(--mc-sidebar-bg-hover);
          transform: translateY(-1px);
        }

        .profile-button-secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .profile-button-secondary:hover {
          background: #e5e7eb;
        }

        .profile-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 24px;
        }

        .profile-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .profile-card-header {
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .profile-card-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
        }

        .profile-card-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .profile-card-body {
          padding: 24px;
        }

        .profile-avatar-section {
          text-align: center;
          margin-bottom: 24px;
        }

        .profile-avatar-container {
          position: relative;
          display: inline-block;
          margin-bottom: 16px;
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-avatar:hover {
          border-color: var(--mc-sidebar-bg);
        }

        .profile-avatar-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: #9ca3af;
          border: 4px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-avatar-placeholder:hover {
          border-color: var(--mc-sidebar-bg);
          background: #e5e7eb;
        }

        .profile-avatar-upload {
          position: absolute;
          bottom: 0;
          right: 0;
          background: var(--mc-sidebar-bg);
          color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-avatar-upload:hover {
          background: var(--mc-sidebar-bg-hover);
          transform: scale(1.1);
        }

        .profile-avatar-input {
          display: none;
        }

        .profile-name {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
        }

        .profile-role {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .profile-bio {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0 0 24px 0;
        }

        .profile-info-grid {
          display: grid;
          gap: 16px;
        }

        .profile-info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .profile-info-item:last-child {
          border-bottom: none;
        }

        .profile-info-icon {
          width: 20px;
          height: 20px;
          color: #6b7280;
          flex-shrink: 0;
        }

        .profile-info-content {
          flex: 1;
        }

        .profile-info-label {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .profile-info-value {
          font-size: 14px;
          color: #1f2937;
          font-weight: 500;
        }

        .profile-form-group {
          margin-bottom: 20px;
        }

        .profile-form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .profile-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          transition: all 0.2s ease;
          font-family: 'Poppins', sans-serif;
        }

        .profile-input:focus {
          outline: none;
          border-color: var(--mc-sidebar-bg);
          box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
        }

        .profile-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .profile-social-links {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .profile-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f3f4f6;
          color: #6b7280;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .profile-social-link:hover {
          background: var(--mc-sidebar-bg);
          color: white;
          transform: translateY(-1px);
        }

        .profile-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
        }

        .profile-stat {
          text-align: center;
          padding: 20px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .profile-stat-value {
          font-size: 24px;
          font-weight: 700;
          color: var(--mc-sidebar-bg);
          margin-bottom: 4px;
        }

        .profile-stat-label {
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .profile-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          color: #6b7280;
        }

        .profile-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid var(--mc-sidebar-bg);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .profile-error {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .profile-error h2 {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 12px 0;
        }

        .profile-error p {
          margin: 0 0 24px 0;
        }

        @media (max-width: 768px) {
          .profile-container {
            padding: 16px;
          }

          .profile-header {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .profile-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .profile-stats {
            grid-template-columns: 1fr;
          }

          .profile-social-links {
            justify-content: center;
          }
        }
      `}</style>

      <div className="profile-container">
        <div className="profile-header">
          <div>
            <h1 className="profile-title">Profile</h1>
            <p className="profile-subtitle">Manage your account settings and preferences</p>
          </div>
          <div className="profile-actions">
            {editing ? (
              <>
                <button 
                  className="profile-button profile-button-secondary"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <X size={16} />
                  Cancel
                </button>
                <button 
                  className="profile-button profile-button-primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button 
                className="profile-button profile-button-primary"
                onClick={handleEdit}
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="profile-grid">
          {/* Profile Overview */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2 className="profile-card-title">Profile Overview</h2>
              <p className="profile-card-subtitle">Your basic information</p>
            </div>
            <div className="profile-card-body">
              <div className="profile-avatar-section">
                <div className="profile-avatar-container">
                  {editing ? (
                    <>
                      <img 
                        src={avatarPreview || user.avatar || '/api/placeholder/120/120'} 
                        alt="Profile" 
                        className="profile-avatar"
                      />
                      <label className="profile-avatar-upload">
                        <Camera size={16} />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="profile-avatar-input"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </>
                  ) : (
                    user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt="Profile" 
                        className="profile-avatar"
                      />
                    ) : (
                      <div className="profile-avatar-placeholder">
                        {user.full_name.charAt(0).toUpperCase()}
                      </div>
                    )
                  )}
                </div>
                <h3 className="profile-name">{user.full_name}</h3>
                <div 
                  className="profile-role"
                  style={{ backgroundColor: getRoleColor(user.role), color: 'white' }}
                >
                  {getRoleLabel(user.role)}
                </div>
                {editing ? (
                  <textarea
                    className="profile-input profile-textarea"
                    value={editForm.bio || ''}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="profile-bio">
                    {user.bio || 'No bio available. Click "Edit Profile" to add one.'}
                  </p>
                )}
              </div>

              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <Mail className="profile-info-icon" />
                  <div className="profile-info-content">
                    <div className="profile-info-label">Email</div>
                    <div className="profile-info-value">{user.email}</div>
                  </div>
                </div>
                
                {user.phone && (
                  <div className="profile-info-item">
                    <Phone className="profile-info-icon" />
                    <div className="profile-info-content">
                      <div className="profile-info-label">Phone</div>
                      <div className="profile-info-value">{user.phone}</div>
                    </div>
                  </div>
                )}
                
                {user.location && (
                  <div className="profile-info-item">
                    <MapPin className="profile-info-icon" />
                    <div className="profile-info-content">
                      <div className="profile-info-label">Location</div>
                      <div className="profile-info-value">{user.location}</div>
                    </div>
                  </div>
                )}
                
                <div className="profile-info-item">
                  <Calendar className="profile-info-icon" />
                  <div className="profile-info-content">
                    <div className="profile-info-label">Member Since</div>
                    <div className="profile-info-value">{formatDate(user.created_at)}</div>
                  </div>
                </div>
              </div>

              <div className="profile-social-links">
                {user.website && (
                  <a href={user.website} className="profile-social-link" target="_blank" rel="noopener noreferrer">
                    🌐
                  </a>
                )}
                {user.linkedin && (
                  <a href={user.linkedin} className="profile-social-link" target="_blank" rel="noopener noreferrer">
                    💼
                  </a>
                )}
                {user.twitter && (
                  <a href={user.twitter} className="profile-social-link" target="_blank" rel="noopener noreferrer">
                    🐦
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2 className="profile-card-title">Profile Details</h2>
              <p className="profile-card-subtitle">Additional information and settings</p>
            </div>
            <div className="profile-card-body">
              {editing ? (
                <div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Full Name</label>
                    <input
                      type="text"
                      className="profile-input"
                      value={editForm.full_name || ''}
                      onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="profile-input"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label">Location</label>
                    <input
                      type="text"
                      className="profile-input"
                      value={editForm.location || ''}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label">Company</label>
                    <input
                      type="text"
                      className="profile-input"
                      value={editForm.company || ''}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label">Position</label>
                    <input
                      type="text"
                      className="profile-input"
                      value={editForm.position || ''}
                      onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                      placeholder="Your job title"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label">Website</label>
                    <input
                      type="url"
                      className="profile-input"
                      value={editForm.website || ''}
                      onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label">LinkedIn</label>
                    <input
                      type="url"
                      className="profile-input"
                      value={editForm.linkedin || ''}
                      onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label">Twitter</label>
                    <input
                      type="url"
                      className="profile-input"
                      value={editForm.twitter || ''}
                      onChange={(e) => setEditForm({ ...editForm, twitter: e.target.value })}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="profile-info-grid">
                    {user.company && (
                      <div className="profile-info-item">
                        <div className="profile-info-content">
                          <div className="profile-info-label">Company</div>
                          <div className="profile-info-value">{user.company}</div>
                        </div>
                      </div>
                    )}
                    
                    {user.position && (
                      <div className="profile-info-item">
                        <div className="profile-info-content">
                          <div className="profile-info-label">Position</div>
                          <div className="profile-info-value">{user.position}</div>
                        </div>
                      </div>
                    )}
                    
                    {user.last_login && (
                      <div className="profile-info-item">
                        <Calendar className="profile-info-icon" />
                        <div className="profile-info-content">
                          <div className="profile-info-label">Last Login</div>
                          <div className="profile-info-value">{formatDate(user.last_login)}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="profile-stats">
                    <div className="profile-stat">
                      <div className="profile-stat-value">12</div>
                      <div className="profile-stat-label">Projects</div>
                    </div>
                    <div className="profile-stat">
                      <div className="profile-stat-value">8</div>
                      <div className="profile-stat-label">Connections</div>
                    </div>
                    <div className="profile-stat">
                      <div className="profile-stat-value">24</div>
                      <div className="profile-stat-label">Activities</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
