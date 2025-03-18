
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
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Link to="/brands-analytics" className="group">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-all">
              <BarChart className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Analytics</h2>
              <p className="text-center text-muted-foreground">
                Analyze brand data and market trends
              </p>
              <Button variant="link" className="mt-4 group-hover:underline">
                View Analytics
              </Button>
            </div>
          </Link>

          <Link to="/campaigns" className="group">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-all">
              <Flag className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Campaigns</h2>
              <p className="text-center text-muted-foreground">
                Manage marketing campaigns
              </p>
              <Button variant="link" className="mt-4 group-hover:underline">
                Manage Campaigns
              </Button>
            </div>
          </Link>

          <Link to="/experiments" className="group">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-all">
              <TestTube className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Experiments</h2>
              <p className="text-center text-muted-foreground">
                Run A/B tests on campaigns
              </p>
              <Button variant="link" className="mt-4 group-hover:underline">
                Run Experiments
              </Button>
            </div>
          </Link>

          <Link to="/profiles" className="group">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-all">
              <User className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Profiles</h2>
              <p className="text-center text-muted-foreground">
                Manage customer profiles
              </p>
              <Button variant="link" className="mt-4 group-hover:underline">
                View Profiles
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
