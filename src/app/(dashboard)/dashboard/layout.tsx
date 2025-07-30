import { ContentWrapper } from "@/app/components/Wrapper";
import Navbar from "../components/Navbar";
import { ChevronRight } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <ContentWrapper className="max-w-[1440px] mx-auto flex items-center justify-start w-full mt-[8rem]">
        <div className="text-2xl md:text-4xl flex items-center justify-start mt-4">
          <span>Page title</span>
          <ChevronRight size={30} />
          <span>content</span>
        </div>
      </ContentWrapper>
      {children}
    </div>
    );

}