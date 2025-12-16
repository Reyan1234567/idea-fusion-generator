import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen overflow-hidden relative">
          <Navbar text={"Spit in your ideas"} />
          <SidebarTrigger className="absolute left-2 top-2 z-1000"/>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default layout;
