
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from "@/components/ui/separator";
import MultiSelectField from '@/components/profiles/MultiSelectField';

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

const DOMAIN_OPTIONS = [
  'facebook.com', 'instagram.com', 'twitter.com', 'linkedin.com',
  'google.com', 'youtube.com', 'tiktok.com', 'pinterest.com',
  'snapchat.com', 'reddit.com', 'amazon.com', 'netflix.com'
];

interface CampaignFormProps {
  campaign: {
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    description: string;
    profileId?: string;
  };
  profiles: Array<any>;
  profileSettings?: {
    name: string;
    segment: string;
    ageRange: string;
    interests: string;
    description: string;
    dayTimeparting: string[];
    geographyRegion: string[];
    deviceSpecs: string[];
    domainTargeting: string[];
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleProfileInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleProfileMultiSelectChange?: (field: string, values: string[]) => void;
  handleSubmit: () => void;
  submitButtonText: string;
  createProfileEnabled?: boolean;
  setCreateProfileEnabled?: (enabled: boolean) => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  campaign,
  profiles,
  profileSettings = {
    name: '',
    segment: '',
    ageRange: '',
    interests: '',
    description: '',
    dayTimeparting: [],
    geographyRegion: [],
    deviceSpecs: [],
    domainTargeting: []
  },
  handleInputChange,
  handleProfileInputChange = () => {},
  handleProfileMultiSelectChange = () => {},
  handleSubmit,
  submitButtonText,
  createProfileEnabled = false,
  setCreateProfileEnabled = () => {}
}) => {
  // Ensure all array fields have default values
  const safeProfileSettings = {
    ...profileSettings,
    dayTimeparting: profileSettings.dayTimeparting || [],
    geographyRegion: profileSettings.geographyRegion || [],
    deviceSpecs: profileSettings.deviceSpecs || [],
    domainTargeting: profileSettings.domainTargeting || []
  };

  return (
    <div className="space-y-4 mt-6">
      <div>
        <label className="text-sm font-medium mb-1 block">Campaign Name</label>
        <Input 
          name="name" 
          value={campaign.name} 
          onChange={handleInputChange} 
          placeholder="Summer Promotion" 
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Status</label>
        <select 
          name="status"
          value={campaign.status}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="Planning">Planning</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Start Date</label>
          <Input 
            type="date"
            name="startDate" 
            value={campaign.startDate} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">End Date</label>
          <Input 
            type="date"
            name="endDate" 
            value={campaign.endDate} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Description</label>
        <Textarea 
          name="description" 
          value={campaign.description} 
          onChange={handleInputChange} 
          placeholder="Describe the campaign objectives and details"
          rows={4}
        />
      </div>
      
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Profile Settings</h3>
          {setCreateProfileEnabled && (
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="createProfile" 
                checked={createProfileEnabled}
                onChange={(e) => setCreateProfileEnabled(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="createProfile" className="text-sm">
                Create new profile with this campaign
              </label>
            </div>
          )}
        </div>
        
        {createProfileEnabled && profileSettings && handleProfileInputChange && handleProfileMultiSelectChange ? (
          <>
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Profile Name</label>
                <Input 
                  name="name" 
                  value={safeProfileSettings.name} 
                  onChange={handleProfileInputChange} 
                  placeholder="Urban Youth" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Segment</label>
                <Input 
                  name="segment" 
                  value={safeProfileSettings.segment} 
                  onChange={handleProfileInputChange} 
                  placeholder="Youth, Family, Senior, Business" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Age Range</label>
                <Input 
                  name="ageRange" 
                  value={safeProfileSettings.ageRange} 
                  onChange={handleProfileInputChange} 
                  placeholder="18-25, 30-45, etc." 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Interests</label>
                <Input 
                  name="interests" 
                  value={safeProfileSettings.interests} 
                  onChange={handleProfileInputChange} 
                  placeholder="Social media, family plans, etc." 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Day/Time Parting</label>
                <MultiSelectField
                  options={TIME_PARTING_OPTIONS}
                  selectedValues={safeProfileSettings.dayTimeparting} 
                  onChange={(values) => handleProfileMultiSelectChange('dayTimeparting', values)}
                  placeholder="Select time periods"
                  defaultOption="Weekdays"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Geography Region</label>
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
                <label className="text-sm font-medium mb-1 block">Device Specifications</label>
                <MultiSelectField
                  options={DEVICE_OPTIONS}
                  selectedValues={safeProfileSettings.deviceSpecs} 
                  onChange={(values) => handleProfileMultiSelectChange('deviceSpecs', values)}
                  placeholder="Select devices"
                  defaultOption="Mobile Phones"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Domain Targeting</label>
                <MultiSelectField
                  options={DOMAIN_OPTIONS}
                  selectedValues={safeProfileSettings.domainTargeting} 
                  onChange={(values) => handleProfileMultiSelectChange('domainTargeting', values)}
                  placeholder="Select domains"
                  useCheckboxes={true}
                  allowCustomOption={true}
                  defaultOption="google.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Profile Description</label>
                <Textarea 
                  name="description" 
                  value={safeProfileSettings.description} 
                  onChange={handleProfileInputChange} 
                  placeholder="Describe the profile characteristics"
                  rows={3}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="mt-4">
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              name="profileId"
              onChange={handleInputChange}
              value={campaign.profileId || ""}
            >
              <option value="" disabled>Select a profile</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name} ({profile.segment})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <Button onClick={handleSubmit} className="w-full mt-6">
        {submitButtonText}
      </Button>
    </div>
  );
};

export default CampaignForm;
