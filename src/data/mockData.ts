
// Brand Analytics Mock Data
export const mockBrands = [
  {
    id: 1,
    brand: "Verizon",
    targetUrl: "verizon.com/5g",
    adCount: 523,
    impressions: "14.2M",
    spend: "$24.5M",
    performance: 9.2,
    hashKeys: ["#5G", "#Unlimited", "#iPhonePromo"]
  },
  {
    id: 2,
    brand: "AT&T",
    targetUrl: "att.com/deals",
    adCount: 487,
    impressions: "12.8M",
    spend: "$21.3M",
    performance: 8.7,
    hashKeys: ["#Fiber", "#5G", "#Streaming"]
  },
  {
    id: 3,
    brand: "T-Mobile",
    targetUrl: "t-mobile.com/switch",
    adCount: 512,
    impressions: "13.5M",
    spend: "$22.8M",
    performance: 9.0,
    hashKeys: ["#Uncarrier", "#5G", "#FamilyPlans"]
  },
  {
    id: 4,
    brand: "Xfinity",
    targetUrl: "xfinity.com/mobile",
    adCount: 342,
    impressions: "8.7M",
    spend: "$16.2M",
    performance: 7.8,
    hashKeys: ["#BundleSavings", "#Mobile", "#Internet"]
  },
  {
    id: 5,
    brand: "Spectrum",
    targetUrl: "spectrum.com/offers",
    adCount: 298,
    impressions: "7.5M",
    spend: "$14.1M",
    performance: 7.5,
    hashKeys: ["#Internet", "#TV", "#NoCaps"]
  }
];

export const mockOffers = [
  {
    id: 1,
    brand: "Verizon",
    offer: "5G Home Internet - 50% Off",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    discount: "50% off first 3 months"
  },
  {
    id: 2,
    brand: "AT&T",
    offer: "Fiber 5GBps - Free Installation",
    startDate: "2023-09-15",
    endDate: "2023-11-30",
    discount: "Free installation + $100 credit"
  },
  {
    id: 3,
    brand: "T-Mobile",
    offer: "4 Lines for $100",
    startDate: "2023-10-15",
    endDate: "2024-01-15",
    discount: "$60 savings vs regular price"
  },
  {
    id: 4,
    brand: "Xfinity",
    offer: "Internet + Mobile Bundle",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    discount: "Save $30/month with bundle"
  },
  {
    id: 5,
    brand: "Spectrum",
    offer: "Internet + TV + Mobile",
    startDate: "2023-10-01",
    endDate: "2023-12-15",
    discount: "$200 gift card with signup"
  }
];

export const mockSpendingTrends = [
  {
    month: "Jan",
    Verizon: 18.5,
    ATT: 16.8,
    TMobile: 15.2,
    Xfinity: 9.5,
    Spectrum: 8.7
  },
  {
    month: "Feb",
    Verizon: 19.2,
    ATT: 17.1,
    TMobile: 16.0,
    Xfinity: 10.1,
    Spectrum: 9.0
  },
  {
    month: "Mar",
    Verizon: 20.5,
    ATT: 17.8,
    TMobile: 17.2,
    Xfinity: 10.8,
    Spectrum: 9.3
  },
  {
    month: "Apr",
    Verizon: 21.3,
    ATT: 18.5,
    TMobile: 18.7,
    Xfinity: 11.2,
    Spectrum: 9.7
  },
  {
    month: "May",
    Verizon: 22.1,
    ATT: 19.2,
    TMobile: 19.8,
    Xfinity: 12.0,
    Spectrum: 10.2
  },
  {
    month: "Jun",
    Verizon: 23.0,
    ATT: 19.9,
    TMobile: 20.5,
    Xfinity: 12.8,
    Spectrum: 10.9
  },
  {
    month: "Jul",
    Verizon: 24.5,
    ATT: 21.3,
    TMobile: 22.8,
    Xfinity: 14.1,
    Spectrum: 11.5
  }
];

// Campaign Management Mock Data
export const mockCampaigns = [
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
      impressions: 3450000,
      clicks: 178500,
      conversions: 12340,
      spend: 187500
    }
  },
  {
    id: "camp_2",
    name: "Family Plan",
    startDate: new Date("2023-09-15"),
    endDate: new Date("2023-11-15"),
    status: "ended",
    budget: 180000,
    targetProfiles: ["prof_2"],
    description: "Special offer for family plans with multiple lines",
    metrics: {
      impressions: 2850000,
      clicks: 142500,
      conversions: 9870,
      spend: 180000
    }
  },
  {
    id: "camp_3",
    name: "Student Offer",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-08-31"),
    status: "ended",
    budget: 120000,
    targetProfiles: ["prof_5"],
    description: "Back to school special offers for students",
    metrics: {
      impressions: 1950000,
      clicks: 97500,
      conversions: 6750,
      spend: 120000
    }
  },
  {
    id: "camp_4",
    name: "Holiday Bundle",
    startDate: new Date("2023-12-01"),
    endDate: new Date("2023-12-25"),
    status: "planning",
    budget: 300000,
    targetProfiles: ["prof_1", "prof_2", "prof_3"],
    description: "Holiday bundle with special device offers and service discounts",
    metrics: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0
    }
  },
  {
    id: "camp_5",
    name: "New Year Deal",
    startDate: new Date("2023-12-26"),
    endDate: new Date("2024-01-31"),
    status: "planning",
    budget: 275000,
    targetProfiles: ["prof_1", "prof_3", "prof_4"],
    description: "New year promotion with discounted service plans",
    metrics: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0
    }
  }
] as const;

// A/B Test Experiments Mock Data
export const mockExperiments = [
  {
    id: "exp_1",
    name: "Button Color",
    campaignId: "camp_1",
    startDate: new Date("2023-10-15"),
    endDate: undefined,
    status: "running",
    variants: {
      a: {
        name: "Blue Button",
        description: "Standard blue call to action button",
        conversionRate: 5.2
      },
      b: {
        name: "Green Button",
        description: "Alternative green call to action button",
        conversionRate: 6.7
      }
    },
    winner: null,
    confidence: 87
  },
  {
    id: "exp_2",
    name: "Ad Copy Test",
    campaignId: "camp_2",
    startDate: new Date("2023-09-20"),
    endDate: new Date("2023-10-20"),
    status: "complete",
    variants: {
      a: {
        name: "Feature Focus",
        description: "Ad emphasizing technical features",
        conversionRate: 3.8
      },
      b: {
        name: "Benefit Focus",
        description: "Ad emphasizing customer benefits",
        conversionRate: 4.9
      }
    },
    winner: "b",
    confidence: 95
  },
  {
    id: "exp_3",
    name: "Target Audience",
    campaignId: "camp_4",
    startDate: new Date("2023-12-05"),
    endDate: undefined,
    status: "planned",
    variants: {
      a: {
        name: "Broad Targeting",
        description: "Wide audience with general interests",
        conversionRate: 0
      },
      b: {
        name: "Narrow Targeting",
        description: "Specific audience with telecom interests",
        conversionRate: 0
      }
    },
    winner: null,
    confidence: 0
  },
  {
    id: "exp_4",
    name: "Landing Page",
    campaignId: "camp_5",
    startDate: new Date("2023-12-28"),
    endDate: undefined,
    status: "planned",
    variants: {
      a: {
        name: "Feature List",
        description: "Landing page with detailed feature list",
        conversionRate: 0
      },
      b: {
        name: "Video Demo",
        description: "Landing page with video demonstration",
        conversionRate: 0
      }
    },
    winner: null,
    confidence: 0
  }
] as const;

// Customer Profiles Mock Data
export const mockProfiles = [
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
      deviceUsage: "Heavy Mobile",
      dataConsumption: "10GB+ monthly",
      planType: ["Individual", "BYOD"]
    }
  },
  {
    id: "prof_2",
    name: "Family Owners",
    segmentSize: "5.7M",
    campaigns: 3,
    status: "active",
    demographics: {
      ageRange: "30-55",
      income: "$70,000-$120,000",
      location: ["Suburban", "Rural"],
      interests: ["Streaming", "Security", "Smart Home"]
    },
    behavioralAttributes: {
      deviceUsage: "Mixed Mobile/Home",
      dataConsumption: "40GB+ monthly (shared)",
      planType: ["Family Plan", "Bundle"]
    }
  },
  {
    id: "prof_3",
    name: "Seniors",
    segmentSize: "2.1M",
    campaigns: 2,
    status: "active",
    demographics: {
      ageRange: "65+",
      income: "$40,000-$80,000",
      location: ["Suburban", "Rural"],
      interests: ["News", "Video Calling", "Health"]
    },
    behavioralAttributes: {
      deviceUsage: "Light Mobile, Moderate Home",
      dataConsumption: "5GB monthly",
      planType: ["Senior Plan", "Basic"]
    }
  },
  {
    id: "prof_4",
    name: "Business Users",
    segmentSize: "1.8M",
    campaigns: 3,
    status: "active",
    demographics: {
      ageRange: "25-60",
      income: "$80,000-$150,000",
      location: ["Urban", "Suburban"],
      interests: ["Productivity", "Cloud Storage", "Video Conferencing"]
    },
    behavioralAttributes: {
      deviceUsage: "Heavy Mobile & Home",
      dataConsumption: "30GB+ monthly",
      planType: ["Business", "Unlimited"]
    }
  },
  {
    id: "prof_5",
    name: "Students",
    segmentSize: "2.5M",
    campaigns: 2,
    status: "active",
    demographics: {
      ageRange: "18-25",
      income: "Under $30,000",
      location: ["Urban", "Campus"],
      interests: ["Streaming", "Social Media", "Education"]
    },
    behavioralAttributes: {
      deviceUsage: "Very Heavy Mobile",
      dataConsumption: "15GB+ monthly",
      planType: ["Student Plan", "Discount"]
    }
  }
] as const;
