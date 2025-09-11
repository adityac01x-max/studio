import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Bot,
  Users,
  BarChart,
  BookOpen,
  User,
  Shield,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex h-screen">
      <div className="relative w-1/2 hidden md:block">
        <Image
          src="https://picsum.photos/seed/tricycle/1200/1600"
          alt="A red tricycle"
          fill
          className="object-cover"
          data-ai-hint="tricycle street"
        />
        <div className="absolute inset-0 bg-primary/80 flex flex-col justify-center items-center text-primary-foreground p-8">
          <h1 className="font-headline text-6xl font-bold">Anubhuti</h1>
          <p className="mt-4 text-xl text-center">
            A step towards a healthier mind. Your space for mental well-being
            and support.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-background overflow-auto">
        <div className="max-w-md w-full">
          <h2 className="font-headline text-4xl font-bold text-primary mb-4 text-center">
            Welcome to Your Wellness Space
          </h2>
          <div className="space-y-4 my-8">
            <div className="flex items-start gap-4">
              <Bot className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-semibold">AI-Powered Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized mood analysis and resource recommendations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-semibold">Connect & Consult</h3>
                <p className="text-sm text-muted-foreground">
                  Reach out to peers, counselors, and professionals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BarChart className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-semibold">Track Your Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize your mental wellness journey over time.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-semibold">Resource Hub</h3>
                <p className="text-sm text-muted-foreground">
                  Access curated content to support your well-being.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-accent/20 rounded-full">
                  <User className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>For Students</CardTitle>
                <CardDescription>
                  Access resources, track your progress, and connect with
                  support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard" className="w-full" passHref>
                  <Button className="w-full">Login as Student</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-accent/20 rounded-full">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>For Admin</CardTitle>
                <CardDescription>
                  Manage schedules, view anonymous reports, and support your
                  students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard" className="w-full" passHref>
                  <Button variant="outline" className="w-full">
                    Login as Admin
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
