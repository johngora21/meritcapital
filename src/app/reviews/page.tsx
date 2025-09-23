"use client";
import React from 'react';

type Project = { id: number; name: string; industry?: string; status?: string; description?: string };
const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';

export default function ReviewsPage() {
  const [items, setItems] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const load = React.useCallback(() => {
    setLoading(true);
    fetch(`${API}/projects/pending`, { headers: { Authorization: `Bearer ${token}` }})
      .then(r => r.json())
      .then(data => { setItems(data.data || []); setLoading(false); })
      .catch(() => { setError('Failed to load'); setLoading(false); });
  }, [token]);

  React.useEffect(() => { load(); }, [load]);

  const decide = (id: number, decision: 'approve'|'reject') => {
    fetch(`${API}/projects/${id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ decision })
    }).then(() => load());
  };

  return (
    <div className="rev-wrap">
      <div className="rev-head">
        <h2>Project Reviews</h2>
        <p>Review submitted projects and assign mentors</p>
      </div>
      {loading && <div className="rev-empty">Loading...</div>}
      {error && <div className="rev-empty" style={{ color: '#ef4444' }}>{error}</div>}
      {!loading && !error && (
        <div className="rev-list">
          {items.length === 0 ? (
            <div className="rev-empty">No pending projects</div>
          ) : (
            <table className="rev-table">
              <thead><tr><th>ID</th><th>Name</th><th>Industry</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.industry || '-'}</td>
                    <td>{p.status || '-'}</td>
                    <td>
                      <button className="rev-approve" onClick={() => decide(p.id, 'approve')}>Approve</button>
                      <button className="rev-reject" onClick={() => decide(p.id, 'reject')}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}


