import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ConsultationPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader>
          <CardTitle>Consultation</CardTitle>
          <CardDescription>
            This is a placeholder page for Consultation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for Consultation will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
