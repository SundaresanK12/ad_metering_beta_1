
import ApiService from './apiService';
import { mockCampaigns } from '../data/mockData';
import { toast } from 'sonner';

export interface Campaign {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'ended' | 'planning';
  budget: number;
  targetProfiles: string[];
  description: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
  };
}

class CampaignService extends ApiService {
  async getCampaigns(): Promise<Campaign[]> {
    const data = await this.get<Campaign[]>('/campaigns');
    
    // For demo, return mock data with type conversion to remove readonly
    return JSON.parse(JSON.stringify(mockCampaigns)) as Campaign[];
  }
  
  async getCampaign(id: string): Promise<Campaign | null> {
    const data = await this.get<Campaign>(`/campaigns/${id}`);
    
    // For demo, return mock data
    const campaign = mockCampaigns.find(c => c.id === id);
    if (!campaign) return null;
    
    // Convert readonly arrays to mutable
    return JSON.parse(JSON.stringify(campaign)) as Campaign;
  }
  
  async createCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign | null> {
    const data = await this.post<Omit<Campaign, 'id'>, Campaign>('/campaigns', campaign);
    
    // For demo, return mock created campaign
    const newCampaign: Campaign = {
      ...campaign,
      id: `camp_${Math.random().toString(36).substring(2, 11)}`
    };
    
    toast.success('Campaign created successfully');
    return newCampaign;
  }
  
  async updateCampaign(id: string, campaign: Partial<Campaign>): Promise<Campaign | null> {
    const data = await this.put<Partial<Campaign>, Campaign>(`/campaigns/${id}`, campaign);
    
    // For demo, return mock updated campaign
    const existingCampaign = mockCampaigns.find(c => c.id === id);
    if (!existingCampaign) return null;
    
    // Convert from readonly to mutable
    const baseCampaign = JSON.parse(JSON.stringify(existingCampaign)) as Campaign;
    const updatedCampaign = { ...baseCampaign, ...campaign };
    
    toast.success('Campaign updated successfully');
    return updatedCampaign;
  }
  
  async deleteCampaign(id: string): Promise<boolean> {
    await this.delete<{success: boolean}>(`/campaigns/${id}`);
    
    // For demo, return success
    toast.success('Campaign deleted successfully');
    return true;
  }
}

export default new CampaignService();
