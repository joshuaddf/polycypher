"use client"
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CircleAlert, FileText, Loader2, MoreHorizontal } from "lucide-react"
import { useAuth } from "@/lib/hooks/useAuth"
import { getAssessments } from "@/lib/services/assessmentService"

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

interface AssessmentHistoryProps {
  showCount?: number
}

const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({
  showCount = 4
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
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
        setError('Failed to load assessment history. Please try again.')
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

  const getRiskLevelVariant = (score: number | null): "destructive" | "secondary" | "default" => {
    if (!score) return "default"
    if (score >= 25.0) return "destructive"
    if (score >= 15.0) return "destructive"
    if (score >= 8.0) return "secondary"
    if (score >= 5.0) return "default"
    return "default"
  }

  const getSymptoms = (assessment: Assessment): string[] => {
    const symptoms: string[] = []
    if (assessment.pcos === "Yes") symptoms.push("PCOS")
    if (assessment.skinDarkening === "Yes") symptoms.push("Skin Darkening")
    if (assessment.hairGrowth === "Yes") symptoms.push("Hair Growth")
    if (assessment.weightGain === "Yes") symptoms.push("Weight Gain")
    if (assessment.cycle === "Irregular") symptoms.push("Irregular Cycle")
    if (assessment.fastFood === "Yes") symptoms.push("Fast Food")
    if (assessment.pimples === "Yes") symptoms.push("Pimples")
    return symptoms
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assessment History
          </CardTitle>
          <CardDescription>
            Your previous PCOS assessments and results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assessment History
          </CardTitle>
          <CardDescription>
            Please log in to view your assessment history.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (assessments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assessment History
          </CardTitle>
          <CardDescription>
            No assessments found. Complete your first assessment to see results here.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assessment History
          </CardTitle>
          <CardDescription>
            {error}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

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
                                <div className="font-medium text-base">{formatDate(assessment.createdAt)}</div>
                              </div>
                              <div className="min-w-[120px] text-center">
                                <div className="text-sm text-muted-foreground">Risk Level</div>
                                <Badge className='text-xs'
                                  variant={getRiskLevelVariant(assessment.score)}
                                >
                                  {getRiskLevel(assessment.score)}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex-1 text-right max-w-xs hidden md:block">
                              <div className="text-sm text-muted-foreground">Symptoms</div>
                              <div className="text-xs text-muted-foreground">
                                {getSymptoms(assessment).join(", ")}
                              </div>
                            </div>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-96">
                          <div className="space-y-4">
                            <div className="border-b pb-2">
                              <h4 className="font-semibold text-base">Assessment Details</h4>
                              <p className="text-sm text-muted-foreground">{formatDate(assessment.createdAt)}</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">Risk Level</h5>
                                <Badge 
                                  variant={getRiskLevelVariant(assessment.score)}
                                  className="text-xs"
                                >
                                  {getRiskLevel(assessment.score)}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">Score</h5>
                                <p className="text-muted-foreground text-sm">{assessment.score?.toFixed(2) || "N/A"}</p>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">Assessment ID</h5>
                                <p className="text-muted-foreground text-sm">#{assessment.id.slice(0, 8)}</p>
                              </div>
                            </div>
                            
                            <div className="border-t pt-3">
                              <h5 className="font-medium text-sm mb-2">Symptoms</h5>
                              <div className="flex flex-wrap gap-1">
                                {getSymptoms(assessment).map((symptom, index) => (
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
                  <div className="font-medium text-base">{formatDate(assessment.createdAt)}</div>
                </div>
                <div className="min-w-[120px] text-center">
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                  <Badge className='text-xs'
                    variant={getRiskLevelVariant(assessment.score)}
                  >
                    <span className=''>
                      {getRiskLevel(assessment.score)}
                    </span>
                  </Badge>
                </div>
              </div>
              <div className="flex-1 text-right hidden md:block">
                <div className="text-sm">Symptoms</div>
                <div className="text-xs text-muted-foreground max-w-xs">
                  {getSymptoms(assessment).join(", ")}
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
