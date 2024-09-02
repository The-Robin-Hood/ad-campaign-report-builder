"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/common/chart";
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
import { TabsContent } from "@radix-ui/react-tabs";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type StatsType = "impressions" | "clicks" | "conversions" | "cost";

export default function DailyTrendChart({ campaign }: { campaign: Campaign }) {
  const [timeRange, setTimeRange] = useState("30d");
  const [statsType, setStatsType] = useState<StatsType>("impressions");
  const [chartType, setChartType] = useState("line");
  const chartData = campaign.dailyMetrics.map((item) => {
    const date = item.date;
    const statType = item[statsType];
    return {
      date,
      [statsType]: statType,
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
    <Card className="col-span-3">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>DailyTrends</CardTitle>
          <CardDescription>
            {statsType[0].toUpperCase() + statsType.slice(1)} Trend
          </CardDescription>
        </div>
        <Tabs
          className="mr-2"
          defaultValue="line"
          onValueChange={setChartType}
          value={chartType}
        >
          <div className="flex items-center justify-center h-full">
            <TabsList className="w-fit">
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
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
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {filteredData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No data available
            </div>
          ) : chartType === "line" ? (
            <LineChart
              accessibilityLayer
              data={filteredData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={true}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
              <Line
                dataKey={statsType}
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          ) : (
            <BarChart accessibilityLayer data={filteredData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey={statsType} fill="var(--color-desktop)" radius={8} />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
