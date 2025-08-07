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
import { ChartBarDefault } from "../../components/ChartBarDefault"
import { ChartRadialStacked } from "../../components/RadialChart"
import { AssessmentDrawer } from "../../components/AssessmentDrawer"
import { AssessmentPopover } from "../../components/AssessmentPopover"
import React from "react"
import DashboardNav from "../../components/DashboardNav"

const page = () => {


  const personalAssessments = [
    {
      date: "2024-01-15",
      symptomSeverity: "Moderate",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "5.2",
      notes: "Irregular periods, mild acne",
      additionalNotes: "Patient reported irregular menstrual cycles lasting 35-40 days with moderate acne on face and back. Recommended dietary adjustments and follow-up in 4 weeks."
    },
    {
      date: "2024-01-01",
      symptomSeverity: "Mild",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "3.8",
      notes: "Feeling better, energy improved",
      additionalNotes: "Patient noted improved energy levels and more regular sleep patterns. Symptoms reduced after lifestyle changes. Continue current management plan."
    },
    {
      date: "2023-12-15",
      symptomSeverity: "Severe",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "6.7",
      notes: "Stress affecting symptoms",
      additionalNotes: "High stress levels from work reported, correlating with increased symptom severity. Discussed stress management techniques and potential medication adjustments."
    },
    {
      date: "2023-12-01",
      symptomSeverity: "Moderate",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "4.9",
      notes: "Started new diet plan",
      additionalNotes: "Initiated low-glycemic index diet to manage symptoms. Patient reports adherence to plan with moderate improvement in symptoms."
    },
    {
      date: "2023-11-15",
      symptomSeverity: "Mild",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "4.1",
      notes: "Regular exercise helping",
      additionalNotes: "Patient maintaining regular exercise routine (30 min, 5 days/week). Noted improvement in mood and energy levels. Continue current plan."
    },
    {
      date: "2023-11-01",
      symptomSeverity: "Severe",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "7.3",
      notes: "Work stress increased symptoms",
      additionalNotes: "Significant increase in symptoms due to high work-related stress. Recommended mindfulness practices and potential therapy referral."
    },
    {
      date: "2023-10-15",
      symptomSeverity: "Moderate",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "5.5",
      notes: "First assessment after diagnosis",
      additionalNotes: "Initial assessment post-PCOS diagnosis. Discussed treatment options, lifestyle changes, and set follow-up schedule."
    },
  ];

  const correlationData = [
    { feature: "Follicle No. (R)", correlation: 0.648327 },
    { feature: "Follicle No. (L)", correlation: 0.603346 },
    { feature: "Skin darkening (Y/N)", correlation: 0.475733 },
    { feature: "hair growth(Y/N)", correlation: 0.464667 },
    { feature: "Weight gain(Y/N)", correlation: 0.441047 },
    { feature: "Cycle(R/I)", correlation: 0.401644 },
    { feature: "Fast food (Y/N)", correlation: 0.377933 },
    { feature: "Pimples(Y/N)", correlation: 0.286077 },
    { feature: "AMH(ng/mL)", correlation: 0.263863 },
    { feature: "Weight (Kg)", correlation: 0.211938 }
  ];

  const severityData = [
    { name: "Mild", value: 2 },
    { name: "Moderate", value: 3 },
    { name: "Severe", value: 2 }
  ];

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
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="text-right">Level</TableHead>
                    <TableHead className="hidden md:table-cell">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={cn("px-10")}>
                  {personalAssessments.map((assessment, index) => (
                    <React.Fragment key={index}>
                      <AssessmentPopover assessment={assessment} index={index} />
                      <AssessmentDrawer assessment={assessment} index={index} />
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex md:flex-row flex-col gap-3">
              <ChartBarDefault data={correlationData} />
              {/* <ChartRadialStacked data={severityData} /> */}
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}

export default page