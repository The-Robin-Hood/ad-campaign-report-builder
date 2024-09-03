"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/common/drawer";
import { Button } from "../common/button";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Campaign from "@/models/Campaign";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../common/select";
import { DatePickerWithRange } from "../common/date-range-picker";
import { Switch } from "../common/switch";
import { DateRange } from "react-day-picker";
import { exportOverallCSV, exportCustomRangeCSV } from "@/utils/exportCSV";

export function ExportCampaign({
  campaigns,
  selectedCampaign,
}: {
  campaigns: Campaign[];
  selectedCampaign: Campaign;
}) {
  const [customRange, setCustomRange] = React.useState<boolean>(false);
  const [customDate, setCustomDate] = React.useState<DateRange | undefined>(
    undefined
  );
  const [generating, setGenerating] = React.useState<boolean>(false);
  const [currentCampaign, setCurrentCampaign] = React.useState<Campaign[]>([
    selectedCampaign,
  ]);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleExport = () => {
    setGenerating(true);
    try {
      if (!customRange) {
        exportOverallCSV(currentCampaign);
      } else {
        if (customDate) {
          const result = exportCustomRangeCSV(
            currentCampaign,
            customDate.from!,
            customDate?.to ?? customDate.from!
          );
          if (result.success) {
            toast.success(result.message);
            setOpen(false);
          } else {
            toast.error(result.message);
          }
        }
      }
    } catch (e) {
      toast.error("Error while generating CSV");
    }
    setGenerating(false);
  };
  const handleCampaignChange = (id: string) => {
    if (id === "all") {
      setCurrentCampaign([...campaigns]);
      return;
    }
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign) {
      setCurrentCampaign([campaign]);
    }
  };
  const handleCustomRangeSwitch = (e: boolean) => {
    setCustomDate(undefined);
    setCustomRange(e);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Export CSV</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Export Campaign CSV</DrawerTitle>
            <DrawerDescription>
              Export all campaigns to a CSV file according to your choice.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 flex flex-col gap-3">
            <div className="flex items-center justify-center gap-3">
              <Label>Selected Campaign : </Label>
              <Select
                value={
                  currentCampaign.length > 1 ? "all" : currentCampaign[0].id
                }
                onValueChange={handleCampaignChange}
              >
                <SelectTrigger
                  className="min-w-fit w-[200px] rounded-lg sm:ml-auto"
                  aria-label="Select a value"
                >
                  <SelectValue placeholder="Select Campaign" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Campaigns</SelectItem>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Label>Custom Range : </Label>
              <Switch
                id="customRange"
                checked={customRange}
                onCheckedChange={handleCustomRangeSwitch}
              />
            </div>
            {customRange && (
              <div className="flex items-center justify-between gap-3">
                <Label>Range : </Label>
                <DatePickerWithRange
                  date={customDate}
                  setDate={setCustomDate}
                />
              </div>
            )}
          </div>

          <DrawerFooter>
            <Button
              onClick={handleExport}
              disabled={generating || (customRange && !customDate)}
            >
              {customRange ? "Export Custom CSV" : "Export Overall Summary CSV"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
