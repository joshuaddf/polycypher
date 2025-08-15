"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useState, useEffect } from "react"
import { getAssessments } from "@/lib/services/assessmentService"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

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

export const description = "A bar chart showing PCOS symptom severity"

const chartConfig = {
  severity: {
    label: "Symptom Severity",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function PCOSChart() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await getAssessments()
        setAssessments(data || [])
      } catch (error) {
        console.error('Error fetching assessments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssessments()
  }, [])

  const processChartData = () => {
    if (assessments.length === 0) {
      return []
    }

    const recentAssessments = assessments.slice(0, 6)
    
    return recentAssessments.map((assessment, index) => {
      const date = new Date(assessment.createdAt)
      const monthName = date.toLocaleDateString('en-US', { month: 'short' })
      
      return {
        month: monthName,
        severity: assessment.score || 0,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }
    }).reverse()
  }

  const calculateTrend = () => {
    if (assessments.length < 2) return { percentage: 0, direction: 'neutral' }
    
    const recent = assessments.slice(0, 2)
    const current = recent[0]?.score || 0
    const previous = recent[1]?.score || 0
    
    if (previous === 0) return { percentage: 0, direction: 'neutral' }
    
    const percentage = ((current - previous) / previous) * 100
    return {
      percentage: Math.abs(percentage).toFixed(1),
      direction: percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'neutral'
    }
  }

  const chartData = processChartData()
  const trend = calculateTrend()

  if (loading) {
    return (
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>PCOS Symptom Severity</CardTitle>
          <CardDescription>Loading assessment data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (assessments.length === 0) {
    return (
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>PCOS Symptom Severity</CardTitle>
          <CardDescription>No assessment data available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-muted-foreground">Complete your first assessment to see data here</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>PCOS Symptom Severity</CardTitle>
        <CardDescription>Recent assessment scores</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="severity" fill={chartConfig.severity.color} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {assessments.length >= 2 ? (
          <div className="flex gap-2 leading-none font-medium">
            {trend.direction === 'up' && <TrendingUp className="h-4 w-4" />}
            {trend.direction === 'down' && <TrendingUp className="h-4 w-4 rotate-180" />}
            Symptom severity {trend.direction === 'up' ? 'up' : trend.direction === 'down' ? 'down' : 'unchanged'} by {trend.percentage}% this month
          </div>
        ) : (
          <div className="flex gap-2 leading-none font-medium">
            First assessment completed
          </div>
        )}
        <div className="text-muted-foreground leading-none">
          Showing PCOS symptom severity scores from your {assessments.length} assessment{assessments.length !== 1 ? 's' : ''}
        </div>
      </CardFooter>
    </Card>
  )
}