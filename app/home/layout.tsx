import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen">
          <SidebarTrigger className="fixed left-2 top-2 z-100"/>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default layout;
