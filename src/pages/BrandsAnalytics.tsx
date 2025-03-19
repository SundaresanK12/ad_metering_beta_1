import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search, Tag, TrendingUp, TrendingDown, BarChart, PieChart, FileText, Link, DollarSign } from 'lucide-react';
import BrandsList from '@/components/BrandsList';
import BrandStatsCard from '@/components/BrandStatsCard';
import MarketShareChart from '@/components/MarketShareChart';
import SpendingTrendsChart from '@/components/SpendingTrendsChart';
import RevenuePerformanceCard from '@/components/RevenuePerformanceCard';
import NewOffersTable from '@/components/NewOffersTable';
import MainNavigation from '@/components/MainNavigation';
import { cn } from '@/lib/utils';
import brandService, { BrandData } from '@/services/brandService';

export default function BrandsAnalytics() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date('2023-09-01'));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date('2023-12-31'));
  const [hashKey, setHashKey] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<BrandData[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands = await brandService.getBrands();
      setBrands(fetchedBrands || []);
      setFilteredBrands(fetchedBrands || []);
    };
    
    fetchBrands();
  }, []);

  const handleSearch = () => {
    if (!hashKey.trim()) {
      setFilteredBrands(brands);
      return;
    }

    const searchTerm = hashKey.trim().toLowerCase();
    const filtered = brands.filter(brand => {
      return (
        brand.brand.toLowerCase().includes(searchTerm) ||
        brand.targetUrl.toLowerCase().includes(searchTerm) ||
        brand.hashKeys.some(key => key.toLowerCase().includes(searchTerm))
      );
    });
    
    setFilteredBrands(filtered);
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

        <Button onClick={handleSearch}>Apply Filters</Button>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="offers">New Offers</TabsTrigger>
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
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SpendingTrendsChart />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BrandsList brands={filteredBrands} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue vs. Ad Spend Performance
                </CardTitle>
                <CardDescription>
                  Q4 2023 vs Q3 2023 comparison
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-96">
                <SpendingTrendsChart isDetailed />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="offers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                New Promotional Offers
              </CardTitle>
              <CardDescription>
                Tracking new offers by brand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewOffersTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
