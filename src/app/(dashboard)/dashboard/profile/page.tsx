"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import {
  User,
  Mail,
  Calendar,
  Activity,
  Shield,
  Settings,
  FileText,
  Edit,
  Camera,
  Bell,
  Lock
} from "lucide-react"
import Image from "next/image"
import { ContentWrapper } from '@/app/components/Wrapper'
import { cn } from '@/lib/utils'

const ProfilePage = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  const assessmentHistory = [
    {
      id: 1,
      date: "2024-01-15",
      score: "High Risk",
      status: "Completed",
      symptoms: ["Irregular periods", "Weight gain", "Acne"]
    },
    {
      id: 2,
      date: "2023-12-10",
      score: "Medium Risk",
      status: "Completed",
      symptoms: ["Irregular periods", "Hair growth"]
    }
  ];

  const healthMetrics = {
    lastAssessment: "2024-01-15",
    totalAssessments: 5,
    riskLevel: "High Risk",
    nextRecommendedAssessment: "2024-02-15"
  };

  return (
    <ContentWrapper className='mt-20'>
      <div className="container mx-auto">
        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold text-foreground">Profile</h1> */}
          <p className="text-muted-foreground mt-2">Manage your account and health information</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Image
                    src={user?.picture ?? "/vercel.svg"}
                    alt="Profile Picture"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-background shadow-lg"
                  />
                </div>
                <CardTitle className="text-xl">
                  {user?.given_name} {user?.family_name}
                </CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Member since</span>
                    <span className="text-sm font-medium">January 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Account status</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Health Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Health Overview
                </CardTitle>
                <CardDescription>
                  Your PCOS assessment history and health metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{healthMetrics.totalAssessments}</div>
                    <div className="text-sm text-muted-foreground">Total Assessments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{healthMetrics.riskLevel}</div>
                    <div className="text-sm text-muted-foreground">Current Risk Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">{healthMetrics.lastAssessment}</div>
                    <div className="text-sm text-muted-foreground">Last Assessment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">8</div>
                    <div className="text-sm text-muted-foreground">Symptoms Tracked</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Assessment History */}
            <Card>
                             <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <FileText className="h-5 w-5" />
                   Assessment History
                 </CardTitle>
                 <CardDescription>
                   Your previous PCOS assessments and results
                 </CardDescription>
               </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessmentHistory.map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Date</div>
                          <div className="font-medium">{assessment.date}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Risk Level</div>
                          <Badge
                            variant={assessment.score === "High Risk" ? "destructive" : "secondary"}
                          >
                            {assessment.score}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Symptoms</div>
                        <div className="text-xs text-muted-foreground max-w-xs">
                          {assessment.symptoms.join(", ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account preferences and security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Notifications</div>
                        <div className="text-sm text-muted-foreground">Manage your notification preferences</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Privacy & Security</div>
                        <div className="text-sm text-muted-foreground">Manage your data and security settings</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Data Export</div>
                        <div className="text-sm text-muted-foreground">Download your health data</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default ProfilePage