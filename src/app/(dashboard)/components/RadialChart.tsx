"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radial chart showing symptom severity distribution";

const chartData = [
  { name: "Mild", value: 2, fill: "var(--chart-1)" },
  { name: "Moderate", value: 3, fill: "var(--chart-2)" },
  { name: "Severe", value: 2, fill: "var(--chart-3)" },
];

const chartConfig = {
  mild: {
    label: "Mild",
    color: "var(--chart-1)",
  },
  moderate: {
    label: "Moderate",
    color: "var(--chart-2)",
  },
  severe: {
    label: "Severe",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartRadialStacked({ data = chartData }: {
  data?: {
    name: string;
    value: number;
    fill: string;
  }[]
}) {
  const totalCases = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="flex flex-col min-w-[150px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Symptom Severity Distribution</CardTitle>
        <CardDescription>October 2023 - January 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[150px]"
        >
          <RadialBarChart
            data={data}
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
                          Total Assessments
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="value"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Moderate severity most common <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing symptom severity distribution across assessments
        </div>
      </CardFooter>
    </Card>
  );
}