import { CounselorConsultation } from '@/components/counselor-consultation';
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

export default function ConsultationPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Confidential Counselor Consultation
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>
            Book a private session with an on-campus counselor. Your privacy
            is our top priority.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CounselorConsultation />
        </CardContent>
      </Card>
    </div>
  );
}
