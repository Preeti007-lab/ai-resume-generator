import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Briefcase } from 'lucide-react';

export const PersonalDetailsSection = ({ data, onChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
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
          <User size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--slate-900)' }}>Personal Details</h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>Provide your contact and identification details</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            <span>Full Name <span className="required-badge">*</span></span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={`form-input ${errors?.fullName ? 'error' : ''}`}
              placeholder="e.g. Alex Morgan"
              value={data.fullName || ''}
              onChange={handleChange}
              required
            />
          </div>
          {errors?.fullName && <p className="form-error">{errors.fullName}</p>}
        </div>

        {/* Target Job Title */}
        <div className="form-group">
          <label className="form-label" htmlFor="targetRole">
            <span>Target Job Title <span className="required-badge">*</span></span>
          </label>
          <input
            id="targetRole"
            name="targetRole"
            type="text"
            className={`form-input ${errors?.targetRole ? 'error' : ''}`}
            placeholder="e.g. Senior Full Stack Engineer"
            value={data.targetRole || ''}
            onChange={handleChange}
          />
          {errors?.targetRole && <p className="form-error">{errors.targetRole}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            <span>Email Address <span className="required-badge">*</span></span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-input ${errors?.email ? 'error' : ''}`}
            placeholder="alex.morgan@example.com"
            value={data.email || ''}
            onChange={handleChange}
            required
          />
          {errors?.email && <p className="form-error">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            <span>Phone Number</span>
            <span className="optional-badge">Optional</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="+1 (555) 234-5678"
            value={data.phone || ''}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label className="form-label" htmlFor="location">
            <span>Location (City, State / Country)</span>
            <span className="optional-badge">Optional</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            className="form-input"
            placeholder="San Francisco, CA"
            value={data.location || ''}
            onChange={handleChange}
          />
        </div>

        {/* LinkedIn / Portfolio */}
        <div className="form-group">
          <label className="form-label" htmlFor="links">
            <span>LinkedIn / Portfolio / GitHub</span>
            <span className="optional-badge">Optional</span>
          </label>
          <input
            id="links"
            name="links"
            type="text"
            className="form-input"
            placeholder="linkedin.com/in/alexmorgan or github.com/alex"
            value={data.links || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
