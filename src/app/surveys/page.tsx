import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SurveysPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader>
          <CardTitle>Surveys</CardTitle>
          <CardDescription>
            This is a placeholder page for Surveys.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for Surveys will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
