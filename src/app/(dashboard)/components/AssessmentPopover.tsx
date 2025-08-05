import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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

interface AssessmentPopoverProps {
  assessment: Assessment
  index: number
}

export const AssessmentPopover = ({ assessment, index }: AssessmentPopoverProps) => {
  return (
    <Popover key={index} modal={false}>
      <PopoverTrigger asChild>
        <TableRow className={cn("h-14 cursor-pointer hover:bg-accent/40 hidden md:table-row")}>
          <TableCell className="font-medium">{assessment.date}</TableCell>
          <TableCell>{assessment.symptomSeverity}</TableCell>
          <TableCell className="hidden md:table-cell">{assessment.assessmentType}</TableCell>
          <TableCell className="text-center">{assessment.hormoneLevel}</TableCell>
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
            <h5 className="font-medium">Assessment Type</h5>
            <p className="text-muted-foreground text-sm">{assessment.assessmentType}</p>
          </div>
          <div>
            <h5 className="font-medium">Hormone Level</h5>
            <p className="text-muted-foreground text-sm">{assessment.hormoneLevel}</p>
          </div>
          <div>
            <h5 className="font-medium">Notes</h5>
            <p className="text-muted-foreground text-sm">{assessment.notes}</p>
          </div>
          <div>
            <h5 className="font-medium">Additional Notes</h5>
            <p className="text-muted-foreground text-sm">{assessment.additionalNotes}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 