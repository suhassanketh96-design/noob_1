
export enum PartCategory {
  CPU = 'CPU',
  GPU = 'GPU',
  RAM = 'RAM',
  MOTHERBOARD = 'Motherboard',
  STORAGE = 'Storage',
  POWER_SUPPLY = 'Power Supply',
  CASE = 'Case',
  COOLING = 'Cooling'
}

export interface PCPart {
  id: string;
  name: string;
  category: PartCategory;
  price: number;
  specs: Record<string, string | number>;
  performanceScore: number; // 0-100 scale
  imageUrl: string;
  brand: string;
}

export interface PCBuild {
  id: string;
  name: string;
  parts: Partial<Record<PartCategory, PCPart>>;
  totalPrice: number;
}

export interface RecommendationRequest {
  budget: number;
  usage: 'gaming' | 'streaming' | 'productivity' | 'content-creation';
  preferences: string;
}
