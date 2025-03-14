
// Mock data for the API

const mockCampaigns = [
  {
    id: "camp_1",
    name: "Q4 5G Promo",
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-12-31"),
    status: "active",
    budget: 250000,
    targetProfiles: ["prof_1", "prof_4"],
    description: "Promoting 5G services with special holiday pricing",
    metrics: {
      impressions: 1250000,
      clicks: 85000,
      conversions: 7500,
      spend: 175000
    }
  },
  {
    id: "camp_2",
    name: "Family Plan Push",
    startDate: new Date("2023-09-15"),
    endDate: new Date("2023-11-15"),
    status: "active",
    budget: 180000,
    targetProfiles: ["prof_2", "prof_3"],
    description: "Promoting family plans with added benefits",
    metrics: {
      impressions: 980000,
      clicks: 65000,
      conversions: 4200,
      spend: 120000
    }
  },
  {
    id: "camp_3",
    name: "Business Solutions",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-10-31"),
    status: "ended",
    budget: 320000,
    targetProfiles: ["prof_5"],
    description: "Enterprise-focused campaign for business solutions",
    metrics: {
      impressions: 450000,
      clicks: 28000,
      conversions: 1200,
      spend: 320000
    }
  },
  {
    id: "camp_4",
    name: "Student Discount",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-03-15"),
    status: "planning",
    budget: 150000,
    targetProfiles: ["prof_1"],
    description: "Back to school promotion with student discounts",
    metrics: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0
    }
  },
  {
    id: "camp_5",
    name: "Unlimited Data Push",
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-01-31"),
    status: "active",
    budget: 280000,
    targetProfiles: ["prof_1", "prof_2", "prof_3"],
    description: "Promoting unlimited data plans for all users",
    metrics: {
      impressions: 320000,
      clicks: 18000,
      conversions: 1500,
      spend: 95000
    }
  }
];

const mockProfiles = [
  {
    id: "prof_1",
    name: "Young Adults",
    segmentSize: "3.2M",
    campaigns: 4,
    status: "active",
    demographics: {
      ageRange: "18-34",
      income: "$30,000-$60,000",
      location: ["Urban", "Suburban"],
      interests: ["Streaming", "Social Media", "Gaming"]
    },
    behavioralAttributes: {
      deviceUsage: "Heavy",
      dataConsumption: "High",
      planType: ["Individual", "Prepaid"]
    }
  },
  {
    id: "prof_2",
    name: "Family Households",
    segmentSize: "2.8M",
    campaigns: 3,
    status: "active",
    demographics: {
      ageRange: "35-54",
      income: "$60,000-$120,000",
      location: ["Suburban", "Rural"],
      interests: ["Family Entertainment", "Sports", "Education"]
    },
    behavioralAttributes: {
      deviceUsage: "Moderate",
      dataConsumption: "Medium",
      planType: ["Family", "Postpaid"]
    }
  },
  {
    id: "prof_3",
    name: "Seniors",
    segmentSize: "1.5M",
    campaigns: 2,
    status: "active",
    demographics: {
      ageRange: "55+",
      income: "$40,000-$80,000",
      location: ["Rural", "Suburban"],
      interests: ["News", "Health", "Travel"]
    },
    behavioralAttributes: {
      deviceUsage: "Light",
      dataConsumption: "Low",
      planType: ["Individual", "Basic"]
    }
  },
  {
    id: "prof_4",
    name: "Tech Enthusiasts",
    segmentSize: "1.8M",
    campaigns: 2,
    status: "active",
    demographics: {
      ageRange: "25-44",
      income: "$80,000-$150,000",
      location: ["Urban"],
      interests: ["Technology", "Gadgets", "Early Adoption"]
    },
    behavioralAttributes: {
      deviceUsage: "Heavy",
      dataConsumption: "Very High",
      planType: ["Premium", "Unlimited"]
    }
  },
  {
    id: "prof_5",
    name: "Business Users",
    segmentSize: "0.9M",
    campaigns: 1,
    status: "inactive",
    demographics: {
      ageRange: "30-60",
      income: "$100,000+",
      location: ["Urban", "Suburban"],
      interests: ["Business Solutions", "Productivity", "Travel"]
    },
    behavioralAttributes: {
      deviceUsage: "Heavy",
      dataConsumption: "High",
      planType: ["Business", "Enterprise"]
    }
  }
];

const mockExperiments = [
  {
    id: "exp_1",
    name: "Button Color",
    campaignId: "camp_1",
    startDate: new Date("2023-10-05"),
    endDate: null,
    status: "running",
    variants: {
      a: {
        name: "Blue CTA",
        impressions: 62500,
        clicks: 4250,
        conversions: 375
      },
      b: {
        name: "Green CTA",
        impressions: 62500,
        clicks: 4675,
        conversions: 412
      }
    },
    winner: null,
    confidence: 87
  },
  {
    id: "exp_2",
    name: "Headline Test",
    campaignId: "camp_1",
    startDate: new Date("2023-10-10"),
    endDate: new Date("2023-10-25"),
    status: "completed",
    variants: {
      a: {
        name: "Save Big Today",
        impressions: 45000,
        clicks: 2700,
        conversions: 215
      },
      b: {
        name: "Upgrade Your Experience",
        impressions: 45000,
        clicks: 3150,
        conversions: 278
      }
    },
    winner: "b",
    confidence: 95
  },
  {
    id: "exp_3",
    name: "Layout Test",
    campaignId: "camp_2",
    startDate: new Date("2023-09-20"),
    endDate: null,
    status: "running",
    variants: {
      a: {
        name: "Grid Layout",
        impressions: 49000,
        clicks: 3250,
        conversions: 210
      },
      b: {
        name: "List Layout",
        impressions: 49000,
        clicks: 3120,
        conversions: 195
      }
    },
    winner: null,
    confidence: 62
  },
  {
    id: "exp_4",
    name: "Offer Messaging",
    campaignId: "camp_5",
    startDate: new Date("2023-11-05"),
    endDate: null,
    status: "running",
    variants: {
      a: {
        name: "Price-focused",
        impressions: 16000,
        clicks: 895,
        conversions: 72
      },
      b: {
        name: "Value-focused",
        impressions: 16000,
        clicks: 920,
        conversions: 68
      }
    },
    winner: null,
    confidence: 43
  }
];

const mockBrands = [
  {
    id: "brand_1",
    name: "TeleStar",
    marketShare: 28.5,
    stockPrice: 142.75,
    revenueInBillions: 32.6,
    customerSatisfaction: 4.2,
    yearlyGrowth: 3.8,
    newOffers: [
      {
        id: "offer_ts_1",
        name: "Premium Unlimited",
        price: 79.99,
        features: ["Unlimited 5G data", "50GB hotspot", "International calling"]
      },
      {
        id: "offer_ts_2",
        name: "Family Basic",
        price: 49.99,
        features: ["20GB shared data", "Unlimited talk & text", "Parental controls"]
      }
    ]
  },
  {
    id: "brand_2",
    name: "ConnectX",
    marketShare: 32.1,
    stockPrice: 168.50,
    revenueInBillions: 38.2,
    customerSatisfaction: 3.9,
    yearlyGrowth: 4.2,
    newOffers: [
      {
        id: "offer_cx_1",
        name: "Ultra Plan",
        price: 89.99,
        features: ["Unlimited 5G+ data", "100GB hotspot", "Free streaming subscriptions"]
      },
      {
        id: "offer_cx_2",
        name: "Basic Connect",
        price: 39.99,
        features: ["15GB data", "Unlimited talk & text", "5GB hotspot"]
      }
    ]
  },
  {
    id: "brand_3",
    name: "MobiNet",
    marketShare: 18.7,
    stockPrice: 95.25,
    revenueInBillions: 21.8,
    customerSatisfaction: 4.5,
    yearlyGrowth: 5.6,
    newOffers: [
      {
        id: "offer_mn_1",
        name: "Freedom Plus",
        price: 69.99,
        features: ["Unlimited data", "30GB hotspot", "Free international roaming"]
      }
    ]
  },
  {
    id: "brand_4",
    name: "TeleWave",
    marketShare: 14.2,
    stockPrice: 72.30,
    revenueInBillions: 16.5,
    customerSatisfaction: 4.0,
    yearlyGrowth: 2.1,
    newOffers: [
      {
        id: "offer_tw_1",
        name: "Simple Plan",
        price: 45.99,
        features: ["25GB data", "Unlimited talk & text", "No contract"]
      },
      {
        id: "offer_tw_2",
        name: "Budget Basic",
        price: 29.99,
        features: ["10GB data", "Unlimited talk & text"]
      }
    ]
  },
  {
    id: "brand_5",
    name: "LinkCom",
    marketShare: 6.5,
    stockPrice: 38.75,
    revenueInBillions: 7.8,
    customerSatisfaction: 3.7,
    yearlyGrowth: 1.8,
    newOffers: [
      {
        id: "offer_lc_1",
        name: "Value Connect",
        price: 35.99,
        features: ["15GB data", "Unlimited talk & text", "Family discounts"]
      }
    ]
  }
];

module.exports = {
  mockCampaigns,
  mockProfiles,
  mockExperiments,
  mockBrands
};
