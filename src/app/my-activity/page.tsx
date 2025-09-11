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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

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

const accomplishments = [
  {
    icon: <Award className="w-6 h-6 text-yellow-500" />,
    title: 'Achieved "Mindful Moment" Badge',
    description: 'Completed a mindfulness exercise.',
    date: '1 week ago',
  },
  {
    icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
    title: 'Completed "Intro to CBT" Guide',
    description: 'Finished a multi-part educational resource.',
    date: '2 weeks ago',
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

export default function MyActivityPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="w-8 h-8 text-primary" />
            My Activity
          </h1>
          <p className="text-muted-foreground">
            A detailed log of your recent activities and accomplishments on the
            platform.
          </p>
        </header>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Chart</CardTitle>
              <CardDescription>
                Here is a graphical representation of your points earned this
                week.
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
                          formatter={(value, name) => [
                            `${value} points`,
                            'Points',
                          ]}
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
        </section>

        <section>
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
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>My Accomplishments</CardTitle>
              <CardDescription>
                A collection of your significant achievements and milestones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {accomplishments.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.date}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center pt-4">
                  <Link href="/badges">
                    <Button variant="outline">View All My Badges</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-center">
          <Button variant="secondary">Load More Activity</Button>
        </div>
      </div>
    </div>
  );
}
