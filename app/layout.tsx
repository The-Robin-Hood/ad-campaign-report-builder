"use client";
import ToasterContext from "@/components/common/toasterContext";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/common/theme-provider";
import CustomizationProvider from "@/hooks/customization-provider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head>
        <title>Ad Campaign</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Ad Campaign Dashboard" />
      </head>

      <body>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CustomizationProvider>
              <DndProvider backend={HTML5Backend}>
                <ToasterContext />
                {children}
              </DndProvider>
            </CustomizationProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
