
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  description: string;
  profile?: Profile;
}

interface Profile {
  ageRange: string;
  interests: string;
  description: string;
  dayTimeparting: string[];
  geographyRegion: string[];
  deviceSpecs: string[];
}

export const useCampaignManagement = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [profiles, setProfiles] = useState<string[]>(['Urban Youth', 'Family Premium', 'Senior Value', 'Business Small']);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string[]>([]);
  
  const [newCampaign, setNewCampaign] = useState<Omit<Campaign, 'id'>>({
    name: '',
    status: 'Planning',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: ''
  });

  const [newProfile, setNewProfile] = useState<Profile>({
    ageRange: '',
    interests: '',
    description: '',
    dayTimeparting: [],
    geographyRegion: [],
    deviceSpecs: []
  });

  // Load campaigns from localStorage
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('campaigns');
    if (savedCampaigns) {
      try {
        setCampaigns(JSON.parse(savedCampaigns));
      } catch (e) {
        console.error('Error loading campaigns from localStorage', e);
        setCampaigns([]);
      }
    }
  }, []);

  // Save campaigns to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleAddCampaign = () => {
    const id = generateId();
    const newCampaignWithProfile = {
      ...newCampaign,
      id,
      profile: newProfile
    };
    
    setCampaigns([...campaigns, newCampaignWithProfile]);
    
    setNewCampaign({
      name: '',
      status: 'Planning',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: ''
    });
    
    setNewProfile({
      ageRange: '',
      interests: '',
      description: '',
      dayTimeparting: [],
      geographyRegion: [],
      deviceSpecs: []
    });
    
    setSelectedFile(null);
    setFileData([]);
    setIsAddOpen(false);
    
    toast.success('Campaign created successfully');
  };

  const handleEditCampaign = () => {
    if (currentCampaign) {
      setCampaigns(campaigns.map(c => c.id === currentCampaign.id ? currentCampaign : c));
      setIsEditOpen(false);
      toast.success('Campaign updated successfully');
    }
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast.success('Campaign deleted successfully');
  };

  const openEditSheet = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setIsEditOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (currentCampaign) {
      setCurrentCampaign({ ...currentCampaign, [name]: value });
    }
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleProfileMultiSelectChange = (field: keyof Omit<Profile, 'ageRange' | 'interests' | 'description'>, values: string[]) => {
    setNewProfile({ ...newProfile, [field]: values });
  };

  const handleFileSelect = useCallback((file: File, data: string[]) => {
    setSelectedFile(file);
    setFileData(data);
  }, []);

  return {
    campaigns: filteredCampaigns,
    searchTerm,
    isAddOpen,
    isEditOpen,
    currentCampaign,
    newCampaign,
    newProfile,
    profiles,
    selectedFile,
    fileData,
    setIsAddOpen,
    setIsEditOpen,
    handleSearch,
    handleAddCampaign,
    handleEditCampaign,
    handleDeleteCampaign,
    openEditSheet,
    handleInputChange,
    handleEditChange,
    handleProfileInputChange,
    handleProfileMultiSelectChange,
    handleFileSelect
  };
};

export default useCampaignManagement;
