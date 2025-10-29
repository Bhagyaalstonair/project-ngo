import React, { useState, useEffect } from 'react';
import { GrantApplicationForm } from '../components/modules/GrantApplicationForm';
import { GrantApplicationList } from '../components/modules/GrantApplicationList';
import { GrantApplication, GrantApplicationFormData } from '../types/grantApplication';
import { useAuth } from '../contexts/AuthContext';

type ViewMode = 'list' | 'form' | 'details';

export function GrantApplicationPage() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [applications, setApplications] = useState<GrantApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<GrantApplication | null>(null);

  // Load applications from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('grant_applications');
    if (stored) {
      setApplications(JSON.parse(stored));
    }
  }, []);

  // Save applications to localStorage whenever applications change
  useEffect(() => {
    localStorage.setItem('grant_applications', JSON.stringify(applications));
  }, [applications]);

  const handleSubmitApplication = async (formData: GrantApplicationFormData): Promise<boolean> => {
    try {
      const newApplication: GrantApplication = {
        id: Date.now().toString(),
        ...formData,
        submissionDate: new Date().toISOString(),
        status: 'submitted',
        createdBy: user?.id || 'anonymous'
      };

      setApplications(prev => [newApplication, ...prev]);
      return true;
    } catch (error) {
      console.error('Error submitting application:', error);
      return false;
    }
  };

  const handleViewDetails = (application: GrantApplication) => {
    setSelectedApplication(application);
    setViewMode('details');
  };

  const handleUpdateStatus = (id: string, status: GrantApplication['status'], notes?: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, status, reviewNotes: notes, updatedAt: new Date().toISOString() }
          : app
      )
    );
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedApplication(null);
  };

  if (viewMode === 'form') {
    return (
      <GrantApplicationForm
        onBack={handleBack}
        onSubmit={handleSubmitApplication}
      />
    );
  }

  if (viewMode === 'details' && selectedApplication) {
    return (
      <ApplicationDetails
        application={selectedApplication}
        onBack={handleBack}
        onUpdateStatus={handleUpdateStatus}
        canManage={user?.role === 'admin' || user?.role === 'executive'}
      />
    );
  }

  return (
    <GrantApplicationList
      applications={applications}
      onViewDetails={handleViewDetails}
      onUpdateStatus={handleUpdateStatus}
      onNewApplication={() => setViewMode('form')}
    />
  );
}

// Application Details Component
interface ApplicationDetailsProps {
  application: GrantApplication;
  onBack: () => void;
  onUpdateStatus: (id: string, status: GrantApplication['status'], notes?: string) => void;
  canManage: boolean;
}

function ApplicationDetails({ application, onBack, onUpdateStatus, canManage }: ApplicationDetailsProps) {
  const [reviewNotes, setReviewNotes] = useState(application.reviewNotes || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (status: GrantApplication['status']) => {
    setIsUpdating(true);
    try {
      onUpdateStatus(application.id, status, reviewNotes);
      setTimeout(() => {
        onBack();
      }, 1000);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: GrantApplication['status']) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={onBack}
                className="text-orange-500 hover:text-orange-600 mb-4 flex items-center gap-2"
              >
                ← Back to Applications
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{application.projectTitle}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(application.status)}`}>
                  {application.status.replace('-', ' ')}
                </span>
                <span className="text-gray-500">
                  Submitted on {new Date(application.submissionDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Applicant Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{application.applicantName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{application.applicantEmail}</p>
              </div>
              {application.applicantPhone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{application.applicantPhone}</p>
                </div>
              )}
              {application.organizationName && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organization</label>
                  <p className="text-gray-900">{application.organizationName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Project Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900 whitespace-pre-wrap">{application.projectDescription}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <p className="text-gray-900 capitalize">{application.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Requested Amount</label>
                  <p className="text-gray-900 font-semibold">₹{application.requestedAmount.toLocaleString()}</p>
                </div>
                {application.projectDuration && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <p className="text-gray-900">{application.projectDuration}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Review Section (Admin/Executive only) */}
          {canManage && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review & Actions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes</label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={4}
                    placeholder="Add review notes..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatusUpdate('under-review')}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                  >
                    Mark Under Review
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('approved')}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Existing Review Notes */}
          {application.reviewNotes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Review Notes</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 whitespace-pre-wrap">{application.reviewNotes}</p>
                {application.updatedAt && (
                  <p className="text-sm text-gray-500 mt-2">
                    Last updated: {new Date(application.updatedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}