import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, BrainCircuit, Bike, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { AppLogo } from '@/components/icons';

export default function StudentLoginPage() {
  return (
    <div className="flex h-screen">
      <div className="relative w-1/2 hidden md:block">
        <Image
          src="https://picsum.photos/seed/student-login/1200/1600"
          alt="A person looking at a sunset"
          fill
          className="object-cover"
          data-ai-hint="person sunset"
        />
        <div className="absolute inset-0 bg-primary/80 flex flex-col justify-center items-center text-primary-foreground p-8">
          <AppLogo className="w-20 h-20" />
          <h1 className="font-headline text-6xl font-bold mt-4">Anubhuti</h1>
          <p className="mt-4 text-xl text-center">
            Choose your path to wellness.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-background overflow-auto relative">
        <Link href="/" passHref>
            <Button variant="outline" size="icon" className="absolute top-8 left-8">
                <ArrowLeft />
                <span className="sr-only">Back</span>
            </Button>
        </Link>
        <div className="max-w-md w-full text-center">
          <h2 className="font-headline text-4xl font-bold text-primary mb-4">
            How can we help you today?
          </h2>
          <p className="text-muted-foreground mb-8">
            Select an area to focus on for this session.
          </p>
          <div className="space-y-6">
            <Link href="/dashboard" passHref>
              <Card className="text-left hover:border-primary transition-colors">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <BrainCircuit className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Mental Health & Content</CardTitle>
                    <CardDescription>
                      Access surveys, resources, and professional support.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/love-and-self" passHref>
              <Card className="text-left hover:border-primary transition-colors">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Love & Self</CardTitle>
                    <CardDescription>
                      Explore relationships, self-esteem, and personal growth.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/lifestyle" passHref>
              <Card className="text-left hover:border-primary transition-colors">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <Bike className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Lifestyle & Fitness</CardTitle>
                    <CardDescription>
                      Discover exercises and tips for a healthy body and mind.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
