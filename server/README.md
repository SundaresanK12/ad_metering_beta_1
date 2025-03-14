
# Telecom Analytics API

This is a Node.js API server for the Telecom Analytics Dashboard application.

## Setup Instructions

1. Install Node.js if you don't have it already
2. Navigate to the server directory
3. Install dependencies:
   ```
   npm install express cors body-parser dotenv
   ```
4. Start the server:
   ```
   node server.js
   ```

The server will run on port 5000 by default, but you can change this in the .env file.

## API Endpoints

### Campaigns
- GET /api/campaigns - Get all campaigns
- GET /api/campaigns/:id - Get campaign by ID
- POST /api/campaigns - Create new campaign
- PUT /api/campaigns/:id - Update campaign
- DELETE /api/campaigns/:id - Delete campaign

### Profiles
- GET /api/profiles - Get all profiles
- GET /api/profiles/:id - Get profile by ID
- POST /api/profiles - Create new profile
- PUT /api/profiles/:id - Update profile
- DELETE /api/profiles/:id - Delete profile

### Experiments
- GET /api/experiments - Get all experiments
- GET /api/experiments/:id - Get experiment by ID
- GET /api/experiments/campaign/:campaignId - Get experiments by campaign ID
- POST /api/experiments - Create new experiment
- PUT /api/experiments/:id - Update experiment
- DELETE /api/experiments/:id - Delete experiment

### Brands
- GET /api/brands - Get all brands
- GET /api/brands/:id - Get brand by ID
- GET /api/brands/:id/offers - Get offers by brand ID
- POST /api/brands - Create new brand
- PUT /api/brands/:id - Update brand
- DELETE /api/brands/:id - Delete brand
