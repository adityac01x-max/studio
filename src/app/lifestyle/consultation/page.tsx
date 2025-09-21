
'use client';
import { CounselorConsultation } from "@/components/counselor-consultation";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ConsultationPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/lifestyle" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Lifestyle Dashboard</span>
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Consultation
          </h1>
           <p className="text-muted-foreground">
            Connect with peer supporters, college counselors, and nearby professionals.
          </p>
        </div>
      </div>
       <CounselorConsultation />
    </div>
  );
}
