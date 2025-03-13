
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Edit, 
  Search, 
  Trash, 
  Plus, 
  TestTube,
  Link2,
  CheckCircle2,
  XCircle,
  User 
} from 'lucide-react';

// Mock data for experiments
const initialExperiments = [
  { 
    id: 1, 
    name: 'Ad Messaging A/B Test', 
    status: 'Running', 
    profileId: 1,
    profileName: 'Urban Youth',
    campaignId: 1,
    campaignName: 'Summer Promotion',
    startDate: '2023-10-05', 
    endDate: '2023-10-25', 
    variants: [
      { id: 1, name: 'Variant A: Value Messaging', conversionRate: '3.8%' },
      { id: 2, name: 'Variant B: Feature Messaging', conversionRate: '2.9%' }
    ],
    description: 'Testing different ad messaging approaches with the Urban Youth segment' 
  },
  { 
    id: 2, 
    name: 'Pricing Tier Test', 
    status: 'Completed', 
    profileId: 2,
    profileName: 'Family Premium',
    campaignId: 2,
    campaignName: 'New iPhone Launch',
    startDate: '2023-09-20', 
    endDate: '2023-10-10', 
    variants: [
      { id: 1, name: 'Discount: $5/month', conversionRate: '4.2%' },
      { id: 2, name: 'Bonus Data: 5GB extra', conversionRate: '5.7%' }
    ],
    description: 'Testing which incentive performs better with family segment' 
  },
  { 
    id: 3, 
    name: 'Landing Page Design', 
    status: 'Planned', 
    profileId: 3,
    profileName: 'Senior Value',
    campaignId: 3,
    campaignName: 'Black Friday Deals',
    startDate: '2023-11-15', 
    endDate: '2023-11-25', 
    variants: [
      { id: 1, name: 'Simple layout', conversionRate: 'N/A' },
      { id: 2, name: 'Detailed layout', conversionRate: 'N/A' }
    ],
    description: 'Testing landing page designs for senior segment' 
  }
];

// Mock data for profiles and campaigns to select from
const availableProfiles = [
  { id: 1, name: 'Urban Youth' },
  { id: 2, name: 'Family Premium' },
  { id: 3, name: 'Senior Value' },
  { id: 4, name: 'Business Small' }
];

const availableCampaigns = [
  { id: 1, name: 'Summer Promotion' },
  { id: 2, name: 'New iPhone Launch' },
  { id: 3, name: 'Black Friday Deals' },
  { id: 4, name: 'Holiday Bundle' }
];

const Experiments = () => {
  const [experiments, setExperiments] = useState(initialExperiments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentExperiment, setCurrentExperiment] = useState<any>(null);
  const [variantA, setVariantA] = useState('');
  const [variantB, setVariantB] = useState('');
  const [newExperiment, setNewExperiment] = useState({
    name: '',
    status: 'Planned',
    profileId: 0,
    campaignId: 0,
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredExperiments = experiments.filter(experiment =>
    experiment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    experiment.profileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    experiment.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExperiment = () => {
    if (!newExperiment.profileId || !newExperiment.campaignId) {
      toast.error('Please select both a profile and a campaign');
      return;
    }

    if (!variantA || !variantB) {
      toast.error('Please add both variant names');
      return;
    }

    const id = Math.max(...experiments.map(e => e.id), 0) + 1;
    const selectedProfile = availableProfiles.find(p => p.id === newExperiment.profileId);
    const selectedCampaign = availableCampaigns.find(c => c.id === newExperiment.campaignId);
    
    const newExp = {
      id,
      ...newExperiment,
      profileName: selectedProfile ? selectedProfile.name : '',
      campaignName: selectedCampaign ? selectedCampaign.name : '',
      variants: [
        { id: 1, name: variantA, conversionRate: 'N/A' },
        { id: 2, name: variantB, conversionRate: 'N/A' }
      ]
    };
    
    setExperiments([...experiments, newExp]);
    setNewExperiment({
      name: '',
      status: 'Planned',
      profileId: 0,
      campaignId: 0,
      startDate: '',
      endDate: '',
      description: ''
    });
    setVariantA('');
    setVariantB('');
    setIsAddOpen(false);
    toast.success('Experiment created successfully');
  };

  const handleEditExperiment = () => {
    setExperiments(experiments.map(e => e.id === currentExperiment.id ? currentExperiment : e));
    setIsEditOpen(false);
    toast.success('Experiment updated successfully');
  };

  const handleDeleteExperiment = (id: number) => {
    setExperiments(experiments.filter(e => e.id !== id));
    toast.success('Experiment deleted successfully');
  };

  const openEditSheet = (experiment: any) => {
    setCurrentExperiment(experiment);
    setIsEditOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExperiment({ ...newExperiment, [name]: value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentExperiment({ ...currentExperiment, [name]: value });
  };

  const handleProfileSelect = (value: string) => {
    setNewExperiment({ ...newExperiment, profileId: parseInt(value) });
  };

  const handleCampaignSelect = (value: string) => {
    setNewExperiment({ ...newExperiment, campaignId: parseInt(value) });
  };

  const handleEditProfileSelect = (value: string) => {
    const selectedProfile = availableProfiles.find(p => p.id === parseInt(value));
    setCurrentExperiment({ 
      ...currentExperiment, 
      profileId: parseInt(value),
      profileName: selectedProfile ? selectedProfile.name : ''
    });
  };

  const handleEditCampaignSelect = (value: string) => {
    const selectedCampaign = availableCampaigns.find(c => c.id === parseInt(value));
    setCurrentExperiment({ 
      ...currentExperiment, 
      campaignId: parseInt(value),
      campaignName: selectedCampaign ? selectedCampaign.name : ''
    });
  };

  const handleStatusChange = (value: string) => {
    setNewExperiment({ ...newExperiment, status: value });
  };

  const handleEditStatusChange = (value: string) => {
    setCurrentExperiment({ ...currentExperiment, status: value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">A/B Test Experiments</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 w-1/3">
          <Input 
            placeholder="Search experiments" 
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-xs"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Link to="/profiles">
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Manage Profiles
            </Button>
          </Link>

          <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
            <SheetTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Experiment
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create A/B Test Experiment</SheetTitle>
                <SheetDescription>
                  Set up a new A/B test with customer profiles
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Experiment Name</label>
                  <Input 
                    name="name" 
                    value={newExperiment.name} 
                    onChange={handleInputChange} 
                    placeholder="Ad Messaging A/B Test" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select onValueChange={handleStatusChange} defaultValue="Planned">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="Running">Running</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Target Profile</label>
                  <Select onValueChange={handleProfileSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a profile" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProfiles.map(profile => (
                        <SelectItem key={profile.id} value={profile.id.toString()}>
                          {profile.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Campaign</label>
                  <Select onValueChange={handleCampaignSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCampaigns.map(campaign => (
                        <SelectItem key={campaign.id} value={campaign.id.toString()}>
                          {campaign.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Start Date</label>
                    <Input 
                      type="date"
                      name="startDate" 
                      value={newExperiment.startDate} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">End Date</label>
                    <Input 
                      type="date"
                      name="endDate" 
                      value={newExperiment.endDate} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Variant A</label>
                  <Input 
                    value={variantA} 
                    onChange={(e) => setVariantA(e.target.value)} 
                    placeholder="Variant A: Value Messaging" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Variant B</label>
                  <Input 
                    value={variantB} 
                    onChange={(e) => setVariantB(e.target.value)} 
                    placeholder="Variant B: Feature Messaging" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea 
                    name="description" 
                    value={newExperiment.description} 
                    onChange={handleInputChange} 
                    placeholder="Describe the experiment objectives and hypothesis"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddExperiment} className="w-full">
                  Create Experiment
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            A/B Test Experiments
          </CardTitle>
          <CardDescription>
            Manage experiments, view results, and optimize campaigns based on data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your A/B test experiments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Target Profile</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExperiments.map((experiment) => (
                <TableRow key={experiment.id}>
                  <TableCell className="font-medium">{experiment.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      experiment.status === 'Running' ? 'bg-green-100 text-green-800' : 
                      experiment.status === 'Planned' ? 'bg-blue-100 text-blue-800' :
                      experiment.status === 'Completed' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {experiment.status}
                    </span>
                  </TableCell>
                  <TableCell>{experiment.profileName}</TableCell>
                  <TableCell>{experiment.campaignName}</TableCell>
                  <TableCell>
                    {experiment.startDate} to {experiment.endDate}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {experiment.variants.map((variant, index) => (
                        <div key={index} className="flex items-center text-sm">
                          {variant.conversionRate !== 'N/A' && (
                            <div className="w-2 h-2 rounded-full mr-2 
                              ${index === 0 ? 'bg-green-500' : 'bg-red-500'}"
                              style={{ 
                                backgroundColor: parseFloat(variant.conversionRate) > (index === 0 ? parseFloat(experiment.variants[1].conversionRate) : parseFloat(experiment.variants[0].conversionRate)) 
                                  ? '#22c55e' // green-500
                                  : variant.conversionRate === 'N/A' 
                                    ? '#94a3b8' // slate-400
                                    : '#ef4444' // red-500
                              }}
                            />
                          )}
                          <span className="truncate max-w-[200px]">
                            {variant.name} {variant.conversionRate !== 'N/A' && `(${variant.conversionRate})`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditSheet(experiment)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteExperiment(experiment.id)}>
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

      {/* Edit Experiment Sheet */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent>
          {currentExperiment && (
            <>
              <SheetHeader>
                <SheetTitle>Edit Experiment</SheetTitle>
                <SheetDescription>
                  Update the details for your A/B test experiment
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Experiment Name</label>
                  <Input 
                    name="name" 
                    value={currentExperiment.name} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select onValueChange={handleEditStatusChange} defaultValue={currentExperiment.status}>
                    <SelectTrigger>
                      <SelectValue placeholder={currentExperiment.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="Running">Running</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Target Profile</label>
                  <Select onValueChange={handleEditProfileSelect} defaultValue={currentExperiment.profileId.toString()}>
                    <SelectTrigger>
                      <SelectValue placeholder={currentExperiment.profileName} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProfiles.map(profile => (
                        <SelectItem key={profile.id} value={profile.id.toString()}>
                          {profile.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Campaign</label>
                  <Select onValueChange={handleEditCampaignSelect} defaultValue={currentExperiment.campaignId.toString()}>
                    <SelectTrigger>
                      <SelectValue placeholder={currentExperiment.campaignName} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCampaigns.map(campaign => (
                        <SelectItem key={campaign.id} value={campaign.id.toString()}>
                          {campaign.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Start Date</label>
                    <Input 
                      type="date"
                      name="startDate" 
                      value={currentExperiment.startDate} 
                      onChange={handleEditChange} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">End Date</label>
                    <Input 
                      type="date"
                      name="endDate" 
                      value={currentExperiment.endDate} 
                      onChange={handleEditChange} 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea 
                    name="description" 
                    value={currentExperiment.description} 
                    onChange={handleEditChange} 
                    rows={3}
                  />
                </div>
                <Button onClick={handleEditExperiment} className="w-full">
                  Update Experiment
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Experiments;
