import React from 'react';
import { Target, Sparkles } from 'lucide-react';

export const ObjectiveSection = ({ data, onChange, errors }) => {
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
          <Target size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--slate-900)' }}>Career Objective & Summary</h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>Highlight your primary goals and professional pitch</p>
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="objective">
          <span>Professional Summary / Objective</span>
          <span className="optional-badge">AI will polish & enhance this</span>
        </label>
        <textarea
          id="objective"
          name="objective"
          rows={4}
          className={`form-textarea ${errors?.objective ? 'error' : ''}`}
          placeholder="Passionate software engineer with 4+ years of experience in building scalable full-stack applications. Proven track record in optimizing cloud architecture and leading agile development teams..."
          value={data.objective || ''}
          onChange={(e) => onChange({ ...data, objective: e.target.value })}
        />
        <p className="form-hint" style={{ marginTop: '0.375rem' }}>
          Tip: You can provide brief bullet points or rough notes. Our AI will craft an executive narrative tailored to your target role.
        </p>
      </div>
    </div>
  );
};
