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

export interface RfqFormData {
  sector: SectorId;
  products: string[];
  containerType: '20ft FCL' | '40ft HC FCL' | '40ft Reefer' | 'Break Bulk / LCL';
  estimatedVolume: string;
  destinationCountry: string;
  destinationPort: string;
  incoterm: 'FOB (Mundra / JNPT)' | 'CIF' | 'CFR' | 'DDP';
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  notes: string;
}
