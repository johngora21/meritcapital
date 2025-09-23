"use client";
import React from 'react';

type Investment = {
  id: number;
  startup_id: number;
  amount_text?: string;
  note?: string;
  created_at: string;
};

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';

export default function InvestmentsPage() {
  const [items, setItems] = React.useState<Investment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem('token') || '';
    fetch(`${API}/investments`, { headers: { Authorization: `Bearer ${token}` }})
      .then(r => r.json())
      .then(data => { setItems(data.data || []); setLoading(false); })
      .catch(e => { setError('Failed to load investments'); setLoading(false); });
  }, []);

  return (
    <div className="invst-wrap">
      <div className="invst-head">
        <h2>Investments</h2>
        <p>Track your startup investments</p>
      </div>
      {loading && <div className="invst-empty">Loading...</div>}
      {error && <div className="invst-empty" style={{ color: '#ef4444' }}>{error}</div>}
      {!loading && !error && (
        <div className="invst-list">
          {items.length === 0 ? (
            <div className="invst-empty">No investments yet</div>
          ) : (
            <table className="invst-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Startup</th>
                  <th>Amount</th>
                  <th>Note</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map(x => (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>#{x.startup_id}</td>
                    <td>{x.amount_text || '-'}</td>
                    <td title={x.note}>{x.note?.slice(0, 40) || '-'}</td>
                    <td>{new Date(x.created_at).toLocaleDateString()}</td>
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


