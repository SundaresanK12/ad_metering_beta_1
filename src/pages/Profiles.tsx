import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronsUpDown, Edit, Plus, Trash } from 'lucide-react';
import MainNavigation from '@/components/MainNavigation';
import MultiSelectField from '@/components/profiles/MultiSelectField';

interface Profile {
  id: string;
  name: string;
  ageRange: string;
  interests: string;
  dayTimeparting: string[];
  geographyRegion: string[];
  deviceSpecs: string[];
  description: string;
}

const dayTimeOptions = [
  'Morning', 'Afternoon', 'Evening', 'Night',
  'Weekdays', 'Weekends', 'Business Hours', 'After Hours'
];

const regionOptions = [
  'United States', 'United Kingdom', 'India',
  'California', 'New York', 'London', 'Mumbai'
];

const deviceOptions = [
  'Mobile Phones', 'Tablets', 'Desktops', 'Laptops',
  'iOS Devices', 'Android Devices', 'Smart TVs', 'Gaming Consoles'
];

const Profiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profile, setProfile] = useState<Omit<Profile, 'id'>>({
    name: '',
    ageRange: '',
    interests: '',
    dayTimeparting: [],
    geographyRegion: [],
    deviceSpecs: [],
    description: ''
  });
  const [editProfile, setEditProfile] = useState<Profile>({
    id: '',
    name: '',
    ageRange: '',
    interests: '',
    dayTimeparting: [],
    geographyRegion: [],
    deviceSpecs: [],
    description: ''
  });

  useEffect(() => {
    const savedProfiles = localStorage.getItem('profiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterTerm(e.target.value);
  };

  const filteredProfiles = profiles.filter(profile => {
    const searchMatch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.ageRange.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.interests.toLowerCase().includes(searchTerm.toLowerCase());

    const filterMatch = filterTerm === '' || profile.ageRange === filterTerm;

    return searchMatch && filterMatch;
  });

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleAddProfile = () => {
    const id = generateId();
    const newProfile = { ...profile, id };
    setProfiles([...profiles, newProfile]);
    setProfile({
      name: '',
      ageRange: '',
      interests: '',
      dayTimeparting: [],
      geographyRegion: [],
      deviceSpecs: [],
      description: ''
    });
    setIsOpen(false);
  };

  const handleEdit = (id: string) => {
    const profileToEdit = profiles.find(profile => profile.id === id);
    if (profileToEdit) {
      setEditProfile(profileToEdit);
      setIsEditOpen(true);
    }
  };

  const handleUpdateProfile = () => {
    setProfiles(profiles.map(profile =>
      profile.id === editProfile.id ? editProfile : profile
    ));
    setIsEditOpen(false);
  };

  const handleDelete = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <MainNavigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-purple-800">Target Audience Profiles</h1>
          <Button 
            onClick={() => setIsOpen(true)}
            className="gradient-button px-4 py-2 rounded-md font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Create Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card className="enhanced-card">
            <CardHeader>
              <CardTitle className="text-purple-800">Search Profiles</CardTitle>
              <CardDescription className="text-purple-600">
                Find profiles by name, age, or interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input 
                type="search"
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={handleSearch}
                className="enhanced-input"
              />
            </CardContent>
          </Card>

          <Card className="enhanced-card">
            <CardHeader>
              <CardTitle className="text-purple-800">Filter Profiles</CardTitle>
              <CardDescription className="text-purple-600">
                Filter profiles by age range
              </CardDescription>
            </CardHeader>
            <CardContent>
              <select 
                value={filterTerm}
                onChange={handleFilter}
                className="enhanced-select flex h-10 w-full rounded-md border border-purple-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">All Age Ranges</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map(profile => (
            <Card key={profile.id} className="enhanced-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-900">{profile.name}</CardTitle>
                <CardDescription className="text-purple-600">{profile.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-purple-700">
                  <span className="font-medium">Age Range:</span> {profile.ageRange}
                </p>
                <p className="text-purple-700">
                  <span className="font-medium">Interests:</span> {profile.interests}
                </p>
                <Separator className="bg-purple-200" />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleEdit(profile.id)}
                    className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleDelete(profile.id)}
                    className="border-purple-200 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Profile Sheet */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent className="w-[480px] sm:w-[540px] bg-gradient-to-b from-white to-purple-50 p-0 border-purple-200">
            <SheetHeader className="p-6 gradient-header sticky top-0 z-10">
              <SheetTitle className="text-white">Create New Profile</SheetTitle>
              <SheetDescription className="text-purple-100">
                Add a new target audience profile for your campaigns
              </SheetDescription>
            </SheetHeader>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Profile Name</label>
                  <Input 
                    value={profile.name} 
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Urban Young Professionals"
                    className="enhanced-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Age Range</label>
                  <Input 
                    value={profile.ageRange} 
                    onChange={(e) => setProfile({ ...profile, ageRange: e.target.value })}
                    placeholder="18-34, 25-45, etc."
                    className="enhanced-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Day/Time Targeting</label>
                  <MultiSelectField
                    options={dayTimeOptions}
                    selectedValues={profile.dayTimeparting || []}
                    onChange={(values) => setProfile({ ...profile, dayTimeparting: values })}
                    placeholder="Select time periods"
                    useCheckboxes={true}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Geographic Regions</label>
                  <MultiSelectField
                    options={regionOptions}
                    selectedValues={profile.geographyRegion || []}
                    onChange={(values) => setProfile({ ...profile, geographyRegion: values })}
                    placeholder="Select regions"
                    useCheckboxes={true}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Device Specifications</label>
                  <MultiSelectField
                    options={deviceOptions}
                    selectedValues={profile.deviceSpecs || []}
                    onChange={(values) => setProfile({ ...profile, deviceSpecs: values })}
                    placeholder="Select devices"
                    useCheckboxes={true}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Profile Description</label>
                  <Textarea 
                    value={profile.description}
                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    placeholder="Describe the target audience profile"
                    rows={3}
                    className="enhanced-input"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsOpen(false)}
                    className="text-purple-700 border-purple-200 hover:bg-purple-50"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddProfile} 
                    className="gradient-button"
                    disabled={!profile.name}
                  >
                    Add Profile
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Edit Profile Sheet */}
        <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
          <SheetContent className="w-[480px] sm:w-[540px] bg-gradient-to-b from-white to-purple-50 p-0 border-purple-200">
            <SheetHeader className="p-6 gradient-header sticky top-0 z-10">
              <SheetTitle className="text-white">Edit Profile</SheetTitle>
              <SheetDescription className="text-purple-100">
                Update the profile details for {editProfile.name}
              </SheetDescription>
            </SheetHeader>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Profile Name</label>
                  <Input 
                    value={editProfile.name} 
                    onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                    placeholder="Urban Young Professionals"
                    className="enhanced-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Age Range</label>
                  <Input 
                    value={editProfile.ageRange} 
                    onChange={(e) => setEditProfile({ ...editProfile, ageRange: e.target.value })}
                    placeholder="18-34, 25-45, etc."
                    className="enhanced-input"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Day/Time Targeting</label>
                  <MultiSelectField
                    options={dayTimeOptions}
                    selectedValues={editProfile.dayTimeparting || []}
                    onChange={(values) => setEditProfile({ ...editProfile, dayTimeparting: values })}
                    placeholder="Select time periods"
                    useCheckboxes={true}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Geographic Regions</label>
                  <MultiSelectField
                    options={regionOptions}
                    selectedValues={editProfile.geographyRegion || []}
                    onChange={(values) => setEditProfile({ ...editProfile, geographyRegion: values })}
                    placeholder="Select regions"
                    useCheckboxes={true}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Device Specifications</label>
                  <MultiSelectField
                    options={deviceOptions}
                    selectedValues={editProfile.deviceSpecs || []}
                    onChange={(values) => setEditProfile({ ...editProfile, deviceSpecs: values })}
                    placeholder="Select devices"
                    useCheckboxes={true}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-purple-800 mb-1 block">Profile Description</label>
                  <Textarea 
                    value={editProfile.description}
                    onChange={(e) => setEditProfile({ ...editProfile, description: e.target.value })}
                    placeholder="Describe the target audience profile"
                    rows={3}
                    className="enhanced-input"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditOpen(false)}
                    className="text-purple-700 border-purple-200 hover:bg-purple-50"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpdateProfile} 
                    className="gradient-button"
                  >
                    Update Profile
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Profiles;
