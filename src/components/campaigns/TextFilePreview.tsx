
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface TextFilePreviewProps {
  data: string[];
  perPage?: number;
}

const TextFilePreview: React.FC<TextFilePreviewProps> = ({ 
  data = [], 
  perPage = 10 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentData = data.slice(startIndex, startIndex + perPage);
  
  if (data.length === 0) {
    return (
      <Card className="flex items-center justify-center h-full min-h-[200px] bg-secondary/10 backdrop-blur-sm animate-fade-in">
        <div className="text-center p-8">
          <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground/70">Text File Preview</h3>
          <p className="text-sm text-muted-foreground/50 max-w-md mx-auto mt-2">
            Upload a text file to see its content
          </p>
        </div>
      </Card>
    );
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden animate-fade-in bg-white/5 backdrop-blur-sm border border-border/50">
        <CardContent className="p-4">
          <div className="space-y-2">
            {currentData.map((line, index) => (
              <div 
                key={index} 
                className="p-2 rounded bg-secondary/10 text-sm"
              >
                {line}
              </div>
            ))}
            
            {currentData.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                No data available on this page
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextFilePreview;
