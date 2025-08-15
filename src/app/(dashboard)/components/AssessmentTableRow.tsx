import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface Assessment {
  id: string
  date: string
  symptomSeverity: string
  assessmentType: string
  hormoneLevel: string
  notes: string
  additionalNotes: string
}

interface AssessmentTableRowProps {
  assessment: Assessment
  index: number
}

export const AssessmentTableRow = ({ assessment, index }: AssessmentTableRowProps) => {
  return (
    <>
      {/* Desktop: Popover */}
      <Popover key={`popover-${assessment.id}`} modal={false}>
        <PopoverTrigger asChild>
          <TableRow className={cn("h-14 cursor-pointer hover:bg-accent/40 hidden md:table-row")}>
            <TableCell className="font-medium">{assessment.date}</TableCell>
            <TableCell>{assessment.symptomSeverity}</TableCell>
            <TableCell className="text-left">{assessment.hormoneLevel}</TableCell>
            <TableCell className="text-sm text-muted-foreground hidden md:table-cell">{assessment.notes}</TableCell>
          </TableRow>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="space-y-4">
            <h4 className="font-semibold">Assessment Details - {assessment.date}</h4>
            <div>
              <h5 className="font-medium">Symptom Severity</h5>
              <p className="text-muted-foreground text-sm">{assessment.symptomSeverity}</p>
            </div>
            <div>
              <h5 className="font-medium">Hormone Level</h5>
              <p className="text-muted-foreground text-sm">{assessment.hormoneLevel}</p>
            </div>
            <div>
              <h5 className="font-medium">Symptoms</h5>
              <p className="text-muted-foreground text-sm">{assessment.notes}</p>
            </div>
            <div>
              <h5 className="font-medium">Additional Notes</h5>
              <p className="text-muted-foreground text-sm">{assessment.additionalNotes}</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Mobile: Drawer */}
      <Drawer key={`drawer-${assessment.id}`}>
        <DrawerTrigger asChild>
          <TableRow className={cn("h-14 cursor-pointer hover:bg-accent/40 md:hidden")}>
            <TableCell className="font-medium">{assessment.date}</TableCell>
            <TableCell>{assessment.symptomSeverity}</TableCell>
            <TableCell className="text-left">{assessment.hormoneLevel}</TableCell>
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
    </>
  )
}
