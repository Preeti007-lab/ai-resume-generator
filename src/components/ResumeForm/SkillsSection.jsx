import React, { useState } from 'react';
import { Wrench, Plus, X, Tag } from 'lucide-react';

export const SkillsSection = ({ data, onChange }) => {
  const [skillInput, setSkillInput] = useState('');
  const skills = Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : []);

  const handleAddSkill = (e) => {
    e?.preventDefault();
    const trimmed = skillInput.trim();
    if (!trimmed) return;

    // Support comma separated addition
    const newItems = trimmed.split(',').map(s => s.trim()).filter(s => s && !skills.includes(s));
    if (newItems.length > 0) {
      onChange({ ...data, skills: [...skills, ...newItems] });
    }
    setSkillInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    onChange({ ...data, skills: updated });
  };

  const handleQuickAdd = (preset) => {
    if (!skills.includes(preset)) {
      onChange({ ...data, skills: [...skills, preset] });
    }
  };

  const popularSkills = [
    'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Docker',
    'AWS', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs', 'Git', 'Tailwind CSS', 'Next.js'
  ];

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
          <Wrench size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--slate-900)' }}>Skills & Competencies</h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>Add technical proficiencies, frameworks, tools, and methodologies</p>
        </div>
      </div>

      {/* Input box */}
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label className="form-label" htmlFor="skill-input">
          <span>Add Skill</span>
          <span className="optional-badge">Press Enter or comma to add</span>
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            id="skill-input"
            type="text"
            className="form-input"
            placeholder="e.g. React, TypeScript, System Architecture..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddSkill}
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* Selected skill chips */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>
            Added Skills ({skills.length}):
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="badge badge-primary"
                style={{
                  padding: '0.375rem 0.625rem',
                  fontSize: '0.875rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                  aria-label={`Remove skill ${skill}`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Suggestions */}
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginBottom: '0.375rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Popular Suggestions:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {popularSkills.map((preset) => {
            const isAdded = skills.includes(preset);
            if (isAdded) return null;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => handleQuickAdd(preset)}
                className="btn btn-ghost btn-sm"
                style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'var(--slate-100)',
                  border: '1px solid var(--slate-200)'
                }}
              >
                + {preset}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
