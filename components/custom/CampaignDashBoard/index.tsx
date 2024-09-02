"use client";

import Campaign from "@/models/Campaign";
import { useCallback, useContext, useState } from "react";
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

  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Total Impressions",
      icon: Eye,
      value: overallMetrics.impressions,
      formatter: formatNumber,
    },
    {
      id: 2,
      title: "Total Clicks",
      icon: MousePointerClick,
      value: overallMetrics.clicks,
      formatter: formatNumber,
    },
    {
      id: 3,
      title: "Total Spend",
      icon: DollarSign,
      value: overallMetrics.cost,
      formatter: formatCurrency,
    },
    {
      id: 4,
      title: "Conversions",
      icon: ArrowUpRight,
      value: overallMetrics.conversions,
      formatter: formatNumber,
    },
  ]);

  const moveCard = useCallback((fromIndex: number, toIndex: number) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      [updatedCards[fromIndex], updatedCards[toIndex]] = [
        updatedCards[toIndex],
        updatedCards[fromIndex],
      ]; // Swap the cards
      return updatedCards;
    });
  }, []);

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6 relative">
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
        <div
          className={cn(
            "space-y-4 transition-all ease-in-out duration-300 transform",
            customization && "bg-black/75 scale-95 -translate-y-4"
          )}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
              <MetricCard
                key={card.id}
                id={card.id}
                index={index}
                title={card.title}
                icon={card.icon}
                value={card.value}
                formatter={card.formatter}
                moveCard={moveCard}
                customization={customization}
              />
            ))}
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
