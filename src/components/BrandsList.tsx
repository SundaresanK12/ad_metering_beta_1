
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'lucide-react';
import { BrandData } from '@/services/brandService';

interface BrandsListProps {
  brands?: BrandData[];
}

const mockData = [
  {
    id: 1,
    brand: 'Verizon',
    targetUrl: 'https://www.verizon.com/plans/',
    adCount: 342,
    impressions: '24.5M',
    spend: '$135.7M',
    performance: 8.7,
    hashKeys: ['vz-q4-plan', 'vz-unlimited']
  },
  {
    id: 2,
    brand: 'AT&T',
    targetUrl: 'https://www.att.com/deals/',
    adCount: 289,
    impressions: '18.2M',
    spend: '$112.3M',
    performance: -3.2,
    hashKeys: ['att-fiber', 'att-unlimited']
  },
  {
    id: 3,
    brand: 'T-Mobile',
    targetUrl: 'https://www.t-mobile.com/offers/home-internet',
    adCount: 215,
    impressions: '15.8M',
    spend: '$98.4M',
    performance: 12.5,
    hashKeys: ['tmobile-5g', 'tmobile-home']
  },
  {
    id: 4,
    brand: 'Sprint',
    targetUrl: 'https://www.sprint.com/en/special-deals.html',
    adCount: 178,
    impressions: '10.3M',
    spend: '$67.8M',
    performance: -1.8,
    hashKeys: ['sprint-family', 'sprint-deal']
  },
  {
    id: 5,
    brand: 'Xfinity Mobile',
    targetUrl: 'https://www.xfinity.com/mobile/',
    adCount: 156,
    impressions: '8.7M',
    spend: '$52.9M',
    performance: 6.3,
    hashKeys: ['xfinity-byod', 'xfinity-mobile']
  },
  {
    id: 6,
    brand: 'Cricket Wireless',
    targetUrl: 'https://www.cricketwireless.com/current-phone-and-plan-deals',
    adCount: 134,
    impressions: '6.5M',
    spend: '$41.2M',
    performance: 4.1,
    hashKeys: ['cricket-prepaid', 'cricket-unlimited']
  },
  {
    id: 7,
    brand: 'Boost Mobile',
    targetUrl: 'https://www.boostmobile.com/deals.html',
    adCount: 112,
    impressions: '5.8M',
    spend: '$36.5M',
    performance: -2.7,
    hashKeys: ['boost-family', 'boost-unlimited']
  },
];

const BrandsList: React.FC<BrandsListProps> = ({ brands }) => {
  const brandsToDisplay = brands && brands.length > 0 ? brands : mockData;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Brand</TableHead>
            <TableHead>Target URL</TableHead>
            <TableHead>Creatives</TableHead>
            <TableHead>Impressions</TableHead>
            <TableHead>Hash Keys</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brandsToDisplay.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.brand}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                <div className="flex items-center gap-1">
                  <Link className="h-3 w-3" />
                  <a href={item.targetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">
                    {item.targetUrl}
                  </a>
                </div>
              </TableCell>
              <TableCell>{item.adCount}</TableCell>
              <TableCell>{item.impressions}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.hashKeys.map((key, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {key}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BrandsList;
