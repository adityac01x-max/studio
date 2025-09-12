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
  User,
  Shield,
  Briefcase,
} from 'lucide-react';
import { AppLogo } from '@/components/icons';

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
          <AppLogo className="w-20 h-20" />
          <h1 className="font-headline text-6xl font-bold mt-4">Anubhuti</h1>
          <p className="mt-4 text-xl text-center">
            A step towards a healthier mind. Your space for mental well-being
            and support.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-background overflow-auto">
        <div className="max-w-md w-full">
          <h2 className="font-headline text-4xl font-bold text-primary mb-8 text-center">
            Welcome to Your Wellness Space
          </h2>
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
                  <Briefcase className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>For Professionals</CardTitle>
                <CardDescription>
                  Manage sessions, view student progress, and provide support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/professional/dashboard" className="w-full" passHref>
                  <Button variant="secondary" className="w-full">Login as Professional</Button>
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
                  Manage the platform, resources, and users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/dashboard" className="w-full" passHref>
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
