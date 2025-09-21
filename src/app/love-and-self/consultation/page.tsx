
'use client';
import { CounselorConsultation } from "@/components/counselor-consultation";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ConsultationPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/love-and-self" passHref>
          <Button variant="outline" size="icon" className="text-white border-white/50 hover:bg-white/10 hover:text-white">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-headline text-3xl font-bold tracking-tight text-white">
            Consultation
          </h1>
           <p className="text-muted-foreground text-white/80">
            Connect with peer supporters, college counselors, and nearby professionals who understand the LGBTQIA+ community.
          </p>
        </div>
      </div>
      <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg">
        <CounselorConsultation />
      </div>
    </div>
  );
}

    