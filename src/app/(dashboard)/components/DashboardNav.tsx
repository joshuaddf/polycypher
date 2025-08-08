"use client"
import { ChevronRight, Activity, Calendar, Target, TrendingUp, Heart, AlertCircle, Slice, File, ClipboardCheck } from "lucide-react";
import AssessDrawer from "./AssessDrawer";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";

const DashboardNav = () => {

    const {getUser} = useKindeBrowserClient();
    const user = getUser();
    const pathname = usePathname();

  // Updated mock user data
  const userData = {
    name: user?.given_name + " " + user?.family_name,
    lastCheckup: "1 week ago",
    checkupCount: 5,
    wellnessScore: 85,
    riskStatus: "Low",
    nextCheckup: "5 days"
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 md:mt-5">
      <div className="flex flex-col gap-2">
        <div className="items-center gap-2 text-sm text-muted-foreground hidden md:flex">
          <span>Dashboard</span>
          <ChevronRight size={16} />
          <span>{pathname.slice(11, 18)}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">Welcome back, {userData.name} 🌿</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Activity size={16} />
            <span>Risk Status: {userData.riskStatus}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground max-w-md hidden md:block">
          Track your wellness metrics and monitor health trends for optimal health
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm">
          <div className="flex items-center gap-1 md:gap-2">
            <Calendar size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">Last Checkup: {userData.lastCheckup}</span>
            <span className="sm:hidden">Last: {userData.lastCheckup}</span>
          </div>
          {/* <div className="flex items-center gap-1 md:gap-2">
            <Heart size={14} className="md:w-4 md:h-4" />
            <span>Score: {userData.wellnessScore}%</span>
          </div> */}
          <div className="flex items-center gap-1 md:gap-2">
            <ClipboardCheck size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">Assessments: {userData.checkupCount}</span>
            <span className="sm:hidden">Total: {userData.checkupCount}</span>
          </div>
        </div>
        <AssessDrawer />
      </div>
    </div>
  );
};

export default DashboardNav;