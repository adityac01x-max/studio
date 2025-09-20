
'use client';

import {
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Loader2, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useChat, Message } from '@/hooks/use-chat';
import Link from 'next/link';

const communityMembers = [
  { id: 'user-1', name: 'Alex', avatar: 'https://picsum.photos/seed/Alex/100/100', isOnline: true },
  { id: 'user-2', name: 'Jordan', avatar: 'https://picsum.photos/seed/Jordan/100/100', isOnline: true },
  { id: 'user-3', name: 'Kai', avatar: 'https://picsum.photos/seed/Kai/100/100', isOnline: false },
  { id: 'user-4', name: 'Rowan', avatar: 'https://picsum.photos/seed/Rowan/100/100', isOnline: true },
  { id: 'user-5', name: 'Sam', avatar: 'https://picsum.photos/seed/Sam/100/100', isOnline: false },
];

export default function GlobalChatPage() {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { messages, loading, sendMessage } = useChat('love-and-self-global-chat');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentUser = { id: 'current-user', name: 'You', avatar: 'https://picsum.photos/seed/You/100/100' };

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
    // In a real global chat, role would be the user's ID
    await sendMessage(input, currentUser.id);
    setInput('');
    setIsSending(false);
  };
  
  const getMessageAuthor = (role: string) => {
    if (role === currentUser.id) return currentUser;
    return communityMembers.find(m => m.id === role) || {id: 'unknown', name: 'Guest', avatar: ''};
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex items-center gap-4 mb-6">
            <Link href="/love-and-self" passHref>
                <Button variant="outline" size="icon">
                    <ArrowLeft />
                    <span className="sr-only">Back to Dashboard</span>
                </Button>
            </Link>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
                Community Global Chat
            </h1>
      </div>
      <div className="flex-1 grid grid-cols-4 gap-6">
        <Card className="col-span-4 lg:col-span-3 flex flex-col">
           <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">
                    #general-discussion
                </h3>
                <p className="text-sm text-muted-foreground">A place for the community to connect.</p>
            </div>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
                ) : (
                <div className="space-y-4">
                    {messages.map((message) => {
                        const author = getMessageAuthor(message.role);
                        const isCurrentUser = author.id === currentUser.id;
                        return (
                             <div
                                key={message.id}
                                className={cn('flex items-end gap-2', 
                                    isCurrentUser ? 'justify-end' : 'justify-start'
                                )}
                            >
                                {!isCurrentUser && (
                                    <Avatar className='h-8 w-8'>
                                        <AvatarImage src={author.avatar} />
                                        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn('rounded-lg p-3 max-w-[70%]', isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                     {!isCurrentUser && <p className="text-xs font-bold mb-1">{author.name}</p>}
                                    <p>{message.content}</p>
                                </div>
                                 {isCurrentUser && (
                                    <Avatar className='h-8 w-8'>
                                        <AvatarImage src={author.avatar} />
                                        <AvatarFallback>Y</AvatarFallback>
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
                    disabled={isSending || loading}
                >
                    {isSending ? <Loader2 className="h-4 w-4 animate-spin"/> :<Send className="h-4 w-4" />}
                </Button>
                </div>
            </div>
        </Card>
        <Card className="hidden lg:block">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Members Online</h2>
                <ScrollArea className="h-[calc(100vh-12rem)]">
                    <div className="space-y-4">
                        {communityMembers.map(member => (
                            <div key={member.id} className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 relative">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    {member.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
                                </Avatar>
                                <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.isOnline ? 'Online' : 'Offline'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </Card>
      </div>
    </div>
  );
}
