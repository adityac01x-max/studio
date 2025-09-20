
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
  BarChart,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
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
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const surveyHistoryData = {
  phq9: [
    { date: 'Jan 2024', userScore: 12, cohortAvg: 12 },
    { date: 'Feb 2024', userScore: 14, cohortAvg: 13 },
    { date: 'Mar 2024', userScore: 10, cohortAvg: 12 },
    { date: 'Apr 2024', userScore: 8, cohortAvg: 10 },
    { date: 'May 2024', userScore: 5, cohortAvg: 8 },
    { date: 'Jun 2024', userScore: 7, cohortAvg: 9 },
  ],
  gad7: [
     { date: 'Jan 2024', userScore: 10, cohortAvg: 9 },
    { date: 'Feb 2024', userScore: 11, cohortAvg: 10 },
    { date: 'Mar 2024', userScore: 8, cohortAvg: 9 },
    { date: 'Apr 2024', userScore: 7, cohortAvg: 7 },
    { date: 'May 2024', userScore: 5, cohortAvg: 6 },
    { date: 'Jun 2024', userScore: 6, cohortAvg: 7 },
  ],
  ghq12: [
    { date: 'Jan 2024', userScore: 14, cohortAvg: 15 },
    { date: 'Feb 2024', userScore: 16, cohortAvg: 16 },
    { date: 'Mar 2024', userScore: 12, cohortAvg: 14 },
    { date: 'Apr 2024', userScore: 10, cohortAvg: 12 },
    { date: 'May 2024', userScore: 8, cohortAvg: 10 },
    { date: 'Jun 2024', userScore: 9, cohortAvg: 11 },
  ]
};

const fullHistory = [
    ...surveyHistoryData.phq9.map(d => ({ survey: 'PHQ-9', score: d.userScore, date: d.date, type: 'phq9' as const })),
    ...surveyHistoryData.gad7.map(d => ({ survey: 'GAD-7', score: d.userScore, date: d.date, type: 'gad7' as const })),
    ...surveyHistoryData.ghq12.map(d => ({ survey: 'GHQ-12', score: d.userScore, date: d.date, type: 'ghq12' as const })),
].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());


const scoreDistributions = {
    phq9: [
        { name: 'Minimal', value: 20, fill: 'hsl(var(--chart-1))' },
        { name: 'Mild', value: 50, fill: 'hsl(var(--chart-2))' },
        { name: 'Moderate', value: 30, fill: 'hsl(var(--chart-3))' },
        { name: 'Severe', value: 15, fill: 'hsl(var(--chart-4))' },
    ],
    gad7: [
        { name: 'Minimal', value: 30, fill: 'hsl(var(--chart-1))' },
        { name: 'Mild', value: 45, fill: 'hsl(var(--chart-2))' },
        { name: 'Moderate', value: 25, fill: 'hsl(var(--chart-3))' },
        { name: 'Severe', value: 10, fill: 'hsl(var(--chart-4))' },
    ],
    ghq12: [
        { name: 'Low', value: 40, fill: 'hsl(var(--chart-1))' },
        { name: 'Mild', value: 35, fill: 'hsl(var(--chart-2))' },
        { name: 'Moderate', value: 20, fill: 'hsl(var(--chart-3))' },
        { name: 'Severe', value: 5, fill: 'hsl(var(--chart-4))' },
    ]
}

const getScoreInterpretation = (score: number | null, type: 'phq9' | 'gad7' | 'ghq12') => {
    if (score === null) return { level: 'N/A', color: '' };
    if (type === 'phq9') {
        if (score <= 4) return { level: 'Minimal', color: 'text-green-500' };
        if (score <= 9) return { level: 'Mild', color: 'text-yellow-500' };
        if (score <= 14) return { level: 'Moderate', color: 'text-orange-500' };
        return { level: 'Severe', color: 'text-red-500' };
    } else if (type === 'gad7') {
        if (score <= 4) return { level: 'Minimal', color: 'text-green-500' };
        if (score <= 9) return { level: 'Mild', color: 'text-yellow-500' };
        if (score <= 14) return { level: 'Moderate', color: 'text-orange-500' };
        return { level: 'Severe', color: 'text-red-500' };
    } else { // GHQ-12
        if (score <= 12) return { level: 'Low', color: 'text-green-500' };
        if (score <= 15) return { level: 'Mild', color: 'text-yellow-500' };
        if (score <= 20) return { level: 'Moderate', color: 'text-orange-500' };
        return { level: 'Severe', color: 'text-red-500' };
    }
};

const SurveyAnalysis = ({ surveyType, title, history, distribution }: { surveyType: 'phq9' | 'gad7' | 'ghq12', title: string, history: any[], distribution: any[]}) => {
    const latestScore = history[history.length - 1]?.userScore;
    const interpretation = getScoreInterpretation(latestScore, surveyType);
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><LineChartIcon/> {title} Score vs. Cohort Average</CardTitle>
                    <CardDescription>
                        Comparing your {title} scores to the anonymized average of your peers.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={{}} className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <LineChart data={history}>
                            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, surveyType === 'ghq12' ? 36 : 27]} />
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
                    <CardTitle className="flex items-center gap-2"><BarChart /> {title} Score Distribution</CardTitle>
                    <CardDescription>
                        This chart shows how many students in the cohort fall into each category. Your category is highlighted.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <RechartsBarChart data={distribution}>
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} hide/>
                                <Tooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="value" name="Number of Students" radius={[4, 4, 0, 0]}>
                                    {distribution.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.fill}
                                            opacity={entry.name === interpretation.level ? 1 : 0.3}
                                        />
                                    ))}
                                </Bar>
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                    <div className="text-center mt-4 text-sm text-muted-foreground">Your last score of <span className="font-bold text-primary">{latestScore}</span> falls into the <span className="font-bold text-primary">{interpretation.level}</span> category.</div>
                </CardContent>
            </Card>
        </div>
    )
}


export default function HealthReportPage() {
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history">History Log</TabsTrigger>
            <TabsTrigger value="phq9">PHQ-9 Analysis</TabsTrigger>
            <TabsTrigger value="gad7">GAD-7 Analysis</TabsTrigger>
            <TabsTrigger value="ghq12">GHQ-12 Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Full Survey History Log</CardTitle>
                    <CardDescription>A detailed record of all your past survey results.</CardDescription>
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
                            {fullHistory.map((item, index) => {
                                const interpretation = getScoreInterpretation(item.score, item.type);
                                return (
                                <TableRow key={index}>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.survey}</TableCell>
                                    <TableCell className="font-bold">{item.score}</TableCell>
                                    <TableCell>
                                        <Badge variant={interpretation.level.includes('Severe') || interpretation.level.includes('Moderate') ? 'destructive' : 'secondary'} className={interpretation.color}>{interpretation.level}</Badge>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phq9" className="mt-4">
            <SurveyAnalysis surveyType="phq9" title="PHQ-9" history={surveyHistoryData.phq9} distribution={scoreDistributions.phq9} />
          </TabsContent>
          
           <TabsContent value="gad7" className="mt-4">
             <SurveyAnalysis surveyType="gad7" title="GAD-7" history={surveyHistoryData.gad7} distribution={scoreDistributions.gad7} />
          </TabsContent>

           <TabsContent value="ghq12" className="mt-4">
            <SurveyAnalysis surveyType="ghq12" title="GHQ-12" history={surveyHistoryData.ghq12} distribution={scoreDistributions.ghq12} />
          </TabsContent>

        </Tabs>
      </div>
    </>
  );
}
