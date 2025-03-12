
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';

interface ExtractedDataProps {
  data: { 
    _id?: string;
    filename: string;
    content: string;
    timestamp: Date;
    fileSize: number;
  } | null;
  savedToDb: boolean;
}

const ExtractedData: React.FC<ExtractedDataProps> = ({ data, savedToDb }) => {
  if (!data) {
    return <div className="hidden"></div>;
  }

  const formattedDate = new Date(data.timestamp).toLocaleString();
  const fileSizeInMb = (data.fileSize / 1024 / 1024).toFixed(2);

  return (
    <Card className="overflow-hidden bg-white/5 backdrop-blur-sm border border-border/50 animate-fade-in">
      <div className="p-3 bg-secondary/30 border-b border-border/50 flex justify-between items-center">
        <h3 className="text-sm font-medium">Data Preview</h3>
        {savedToDb && (
          <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Saved to MongoDB
          </div>
        )}
      </div>
      <div className="p-4 text-sm">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
          <div>
            <span className="text-xs text-muted-foreground">Filename:</span>
            <p className="font-medium truncate">{data.filename}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Size:</span>
            <p className="font-medium">{fileSizeInMb} MB</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Timestamp:</span>
            <p className="font-medium">{formattedDate}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Document ID:</span>
            <p className="font-medium truncate">{data._id || 'Not saved yet'}</p>
          </div>
        </div>
        <Separator className="my-3" />
        <div>
          <span className="text-xs text-muted-foreground">Content Preview:</span>
          <ScrollArea className="h-32 mt-1 rounded border border-border/50 bg-background/50 p-2">
            <p className="whitespace-pre-wrap font-mono text-xs text-muted-foreground">
              {data.content.length > 1000 
                ? `${data.content.substring(0, 1000)}...` 
                : data.content}
            </p>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default ExtractedData;
