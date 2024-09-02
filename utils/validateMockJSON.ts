import Campaign from "@/models/Campaign";
import DailyMetrics from "@/models/DailyMetrics";
import DeviceStats from "@/models/DeviceStats";
import OverallMetrics from "@/models/OverallMetrics";

const isValidDateString = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Format: YYYY-MM-DD
  return regex.test(dateString) && !isNaN(Date.parse(dateString));
};

const isValidDeviceStats = (stats: any): stats is DeviceStats => {
  return (
    typeof stats === "object" &&
    typeof stats.impressions === "number" &&
    typeof stats.clicks === "number" &&
    typeof stats.conversions === "number" &&
    typeof stats.cost === "number"
  );
};

const isValidDailyMetrics = (metrics: any): metrics is DailyMetrics => {
  return (
    typeof metrics === "object" &&
    isValidDateString(metrics.date) &&
    typeof metrics.impressions === "number" &&
    typeof metrics.clicks === "number" &&
    typeof metrics.conversions === "number" &&
    typeof metrics.cost === "number" &&
    typeof metrics.deviceStats === "object" &&
    isValidDeviceStats(metrics.deviceStats.desktop) &&
    isValidDeviceStats(metrics.deviceStats.mobile)
  );
};

const isValidOverallMetrics = (metrics: any): metrics is OverallMetrics => {
  return (
    typeof metrics === "object" &&
    typeof metrics.impressions === "number" &&
    typeof metrics.clicks === "number" &&
    typeof metrics.conversions === "number" &&
    typeof metrics.cost === "number" &&
    typeof metrics.deviceStats === "object" &&
    isValidDeviceStats(metrics.deviceStats.desktop) &&
    isValidDeviceStats(metrics.deviceStats.mobile)
  );
};

const isValidCampaign = (campaign: any): campaign is Campaign => {
console.log(campaign.startDate,campaign.endDate);
  return (
    typeof campaign === "object" &&
    typeof campaign.id === "string" &&
    typeof campaign.name === "string" &&
    isValidDateString(campaign.startDate) &&
    isValidDateString(campaign.endDate) &&
    isValidOverallMetrics(campaign.overallMetrics) &&
    Array.isArray(campaign.dailyMetrics) &&
    campaign.dailyMetrics.every(isValidDailyMetrics)
  );
};

export default function validateMockJSON(campaigns: JSON[]) {
  return Array.isArray(campaigns) && campaigns.every(isValidCampaign);
}
