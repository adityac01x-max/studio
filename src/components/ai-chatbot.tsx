'use client';

import { provideAICopingStrategies } from '@/ai/flows/provide-ai-coping-strategies';
import { zodResolver } from '@hookform/resolvers/zod';
import { CornerDownLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { AppLogo } from './icons';

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  emotionalState: z.string().optional(),
});

type ChatSchema = z.infer<typeof chatSchema>;

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatSchema>({
    resolver: zodResolver(chatSchema),
  });

  const onSubmit: SubmitHandler<ChatSchema> = async (data) => {
    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: data.message };
    setMessages((prev) => [...prev, userMessage]);
    reset();

    try {
      const result = await provideAICopingStrategies({
        query: data.message,
        emotionalState: data.emotionalState || 'Not specified',
      });
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting coping strategies:', error);
      toast({
        title: 'Error',
        description: 'Could not get a response. Please try again.',
        variant: 'destructive',
      });
      // remove the user message if the API call fails
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[calc(100vh-14rem)] flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Avatar>
            <div className="bg-accent rounded-full p-2">
              <AppLogo className="w-6 h-6 text-primary" />
            </div>
          </Avatar>
          Anubhuti Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar>
                    <div className="bg-accent rounded-full p-2">
                      <AppLogo className="w-6 h-6 text-primary" />
                    </div>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar>
                  <div className="bg-accent rounded-full p-2">
                    <AppLogo className="w-6 h-6 text-primary" />
                  </div>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full items-start space-x-2"
        >
          <Input
            {...register('message')}
            placeholder="Describe how you're feeling..."
            autoComplete="off"
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CornerDownLeft className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
        {errors.message && (
          <p className="text-xs text-destructive mt-1">
            {errors.message.message}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
