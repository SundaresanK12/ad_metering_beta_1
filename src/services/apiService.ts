import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private baseUrl: string = API_BASE_URL;

  protected async get<T>(endpoint: string): Promise<T | null> {
    try {
      // For demo purposes, simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // This would be a real fetch in production
      // const response = await fetch(`${this.baseUrl}${endpoint}`);
      // if (!response.ok) throw new Error(`API error: ${response.status}`);
      // return await response.json();
      
      console.log(`GET request to ${endpoint}`);
      return null; // Will be overridden by mock data in child services
    } catch (error) {
      console.error(`GET request failed for ${endpoint}:`, error);
      toast.error(`Failed to fetch data: ${(error as Error).message}`);
      return null;
    }
  }

  protected async post<T, R>(endpoint: string, data: T): Promise<R | null> {
    try {
      // For demo purposes, simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would be a real fetch in production
      // const response = await fetch(`${this.baseUrl}${endpoint}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // if (!response.ok) throw new Error(`API error: ${response.status}`);
      // return await response.json();
      
      console.log(`POST request to ${endpoint}`, data);
      return null; // Will be overridden by mock data in child services
    } catch (error) {
      console.error(`POST request failed for ${endpoint}:`, error);
      toast.error(`Failed to save data: ${(error as Error).message}`);
      return null;
    }
  }

  protected async put<T, R>(endpoint: string, data: T): Promise<R | null> {
    try {
      // For demo purposes, simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would be a real fetch in production
      // const response = await fetch(`${this.baseUrl}${endpoint}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // if (!response.ok) throw new Error(`API error: ${response.status}`);
      // return await response.json();
      
      console.log(`PUT request to ${endpoint}`, data);
      return null; // Will be overridden by mock data in child services
    } catch (error) {
      console.error(`PUT request failed for ${endpoint}:`, error);
      toast.error(`Failed to update data: ${(error as Error).message}`);
      return null;
    }
  }

  protected async delete<R>(endpoint: string): Promise<R | null> {
    try {
      // For demo purposes, simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would be a real fetch in production
      // const response = await fetch(`${this.baseUrl}${endpoint}`, {
      //   method: 'DELETE'
      // });
      // if (!response.ok) throw new Error(`API error: ${response.status}`);
      // return await response.json();
      
      console.log(`DELETE request to ${endpoint}`);
      return null; // Will be overridden by mock data in child services
    } catch (error) {
      console.error(`DELETE request failed for ${endpoint}:`, error);
      toast.error(`Failed to delete data: ${(error as Error).message}`);
      return null;
    }
  }
}

export default ApiService;
