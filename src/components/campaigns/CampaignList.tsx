
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
import { Edit, Trash, Download } from 'lucide-react';
import { saveToTextFile, generateDateBasedFilename } from '@/utils/fileUtils';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  description: string;
  profile?: any;
  metrics?: any;
}

interface CampaignListProps {
  campaigns: Campaign[];
  profiles: any[];
  openEditSheet: (campaign: Campaign) => void;
  handleDeleteCampaign: (id: string) => void; 
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  profiles,
  openEditSheet,
  handleDeleteCampaign
}) => {
  const handleExportCampaign = (campaign: Campaign) => {
    const filename = generateDateBasedFilename(campaign.name.replace(/\s+/g, '_').toLowerCase());
    
    // Create an export object with relevant info
    const exportData = {
      campaign,
      exportDate: new Date().toISOString(),
      exportType: 'campaign_export'
    };
    
    // Save the file and show success message
    saveToTextFile(exportData, filename);
    toast.success(`Campaign exported to ${filename}`);
  };

  return (
    <Table className="enhanced-table">
      <TableCaption>A list of your marketing campaigns</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-purple-800">Name</TableHead>
          <TableHead className="text-purple-800">Status</TableHead>
          <TableHead className="text-purple-800">Start Date</TableHead>
          <TableHead className="text-purple-800">End Date</TableHead>
          <TableHead className="text-right text-purple-800">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
              No campaigns found. Create your first campaign!
            </TableCell>
          </TableRow>
        ) : (
          campaigns.map((campaign) => (
            <TableRow key={campaign.id} className="hover:bg-purple-50/50">
              <TableCell className="font-medium text-purple-900">{campaign.name}</TableCell>
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
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleExportCampaign(campaign)}
                    className="border-purple-100 hover:bg-purple-50 hover:text-purple-700"
                    title="Export Campaign"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => openEditSheet(campaign)}
                    className="border-purple-100 hover:bg-purple-50 hover:text-purple-700"
                    title="Edit Campaign"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="border-purple-100 hover:bg-red-50 hover:text-red-700"
                    title="Delete Campaign"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CampaignList;
