"use client";

import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  PieLabelRenderProps,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChartData = {
  name: string;
  value: number;
  color: string;
};

const data: ChartData[] = [
  {
    name: "Weekly Post",
    value: 35,
    color: "#FFA726",
  },
  {
    name: "Selected Person",
    value: 20,
    color: "#42A5F5",
  },
  {
    name: "Total Verified User",
    value: 45,
    color: "#66BB6A",
  },
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;
  const safeInnerRadius = typeof innerRadius === "number" ? innerRadius : 0;
  const safeOuterRadius = typeof outerRadius === "number" ? outerRadius : 0;
  const radius = safeInnerRadius + (safeOuterRadius - safeInnerRadius) * 0.5;
  const x =
    typeof cx === "number" ? cx + radius * Math.cos(-midAngle * RADIAN) : 0;
  const y =
    typeof cy === "number" ? cy + radius * Math.sin(-midAngle * RADIAN) : 0;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DonationOverview() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="w-full  bg-white shadow-xs">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Donation Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="mx-auto aspect-square max-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                innerRadius={0}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const percentage =
                      ((payload[0].value as number) / total) * 100;
                    return (
                      <div className="rounded-lg border bg-white p-3 shadow-sm">
                        <p className="font-medium text-gray-900">
                          {payload[0].name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {payload[0].value} ({percentage.toFixed(1)}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 space-y-3  grid grid-cols-2">
          {data.map((item) => {
            // const percentage = (item?.value / total) * 100;
            return (
              <div key={item?.name}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-sm"
                      style={{ backgroundColor: item?.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {item?.name}
                    </span>
                  </div>
                  {/*   <span className="text-sm font-medium text-gray-900">
                  {percentage?.toFixed(1)}%
                </span> */}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
