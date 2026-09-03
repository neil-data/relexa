export type SectorId = 'healthcare' | 'frozen-foods' | 'pet-nutrition' | 'steel';

export interface SectorDetail {
  id: SectorId;
  number: string;
  title: string;
  subtitle: string;
  mood: string;
  tagline: string;
  description: string;
  fullNarrative: string;
  heroImage: string;
  fallbackImage: string;
  secondaryImage: string;
  accentColor: string;
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  specifications: {
    key: string;
    value: string;
  }[];
  certifications: string[];
  subCategories: string[];
  exportDestinations: string[];
}

export interface ProductItem {
  id: string;
  sectorId: SectorId;
  name: string;
  category: string;
  image: string;
  description: string;
  specs: Record<string, string>;
  packaging: string;
  containerCapacity: string;
  moq: string;
  certifications: string[];
}

export interface GlobalRoute {
  id: string;
  destination: string;
  region: string;
  port: string;
  coordinates: [number, number]; // lat, lng
  transitTime: string;
  frequency: string;
  primaryCargo: string;
}

export interface CertificationItem {
  code: string;
  name: string;
  authority: string;
  sector: string;
  description: string;
}


