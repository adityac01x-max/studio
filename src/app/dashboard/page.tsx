import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, FileText, Heart, Bot } from 'lucide-react';
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
    <div className="flex-1 p-6 md:p-8 space-y-6 bg-[#FEF9F6]">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome back!
        </h1>
        <p className="text-muted-foreground">
          Here's your mental wellness overview for today.
        </p>
      </div>
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
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Points
              </CardTitle>
              <DiamondIcon className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Day Streak</CardTitle>
              <FlameIcon className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
        </div>
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
          <div className="flex flex-col items-center gap-2">
            <FrownIcon className="w-8 h-8 text-red-500" />
            <span className="text-sm font-medium">Not Good</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MehIcon className="w-8 h-8 text-yellow-500" />
            <span className="text-sm font-medium">Okay</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SmileIcon className="w-8 h-8 text-green-500" />
            <span className="text-sm font-medium">Good</span>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">
          Explore Your Tools
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <FileText className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Take a Survey</CardTitle>
              <CardDescription>
                Check in with your mental state using professional surveys.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/survey" passHref>
                <Button variant="ghost" className="text-primary p-0">
                  Start Survey <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Bot className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Resource Hub</CardTitle>
              <CardDescription>
                Discover AI-recommended content to help you relax and reflect.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/resources" passHref>
                <Button variant="ghost" className="text-primary p-0">
                  Explore Hub <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Calendar className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                You have a session with Dr. Anita scheduled for tomorrow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/schedule" passHref>
                <Button variant="ghost" className="text-primary p-0">
                  View Schedule <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
