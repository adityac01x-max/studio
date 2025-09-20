'use client';
import { AIChatbot } from '@/components/ai-chatbot';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AiChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/love-and-self" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          AI First-Aid Support
        </h1>
      </div>
      <div className="flex-1">
        <p className="text-muted-foreground mb-6">
          Get immediate, confidential support from our AI assistant, trained to understand the unique challenges of the LGBTQIA+ community.
        </p>
        <AIChatbot />
      </div>
    </div>
  );
}
