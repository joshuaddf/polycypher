"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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

export const description = "A radial chart showing total PCOS assessments by severity level"

const chartData = [
  { severity: "Total", low: 120, medium: 180, high: 60 },
]

const chartConfig = {
  low: {
    label: "Low Severity",
    color: "hsl(142, 71%, 45%)", // Green for Low severity
  },
  medium: {
    label: "Medium Severity",
    color: "hsl(24, 94%, 50%)", // Orange for Medium severity
  },
  high: {
    label: "High Severity",
    color: "hsl(0, 72%, 51%)", // Red for High severity
  },
} satisfies ChartConfig

export function ChartRadialStacked() {
  const totalAssessments = chartData[0].low + chartData[0].medium + chartData[0].high

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>PCOS Assessments by Severity</CardTitle>
        <CardDescription>Total Assessments in 2025</CardDescription>
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
              fill="var(--color-low)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="medium"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-medium)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="high"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-high)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm text-center">
        <div className="text-muted-foreground leading-none">
          Showing total PCOS assessments by severity level for 2025
        </div>
      </CardFooter>
    </Card>
  )
}