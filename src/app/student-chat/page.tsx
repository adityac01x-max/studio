
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
import { Suspense, useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useChat } from '@/hooks/use-chat';
import { useUserRole } from '@/hooks/use-user-role.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const professionals = [
  {
    id: 'counselor1',
    name: 'Dr. Sunita Sharma',
    avatar: 'https://picsum.photos/seed/counselor1/100/100',
    lastMessage: 'Hello! How can I help you today?',
    timestamp: '10:42 AM',
    unread: 1,
    conversationId: 'student-user_professional-counselor1'
  },
  {
    id: 'peer1',
    name: 'Rohan Kumar',
    avatar: 'https://picsum.photos/seed/peer1/100/100',
    lastMessage: "Hey, feel free to reach out if you need to talk.",
    timestamp: '9:15 AM',
    unread: 0,
    conversationId: 'student-user_professional-peer1'
  },
  {
    id: 'counselor2',
    name: 'Dr. Rohan Mehra',
    avatar: 'https://picsum.photos/seed/counselor2/100/100',
    lastMessage: 'Just checking in. How are things?',
    timestamp: 'Yesterday',
    unread: 0,
    conversationId: 'student-user_professional-counselor2'
  },
    {
    id: 'peer2',
    name: 'Priya Singh',
    avatar: 'https://picsum.photos/seed/peer2/100/100',
    lastMessage: 'Let me know if you want to grab a coffee.',
    timestamp: '3 days ago',
    unread: 0,
    conversationId: 'student-user_professional-peer2'
  },
];

const peerSupportInbox = [
    {
        id: 'student-inbox-1',
        name: 'Student ABC',
        avatar: 'https://picsum.photos/seed/student-abc/100/100',
        lastMessage: "Hi, I'm feeling really overwhelmed and was hoping to talk.",
        timestamp: '2:30 PM',
        unread: 1,
        conversationId: 'student-abc_peer-supporter-1'
    },
    {
        id: 'student-inbox-2',
        name: 'Student XYZ',
        avatar: 'https://picsum.photos/seed/student-xyz/100/100',
        lastMessage: "Thanks for offering to help. I'm struggling with exam stress.",
        timestamp: '1:05 PM',
        unread: 0,
        conversationId: 'student-xyz_peer-supporter-1'
    }
];


function StudentChatContent() {
  const { userRole } = useUserRole();
  const searchParams = useSearchParams();
  const professionalIdFromParams = searchParams.get('professionalId');
  const isPeer = userRole === 'peer';

  const [activeTab, setActiveTab] = useState(isPeer ? 'peer-inbox' : 'my-chats');

  const getInitialConversation = () => {
      const currentList = activeTab === 'peer-inbox' ? peerSupportInbox : professionals;
      const prof = currentList.find(p => p.id === professionalIdFromParams);
      return prof || currentList[0];
  }

  const [selectedConversation, setSelectedConversation] = useState(getInitialConversation());
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { messages, loading, sendMessage } = useChat(selectedConversation.conversationId);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentList = activeTab === 'peer-inbox' ? peerSupportInbox : professionals;
    setSelectedConversation(currentList[0]);
  }, [activeTab]);

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
    const role = activeTab === 'peer-inbox' ? 'peer' : 'student';
    await sendMessage(input, role);
    setInput('');
    setIsSending(false);
  };

  const currentConversationList = activeTab === 'peer-inbox' ? peerSupportInbox : professionals;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/consultation" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Consultation</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          My Chats
        </h1>
      </div>
       <Card className="flex-1">
        {isPeer ? (
             <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="peer-inbox">Peer Support Inbox</TabsTrigger>
                    <TabsTrigger value="my-chats">My Personal Chats</TabsTrigger>
                </TabsList>
                <TabsContent value="peer-inbox" className="flex-1 mt-0">
                    <ChatInterface />
                </TabsContent>
                <TabsContent value="my-chats" className="flex-1 mt-0">
                     <ChatInterface />
                </TabsContent>
            </Tabs>
        ) : (
            <ChatInterface />
        )}
      </Card>
    </div>
  );

  function ChatInterface() {
    return (
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={30} minSize={25}>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Conversations</h2>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-2">
                  {currentConversationList.map((convo) => (
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
                            message.role === 'student' ? 'justify-end' : 'justify-start'
                        )}
                      >
                         {message.role === 'professional' && (
                            <Avatar className='h-8 w-8'>
                                <AvatarImage src={selectedConversation.avatar} />
                                <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                         )}
                        <div
                          className={cn(
                            'rounded-lg p-3 max-w-[70%]',
                            message.role === 'student'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          )}
                        >
                          <p>{message.content}</p>
                        </div>
                        {message.role === 'student' && (
                            <Avatar className='h-8 w-8'>
                                <AvatarFallback>U</AvatarFallback>
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
    );
  }
}

export default function StudentChatPage() {
    return (
        <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin"/></div>}>
            <StudentChatContent />
        </Suspense>
    )
}
