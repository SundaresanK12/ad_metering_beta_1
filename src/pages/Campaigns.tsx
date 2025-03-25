
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Sheet
} from "@/components/ui/sheet";
import { Flag } from 'lucide-react';
import MainNavigation from '@/components/MainNavigation';
import { useCampaignManagement } from '@/hooks/useCampaignManagement';
import CampaignHeader from '@/components/campaigns/CampaignHeader';
import CampaignList from '@/components/campaigns/CampaignList';
import CampaignForm from '@/components/campaigns/CampaignForm';

const Campaigns = () => {
  const {
    campaigns,
    searchTerm,
    isAddOpen,
    isEditOpen,
    currentCampaign,
    newCampaign,
    newProfile,
    profiles,
    createProfileEnabled,
    setCreateProfileEnabled,
    setIsAddOpen,
    setIsEditOpen,
    handleSearch,
    handleAddCampaign,
    handleEditCampaign,
    handleDeleteCampaign,
    openEditSheet,
    handleInputChange,
    handleEditChange,
    handleProfileInputChange,
    handleProfileMultiSelectChange
  } = useCampaignManagement();

  return (
    <div className="container mx-auto px-4 py-8">
      <MainNavigation />
      
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Campaign Management</h1>
      </div>

      <CampaignHeader 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Campaigns
          </CardTitle>
          <CardDescription>
            Manage your marketing campaigns and track their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CampaignList 
            campaigns={campaigns}
            profiles={profiles}
            openEditSheet={openEditSheet}
            handleDeleteCampaign={handleDeleteCampaign}
          />
        </CardContent>
      </Card>

      {/* Add Campaign Sheet */}
      <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create New Campaign</SheetTitle>
            <SheetDescription>
              Add details for your new marketing campaign
            </SheetDescription>
          </SheetHeader>
          <CampaignForm
            campaign={newCampaign}
            profiles={profiles}
            profileSettings={newProfile}
            handleInputChange={handleInputChange}
            handleProfileInputChange={handleProfileInputChange}
            handleProfileMultiSelectChange={handleProfileMultiSelectChange}
            handleSubmit={handleAddCampaign}
            submitButtonText="Create Campaign"
            createProfileEnabled={createProfileEnabled}
            setCreateProfileEnabled={setCreateProfileEnabled}
          />
        </SheetContent>
      </Sheet>

      {/* Edit Campaign Sheet */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent className="overflow-y-auto">
          {currentCampaign && (
            <>
              <SheetHeader>
                <SheetTitle>Edit Campaign</SheetTitle>
                <SheetDescription>
                  Update the details for your campaign
                </SheetDescription>
              </SheetHeader>
              <CampaignForm
                campaign={currentCampaign}
                profiles={profiles}
                handleInputChange={handleEditChange}
                handleSubmit={handleEditCampaign}
                submitButtonText="Update Campaign"
              />
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Campaigns;
