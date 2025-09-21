
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Calendar,
  FileText,
  Bot,
  Activity,
  Trophy,
  BarChart2,
  Users,
  NotebookText,
  Library,
  FileWarning,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

function DiamondIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
    </svg>
  );
}

function FlameIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function SmileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

function FrownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

function MehIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="8" x2="16" y1="15" y2="15" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome back!
        </h1>
        <p className="text-muted-foreground">
          Here's your mental wellness overview for today.
        </p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Explore your tools and support options.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Link href="/survey" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <FileText className="w-6 h-6 text-primary" />
              <span>Surveys</span>
            </Button>
          </Link>
          <Link href="/analysis" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <BarChart2 className="w-6 h-6 text-primary" />
              <span>Analysis</span>
            </Button>
          </Link>
           <Link href="/projective-tests" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <FileWarning className="w-6 h-6 text-primary" />
              <span>Projective Tests</span>
            </Button>
          </Link>
          <Link href="/health-report" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Activity className="w-6 h-6 text-primary" />
              <span>Health Report</span>
            </Button>
          </Link>
          <Link href="/progress" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              <span>My Progress</span>
            </Button>
          </Link>
          <Link href="/journal" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <NotebookText className="w-6 h-6 text-primary" />
              <span>My Journal</span>
            </Button>
          </Link>
          <Link href="/resources" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Library className="w-6 h-6 text-primary" />
              <span>Resource Hub</span>
            </Button>
          </Link>
          <Link href="/consultation" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Users className="w-6 h-6 text-primary" />
              <span>Consultation</span>
            </Button>
          </Link>
           <Link href="/student-chat" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              <span>My Chats</span>
            </Button>
          </Link>
          <Link href="/schedule" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              <span>My Schedule</span>
            </Button>
          </Link>
          <Link href="/chat" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Bot className="w-6 h-6 text-primary" />
              <span>AI First-Aid</span>
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Weekly Progress</CardTitle>
            <CardDescription>
              You've completed 2 of 5 wellness goals this week. Keep it up!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={40} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Next goal: Complete a GAD-7 survey.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>
              Engage more, earn more.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DiamondIcon className="w-6 h-6 text-primary" />
              <div>
                <div className="font-bold">30</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FlameIcon className="w-6 h-6 text-primary" />
              <div>
                <div className="font-bold">1</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
            <div className="col-span-2">
              <Link href="/progress" passHref>
                <Button className="w-full">
                  <Trophy className="w-5 h-5 mr-2" />
                  View My Progress
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>
            A quick check-in helps us personalize your experience. You'll earn 5
            points!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-around">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-2 h-auto"
          >
            <FrownIcon className="w-8 h-8 text-red-500" />
            <span className="text-sm font-medium">Not Good</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-2 h-auto"
          >
            <MehIcon className="w-8 h-8 text-yellow-500" />
            <span className="text-sm font-medium">Okay</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-2 h-auto"
          >
            <SmileIcon className="w-8 h-8 text-green-500" />
            <span className="text-sm font-medium">Good</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
