
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import database connection
const { testConnection } = require('./config/db');

// Import routes
const campaignsRoutes = require('./routes/campaigns');
const profilesRoutes = require('./routes/profiles');
const experimentsRoutes = require('./routes/experiments');
const brandsRoutes = require('./routes/brands');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test database connection
(async () => {
  await testConnection();
})();

// Routes
app.use('/api/campaigns', campaignsRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/experiments', experimentsRoutes);
app.use('/api/brands', brandsRoutes);

app.get('/', (req, res) => {
  res.send('Telecom Analytics API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
