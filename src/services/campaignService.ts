
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
    try {
      const data = await this.get<Campaign[]>('/campaigns');
      return data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      // Fallback to mock data with type conversion to remove readonly
      return JSON.parse(JSON.stringify(mockCampaigns)) as Campaign[];
    }
  }
  
  async getCampaign(id: string): Promise<Campaign | null> {
    try {
      const data = await this.get<Campaign>(`/campaigns/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching campaign ${id}:`, error);
      // Fallback to mock data
      const campaign = mockCampaigns.find(c => c.id === id);
      if (!campaign) return null;
      
      // Convert readonly arrays to mutable
      return JSON.parse(JSON.stringify(campaign)) as Campaign;
    }
  }
  
  async createCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign | null> {
    try {
      const data = await this.post<Omit<Campaign, 'id'>, Campaign>('/campaigns', campaign);
      toast.success('Campaign created successfully');
      return data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign');
      
      // For demo fallback, return mock created campaign
      const newCampaign: Campaign = {
        ...campaign,
        id: `camp_${Math.random().toString(36).substring(2, 11)}`
      };
      
      return newCampaign;
    }
  }
  
  async updateCampaign(id: string, campaign: Partial<Campaign>): Promise<Campaign | null> {
    try {
      const data = await this.put<Partial<Campaign>, Campaign>(`/campaigns/${id}`, campaign);
      toast.success('Campaign updated successfully');
      return data;
    } catch (error) {
      console.error(`Error updating campaign ${id}:`, error);
      toast.error('Failed to update campaign');
      
      // For demo fallback, return mock updated campaign
      const existingCampaign = mockCampaigns.find(c => c.id === id);
      if (!existingCampaign) return null;
      
      // Convert from readonly to mutable
      const baseCampaign = JSON.parse(JSON.stringify(existingCampaign)) as Campaign;
      const updatedCampaign = { ...baseCampaign, ...campaign };
      
      return updatedCampaign;
    }
  }
  
  async deleteCampaign(id: string): Promise<boolean> {
    try {
      await this.delete<{success: boolean}>(`/campaigns/${id}`);
      toast.success('Campaign deleted successfully');
      return true;
    } catch (error) {
      console.error(`Error deleting campaign ${id}:`, error);
      toast.error('Failed to delete campaign');
      return false;
    }
  }
}

export default new CampaignService();
