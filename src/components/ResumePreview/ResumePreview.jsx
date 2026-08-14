import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Trophy,
  Share2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ResumePreview = ({ resume, onBack, onNavigateResumes }) => {
  const { showSuccess } = useToast();
  const [copied, setCopied] = useState(false);

  if (!resume) return null;

  // Extract structured resume fields or fallback if nested in resume.data or resume.content
  const rawData = resume.data || resume.generatedResume || resume;
  const isRawString = typeof rawData === 'string';

  // Extract fields normalized
  const personal = rawData.personalDetails || rawData.personal || {
    fullName: rawData.fullName || rawData.name || 'Candidate Name',
    targetRole: rawData.targetRole || rawData.role || rawData.title || '',
    email: rawData.email || '',
    phone: rawData.phone || '',
    location: rawData.location || '',
    links: rawData.links || ''
  };

  const summary = rawData.objective || rawData.summary || rawData.professionalSummary || '';
  const experiences = Array.isArray(rawData.experience) ? rawData.experience : [];
  const educations = Array.isArray(rawData.education) ? rawData.education : [];
  
  // Skills normalization (array of strings or comma-separated string or object)
  let skills = [];
  if (Array.isArray(rawData.skills)) {
    skills = rawData.skills;
  } else if (typeof rawData.skills === 'string') {
    skills = rawData.skills.split(',').map(s => s.trim()).filter(Boolean);
  }

  const projects = Array.isArray(rawData.projects) ? rawData.projects : [];
  const certifications = Array.isArray(rawData.certifications) ? rawData.certifications : [];
  
  let achievements = [];
  if (Array.isArray(rawData.achievements)) {
    achievements = rawData.achievements;
  } else if (typeof rawData.achievements === 'string') {
    achievements = rawData.achievements.split('\n').map(a => a.trim()).filter(Boolean);
  }

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  // Handle copy text
  const handleCopy = () => {
    let text = `${personal.fullName}\n${personal.targetRole}\n${personal.email} | ${personal.phone} | ${personal.location}\n\n`;
    if (summary) text += `SUMMARY\n${summary}\n\n`;
    
    if (experiences.length > 0) {
      text += `EXPERIENCE\n`;
      experiences.forEach(e => {
        text += `${e.role} — ${e.company} (${e.startDate} - ${e.endDate || 'Present'})\n${e.highlights || ''}\n\n`;
      });
    }

    if (educations.length > 0) {
      text += `EDUCATION\n`;
      educations.forEach(ed => {
        text += `${ed.degree}, ${ed.institution} (${ed.graduationYear || ''})\n`;
      });
      text += `\n`;
    }

    if (skills.length > 0) {
      text += `SKILLS\n${skills.join(', ')}\n\n`;
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showSuccess('Resume plain text copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Top Action Bar (hidden during print) */}
      <div
        className="preview-actions-bar no-print"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--slate-200)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {onBack && (
            <button onClick={onBack} className="btn btn-secondary btn-sm">
              <ArrowLeft size={16} />
              <span>Back / Edit Details</span>
            </button>
          )}
          {onNavigateResumes && (
            <button onClick={onNavigateResumes} className="btn btn-ghost btn-sm">
              View in My Resumes
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <button onClick={handleCopy} className="btn btn-secondary btn-sm" title="Copy to clipboard">
            {copied ? <Check size={16} style={{ color: 'var(--success)' }} /> : <Copy size={16} />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>
          
          <button onClick={handlePrint} className="btn btn-primary btn-sm" title="Print or Save as PDF">
            <Printer size={16} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Render Resume Paper */}
      <div className="resume-preview-wrapper">
        {isRawString ? (
          <div className="resume-paper" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {rawData}
          </div>
        ) : (
          <div className="resume-paper" id="resume-document">
            {/* Header / Personal Details */}
            <header className="resume-header">
              <h1 className="resume-name">{personal.fullName || 'Candidate Name'}</h1>
              {personal.targetRole && <div className="resume-title">{personal.targetRole}</div>}
              
              <div className="resume-contact-bar">
                {personal.email && (
                  <span className="resume-contact-item">
                    <Mail size={14} />
                    <span>{personal.email}</span>
                  </span>
                )}
                {personal.phone && (
                  <span className="resume-contact-item">
                    <Phone size={14} />
                    <span>{personal.phone}</span>
                  </span>
                )}
                {personal.location && (
                  <span className="resume-contact-item">
                    <MapPin size={14} />
                    <span>{personal.location}</span>
                  </span>
                )}
                {personal.links && (
                  <span className="resume-contact-item">
                    <Globe size={14} />
                    <span>{personal.links}</span>
                  </span>
                )}
              </div>
            </header>

            {/* Professional Summary / Objective */}
            {summary && (
              <section className="resume-section">
                <h2 className="resume-section-title">
                  <Briefcase size={16} style={{ color: 'var(--primary)' }} />
                  Professional Summary
                </h2>
                <p className="resume-entry-description" style={{ fontSize: '0.90625rem', lineHeight: 1.6 }}>
                  {summary}
                </p>
              </section>
            )}

            {/* Work Experience */}
            {experiences.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">
                  <Briefcase size={16} style={{ color: 'var(--primary)' }} />
                  Work Experience
                </h2>
                {experiences.map((exp, idx) => (
                  <div key={exp.id || idx} className="resume-entry">
                    <div className="resume-entry-header">
                      <div>
                        <span className="resume-entry-title">{exp.role || 'Role Title'}</span>
                        <span className="resume-entry-subtitle"> — {exp.company || 'Company'}</span>
                        {exp.location && <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}> ({exp.location})</span>}
                      </div>
                      <div className="resume-entry-dates">
                        {exp.startDate || ''} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : (exp.endDate || '')}
                      </div>
                    </div>
                    {exp.highlights && (
                      <div className="resume-entry-description">
                        {exp.highlights.includes('\n') || exp.highlights.includes('•') ? (
                          <ul className="resume-bullet-list">
                            {exp.highlights
                              .split('\n')
                              .map(l => l.replace(/^•\s*/, '').trim())
                              .filter(Boolean)
                              .map((line, i) => (
                                <li key={i}>{line}</li>
                              ))}
                          </ul>
                        ) : (
                          <p style={{ marginTop: '0.25rem' }}>{exp.highlights}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Education */}
            {educations.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">
                  <GraduationCap size={16} style={{ color: 'var(--primary)' }} />
                  Education
                </h2>
                {educations.map((edu, idx) => (
                  <div key={edu.id || idx} className="resume-entry">
                    <div className="resume-entry-header">
                      <div>
                        <span className="resume-entry-title">{edu.degree || 'Degree'}</span>
                        <span className="resume-entry-subtitle">, {edu.institution || 'Institution'}</span>
                        {edu.fieldOfStudy && <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}> ({edu.fieldOfStudy})</span>}
                      </div>
                      <div className="resume-entry-dates">
                        {edu.graduationYear || ''}
                      </div>
                    </div>
                    {edu.gpa && (
                      <p style={{ fontSize: '0.8125rem', color: 'var(--slate-600)', marginTop: '0.125rem' }}>
                        Honors / GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Technical Skills */}
            {skills.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">
                  <Wrench size={16} style={{ color: 'var(--primary)' }} />
                  Skills & Expertise
                </h2>
                <div className="resume-skills-grid">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="resume-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">
                  <FolderGit2 size={16} style={{ color: 'var(--primary)' }} />
                  Key Projects
                </h2>
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="resume-entry">
                    <div className="resume-entry-header">
                      <div>
                        <span className="resume-entry-title">{proj.name || 'Project Name'}</span>
                        {proj.techStack && (
                          <span style={{ fontSize: '0.8125rem', color: 'var(--primary)', marginLeft: '0.5rem', fontWeight: 500 }}>
                            [{proj.techStack}]
                          </span>
                        )}
                      </div>
                      {proj.link && (
                        <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                          {proj.link}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="resume-entry-description" style={{ marginTop: '0.25rem' }}>
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">
                  <Award size={16} style={{ color: 'var(--primary)' }} />
                  Certifications
                </h2>
                <ul className="resume-bullet-list">
                  {certifications.map((cert, idx) => (
                    <li key={cert.id || idx}>
                      <strong>{cert.name}</strong>
                      {cert.issuer && ` — ${cert.issuer}`}
                      {cert.year && ` (${cert.year})`}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">
                  <Trophy size={16} style={{ color: 'var(--primary)' }} />
                  Honors & Achievements
                </h2>
                <ul className="resume-bullet-list">
                  {achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
