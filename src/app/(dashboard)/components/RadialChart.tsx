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

export const description = "A radial chart showing PCOS diagnosis distribution"

const chartData = [{ month: "June", confirmedCases: 55, pendingCases: 20 }]

const chartConfig = {
  confirmedCases: {
    label: "Confirmed PCOS Cases",
    color: "var(--chart-1)",
  },
  pendingCases: {
    label: "Pending PCOS Cases",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartRadialStacked() {
  const totalCases = chartData[0].confirmedCases + chartData[0].pendingCases

  return (
    <Card className="flex flex-col min-w-[150px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>PCOS Diagnosis Distribution</CardTitle>
        <CardDescription>June 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[150px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={60}
            outerRadius={100}
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
                          y={(viewBox.cy || 0) - 12}
                          className="fill-foreground text-xl font-bold"
                        >
                          {totalCases.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground text-sm"
                        >
                          Total Cases
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="confirmedCases"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-confirmedCases)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="pendingCases"
              fill="var(--color-pendingCases)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing PCOS diagnosis distribution for June 2025
        </div>
      </CardFooter>
    </Card>
  )
}