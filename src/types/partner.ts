export interface Partner {
  id: string;
  name: string;
  level: 'local' | 'regional' | 'national' | 'international';
  location?: {
    address: string;
    country: string;
    region: string;
  };
  contact?: {
    email: string;
    phone: string;
  };
  description?: string;
  website?: string;
  established?: string;
  status: 'active' | 'pending' | 'inactive';
  projects?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PartnerFormData extends Omit<Partner, 'id' | 'createdAt' | 'updatedAt'> {}

export interface PartnerStats {
  totalPartners: number;
  activePartners: number;
  partnersByLevel: {
    local: number;
    regional: number;
    national: number;
    international: number;
  };
  totalProjects: number;
}

export interface PartnerMatchScore {
  partnerId: string;
  score: number;
  matchingFactors: {
    sectorMatch: number;
    locationRelevance: number;
    projectAlignment: number;
    resourceFit: number;
  };
  reasons: string[];
}

export interface PartnerRecommendation {
  partner: Partner;
  matchScore: PartnerMatchScore;
  suggestedProjects?: string[];
}

export interface MatchingCriteria {
  sectors: string[];
  location: string;
  projectType: string;
  budgetRange: [number, number];
  urgency: 'low' | 'medium' | 'high';
}