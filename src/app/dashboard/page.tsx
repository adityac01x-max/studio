import { EmotionalAnalysisForm } from '@/components/emotional-analysis-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome to Anubhuti
        </h1>
        <p className="text-muted-foreground">
          Your personal guide to understanding and nurturing your mental
          well-being.
        </p>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline">
              Multi-Modal Emotional Analysis
            </CardTitle>
            <CardDescription>
              Gain a deeper understanding of your current emotional state.
              Provide a text description, a photo of your facial expression, and
              a short voice recording to receive a comprehensive analysis. Your
              data is private and processed securely.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmotionalAnalysisForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
