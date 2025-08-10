"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A bar chart showing PCOS symptom severity"

const chartData = [
  { month: "January", severity: 65 },
  { month: "February", severity: 82 },
  { month: "March", severity: 70 },
  { month: "April", severity: 55 },
  { month: "May", severity: 78 },
  { month: "June", severity: 80 },
]

const chartConfig = {
  severity: {
    label: "Symptom Severity",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function PCOSChart() {
  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>PCOS Symptom Severity</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="severity" fill="var(--color-severity)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Symptom severity up by 3.8% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing average PCOS symptom severity scores for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}