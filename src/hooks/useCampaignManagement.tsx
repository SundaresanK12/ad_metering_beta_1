
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import profileService from '@/services/profileService';

// Mock data for campaigns
const initialCampaigns = [
  { id: 1, name: 'Summer Promotion', status: 'Active', startDate: '2023-06-01', endDate: '2023-08-31', description: 'Summer discount campaign for all cellular plans', domains: ['facebook.com', 'instagram.com'] },
  { id: 2, name: 'New iPhone Launch', status: 'Planning', startDate: '2023-09-15', endDate: '2023-10-15', description: 'Campaign for the latest iPhone release', domains: ['google.com', 'youtube.com'] },
  { id: 3, name: 'Black Friday Deals', status: 'Scheduled', startDate: '2023-11-20', endDate: '2023-11-30', description: 'Special offers for Black Friday', domains: ['linkedin.com'] },
  { id: 4, name: 'Holiday Bundle', status: 'Active', startDate: '2023-12-01', endDate: '2023-12-31', description: 'Family plan discounts for the holiday season', domains: ['facebook.com', 'twitter.com'] },
];

export const useCampaignManagement = () => {
  const [campaigns, setCampaigns] = useState(() => {
    // Try to get campaigns from sessionStorage
    const savedCampaigns = sessionStorage.getItem('campaigns');
    return savedCampaigns ? JSON.parse(savedCampaigns) : initialCampaigns;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<any>(null);
  const [profiles, setProfiles] = useState<any[]>([]);
  
  const [newCampaign, setNewCampaign] = useState(() => {
    // Try to get new campaign data from sessionStorage
    const savedNewCampaign = sessionStorage.getItem('newCampaign');
    return savedNewCampaign ? JSON.parse(savedNewCampaign) : {
      name: '',
      status: 'Planning',
      startDate: '',
      endDate: '',
      description: '',
      domains: []
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

  const handleAddCampaign = () => {
    const id = Math.max(...campaigns.map(c => c.id), 0) + 1;
    setCampaigns([...campaigns, { id, ...newCampaign }]);
    setNewCampaign({
      name: '',
      status: 'Planning',
      startDate: '',
      endDate: '',
      description: '',
      domains: []
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

  const handleDomainsChange = (domains: string[]) => {
    setNewCampaign({ ...newCampaign, domains });
  };

  const handleEditDomainsChange = (domains: string[]) => {
    setCurrentCampaign({ ...currentCampaign, domains });
  };

  return {
    campaigns: filteredCampaigns,
    searchTerm,
    isAddOpen,
    isEditOpen,
    currentCampaign,
    newCampaign,
    profiles,
    setIsAddOpen,
    setIsEditOpen,
    handleSearch,
    handleAddCampaign,
    handleEditCampaign,
    handleDeleteCampaign,
    openEditSheet,
    handleInputChange,
    handleEditChange,
    handleDomainsChange,
    handleEditDomainsChange
  };
};
