import { EmotionalAnalysisForm } from '@/components/emotional-analysis-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AnalysisPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">
            Mood to Content Mapping
          </CardTitle>
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

    