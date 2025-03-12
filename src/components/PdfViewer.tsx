
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText } from 'lucide-react';

interface PdfViewerProps {
  pdfFile: File | null;
  extractedText: string | null;
  isProcessing: boolean;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfFile, extractedText, isProcessing }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (pdfFile) {
      const objectUrl = URL.createObjectURL(pdfFile);
      setPdfUrl(objectUrl);
      
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPdfUrl(null);
    }
  }, [pdfFile]);

  if (!pdfFile && !extractedText) {
    return (
      <Card className="flex items-center justify-center h-full min-h-[400px] bg-secondary/10 backdrop-blur-sm animate-fade-in">
        <div className="text-center p-8">
          <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground/70">PDF Preview</h3>
          <p className="text-sm text-muted-foreground/50 max-w-md mx-auto mt-2">
            Upload a PDF to see its preview and extract text content
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden h-full min-h-[400px] animate-fade-in bg-white/5 backdrop-blur-sm border border-border/50">
      {isProcessing ? (
        <div className="h-full w-full flex flex-col justify-center items-center p-8 space-y-4">
          <Skeleton className="h-4 w-3/4 animate-pulse" />
          <Skeleton className="h-4 w-2/3 animate-pulse" />
          <Skeleton className="h-4 w-5/6 animate-pulse" />
          <Skeleton className="h-4 w-4/5 animate-pulse" />
          <p className="text-sm text-muted-foreground animate-pulse mt-2">
            Processing PDF...
          </p>
        </div>
      ) : extractedText ? (
        <div className="h-full flex flex-col">
          <div className="px-4 py-2 bg-secondary/30 border-b border-border/50">
            <h3 className="text-sm font-medium">Extracted Content</h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="whitespace-pre-wrap font-mono text-sm text-foreground/90 animate-fade-in">
              {extractedText}
            </div>
          </ScrollArea>
        </div>
      ) : pdfUrl ? (
        <iframe 
          src={pdfUrl}
          className="w-full h-full border-0"
          title="PDF Viewer"
        />
      ) : null}
    </Card>
  );
};

export default PdfViewer;
