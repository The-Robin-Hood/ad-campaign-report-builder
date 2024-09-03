import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import OverallMetrics from "@/models/OverallMetrics";
import { formatNumber } from "@/utils/formating";
import { Monitor, Smartphone } from "lucide-react";

export default function DevicePerformanceCard({
  overallMetrics,
}: {
  overallMetrics: OverallMetrics;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Device Performance</CardTitle>
        <CardDescription>Clicks and conversions by device</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Monitor className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Desktop</span>
            <div className="ml-auto space-x-2">
              <span className="text-sm text-muted-foreground">Clicks:</span>
              <span className="text-sm font-medium">
                {formatNumber(overallMetrics.deviceStats.desktop.clicks)}
              </span>
              <span className="text-sm text-muted-foreground">Conv:</span>
              <span className="text-sm font-medium">
                {formatNumber(overallMetrics.deviceStats.desktop.conversions)}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Smartphone className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Mobile</span>
            <div className="ml-auto space-x-2">
              <span className="text-sm text-muted-foreground">Clicks:</span>
              <span className="text-sm font-medium">
                {formatNumber(overallMetrics.deviceStats.mobile.clicks)}
              </span>
              <span className="text-sm text-muted-foreground">Conv:</span>
              <span className="text-sm font-medium">
                {formatNumber(overallMetrics.deviceStats.mobile.conversions)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
