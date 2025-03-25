
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    selectedFile,
    fileData,
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
    handleProfileMultiSelectChange,
    handleFileSelect
  } = useCampaignManagement();

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <MainNavigation />
      
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Campaign Management</h1>
      </div>

      <CampaignHeader 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
      />

      <Card className="shadow-xl border-blue-100 bg-white/80 backdrop-blur-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Flag className="h-5 w-5 text-blue-700" />
            Campaigns
          </CardTitle>
          <CardDescription className="text-blue-700">
            Manage your marketing campaigns and track their performance
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <CampaignList 
            campaigns={campaigns}
            profiles={profiles}
            openEditSheet={openEditSheet}
            handleDeleteCampaign={handleDeleteCampaign}
          />
        </CardContent>
      </Card>

      {/* Add Campaign Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto p-0 bg-gradient-to-b from-white to-blue-50 border-blue-200">
          <DialogHeader className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-10">
            <DialogTitle className="text-2xl">Create New Campaign</DialogTitle>
            <DialogDescription className="text-blue-100">
              Add details for your new marketing campaign
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <CampaignForm
              campaign={newCampaign}
              profileSettings={newProfile}
              selectedFile={selectedFile}
              fileData={fileData}
              handleInputChange={handleInputChange}
              handleProfileInputChange={handleProfileInputChange}
              handleProfileMultiSelectChange={handleProfileMultiSelectChange}
              handleFileSelect={handleFileSelect}
              handleSubmit={handleAddCampaign}
              submitButtonText="Create Campaign"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto p-0 bg-gradient-to-b from-white to-blue-50 border-blue-200">
          {currentCampaign && (
            <>
              <DialogHeader className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-10">
                <DialogTitle className="text-2xl">Edit Campaign</DialogTitle>
                <DialogDescription className="text-blue-100">
                  Update the details for your campaign
                </DialogDescription>
              </DialogHeader>
              <div className="p-6">
                <CampaignForm
                  campaign={currentCampaign}
                  selectedFile={null}
                  fileData={[]}
                  handleInputChange={handleEditChange}
                  handleSubmit={handleEditCampaign}
                  submitButtonText="Update Campaign"
                  isEdit={true}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Campaigns;
