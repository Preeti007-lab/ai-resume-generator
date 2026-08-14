import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: Icon = FileText,
  title = 'No Resumes Found',
  description = 'You have not created any resumes yet. Generate your first professional AI resume in seconds.',
  actionText = 'Generate New Resume',
  actionLink = '/generate',
  onAction
}) => {
  return (
    <div
      className="card animate-fade-in"
      style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        maxWidth: '560px',
        margin: '2rem auto',
        border: '2px dashed var(--slate-200)',
        backgroundColor: 'var(--white)'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}
      >
        <Icon size={32} />
      </div>

      <h3 style={{ fontSize: '1.25rem', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
        {title}
      </h3>

      <p style={{ color: 'var(--slate-600)', fontSize: '0.9375rem', marginBottom: '1.75rem', maxWidth: '420px', margin: '0 auto 1.75rem' }}>
        {description}
      </p>

      {actionLink ? (
        <Link to={actionLink} className="btn btn-primary btn-md">
          <Plus size={18} />
          {actionText}
        </Link>
      ) : onAction ? (
        <button onClick={onAction} className="btn btn-primary btn-md">
          <Plus size={18} />
          {actionText}
        </button>
      ) : null}
    </div>
  );
};
