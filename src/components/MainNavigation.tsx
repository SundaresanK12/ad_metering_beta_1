
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart, Flag, TestTube, User } from 'lucide-react';

const navItems = [
  {
    title: 'Analytics',
    href: '/brands-analytics',
    icon: BarChart,
  },
  {
    title: 'Campaigns',
    href: '/campaigns',
    icon: Flag,
  },
  {
    title: 'Experiments',
    href: '/experiments',
    icon: TestTube,
  },
  {
    title: 'Profiles',
    href: '/profiles',
    icon: User,
  },
];

export function MainNavigation() {
  const location = useLocation();
  
  return (
    <nav className="flex mb-6 border-b">
      <div className="container flex overflow-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              location.pathname === item.href
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default MainNavigation;
