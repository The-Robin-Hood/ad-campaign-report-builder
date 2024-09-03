import Campaign from "@/models/Campaign";

function jsonToCSV(campaigns: Campaign[]) {
  const rows = [];

  const headers = [
    // "id",
    "name",
    "startDate",
    "endDate",
    "impressions",
    "clicks",
    "conversions",
    "cost",
    "desktopImpressions",
    "desktopClicks",
    "desktopConversions",
    "desktopCost",
    "mobileImpressions",
    "mobileClicks",
    "mobileConversions",
    "mobileCost",
  ];
  rows.push(headers.join(","));

  campaigns.forEach((item) => {
    const { name, startDate, endDate, overallMetrics } = item;
    const { impressions, clicks, conversions, cost, deviceStats } =
      overallMetrics;
    const desktopStats = deviceStats.desktop || {};
    const mobileStats = deviceStats.mobile || {};

    const row = [
      //   id,
      name,
      startDate,
      endDate,
      impressions,
      clicks,
      conversions,
      cost,
      desktopStats.impressions || 0,
      desktopStats.clicks || 0,
      desktopStats.conversions || 0,
      desktopStats.cost || 0,
      mobileStats.impressions || 0,
      mobileStats.clicks || 0,
      mobileStats.conversions || 0,
      mobileStats.cost || 0,
    ];
    rows.push(row.join(","));
  });

  return rows.join("\n");
}

function getDailyMetricsInRange(
  campaigns: Campaign[],
  startDate: Date,
  endDate: Date
) {
  const start = new Date(startDate);
  //   end date is set to the end of the day
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  const dailyMetricsInRange: any = [];

  campaigns.forEach((item) => {
    item.dailyMetrics.forEach((dailyMetric) => {
      const metricDate = new Date(dailyMetric.date);
      if (metricDate >= start && metricDate <= end) {
        dailyMetricsInRange.push({
          //   id: item.id,
          name: item.name,
          date: dailyMetric.date,
          impressions: dailyMetric.impressions,
          clicks: dailyMetric.clicks,
          conversions: dailyMetric.conversions,
          cost: dailyMetric.cost,
          desktopImpressions: dailyMetric.deviceStats.desktop.impressions || 0,
          desktopClicks: dailyMetric.deviceStats.desktop.clicks || 0,
          desktopConversions: dailyMetric.deviceStats.desktop.conversions || 0,
          desktopCost: dailyMetric.deviceStats.desktop.cost || 0,
          mobileImpressions: dailyMetric.deviceStats.mobile.impressions || 0,
          mobileClicks: dailyMetric.deviceStats.mobile.clicks || 0,
          mobileConversions: dailyMetric.deviceStats.mobile.conversions || 0,
          mobileCost: dailyMetric.deviceStats.mobile.cost || 0,
        });
      }
    });
  });

  if (dailyMetricsInRange.length === 0) return "";

  const headers = Object.keys(dailyMetricsInRange[0]);
  const rows = [headers.join(",")];

  dailyMetricsInRange.forEach((item: any) => {
    const row = headers.map((header) => item[header]);
    rows.push(row.join(","));
  });

  return rows.join("\n");
}

export function exportOverallCSV(campaigns: Campaign[]) {
  const csvContent = "data:text/csv;charset=utf-8," + jsonToCSV(campaigns);

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "campaigns.csv");
  document.body.appendChild(link);
  link.click();
}

export function exportCustomRangeCSV(
  campaigns: Campaign[],
  startDate: Date,
  endDate: Date
) {
  const dailyMetricsInRange = getDailyMetricsInRange(
    campaigns,
    startDate,
    endDate
  );
  if (dailyMetricsInRange === "")
    return { success: false, message: "No data found for the selected range" };
  const csvContent = "data:text/csv;charset=utf-8," + dailyMetricsInRange;

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "campaigns.csv");
  document.body.appendChild(link);
  link.click();
  return {
    success: true,
    message: "CSV exported successfully",
  };
}
