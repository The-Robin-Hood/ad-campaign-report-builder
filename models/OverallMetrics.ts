import DeviceStats from "./DeviceStats";

export default class OverallMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  deviceStats: {
    desktop: DeviceStats;
    mobile: DeviceStats;
  };

  constructor(
    impressions: number,
    clicks: number,
    conversions: number,
    cost: number,
    desktopStats: DeviceStats,
    mobileStats: DeviceStats
  ) {
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
