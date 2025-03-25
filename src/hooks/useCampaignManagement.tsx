
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import profileService from '@/services/profileService';

// Mock data for campaigns
const initialCampaigns = [
  { id: 1, name: 'Summer Promotion', status: 'Active', startDate: '2023-06-01', endDate: '2023-08-31', description: 'Summer discount campaign for all cellular plans', profileId: 1 },
  { id: 2, name: 'New iPhone Launch', status: 'Planning', startDate: '2023-09-15', endDate: '2023-10-15', description: 'Campaign for the latest iPhone release', profileId: 2 },
  { id: 3, name: 'Black Friday Deals', status: 'Scheduled', startDate: '2023-11-20', endDate: '2023-11-30', description: 'Special offers for Black Friday', profileId: 3 },
  { id: 4, name: 'Holiday Bundle', status: 'Active', startDate: '2023-12-01', endDate: '2023-12-31', description: 'Family plan discounts for the holiday season', profileId: 4 },
];

export const useCampaignManagement = () => {
  const [campaigns, setCampaigns] = useState(() => {
    // Try to get campaigns from localStorage instead of sessionStorage
    const savedCampaigns = localStorage.getItem('campaigns');
    return savedCampaigns ? JSON.parse(savedCampaigns) : initialCampaigns;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<any>(null);
  const [profiles, setProfiles] = useState<any[]>([]);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string[]>([]);
  
  const [newCampaign, setNewCampaign] = useState(() => {
    // Try to get new campaign data from localStorage
    const savedNewCampaign = localStorage.getItem('newCampaign');
    return savedNewCampaign ? JSON.parse(savedNewCampaign) : {
      name: '',
      status: 'Planning',
      startDate: '',
      endDate: '',
      description: '',
      profileId: ''
    };
  });
  
  const [newProfile, setNewProfile] = useState({
    ageRange: '',
    interests: '',
    description: '',
    dayTimeparting: [],
    geographyRegion: [],
    deviceSpecs: [],
    fileData: []
  });

  // Save campaigns to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  // Save new campaign data to localStorage
  useEffect(() => {
    localStorage.setItem('newCampaign', JSON.stringify(newCampaign));
  }, [newCampaign]);

  // Save current campaign data to localStorage
  useEffect(() => {
    if (currentCampaign) {
      localStorage.setItem('currentCampaign', JSON.stringify(currentCampaign));
    }
  }, [currentCampaign]);

  // Load profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fetchedProfiles = await profileService.getProfiles();
        console.log("Fetched profiles:", fetchedProfiles);
        setProfiles(fetchedProfiles || []);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        toast.error("Failed to load profiles");
      }
    };
    
    fetchProfiles();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCampaign = async () => {
    const id = Math.max(...campaigns.map(c => c.id), 0) + 1;
    
    // Create a new profile with the campaign
    try {
      // Simulate profile creation
      const newProfileId = Math.max(...profiles.map(p => p.id), 0) + 1;
      const newProfileWithId = { 
        id: newProfileId, 
        name: `Profile for ${newCampaign.name}`,
        segment: 'Auto-generated',
        ...newProfile,
        fileData 
      };
      
      // Update profiles state
      setProfiles([...profiles, newProfileWithId]);
      
      // Create campaign with the new profile ID
      setCampaigns([...campaigns, { 
        id, 
        ...newCampaign, 
        profileId: newProfileId 
      }]);
      
      // Reset states
      setNewCampaign({
        name: '',
        status: 'Planning',
        startDate: '',
        endDate: '',
        description: '',
        profileId: ''
      });
      
      setNewProfile({
        ageRange: '',
        interests: '',
        description: '',
        dayTimeparting: [],
        geographyRegion: [],
        deviceSpecs: [],
        fileData: []
      });
      
      setSelectedFile(null);
      setFileData([]);
      setIsAddOpen(false);
      toast.success('Campaign created successfully');
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Failed to create campaign");
    }
  };

  const handleEditCampaign = () => {
    setCampaigns(campaigns.map(c => c.id === currentCampaign.id ? currentCampaign : c));
    setIsEditOpen(false);
    // Remove the current campaign from localStorage after successful edit
    localStorage.removeItem('currentCampaign');
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
  
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };
  
  const handleProfileMultiSelectChange = (field: string, values: string[]) => {
    setNewProfile({ ...newProfile, [field]: values });
  };

  const handleFileSelect = (file: File, data: string[]) => {
    setSelectedFile(file);
    setFileData(data);
  };

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
