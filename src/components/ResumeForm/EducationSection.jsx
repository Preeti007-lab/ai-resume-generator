import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export const EducationSection = ({ data, onChange }) => {
  const educations = data.education || [];

  const handleAdd = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      graduationYear: '',
      gpa: ''
    };
    onChange({ ...data, education: [...educations, newEdu] });
  };

  const handleRemove = (index) => {
    const updated = educations.filter((_, idx) => idx !== index);
    onChange({ ...data, education: updated });
  };

  const handleFieldChange = (index, field, value) => {
    const updated = [...educations];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, education: updated });
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
            <GraduationCap size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', color: 'var(--slate-900)' }}>Education</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>Degrees, diplomas, and academic credentials</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {educations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--slate-200)' }}>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            No education entries added yet.
          </p>
          <button type="button" onClick={handleAdd} className="btn btn-outline btn-sm">
            <Plus size={14} /> Add Education
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {educations.map((edu, idx) => (
            <div
              key={edu.id || idx}
              style={{
                backgroundColor: 'var(--slate-50)',
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-slate" style={{ fontSize: '0.8125rem' }}>
                  Degree #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--danger)', padding: '4px 8px' }}
                  title="Remove education"
                >
                  <Trash2 size={15} />
                  <span>Remove</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.875rem' }}>
                {/* Institution */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                    University / College / School
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. University of California, Berkeley"
                    value={edu.institution || ''}
                    onChange={(e) => handleFieldChange(idx, 'institution', e.target.value)}
                  />
                </div>

                {/* Degree */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                    Degree & Major
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Bachelor of Science in Computer Science"
                    value={edu.degree || ''}
                    onChange={(e) => handleFieldChange(idx, 'degree', e.target.value)}
                  />
                </div>

                {/* Graduation Year */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                    Year / Duration
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 2018 - 2022"
                    value={edu.graduationYear || ''}
                    onChange={(e) => handleFieldChange(idx, 'graduationYear', e.target.value)}
                  />
                </div>

                {/* Score / GPA */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                    GPA / Honors (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 3.85 / 4.0 or Magna Cum Laude"
                    value={edu.gpa || ''}
                    onChange={(e) => handleFieldChange(idx, 'gpa', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
