
import ApiService from './apiService';
import { mockExperiments } from '../data/mockData';
import { toast } from 'sonner';

export interface Experiment {
  id: string;
  name: string;
  campaignId: string;
  startDate: Date;
  endDate?: Date;
  status: 'planned' | 'running' | 'complete';
  variants: {
    a: {
      name: string;
      description: string;
      conversionRate: number;
    };
    b: {
      name: string;
      description: string;
      conversionRate: number;
    };
  };
  winner?: 'a' | 'b' | null;
  confidence: number;
}

class ExperimentService extends ApiService {
  async getExperiments(): Promise<Experiment[]> {
    const data = await this.get<Experiment[]>('/experiments');
    
    // For demo, return mock data with type conversion to remove readonly
    return JSON.parse(JSON.stringify(mockExperiments)) as Experiment[];
  }
  
  async getExperiment(id: string): Promise<Experiment | null> {
    const data = await this.get<Experiment>(`/experiments/${id}`);
    
    // For demo, return mock data
    const experiment = mockExperiments.find(e => e.id === id);
    if (!experiment) return null;
    
    // Convert readonly arrays to mutable
    return JSON.parse(JSON.stringify(experiment)) as Experiment;
  }
  
  async createExperiment(experiment: Omit<Experiment, 'id'>): Promise<Experiment | null> {
    const data = await this.post<Omit<Experiment, 'id'>, Experiment>('/experiments', experiment);
    
    // For demo, return mock created experiment
    const newExperiment: Experiment = {
      ...experiment,
      id: `exp_${Math.random().toString(36).substring(2, 11)}`
    };
    
    toast.success('Experiment created successfully');
    return newExperiment;
  }
  
  async updateExperiment(id: string, experiment: Partial<Experiment>): Promise<Experiment | null> {
    const data = await this.put<Partial<Experiment>, Experiment>(`/experiments/${id}`, experiment);
    
    // For demo, return mock updated experiment
    const existingExperiment = mockExperiments.find(e => e.id === id);
    if (!existingExperiment) return null;
    
    // Convert from readonly to mutable
    const baseExperiment = JSON.parse(JSON.stringify(existingExperiment)) as Experiment;
    const updatedExperiment = { ...baseExperiment, ...experiment };
    
    toast.success('Experiment updated successfully');
    return updatedExperiment;
  }
  
  async deleteExperiment(id: string): Promise<boolean> {
    await this.delete<{success: boolean}>(`/experiments/${id}`);
    
    // For demo, return success
    toast.success('Experiment deleted successfully');
    return true;
  }
}

export default new ExperimentService();
