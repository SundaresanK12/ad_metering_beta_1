
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
  Plus, 
  Search, 
  Trash, 
  User
} from 'lucide-react';
import MainNavigation from '@/components/MainNavigation';

interface Profile {
  id: number;
  name: string;
  segment: string;
  ageRange: string;
  interests: string;
  description: string;
  dayTimeparting: string;
  geographyRegion: string;
  deviceSpecs: string;
  domainTargeting: string;
}

const initialProfiles: Profile[] = [
  { id: 1, name: 'Urban Youth', segment: 'Youth', ageRange: '18-25', interests: 'Social media, gaming, streaming', description: 'Young urban professionals who are tech-savvy', dayTimeparting: 'Evenings, Weekends', geographyRegion: 'Urban areas, Major cities', deviceSpecs: 'Mobile devices, High-end phones', domainTargeting: 'Social media, Entertainment, Gaming' },
  { id: 2, name: 'Family Premium', segment: 'Family', ageRange: '30-45', interests: 'Family plans, data sharing, security', description: 'Families looking for premium reliable service', dayTimeparting: 'Mornings, Evenings', geographyRegion: 'Suburban areas', deviceSpecs: 'Various devices, Tablets', domainTargeting: 'Family content, Education, Shopping' },
  { id: 3, name: 'Senior Value', segment: 'Senior', ageRange: '60+', interests: 'Reliability, customer service, value', description: 'Seniors looking for simple plans with good value', dayTimeparting: 'Morning, Afternoon', geographyRegion: 'Rural, Suburban', deviceSpecs: 'Basic smartphones, Desktop', domainTargeting: 'News, Health, Travel' },
  { id: 4, name: 'Business Small', segment: 'Business', ageRange: '25-55', interests: 'Reliability, customer service, data plans', description: 'Small business owners needing reliable service', dayTimeparting: 'Business hours', geographyRegion: 'Business districts', deviceSpecs: 'Business devices, Laptops', domainTargeting: 'Business, Finance, Productivity' },
];

const Profiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  
  const [newProfile, setNewProfile] = useState<Omit<Profile, 'id'>>({
    name: '',
    segment: '',
    ageRange: '',
    interests: '',
    description: '',
    dayTimeparting: '',
    geographyRegion: '',
    deviceSpecs: '',
    domainTargeting: ''
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.segment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProfile = () => {
    const id = Math.max(...profiles.map(p => p.id), 0) + 1;
    setProfiles([...profiles, { id, ...newProfile }]);
    setNewProfile({
      name: '',
      segment: '',
      ageRange: '',
      interests: '',
      description: '',
      dayTimeparting: '',
      geographyRegion: '',
      deviceSpecs: '',
      domainTargeting: ''
    });
    setIsAddOpen(false);
    toast.success('Profile created successfully');
  };

  const handleEditProfile = () => {
    if (currentProfile) {
      setProfiles(profiles.map(p => p.id === currentProfile.id ? currentProfile : p));
      setIsEditOpen(false);
      toast.success('Profile updated successfully');
    }
  };

  const handleDeleteProfile = (id: number) => {
    setProfiles(profiles.filter(p => p.id !== id));
    toast.success('Profile deleted successfully');
  };

  const openEditSheet = (profile: Profile) => {
    setCurrentProfile(profile);
    setIsEditOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentProfile) {
      setCurrentProfile({ ...currentProfile, [name]: value });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MainNavigation />
      
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Customer Profiles</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 w-1/3">
          <Input 
            placeholder="Search profiles" 
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
              Create Profile
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create New Profile</SheetTitle>
              <SheetDescription>
                Add details for your new customer profile
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div>
                <label className="text-sm font-medium mb-1 block">Profile Name</label>
                <Input 
                  name="name" 
                  value={newProfile.name} 
                  onChange={handleInputChange} 
                  placeholder="Urban Youth" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Segment</label>
                <Input 
                  name="segment" 
                  value={newProfile.segment} 
                  onChange={handleInputChange} 
                  placeholder="Youth, Family, Senior, Business" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Age Range</label>
                <Input 
                  name="ageRange" 
                  value={newProfile.ageRange} 
                  onChange={handleInputChange} 
                  placeholder="18-25, 30-45, etc." 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Interests</label>
                <Input 
                  name="interests" 
                  value={newProfile.interests} 
                  onChange={handleInputChange} 
                  placeholder="Social media, family plans, etc." 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Day/Time Parting</label>
                <Input 
                  name="dayTimeparting" 
                  value={newProfile.dayTimeparting} 
                  onChange={handleInputChange} 
                  placeholder="Evenings, Weekends, Business hours" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Geography Region</label>
                <Input 
                  name="geographyRegion" 
                  value={newProfile.geographyRegion} 
                  onChange={handleInputChange} 
                  placeholder="Urban areas, Suburban, Rural" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Device Specifications</label>
                <Input 
                  name="deviceSpecs" 
                  value={newProfile.deviceSpecs} 
                  onChange={handleInputChange} 
                  placeholder="Mobile, Tablet, Desktop" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Domain Targeting</label>
                <Input 
                  name="domainTargeting" 
                  value={newProfile.domainTargeting} 
                  onChange={handleInputChange} 
                  placeholder="Social media, News, Entertainment" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea 
                  name="description" 
                  value={newProfile.description} 
                  onChange={handleInputChange} 
                  placeholder="Describe the customer profile characteristics"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddProfile} className="w-full">
                Create Profile
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Profiles
          </CardTitle>
          <CardDescription>
            Manage target audience profiles for your marketing campaigns and experiments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your customer profiles</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Age Range</TableHead>
                <TableHead>Day/Time Parting</TableHead>
                <TableHead>Geography</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>{profile.segment}</TableCell>
                  <TableCell>{profile.ageRange}</TableCell>
                  <TableCell>{profile.dayTimeparting}</TableCell>
                  <TableCell>{profile.geographyRegion}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditSheet(profile)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteProfile(profile.id)}>
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
        <SheetContent className="overflow-y-auto">
          {currentProfile && (
            <>
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>
                  Update the details for your customer profile
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Profile Name</label>
                  <Input 
                    name="name" 
                    value={currentProfile.name} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Segment</label>
                  <Input 
                    name="segment" 
                    value={currentProfile.segment} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Age Range</label>
                  <Input 
                    name="ageRange" 
                    value={currentProfile.ageRange} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Interests</label>
                  <Input 
                    name="interests" 
                    value={currentProfile.interests} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Day/Time Parting</label>
                  <Input 
                    name="dayTimeparting" 
                    value={currentProfile.dayTimeparting} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Geography Region</label>
                  <Input 
                    name="geographyRegion" 
                    value={currentProfile.geographyRegion} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Device Specifications</label>
                  <Input 
                    name="deviceSpecs" 
                    value={currentProfile.deviceSpecs} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Domain Targeting</label>
                  <Input 
                    name="domainTargeting" 
                    value={currentProfile.domainTargeting} 
                    onChange={handleEditChange} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea 
                    name="description" 
                    value={currentProfile.description} 
                    onChange={handleEditChange} 
                    rows={3}
                  />
                </div>
                <Button onClick={handleEditProfile} className="w-full">
                  Update Profile
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Profiles;
