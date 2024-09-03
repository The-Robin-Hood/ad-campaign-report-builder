"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import Campaign from "@/models/Campaign";
import DynamicChart from "@/components/common/chart";

type StatsType = "impressions" | "clicks" | "conversions" | "cost";

export function DeviceBreakDownChart({ campaign }: { campaign: Campaign }) {
  const [timeRange, setTimeRange] = React.useState("30d");
  const [statsType, setStatsType] = React.useState<StatsType>("impressions");
  const chartData = campaign.dailyMetrics.map((item) => {
    const date = item.date;
    const desktop = item.deviceStats.desktop;
    const mobile = item.deviceStats.mobile;
    return {
      date,
      desktop: desktop[statsType],
      mobile: mobile[statsType],
    };
  });

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    if (timeRange === "full") {
      return true;
    }
    let daysToSubtract = 30;
    if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card className="h-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Device Breakdown</CardTitle>
          <CardDescription>
            {statsType[0].toUpperCase() + statsType.slice(1)} by device type
          </CardDescription>
        </div>
        <Select
          value={statsType}
          onValueChange={(e) => setStatsType(e as StatsType)}
        >
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Impressions" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="impressions" className="rounded-lg">
              Impressions
            </SelectItem>
            <SelectItem value="clicks" className="rounded-lg">
              Clicks
            </SelectItem>
            <SelectItem value="conversions" className="rounded-lg">
              Conversions
            </SelectItem>
            <SelectItem value="cost" className="rounded-lg">
              Cost
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="full" className="rounded-lg">
              All time
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No data available
          </div>
        ) : (
          <DynamicChart
            datasets={[
              {
                data: filteredData.map((item) => {
                  return {
                    date: item.date,
                    value: item.desktop,
                  };
                }),
                label: "Desktop " + statsType,
                backgroundColor: "#E76E50",
                borderColor: "#E76E50",
                fill: false,
                tension: 0,
              },
              {
                data: filteredData.map((item) => {
                  return {
                    date: item.date,
                    value: item.mobile,
                  };
                }),
                label: "Mobile " + statsType,
                backgroundColor: "#4A90E2",
                borderColor: "#4A90E2",
                fill: false,
                tension: 0,
              },
            ]}
            chartType="line"
          />
        )}
      </CardContent>
    </Card>
  );
}
