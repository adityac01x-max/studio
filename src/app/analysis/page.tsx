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
          <CardTitle>My Analysis</CardTitle>
          <CardDescription>
            This is a placeholder page for My Analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for My Analysis will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
