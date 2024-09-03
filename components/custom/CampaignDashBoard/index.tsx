"use client";

import Campaign from "@/models/Campaign";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import DnDWrapper from "./ReactDnDWrapper";
import { CustomizationContext } from "@/hooks/customization-provider";
import { cn } from "@/utils/cn";
import { UploadCampaign } from "../UploadCampaign";
import { ExportCampaign } from "../ExportCampaign";

export default function CampaignDashBoard({
  campaigns,
}: {
  campaigns: Campaign[];
}) {
  const { customization } = useContext(CustomizationContext);
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const { overallMetrics } = selectedCampaign;
  const handleCampaignChange = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign) {
      setSelectedCampaign(campaign);
    }
  };

  const [metricCards, setCards] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    setCards([
      <MetricCard
        key="impressions"
        title="Total Impressions"
        icon={Eye}
        value={overallMetrics.impressions}
        formatter={formatNumber}
      />,
      <MetricCard
        key="clicks"
        title="Total Clicks"
        icon={MousePointerClick}
        value={overallMetrics.clicks}
        formatter={formatNumber}
      />,
      <MetricCard
        key="cost"
        title="Total Spend"
        icon={DollarSign}
        value={overallMetrics.cost}
        formatter={formatCurrency}
      />,
      <MetricCard
        key="conversions"
        title="Conversions"
        icon={ArrowUpRight}
        value={overallMetrics.conversions}
        formatter={formatNumber}
      />,
      <DailyTrendChart key="dailyTrend" campaign={selectedCampaign} />,
      <DeviceBreakDownChart
        key="deviceBreakDown"
        campaign={selectedCampaign}
      />,
      <GeneralPerformanceCard
        key="generalPerformance"
        overallMetrics={overallMetrics}
      />,
      <DevicePerformanceCard
        key="devicePerformance"
        overallMetrics={overallMetrics}
      />,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCampaign]);

  const moveCard = useCallback((fromIndex: number, toIndex: number) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      [updatedCards[fromIndex], updatedCards[toIndex]] = [
        updatedCards[toIndex],
        updatedCards[fromIndex],
      ];
      return updatedCards;
    });
  }, []);

  return (
    <div className="flex-col md:flex relative">
      <div
        className={cn({
          "absolute w-full h-full bg-black/75 z-10 transition-all duration-500 ease-in-out":
            customization,
          none: !customization,
        })}
      ></div>
      <div className="flex-1 space-y-4 p-8 pt-6 relative">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight">
              Campaign Dashboard 🚀
            </h2>
            <div className="flex items-center justify-start gap-3">
              <Label className="whitespace-nowrap">Selected Campaign : </Label>
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
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2 gap-3">
            <UploadCampaign />
            <ExportCampaign
              campaigns={campaigns}
              selectedCampaign={selectedCampaign}
            />
          </div>
        </div>
        <div
          className={cn(
            "space-y-4 transition-all ease-in-out duration-300 transform",
            customization && "scale-95 -translate-y-4 z-20 sticky"
          )}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metricCards.map(
              (card, index) =>
                index < 4 && (
                  <DnDWrapper
                    id={"topElements"}
                    key={index}
                    index={index}
                    element={card}
                    swapCard={moveCard}
                    customization={customization}
                  />
                )
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {metricCards.map(
              (card, index) =>
                index > 3 && (
                  <DnDWrapper
                    id={"bottomElements"}
                    key={index}
                    index={index}
                    element={card}
                    swapCard={moveCard}
                    customization={customization}
                    className="col-span-3"
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
