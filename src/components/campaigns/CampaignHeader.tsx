
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { 
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CampaignHeaderProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAddOpen: boolean;
  setIsAddOpen: (open: boolean) => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  searchTerm,
  handleSearch,
  isAddOpen,
  setIsAddOpen
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2 w-1/3">
        <Input 
          placeholder="Search campaigns" 
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-xs"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
        <SheetTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </SheetTrigger>
      </Sheet>
    </div>
  );
};

export default CampaignHeader;
