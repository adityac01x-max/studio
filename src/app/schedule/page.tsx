import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SchedulePage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader>
          <CardTitle>My Schedule</CardTitle>
          <CardDescription>
            This is a placeholder page for My Schedule.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for My Schedule will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
