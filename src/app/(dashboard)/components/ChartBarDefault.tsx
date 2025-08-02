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

export const description = "A bar chart showing PCOS diagnoses"

const chartData = [
  { month: "January", confirmedCases: 45 },
  { month: "February", confirmedCases: 60 },
  { month: "March", confirmedCases: 52 },
  { month: "April", confirmedCases: 30 },
  { month: "May", confirmedCases: 48 },
  { month: "June", confirmedCases: 55 },
]

const chartConfig = {
  confirmedCases: {
    label: "Confirmed PCOS Cases",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarDefault() {
  return (
    <Card className="min-w-[350px]">
      <CardHeader>
        <CardTitle>PCOS Diagnoses</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="confirmedCases" fill="var(--color-confirmedCases)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing confirmed PCOS diagnoses for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}