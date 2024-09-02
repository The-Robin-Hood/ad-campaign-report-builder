import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import OverallMetrics from "@/models/OverallMetrics";
import { formatCurrency } from "@/utils/formating";
import { MousePointerClick, DollarSign, ArrowUpRight } from "lucide-react";

export default function GeneralPerformanceCard({
  overallMetrics,
}: {
  overallMetrics: OverallMetrics;
}) {
  const calculateCTR = (clicks: number, impressions: number) => {
    return ((clicks / impressions) * 100).toFixed(2) + "%";
  };

  const calculateCPC = (cost: number, clicks: number) => {
    return formatCurrency(cost / clicks);
  };

  const calculateConversionRate = (conversions: number, clicks: number) => {
    return ((conversions / clicks) * 100).toFixed(2) + "%";
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex items-center gap-2 w-[150px]">
              <MousePointerClick className="h-4 w-4" />
              <span className="text-sm font-medium">CTR:</span>
            </div>
            <div className="ml-auto font-medium">
              {calculateCTR(overallMetrics.clicks, overallMetrics.impressions)}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-2 w-[150px]">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">CPC:</span>
            </div>
            <div className="ml-auto font-medium">
              {calculateCPC(overallMetrics.cost, overallMetrics.clicks)}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-2 w-[150px]">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-medium">Conversion Rate:</span>
            </div>
            <div className="ml-auto font-medium">
              {calculateConversionRate(
                overallMetrics.conversions,
                overallMetrics.clicks
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
