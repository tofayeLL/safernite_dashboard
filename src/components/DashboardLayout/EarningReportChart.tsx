/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetEarningChartDataQuery } from "@/redux/api/adminApi";
import { Loading } from "../ui/loading";
import { useMemo } from "react";

// Sample data for the chart (fallback data)
const dummyData = [
  { month: "Jan", activity: 85, displayActivity: 85, fullMonth: "January" },
  { month: "Feb", activity: 110, displayActivity: 110, fullMonth: "February" },
  { month: "Mar", activity: 78, displayActivity: 78, fullMonth: "March" },
  { month: "Apr", activity: 72, displayActivity: 72, fullMonth: "April" },
  { month: "May", activity: 91, displayActivity: 91, fullMonth: "May" },
  { month: "Jun", activity: 95, displayActivity: 95, fullMonth: "June" },
  { month: "Jul", activity: 82, displayActivity: 82, fullMonth: "July" },
  { month: "Aug", activity: 88, displayActivity: 88, fullMonth: "August" },
  { month: "Sep", activity: 75, displayActivity: 75, fullMonth: "September" },
  { month: "Oct", activity: 63, displayActivity: 63, fullMonth: "October" },
  { month: "Nov", activity: 45, displayActivity: 45, fullMonth: "November" },
  { month: "Dec", activity: 52, displayActivity: 52, fullMonth: "December" },
];

interface ChartDataItem {
  month: string;
  activity: number;
  displayActivity: number;
  fullMonth: string;
  isHighlighted?: boolean;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="border border-gray-200 rounded-lg p-3 space-y-1 shadow-lg bg-white z-50 max-w-[200px]">
        <p className="text-gray-800 font-normal">{`${data.fullMonth} `}</p>
        <p className="font-bold">
         ${data.activity.toLocaleString()}
        </p>
        {data.isHighlighted && (
          <p className="text-green-600 font-medium">
            Highest Performance
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function CasesReportChart() {
  // All earning chart data
  const { data: AllChartData, isLoading } = useGetEarningChartDataQuery({});
  
  // Process and prepare chart data
  const { chartData, totalGrowth, hasBackendData } = useMemo(() => {
    const backendData = AllChartData?.result || [];
    const hasData = backendData.length > 0;
    
    let processedData: ChartDataItem[];
    let growth = 0;
    
    if (hasData) {
      // Find the highest value to highlight
      const maxValue = Math.max(...backendData.map((item: any) => item.donation));
      
      // Map backend data with highlighting
      processedData = backendData.map((item: any) => ({
        month: item.month,
        activity: item.donation,
        displayActivity: item.displayDonation || item.donation,
        fullMonth: item.fullMonth,
        isHighlighted: item.donation === maxValue,
      }));
      
      // Calculate growth percentage if we have more than one data point
      if (backendData.length > 1) {
        const sortedData = [...backendData].sort((a, b) => {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return months.indexOf(a.month) - months.indexOf(b.month);
        });
        
        const firstValue = sortedData[0].donation;
        const lastValue = sortedData[sortedData.length - 1].donation;
        
        if (firstValue > 0) {
          growth = Math.round(((lastValue - firstValue) / firstValue) * 100);
        }
      }
    } else {
      // Use dummy data with highlighting
      const maxValue = Math.max(...dummyData.map(item => item.activity));
      processedData = dummyData.map(item => ({
        ...item,
        isHighlighted: item.activity === maxValue,
      }));
      growth = 67; // Default growth for dummy data
    }
    
    return {
      chartData: processedData,
      totalGrowth: growth,
      hasBackendData: hasData,
    };
  }, [AllChartData]);

  // Calculate Y-axis domain dynamically
  const yAxisDomain = useMemo(() => {
    if (chartData.length === 0) return [0, 100];
    
    const maxValue = Math.max(...chartData.map(item => item.displayActivity));
    const padding = Math.ceil(maxValue * 0.1); // 10% padding
    return [0, maxValue + padding];
  }, [chartData]);

  // Generate Y-axis ticks dynamically
  const yAxisTicks = useMemo(() => {
    const [min, max] = yAxisDomain;
    const tickCount = 6;
    const step = Math.ceil((max - min) / (tickCount - 1));
    return Array.from({ length: tickCount }, (_, i) => min + (i * step));
  }, [yAxisDomain]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-white rounded-2xl shadow-sm border">
        <div className="flex items-center justify-center space-x-2">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full bg-white flex flex-col rounded-2xl shadow-sm border border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">
            Earning Report
          </CardTitle>
          {!hasBackendData && (
            <p className="text-sm text-gray-500">Showing sample data</p>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gradient-to-r from-cyan-400 to-teal-400 h-4 w-4 rounded shadow-sm"></div>
            <span className="text-sm font-medium text-gray-700">Earning</span>
          </div>
          
          {totalGrowth !== 0 && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
              <span className="text-sm font-semibold text-green-700">
                Total Growth: {totalGrowth > 0 ? '+' : ''}{totalGrowth}%
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="w-full h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.2)"
                horizontal={true}
                vertical={false}
              />
              
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 14, 
                  fill: "#64748b",
                  fontWeight: 500 
                }}
                dy={10}
              />
              
              <YAxis
                domain={yAxisDomain}
                ticks={yAxisTicks}
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 14, 
                  fill: "#64748b",
                  fontWeight: 500 
                }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ 
                  fill: "rgba(59, 130, 246, 0.08)",
                  radius: 4 
                }}
                wrapperStyle={{ outline: "none" }}
              />
              
              <Bar
                dataKey="displayActivity"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
              >
                {chartData.map((entry: ChartDataItem, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.isHighlighted 
                        ? "url(#highlightGradient)" 
                        : "url(#normalGradient)"
                    }
                    className="hover:opacity-80 transition-opacity duration-200"
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </Bar>
              
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="highlightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="100%" stopColor="#08E9DB" />
                  <stop offset="100%" stopColor="#08E9DB" />
                </linearGradient>
                <linearGradient id="normalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="100%" stopColor="#08E9DB66" />
                  <stop offset="100%" stopColor="#08E9DB66" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Additional info section */}
       {/*  <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Data Status: <span className="font-medium text-gray-900">
                {hasBackendData ? `${chartData.length} months of live data` : 'Sample data'}
              </span>
            </span>
            <span className="text-gray-600">
              Total Records: <span className="font-medium text-gray-900">
                {chartData.length}
              </span>
            </span>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}