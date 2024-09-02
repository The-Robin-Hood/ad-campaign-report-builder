import Campaign from "@/models/Campaign";
import DailyMetrics from "@/models/DailyMetrics";
import DeviceStats from "@/models/DeviceStats";
import OverallMetrics from "@/models/OverallMetrics";
import { v4 as uuid } from "uuid";

const campaignNames = [
  "Spring Launch Campaign",
  "Summer Promo Campaign",
  "Fall Special Campaign",
  "Winter Wonderland Sale",
  "Holiday Season Blitz",
  "Back to School Push",
  "Black Friday Bonanza",
  "Cyber Monday Extravaganza",
  "New Year Kickoff Campaign",
  "Valentine's Day Promotion",
  "Easter Savings Spectacular",
  "Mother's Day Delight",
  "Father's Day Flash Sale",
  "Fourth of July Fireworks",
  "Labor Day Sale",
  "Halloween Horror Deals",
  "Thanksgiving Thank You Campaign",
  "Christmas Countdown Deals",
  "New Product Line Launch",
  "End of Year Clearance",
];

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDateStrings = (startDate: string, days: number): string[] => {
  const start = new Date(startDate);
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date.toISOString().split("T")[0];
  });
};

const createDailyMetrics = (dates: string[]): DailyMetrics[] => {
  return dates.map((date) => {
    const desktopStats = new DeviceStats(
      getRandomNumber(200, 800),
      getRandomNumber(20, 80),
      getRandomNumber(5, 20),
      getRandomNumber(50, 200)
    );

    const mobileStats = new DeviceStats(
      getRandomNumber(150, 700),
      getRandomNumber(15, 70),
      getRandomNumber(3, 15),
      getRandomNumber(30, 150)
    );

    return new DailyMetrics(
      date,
      desktopStats.impressions + mobileStats.impressions,
      desktopStats.clicks + mobileStats.clicks,
      desktopStats.conversions + mobileStats.conversions,
      desktopStats.cost + mobileStats.cost,
      desktopStats,
      mobileStats
    );
  });
};

const createOverallMetrics = (dailyMetrics: DailyMetrics[]): OverallMetrics => {
  const totalImpressions = dailyMetrics.reduce(
    (sum, metric) => sum + metric.impressions,
    0
  );
  const totalClicks = dailyMetrics.reduce(
    (sum, metric) => sum + metric.clicks,
    0
  );
  const totalConversions = dailyMetrics.reduce(
    (sum, metric) => sum + metric.conversions,
    0
  );
  const totalCost = dailyMetrics.reduce((sum, metric) => sum + metric.cost, 0);

  const desktopStats = dailyMetrics.reduce((acc, metric) => {
    acc.impressions += metric.deviceStats.desktop.impressions;
    acc.clicks += metric.deviceStats.desktop.clicks;
    acc.conversions += metric.deviceStats.desktop.conversions;
    acc.cost += metric.deviceStats.desktop.cost;
    return acc;
  }, new DeviceStats(0, 0, 0, 0));

  const mobileStats = dailyMetrics.reduce((acc, metric) => {
    acc.impressions += metric.deviceStats.mobile.impressions;
    acc.clicks += metric.deviceStats.mobile.clicks;
    acc.conversions += metric.deviceStats.mobile.conversions;
    acc.cost += metric.deviceStats.mobile.cost;
    return acc;
  }, new DeviceStats(0, 0, 0, 0));

  return new OverallMetrics(
    totalImpressions,
    totalClicks,
    totalConversions,
    totalCost,
    desktopStats,
    mobileStats
  );
};

const generateMockCampaigns = (): Campaign[] => {
  const threeRandomCampaigns = campaignNames
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  const now = new Date();
  const startDate = new Date(now.setDate(now.getDate() - 60)).toISOString().split("T")[0];
  const endDate = new Date().toISOString().split("T")[0];
  const campaigns = [
    {
      id: uuid().toString(),
      name: threeRandomCampaigns[0],
      startDate: startDate,
      endDate: endDate,
    },
    {
      id: uuid().toString(),
      name: threeRandomCampaigns[1],
      startDate: startDate,
      endDate: endDate,
    },
    {
      id: uuid().toString(),
      name: threeRandomCampaigns[2],
      startDate: startDate,
      endDate: endDate,
    },
  ];

  return campaigns.map((campaign) => {
    const dates = generateDateStrings(campaign.startDate, 60);
    const dailyMetrics = createDailyMetrics(dates);
    const overallMetrics = createOverallMetrics(dailyMetrics);

    return new Campaign(
      campaign.id,
      campaign.name,
      campaign.startDate,
      campaign.endDate,
      overallMetrics,
      dailyMetrics
    );
  });
};

const downloadMockCampaignJson = () => {
  const campaigns = generateMockCampaigns();
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(campaigns)], {
    type: "application/json",
  });
  element.href = URL.createObjectURL(file);
  element.download = "mockCampaigns.json";
  document.body.appendChild(element);
  element.click();
};

export { generateMockCampaigns, downloadMockCampaignJson };
