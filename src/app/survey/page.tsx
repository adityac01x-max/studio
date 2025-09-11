import { MentalHealthSurvey } from '@/components/mental-health-survey';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SurveyPage() {
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
          Mental Health Check-in
        </h1>
      </div>
      <p className="text-muted-foreground mb-6">
        Take a few moments to complete these standard, confidential
        questionnaires to better understand your mental state.
      </p>
      <MentalHealthSurvey />
    </div>
  );
}
