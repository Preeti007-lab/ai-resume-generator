import React from 'react';
import { FileText, Calendar, Trash2, Eye, ExternalLink, Sparkles } from 'lucide-react';

export const ResumeCard = ({ resume, onView, onDelete }) => {
  // Normalize resume data structure
  const rawData = resume.data || resume.generatedResume || resume;
  const personal = rawData.personalDetails || rawData.personal || {
    fullName: rawData.fullName || resume.fullName || 'Untitled Resume',
    targetRole: rawData.targetRole || resume.targetRole || resume.title || 'Professional Resume'
  };

  const title = resume.title || personal.targetRole || 'Professional Resume';
  const name = personal.fullName || resume.fullName || 'Candidate';
  const summary = rawData.objective || rawData.summary || '';
  
  // Format creation date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently created';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return 'Recently created';
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Recently created';
    }
  };

  const creationDate = formatDate(resume.createdAt || resume.created_at || resume.date);
  const skillsCount = Array.isArray(rawData.skills) ? rawData.skills.length : 0;
  const experienceCount = Array.isArray(rawData.experience) ? rawData.experience.length : 0;

  return (
    <div className="card card-hover animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <FileText size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.0625rem', color: 'var(--slate-900)', fontWeight: 700, lineHeight: 1.3 }}>
              {title}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 500 }}>
              {name}
            </p>
          </div>
        </div>

        <span className="badge badge-slate" style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <Calendar size={12} />
          {creationDate}
        </span>
      </div>

      {summary && (
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--slate-600)',
          margin: '0.5rem 0 1rem',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {summary}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', marginTop: 'auto' }}>
        {experienceCount > 0 && (
          <span className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
            {experienceCount} {experienceCount === 1 ? 'Role' : 'Roles'}
          </span>
        )}
        {skillsCount > 0 && (
          <span className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
            {skillsCount} Skills
          </span>
        )}
        <span className="badge badge-primary" style={{ fontSize: '0.75rem', marginLeft: 'auto' }}>
          <Sparkles size={10} /> AI Optimized
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.875rem',
        borderTop: '1px solid var(--slate-100)',
        gap: '0.5rem'
      }}>
        <button
          onClick={() => onView(resume)}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
        >
          <Eye size={15} />
          View Resume
        </button>

        <button
          onClick={() => onDelete(resume)}
          className="btn btn-danger-outline btn-sm"
          style={{ padding: '0.375rem 0.625rem' }}
          title="Delete resume"
          aria-label="Delete this resume"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};
