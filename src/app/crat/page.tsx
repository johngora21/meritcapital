"use client";
import { Tabs, BarChart } from '@/components';
import { Eye, Trash2, Paperclip } from 'lucide-react';
import React from 'react';

// Minimal project shape for dropdown purposes
type CratProject = {
  id: string | number;
  name: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  stage: string;
  industry: string;
  status: string;
  revenue: string;
  lastUpdated: string;
  imageUrl: string;
  tags: string[];
};

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';

export default function CratPage() {
  const [tab, setTab] = React.useState(0);
  const [projects, setProjects] = React.useState<CratProject[]>([]);
  const [loadingProjects, setLoadingProjects] = React.useState<boolean>(true);
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | number | ''>('');
  const [ratings, setRatings] = React.useState<Record<string, 'yes' | 'maybe' | 'no'>>({});
  const [attachments, setAttachments] = React.useState<Record<string, string>>({});
  const getKey = (section: string, sub: string) => `${section}|${sub}`;
  const getScoreFromRating = (r?: 'yes' | 'maybe' | 'no') => (r === 'yes' ? 2 : r === 'maybe' ? 1 : 0);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/projects/cards`, { credentials: 'include' });
        const data = await res.json().catch(() => ({}));
        const items: any[] = data?.data || [];
        const mapped: CratProject[] = items.map((p: any) => ({ id: p.id, name: p.name }));
        setProjects(mapped);
        setSelectedProjectId((prev) => (prev !== '' ? prev : (mapped[0]?.id ?? '')));
      } catch {
        setProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    };
    load();
  }, []);

  const selectedProject = projects.find(p => `${p.id}` === `${selectedProjectId}`) || null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>Capital Readiness Assessment Tool</h2>
        <div className="crat-project-dropdown">
          <select
            id="project-select"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="crat-project-select"
            disabled={loadingProjects || projects.length === 0}
          >
            {loadingProjects && <option value="">Loading projects...</option>}
            {!loadingProjects && projects.length === 0 && <option value="">No projects found</option>}
            {!loadingProjects && projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Tabs items={["Overview","Commercial","Finance","Operation","Legal"]} activeIndex={tab} onChange={setTab} />
      {tab === 0 && (
      <div className="mc-overview">
        <div className="mc-hscroll">
          <div className="mc-hrow">
            <div className="mc-stat-card mc-stat-card--total">
              <div className="mc-stat-header">Total</div>
              <div className="mc-stat-body">
                <div className="mc-stat-row"><span>Actual Score</span><strong>0</strong></div>
                <div className="mc-stat-row"><span>AS% Contribution</span><strong>100%</strong></div>
                <div className="mc-stat-row"><span>Target Score</span><strong>0</strong></div>
                <div className="mc-stat-row"><span>TS% Contribution</span><strong>100%</strong></div>
                <div className="mc-stat-row"><span>(AS/TS) Readiness</span><strong>0%</strong></div>
              </div>
            </div>
            {[
              { name: 'Commercial' },
              { name: 'Financial' },
              { name: 'Operations' },
              { name: 'Legal' },
            ].map((d) => (
              <div key={d.name} className="mc-stat-card">
                <div className="mc-stat-header">{d.name}</div>
                <div className="mc-stat-body">
                  <div className="mc-stat-row"><span>Actual Score</span><strong>0</strong></div>
                  <div className="mc-stat-row"><span>AS% Contribution</span><strong>0%</strong></div>
                  <div className="mc-stat-row"><span>Target Score</span><strong>0</strong></div>
                  <div className="mc-stat-row"><span>TS% Contribution</span><strong>0%</strong></div>
                  <div className="mc-stat-row"><span>(AS/TS) Readiness</span><strong>0%</strong></div>
                  <div className="mc-stat-row"><span>Status</span><strong>Not ready</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mc-overview__grid">
          <div className="mc-card">
            <h2>Capital Readiness Assessment Scores</h2>
            <p>Your readiness across key business domains</p>
            <BarChart labels={["Total","Commercial","Financial","Operations","Legal"]} values={[0,0,0,0,0]} />
          </div>
          <div className="mc-card">
            <h2>Overall Readiness</h2>
            <div className="mc-ring" style={{ ['--pct' as any]: 0.7 }} />
            <div className="mc-ring__center">70%</div>
            <div className="mc-ring__label">
              <div className="mc-ring__title">Not Ready</div>
              <div className="mc-ring__state">Overall assessment score across domains</div>
            </div>
          </div>
        </div>
      </div>
      )}
      {tab === 4 && (
      <div className="mc-domain">
        {[
          {
            title: '1. Corporate Documents & Compliance',
            rows: [
              { sub: 'Business incorporation', q: 'Is the business incorporated/registered?', attach: 'BRELA incorporation Certificate, MEMART' },
              { sub: 'Tax Identification', q: 'Does the company have tax identification number?', attach: 'TIN Certificate' },
              { sub: 'Tax compliance', q: 'Is the business up to date with the required taxes?', attach: 'Current tax fillings' },
              { sub: 'Business Licence', q: 'Does the business have required licenses?', attach: 'Business licence certificate' },
              { sub: 'Sector specific compliance', q: 'Does the company have other certifications per the respective industry regulations?', attach: 'BOT Licence etc' },
            ],
          },
          {
            title: '2. Contracts & Agreements',
            rows: [
              { sub: 'Lease agreements', q: 'Are lease agreements available and clear?', attach: 'Contract' },
              { sub: 'Customer contracts', q: 'Are customer agreements available and clear?', attach: 'Contract' },
              { sub: 'Supplier contracts', q: 'Are supplier agreements available and clear?', attach: 'Contract' },
              { sub: 'Employees contracts', q: 'Do employees have contracts (including the founders)?', attach: 'Contract' },
            ],
          },
          {
            title: '3. Intellectual Property',
            rows: [
              { sub: 'IP ownership', q: 'Does the company own copyrights to its source codes/or patent to its solution?', attach: 'Copyrights' },
            ],
          },
          {
            title: '4. Entrepreneur & Family',
            rows: [
              { sub: 'Entrepreneurial character', q: 'Is the entrepreneur adaptable, resilient, and reliable?', attach: 'Track record, pitch, innovation in business' },
              { sub: 'Personal legal liability', q: 'Does the management team have any personal liability that would affect the company?', attach: 'Credit reports' },
              { sub: 'Succession plan', q: 'Does the succession plan exist?', attach: 'Succession plans/Contracts/JD' },
            ],
          },
          {
            title: '5. Corporate Governance',
            rows: [
              { sub: 'Board of directors', q: 'Does the company have an active BOD?', attach: 'List of board members + CVs' },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="mc-card">
            <h2>{section.title}</h2>
            <div className="mc-list mc-list--head">
              <div>Sub Domain</div>
              <div>Question</div>
              <div>Rating</div>
              <div>Score</div>
              <div>Attachment</div>
              <div>Actions</div>
            </div>
            {section.rows.map((r) => (
              <div key={r.sub} className="mc-list">
                <div>{r.sub}</div>
                <div>{r.q}</div>
                <div>
                  <select
                    className="mc-select"
                    value={ratings[getKey(section.title, r.sub)] || 'no'}
                    onChange={(e) => setRatings((prev) => ({ ...prev, [getKey(section.title, r.sub)]: e.target.value as any }))}
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>{getScoreFromRating(ratings[getKey(section.title, r.sub)])}</div>
                <div>
                  <input
                    id={`file-${getKey(section.title, r.sub)}`}
                    type="file"
                    aria-label={`Upload attachment for ${r.sub}`}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setAttachments((prev) => ({ ...prev, [getKey(section.title, r.sub)]: file ? file.name : '' }));
                    }}
                  />
                  <button
                    className={"mc-icon-link" + (attachments[getKey(section.title, r.sub)] ? " mc-icon-link--ok" : "")}
                    aria-label="Upload attachment"
                    onClick={() => {
                      const el = document.getElementById(`file-${getKey(section.title, r.sub)}`) as HTMLInputElement | null;
                      el?.click();
                    }}
                  >
                    <Paperclip size={16} />
                  </button>
                  {attachments[getKey(section.title, r.sub)] && (
                    <span className="mc-file-name" title={attachments[getKey(section.title, r.sub)]}>
                      {attachments[getKey(section.title, r.sub)]}
                    </span>
                  )}
                </div>
                <div className="mc-actions">
                  <button className="mc-icon-link" aria-label="View"><Eye size={16} /></button>
                  <button className="mc-icon-link mc-icon-link--danger" aria-label="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <div className="mc-total-row">Total: 0</div>
          </div>
        ))}
        <div className="mc-card mc-card--compact"><h2>Total Score</h2><div className="mc-total-row">0</div></div>
      </div>
      )}
      {tab === 2 && (
      <div className="mc-domain">
        {[
          {
            title: '1. Profitability',
            rows: [
              { sub: 'Revenue', q: 'Is revenue growing?' },
              { sub: 'Cost management', q: 'Are unit costs declining?' },
            ],
          },
          {
            title: '2. Balance Sheet',
            rows: [
              { sub: 'Working capital management', q: 'Is WC well managed?' },
              { sub: 'Assets management', q: 'Are assets well managed?' },
              { sub: 'Debt manageability', q: 'Is debt properly managed?' },
              { sub: 'OBS Items', q: 'Are OBS items in favor of the company?' },
            ],
          },
          {
            title: '3. Cash Flows',
            rows: [
              { sub: 'Operating cash flow', q: 'Is OCF stable and growing?' },
              { sub: 'Capital expenses', q: 'Has the company made notable and necessary CAPEX?' },
            ],
          },
          {
            title: '4. Projections',
            rows: [
              { sub: 'Assumptions', q: 'Are assumptions realistic (based on existing facts)?' },
            ],
          },
          {
            title: '5. Financial Management',
            rows: [
              { sub: 'Quality of financial records', q: 'Does the company have proper financial records?' },
              { sub: 'Financial reporting', q: 'Are financials properly reported?' },
              { sub: 'Internal controls', q: 'Do internal controls exist?' },
              { sub: 'Tax liability', q: 'Are all taxes fully paid?' },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="mc-card">
            <h2>{section.title}</h2>
            <div className="mc-list mc-list--head">
              <div>Sub Domain</div>
              <div>Question</div>
              <div>Rating</div>
              <div>Score</div>
              <div>Attachment</div>
              <div>Actions</div>
            </div>
            {section.rows.map((r) => (
              <div key={r.sub} className="mc-list">
                <div>{r.sub}</div>
                <div>{r.q}</div>
                <div>
                  <select
                    className="mc-select"
                    value={ratings[getKey(section.title, r.sub)] || 'no'}
                    onChange={(e) => setRatings((prev) => ({ ...prev, [getKey(section.title, r.sub)]: e.target.value as any }))}
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>{getScoreFromRating(ratings[getKey(section.title, r.sub)])}</div>
                <div>
                  <input
                    id={`file-${getKey(section.title, r.sub)}`}
                    type="file"
                    aria-label={`Upload attachment for ${r.sub}`}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setAttachments((prev) => ({ ...prev, [getKey(section.title, r.sub)]: file ? file.name : '' }));
                    }}
                  />
                  <button
                    className={"mc-icon-link" + (attachments[getKey(section.title, r.sub)] ? " mc-icon-link--ok" : "")}
                    aria-label="Upload attachment"
                    onClick={() => {
                      const el = document.getElementById(`file-${getKey(section.title, r.sub)}`) as HTMLInputElement | null;
                      el?.click();
                    }}
                  >
                    <Paperclip size={16} />
                  </button>
                  {attachments[getKey(section.title, r.sub)] && (
                    <span className="mc-file-name" title={attachments[getKey(section.title, r.sub)]}>
                      {attachments[getKey(section.title, r.sub)]}
                    </span>
                  )}
                </div>
                <div className="mc-actions">
                  <button className="mc-icon-link" aria-label="View"><Eye size={16} /></button>
                  <button className="mc-icon-link mc-icon-link--danger" aria-label="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <div className="mc-total-row">Total: 0</div>
          </div>
        ))}
        <div className="mc-card mc-card--compact"><h2>Total Score</h2><div className="mc-total-row">0</div></div>
      </div>
      )}
      {tab === 3 && (
      <div className="mc-domain">
        {[
          {
            title: '1. Management Capacity',
            rows: [
              { sub: 'Vision clarity', q: 'Is the vision clear?', attach: 'Vision statement' },
              { sub: 'Management structure', q: 'Is the management structure clear?', attach: 'Organogram' },
              { sub: 'Track record', q: 'Does the team have credible track record?', attach: 'Management CVs' },
              { sub: 'Management commitment', q: 'Is the management fully committed?', attach: 'Works schedules and contracts' },
              { sub: 'Team capacity', q: 'Does the team have relevant technical competence?', attach: 'CVs' },
              { sub: 'Performance measurement', q: 'Is performance measured?', attach: 'KPIs' },
              { sub: 'Professional development', q: 'Does the company have a proper PD and or on-job training?', attach: 'Organization PD plans/Job training modules' },
            ],
          },
          {
            title: '2. MIS',
            rows: [
              { sub: 'Data management', q: 'Is data collected and properly managed?', attach: 'Data protection policy' },
              { sub: 'System used', q: 'Is there an MIS for handling organization operations?', attach: 'MIS' },
              { sub: 'System effectiveness', q: 'Is the MIS used effective?', attach: 'MIS' },
            ],
          },
          {
            title: '3. Quality Management',
            rows: [
              { sub: 'Quality control', q: 'Is quality check a norm at the company?', attach: 'Quality manuals, quality control reports' },
              { sub: 'Quality management team', q: 'Are there personnel in charge of quality control?', attach: 'JD' },
            ],
          },
          {
            title: '4. Overall Operations',
            rows: [
              { sub: 'Platform utilization', q: 'Is the platform optimally utilized?', attach: 'Actual vis-a-vis ideal' },
              { sub: 'Customer relations', q: 'Is customer relationship management organized?', attach: 'CRM/Platform/MIS/Automated Real-Time Responses' },
            ],
          },
          {
            title: '5. Strategy & Planning',
            rows: [
              { sub: 'Business strategy', q: 'Does the company have a business strategy?', attach: 'Strategy documents' },
              { sub: 'Organization Planning', q: 'Is there a formal planning process?', attach: 'Planning doc/tool' },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="mc-card">
            <h2>{section.title}</h2>
            <div className="mc-list mc-list--head">
              <div>Sub Domain</div>
              <div>Question</div>
              <div>Rating</div>
              <div>Score</div>
              <div>Attachment</div>
              <div>Actions</div>
            </div>
            {section.rows.map((r) => (
              <div key={r.sub} className="mc-list">
                <div>{r.sub}</div>
                <div>{r.q}</div>
                <div>
                  <select
                    className="mc-select"
                    value={ratings[getKey(section.title, r.sub)] || 'no'}
                    onChange={(e) => setRatings((prev) => ({ ...prev, [getKey(section.title, r.sub)]: e.target.value as any }))}
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>{getScoreFromRating(ratings[getKey(section.title, r.sub)])}</div>
                <div>
                  <input
                    id={`file-${getKey(section.title, r.sub)}`}
                    type="file"
                    aria-label={`Upload attachment for ${r.sub}`}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setAttachments((prev) => ({ ...prev, [getKey(section.title, r.sub)]: file ? file.name : '' }));
                    }}
                  />
                  <button
                    className={"mc-icon-link" + (attachments[getKey(section.title, r.sub)] ? " mc-icon-link--ok" : "")}
                    aria-label="Upload attachment"
                    onClick={() => {
                      const el = document.getElementById(`file-${getKey(section.title, r.sub)}`) as HTMLInputElement | null;
                      el?.click();
                    }}
                  >
                    <Paperclip size={16} />
                  </button>
                  {attachments[getKey(section.title, r.sub)] && (
                    <span className="mc-file-name" title={attachments[getKey(section.title, r.sub)]}>
                      {attachments[getKey(section.title, r.sub)]}
                    </span>
                  )}
                </div>
                <div className="mc-actions">
                  <button className="mc-icon-link" aria-label="View"><Eye size={16} /></button>
                  <button className="mc-icon-link mc-icon-link--danger" aria-label="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <div className="mc-total-row">Total: 0</div>
          </div>
        ))}
        <div className="mc-card mc-card--compact"><h2>Total Score</h2><div className="mc-total-row">0</div></div>
      </div>
      )}
      {tab === 1 && (
      <div className="mc-domain">
        {[
          {
            title: 'Market Demand & Share',
            rows: [
              { sub: 'Demand', q: 'Is there sufficient evidence for demand of your product?' },
              { sub: 'Market share', q: 'Is the market share growing?' },
            ],
          },
          {
            title: 'Sales & Traction',
            rows: [
              { sub: 'Sales', q: 'Are sales growing on a monthly/quarterly/annual basis?' },
              { sub: 'Customer segments', q: 'Are there customer segments and clear focus?' },
              { sub: 'Payment terms', q: 'Are payment terms in favor of the company?' },
              { sub: 'Sales strategy', q: 'Is the sales strategy consistent with growth plans?' },
            ],
          },
          {
            title: 'Product Development',
            rows: [
              { sub: 'Product development', q: 'Are there clear product road maps?' },
              { sub: 'Product distribution', q: 'Are products properly distributed?' },
              { sub: 'Product pricing basis', q: 'Are products properly priced?' },
            ],
          },
          {
            title: 'Competition',
            rows: [
              { sub: 'Level of competition', q: 'Do you understand the level of competition and have you conducted analysis?' },
              { sub: 'Competitive advantage', q: 'Does the company have a clear competitive advantage?' },
            ],
          },
          {
            title: 'Marketing',
            rows: [
              { sub: 'Marketing strategy', q: 'Is the marketing strategy consistent with growth plans?' },
              { sub: 'Packaging & branding', q: "Are the company's products properly packed and branded?" },
              { sub: 'Product promotion', q: 'Is there a clear promotion strategy?' },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="mc-card">
            <h2>{section.title}</h2>
            <div className="mc-list mc-list--head">
              <div>Sub Domain</div>
              <div>Question</div>
              <div>Rating</div>
              <div>Score</div>
              <div>Attachment</div>
              <div>Actions</div>
            </div>
            {section.rows.map((r, idx) => (
              <div key={r.sub} className="mc-list">
                <div>{r.sub}</div>
                <div>{r.q}</div>
                <div>
                  <select
                    className="mc-select"
                    value={ratings[getKey(section.title, r.sub)] || 'no'}
                    onChange={(e) => setRatings((prev) => ({ ...prev, [getKey(section.title, r.sub)]: e.target.value as any }))}
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>{getScoreFromRating(ratings[getKey(section.title, r.sub)])}</div>
                <div>
                  <input
                    id={`file-${getKey(section.title, r.sub)}`}
                    type="file"
                    aria-label={`Upload attachment for ${r.sub}`}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setAttachments((prev) => ({ ...prev, [getKey(section.title, r.sub)]: file ? file.name : '' }));
                    }}
                  />
                  <button
                    className={"mc-icon-link" + (attachments[getKey(section.title, r.sub)] ? " mc-icon-link--ok" : "")}
                    aria-label="Upload attachment"
                    onClick={() => {
                      const el = document.getElementById(`file-${getKey(section.title, r.sub)}`) as HTMLInputElement | null;
                      el?.click();
                    }}
                  >
                    <Paperclip size={16} />
                  </button>
                  {attachments[getKey(section.title, r.sub)] && (
                    <span className="mc-file-name" title={attachments[getKey(section.title, r.sub)]}>
                      {attachments[getKey(section.title, r.sub)]}
                    </span>
                  )}
                </div>
                <div className="mc-actions">
                  <button className="mc-icon-link" aria-label="View"><Eye size={16} /></button>
                  <button className="mc-icon-link mc-icon-link--danger" aria-label="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <div className="mc-total-row">Total: 0</div>
          </div>
        ))}
        <div className="mc-card mc-card--compact"><h2>Total Score</h2><div className="mc-total-row">0</div></div>
      </div>
      )}
    </div>
  );
}

