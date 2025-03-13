
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const monthlyData = [
  {
    month: 'Jul',
    Verizon: 28.5,
    ATT: 24.3,
    TMobile: 18.7,
    Sprint: 12.2,
    Xfinity: 8.8,
  },
  {
    month: 'Aug',
    Verizon: 30.1,
    ATT: 25.2,
    TMobile: 19.4,
    Sprint: 11.8,
    Xfinity: 9.2,
  },
  {
    month: 'Sep',
    Verizon: 31.8,
    ATT: 26.7,
    TMobile: 20.5,
    Sprint: 12.0,
    Xfinity: 10.1,
  },
  {
    month: 'Oct',
    Verizon: 33.2,
    ATT: 27.1,
    TMobile: 22.3,
    Sprint: 13.5,
    Xfinity: 11.2,
  },
  {
    month: 'Nov',
    Verizon: 35.8,
    ATT: 29.4,
    TMobile: 24.8,
    Sprint: 14.1,
    Xfinity: 12.4,
  },
  {
    month: 'Dec',
    Verizon: 38.2,
    ATT: 30.8,
    TMobile: 25.9,
    Sprint: 14.8,
    Xfinity: 13.2,
  },
];

const detailedData = [
  {
    brand: 'Verizon',
    revenue: 280.5,
    spend: 38.2,
    roi: 7.34,
  },
  {
    brand: 'AT&T',
    revenue: 245.3,
    spend: 30.8,
    roi: 7.96,
  },
  {
    brand: 'T-Mobile',
    revenue: 187.2,
    spend: 25.9,
    roi: 7.23,
  },
  {
    brand: 'Sprint',
    revenue: 102.4,
    spend: 14.8,
    roi: 6.92,
  },
  {
    brand: 'Xfinity Mobile',
    revenue: 88.7,
    spend: 13.2,
    roi: 6.72,
  },
  {
    brand: 'Cricket Wireless',
    revenue: 53.2,
    spend: 8.1,
    roi: 6.57,
  },
  {
    brand: 'Boost Mobile',
    revenue: 42.8,
    spend: 6.5,
    roi: 6.58,
  },
];

interface SpendingTrendsChartProps {
  isDetailed?: boolean;
}

const SpendingTrendsChart: React.FC<SpendingTrendsChartProps> = ({ isDetailed = false }) => {
  if (isDetailed) {
    return (
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={detailedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="brand" />
            <YAxis yAxisId="left" orientation="left" label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Ad Spend ($M)', angle: 90, position: 'insideRight' }} />
            <Tooltip formatter={(value) => [`$${value}M`, '']} />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#3b82f6" />
            <Bar yAxisId="right" dataKey="spend" name="Ad Spend" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: 'Spending ($M)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`$${value}M`, '']} />
          <Legend />
          <Line type="monotone" dataKey="Verizon" stroke="#3b82f6" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="ATT" stroke="#22c55e" />
          <Line type="monotone" dataKey="TMobile" stroke="#ef4444" />
          <Line type="monotone" dataKey="Sprint" stroke="#f59e0b" />
          <Line type="monotone" dataKey="Xfinity" stroke="#8b5cf6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrendsChart;
