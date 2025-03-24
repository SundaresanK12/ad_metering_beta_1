
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  CalendarIcon, 
  Search, 
  Tag, 
  BarChart, 
  PieChart, 
  FileText, 
  DollarSign,
  Users
} from 'lucide-react';
import BrandsList from '@/components/BrandsList';
import BrandStatsCard from '@/components/BrandStatsCard';
import MarketShareChart from '@/components/MarketShareChart';
import SpendingTrendsChart from '@/components/SpendingTrendsChart';
import PerformanceTab from '@/components/performance/PerformanceTab';
import MainNavigation from '@/components/MainNavigation';
import { cn } from '@/lib/utils';
import brandService, { BrandData } from '@/services/brandService';
import profileService, { CustomerProfile } from '@/services/profileService';

export default function BrandsAnalytics() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date('2023-09-01'));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date('2023-12-31'));
  const [hashKey, setHashKey] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<BrandData[]>([]);
  const [profiles, setProfiles] = useState<CustomerProfile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands = await brandService.getBrands();
      setBrands(fetchedBrands || []);
      setFilteredBrands(fetchedBrands || []);
    };
    
    const fetchProfiles = async () => {
      const fetchedProfiles = await profileService.getProfiles();
      setProfiles(fetchedProfiles || []);
    };
    
    fetchBrands();
    fetchProfiles();
    
    // Load filters from session storage if available
    const savedProfileFilters = sessionStorage.getItem('selectedProfileFilters');
    if (savedProfileFilters) {
      setSelectedProfiles(JSON.parse(savedProfileFilters));
    }
  }, []);

  // Save selected profiles to session storage
  useEffect(() => {
    sessionStorage.setItem('selectedProfileFilters', JSON.stringify(selectedProfiles));
  }, [selectedProfiles]);

  const handleSearch = () => {
    let filtered = brands;
    
    // Filter by hash key if provided
    if (hashKey.trim()) {
      const searchTerm = hashKey.trim().toLowerCase();
      filtered = filtered.filter(brand => {
        return (
          brand.brand.toLowerCase().includes(searchTerm) ||
          brand.targetUrl.toLowerCase().includes(searchTerm) ||
          brand.hashKeys.some(key => key.toLowerCase().includes(searchTerm))
        );
      });
    }
    
    // Filter by selected profiles if any are selected
    if (selectedProfiles.length > 0) {
      // This is just a mockup of filtering by profiles
      // In a real app, you'd query your API with these profile IDs
      filtered = filtered.filter(brand => {
        // Example logic: filter brands that might be relevant to the profiles
        // This is a placeholder - real implementation would use actual data relations
        const randomMatch = Math.random() > 0.5;
        return randomMatch;
      });
    }
    
    setFilteredBrands(filtered);
  };

  const toggleProfileSelection = (profileId: string) => {
    if (selectedProfiles.includes(profileId)) {
      setSelectedProfiles(selectedProfiles.filter(id => id !== profileId));
    } else {
      setSelectedProfiles([...selectedProfiles, profileId]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">US Telecom Ads Analysis</h1>
        <p className="text-muted-foreground">
          Analyze brands based on target URLs and ad campaigns
        </p>
      </div>
      
      <MainNavigation />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {startDate ? format(startDate, 'MMM dd, yyyy') : 'Start Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {endDate ? format(endDate, 'MMM dd, yyyy') : 'End Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-1 items-center gap-2">
          <Input 
            placeholder="Search ad hash key" 
            value={hashKey}
            onChange={(e) => setHashKey(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="outline" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {selectedProfiles.length ? `${selectedProfiles.length} Profiles` : 'Filter by Profile'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="start">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Filter by Target Profiles</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {profiles.map(profile => (
                  <div key={profile.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`analytics-profile-${profile.id}`}
                      checked={selectedProfiles.includes(profile.id)}
                      onChange={() => toggleProfileSelection(profile.id)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <label htmlFor={`analytics-profile-${profile.id}`} className="text-sm">
                      {profile.name}
                    </label>
                  </div>
                ))}
                {profiles.length === 0 && (
                  <p className="text-sm text-gray-500">No profiles available</p>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button onClick={handleSearch}>Apply Filters</Button>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BrandStatsCard 
              icon={<Tag className="h-5 w-5" />}
              title="Top Brand"
              value="Verizon"
              change={+7.2}
              description="Based on ad impressions"
            />
            <BrandStatsCard
              icon={<FileText className="h-5 w-5" />} 
              title="Active Creatives"
              value="1,842"
              change={-3.7}
              description="Across all brands"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Market Share
                </CardTitle>
                <CardDescription>
                  Distribution based on ad impressions
                  {selectedProfiles.length > 0 && ` (filtered by ${selectedProfiles.length} profiles)`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MarketShareChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Ad Spending Trends
                </CardTitle>
                <CardDescription>
                  Monthly spending by major brands
                  {selectedProfiles.length > 0 && ` (filtered by ${selectedProfiles.length} profiles)`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SpendingTrendsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="brands">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Brands by Target URLs
              </CardTitle>
              <CardDescription>
                Analyzing {hashKey ? `ads with hash key: ${hashKey}` : 'all ads'} from {startDate && format(startDate, 'MMM dd, yyyy')} to {endDate && format(endDate, 'MMM dd, yyyy')}
                {selectedProfiles.length > 0 && `, filtered by ${selectedProfiles.length} profiles`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BrandsList brands={filteredBrands} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <PerformanceTab selectedProfiles={selectedProfiles} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
