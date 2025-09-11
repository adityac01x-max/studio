
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Siren, PieChart as PieChartIcon, AlertTriangle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Pie,
  PieChart,
  Line,
  LineChart,
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

const riskAlerts = [
  {
    studentId: 'STU-anon-345',
    riskLevel: 'High',
    survey: 'PHQ-9',
    score: 18,
    date: '2024-07-28',
    actionTaken: true,
  },
  {
    studentId: 'STU-anon-789',
    riskLevel: 'High',
    survey: 'GAD-7',
    score: 16,
    date: '2024-07-27',
    actionTaken: false,
  },
  {
    studentId: 'STU-anon-123',
    riskLevel: 'Moderate',
    survey: 'PHQ-9',
    score: 14,
    date: '2024-07-27',
    actionTaken: true,
  },
  {
    studentId: 'STU-anon-999',
    riskLevel: 'Moderate',
    survey: 'GAD-7',
    score: 12,
    date: '2024-07-26',
    actionTaken: false,
  },
   {
    studentId: 'STU-anon-888',
    riskLevel: 'Low',
    survey: 'PHQ-9',
    score: 8,
    date: '2024-07-25',
    actionTaken: true,
  },
];

const riskDistribution = [
    { name: 'High', value: 2, fill: 'hsl(var(--destructive))' },
    { name: 'Moderate', value: 2, fill: 'hsl(var(--chart-4))' },
    { name: 'Low', value: 1, fill: 'hsl(var(--chart-2))' },
]

const alertsOverTime = [
    { month: 'Jan', alerts: 5 },
    { month: 'Feb', alerts: 8 },
    { month: 'Mar', alerts: 6 },
    { month: 'Apr', alerts: 4 },
    { month: 'May', alerts: 2 },
    { month: 'Jun', alerts: 3 },
]

export default function AdminSosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
            <Siren className="w-8 h-8 text-destructive" />
            SOS & High-Risk Management
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage students identified as high-risk.
          </p>
        </div>
      </div>

       <div className="grid gap-6 md:grid-cols-2">
           <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <PieChartIcon />
                    Risk Level Distribution
                </CardTitle>
                <CardDescription>
                    Breakdown of current high-risk alerts by severity.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[250px] w-full">
                    <ResponsiveContainer>
                        <PieChart>
                        <Pie
                            data={riskDistribution}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                        >
                            {riskDistribution.map((entry, index) => (
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
                    <CardTitle className='flex items-center gap-2'>
                        <AlertTriangle />
                        Alerts Over Time
                    </CardTitle>
                    <CardDescription>
                        Number of high-risk alerts generated per month.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[250px] w-full">
                         <ResponsiveContainer>
                            <LineChart data={alertsOverTime}>
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} allowDecimals={false} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Line
                                    type="monotone"
                                    dataKey="alerts"
                                    name="Alerts"
                                    stroke="hsl(var(--destructive))"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
           </card>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>High-Risk Student Reports</CardTitle>
          <CardDescription>
            A log of all students who have been flagged as high-risk.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID (Anon)</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Trigger Survey</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action Taken</TableHead>
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
                          : alert.riskLevel === 'Low' ? 'bg-green-500' : ''
                      }
                    >
                      {alert.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.survey}</TableCell>
                  <TableCell>{alert.score}</TableCell>
                  <TableCell>{alert.date}</TableCell>
                  <TableCell>
                      <Checkbox checked={alert.actionTaken} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
