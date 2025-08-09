import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface Assessment {
  date: string
  symptomSeverity: string
  assessmentType: string
  hormoneLevel: string
  notes: string
  additionalNotes: string
}

interface AssessmentDrawerProps {
  assessment: Assessment
  index: number
}

export const AssessmentDrawer = ({ assessment, index }: AssessmentDrawerProps) => {
  return (
    <Drawer key={index}>
      <DrawerTrigger asChild>
        <TableRow className={cn("h-14 cursor-pointer hover:bg-accent/40 md:hidden")}>
          <TableCell className="font-medium">{assessment.date}</TableCell>
          <TableCell>{assessment.symptomSeverity}</TableCell>
          <TableCell className="hidden md:table-cell">{assessment.assessmentType}</TableCell>
          <TableCell className="text-center">{assessment.hormoneLevel}</TableCell>
          <TableCell className="text-sm text-muted-foreground hidden md:table-cell">{assessment.notes}</TableCell>
        </TableRow>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Assessment Details - {assessment.date}</DrawerTitle>
        </DrawerHeader>
        <div className="px-5 pb-3">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Symptom Severity</h4>
              <p className="text-muted-foreground text-sm">{assessment.symptomSeverity}</p>
            </div>
            <div>
              <h4 className="font-semibold">Assessment Type</h4>
              <p className="text-muted-foreground text-sm">{assessment.assessmentType}</p>
            </div>
            <div>
              <h4 className="font-semibold">Hormone Level</h4>
              <p className="text-muted-foreground text-sm">{assessment.hormoneLevel}</p>
            </div>
            <div>
              <h4 className="font-semibold">Notes</h4>
              <p className="text-muted-foreground text-sm">{assessment.notes}</p>
            </div>
            <div>
              <h4 className="font-semibold">Additional Notes</h4>
              <p className="text-muted-foreground text-sm">{assessment.additionalNotes}</p>
            </div>
          </div>
        </div>
        <DrawerClose asChild>
          <div className="p-6 w-full">
            <Button variant="outline" className="w-full">Close</Button>
          </div>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
} 