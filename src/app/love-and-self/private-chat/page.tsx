
'use client';

import {
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Loader2, Users } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useChat } from '@/hooks/use-chat';

const generateConversations = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `session-user-peer${i}`,
        name: `Member ${i + 1}`,
        avatar: `https://picsum.photos/seed/peer${i}/100/100`,
        lastMessage: "Hey, what's up?",
        timestamp: `${i + 1}h ago`,
        unread: i % 3 === 0 ? Math.floor(Math.random() * 3) + 1 : 0,
        conversationId: `private-chat_${['session-user-abc',`session-user-peer${i}`].sort().join('_')}`
    }));
};

function PrivateChatContent() {
  const searchParams = useSearchParams();
  const otherUserId = searchParams.get('userId');

  const currentUserId = 'session-user-abc';

  const allConversations = useMemo(() => generateConversations(5), []);

  const getInitialConversation = () => {
      if (otherUserId) {
        const existingConvo = allConversations.find(c => c.id === otherUserId);
        if (existingConvo) return existingConvo;

        // If no existing convo, create a temporary one for the new chat
        return {
             id: otherUserId,
             name: `Member ${Math.floor(Math.random() * 100)}`,
             avatar: `https://picsum.photos/seed/${otherUserId}/100/100`,
             lastMessage: "Start a new conversation.",
             timestamp: "Now",
             unread: 0,
             conversationId: `private-chat_${[currentUserId, otherUserId].sort().join('_')}`
        }
      }
      return allConversations[0];
  }

  const [selectedConversation, setSelectedConversation] = useState(getInitialConversation());
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { messages, loading, sendMessage } = useChat(selectedConversation.conversationId);
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
    await sendMessage(input, currentUserId);
    setInput('');
    setIsSending(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/love-and-self" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Private Chats
        </h1>
      </div>
      <Card className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={30} minSize={25}>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Conversations</h2>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-2">
                  {allConversations.map((convo) => (
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
                   <p className="text-sm text-muted-foreground">This is a private, anonymous chat.</p>
                </div>
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  {loading ? (
                     <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                  <div className="space-y-4">
                     {messages.length === 0 && (
                         <div className="text-center text-muted-foreground pt-10">
                            <p>This is the beginning of your private chat with {selectedConversation.name}.</p>
                         </div>
                     )}
                    {messages.map((message) => {
                         const isCurrentUser = message.role === currentUserId;
                         const authorAvatar = isCurrentUser ? "https://picsum.photos/seed/current-user/100/100" : selectedConversation.avatar;
                         const authorFallback = isCurrentUser ? "Y" : selectedConversation.name.charAt(0);

                        return (
                             <div
                                key={message.id}
                                className={cn('flex items-end gap-2', isCurrentUser ? 'justify-end' : 'justify-start')}
                            >
                                {!isCurrentUser && (
                                    <Avatar className='h-8 w-8'>
                                        <AvatarImage src={authorAvatar} />
                                        <AvatarFallback>{authorFallback}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn('rounded-lg p-3 max-w-[70%]', isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    <p>{message.content}</p>
                                </div>
                                {isCurrentUser && (
                                    <Avatar className='h-8 w-8'>
                                         <AvatarImage src={authorAvatar} />
                                        <AvatarFallback>{authorFallback}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        )
                    })}
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
                      disabled={isSending || loading || !input.trim()}
                    >
                      {isSending ? <Loader2 className="h-4 w-4 animate-spin"/> :<Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                <div>
                    <Users className="w-12 h-12 mx-auto mb-4"/>
                    <p>Select a conversation to start chatting.</p>
                </div>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
}

export default function PrivateChatPage() {
    return (
        <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin"/></div>}>
            <PrivateChatContent />
        </Suspense>
    )
}
