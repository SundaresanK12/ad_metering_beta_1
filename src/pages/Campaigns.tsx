
import React, { useState } from 'react';
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
import MainNavigation from '@/components/MainNavigation';

// Mock data for campaigns
const initialCampaigns = [
  { id: 1, name: 'Summer Promotion', status: 'Active', startDate: '2023-06-01', endDate: '2023-08-31', description: 'Summer discount campaign for all cellular plans' },
  { id: 2, name: 'New iPhone Launch', status: 'Planning', startDate: '2023-09-15', endDate: '2023-10-15', description: 'Campaign for the latest iPhone release' },
  { id: 3, name: 'Black Friday Deals', status: 'Scheduled', startDate: '2023-11-20', endDate: '2023-11-30', description: 'Special offers for Black Friday' },
  { id: 4, name: 'Holiday Bundle', status: 'Active', startDate: '2023-12-01', endDate: '2023-12-31', description: 'Family plan discounts for the holiday season' },
];

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<any>(null);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    status: 'Planning',
    startDate: '',
    endDate: '',
    description: ''
  });

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
      description: ''
    });
    setIsAddOpen(false);
    toast.success('Campaign created successfully');
  };

  const handleEditCampaign = () => {
    setCampaigns(campaigns.map(c => c.id === currentCampaign.id ? currentCampaign : c));
    setIsEditOpen(false);
    toast.success('Campaign updated successfully');
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast.success('Campaign deleted successfully');
  };

  const openEditSheet = (campaign: any) => {
    setCurrentCampaign(campaign);
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
