
'use client';
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle,
  FileText,
  Users,
  Calendar,
  PieChart as PieChartIcon,
  MessageSquare,
  Video,
  ClipboardList,
  Milestone,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { format } from 'date-fns';


const upcomingSessions = [
  {
    studentId: 'STU-anon-789',
    time: '10:00 AM',
    date: new Date().toISOString(),
    studentAvatar: 'https://picsum.photos/seed/STU-anon-789/100/100',
    type: 'In-Person',
  },
  {
    studentId: 'STU-anon-101',
    time: '09:00 AM',
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    studentAvatar: 'https://picsum.photos/seed/STU-anon-101/100/100',
    type: 'Video Call',
  },
    {
    studentId: 'STU-anon-123',
    time: '02:00 PM',
    date: new Date().toISOString(),
    studentAvatar: 'https://picsum.photos/seed/STU-anon-123/100/100',
    type: 'Video Call',
  },
];

const highRiskStudents = [
  {
    studentId: 'STU-anon-345',
    riskLevel: 'High',
    lastSurvey: 'PHQ-9',
    score: 18,
    lastSession: '2024-07-20',
  },
  {
    studentId: 'STU-anon-789',
    riskLevel: 'High',
    lastSurvey: 'GAD-7',
    score: 16,
    lastSession: 'N/A',
  },
];

const studentCaseload = [
  { month: 'Jan', students: 15 },
  { month: 'Feb', students: 18 },
  { month: 'Mar', students: 22 },
  { month: 'Apr', students: 20 },
  { month: 'May', students: 25 },
  { month: 'Jun', students: 28 },
];

const featureUsageData = [
  { name: 'Surveys', value: 120, fill: 'hsl(var(--chart-1))' },
  { name: 'Resources', value: 90, fill: 'hsl(var(--chart-2))' },
  { name: 'AI Chat', value: 60, fill: 'hsl(var(--chart-3))' },
  { name: 'Bookings', value: 45, fill: 'hsl(var(--chart-4))' },
];

const sessionTypeData = [
    { name: 'In-Person', count: 35, fill: 'hsl(var(--chart-5))'},
    { name: 'Video Call', count: 54, fill: 'hsl(var(--chart-2))'},
]

export default function ProfessionalDashboardPage() {
  const todaysSessions = upcomingSessions.filter(
    session => format(new Date(session.date), 'PPP') === format(new Date(), 'PPP')
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome, Dr. Sharma
        </h1>
        <p className="text-muted-foreground">
          Here's your dashboard for today.
        </p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access your main tools and features.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Link href="/professional/students" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Users className="w-6 h-6 text-primary" />
              <span>Manage Students</span>
            </Button>
          </Link>
          <Link href="/professional/schedule" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              <span>My Schedule</span>
            </Button>
          </Link>
          <Link href="/professional/chat" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              <span>Student Chat</span>
            </Button>
          </Link>
          <Link href="/professional/video" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Video className="w-6 h-6 text-primary" />
              <span>Video Calls</span>
            </Button>
          </Link>
          <Link href="/professional/questionnaires" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <ClipboardList className="w-6 h-6 text-primary" />
              <span>Questionnaires</span>
            </Button>
          </Link>
          <Link href="/professional/rooms" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Milestone className="w-6 h-6 text-primary" />
              <span>Community Rooms</span>
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users /> Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              Currently assigned
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar /> Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText /> Reports to Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">New survey results</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="text-destructive" /> High-Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-destructive" /> Priority: High-Risk
              Students
            </CardTitle>
            <CardDescription>
              Students who have recently been flagged as high-risk.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID (Anon)</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Last Survey</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Last Session</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highRiskStudents.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell className="font-medium">
                      {student.studentId}
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{student.riskLevel}</Badge>
                    </TableCell>
                    <TableCell>{student.lastSurvey}</TableCell>
                    <TableCell>{student.score}</TableCell>
                    <TableCell>{student.lastSession}</TableCell>
                    <TableCell className="text-right">
                      <Link href="/professional/students" passHref>
                        <Button size="sm">View Profile</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Today</CardTitle>
            <CardDescription>Your next sessions for today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysSessions.length > 0 ? todaysSessions.map((session) => (
              <div
                key={session.studentId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={session.studentAvatar} />
                    <AvatarFallback>
                      {session.studentId.slice(-2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{session.studentId}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.time}
                    </p>
                  </div>
                </div>
                {session.type === 'Video Call' ? (
                  <Link
                    href={`/professional/video?studentId=${session.studentId}`}
                    passHref
                  >
                    <Button variant="secondary" size="sm">
                      Start
                    </Button>
                  </Link>
                ) : (
                  <Button variant="secondary" size="sm" disabled>
                    In-Person
                  </Button>
                )}
              </div>
            )) : <p className="text-sm text-muted-foreground">No sessions scheduled for today.</p>}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon /> Student Feature Engagement
            </CardTitle>
            <CardDescription>
              Breakdown of how your students are using the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={featureUsageData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {featureUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BarChart3 /> Session Type Breakdown
            </CardTitle>
            <CardDescription>
                Distribution of in-person vs. video call sessions.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer>
                <BarChart data={sessionTypeData} layout="vertical">
                    <XAxis type="number" hide/>
                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" name="Sessions" radius={5}>
                         {sessionTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 /> Student Caseload Growth
          </CardTitle>
          <CardDescription>
            Number of students assigned to you over the past six months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer>
              <LineChart data={studentCaseload}>
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} allowDecimals={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="students"
                  name="Students"
                  stroke="hsl(var(--primary))"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
