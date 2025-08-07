"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

export const description = "A bar chart showing feature correlations with PCOS";

const chartData = [
  { feature: "Follicle No. (R)", correlation: 0.648327 },
  { feature: "Follicle No. (L)", correlation: 0.603346 },
  { feature: "Skin darkening", correlation: 0.475733 },
  { feature: "Hair growth", correlation: 0.464667 },
  { feature: "Weight gain", correlation: 0.441047 },
  { feature: "Cycle (R/I)", correlation: 0.401644 },
  { feature: "Fast food", correlation: 0.377933 },
  { feature: "Pimples", correlation: 0.286077 },
  { feature: "AMH (ng/mL)", correlation: 0.263863 },
  { feature: "Weight (Kg)", correlation: 0.211938 },
];

const chartConfig = {
  correlation: {
    label: "Correlation with PCOS",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarDefault({ data = chartData }) {
  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>Feature Correlations with PCOS</CardTitle>
        <CardDescription>Key Indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="feature"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)} // Shorten long labels
            />
            <YAxis
              domain={[0, 1]} // Correlations range from 0 to 1
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="correlation"
              fill="var(--color-correlation)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Follicle numbers show strongest correlation <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing correlation coefficients for PCOS-related features
        </div>
      </CardFooter>
    </Card>
  );
}