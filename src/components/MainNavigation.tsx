
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart, Flag, Beaker } from 'lucide-react';

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
    icon: Beaker,
  },
];

export function MainNavigation() {
  const location = useLocation();
  
  return (
    <nav className="flex mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 shadow-sm">
      <div className="container flex overflow-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors",
              location.pathname === item.href
                ? "border-indigo-600 text-indigo-600 bg-indigo-50/50"
                : "border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/30"
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
