"use client"
import { ChevronRight, Activity, Calendar, Target, TrendingUp, Heart, AlertCircle, Slice, File, ClipboardCheck } from "lucide-react";
import AssessDrawer from "./AssessDrawer";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getAssessments } from "@/lib/services/assessmentService";

interface Assessment {
  id: string
  createdAt: string
  score: number | null
  pcos: string | null
  follicleR: number | null
  follicleL: number | null
  skinDarkening: string | null
  hairGrowth: string | null
  weightGain: string | null
  cycle: string | null
  fastFood: string | null
  pimples: string | null
  amh: number | null
  weight: number | null
}

const DashboardNav = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const pathname = usePathname();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await getAssessments();
        setAssessments(data || []);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const getRiskLevel = (score: number | null): string => {
    if (!score) return "No Data"
    if (score >= 25.0) return "Very High"
    if (score >= 15.0) return "High"
    if (score >= 8.0) return "Medium"
    if (score >= 5.0) return "Low"
    return "Very Low"
  };

  const getLatestAssessment = () => {
    if (assessments.length === 0) return null;
    return assessments[0];
  };

  const getLastCheckupText = () => {
    const latest = getLatestAssessment();
    if (!latest) return "No assessments";
    
    const now = new Date();
    const lastDate = new Date(latest.createdAt);
    const diffTime = Math.abs(now.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getCurrentRiskStatus = () => {
    const latest = getLatestAssessment();
    return latest ? getRiskLevel(latest.score) : "No Data";
  };

  const userData = {
    name: user?.given_name + " " + user?.family_name,
    lastCheckup: getLastCheckupText(),
    checkupCount: assessments.length,
    wellnessScore: 85,
    riskStatus: getCurrentRiskStatus(),
    nextCheckup: "5 days"
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 md:mt-15">
      <div className="flex flex-col gap-2">
        {/* <div className="items-center gap-2 text-sm text-muted-foreground hidden md:flex">
          <span>Dashboard</span>
          <ChevronRight size={16} />
          <span>{pathname.slice(11, 18)}</span>
        </div> */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">Hello, {userData.name} 🌿</h1>
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