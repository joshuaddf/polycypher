"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CircleAlert, FileText } from "lucide-react"

interface Assessment {
  id: number
  date: string
  score: string
  status: string
  symptoms: string[]
}

interface AssessmentHistoryProps {
  assessments: Assessment[]
  showCount?: number
}

const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({
  assessments,
  showCount = 2
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assessment History
          </CardTitle>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="default" size="sm">
                View all
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className='flex flex-col items-center justify-center'>
                <DrawerTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Complete Assessment History
                </DrawerTitle>
                <DrawerDescription>
                  View all your PCOS assessments and results
                </DrawerDescription>
                  <div className="flex items-center justify-center gap-3 opacity-70 mt-1 text-xs">
                    <CircleAlert size={20} />
                    <p className='w-full text-left'>Tap to view more information</p>
                  </div>
              </DrawerHeader>
              <div className="px-4 pb-4">
                <ScrollArea className="h-[60vh] w-full">
                  <div className="space-y-3 ">
                    {assessments.map((assessment) => (
                      <Popover key={assessment.id} modal={false}>
                        <PopoverTrigger asChild>
                          <div
                            className="flex items-center p-4 border rounded-lg bg-card gap-6 cursor-pointer hover:bg-accent/40 transition-colors"
                          >
                            <div className="flex-1 flex items-center justify-start gap-6">
                              <div className="min-w-[120px] text-center">
                                <div className="text-sm text-muted-foreground">Date</div>
                                <div className="font-medium text-base">{assessment.date}</div>
                              </div>
                              <div className="min-w-[120px] text-center">
                                <div className="text-sm text-muted-foreground">Risk Level</div>
                                <Badge className='text-xs'
                                  variant={assessment.score === "High Risk" ? "destructive" : assessment.score === "Medium Risk" ? "secondary" : "default"}
                                >
                                  {assessment.score}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex-1 text-right max-w-xs hidden md:block">
                              <div className="text-sm text-muted-foreground">Symptoms</div>
                              <div className="text-xs text-muted-foreground">
                                {assessment.symptoms.join(", ")}
                              </div>
                            </div>
                          </div>
                        </PopoverTrigger>

                      {/* popover content */}

                        <PopoverContent className="w-96">
                          <div className="space-y-4">
                            <div className="border-b pb-2">
                              <h4 className="font-semibold text-base">Assessment Details</h4>
                              <p className="text-sm text-muted-foreground">{assessment.date}</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">Risk Level</h5>
                                <Badge 
                                  variant={assessment.score === "High Risk" ? "destructive" : assessment.score === "Medium Risk" ? "secondary" : "default"}
                                  className="text-xs"
                                >
                                  {assessment.score}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">Status</h5>
                                <p className="text-muted-foreground text-sm">{assessment.status}</p>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">Assessment ID</h5>
                                <p className="text-muted-foreground text-sm">#{assessment.id}</p>
                              </div>
                            </div>
                            
                            <div className="border-t pt-3">
                              <h5 className="font-medium text-sm mb-2">Symptoms</h5>
                              <div className="flex flex-wrap gap-1">
                                {assessment.symptoms.map((symptom, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {symptom}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <CardDescription className='w-2/3'>
          Your previous PCOS assessments and results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 flex flex-col w-full">
          {assessments.slice(0, showCount).map((assessment) => (
            <div
              key={assessment.id}
              className="flex items-center p-4 border rounded-lg w-full gap-6"
            >
              <div className="flex-1 flex items-center justify-start gap-6">
                <div className="min-w-[120px] text-center">
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div className="font-medium text-base">{assessment.date}</div>
                </div>
                <div className="min-w-[120px] text-center">
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                  <Badge className='text-xs'
                    variant={assessment.score === "High Risk" ? "destructive" : "secondary"}
                  >
                    <span className=''>
                      {assessment.score}
                    </span>
                  </Badge>
                </div>
              </div>
              <div className="flex-1 text-right hidden md:block">
                <div className="text-sm">Symptoms</div>
                <div className="text-xs text-muted-foreground max-w-xs">
                  {assessment.symptoms.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

    </Card>
  )
}

export default AssessmentHistory
