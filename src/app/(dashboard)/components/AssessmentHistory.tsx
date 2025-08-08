"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText } from "lucide-react"

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
              <DrawerHeader>
                <DrawerTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Complete Assessment History
                </DrawerTitle>
                <DrawerDescription>
                  View all your PCOS assessments and results
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4">
                <ScrollArea className="h-[60vh] w-full">
                  <div className="space-y-4 pr-4">
                    {assessments.map((assessment) => (
                      <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Date</div>
                            <div className="font-medium">{assessment.date}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Risk Level</div>
                            <Badge
                              variant={assessment.score === "High Risk" ? "destructive" : assessment.score === "Medium Risk" ? "secondary" : "default"}
                            >
                              {assessment.score}
                            </Badge>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Status</div>
                            <Badge variant="outline" className="text-xs">
                              {assessment.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right max-w-xs">
                          <div className="text-sm text-muted-foreground">Symptoms</div>
                          <div className="text-xs text-muted-foreground">
                            {assessment.symptoms.join(", ")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <CardDescription>
          Your previous PCOS assessments and results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments.slice(0, showCount).map((assessment) => (
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
  )
}

export default AssessmentHistory
