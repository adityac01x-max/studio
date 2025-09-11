import { MentalHealthSurvey } from '@/components/mental-health-survey';

export default function SurveyPage() {
  return (
    <div>
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">
        Mental Health Check-in
      </h1>
      <p className="text-muted-foreground mb-6">
        Take a few moments to complete these standard, confidential
        questionnaires to better understand your mental state.
      </p>
      <MentalHealthSurvey />
    </div>
  );
}

    