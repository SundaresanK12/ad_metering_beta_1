
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockOffers = [
  {
    id: 1,
    brand: 'Verizon',
    offerName: 'Unlimited Premium 5G Plan',
    startDate: '2023-11-01',
    endDate: '2023-12-31',
    discount: '$15/month',
    targetAudience: 'New customers',
    impressions: '5.2M',
    hashKey: 'vz-unlimited-q4'
  },
  {
    id: 2,
    brand: 'AT&T',
    offerName: 'Fiber Internet + Mobile Bundle',
    startDate: '2023-10-15',
    endDate: '2023-12-15',
    discount: '$300 gift card',
    targetAudience: 'New & existing customers',
    impressions: '4.8M',
    hashKey: 'att-fiber-bundle'
  },
  {
    id: 3,
    brand: 'T-Mobile',
    offerName: 'Home Internet + Netflix Bundle',
    startDate: '2023-11-10',
    endDate: '2024-01-15',
    discount: '$200 off + free Netflix',
    targetAudience: 'New home internet customers',
    impressions: '3.9M',
    hashKey: 'tmobile-home-netflix'
  },
  {
    id: 4,
    brand: 'Xfinity Mobile',
    offerName: 'BYOD 5G Unlimited',
    startDate: '2023-11-25',
    endDate: '2024-01-10',
    discount: '$500 off when you bring your device',
    targetAudience: 'Competitors\' customers',
    impressions: '2.7M',
    hashKey: 'xfinity-byod-500'
  },
  {
    id: 5,
    brand: 'Cricket Wireless',
    offerName: 'Family Plan Discount',
    startDate: '2023-12-01',
    endDate: '2024-01-31',
    discount: '$25/line for 4+ lines',
    targetAudience: 'Families',
    impressions: '2.1M',
    hashKey: 'cricket-family-q4'
  },
];

const NewOffersTable = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Brand</TableHead>
            <TableHead>Offer Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Promotion</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Impressions</TableHead>
            <TableHead>Hash Key</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockOffers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell className="font-medium">{offer.brand}</TableCell>
              <TableCell>{offer.offerName}</TableCell>
              <TableCell>{new Date(offer.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(offer.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{offer.discount}</TableCell>
              <TableCell>{offer.targetAudience}</TableCell>
              <TableCell>{offer.impressions}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {offer.hashKey}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NewOffersTable;
