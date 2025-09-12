
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

export default function ProfessionalChatPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4 mb-6">
         <Link href="/professional/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Student Chat
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Student Chat</CardTitle>
          <CardDescription>
            This is a placeholder page for the professional to chat with students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>A list of student conversations and a chat interface will be built here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
