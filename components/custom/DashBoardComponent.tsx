"use client";

import Campaign from "@/models/Campaign";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NoCampaignDashBoard from "./NoCampaignDashBoard";
import { Loader } from "lucide-react";
import CampaignDashBoard from "./CampaignDashBoard";

export default function DashboardComponent() {
  const [loading, setLoading] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/campaigns");
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data);
      } else {
        throw new Error("Error fetching campaigns");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching campaigns");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center flex-1">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }
  return campaigns.length < 1 ? (
    <NoCampaignDashBoard />
  ) : (
    <CampaignDashBoard campaigns={campaigns} />
  );
}
