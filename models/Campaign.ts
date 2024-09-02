import DailyMetrics from "./DailyMetrics";
import OverallMetrics from "./OverallMetrics";

export default class Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  overallMetrics: OverallMetrics;
  dailyMetrics: DailyMetrics[];

  constructor(
    id: string,
    name: string,
    startDate: string,
    endDate: string,
    overallMetrics: OverallMetrics,
    dailyMetrics: DailyMetrics[]
  ) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.overallMetrics = overallMetrics;
    this.dailyMetrics = dailyMetrics;
  }
}
