import { AIChatbot } from '@/components/ai-chatbot';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
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
          Feeling overwhelmed? Chat with our AI assistant to get immediate
          coping strategies and guidance. This is not a substitute for
          professional medical advice.
        </p>
        <AIChatbot />
      </div>
    </div>
  );
}
