"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarIcon,
  Clock,
  FileText,
  Headset,
  Lightbulb,
  Search,
  Smile,
  Star,
  Target,
} from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Mock data for the recent interactions table
const recentInteractions = [
  {
    id: "1",
    dateTime: "May 17, 2025, 10:30 AM",
    duration: "7m 05s",
    qaScore: 95,
    csat: "5/5",
    fcr: true,
    sentiment: "positive",
  },
  {
    id: "2",
    dateTime: "May 16, 2025, 2:15 PM",
    duration: "4m 22s",
    qaScore: 92,
    csat: "4/5",
    fcr: true,
    sentiment: "neutral",
  },
  {
    id: "3",
    dateTime: "May 15, 2025, 11:45 AM",
    duration: "9m 18s",
    qaScore: 88,
    csat: "3/5",
    fcr: false,
    sentiment: "neutral",
  },
  {
    id: "4",
    dateTime: "May 14, 2025, 3:30 PM",
    duration: "5m 55s",
    qaScore: 97,
    csat: "5/5",
    fcr: true,
    sentiment: "positive",
  },
  {
    id: "5",
    dateTime: "May 13, 2025, 9:10 AM",
    duration: "12m 33s",
    qaScore: 85,
    csat: "2/5",
    fcr: false,
    sentiment: "negative",
  },
  {
    id: "6",
    dateTime: "May 12, 2025, 1:20 PM",
    duration: "6m 47s",
    qaScore: 91,
    csat: "4/5",
    fcr: true,
    sentiment: "positive",
  },
  {
    id: "7",
    dateTime: "May 11, 2025, 4:05 PM",
    duration: "3m 29s",
    qaScore: 94,
    csat: "5/5",
    fcr: true,
    sentiment: "positive",
  },
];

interface AgentKpiDashboardProps {
  agent: {
    id: string | number;
    name: string;
    email: string;
  };
  onBack: () => void;
}

export function AgentKpiDashboard({ agent, onBack }: AgentKpiDashboardProps) {
  // Date range state using react-day-picker's DateRange type
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 17), // April 17, 2025
    to: new Date(2025, 4, 17), // May 17, 2025
  });

  // Preset date ranges
  const handlePresetChange = (preset: string) => {
    const today = new Date();
    switch (preset) {
      case "last7days":
        setRange({ from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7), to: today });
        break;
      case "last30days":
        setRange({ from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30), to: today });
        break;
      case "thisMonth":
        setRange({ from: new Date(today.getFullYear(), today.getMonth(), 1), to: today });
        break;
      case "lastMonth":
        setRange({
          from: new Date(today.getFullYear(), today.getMonth() - 1, 1),
          to: new Date(today.getFullYear(), today.getMonth(), 0),
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Agents
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">{agent.name} - KPI Dashboard</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="last30days" onValueChange={handlePresetChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !range && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {range?.from ? (
                  range.to ? (
                    <>
                      {format(range.from, "LLL dd, y")} - {format(range.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(range.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
                defaultMonth={range?.from}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Interactions
              </CardTitle>
              <Headset className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">182</div>
              <p className="text-xs text-muted-foreground">
                +12% from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Handle Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5m 42s</div>
              <p className="text-xs text-muted-foreground">
                -8% from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. QA Score
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94/100</div>
              <p className="text-xs text-muted-foreground">
                +2 points from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. CSAT Score
              </CardTitle>
              <Smile className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7/5</div>
              <p className="text-xs text-muted-foreground">
                +0.3 from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">FCR Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                +5% from previous period
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* NEXUS Feature Engagement Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">NEXUS Tool Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AI Summaries Utilized
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">160</div>
              <p className="text-xs text-muted-foreground">
                87.9% of total interactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Doc Searches (NEXUS)
              </CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">110</div>
              <p className="text-xs text-muted-foreground">
                60.4% of total interactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AI Suggestions Accepted
              </CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98</div>
              <p className="text-xs text-muted-foreground">
                53.8% of total interactions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Trends (Last 30 Days)</CardTitle>
            <CardDescription>
              Tracking QA and CSAT scores over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
              <div className="text-center p-6">
                <p className="text-muted-foreground mb-2">
                  Line Chart Placeholder
                </p>
                <p className="text-xs text-muted-foreground">
                  X-Axis: Dates (May 1 - May 30)
                </p>
                <p className="text-xs text-muted-foreground">
                  Y-Axis: Score (0-100)
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs">Internal QA Score</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">CSAT Score</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Sentiment Breakdown</CardTitle>
            <CardDescription>
              Distribution of customer sentiment across interactions
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
              <div className="text-center p-6">
                <p className="text-muted-foreground mb-4">
                  Donut Chart Placeholder
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Positive: 65%</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Neutral: 25%</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Negative: 10%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Interactions Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Interactions</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Interaction ID</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>QA Score</TableHead>
                  <TableHead>CSAT</TableHead>
                  <TableHead>FCR?</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInteractions.map((interaction) => (
                  <TableRow key={interaction.id}>
                    <TableCell className="font-medium">
                      {interaction.id}
                    </TableCell>
                    <TableCell>{interaction.dateTime}</TableCell>
                    <TableCell>{interaction.duration}</TableCell>
                    <TableCell>{interaction.qaScore}</TableCell>
                    <TableCell>{interaction.csat}</TableCell>
                    <TableCell>
                      <Badge
                        variant={interaction.fcr ? "default" : "destructive"}
                      >
                        {interaction.fcr ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          interaction.sentiment === "positive"
                            ? "default"
                            : interaction.sentiment === "negative"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {interaction.sentiment.charAt(0).toUpperCase() +
                          interaction.sentiment.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Summary
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Transcript
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}