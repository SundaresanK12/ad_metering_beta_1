
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart, Activity } from 'lucide-react';

interface RevenuePerformanceCardProps {
  brand: string;
  revenue: number;
  spend: number;
}

const RevenuePerformanceCard: React.FC<RevenuePerformanceCardProps> = ({
  brand,
  revenue,
  spend,
}) => {
  const roi = (revenue / spend).toFixed(2);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{brand}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <span className="text-xs flex items-center gap-1 text-muted-foreground">
              <Activity className="h-3 w-3" /> New Creatives
            </span>
            <div className="flex items-center">
              {revenue > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">+{revenue}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-sm font-medium text-red-500">{revenue}%</span>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs flex items-center gap-1 text-muted-foreground">
              <BarChart className="h-3 w-3" /> Ads Impression
            </span>
            <div className="flex items-center">
              {spend > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-blue-500 mr-1" />
                  <span className="text-sm font-medium text-blue-500">+{spend}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-blue-500 mr-1" />
                  <span className="text-sm font-medium text-blue-500">{spend}%</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">ROI</span>
            <span className="text-sm font-medium">{roi}x</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenuePerformanceCard;
