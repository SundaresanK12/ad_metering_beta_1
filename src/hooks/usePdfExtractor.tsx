
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

// This import will be handled client-side
// pdf-parse is an npm package that we'll use to extract text from PDF files
// We need to handle this dynamically since it's a node module
const usePdfExtractor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  
  const extractTextFromPdf = useCallback(async (file: File): Promise<string | null> => {
    setIsProcessing(true);
    setExtractedText(null);
    
    try {
      // Since pdf-parse is a Node.js module, we need to handle it in the browser
      // In a real app, this would typically be done server-side
      // For this frontend demo, we'll use a workaround with FileReader
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async (event) => {
          if (!event.target?.result) {
            reject(new Error('Failed to read file'));
            return;
          }
          
          try {
            // In a real implementation, we would send this to a backend API
            // For this demo, we'll create a mock implementation
            
            // Simulate processing time
            await new Promise(r => setTimeout(r, 1500));
            
            // Create a simple text extraction result
            // In reality, this would come from pdf-parse
            const content = mockPdfParse(file.name);
            
            setExtractedText(content);
            setIsProcessing(false);
            resolve(content);
          } catch (error) {
            console.error('PDF parsing error:', error);
            setIsProcessing(false);
            reject(error);
          }
        };
        
        reader.onerror = (error) => {
          console.error('FileReader error:', error);
          setIsProcessing(false);
          reject(error);
        };
        
        reader.readAsArrayBuffer(file);
      });
    } catch (error) {
      console.error('Extraction error:', error);
      toast.error('Failed to extract text from PDF');
      setIsProcessing(false);
      return null;
    }
  }, []);
  
  // Mock function to simulate pdf-parse for the demo
  const mockPdfParse = (filename: string): string => {
    // Generate some "extracted" text based on filename
    return `PDF CONTENT EXTRACTION
--------------------
Document: ${filename}
Type: PDF Document
Extracted at: ${new Date().toISOString()}
--------------------

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies
nunc nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, 
nunc nisl aliquam nisl, eget ultricies nunc nisl eget nisl.

SECTION 1: INTRODUCTION
The purpose of this document is to demonstrate PDF text extraction.
This would typically contain the actual text extracted from your PDF.

SECTION 2: MAIN CONTENT
In a real implementation, this text would be extracted from the uploaded PDF
using the pdf-parse library. The actual content would depend on what's in 
your PDF file.

SECTION 3: DATA POINTS
- Item 1: Sample data
- Item 2: More sample data
- Item 3: Additional data points

SECTION 4: CONCLUSION
This is a simulation of text that would be extracted from a PDF document.
In a production environment, this would contain the actual content from
your uploaded file.

--------------------
End of extraction
`;
  };
  
  return {
    extractTextFromPdf,
    extractedText,
    isProcessing,
  };
};

export default usePdfExtractor;
