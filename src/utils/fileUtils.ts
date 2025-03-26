
/**
 * Utility functions for handling file operations
 */

/**
 * Save data to a text file and trigger a download
 * @param data The data to save
 * @param filename The name of the file
 */
export const saveToTextFile = (data: any, filename: string): void => {
  // Convert the data to a JSON string with nice formatting
  const content = JSON.stringify(data, null, 2);
  
  // Create a blob with the data
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append the link to the body
  document.body.appendChild(link);
  
  // Click the link to trigger the download
  link.click();
  
  // Clean up
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

/**
 * Generate a unique filename based on the current date
 * @param prefix Optional prefix for the filename
 * @returns A string in the format "prefix_YYYY-MM-DD_HH-MM-SS.txt"
 */
export const generateDateBasedFilename = (prefix: string = 'campaign'): string => {
  const now = new Date();
  
  // Format: YYYY-MM-DD_HH-MM-SS
  const dateStr = now.toISOString()
    .replace(/T/, '_')
    .replace(/\..+/, '')
    .replace(/:/g, '-');
  
  return `${prefix}_${dateStr}.txt`;
};

