
import ApiService from './apiService';
import { mockBrands, mockOffers, mockSpendingTrends } from '../data/mockData';

export interface BrandData {
  id: number;
  brand: string;
  targetUrl: string;
  adCount: number;
  impressions: string;
  spend: string;
  performance: number;
  hashKeys: string[];
}

export interface Offer {
  id: number;
  brand: string;
  offer: string;
  startDate: string;
  endDate: string;
  discount: string;
}

export interface SpendingTrend {
  month: string;
  Verizon: number;
  ATT: number;
  TMobile: number;
  Xfinity: number;
  Spectrum: number;
}

class BrandService extends ApiService {
  async getBrands(): Promise<BrandData[]> {
    const data = await this.get<BrandData[]>('/brands');
    
    // For demo, return mock data
    return mockBrands;
  }
  
  async getOffers(): Promise<Offer[]> {
    const data = await this.get<Offer[]>('/offers');
    
    // For demo, return mock data
    return mockOffers;
  }
  
  async getSpendingTrends(): Promise<SpendingTrend[]> {
    const data = await this.get<SpendingTrend[]>('/spending-trends');
    
    // For demo, return mock data
    return mockSpendingTrends;
  }
}

export default new BrandService();
