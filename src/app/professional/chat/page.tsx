
'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useChat, Message } from '@/hooks/use-chat';

const conversations = [
  {
    id: 'student-345_professional-sharma',
    name: 'Student 345',
    avatar: 'https://picsum.photos/seed/STU-anon-345/100/100',
    lastMessage: 'Thank you for the advice, I will try that.',
    timestamp: '10:42 AM',
    unread: 0,
  },
  {
    id: 'student-789_professional-sharma',
    name: 'Student 789',
    avatar: 'https://picsum.photos/seed/STU-anon-789/100/100',
    lastMessage: "I'm feeling really anxious about my exams.",
    timestamp: '9:15 AM',
    unread: 2,
  },
  {
    id: 'student-123_professional-sharma',
    name: 'Student 123',
    avatar: 'https://picsum.photos/seed/STU-anon-123/100/100',
    lastMessage: 'Can we reschedule our session for next week?',
    timestamp: 'Yesterday',
    unread: 0,
  },
    {
    id: 'student-456_professional-sharma',
    name: 'Student 456',
    avatar: 'https://picsum.photos/seed/STU-anon-456/100/100',
    lastMessage: 'I wanted to follow up on our last conversation.',
    timestamp: '3 days ago',
    unread: 0,
  },
];

export default function ProfessionalChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[1]
  );
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { messages, loading, sendMessage } = useChat(selectedConversation.id);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    setIsSending(true);
    await sendMessage(input, 'professional');
    setInput('');
    setIsSending(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/professional/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Student Chat
        </h1>
      </div>
      <Card className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={30} minSize={25}>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Conversations</h2>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-2">
                  {conversations.map((convo) => (
                    <Button
                      key={convo.id}
                      variant="ghost"
                      className={cn(
                        'w-full h-auto justify-start p-2 text-left',
                        selectedConversation.id === convo.id && 'bg-accent'
                      )}
                      onClick={() => setSelectedConversation(convo)}
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={convo.avatar} />
                        <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 truncate">
                        <p className="font-bold">{convo.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {convo.lastMessage}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {convo.timestamp}
                        </p>
                        {convo.unread > 0 && (
                          <Badge className="mt-1">{convo.unread}</Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            {selectedConversation ? (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">
                    {selectedConversation.name}
                  </h3>
                </div>
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn('flex items-end gap-2', 
                              message.role === 'professional' ? 'justify-end' : 'justify-start'
                          )}
                        >
                          {message.role === 'student' && (
                              <Avatar className='h-8 w-8'>
                                  <AvatarImage src={selectedConversation.avatar} />
                                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                          )}
                          <div
                            className={cn(
                              'rounded-lg p-3 max-w-[70%]',
                              message.role === 'professional'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            )}
                          >
                            <p>{message.content}</p>
                          </div>
                          {message.role === 'professional' && (
                              <Avatar className='h-8 w-8'>
                                  <AvatarImage src="https://picsum.photos/seed/professional/100/100" />
                                  <AvatarFallback>Dr</AvatarFallback>
                              </Avatar>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="relative">
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isSending || loading}
                    />
                    <Button
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={handleSendMessage}
                      disabled={isSending || loading}
                    >
                      {isSending ? <Loader2 className="h-4 w-4 animate-spin"/> :<Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  Select a conversation to start chatting
                </p>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
}
