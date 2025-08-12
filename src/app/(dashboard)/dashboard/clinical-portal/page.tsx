"use client"

import { ContentWrapper } from "@/app/components/Wrapper"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { PCOSChart } from "../../components/ChartBarDefault"
import { ChartRadialStacked } from "../../components/RadialChart"
import { AssessmentDrawer } from "../../components/AssessmentDrawer"
import { AssessmentPopover } from "../../components/AssessmentPopover"
import React, { useState, useEffect } from "react"
import DashboardNav from "../../components/DashboardNav"
import { useAuth } from "@/lib/hooks/useAuth"
import { getAssessments } from "@/lib/services/assessmentService"
import { Loader2 } from "lucide-react"

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

const page = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchAssessments = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false)
        return
      }

      try {
        setError(null)
        const data = await getAssessments()
        setAssessments(data || [])
      } catch (error) {
        console.error('Error fetching assessments:', error)
        setError('Failed to load assessment data')
      } finally {
        setLoading(false)
      }
    }

    fetchAssessments()
  }, [isAuthenticated, user])

  const getRiskLevel = (score: number | null): string => {
    if (!score) return "No Score"
    if (score >= 25.0) return "Very High Risk"
    if (score >= 15.0) return "High Risk"
    if (score >= 8.0) return "Medium Risk"
    if (score >= 5.0) return "Low Risk"
    return "Very Low Risk"
  }

  const getAMHLevel = (amh: number | null): string => {
    if (!amh) return "N/A"
    if (amh > 10.0) return "High"
    if (amh > 4.0) return "Normal"
    if (amh > 1.0) return "Low"
    return "Very Low"
  }

  const getSymptoms = (assessment: Assessment): string => {
    const symptoms: string[] = []
    if (assessment.pcos === "Yes") symptoms.push("PCOS")
    if (assessment.skinDarkening === "Yes") symptoms.push("Skin Darkening")
    if (assessment.hairGrowth === "Yes") symptoms.push("Hair Growth")
    if (assessment.weightGain === "Yes") symptoms.push("Weight Gain")
    if (assessment.cycle === "Irregular") symptoms.push("Irregular Cycle")
    if (assessment.fastFood === "Yes") symptoms.push("Fast Food")
    if (assessment.pimples === "Yes") symptoms.push("Pimples")
    return symptoms.join(", ") || "None"
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const transformedAssessments = assessments.slice(0, 7).map((assessment) => ({
    id: assessment.id,
    date: formatDate(assessment.createdAt),
    symptomSeverity: getRiskLevel(assessment.score),
    assessmentType: "PCOS Assessment",
    hormoneLevel: assessment.amh?.toString() || "N/A",
    notes: getSymptoms(assessment),
    additionalNotes: `Score: ${assessment.score?.toFixed(2) || "N/A"}, Weight: ${assessment.weight || "N/A"}kg, Follicles R: ${assessment.follicleR || "N/A"}, L: ${assessment.follicleL || "N/A"}`
  }))

  if (loading) {
    return (
      <>
        <ContentWrapper className="max-w-[1440px] mx-auto flex items-center justify-start w-full mt-[8rem]">
          <DashboardNav />
        </ContentWrapper>
        <section className="mt-5">
          <ContentWrapper className="max-w-[1440px] border-[1px] rounded-2xl p-4">
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          </ContentWrapper>
        </section>
      </>
    )
  }

  if (error) {
    return (
      <>
        <ContentWrapper className="max-w-[1440px] mx-auto flex items-center justify-start w-full mt-[8rem]">
          <DashboardNav />
        </ContentWrapper>
        <section className="mt-5">
          <ContentWrapper className="max-w-[1440px] border-[1px] rounded-2xl p-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">{error}</p>
            </div>
          </ContentWrapper>
        </section>
      </>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <ContentWrapper className="max-w-[1440px] mx-auto flex items-center justify-start w-full mt-[8rem]">
          <DashboardNav />
        </ContentWrapper>
        <section className="mt-5">
          <ContentWrapper className="max-w-[1440px] border-[1px] rounded-2xl p-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Please log in to view your assessment data.</p>
            </div>
          </ContentWrapper>
        </section>
      </>
    )
  }

  return (
    <>
      <ContentWrapper className="max-w-[1440px] mx-auto flex items-center justify-start w-full mt-[8rem]">
        <DashboardNav />
      </ContentWrapper>
      <section className="mt-5">
        <ContentWrapper className="max-w-[1440px] border-[1px] rounded-2xl p-4">
          <div className="grid grid-cols-1 md:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-3">
            <div className="border-2 rounded-2xl">
              <Table className="bg-accent/20 p-2 rounded-2xl">
                <TableHeader>
                  <TableRow className={cn("px-5")}>
                    <TableHead>Date</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="text-left">Level</TableHead>
                    <TableHead className="hidden md:table-cell">Symptoms</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={cn("px-10")}>
                  {transformedAssessments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <p className="text-muted-foreground">No assessments found. Complete your first assessment to see results here.</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    transformedAssessments.map((assessment, index) => (
                      <React.Fragment key={assessment.id}>
                        <AssessmentPopover assessment={assessment} index={index} />
                        <AssessmentDrawer assessment={assessment} index={index} />
                      </React.Fragment>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex md:flex-row flex-col gap-3">
              <PCOSChart />
              <ChartRadialStacked />
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}

export default page