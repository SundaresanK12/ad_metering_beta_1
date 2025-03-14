
-- SQL Schema for Telecom Analytics

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS telecom_analytics;
USE telecom_analytics;

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  segment_size VARCHAR(20),
  campaigns INT DEFAULT 0,
  status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Profile Demographics
CREATE TABLE IF NOT EXISTS profile_demographics (
  profile_id VARCHAR(36) PRIMARY KEY,
  age_range VARCHAR(20),
  income VARCHAR(50),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Profile Locations (array)
CREATE TABLE IF NOT EXISTS profile_locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id VARCHAR(36),
  location VARCHAR(50),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Profile Interests (array)
CREATE TABLE IF NOT EXISTS profile_interests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id VARCHAR(36),
  interest VARCHAR(100),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Profile Behavioral Attributes
CREATE TABLE IF NOT EXISTS profile_behaviors (
  profile_id VARCHAR(36) PRIMARY KEY,
  device_usage VARCHAR(100),
  data_consumption VARCHAR(100),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Profile Plan Types (array)
CREATE TABLE IF NOT EXISTS profile_plan_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id VARCHAR(36),
  plan_type VARCHAR(50),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  start_date DATE,
  end_date DATE,
  status ENUM('active', 'ended', 'planning') DEFAULT 'planning',
  budget DECIMAL(12, 2),
  description TEXT
);

-- Campaign Profiles (Many-to-Many)
CREATE TABLE IF NOT EXISTS campaign_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campaign_id VARCHAR(36),
  profile_id VARCHAR(36),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Campaign Metrics
CREATE TABLE IF NOT EXISTS campaign_metrics (
  campaign_id VARCHAR(36) PRIMARY KEY,
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,
  conversions INT DEFAULT 0,
  spend DECIMAL(12, 2) DEFAULT 0,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);

-- Experiments Table
CREATE TABLE IF NOT EXISTS experiments (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  campaign_id VARCHAR(36),
  start_date DATE,
  end_date DATE NULL,
  status ENUM('planned', 'running', 'completed') DEFAULT 'planned',
  winner CHAR(1) NULL,
  confidence INT DEFAULT 0,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);

-- Experiment Variants
CREATE TABLE IF NOT EXISTS experiment_variants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  experiment_id VARCHAR(36),
  variant_key CHAR(1) NOT NULL,
  name VARCHAR(100),
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,
  conversions INT DEFAULT 0,
  FOREIGN KEY (experiment_id) REFERENCES experiments(id) ON DELETE CASCADE
);

-- Brands Table
CREATE TABLE IF NOT EXISTS brands (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  market_share DECIMAL(5, 2),
  stock_price DECIMAL(10, 2),
  revenue_in_billions DECIMAL(10, 2),
  customer_satisfaction DECIMAL(3, 1),
  yearly_growth DECIMAL(4, 1)
);

-- Brand Offers
CREATE TABLE IF NOT EXISTS brand_offers (
  id VARCHAR(36) PRIMARY KEY,
  brand_id VARCHAR(36),
  name VARCHAR(100) NOT NULL,
  price DECIMAL(8, 2),
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

-- Brand Offer Features
CREATE TABLE IF NOT EXISTS brand_offer_features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  offer_id VARCHAR(36),
  feature VARCHAR(255),
  FOREIGN KEY (offer_id) REFERENCES brand_offers(id) ON DELETE CASCADE
);

-- Insert sample data (this could be moved to a separate seed.sql file)
-- ... etc ...
