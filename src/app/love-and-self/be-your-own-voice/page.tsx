
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, MessageSquare, Loader2, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useChat } from '@/hooks/use-chat';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';

const rooms = [
  { id: 'room1', name: 'Coming Out Stories', description: 'A safe space to share and listen to coming out experiences.', members: 12, avatar: 'https://picsum.photos/seed/room1/100/100' },
  { id: 'room2', name: 'Navigating Relationships', description: 'Discuss challenges and joys in queer relationships.', members: 8, avatar: 'https://picsum.photos/seed/room2/100/100' },
  { id: 'room3', name: 'Trans & Non-Binary Hangout', description: 'A casual space for trans and non-binary folks to connect.', members: 21, avatar: 'https://picsum.photos/seed/room3/100/100' },
  { id: 'room4', name: 'Art & Activism', description: 'Share your creative work and discuss how art can drive change.', members: 5, avatar: 'https://picsum.photos/seed/room4/100/100' },
];

type Room = typeof rooms[0];

const ChatRoom = ({ room }: { room: Room }) => {
    const { messages, loading, sendMessage } = useChat(`group-chat-${room.id}`);
    const [input, setInput] = useState('');
    const [isSending, setIsSending] = useState(false);
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
        await sendMessage(input, 'student-user-1'); // In a real app, this would be the current user's ID
        setInput('');
        setIsSending(false);
      };

    return (
        <DialogContent className="sm:max-w-4xl h-[80vh] flex flex-col">
            <DialogHeader>
                <DialogTitle>{room.name}</DialogTitle>
                <DialogDescription>{room.description}</DialogDescription>
            </DialogHeader>
             <ScrollArea className="flex-1 p-4 pr-6 -mx-6" ref={scrollAreaRef}>
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
                            message.role === 'student-user-1' ? 'justify-end' : 'justify-start' // Assuming current user for demo
                        )}
                      >
                         {message.role !== 'student-user-1' && (
                            <Avatar className='h-8 w-8'>
                                 <AvatarImage src={`https://picsum.photos/seed/${message.role}/100/100`} />
                                <AvatarFallback>{message.role.slice(-2)}</AvatarFallback>
                            </Avatar>
                         )}
                        <div
                          className={cn(
                            'rounded-lg p-3 max-w-[70%]',
                            message.role === 'student-user-1'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          )}
                        >
                          <p>{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                </ScrollArea>
                <div className="p-4 border-t -mx-6 -mb-6">
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
        </DialogContent>
    )
}

export default function BeYourOwnVoicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/love-and-self" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-headline text-3xl font-bold tracking-tight text-white">
            Be Your Own Voice
          </h1>
          <p className="text-muted-foreground text-white/80">
            Join community-led discussions in a safe and supportive environment.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {rooms.map(room => (
            <Dialog key={room.id}>
                <Card className="bg-card/80 backdrop-blur-sm flex flex-col">
                    <CardHeader className="flex-row items-center gap-4">
                         <Avatar className="h-16 w-16">
                            <AvatarImage src={room.avatar} />
                            <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{room.name}</CardTitle>
                            <CardDescription>{room.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4"/>
                            <span>{room.members} members</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger asChild>
                            <Button className="w-full">
                                <MessageSquare className="mr-2"/>
                                Join Discussion
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>
                <ChatRoom room={room} />
            </Dialog>
        ))}
      </div>
    </div>
  );
}
