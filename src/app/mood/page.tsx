import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MoodPage() {
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
          My Mood
        </h1>
      </div>
      <Card>
        <CardHeader>
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
