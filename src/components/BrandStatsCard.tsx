
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface BrandStatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: number;
  description: string;
}

const BrandStatsCard: React.FC<BrandStatsCardProps> = ({
  icon,
  title,
  value,
  change,
  description,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{value}</h3>
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          {change > 0 ? (
            <>
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="font-medium text-green-500">+{change}%</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="font-medium text-red-500">{change}%</span>
            </>
          )}
          <span className="ml-1 text-muted-foreground">from previous period</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandStatsCard;
