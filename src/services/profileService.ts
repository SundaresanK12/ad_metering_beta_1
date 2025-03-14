
import ApiService from './apiService';
import { mockProfiles } from '../data/mockData';
import { toast } from 'sonner';

export interface CustomerProfile {
  id: string;
  name: string;
  segmentSize: string;
  campaigns: number;
  status: 'active' | 'inactive';
  demographics: {
    ageRange: string;
    income: string;
    location: string[];
    interests: string[];
  };
  behavioralAttributes: {
    deviceUsage: string;
    dataConsumption: string;
    planType: string[];
  };
}

class ProfileService extends ApiService {
  async getProfiles(): Promise<CustomerProfile[]> {
    const data = await this.get<CustomerProfile[]>('/profiles');
    
    // For demo, return mock data with type conversion to remove readonly
    return JSON.parse(JSON.stringify(mockProfiles)) as CustomerProfile[];
  }
  
  async getProfile(id: string): Promise<CustomerProfile | null> {
    const data = await this.get<CustomerProfile>(`/profiles/${id}`);
    
    // For demo, return mock data
    const profile = mockProfiles.find(p => p.id === id);
    if (!profile) return null;
    
    // Convert readonly arrays to mutable
    return JSON.parse(JSON.stringify(profile)) as CustomerProfile;
  }
  
  async createProfile(profile: Omit<CustomerProfile, 'id'>): Promise<CustomerProfile | null> {
    const data = await this.post<Omit<CustomerProfile, 'id'>, CustomerProfile>('/profiles', profile);
    
    // For demo, return mock created profile
    const newProfile: CustomerProfile = {
      ...profile,
      id: `prof_${Math.random().toString(36).substring(2, 11)}`
    };
    
    toast.success('Profile created successfully');
    return newProfile;
  }
  
  async updateProfile(id: string, profile: Partial<CustomerProfile>): Promise<CustomerProfile | null> {
    const data = await this.put<Partial<CustomerProfile>, CustomerProfile>(`/profiles/${id}`, profile);
    
    // For demo, return mock updated profile
    const existingProfile = mockProfiles.find(p => p.id === id);
    if (!existingProfile) return null;
    
    // Convert from readonly to mutable
    const baseProfile = JSON.parse(JSON.stringify(existingProfile)) as CustomerProfile;
    const updatedProfile = { ...baseProfile, ...profile };
    
    toast.success('Profile updated successfully');
    return updatedProfile;
  }
  
  async deleteProfile(id: string): Promise<boolean> {
    await this.delete<{success: boolean}>(`/profiles/${id}`);
    
    // For demo, return success
    toast.success('Profile deleted successfully');
    return true;
  }
}

export default new ProfileService();
