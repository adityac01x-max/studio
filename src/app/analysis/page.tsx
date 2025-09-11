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
    <div className="flex-1 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">
            Multimodal Emotional Analysis
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
