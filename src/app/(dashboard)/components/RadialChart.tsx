"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
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

export const description = "A radial chart showing total PCOS assessments by severity level"

const chartConfig = {
  low: {
    label: "Low Severity",
    color: "hsl(142, 71%, 45%)",
  },
  medium: {
    label: "Medium Severity",
    color: "hsl(24, 94%, 50%)",
  },
  high: {
    label: "High Severity",
    color: "hsl(0, 72%, 51%)",
  },
  veryHigh: {
    label: "Very High Severity",
    color: "hsl(0, 100%, 35%)",
  },
} satisfies ChartConfig

export function ChartRadialStacked() {
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

  const getRiskLevel = (score: number | null): string => {
    if (!score) return "unknown"
    if (score >= 25.0) return "veryHigh"
    if (score >= 15.0) return "high"
    if (score >= 8.0) return "medium"
    if (score >= 5.0) return "low"
    return "veryLow"
  }

  const processChartData = () => {
    if (assessments.length === 0) {
      return [{ severity: "Total", low: 0, medium: 0, high: 0, veryHigh: 0 }]
    }

    const severityCounts = {
      low: 0,
      medium: 0,
      high: 0,
      veryHigh: 0
    }

    assessments.forEach(assessment => {
      const level = getRiskLevel(assessment.score)
      if (level in severityCounts) {
        severityCounts[level as keyof typeof severityCounts]++
      }
    })

    return [{ severity: "Total", ...severityCounts }]
  }

  const chartData = processChartData()
  const totalAssessments = assessments.length

  if (loading) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center">
          <CardTitle>PCOS Assessments by Severity</CardTitle>
          <CardDescription>Loading assessment data...</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center">
          <div className="mx-auto aspect-square w-full max-w-[300px] flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (assessments.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center">
          <CardTitle>PCOS Assessments by Severity</CardTitle>
          <CardDescription>No assessment data available</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center">
          <div className="mx-auto aspect-square w-full max-w-[300px] flex items-center justify-center">
            <div className="text-muted-foreground text-center">
              Complete your first assessment to see data here
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>PCOS Assessments by Severity</CardTitle>
        <CardDescription>Your assessment breakdown</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalAssessments.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Assessments
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="low"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.low.color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="medium"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.medium.color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="high"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.high.color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="veryHigh"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.veryHigh.color}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm text-center">
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-4">
          {Object.entries(chartConfig).map(([key, config]) => {
            const count = chartData[0][key as keyof typeof chartData[0]] as number;
            return (
              <div key={key} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-muted-foreground">{config.label}</span>
                <span className="font-medium">{count}</span>
              </div>
            );
          })}
        </div> */}
        <div className="text-muted-foreground leading-none">
          Showing your {totalAssessments} assessment{totalAssessments !== 1 ? 's' : ''} by severity level
        </div>
      </CardFooter>
    </Card>
  )
}