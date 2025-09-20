
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
  CheckCircle,
  FileText,
  Bot,
  Users,
  Award,
  BookOpen,
  Trophy,
  Badge as BadgeIcon,
  Star,
  Heart,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

const recentActivities = [
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: 'Completed PHQ-9 Survey',
    description: 'You earned 10 points for checking in.',
    date: '2 days ago',
  },
  {
    icon: <Bot className="w-6 h-6 text-primary" />,
    title: 'Used AI First-Aid',
    description: 'You explored coping strategies.',
    date: '3 days ago',
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-500" />,
    title: 'Read a Guide',
    description: 'You accessed the "Managing Stress" guide.',
    date: '4 days ago',
  },
  {
    icon: <Users className="w-6 h-6 text-orange-500" />,
    title: 'Booked a Session',
    description: 'You scheduled an appointment with a counsellor.',
    date: '5 days ago',
  },
];

const activityData = [
  { day: 'Mon', points: 10 },
  { day: 'Tue', points: 0 },
  { day: 'Wed', points: 5 },
  { day: 'Thu', points: 15 },
  { day: 'Fri', points: 10 },
  { day: 'Sat', points: 0 },
  { day: 'Sun', points: 20 },
];

const badges = [
  {
    icon: <CheckCircle className="w-10 h-10 text-green-500" />,
    title: 'First Step',
    description: 'Completed your first survey.',
    unlocked: true,
  },
  {
    icon: <Heart className="w-10 h-10 text-red-500" />,
    title: 'Mindful Moment',
    description: 'Completed a mindfulness exercise.',
    unlocked: true,
  },
  {
    icon: <Star className="w-10 h-10 text-yellow-500" />,
    title: 'Streak Starter',
    description: 'Maintained a 3-day streak of check-ins.',
    unlocked: false,
  },
  {
    icon: <BadgeIcon className="w-10 h-10 text-blue-500" />,
    title: 'Resource Explorer',
    description: 'Accessed 5 resources from the hub.',
    unlocked: false,
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-green-500" />,
    title: 'Survey Superstar',
    description: 'Completed both PHQ-9 and GAD-7.',
    unlocked: true,
  },
  {
    icon: <Star className="w-10 h-10 text-yellow-500" />,
    title: 'Weekly Warrior',
    description: 'Completed all weekly goals.',
    unlocked: false,
  },
];

const leaderboardData = [
  { rank: 1, studentId: 'STU-845', points: 1250, level: 'Gold' },
  { rank: 2, studentId: 'STU-123', points: 1100, level: 'Gold' },
  { rank: 3, studentId: 'STU-456', points: 980, level: 'Silver' },
  { rank: 4, studentId: 'STU-789', points: 950, level: 'Silver' },
  { rank: 5, studentId: 'STU-234', points: 800, level: 'Bronze' },
  { rank: 6, studentId: 'STU-567', points: 750, level: 'Bronze' },
  { rank: 7, studentId: 'You', points: 745, level: 'Bronze' },
  { rank: 8, studentId: 'STU-890', points: 600, level: 'Bronze' },
  { rank: 9, studentId: 'STU-901', points: 550, level: 'Bronze' },
  { rank: 10, studentId: 'STU-112', points: 480, level: 'Bronze' },
];

const surveyHistoryData = [
  { date: 'Jun 2024', phq9: 7, gad7: 6, userScore: 7, cohortAvg: 9 },
  { date: 'May 2024', phq9: 5, gad7: 5, userScore: 5, cohortAvg: 8 },
  { date: 'Apr 2024', phq9: 8, gad7: 7, userScore: 8, cohortAvg: 10 },
  { date: 'Mar 2024', phq9: 10, gad7: 8, userScore: 10, cohortAvg: 12 },
  { date: 'Feb 2024', phq9: 14, gad7: 11, userScore: 14, cohortAvg: 13 },
  { date: 'Jan 2024', phq9: 12, gad7: 10, userScore: 12, cohortAvg: 12 },
];

const scoreDistribution = [
  { name: 'Minimal', value: 2, fill: 'hsl(var(--chart-2))' },
  { name: 'Mild', value: 5, fill: 'hsl(var(--chart-3))' },
  { name: 'Moderate', value: 8, fill: 'hsl(var(--chart-4))' },
  { name: 'Severe', value: 3, fill: 'hsl(var(--chart-5))' },
];

export default function ProgressPage() {
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

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Survey History</TabsTrigger>
            <TabsTrigger value="cohort">Cohort Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-6">
             <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Here is a list of your most recent actions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="mt-1">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.date}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Badges Earned</CardTitle>
                        <CardDescription>
                            Your collection of achievements.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        {badges.filter(b => b.unlocked).slice(0, 6).map((badge, index) => (
                            <div key={index} className="flex flex-col items-center text-center gap-2" title={`${badge.title}: ${badge.description}`}>
                                {badge.icon}
                                <p className="text-xs font-semibold">{badge.title}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Leaderboard Position</CardTitle>
                    <CardDescription>
                      Your rank in the wellness community.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="flex items-center justify-center gap-4 rounded-lg bg-muted p-6">
                          <Trophy className="w-12 h-12 text-primary" />
                          <div>
                            <p className="text-4xl font-bold">#7</p>
                            <p className="text-muted-foreground">Top 10%</p>
                          </div>
                      </div>
                  </CardContent>
                </Card>
            </div>
          </TabsContent>

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
                        <div className="text-center mt-4 text-sm text-muted-foreground">Your last score (7) falls into the 'Mild' category.</div>
                    </CardContent>
                </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
