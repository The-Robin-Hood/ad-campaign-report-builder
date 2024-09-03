"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import Campaign from "@/models/Campaign";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/common/tabs";
import DynamicChart from "@/components/common/chart";

type StatsType = "impressions" | "clicks" | "conversions" | "cost";

export default function DailyTrendChart({ campaign }: { campaign: Campaign }) {
  const [timeRange, setTimeRange] = useState("30d");
  const [statsType, setStatsType] = useState<StatsType>("impressions");
  const [chartType, setChartType] = useState("bar");
  const chartData = campaign.dailyMetrics.map((item) => {
    const date = item.date;
    const value = item[statsType];
    return {
      date,
      value,
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
  console.log(filteredData);
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>DailyTrends</CardTitle>
          <CardDescription>
            {statsType[0].toUpperCase() + statsType.slice(1)} Trend
          </CardDescription>
        </div>
        <Tabs
          className="mr-2"
          defaultValue="bar"
          onValueChange={setChartType}
          value={chartType}
        >
          <div className="flex items-center justify-center h-full">
            <TabsList className="w-fit">
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
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
      <CardContent className="h-[300px]">
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No data available
          </div>
        ) : chartType === "line" ? (
          <DynamicChart
            datasets={[{ data: filteredData, label: statsType }]}
            chartType="line"
          />
        ) : (
          <DynamicChart
            datasets={[{ data: filteredData, label: statsType }]}
            chartType="bar"
          />
        )}
      </CardContent>
    </Card>
  );
}
