
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { FileText, Upload, X } from 'lucide-react';

interface PdfUploaderProps {
  onFileSelect: (file: File) => void;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({ onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const processFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    
    setSelectedFile(file);
    onFileSelect(file);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className={cn(
      "relative h-52 w-full overflow-hidden transition-all duration-300 animate-fade-in",
      "flex items-center justify-center",
      dragActive ? "ring-2 ring-primary/50" : "",
      selectedFile ? "bg-secondary/30" : "bg-secondary/10 backdrop-blur-sm"
    )}>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="hidden"
      />
      
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-4"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center space-y-3 animate-scale-in">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary/70" />
              <div className="flex flex-col">
                <span className="font-medium text-sm text-primary/90 text-balance max-w-[200px] truncate">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearSelection}
                className="group"
              >
                <X className="mr-1 h-4 w-4 group-hover:rotate-90 transition-transform" />
                Clear
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 text-center animate-slide-up">
            <div className="rounded-full bg-primary/5 p-3">
              <Upload className="h-6 w-6 text-primary/70" />
            </div>
            <div>
              <p className="font-medium text-sm">Drag & drop your PDF here</p>
              <p className="text-xs text-muted-foreground mt-1">
                or <button onClick={handleBrowseClick} className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80">browse</button> to upload
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PdfUploader;
