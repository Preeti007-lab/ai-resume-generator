import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = 24, message = 'Loading...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem',
      gap: '0.75rem',
      color: 'var(--slate-500)'
    }}>
      <Loader2 size={size} className="animate-spin" style={{ color: 'var(--primary)' }} />
      {message && <p style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{message}</p>}
    </div>
  );
};

export const GenerationProgress = ({ currentStep = 1 }) => {
  const steps = [
    'Parsing structured candidate profile...',
    'Synthesizing professional career summary...',
    'Enhancing achievements with industry keywords...',
    'Formatting ATS-friendly executive resume...'
  ];

  return (
    <div className="card animate-fade-in" style={{ maxWidth: 540, margin: '2rem auto', textAlign: 'center', padding: '2.5rem 2rem' }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'var(--primary-light)',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem'
      }}>
        <Loader2 size={28} className="animate-spin" />
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Generating Your Resume with AI</h3>
      <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', marginBottom: '1.75rem' }}>
        Please wait while Groq AI transforms your profile into an executive-grade resume.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.875rem',
                color: isDone ? 'var(--success)' : isActive ? 'var(--slate-900)' : 'var(--slate-400)',
                fontWeight: isActive ? 600 : 400
              }}
            >
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                backgroundColor: isDone ? 'var(--success-light)' : isActive ? 'var(--primary-light)' : 'var(--slate-100)',
                color: isDone ? 'var(--success)' : isActive ? 'var(--primary)' : 'var(--slate-400)',
                border: isActive ? '1.5px solid var(--primary)' : '1px solid transparent'
              }}>
                {isDone ? '✓' : idx + 1}
              </div>
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
