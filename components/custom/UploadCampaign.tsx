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
import validateMockJSON from "@/utils/validateMockJSON";
import Campaign from "@/models/Campaign";
import { File, Loader } from "lucide-react";
import axios from "axios";

export function UploadCampaign() {
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [campaignData, setCampaignData] = React.useState<Campaign[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    if (acceptedFiles.length > 1) {
      toast.error("Only one file is allowed");
      return;
    }
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result as string);
        if (validateMockJSON(jsonData)) {
          setCampaignData(jsonData);
        } else {
          toast.error("JSON file is not in the correct format");
        }
      } catch (error) {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    multiple: false,
    onDropRejected(fileRejections, event) {
      if (fileRejections.length === 0) {
        return;
      }
      if (fileRejections[0].errors) {
        toast.error(fileRejections[0].errors[0].message);
      }
    },
  });
  const handleUpload = async () => {
    setUploading(true);
    try {
      const response = await axios.post("/api/campaigns", campaignData);
      console.log(response);
      toast.success("Campaign uploaded successfully");
    } catch (error) {
      toast.error("Error uploading campaign");
    }
    setUploading(false);
    setCampaignData([]);
    setOpen(false);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Upload Campaign</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Upload Campaign Json File</DrawerTitle>
            <DrawerDescription>
              Make sure the file is in the correct format
            </DrawerDescription>
          </DrawerHeader>
          {campaignData.length > 0 ? (
            <div className="flex gap-3 p-4 rounded-lg">
              <File className="h-8 w-8 text-primary" />
              <p className="text-lg font-semibold text-primary">
                Campaign Count : {campaignData.length}
              </p>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="bg-transparent flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg focus:outline-none cursor-pointer transition-all"
            >
              <input
                {...getInputProps()}
                className="hidden" // Hides the default file input element
              />
              {isDragActive ? (
                <p className="text-gray-600 font-medium bg-transparent">
                  Drop the JSON files here ...
                </p>
              ) : (
                <p className="text-gray-600 font-medium">
                  Drag 'n' drop JSON files here, or click to select files
                </p>
              )}
            </div>
          )}
          <DrawerFooter>
            <Button
              disabled={campaignData.length === 0 || uploading}
              onClick={handleUpload}
            >
              {uploading ? (
                <Loader className="h-6 w-6 animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={() => setCampaignData([])}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
