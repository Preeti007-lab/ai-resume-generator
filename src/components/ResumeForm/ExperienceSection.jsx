import React from 'react';
import { Briefcase, Plus, Trash2, Calendar, MapPin } from 'lucide-react';

export const ExperienceSection = ({ data, onChange }) => {
  const experiences = data.experience || [];

  const handleAdd = () => {
    const newExp = {
      id: Date.now().toString(),
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      highlights: ''
    };
    onChange({ ...data, experience: [...experiences, newExp] });
  };

  const handleRemove = (index) => {
    const updated = experiences.filter((_, idx) => idx !== index);
    onChange({ ...data, experience: updated });
  };

  const handleFieldChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'isCurrent' && value === true) {
      updated[index].endDate = 'Present';
    }
    onChange({ ...data, experience: updated });
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
            <Briefcase size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', color: 'var(--slate-900)' }}>Work Experience</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>Add your career history starting with the most recent role</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--slate-200)' }}>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            No work experience added yet. Fresh graduate or career switcher? You can skip or add internships.
          </p>
          <button type="button" onClick={handleAdd} className="btn btn-outline btn-sm">
            <Plus size={14} /> Add First Experience
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              style={{
                backgroundColor: 'var(--slate-50)',
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-slate" style={{ fontSize: '0.8125rem' }}>
                  Position #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--danger)', padding: '4px 8px' }}
                  title="Remove this experience"
                >
                  <Trash2 size={15} />
                  <span>Remove</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.875rem' }}>
                {/* Role */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Senior Software Engineer"
                    value={exp.role || ''}
                    onChange={(e) => handleFieldChange(idx, 'role', e.target.value)}
                  />
                </div>

                {/* Company */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Acme Corp / Tech Corp"
                    value={exp.company || ''}
                    onChange={(e) => handleFieldChange(idx, 'company', e.target.value)}
                  />
                </div>

                {/* Location */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                    Location (e.g. Remote or City, Country)
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. New York, NY (Remote)"
                    value={exp.location || ''}
                    onChange={(e) => handleFieldChange(idx, 'location', e.target.value)}
                  />
                </div>

                {/* Dates */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                      Start Date
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Jan 2021"
                      value={exp.startDate || ''}
                      onChange={(e) => handleFieldChange(idx, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                      End Date
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder={exp.isCurrent ? 'Present' : 'e.g. Present or Dec 2023'}
                      value={exp.isCurrent ? 'Present' : (exp.endDate || '')}
                      disabled={exp.isCurrent}
                      onChange={(e) => handleFieldChange(idx, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Current Role Checkbox */}
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id={`current-role-${idx}`}
                  checked={!!exp.isCurrent}
                  onChange={(e) => handleFieldChange(idx, 'isCurrent', e.target.checked)}
                  style={{ accentColor: 'var(--primary)', width: 16, height: 16, cursor: 'pointer' }}
                />
                <label htmlFor={`current-role-${idx}`} style={{ fontSize: '0.8125rem', color: 'var(--slate-700)', cursor: 'pointer' }}>
                  I currently work here
                </label>
              </div>

              {/* Highlights & Achievements */}
              <div className="form-group" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                  Key Responsibilities & Impact
                </label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  placeholder="• Spearheaded migration of legacy monolith to microservices reducing latency by 35%&#10;• Mentored 4 junior engineers and facilitated agile sprint planning"
                  value={exp.highlights || ''}
                  onChange={(e) => handleFieldChange(idx, 'highlights', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
