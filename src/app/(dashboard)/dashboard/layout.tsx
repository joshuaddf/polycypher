import { ContentWrapper } from "@/app/components/Wrapper";
import Navbar from "../components/Navbar";
import { ChevronRight, Plus } from "lucide-react";
import AssessDrawer from "../components/AssessDrawer";
import { AuthProvider } from "@/app/AuthProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* <NavbarServer /> */}
        <Navbar />
        <ContentWrapper className="max-w-[1440px] mx-auto flex items-center justify-start w-full mt-[8rem]">
          <div className="flex items-center justify-between w-full">
            <div className="text-xl md:text-4xl flex items-center justify-start mt-4">
             
            </div>
            {/* <DrawerTrigger>
          <Plus className="font-bold" />Assess
          </DrawerTrigger> */}
            <AssessDrawer />
          </div>
        </ContentWrapper>
        {children}
      </div>
    </AuthProvider>
  );

}