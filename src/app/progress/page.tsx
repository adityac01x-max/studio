
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

const surveyHistory = [
  { date: 'Jan', phq9: 12, gad7: 10 },
  { date: 'Feb', phq9: 14, gad7: 11 },
  { date: 'Mar', phq9: 10, gad7: 8 },
  { date: 'Apr', phq9: 8, gad7: 7 },
  { date: 'May', phq9: 5, gad7: 5 },
  { date: 'Jun', phq9: 7, gad7: 6 },
];

const activityTypeData = [
  { name: 'Surveys', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Resources', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'AI Chat', value: 200, fill: 'hsl(var(--chart-3))' },
  { name: 'Booking', value: 100, fill: 'hsl(var(--chart-4))' },
];

export default function ProgressPage() {
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
          <Trophy className="w-8 h-8 text-primary" />
          My Progress
        </h1>
      </div>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Track your activity, earn badges, and see your rank on the
          leaderboard.
        </p>

        <Tabs defaultValue="activity">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">My Activity</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="mt-4 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>
                    Points earned this week.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[250px] w-full">
                    <ResponsiveContainer>
                      <BarChart data={activityData}>
                        <XAxis
                          dataKey="day"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value} pts`}
                        />
                        <Tooltip
                          content={
                            <ChartTooltipContent
                              formatter={(value) => [`${value} points`, 'Points']}
                              cursorClassName="fill-muted"
                            />
                          }
                        />
                        <Bar
                          dataKey="points"
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Activity Breakdown</CardTitle>
                   <CardDescription>
                    Your engagement across different features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[250px] w-full">
                    <ResponsiveContainer>
                       <PieChart>
                        <Pie data={activityTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {activityTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Survey Score History (PHQ-9 & GAD-7)</CardTitle>
                <CardDescription>
                  Track your mental health survey scores over time. Lower scores are better.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                  <ResponsiveContainer>
                    <LineChart data={surveyHistory}>
                      <XAxis
                        dataKey="date"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 27]}
                      />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="phq9" name="PHQ-9" stroke="hsl(var(--chart-2))" />
                      <Line type="monotone" dataKey="gad7" name="GAD-7" stroke="hsl(var(--chart-5))" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
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
          </TabsContent>

          <TabsContent value="badges" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {badges.map((badge, index) => (
                <Card
                  key={index}
                  className={`flex flex-col items-center text-center ${
                    badge.unlocked ? '' : 'opacity-50 bg-muted/50'
                  }`}
                >
                  <CardHeader>
                    {badge.icon}
                    <CardTitle className="mt-2">{badge.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{badge.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardData.map((user) => (
                      <TableRow
                        key={user.rank}
                        className={
                          user.studentId === 'You' ? 'bg-accent/50' : ''
                        }
                      >
                        <TableCell className="font-medium text-lg">
                          {user.rank}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={`https://picsum.photos/seed/${user.studentId}/100/100`}
                              />
                              <AvatarFallback>
                                {user.studentId.slice(4, 6)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {user.studentId}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.level === 'Gold'
                                ? 'default'
                                : user.level === 'Silver'
                                ? 'secondary'
                                : 'outline'
                            }
                            className={
                              user.level === 'Gold'
                                ? 'bg-yellow-500 text-white'
                                : user.level === 'Silver'
                                ? 'bg-slate-400 text-white'
                                : ''
                            }
                          >
                            {user.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {user.points}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

    