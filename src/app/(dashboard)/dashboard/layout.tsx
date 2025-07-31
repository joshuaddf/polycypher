import { ContentWrapper } from "@/app/components/Wrapper";
import Navbar from "../components/Navbar";
import { ChevronRight, Plus } from "lucide-react";
import NavbarServer from "../components/NavbarServer";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import AssessDrawer from "../components/AssessDrawer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarServer />
      <ContentWrapper className="max-w-[1440px] mx-auto flex items-center justify-start w-full mt-[8rem]">
        <div className="flex items-center justify-between w-full">
          <div className="text-2xl md:text-4xl flex items-center justify-start mt-4">
            <span>Page title</span>
            <ChevronRight size={30} />
            <span>content</span>
          </div>
          {/* <DrawerTrigger>
          <Plus className="font-bold" />Assess
          </DrawerTrigger> */}
          <AssessDrawer />
        </div>
      </ContentWrapper>
      {children}
    </div>
  );

}