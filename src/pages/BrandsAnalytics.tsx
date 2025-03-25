
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  CalendarIcon, 
  Tag, 
  BarChart, 
  PieChart, 
  FileText, 
  Flag,
  TrendingUp,
  Activity
} from 'lucide-react';
import BrandsList from '@/components/BrandsList';
import BrandStatsCard from '@/components/BrandStatsCard';
import MarketShareChart from '@/components/MarketShareChart';
import SpendingTrendsChart from '@/components/SpendingTrendsChart';
import RevenuePerformanceCard from '@/components/RevenuePerformanceCard';
import MainNavigation from '@/components/MainNavigation';
import { cn } from '@/lib/utils';
import brandService, { BrandData } from '@/services/brandService';
import campaignService from '@/services/campaignService';

export default function BrandsAnalytics() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date('2023-09-01'));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date('2023-12-31'));
  const [activeTab, setActiveTab] = useState('overview');
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<BrandData[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands = await brandService.getBrands();
      setBrands(fetchedBrands || []);
      setFilteredBrands(fetchedBrands || []);
    };
    
    const fetchCampaigns = async () => {
      // Using localStorage until API is implemented
      const savedCampaigns = localStorage.getItem('campaigns');
      if (savedCampaigns) {
        const parsedCampaigns = JSON.parse(savedCampaigns);
        setCampaigns(parsedCampaigns);
      } else {
        // Fallback to empty array or fetch from API
        setCampaigns([]);
      }
    };
    
    fetchBrands();
    fetchCampaigns();
    
    // Load filters from session storage if available
    const savedCampaignFilters = sessionStorage.getItem('selectedCampaignFilters');
    if (savedCampaignFilters) {
      setSelectedCampaigns(JSON.parse(savedCampaignFilters));
    }
  }, []);

  // Save selected campaigns to session storage
  useEffect(() => {
    sessionStorage.setItem('selectedCampaignFilters', JSON.stringify(selectedCampaigns));
  }, [selectedCampaigns]);

  const applyFilters = () => {
    let filtered = brands;
    
    // Filter by selected campaigns if any are selected
    if (selectedCampaigns.length > 0) {
      // This is a mockup of filtering by campaigns
      // In a real app, you'd query your API with these campaign IDs
      filtered = filtered.filter(brand => {
        // Example logic: filter brands that might be relevant to the campaigns
        const randomMatch = Math.random() > 0.5;
        return randomMatch;
      });
    }
    
    setFilteredBrands(filtered);
  };

  const toggleCampaignSelection = (campaignId: string) => {
    if (selectedCampaigns.includes(campaignId)) {
      setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaignId));
    } else {
      setSelectedCampaigns([...selectedCampaigns, campaignId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-blue-900">Ads Metering</h1>
          <p className="text-gray-600">
            Analyze ad campaigns and measure performance
          </p>
        </div>
        
        <MainNavigation />

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-white border-blue-200 hover:bg-blue-50">
                  <CalendarIcon className="h-4 w-4 text-blue-500" />
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
                <Button variant="outline" className="flex items-center gap-2 bg-white border-blue-200 hover:bg-blue-50">
                  <CalendarIcon className="h-4 w-4 text-blue-500" />
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

          <div className="flex flex-1 items-center gap-2 ml-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-white border-blue-200 hover:bg-blue-50">
                  <Flag className="h-4 w-4 text-blue-500" />
                  {selectedCampaigns.length ? `${selectedCampaigns.length} Campaigns` : 'Filter by Campaign'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3 bg-white" align="start">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Filter by Campaigns</h4>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {campaigns.length > 0 ? campaigns.map((campaign, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`analytics-campaign-${index}`}
                          checked={selectedCampaigns.includes(campaign.name)}
                          onChange={() => toggleCampaignSelection(campaign.name)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <label htmlFor={`analytics-campaign-${index}`} className="text-sm">
                          {campaign.name}
                        </label>
                      </div>
                    )) : (
                      <p className="text-sm text-gray-500">No campaigns available</p>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button 
              onClick={applyFilters} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Apply Filters
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 p-1">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="brands"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              Brands
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BrandStatsCard 
                icon={<Tag className="h-5 w-5 text-blue-600" />}
                title="Top Brand"
                value="Verizon"
                change={+7.2}
                description="Based on ad impressions"
              />
              <BrandStatsCard
                icon={<FileText className="h-5 w-5 text-indigo-600" />} 
                title="Active Creatives"
                value="1,842"
                change={-3.7}
                description="Across all brands"
              />
            </div>
            
            {/* Performance Metrics Section - Moved from Performance Tab */}
            <Card className="mb-6 border border-blue-100 shadow-md bg-white">
              <CardHeader className="border-b border-blue-50 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Campaign Performance Metrics
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Performance data across all marketing campaigns
                  {selectedCampaigns.length > 0 && ` (filtered by ${selectedCampaigns.length} campaigns)`}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Impressions</h3>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold mt-2">2.4M</p>
                    <p className="text-xs text-muted-foreground mt-1">+12.4% from last month</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Click-Through Rate</h3>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold mt-2">3.2%</p>
                    <p className="text-xs text-muted-foreground mt-1">+0.8% from last month</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Conversion Rate</h3>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold mt-2">1.8%</p>
                    <p className="text-xs text-muted-foreground mt-1">+0.3% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Revenue Performance Cards - Moved from Performance Tab */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <RevenuePerformanceCard
                brand="Verizon"
                revenue={+8.4}
                spend={+10.2}
              />
              <RevenuePerformanceCard
                brand="AT&T"
                revenue={-2.1}
                spend={+5.7}
              />
              <RevenuePerformanceCard
                brand="T-Mobile"
                revenue={+12.3}
                spend={+15.8}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-blue-100 shadow-md bg-white">
                <CardHeader className="border-b border-blue-50 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <PieChart className="h-5 w-5 text-blue-600" />
                    Market Share
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Distribution based on ad impressions
                    {selectedCampaigns.length > 0 && ` (filtered by ${selectedCampaigns.length} campaigns)`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <MarketShareChart />
                </CardContent>
              </Card>
              
              <Card className="border border-indigo-100 shadow-md bg-white">
                <CardHeader className="border-b border-indigo-50 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="flex items-center gap-2 text-indigo-900">
                    <BarChart className="h-5 w-5 text-indigo-600" />
                    Ad Spending Trends
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Monthly spending by major brands
                    {selectedCampaigns.length > 0 && ` (filtered by ${selectedCampaigns.length} campaigns)`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <SpendingTrendsChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="brands">
            <Card className="border border-blue-100 shadow-md bg-white">
              <CardHeader className="border-b border-blue-50 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Tag className="h-5 w-5 text-blue-600" />
                  Brands by Target URLs
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Analyzing ads from {startDate && format(startDate, 'MMM dd, yyyy')} to {endDate && format(endDate, 'MMM dd, yyyy')}
                  {selectedCampaigns.length > 0 && `, filtered by ${selectedCampaigns.length} campaigns`}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <BrandsList brands={filteredBrands} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
