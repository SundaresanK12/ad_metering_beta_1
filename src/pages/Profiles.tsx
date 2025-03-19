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
  income: string;
  interests: string;
  description: string;
}

const initialProfiles: Profile[] = [
  { id: 1, name: 'Urban Youth', segment: 'Youth', ageRange: '18-25', income: '$30K-$60K', interests: 'Social media, gaming, streaming', description: 'Young urban professionals who are tech-savvy' },
  { id: 2, name: 'Family Premium', segment: 'Family', ageRange: '30-45', income: '$80K-$120K', interests: 'Family plans, data sharing, security', description: 'Families looking for premium reliable service' },
  { id: 3, name: 'Senior Value', segment: 'Senior', ageRange: '60+', income: '$40K-$80K', interests: 'Reliability, customer service, value', description: 'Seniors looking for simple plans with good value' },
  { id: 4, name: 'Business Small', segment: 'Business', ageRange: '25-55', income: '$100K+', interests: 'Reliability, customer service, data plans', description: 'Small business owners needing reliable service' },
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
    income: '$0K-$0K',
    interests: '',
    description: ''
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
      income: '$0K-$0K',
      interests: '',
      description: ''
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
          <SheetContent>
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
                <label className="text-sm font-medium mb-1 block">Income Range</label>
                <Input 
                  name="income" 
                  value={newProfile.income} 
                  onChange={handleInputChange} 
                  placeholder="$0K-$0K"
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
                <TableHead>Income Range</TableHead>
                <TableHead>Interests</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>{profile.segment}</TableCell>
                  <TableCell>{profile.ageRange}</TableCell>
                  <TableCell>{profile.income}</TableCell>
                  <TableCell className="max-w-xs truncate">{profile.interests}</TableCell>
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
        <SheetContent>
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
                  <label className="text-sm font-medium mb-1 block">Income Range</label>
                  <Input 
                    name="income" 
                    value={currentProfile.income} 
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
