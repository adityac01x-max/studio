
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Activity,
  ArrowLeft,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const surveyHistoryData = [
  { date: 'Jun 2024', phq9: 7, gad7: 6, cohortAvg: 9 },
  { date: 'May 2024', phq9: 5, gad7: 5, cohortAvg: 8 },
  { date: 'Apr 2024', phq9: 8, gad7: 7, cohortAvg: 10 },
  { date: 'Mar 2024', phq9: 10, gad7: 8, cohortAvg: 12 },
  { date: 'Feb 2024', phq9: 14, gad7: 11, cohortAvg: 13 },
  { date: 'Jan 2024', phq9: 12, gad7: 10, cohortAvg: 12 },
].map(d => ({ ...d, userScore: d.phq9 }));

const scoreDistribution = [
  { name: 'Minimal', value: 2, fill: 'hsl(var(--chart-2))' },
  { name: 'Mild', value: 5, fill: 'hsl(var(--chart-3))' },
  { name: 'Moderate', value: 8, fill: 'hsl(var(--chart-4))' },
  { name: 'Severe', value: 3, fill: 'hsl(var(--chart-5))' },
];

export default function HealthReportPage() {
    const getScoreInterpretation = (score: number | null, type: 'phq9' | 'gad7') => {
        if (score === null) return { level: 'N/A', color: '' };
        if (type === 'phq9') {
            if (score <= 4) return { level: 'Minimal', color: 'text-green-500' };
            if (score <= 9) return { level: 'Mild', color: 'text-yellow-500' };
            if (score <= 14) return { level: 'Moderate', color: 'text-orange-500' };
            return { level: 'Severe', color: 'text-red-500' };
        } else { // GAD-7
            if (score <= 4) return { level: 'Minimal', color: 'text-green-500' };
            if (score <= 9) return { level: 'Mild', color: 'text-yellow-500' };
            if (score <= 14) return { level: 'Moderate', color: 'text-orange-500' };
            return { level: 'Severe', color: 'text-red-500' };
        }
    };
    
    const latestPhq9Score = surveyHistoryData[0]?.phq9;
    const latestPhq9Interpretation = getScoreInterpretation(latestPhq9Score, 'phq9');

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
          <Activity className="w-8 h-8 text-primary" />
          My Health Report
        </h1>
      </div>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Track your survey history, see your trends, and understand your wellness journey.
        </p>

        <Tabs defaultValue="history">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Survey History</TabsTrigger>
            <TabsTrigger value="cohort">Cohort Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Survey History Log</CardTitle>
                    <CardDescription>A detailed record of your past survey results.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Survey</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Interpretation</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {surveyHistoryData.flatMap(entry => [
                                {survey: 'PHQ-9', score: entry.phq9, date: entry.date, type: 'phq9' as const},
                                {survey: 'GAD-7', score: entry.gad7, date: entry.date, type: 'gad7' as const}
                            ]).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map((item, index) => {
                                const interpretation = getScoreInterpretation(item.score, item.type);
                                return (
                                <TableRow key={index}>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.survey}</TableCell>
                                    <TableCell className="font-bold">{item.score}</TableCell>
                                    <TableCell>
                                        <Badge variant={interpretation.level === 'Severe' || interpretation.level === 'Moderate' ? 'destructive' : 'secondary'} className={interpretation.color}>{interpretation.level}</Badge>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cohort" className="mt-4 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Score vs. Cohort Average</CardTitle>
                        <CardDescription>
                            Comparing your PHQ-9 scores to the anonymized average of your peers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ChartContainer config={{}} className="h-[300px] w-full">
                            <ResponsiveContainer>
                                <LineChart data={surveyHistoryData}>
                                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 27]} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="userScore" name="Your Score" stroke="hsl(var(--primary))" strokeWidth={2} />
                                <Line type="monotone" dataKey="cohortAvg" name="Cohort Average" stroke="hsl(var(--chart-2))" strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Score Distribution (PHQ-9)</CardTitle>
                        <CardDescription>
                            Where your latest score falls within the general distribution of scores in your cohort.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-[300px] w-full">
                            <ResponsiveContainer>
                                <BarChart data={scoreDistribution}>
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} hide/>
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" name="Number of Students" radius={[4, 4, 0, 0]}>
                                        {scoreDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                        <div className="text-center mt-4 text-sm text-muted-foreground">Your last score ({latestPhq9Score}) falls into the '{latestPhq9Interpretation.level}' category.</div>
                    </CardContent>
                </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
