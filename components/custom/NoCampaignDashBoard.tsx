"use client";
import Image from "next/image";
import { Button } from "../common/button";
import * as React from "react";
import { UploadCampaign } from "./UploadCampaign";
import { downloadMockCampaignJson } from "@/utils/generateMockData";

export default function NoCampaignDashBoard() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-4xl font-bold mb-4">No Campaigns</h1>
      <Image
        src="/no-campaign.svg"
        width={400}
        height={400}
        alt={"no-campaign"}
      />
      <p className="text-lg text-center mt-4 max-w-md">
        No campaigns found. Upload a campaign to get started or Generate a mock
        campaign and upload it.
      </p>
      <div className="flex gap-4 mt-8">
        <UploadCampaign />
        <Button
          variant="outline"
          size="default"
          onClick={downloadMockCampaignJson}
        >
          Generate Mock Campaign
        </Button>
      </div>
    </div>
  );
}
