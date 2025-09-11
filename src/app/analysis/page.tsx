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

export default function AnalysisPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
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
            Understand your emotional state by providing text, voice, and a
            facial expression. This analysis is private and secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmotionalAnalysisForm />
        </CardContent>
      </Card>
    </div>
  );
}
