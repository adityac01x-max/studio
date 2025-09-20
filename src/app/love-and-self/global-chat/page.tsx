
'use client';

import {
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Loader2, ArrowLeft, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useChat, Message } from '@/hooks/use-chat';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


// In a real app, you would fetch members or have a more robust system
// For this simulation, we'll create a dynamic list of possible anonymous members.
const generateCommunityMembers = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `member-${i + 1}`,
        name: `Member ${i + 1}`,
        avatar: `https://picsum.photos/seed/member${i + 1}/100/100`,
        isOnline: Math.random() > 0.3,
    }));
};


export default function GlobalChatPage() {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Each user gets a unique, session-based anonymous ID
  const currentUserId = useMemo(() => `session-user-${Math.random().toString(36).substring(2, 9)}`, []);
  const currentUser = useMemo(() => ({ id: currentUserId, name: 'You', avatar: `https://picsum.photos/seed/${currentUserId}/100/100` }), [currentUserId]);

  const { messages, loading, sendMessage } = useChat('love-and-self-global-chat');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const communityMembers = useMemo(() => generateCommunityMembers(10), []);

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
    await sendMessage(input, currentUser.id);
    setInput('');
    setIsSending(false);
  };
  
  // Create a map to store author details for performance
  const authorDetails = useMemo(() => {
    const details = new Map<string, {name: string, avatar: string}>();
    details.set(currentUser.id, { name: 'You', avatar: currentUser.avatar});

    messages.forEach(message => {
        if (!details.has(message.role)) {
            // Assign a persistent "Member X" name if not the current user
            const memberName = `Member ${ (details.size % 20) + 1}`;
            details.set(message.role, {
                name: memberName,
                avatar: `https://picsum.photos/seed/${message.role}/100/100`
            });
        }
    });

    return details;

  }, [messages, currentUser]);


  const getMessageAuthor = (role: string) => {
    return authorDetails.get(role) || {name: 'Member', avatar: ''};
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
                <p className="text-sm text-muted-foreground">A place for the community to connect. All messages are anonymous.</p>
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
                        const isCurrentUser = message.role === currentUser.id;
                        return (
                             <div
                                key={message.id}
                                className={cn('flex items-end gap-2', 
                                    isCurrentUser ? 'justify-end' : 'justify-start'
                                )}
                            >
                                {!isCurrentUser && (
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar className='h-8 w-8 cursor-pointer'>
                                                <AvatarImage src={author.avatar} />
                                                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                 <Link href={`/love-and-self/private-chat?userId=${message.role}`}>
                                                    <MessageSquare className="mr-2"/> Start Private Chat
                                                 </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
                    disabled={isSending || loading || input.trim() === ''}
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
                            <div key={member.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
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
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">Chat</Button>
                                    </DropdownMenuTrigger>
                                     <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                             <Link href={`/love-and-self/private-chat?userId=${member.id}`}>
                                                <MessageSquare className="mr-2"/> Start Private Chat
                                             </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
