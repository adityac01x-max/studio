
'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CounselorConsultation } from '@/components/counselor-consultation';
import { Button } from '@/components/ui/button';

export default function ConsultationPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/lifestyle" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Lifestyle Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Consultation & Support
        </h1>
      </div>
      <CounselorConsultation />
    </div>
  );
}

    