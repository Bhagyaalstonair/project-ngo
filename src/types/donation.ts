export interface Donation {
  id: string;
  donorName: string;
  donorCountry?: string;
  isForeign: boolean;
  remittanceRef?: string;
  currency?: string;
  amount?: number;
  convertedAmount?: number;
  conversionRate?: number;
  FIRC?: string;
  attachments?: string[];
  purposeTag?: string;
  usageRestriction?: string;
  createdBy?: string;
  createdAt?: string;
  notes?: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'one-time' | 'recurring';
}

export interface FcraRegistration {
  registrationNumber: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
}