import { AIChatbot } from '@/components/ai-chatbot';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 md:p-6">
        <h1 className="font-headline text-2xl font-bold tracking-tight mb-4">
          AI First-Aid Support
        </h1>
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
