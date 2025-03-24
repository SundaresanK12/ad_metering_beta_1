
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
import MultiSelectField from '@/components/profiles/MultiSelectField';

// Predefined options for dropdown fields
const TIME_PARTING_OPTIONS = [
  'Morning', 'Afternoon', 'Evening', 'Night',
  'Weekdays', 'Weekends', 'Business Hours', 'After Hours'
];

const GEOGRAPHY_OPTIONS = [
  'Urban Areas', 'Suburban Areas', 'Rural Areas',
  'Major Cities', 'Business Districts', 'Residential Areas',
  'East Coast', 'West Coast', 'Midwest', 'South',
  'International'
];

const DEVICE_OPTIONS = [
  'Mobile Phones', 'Tablets', 'Desktops', 'Laptops',
  'iOS Devices', 'Android Devices', 'Smart TVs', 'Gaming Consoles'
];

const DOMAIN_OPTIONS = [
  'facebook.com', 'instagram.com', 'twitter.com', 'linkedin.com',
  'google.com', 'youtube.com', 'tiktok.com', 'pinterest.com',
  'snapchat.com', 'reddit.com', 'amazon.com', 'netflix.com'
];

interface Profile {
  id: number;
  name: string;
  segment: string;
  ageRange: string;
  interests: string;
  description: string;
  dayTimeparting: string[];
  geographyRegion: string[];
  deviceSpecs: string[];
  domainTargeting: string[];
}

const initialProfiles: Profile[] = [
  { 
    id: 1, 
    name: 'Urban Youth', 
    segment: 'Youth', 
    ageRange: '18-25', 
    interests: 'Social media, gaming, streaming', 
    description: 'Young urban professionals who are tech-savvy', 
    dayTimeparting: ['Evenings', 'Weekends'], 
    geographyRegion: ['Urban areas', 'Major cities'], 
    deviceSpecs: ['Mobile devices', 'High-end phones'], 
    domainTargeting: ['facebook.com', 'instagram.com', 'youtube.com']
  },
  { 
    id: 2, 
    name: 'Family Premium', 
    segment: 'Family', 
    ageRange: '30-45', 
    interests: 'Family plans, data sharing, security', 
    description: 'Families looking for premium reliable service', 
    dayTimeparting: ['Mornings', 'Evenings'], 
    geographyRegion: ['Suburban areas'], 
    deviceSpecs: ['Various devices', 'Tablets'], 
    domainTargeting: ['youtube.com', 'google.com', 'amazon.com'] 
  },
  { 
    id: 3, 
    name: 'Senior Value', 
    segment: 'Senior', 
    ageRange: '60+', 
    interests: 'Reliability, customer service, value', 
    description: 'Seniors looking for simple plans with good value', 
    dayTimeparting: ['Morning', 'Afternoon'], 
    geographyRegion: ['Rural', 'Suburban'], 
    deviceSpecs: ['Basic smartphones', 'Desktop'], 
    domainTargeting: ['google.com', 'facebook.com'] 
  },
  { 
    id: 4, 
    name: 'Business Small', 
    segment: 'Business', 
    ageRange: '25-55', 
    interests: 'Reliability, customer service, data plans', 
    description: 'Small business owners needing reliable service', 
    dayTimeparting: ['Business hours'], 
    geographyRegion: ['Business districts'], 
    deviceSpecs: ['Business devices', 'Laptops'], 
    domainTargeting: ['linkedin.com', 'google.com'] 
  },
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
    dayTimeparting: [],
    geographyRegion: [],
    deviceSpecs: [],
    domainTargeting: []
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
      dayTimeparting: [],
      geographyRegion: [],
      deviceSpecs: [],
      domainTargeting: []
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

  const handleMultiSelectChange = (field: keyof Pick<Profile, 'dayTimeparting' | 'geographyRegion' | 'deviceSpecs' | 'domainTargeting'>, values: string[]) => {
    setNewProfile({ ...newProfile, [field]: values });
  };

  const handleEditMultiSelectChange = (field: keyof Pick<Profile, 'dayTimeparting' | 'geographyRegion' | 'deviceSpecs' | 'domainTargeting'>, values: string[]) => {
    if (currentProfile) {
      setCurrentProfile({ ...currentProfile, [field]: values });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MainNavigation />
      
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Profiles</h1>
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
                Add details for your new profile
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
                <MultiSelectField
                  options={TIME_PARTING_OPTIONS}
                  selectedValues={newProfile.dayTimeparting || []} 
                  onChange={(values) => handleMultiSelectChange('dayTimeparting', values)}
                  placeholder="Select time periods"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Geography Region</label>
                <MultiSelectField
                  options={GEOGRAPHY_OPTIONS}
                  selectedValues={newProfile.geographyRegion || []} 
                  onChange={(values) => handleMultiSelectChange('geographyRegion', values)}
                  placeholder="Select regions"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Device Specifications</label>
                <MultiSelectField
                  options={DEVICE_OPTIONS}
                  selectedValues={newProfile.deviceSpecs || []} 
                  onChange={(values) => handleMultiSelectChange('deviceSpecs', values)}
                  placeholder="Select devices"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Domain Targeting</label>
                <MultiSelectField
                  options={DOMAIN_OPTIONS}
                  selectedValues={newProfile.domainTargeting || []} 
                  onChange={(values) => handleMultiSelectChange('domainTargeting', values)}
                  placeholder="Select domains"
                  useCheckboxes={true}
                  allowCustomOption={true}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea 
                  name="description" 
                  value={newProfile.description} 
                  onChange={handleInputChange} 
                  placeholder="Describe the profile characteristics"
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
            Profiles
          </CardTitle>
          <CardDescription>
            Manage target audience profiles for your marketing campaigns and experiments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your profiles</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Age Range</TableHead>
                <TableHead>Day/Time Parting</TableHead>
                <TableHead>Domains</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>{profile.segment}</TableCell>
                  <TableCell>{profile.ageRange}</TableCell>
                  <TableCell>{Array.isArray(profile.dayTimeparting) ? profile.dayTimeparting.join(', ') : ''}</TableCell>
                  <TableCell>{Array.isArray(profile.domainTargeting) ? profile.domainTargeting.join(', ') : ''}</TableCell>
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
                  Update the details for your profile
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
                  <MultiSelectField
                    options={TIME_PARTING_OPTIONS}
                    selectedValues={currentProfile.dayTimeparting || []}
                    onChange={(values) => handleEditMultiSelectChange('dayTimeparting', values)}
                    placeholder="Select time periods"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Geography Region</label>
                  <MultiSelectField
                    options={GEOGRAPHY_OPTIONS}
                    selectedValues={currentProfile.geographyRegion || []}
                    onChange={(values) => handleEditMultiSelectChange('geographyRegion', values)}
                    placeholder="Select regions"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Device Specifications</label>
                  <MultiSelectField
                    options={DEVICE_OPTIONS}
                    selectedValues={currentProfile.deviceSpecs || []}
                    onChange={(values) => handleEditMultiSelectChange('deviceSpecs', values)}
                    placeholder="Select devices"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Domain Targeting</label>
                  <MultiSelectField
                    options={DOMAIN_OPTIONS}
                    selectedValues={currentProfile.domainTargeting || []}
                    onChange={(values) => handleEditMultiSelectChange('domainTargeting', values)}
                    placeholder="Select domains"
                    useCheckboxes={true}
                    allowCustomOption={true}
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
