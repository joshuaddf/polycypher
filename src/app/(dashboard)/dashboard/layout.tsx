import { ContentWrapper } from "@/app/components/Wrapper";
import Navbar from "../components/Navbar";
import { ChevronRight, Plus, Activity, Users, FileText } from "lucide-react";
import AssessDrawer from "../components/AssessDrawer";
import { AuthProvider } from "@/app/AuthProvider";
import DashboardNav from "../components/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <ContentWrapper className="max-w-[1440px] mx-auto flex items-center justify-start w-full mt-[8rem]">
           <DashboardNav />
          </ContentWrapper>
          {children}
        </div>
    </AuthProvider>
  );

}