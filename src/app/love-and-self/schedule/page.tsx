'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SchedulePage from '@/app/schedule/page';


export default function LoveAndSelfSchedulePage() {
  return (
     <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
            <Link href="/love-and-self" passHref>
            <Button variant="outline" size="icon">
                <ArrowLeft />
                <span className="sr-only">Back</span>
            </Button>
            </Link>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
                My Schedule
            </h1>
        </div>
        <SchedulePage />
    </div>
  );
}
