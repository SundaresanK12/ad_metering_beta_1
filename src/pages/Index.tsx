
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart, Flag, TestTube, User } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="text-center mb-12 animate-slide-down">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Telecom Analytics Dashboard</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze telecommunications advertising data and market trends
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/brands-analytics">
              <Button className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                View Telecom Ads Analytics
              </Button>
            </Link>
            <Link to="/campaigns">
              <Button className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
                Manage Campaigns
              </Button>
            </Link>
            <Link to="/experiments">
              <Button className="flex items-center gap-2">
                <TestTube className="h-4 w-4" />
                A/B Test Experiments
              </Button>
            </Link>
            <Link to="/profiles">
              <Button className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer Profiles
              </Button>
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Index;
