import React, { useState } from 'react';
import { Trophy, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const AchievementsSection = ({ data, onChange }) => {
  const achievements = Array.isArray(data.achievements)
    ? data.achievements
    : (typeof data.achievements === 'string' ? data.achievements.split('\n').map(a => a.trim()).filter(Boolean) : []);

  const [inputVal, setInputVal] = useState('');

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    onChange({ ...data, achievements: [...achievements, trimmed] });
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index) => {
    const updated = achievements.filter((_, idx) => idx !== index);
    onChange({ ...data, achievements: updated });
  };

  const handleEdit = (index, value) => {
    const updated = [...achievements];
    updated[index] = value;
    onChange({ ...data, achievements: updated });
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--slate-100)' }}>
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
          <Trophy size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--slate-900)' }}>Key Achievements & Honors</h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>Awards, hackathon wins, publications, or competitive recognitions</p>
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label className="form-label" htmlFor="achievement-input">
          <span>Add Achievement / Award</span>
          <span className="optional-badge">Press Enter to add</span>
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            id="achievement-input"
            type="text"
            className="form-input"
            placeholder="e.g. 1st Place at Global AI Hackathon 2024 (over 500 teams competing)"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAdd}
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {achievements.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {achievements.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--slate-50)',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--slate-200)'
              }}
            >
              <span style={{ color: 'var(--warning)', display: 'flex' }}>★</span>
              <input
                type="text"
                className="form-input"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '2px 6px',
                  boxShadow: 'none',
                  fontSize: '0.875rem'
                }}
                value={item}
                onChange={(e) => handleEdit(idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="btn btn-ghost btn-sm"
                style={{ color: 'var(--danger)', padding: '4px', border: 'none' }}
                title="Remove achievement"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
