
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Verizon', value: 32, color: '#3b82f6' },
  { name: 'AT&T', value: 28, color: '#22c55e' },
  { name: 'T-Mobile', value: 21, color: '#ef4444' },
  { name: 'Sprint', value: 8, color: '#f59e0b' },
  { name: 'Xfinity Mobile', value: 5, color: '#8b5cf6' },
  { name: 'Cricket Wireless', value: 4, color: '#ec4899' },
  { name: 'Boost Mobile', value: 2, color: '#06b6d4' },
];

const COLORS = ['#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

const MarketShareChart = () => {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Market Share']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketShareChart;
