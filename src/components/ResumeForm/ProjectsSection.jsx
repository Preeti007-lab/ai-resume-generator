import React from 'react';
import { FolderGit2, Plus, Trash2, Link as LinkIcon } from 'lucide-react';

export const ProjectsSection = ({ data, onChange }) => {
  const projects = data.projects || [];

  const handleAdd = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      techStack: '',
      link: '',
      description: ''
    };
    onChange({ ...data, projects: [...projects, newProject] });
  };

  const handleRemove = (index) => {
    const updated = projects.filter((_, idx) => idx !== index);
    onChange({ ...data, projects: updated });
  };

  const handleFieldChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, projects: updated });
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--slate-100)', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FolderGit2 size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', color: 'var(--slate-900)' }}>Projects</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>Highlight key personal, open-source, or academic projects</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--slate-200)' }}>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            No projects added yet.
          </p>
          <button type="button" onClick={handleAdd} className="btn btn-outline btn-sm">
            <Plus size={14} /> Add Project
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {projects.map((proj, idx) => (
            <div
              key={proj.id || idx}
              style={{
                backgroundColor: 'var(--slate-50)',
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
                <span className="badge badge-slate" style={{ fontSize: '0.8125rem' }}>
                  Project #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--danger)', padding: '4px 8px' }}
                  title="Remove project"
                >
                  <Trash2 size={15} />
                  <span>Remove</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.875rem' }}>
                {/* Project Name */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. AI Content Studio / Cloud Analytics"
                    value={proj.name || ''}
                    onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
                  />
                </div>

                {/* Tech Stack */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                    Tech Stack / Tools
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. React, Next.js, Node, PostgreSQL"
                    value={proj.techStack || ''}
                    onChange={(e) => handleFieldChange(idx, 'techStack', e.target.value)}
                  />
                </div>

                {/* Link */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                    Project URL / GitHub Link
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. github.com/username/project"
                    value={proj.link || ''}
                    onChange={(e) => handleFieldChange(idx, 'link', e.target.value)}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-group" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                  Description & Key Highlights
                </label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Architected a real-time collaborative workspace with WebSockets and Redis, scaling to 10k daily active users."
                  value={proj.description || ''}
                  onChange={(e) => handleFieldChange(idx, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
