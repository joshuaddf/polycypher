"use client"
import React, { useState, useEffect } from 'react'
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
  Lock,
  Delete,
  Trash,
  X,
  Download,
  Heart,
  AlertCircle,
  ClipboardCheck
} from "lucide-react"
import Image from "next/image"
import { ContentWrapper } from '@/app/components/Wrapper'
import { cn } from '@/lib/utils'
import AssessmentHistory from '../../components/AssessmentHistory'
import { DeleteDialog } from '../../components/DeleteDialog'
import { getAssessments } from '@/lib/services/assessmentService'

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

const ProfilePage = () => {
  const { getUser, isAuthenticated, isLoading: authLoading } = useKindeBrowserClient();
  const user = getUser();
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [dbUser, setDbUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user?.id) {
        console.log('Profile: Waiting for user authentication...', { isAuthenticated, userId: user?.id })
        return
      }

      console.log('Profile: User authenticated, fetching data...', { userId: user.id })

      try {
        console.log('Profile: Fetching assessments...')
        const assessmentData = await getAssessments()
        console.log('Profile: Assessments fetched successfully:', assessmentData?.length || 0)
        setAssessments(assessmentData || [])
        
        console.log('Profile: Fetching user data...')
        const response = await fetch('/api/user')
        if (response.ok) {
          const userData = await response.json()
          console.log('Profile: User data fetched successfully:', userData.user?.id)
          setDbUser(userData.user)
        } else {
          console.error('Profile: Failed to fetch user data:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Profile: Error fetching data:', error)
        setAssessments([])
        setDbUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user?.id, isAuthenticated])

  const getRiskLevel = (score: number | null): string => {
    if (!score) return "No Score"
    if (score >= 25.0) return "Very High Risk"
    if (score >= 15.0) return "High Risk"
    if (score >= 8.0) return "Medium Risk"
    if (score >= 5.0) return "Low Risk"
    return "Very Low Risk"
  }

  const getSymptomsCount = (): number => {
    const allSymptoms = new Set<string>()
    assessments.forEach(assessment => {
      if (assessment.pcos === "Yes") allSymptoms.add("PCOS")
      if (assessment.skinDarkening === "Yes") allSymptoms.add("Skin Darkening")
      if (assessment.hairGrowth === "Yes") allSymptoms.add("Hair Growth")
      if (assessment.weightGain === "Yes") allSymptoms.add("Weight Gain")
      if (assessment.cycle === "Irregular") allSymptoms.add("Irregular Cycle")
      if (assessment.fastFood === "Yes") allSymptoms.add("Fast Food")
      if (assessment.pimples === "Yes") allSymptoms.add("Pimples")
    })
    return allSymptoms.size
  }

  const getLatestAssessment = () => {
    if (assessments.length === 0) return null
    return assessments[0]
  }

  const getLatestRiskLevel = (): string => {
    const latest = getLatestAssessment()
    return latest ? getRiskLevel(latest.score) : "No Data"
  }

  const getLatestAssessmentDate = (): string => {
    const latest = getLatestAssessment()
    if (!latest) return "No Data"
    return new Date(latest.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getMemberSinceDate = (): string => {
    if (!dbUser?.createdAt) return "Loading..."
    return new Date(dbUser.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  const healthMetrics = {
    lastAssessment: getLatestAssessmentDate(),
    totalAssessments: assessments.length,
    riskLevel: getLatestRiskLevel(),
    symptomsTracked: getSymptomsCount()
  };

  const userData = {
    name: user?.given_name + " " + user?.family_name,
    lastCheckup: getLatestAssessmentDate(),
    checkupCount: assessments.length,
    wellnessScore: 85,
    riskStatus: getLatestRiskLevel(),
    nextCheckup: "5 days"
  };

  if (authLoading || loading) {
    return (
      <ContentWrapper className='mt-20'>
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your profile...</p>
            </div>
          </div>
        </div>
      </ContentWrapper>
    )
  }

  if (!isAuthenticated || !user?.id) {
    return (
      <ContentWrapper className='mt-20'>
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-muted-foreground">Please log in to view your profile.</p>
            </div>
          </div>
        </div>
      </ContentWrapper>
    )
  }

  return (
    <ContentWrapper className='mt-20'>
      <div className="container mx-auto">
        <div className="mb-8">
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
                    className="rounded-full border border-muted-foreground"
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
                    <span className="text-sm font-medium">{getMemberSinceDate()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-4">
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
                  <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center justify-start gap-3">
                      <ClipboardCheck className="h-4 w-4" />
                      <div className="text-sm font-bold text-primary">{healthMetrics.totalAssessments}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1  not-last:">Total Assessments</div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center justify-start gap-3">
                      <AlertCircle className="h-4 w-4" />
                      <div className="text-sm font-bold">{healthMetrics.riskLevel}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Current Risk Level</div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center justify-start gap-3">
                      <Calendar className="h-4 w-4" />
                      <div className="text-sm font-bold">{healthMetrics.lastAssessment}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Last Assessment</div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-3 shadow-sm border">
                    <div className="flex gap-3 items-center justify-start">
                      <Heart className="h-4 w-4" />
                      <div className="text-sm font-bold">{healthMetrics.symptomsTracked}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Symptoms Tracked</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <AssessmentHistory showCount={2} />
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
              <CardContent className='space-y-4'>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium flex items-center gap-2 text-sm">
                        <Trash className="h-4 w-4 text-destructive" />
                        Delete Account
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </div>
                    </div>
                  </div>
                  <DeleteDialog />
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