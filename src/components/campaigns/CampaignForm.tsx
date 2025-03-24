
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CampaignFormProps {
  campaign: {
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    description: string;
    domains: string[];
  };
  profiles: Array<any>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleDomainsChange: (domains: string[]) => void;
  handleSubmit: () => void;
  submitButtonText: string;
}

const PREDEFINED_DOMAINS = [
  'facebook.com',
  'instagram.com',
  'twitter.com',
  'linkedin.com',
  'google.com',
  'youtube.com',
  'tiktok.com',
];

const CampaignForm: React.FC<CampaignFormProps> = ({
  campaign,
  profiles,
  handleInputChange,
  handleDomainsChange,
  handleSubmit,
  submitButtonText
}) => {
  const [customDomain, setCustomDomain] = React.useState('');

  const toggleDomain = (domain: string) => {
    const updatedDomains = campaign.domains?.includes(domain)
      ? campaign.domains.filter(d => d !== domain)
      : [...(campaign.domains || []), domain];
    
    handleDomainsChange(updatedDomains);
  };

  const addCustomDomain = () => {
    if (customDomain && !campaign.domains?.includes(customDomain)) {
      const updatedDomains = [...(campaign.domains || []), customDomain];
      handleDomainsChange(updatedDomains);
      setCustomDomain('');
    }
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
      
      <div className="space-y-4">
        <Label className="text-sm font-medium">Target Domains</Label>
        <div className="space-y-2">
          {PREDEFINED_DOMAINS.map(domain => (
            <div key={domain} className="flex items-center space-x-2">
              <Checkbox 
                id={`domain-${domain}`} 
                checked={campaign.domains?.includes(domain) || false}
                onCheckedChange={() => toggleDomain(domain)}
              />
              <label htmlFor={`domain-${domain}`} className="text-sm">{domain}</label>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Add custom domain..."
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
            className="flex-1"
          />
          <Button type="button" variant="outline" onClick={addCustomDomain}>
            Add
          </Button>
        </div>
        
        {campaign.domains && campaign.domains.length > 0 && (
          <div className="p-2 border rounded-md">
            <p className="text-sm font-medium mb-1">Selected domains:</p>
            <div className="flex flex-wrap gap-1">
              {campaign.domains.map(domain => (
                <div key={domain} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center">
                  {domain}
                  <button
                    onClick={() => toggleDomain(domain)}
                    className="ml-1 text-xs hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Button onClick={handleSubmit} className="w-full">
        {submitButtonText}
      </Button>
    </div>
  );
};

export default CampaignForm;
