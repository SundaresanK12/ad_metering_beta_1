
import { useState } from 'react';

const usePdfExtractor = () => {
  // Minimal implementation that maintains interface compatibility
  // but doesn't actually extract text
  const [isProcessing] = useState(false);
  const [extractedText] = useState<string | null>(null);
  
  const extractTextFromPdf = async (): Promise<string | null> => {
    return null;
  };
  
  return {
    extractTextFromPdf,
    extractedText,
    isProcessing,
  };
};

export default usePdfExtractor;
