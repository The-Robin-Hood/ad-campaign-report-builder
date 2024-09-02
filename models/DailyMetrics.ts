import DeviceStats from "./DeviceStats";

export default class DailyMetrics {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  deviceStats: {
    desktop: DeviceStats;
    mobile: DeviceStats;
  };

  constructor(
    date: string,
    impressions: number,
    clicks: number,
    conversions: number,
    cost: number,
    desktopStats: DeviceStats,
    mobileStats: DeviceStats
  ) {
    this.date = date;
    this.impressions = impressions;
    this.clicks = clicks;
    this.conversions = conversions;
    this.cost = cost;
    this.deviceStats = {
      desktop: desktopStats,
      mobile: mobileStats,
    };
  }
}
