
import { toast } from 'sonner';
import ApiService from './apiService';

interface PdfData {
  filename: string;
  content: string;
  timestamp: Date;
  fileSize: number;
}

interface MongoConnection {
  connectionString: string;
  database: string;
  collection: string;
}

// This service extends the base ApiService
class MongoService extends ApiService {
  private connection: MongoConnection | null = null;
  private isConnected: boolean = false;
  
  async connect(connectionString: string, database: string, collection: string): Promise<boolean> {
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app with our API layer, we would make an API call like:
      // const result = await this.post<MongoConnection, {success: boolean}>('/mongo/connect', {
      //   connectionString,
      //   database,
      //   collection
      // });
      
      // For the demo, we'll just store the connection details
      this.connection = {
        connectionString,
        database,
        collection
      };
      
      this.isConnected = true;
      
      console.log(`Connected to MongoDB: ${database}.${collection}`);
      toast.success('Connected to MongoDB successfully');
      
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      toast.error('Failed to connect to MongoDB');
      
      this.isConnected = false;
      return false;
    }
  }
  
  async savePdfData(data: PdfData): Promise<{ _id: string } | null> {
    if (!this.isConnected || !this.connection) {
      toast.error('Not connected to MongoDB');
      return null;
    }
    
    try {
      // In a real app with our API layer, we would make an API call like:
      // const result = await this.post<PdfData, {_id: string}>('/mongo/pdf-data', data);
      // return result;
      
      // Simulate saving delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For the demo, we'll simulate a successful save
      const mockId = 'mongo_' + Math.random().toString(36).substring(2, 15);
      
      console.log(`Saved PDF data to MongoDB with ID: ${mockId}`);
      toast.success('PDF data saved to MongoDB');
      
      return { _id: mockId };
    } catch (error) {
      console.error('MongoDB save error:', error);
      toast.error('Failed to save data to MongoDB');
      
      return null;
    }
  }
  
  isDbConnected(): boolean {
    return this.isConnected;
  }
  
  getConnectionDetails(): MongoConnection | null {
    return this.connection;
  }
}

// Export as a singleton
export default new MongoService();
