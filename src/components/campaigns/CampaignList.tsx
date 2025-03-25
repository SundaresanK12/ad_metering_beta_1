
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

interface CampaignListProps {
  campaigns: any[];
  profiles: any[];
  openEditSheet: (campaign: any) => void;
  handleDeleteCampaign: (id: string) => void; // Changed from number to string
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  profiles,
  openEditSheet,
  handleDeleteCampaign
}) => {
  return (
    <Table>
      <TableCaption>A list of your marketing campaigns</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell className="font-medium">{campaign.name}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 
                campaign.status === 'Planning' ? 'bg-blue-100 text-blue-800' :
                campaign.status === 'Scheduled' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status}
              </span>
            </TableCell>
            <TableCell>{campaign.startDate}</TableCell>
            <TableCell>{campaign.endDate}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => openEditSheet(campaign)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDeleteCampaign(campaign.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CampaignList;
