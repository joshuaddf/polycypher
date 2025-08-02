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
import { ChevronRight } from "lucide-react"
import { ChartBarDefault } from "../../components/ChartBarDefault"
import { ChartRadialStacked } from "../../components/RadialChart"

const page = () => {
  const pcosData = [
    {
      patientId: "PCOS001",
      symptomSeverity: "Moderate",
      diagnosisStatus: "Confirmed",
      hormoneLevel: "5.2",
    },
    {
      patientId: "PCOS002",
      symptomSeverity: "Mild",
      diagnosisStatus: "Pending",
      hormoneLevel: "3.8",
    },
    {
      patientId: "PCOS003",
      symptomSeverity: "Severe",
      diagnosisStatus: "Negative",
      hormoneLevel: "6.7",
    },
    {
      patientId: "PCOS004",
      symptomSeverity: "Moderate",
      diagnosisStatus: "Confirmed",
      hormoneLevel: "4.9",
    },
    {
      patientId: "PCOS005",
      symptomSeverity: "Mild",
      diagnosisStatus: "Confirmed",
      hormoneLevel: "4.1",
    },
    {
      patientId: "PCOS006",
      symptomSeverity: "Severe",
      diagnosisStatus: "Pending",
      hormoneLevel: "7.3",
    },
    {
      patientId: "PCOS007",
      symptomSeverity: "Moderate",
      diagnosisStatus: "Negative",
      hormoneLevel: "5.5",
    },
  ]

  return (
    <>
      <section className="pt-10">
        <ContentWrapper className="max-w-[1440px] border-[1px] rounded-2xl p-4">
          <div className="grid grid-cols-1 md:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-3">
            <div className="border-2 rounded-2xl">
              <Table className=" bg-accent/20 rounded-2xl">
                <TableCaption>A list of recent PCOS patient records.</TableCaption>
                <TableHeader>
                  <TableRow className={cn("px-10")}>
                    <TableHead className="">Patient ID</TableHead>
                    <TableHead>Symptom Severity</TableHead>
                    <TableHead>Diagnosis Status</TableHead>
                    <TableHead className="text-right">Hormone Level (ng/mL)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={cn("px-10")}>
                  {pcosData.map((record) => (
                    <TableRow key={record.patientId} className={cn("h-14")}>
                      <TableCell className="font-medium">{record.patientId}</TableCell>
                      <TableCell>{record.symptomSeverity}</TableCell>
                      <TableCell>{record.diagnosisStatus}</TableCell>
                      <TableCell className="text-right">{record.hormoneLevel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </div>
            <div className="flex md:flex-row flex-col gap-6">
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