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

const page = () => {

  const personalAssessments = [
    {
      date: "2024-01-15",
      symptomSeverity: "Moderate",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "5.2",
      notes: "Irregular periods, mild acne"
    },
    {
      date: "2024-01-01",
      symptomSeverity: "Mild",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "3.8",
      notes: "Feeling better, energy improved"
    },
    {
      date: "2023-12-15",
      symptomSeverity: "Severe",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "6.7",
      notes: "Stress affecting symptoms"
    },
    {
      date: "2023-12-01",
      symptomSeverity: "Moderate",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "4.9",
      notes: "Started new diet plan"
    },
    {
      date: "2023-11-15",
      symptomSeverity: "Mild",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "4.1",
      notes: "Regular exercise helping"
    },
    {
      date: "2023-11-01",
      symptomSeverity: "Severe",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "7.3",
      notes: "Work stress increased symptoms"
    },
    {
      date: "2023-10-15",
      symptomSeverity: "Moderate",
      assessmentType: "Monthly Check-in",
      hormoneLevel: "5.5",
      notes: "First assessment after diagnosis"
    },
  ]

  return (
    <>
      <section className="mt-5">
        <ContentWrapper className="max-w-[1440px] border-[1px] rounded-2xl p-4">
          <div className="grid grid-cols-1 md:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-3">
            <div className="border-2 rounded-2xl">
              <Table className=" bg-accent/20 p-2 rounded-2xl">
                {/* <TableCaption className="hidden md:table-caption">Your personal PCOS assessment history and symptom tracking.</TableCaption> */}
                <TableHeader>
                  <TableRow className={cn("px-5")}>
                    <TableHead className="">Date</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="text-right">Level</TableHead>
                    <TableHead className="hidden md:table-cell">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={cn("px-10")}>
                  {personalAssessments.map((assessment, index) => (
                    <TableRow key={index} className={cn("h-14")}>
                      <TableCell className="font-medium">{assessment.date}</TableCell>
                      <TableCell>{assessment.symptomSeverity}</TableCell>
                      <TableCell className="hidden md:table-cell">{assessment.assessmentType}</TableCell>
                      <TableCell className="text-center">{assessment.hormoneLevel}</TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden md:table-cell">{assessment.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </div>
            <div className="flex md:flex-row flex-col gap-3">
              <ChartBarDefault />
              <ChartRadialStacked />
            </div>
          </div>
        </ContentWrapper>
      </section>

    </>
  )
}

export default page