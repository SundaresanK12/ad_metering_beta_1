
# Telecom Analytics API

This is the API for the Telecom Analytics Dashboard. It provides endpoints for managing campaigns, customer profiles, A/B test experiments, and brand analytics.

## Setup

1. Install dependencies:
```
npm install
```

2. Set up your MySQL database:
- Create a MySQL database named `telecom_analytics`
- Import the schema from `db/schema.sql`
- (Optional) Import test data if available

3. Configure environment variables:
- Create a `.env` file in the server directory with the following variables:
```
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=telecom_analytics
```

4. Start the server:
```
node server.js
```

## API Endpoints

### Profiles

- `GET /api/profiles` - Get all customer profiles
- `GET /api/profiles/:id` - Get a specific profile by ID
- `POST /api/profiles` - Create a new profile
- `PUT /api/profiles/:id` - Update an existing profile
- `DELETE /api/profiles/:id` - Delete a profile

### Campaigns

- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get a specific campaign by ID
- `POST /api/campaigns` - Create a new campaign
- `PUT /api/campaigns/:id` - Update an existing campaign
- `DELETE /api/campaigns/:id` - Delete a campaign

### Experiments

- `GET /api/experiments` - Get all A/B test experiments
- `GET /api/experiments/:id` - Get a specific experiment by ID
- `GET /api/experiments/campaign/:campaignId` - Get all experiments for a specific campaign
- `POST /api/experiments` - Create a new experiment
- `PUT /api/experiments/:id` - Update an existing experiment
- `DELETE /api/experiments/:id` - Delete an experiment

### Brands

- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get a specific brand by ID
- `GET /api/brands/:id/offers` - Get all offers for a specific brand
- `POST /api/brands` - Create a new brand
- `PUT /api/brands/:id` - Update an existing brand
- `DELETE /api/brands/:id` - Delete a brand
