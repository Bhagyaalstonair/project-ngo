export interface GrantApplication {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  organizationName?: string;
  projectTitle: string;
  projectDescription: string;
  requestedAmount: number;
  projectDuration?: string;
  category: 'education' | 'healthcare' | 'infrastructure' | 'environment' | 'other';
  submissionDate: string;
  status: 'submitted' | 'under-review' | 'approved' | 'rejected';
  reviewNotes?: string;
  attachments?: string[];
  createdBy?: string;
  updatedAt?: string;
}

export interface GrantApplicationFormData {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  organizationName: string;
  projectTitle: string;
  projectDescription: string;
  requestedAmount: number;
  projectDuration: string;
  category: 'education' | 'healthcare' | 'infrastructure' | 'environment' | 'other';
}