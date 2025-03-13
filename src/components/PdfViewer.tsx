
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface PdfViewerProps {
  pdfFile: File | null;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfFile }) => {
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

  if (!pdfFile) {
    return (
      <Card className="flex items-center justify-center h-full min-h-[400px] bg-secondary/10 backdrop-blur-sm animate-fade-in">
        <div className="text-center p-8">
          <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground/70">PDF Preview</h3>
          <p className="text-sm text-muted-foreground/50 max-w-md mx-auto mt-2">
            Upload a PDF to see its preview
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden h-full min-h-[400px] animate-fade-in bg-white/5 backdrop-blur-sm border border-border/50">
      {pdfUrl ? (
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
