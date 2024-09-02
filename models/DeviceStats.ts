export default class DeviceStats {
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;

  constructor(
    impressions: number,
    clicks: number,
    conversions: number,
    cost: number
  ) {
    this.impressions = impressions;
    this.clicks = clicks;
    this.conversions = conversions;
    this.cost = cost;
  }
}
