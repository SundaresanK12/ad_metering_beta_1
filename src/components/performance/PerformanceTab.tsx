
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart, DollarSign } from 'lucide-react';
import RevenuePerformanceCard from '@/components/RevenuePerformanceCard';

interface PerformanceTabProps {
  selectedProfiles: string[];
}

const PerformanceTab: React.FC<PerformanceTabProps> = ({ selectedProfiles }) => {
  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Campaign Performance Metrics
          </CardTitle>
          <CardDescription>
            Performance data across all marketing campaigns
            {selectedProfiles.length > 0 && ` (filtered by ${selectedProfiles.length} profiles)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold mt-2">1.8%</p>
              <p className="text-xs text-muted-foreground mt-1">+0.3% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
    </div>
  );
};

export default PerformanceTab;
