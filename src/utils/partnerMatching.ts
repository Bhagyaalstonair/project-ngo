import { Partner, PartnerMatchScore, MatchingCriteria } from '../types/partner';

export const calculatePartnerMatch = (
  partner: Partner,
  criteria: MatchingCriteria,
  currentProjects: string[] = []
): PartnerMatchScore => {
  const factors = {
    sectorMatch: calculateSectorMatch(partner, criteria.sectors),
    locationRelevance: calculateLocationRelevance(partner, criteria.location),
    projectAlignment: calculateProjectAlignment(partner, criteria.projectType, currentProjects),
    resourceFit: calculateResourceFit(partner, criteria.budgetRange)
  };

  const weights = { sectorMatch: 0.3, locationRelevance: 0.25, projectAlignment: 0.3, resourceFit: 0.15 };
  const score = Object.entries(factors).reduce((sum, [key, value]) => 
    sum + value * weights[key as keyof typeof weights], 0
  );

  return {
    partnerId: partner.id,
    score: Math.round(score * 100) / 100,
    matchingFactors: factors,
    reasons: generateMatchReasons(factors, partner, criteria)
  };
};

const calculateSectorMatch = (partner: Partner, sectors: string[]): number => {
  if (!partner.projects?.length || !sectors.length) return 0.3;
  
  const partnerSectors = extractSectorsFromProjects(partner.projects);
  const matches = sectors.filter(s => partnerSectors.includes(s.toLowerCase()));
  return Math.min(1, matches.length / sectors.length + 0.2);
};

const calculateLocationRelevance = (partner: Partner, targetLocation: string): number => {
  if (!partner.location || !targetLocation) return 0.5;
  
  const partnerRegion = partner.location.region.toLowerCase();
  const target = targetLocation.toLowerCase();
  
  if (partnerRegion.includes(target) || target.includes(partnerRegion)) return 1;
  if (partner.level === 'national' || partner.level === 'international') return 0.8;
  return 0.3;
};

const calculateProjectAlignment = (partner: Partner, projectType: string, currentProjects: string[]): number => {
  if (!partner.projects?.length) return 0.4;
  
  const hasRelevantExperience = partner.projects.some(p => 
    p.toLowerCase().includes(projectType.toLowerCase())
  );
  const hasCurrentCollaboration = currentProjects.some(p => 
    partner.projects?.includes(p)
  );
  
  return hasRelevantExperience ? (hasCurrentCollaboration ? 1 : 0.8) : 0.3;
};

const calculateResourceFit = (partner: Partner, budgetRange: [number, number]): number => {
  const partnerLevel = partner.level;
  const [min, max] = budgetRange;
  
  const levelCapacity = {
    local: 500000,
    regional: 2000000,
    national: 10000000,
    international: 50000000
  };
  
  const capacity = levelCapacity[partnerLevel];
  if (min <= capacity && max >= capacity * 0.1) return 1;
  if (min <= capacity * 2) return 0.7;
  return 0.3;
};

const extractSectorsFromProjects = (projects: string[]): string[] => {
  const sectorKeywords = {
    education: ['education', 'school', 'learning', 'literacy'],
    healthcare: ['health', 'medical', 'hospital', 'clinic'],
    environment: ['environment', 'green', 'climate', 'conservation'],
    rural: ['rural', 'village', 'agriculture', 'farming']
  };
  
  const sectors: string[] = [];
  projects.forEach(project => {
    const projectLower = project.toLowerCase();
    Object.entries(sectorKeywords).forEach(([sector, keywords]) => {
      if (keywords.some(keyword => projectLower.includes(keyword))) {
        sectors.push(sector);
      }
    });
  });
  
  return [...new Set(sectors)];
};

const generateMatchReasons = (
  factors: PartnerMatchScore['matchingFactors'],
  partner: Partner,
  criteria: MatchingCriteria
): string[] => {
  const reasons: string[] = [];
  
  if (factors.sectorMatch > 0.7) {
    reasons.push(`Strong sector alignment with ${criteria.sectors.join(', ')}`);
  }
  if (factors.locationRelevance > 0.8) {
    reasons.push(`Excellent geographic coverage for ${criteria.location}`);
  }
  if (factors.projectAlignment > 0.7) {
    reasons.push(`Proven experience in ${criteria.projectType} projects`);
  }
  if (factors.resourceFit > 0.8) {
    reasons.push(`Resource capacity matches project requirements`);
  }
  if (partner.status === 'active') {
    reasons.push('Currently active and available for collaboration');
  }
  
  return reasons.slice(0, 3);
};

export const rankPartners = (
  partners: Partner[],
  criteria: MatchingCriteria,
  currentProjects: string[] = []
): PartnerMatchScore[] => {
  return partners
    .filter(p => p.status === 'active')
    .map(partner => calculatePartnerMatch(partner, criteria, currentProjects))
    .sort((a, b) => b.score - a.score);
};