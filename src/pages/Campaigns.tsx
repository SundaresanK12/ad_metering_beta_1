
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Edit, 
  Flag, 
  Plus, 
  Search, 
  Trash 
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainNavigation from '@/components/MainNavigation';
import profileService, { CustomerProfile } from '@/services/profileService';

// Mock data for campaigns
const initialCampaigns = [
  { id: 1, name: 'Summer Promotion', status: 'Active', startDate: '2023-06-01', endDate: '2023-08-31', description: 'Summer discount campaign for all cellular plans', targetProfiles: [] },
  { id: 2, name: 'New iPhone Launch', status: 'Planning', startDate: '2023-09-15', endDate: '2023-10-15', description: 'Campaign for the latest iPhone release', targetProfiles: [] },
  { id: 3, name: 'Black Friday Deals', status: 'Scheduled', startDate: '2023-11-20', endDate: '2023-11-30', description: 'Special offers for Black Friday', targetProfiles: [] },
  { id: 4, name: 'Holiday Bundle', status: 'Active', startDate: '2023-12-01', endDate: '2023-12-31', description: 'Family plan discounts for the holiday season', targetProfiles: [] },
];

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(() => {
    // Try to get campaigns from sessionStorage
    const savedCampaigns = sessionStorage.getItem('campaigns');
    return savedCampaigns ? JSON.parse(savedCampaigns) : initialCampaigns;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<any>(null);
  const [profiles, setProfiles] = useState<CustomerProfile[]>([]);
  
  const [newCampaign, setNewCampaign] = useState(() => {
    // Try to get new campaign data from sessionStorage
    const savedNewCampaign = sessionStorage.getItem('newCampaign');
    return savedNewCampaign ? JSON.parse(savedNewCampaign) : {
      name: '',
      status: 'Planning',
      startDate: '',
      endDate: '',
      description: '',
      targetProfiles: []
    };
  });

  // Save campaigns to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  // Save new campaign data to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('newCampaign', JSON.stringify(newCampaign));
  }, [newCampaign]);

  // Save current campaign data to sessionStorage
  useEffect(() => {
    if (currentCampaign) {
      sessionStorage.setItem('currentCampaign', JSON.stringify(currentCampaign));
    }
  }, [currentCampaign]);

  // Load profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      const fetchedProfiles = await profileService.getProfiles();
      setProfiles(fetchedProfiles || []);
    };
    
    fetchProfiles();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCampaign = () => {
    const id = Math.max(...campaigns.map(c => c.id), 0) + 1;
    setCampaigns([...campaigns, { id, ...newCampaign }]);
    setNewCampaign({
      name: '',
      status: 'Planning',
      startDate: '',
      endDate: '',
      description: '',
      targetProfiles: []
    });
    setIsAddOpen(false);
    toast.success('Campaign created successfully');
  };

  const handleEditCampaign = () => {
    setCampaigns(campaigns.map(c => c.id === currentCampaign.id ? currentCampaign : c));
    setIsEditOpen(false);
    // Remove the current campaign from session storage after successful edit
    sessionStorage.removeItem('currentCampaign');
    toast.success('Campaign updated successfully');
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast.success('Campaign deleted successfully');
  };

  const openEditSheet = (campaign: any) => {
    setCurrentCampaign({...campaign});
    setIsEditOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentCampaign({ ...currentCampaign, [name]: value });
  };

  const handleProfileSelect = (profileId: string) => {
    // Check if already selected
    if (newCampaign.targetProfiles.includes(profileId)) {
      setNewCampaign({
        ...newCampaign,
        targetProfiles: newCampaign.targetProfiles.filter((id: string) => id !== profileId)
      });
    } else {
      setNewCampaign({
        ...newCampaign,
        targetProfiles: [...newCampaign.targetProfiles, profileId]
      });
    }
  };

  const handleEditProfileSelect = (profileId: string) => {
    // Ensure targetProfiles exists in currentCampaign
    const currentTargetProfiles = currentCampaign.targetProfiles || [];
    
    // Check if already selected
    if (currentTargetProfiles.includes(profileId)) {
      setCurrentCampaign({
        ...currentCampaign,
        targetProfiles: currentTargetProfiles.filter((id: string) => id !== profileId)
      });
    } else {
      setCurrentCampaign({
        ...currentCampaign,
        targetProfiles: [...currentTargetProfiles, profileId]
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MainNavigation />
      
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Campaign Management</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 w-1/3">
          <Input 
            placeholder="Search campaigns" 
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-xs"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
          <SheetTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New Campaign</SheetTitle>
              <SheetDescription>
                Add details for your new marketing campaign
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div>
                <label className="text-sm font-medium mb-1 block">Campaign Name</label>
                <Input 
                  name="name" 
                  value={newCampaign.name} 
                  onChange={handleInputChange} 
                  placeholder="Summer Promotion" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <select 
                  name="status"
                  value={newCampaign.status}
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
                    value={newCampaign.startDate} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <Input 
                    type="date"
                    name="endDate" 
                    value={newCampaign.endDate} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea 
                  name="description" 
                  value={newCampaign.description} 
                  onChange={handleInputChange} 
                  placeholder="Describe the campaign objectives and details"
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Target Profiles</label>
                <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                  {profiles.length > 0 ? (
                    profiles.map(profile => (
                      <div key={profile.id} className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          id={`profile-${profile.id}`}
                          checked={newCampaign.targetProfiles.includes(profile.id)}
                          onChange={() => handleProfileSelect(profile.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`profile-${profile.id}`} className="text-sm">
                          {profile.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No profiles available</p>
                  )}
                </div>
              </div>
              <Button onClick={handleAddCampaign} className="w-full">
                Create Campaign
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Campaigns
          </CardTitle>
          <CardDescription>
            Manage your marketing campaigns and track their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your marketing campaigns</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Target Profiles</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      campaign.status === 'Planning' ? 'bg-blue-100 text-blue-800' :
                      campaign.status === 'Scheduled' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </TableCell>
                  <TableCell>{campaign.startDate}</TableCell>
                  <TableCell>{campaign.endDate}</TableCell>
                  <TableCell>
                    {campaign.targetProfiles && campaign.targetProfiles.length > 0 ? (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {campaign.targetProfiles.length} profile(s)
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">No profiles</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditSheet(campaign)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteCampaign(campaign.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent>
          {currentCampaign && (
            <>
              <SheetHeader>
                <SheetTitle>Edit Campaign</SheetTitle>
                <SheetDescription>
                  Update the details for your campaign
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Campaign Name</label>
                  <Input 
                    name="name" 
                    value={currentCampaign.name} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <select 
                    name="status"
                    value={currentCampaign.status}
                    onChange={handleEditChange}
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
                      value={currentCampaign.startDate} 
                      onChange={handleEditChange} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">End Date</label>
                    <Input 
                      type="date"
                      name="endDate" 
                      value={currentCampaign.endDate} 
                      onChange={handleEditChange} 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea 
                    name="description" 
                    value={currentCampaign.description} 
                    onChange={handleEditChange} 
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Target Profiles</label>
                  <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                    {profiles.length > 0 ? (
                      profiles.map(profile => (
                        <div key={profile.id} className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            id={`edit-profile-${profile.id}`}
                            checked={(currentCampaign.targetProfiles || []).includes(profile.id)}
                            onChange={() => handleEditProfileSelect(profile.id)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`edit-profile-${profile.id}`} className="text-sm">
                            {profile.name}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No profiles available</p>
                    )}
                  </div>
                </div>
                <Button onClick={handleEditCampaign} className="w-full">
                  Update Campaign
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Campaigns;
