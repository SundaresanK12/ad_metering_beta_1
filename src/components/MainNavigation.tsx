
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart, Flag } from 'lucide-react';

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
];

export function MainNavigation() {
  const location = useLocation();
  
  return (
    <nav className="flex mb-6 bg-gradient-to-r from-purple-100 to-indigo-100 border-b border-purple-200 shadow-sm">
      <div className="container flex overflow-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors",
              location.pathname === item.href
                ? "border-purple-600 text-purple-700 bg-purple-50/50"
                : "border-transparent text-gray-700 hover:text-purple-700 hover:border-purple-300 hover:bg-purple-50/30"
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
