"use client";

import Campaign from "@/models/Campaign";
import { useState } from "react";
import { Button } from "@/components/common/button";
import { ArrowUpRight, DollarSign, MousePointerClick, Eye } from "lucide-react";
import { DeviceBreakDownChart } from "./DeviceBreakDownCharts";
import DailyTrendChart from "./DailyTrendCharts";
import MetricCard from "./MetricCard";
import { formatCurrency, formatNumber } from "@/utils/formating";
import GeneralPerformanceCard from "./GeneralPerformanceCard";
import DevicePerformanceCard from "./DevicePerformanceCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import { Label } from "@/components/common/label";

export default function CampaignDashBoard({
  campaigns,
}: {
  campaigns: Campaign[];
}) {
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const { overallMetrics } = selectedCampaign;
  const handleCampaignChange = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign) {
      setSelectedCampaign(campaign);
    }
  };

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight">
              Campaign Dashboard 🚀
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center gap-3">
              <Label>Selected Campaign : </Label>
              <Select
                value={selectedCampaign.id}
                onValueChange={handleCampaignChange}
              >
                <SelectTrigger
                  className="min-w-fit w-[200px] rounded-lg sm:ml-auto"
                  aria-label="Select a value"
                >
                  <SelectValue placeholder="Select Campaign" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button>Export CSV</Button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Impressions"
              icon={Eye}
              value={overallMetrics.impressions}
              formatter={formatNumber}
            />
            <MetricCard
              title="Total Clicks"
              icon={MousePointerClick}
              value={overallMetrics.clicks}
              formatter={formatNumber}
            />
            <MetricCard
              title="Total Spend"
              icon={DollarSign}
              value={overallMetrics.cost}
              formatter={formatCurrency}
            />
            <MetricCard
              title="Conversions"
              icon={ArrowUpRight}
              value={overallMetrics.conversions}
              formatter={formatNumber}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <DailyTrendChart campaign={selectedCampaign} />
            <DeviceBreakDownChart campaign={selectedCampaign} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <GeneralPerformanceCard overallMetrics={overallMetrics} />
            <DevicePerformanceCard overallMetrics={overallMetrics} />
          </div>
        </div>
      </div>
    </div>
  );
}
