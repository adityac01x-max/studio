'use client';
import { CounselorConsultation } from "@/components/counselor-consultation";
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
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/love-and-self" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Consultation
        </h1>
      </div>
      <p className="text-muted-foreground mb-6">
        Connect with peer supporters, college counselors, and nearby professionals who understand the LGBTQIA+ community.
      </p>
      <CounselorConsultation />
    </div>
  );
}
