
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CustomerProfile } from '@/services/profileService';

interface CampaignFormProps {
  campaign: {
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    description: string;
    targetProfiles: string[];
  };
  profiles: CustomerProfile[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleProfileSelect: (profileId: string) => void;
  handleSubmit: () => void;
  submitButtonText: string;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  campaign,
  profiles,
  handleInputChange,
  handleProfileSelect,
  handleSubmit,
  submitButtonText
}) => {
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
      <div>
        <label className="text-sm font-medium mb-1 block">Target Profiles (Optional)</label>
        {profiles.length > 0 ? (
          <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
            {profiles.map(profile => (
              <div key={profile.id} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id={`profile-${profile.id}`}
                  checked={campaign.targetProfiles.includes(profile.id)}
                  onChange={() => handleProfileSelect(profile.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`profile-${profile.id}`} className="text-sm">
                  {profile.name} - {profile.segmentSize} users
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No profiles available</p>
        )}
      </div>
      <Button onClick={handleSubmit} className="w-full">
        {submitButtonText}
      </Button>
    </div>
  );
};

export default CampaignForm;
