import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';

export const CertificationsSection = ({ data, onChange }) => {
  const certifications = data.certifications || [];

  const handleAdd = () => {
    const newCert = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      year: ''
    };
    onChange({ ...data, certifications: [...certifications, newCert] });
  };

  const handleRemove = (index) => {
    const updated = certifications.filter((_, idx) => idx !== index);
    onChange({ ...data, certifications: updated });
  };

  const handleFieldChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, certifications: updated });
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
            <Award size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', color: 'var(--slate-900)' }}>Certifications</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>Professional licenses, credentials, and courses</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={16} />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--slate-200)' }}>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            No certifications added yet.
          </p>
          <button type="button" onClick={handleAdd} className="btn btn-outline btn-sm">
            <Plus size={14} /> Add Certification
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {certifications.map((cert, idx) => (
            <div
              key={cert.id || idx}
              style={{
                backgroundColor: 'var(--slate-50)',
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto',
                gap: '0.75rem',
                alignItems: 'center'
              }}
            >
              <input
                type="text"
                className="form-input"
                placeholder="Certification Name (e.g. AWS Certified Solutions Architect)"
                value={cert.name || ''}
                onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Issuing Organization (e.g. Amazon Web Services)"
                value={cert.issuer || ''}
                onChange={(e) => handleFieldChange(idx, 'issuer', e.target.value)}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Year / Credential ID (e.g. 2023)"
                value={cert.year || ''}
                onChange={(e) => handleFieldChange(idx, 'year', e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="btn btn-ghost btn-sm"
                style={{ color: 'var(--danger)', padding: '6px' }}
                title="Remove certification"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
