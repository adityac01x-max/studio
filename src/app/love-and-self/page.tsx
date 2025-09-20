import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


export default function LoveAndSelfPage() {
  return (
     <div className="p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4 mb-6">
            <Link href="/student-login" passHref>
            <Button variant="outline" size="icon">
                <ArrowLeft />
                <span className="sr-only">Back</span>
            </Button>
            </Link>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
                Love & Self
            </h1>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
                This section is under construction.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <p>Content related to relationships, self-esteem, and personal growth will be available here soon.</p>
            </CardContent>
        </Card>
    </div>
  );
}
