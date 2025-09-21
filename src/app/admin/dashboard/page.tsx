
'use client';
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle,
  FileText,
  Shield,
  Users,
  PieChart as PieChartIcon,
  Siren,
  Library,
  BookUser,
  Calendar,
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
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const anonymizedTrendsData = [
  { month: 'Jan', avgPhq9: 12, avgGad7: 10 },
  { month: 'Feb', avgPhq9: 14, avgGad7: 11 },
  { month: 'Mar', avgPhq9: 10, avgGad7: 8 },
  { month: 'Apr', avgPhq9: 8, avgGad7: 7 },
  { month: 'May', avgPhq9: 5, avgGad7: 5 },
  { month: 'Jun', avgPhq9: 7, avgGad7: 6 },
];

const usageData = [
  { name: 'Surveys', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Resources', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'AI Chat', value: 200, fill: 'hsl(var(--chart-3))' },
  { name: 'Bookings', value: 150, fill: 'hsl(var(--chart-4))' },
];

const riskAlerts = [
  {
    studentId: 'STU-anon-345',
    riskLevel: 'High',
    survey: 'PHQ-9',
    score: 18,
    date: '2024-07-28',
  },
  {
    studentId: 'STU-anon-789',
    riskLevel: 'High',
    survey: 'GAD-7',
    score: 16,
    date: '2024-07-27',
  },
  {
    studentId: 'STU-anon-123',
    riskLevel: 'Moderate',
    survey: 'PHQ-9',
    score: 14,
    date: '2024-07-27',
  },
];

const cohortDemographics = [
    { name: '1st Year', value: 120, fill: 'hsl(var(--chart-1))' },
    { name: '2nd Year', value: 150, fill: 'hsl(var(--chart-2))' },
    { name: '3rd Year', value: 130, fill: 'hsl(var(--chart-3))' },
    { name: '4th Year', value: 100, fill: 'hsl(var(--chart-4))' },
    { name: 'Post-Grad', value: 80, fill: 'hsl(var(--chart-5))' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Anonymized analytics and cohort trends for student wellness.
        </p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage platform features and users.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-2 md:grid-cols-3">
          <Link href="/admin/sos" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Siren className="w-6 h-6 text-primary" />
              <span>SOS & High-Risk</span>
            </Button>
          </Link>
          <Link href="/admin/resources" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Library className="w-6 h-6 text-primary" />
              <span>Manage Resources</span>
            </Button>
          </Link>
          <Link href="/admin/peers" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Users className="w-6 h-6 text-primary" />
              <span>Manage Peers</span>
            </Button>
          </Link>
          <Link href="/admin/counselors" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <BookUser className="w-6 h-6 text-primary" />
              <span>Manage Counselors</span>
            </Button>
          </Link>
           <Link href="/admin/schedule" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              <span>Manage Schedule</span>
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
         <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users /> Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">580</div>
            <p className="text-xs text-muted-foreground">+20 since last month</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
             <FileText /> Surveys Taken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">in the last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
             <BookOpen /> Resources Accessed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">4,567</div>
            <p className="text-xs text-muted-foreground">total views</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle /> Sessions Booked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">89</div>
             <p className="text-xs text-muted-foreground">in the last 30 days</p>
          </CardContent>
        </Card>
      </div>
      

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-destructive" /> High-Risk Alerts
          </CardTitle>
          <CardDescription>
            Students who may require immediate attention based on survey
            results. All data is anonymized.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID (Anon)</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Survey</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskAlerts.map((alert) => (
                <TableRow key={alert.studentId}>
                  <TableCell className="font-medium">
                    {alert.studentId}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        alert.riskLevel === 'High' ? 'destructive' : 'default'
                      }
                      className={
                        alert.riskLevel === 'Moderate'
                          ? 'bg-orange-500'
                          : ''
                      }
                    >
                      {alert.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.survey}</TableCell>
                  <TableCell>{alert.score}</TableCell>
                  <TableCell>{alert.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BarChart3 /> Anonymized Cohort Trends
            </CardTitle>
            <CardDescription>
              Average PHQ-9 and GAD-7 scores over the past six months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={anonymizedTrendsData}>
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis domain={[0, 20]} fontSize={12} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="avgPhq9"
                    name="Avg. PHQ-9"
                    stroke="hsl(var(--chart-2))"
                  />
                  <Line
                    type="monotone"
                    dataKey="avgGad7"
                    name="Avg. GAD-7"
                    stroke="hsl(var(--chart-5))"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <PieChartIcon /> Feature Usage
            </CardTitle>
            <CardDescription>
              Breakdown of student engagement with different platform features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={usageData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {usageData.map((entry, index) => (
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
            <CardTitle className="flex items-center gap-2">
                <Users /> Cohort Demographics
            </CardTitle>
            <CardDescription>
              Distribution of student users by year of study.
            </CardDescription>
        </CardHeader>
        <CardContent>
             <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={cohortDemographics}>
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="Students">
                        {cohortDemographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
