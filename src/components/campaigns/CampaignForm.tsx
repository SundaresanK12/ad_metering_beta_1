
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from '@/components/ui/card';
import MultiSelectField from '@/components/profiles/MultiSelectField';
import FileUploader from '@/components/campaigns/FileUploader';
import TextFilePreview from '@/components/campaigns/TextFilePreview';

// Predefined options for dropdown fields
const TIME_PARTING_OPTIONS = [
  'Morning', 'Afternoon', 'Evening', 'Night',
  'Weekdays', 'Weekends', 'Business Hours', 'After Hours'
];

const GEOGRAPHY_OPTIONS = {
  'North America': {
    'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    'Canada': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa']
  },
  'Europe': {
    'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool'],
    'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne']
  },
  'Asia': {
    'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya'],
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai']
  },
  'Australia': {
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']
  }
};

// Convert hierarchical options to flat array for dropdown
const flattenGeoOptions = (options) => {
  const result = [];
  
  // Add continents
  Object.keys(options).forEach(continent => {
    result.push(continent);
    
    // Add countries
    Object.keys(options[continent]).forEach(country => {
      result.push(`${continent} - ${country}`);
      
      // Add cities
      options[continent][country].forEach(city => {
        result.push(`${continent} - ${country} - ${city}`);
      });
    });
  });
  
  return result;
};

const FLAT_GEOGRAPHY_OPTIONS = flattenGeoOptions(GEOGRAPHY_OPTIONS);

const DEVICE_OPTIONS = [
  'Mobile Phones', 'Tablets', 'Desktops', 'Laptops',
  'iOS Devices', 'Android Devices', 'Smart TVs', 'Gaming Consoles'
];

interface CampaignFormProps {
  campaign: {
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    description: string;
  };
  profileSettings?: {
    ageRange: string;
    interests: string;
    description: string;
    dayTimeparting: string[];
    geographyRegion: string[];
    deviceSpecs: string[];
  };
  selectedFile: File | null;
  fileData: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleProfileInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleProfileMultiSelectChange?: (field: string, values: string[]) => void;
  handleFileSelect?: (file: File, data: string[]) => void;
  handleSubmit: () => void;
  submitButtonText: string;
  isEdit?: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  campaign,
  profileSettings = {
    ageRange: '',
    interests: '',
    description: '',
    dayTimeparting: [],
    geographyRegion: [],
    deviceSpecs: []
  },
  selectedFile,
  fileData = [],
  handleInputChange,
  handleProfileInputChange = () => {},
  handleProfileMultiSelectChange = () => {},
  handleFileSelect = () => {},
  handleSubmit,
  submitButtonText,
  isEdit = false
}) => {
  // Ensure all array fields have default values
  const safeProfileSettings = {
    ...profileSettings,
    dayTimeparting: profileSettings.dayTimeparting || [],
    geographyRegion: profileSettings.geographyRegion || [],
    deviceSpecs: profileSettings.deviceSpecs || []
  };

  return (
    <div className="space-y-6 mt-6">
      <Card className="bg-white/50 backdrop-blur-md shadow-lg border-blue-50 overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-900">Campaign Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block text-blue-800">Campaign Name</label>
              <Input 
                name="name" 
                value={campaign.name} 
                onChange={handleInputChange} 
                placeholder="Summer Promotion" 
                className="border-blue-100 focus-visible:ring-blue-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-blue-800">Status</label>
              <select 
                name="status"
                value={campaign.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-blue-100 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              >
                <option value="Planning">Planning</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-blue-800">Start Date</label>
                <Input 
                  type="date"
                  name="startDate" 
                  value={campaign.startDate} 
                  onChange={handleInputChange} 
                  className="border-blue-100 focus-visible:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-blue-800">End Date</label>
                <Input 
                  type="date"
                  name="endDate" 
                  value={campaign.endDate} 
                  onChange={handleInputChange}
                  className="border-blue-100 focus-visible:ring-blue-400" 
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-blue-800">Description</label>
              <Textarea 
                name="description" 
                value={campaign.description} 
                onChange={handleInputChange} 
                placeholder="Describe the campaign objectives and details"
                rows={4}
                className="border-blue-100 focus-visible:ring-blue-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/50 backdrop-blur-md shadow-lg border-purple-50 overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-900">Target Profile</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block text-purple-800">Age Range</label>
              <Input 
                name="ageRange" 
                value={safeProfileSettings.ageRange} 
                onChange={handleProfileInputChange} 
                placeholder="18-25, 30-45, etc." 
                className="border-purple-100 focus-visible:ring-purple-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-purple-800">Interests</label>
              <Input 
                name="interests" 
                value={safeProfileSettings.interests} 
                onChange={handleProfileInputChange} 
                placeholder="Social media, family plans, etc." 
                className="border-purple-100 focus-visible:ring-purple-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-purple-800">Day/Time Parting</label>
              <MultiSelectField
                options={TIME_PARTING_OPTIONS}
                selectedValues={safeProfileSettings.dayTimeparting} 
                onChange={(values) => handleProfileMultiSelectChange('dayTimeparting', values)}
                placeholder="Select time periods"
                defaultOption="Weekdays"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-purple-800">Geography Region</label>
              <MultiSelectField
                options={FLAT_GEOGRAPHY_OPTIONS}
                selectedValues={safeProfileSettings.geographyRegion} 
                onChange={(values) => handleProfileMultiSelectChange('geographyRegion', values)}
                placeholder="Select regions"
                defaultOption="North America"
                hierarchical={true}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-purple-800">Device Specifications</label>
              <MultiSelectField
                options={DEVICE_OPTIONS}
                selectedValues={safeProfileSettings.deviceSpecs} 
                onChange={(values) => handleProfileMultiSelectChange('deviceSpecs', values)}
                placeholder="Select devices"
                defaultOption="Mobile Phones"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-purple-800">Domain Data (Upload Text File)</label>
              <FileUploader 
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            </div>
            
            {(selectedFile || fileData.length > 0) && (
              <div>
                <label className="text-sm font-medium mb-1 block text-purple-800">File Preview</label>
                <TextFilePreview data={fileData} perPage={10} />
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium mb-1 block text-purple-800">Profile Description</label>
              <Textarea 
                name="description" 
                value={safeProfileSettings.description} 
                onChange={handleProfileInputChange} 
                placeholder="Describe the profile characteristics"
                rows={3}
                className="border-purple-100 focus-visible:ring-purple-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md h-12 text-base"
      >
        {submitButtonText}
      </Button>
    </div>
  );
};

export default CampaignForm;
