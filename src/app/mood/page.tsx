import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function MoodPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>My Mood</CardTitle>
          <CardDescription>
            This is a placeholder page for My Mood.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for My Mood will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

    