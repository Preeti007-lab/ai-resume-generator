import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { apiService } from '../services/api';
import { ResumeCard } from '../components/ResumeCard';
import { ResumePreview } from '../components/ResumePreview/ResumePreview';
import { DeleteModal } from '../components/UI/DeleteModal';
import { EmptyState } from '../components/UI/EmptyState';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { useToast } from '../context/ToastContext';
import { LayoutDashboard, Plus, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';

export const MyResumesPage = () => {
  const { getToken } = useAuth();
  const { showSuccess, showError } = useToast();

  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Resume viewing state
  const [selectedResume, setSelectedResume] = useState(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch resumes from API
  const fetchResumes = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const data = await apiService.getResumes(token);
      setResumes(data || []);
    } catch (err) {
      console.error('Error fetching resumes:', err);
      setError(err.message || 'Failed to load your resumes.');
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    const resumeId = deleteTarget._id || deleteTarget.id || deleteTarget.resumeId;
    if (!resumeId) {
      showError('Unable to identify resume ID.');
      setDeleteTarget(null);
      return;
    }

    setIsDeleting(true);
    try {
      const token = await getToken();
      await apiService.deleteResume(resumeId, token);

      // Optimistically update list
      setResumes((prev) => prev.filter((r) => (r._id || r.id || r.resumeId) !== resumeId));
      showSuccess('Resume deleted successfully.');
      
      // If we were currently viewing this deleted resume, close preview
      if (selectedResume && (selectedResume._id || selectedResume.id) === resumeId) {
        setSelectedResume(null);
      }

      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete resume failed:', err);
      showError(err.message || 'Failed to delete resume.');
    } finally {
      setIsDeleting(false);
    }
  };

  // If user is currently viewing a specific resume
  if (selectedResume) {
    return (
      <div className="container" style={{ padding: '2.5rem 1.5rem 4rem' }}>
        <ResumePreview
          resume={selectedResume}
          onBack={() => setSelectedResume(null)}
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2.5rem'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.375rem' }}>
            <span className="badge badge-lavender">
              <LayoutDashboard size={12} /> Dashboard
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', color: 'var(--slate-900)' }}>My Saved Resumes</h1>
          <p style={{ color: 'var(--slate-600)', fontSize: '0.9375rem' }}>
            Manage, review, and print all your AI-generated resumes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={fetchResumes}
            className="btn btn-secondary btn-sm"
            disabled={isLoading}
            title="Refresh list"
          >
            <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          
          <Link to="/generate" className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Create New Resume</span>
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={{ padding: '4rem 0' }}>
          <LoadingSpinner size={36} message="Retrieving your saved resumes..." />
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="card" style={{ maxWidth: 540, margin: '2rem auto', textAlign: 'center', padding: '2.5rem 2rem' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: 'var(--danger-light)',
            color: 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <AlertCircle size={24} />
          </div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Failed to Load Resumes</h3>
          <p style={{ color: 'var(--slate-600)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{error}</p>
          <button onClick={fetchResumes} className="btn btn-primary btn-sm">
            <RefreshCw size={14} /> Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && resumes.length === 0 && (
        <EmptyState
          title="No Resumes Created Yet"
          description="You haven't generated any resumes yet. Fill in your details to create your first executive ATS-friendly resume."
          actionText="Generate Your First Resume"
          actionLink="/generate"
        />
      )}

      {/* Resume Grid */}
      {!isLoading && !error && resumes.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {resumes.map((resume, idx) => (
            <ResumeCard
              key={resume._id || resume.id || idx}
              resume={resume}
              onView={(item) => setSelectedResume(item)}
              onDelete={(item) => setDeleteTarget(item)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title="Delete Saved Resume"
        description={`Are you sure you want to delete "${deleteTarget?.title || deleteTarget?.targetRole || 'this resume'}"? This action is permanent and cannot be reversed.`}
      />
    </div>
  );
};
