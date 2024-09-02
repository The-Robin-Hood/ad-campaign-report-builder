"use client";
import { Megaphone, Search, CircleUser } from "lucide-react";
import { Button } from "../common/button";
import { Input } from "../common/input";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../common/dropdown-menu";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { downloadMockCampaignJson } from "@/utils/generateMockData";
import { ThemeSwitch } from "./ThemeSwitch";

export default function Header({ session }: { session: Session }) {
  const handleGenerateMockData = () => {
    const mockData = downloadMockCampaignJson();
    console.log(mockData);
  };
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Megaphone className="h-6 w-6" />
          <h3 className="whitespace-nowrap text-xl">Ad Campaign Manager</h3>
        </Link>
      </nav>
      <div className="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <ThemeSwitch />
        <DropdownMenu>
          <p>{session.user?.name}</p>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleGenerateMockData}>
              Generate Mock Data
            </DropdownMenuItem>
            <DropdownMenuItem>Upload</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
