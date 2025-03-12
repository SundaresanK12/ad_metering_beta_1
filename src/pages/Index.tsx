
import React, { useState, useEffect } from 'react';
import PdfUploader from '@/components/PdfUploader';
import PdfViewer from '@/components/PdfViewer';
import MongoDbForm from '@/components/MongoDbForm';
import ExtractedData from '@/components/ExtractedData';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Database, FileText } from 'lucide-react';
import usePdfExtractor from '@/hooks/usePdfExtractor';
import mongoService from '@/services/mongoService';
import { toast } from 'sonner';

const Index = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { extractTextFromPdf, extractedText, isProcessing } = usePdfExtractor();
  const [isConnected, setIsConnected] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedToDb, setSavedToDb] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    _id?: string;
    filename: string;
    content: string;
    timestamp: Date;
    fileSize: number;
  } | null>(null);

  useEffect(() => {
    // Check if already connected to MongoDB on component mount
    setIsConnected(mongoService.isDbConnected());
  }, []);

  const handleFileSelect = async (file: File) => {
    setPdfFile(file);
    setSavedToDb(false);
    
    try {
      const text = await extractTextFromPdf(file);
      
      if (text) {
        setExtractedData({
          filename: file.name,
          content: text,
          timestamp: new Date(),
          fileSize: file.size
        });
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      toast.error('Failed to extract text from PDF');
    }
  };

  const handleConnectionSuccess = async (connectionString: string, database: string, collection: string) => {
    try {
      const success = await mongoService.connect(connectionString, database, collection);
      setIsConnected(success);
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect to MongoDB');
    }
  };

  const handleSaveToDb = async () => {
    if (!extractedData) {
      toast.error('No data to save');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const result = await mongoService.savePdfData(extractedData);
      
      if (result && result._id) {
        setExtractedData({
          ...extractedData,
          _id: result._id
        });
        setSavedToDb(true);
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save data to MongoDB');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="text-center mb-12 animate-slide-down">
          <div className="inline-flex items-center justify-center p-2 bg-primary/5 rounded-full mb-3">
            <FileText className="h-6 w-6 text-primary" />
            <ArrowRight className="h-4 w-4 mx-2 text-primary/70" />
            <Database className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">PDF Mongo Muncher</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Extract text from PDF documents and store it in MongoDB with minimal effort
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">1</div>
                <h2 className="text-lg font-medium">Upload PDF</h2>
              </div>
              <PdfUploader onFileSelect={handleFileSelect} isProcessing={isProcessing} />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">2</div>
                <h2 className="text-lg font-medium">Connect to MongoDB</h2>
              </div>
              <MongoDbForm 
                onConnectionSuccess={handleConnectionSuccess}
                onSaveToDb={handleSaveToDb}
                isConnected={isConnected}
                isSaving={isSaving}
                hasExtractedData={!!extractedData}
              />
            </div>
            
            <ExtractedData data={extractedData} savedToDb={savedToDb} />
          </div>

          <div className="space-y-3 animate-fade-in delay-100">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">3</div>
              <h2 className="text-lg font-medium">Preview & Process</h2>
            </div>
            <PdfViewer 
              pdfFile={pdfFile} 
              extractedText={extractedText}
              isProcessing={isProcessing}
            />
          </div>
        </div>

        <Separator className="my-10 opacity-50" />
        
        <footer className="text-center text-sm text-muted-foreground animate-fade-in delay-200">
          <p>
            PDF Mongo Muncher | Easily extract and store PDF data in MongoDB
          </p>
          <p className="mt-1">
            <a href="https://github.com/your-repo" className="text-primary hover:underline transition-colors">
              Github
            </a>
            {" • "}
            <a href="#" className="text-primary hover:underline transition-colors">
              Documentation
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
