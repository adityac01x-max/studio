
'use client';
import { AIChatbot } from '@/components/ai-chatbot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot } from 'lucide-react';
import Link from 'next/link';

export default function AiChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/lifestyle" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Lifestyle Dashboard</span>
          </Button>
        </Link>
        <div className="flex-1">
            <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
                <Bot className="w-8 h-8 text-primary"/>
                AI First-Aid Support
            </h1>
            <p className="text-muted-foreground">
            Chat with our AI assistant to get immediate coping strategies and guidance.
            </p>
        </div>
      </div>
      <div className="flex-1">
        <AIChatbot />
      </div>
    </div>
  );
}
