'use client';
import { EmotionalAnalysisForm } from '@/components/emotional-analysis-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MoodMappingPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/love-and-self" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Mood to Content Mapping
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>
            Understand your emotional state to get content recommendations that resonate with your experience. This analysis is private and secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmotionalAnalysisForm />
        </CardContent>
      </Card>
    </div>
  );
}
