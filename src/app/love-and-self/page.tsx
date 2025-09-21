
'use client';
import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Heart,
  Calendar,
  Shield,
  BarChart2,
  Sparkles,
  Check,
  Bot,
  ClipboardList,
  Library,
  BookOpen,
  Trophy,
  Newspaper,
  TrendingUp,
  Home,
  NotebookText,
  Milestone,
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';


type Event = {
  id: string;
  title: string;
  date: Timestamp;
  tags: string[];
  rsvps?: string[];
};

const identities = [
  'Lesbian', 'Gay', 'Bisexual', 'Transgender', 'Queer', 'Questioning',
  'Intersex', 'Asexual', 'Pansexual', 'Non-binary', 'Genderqueer', 'Two-spirit',
  'Heterosexual', 'Others'
];

const interests = [
  'Art & Culture', 'Activism', 'Movies & TV', 'Gaming', 'Music', 'Literature',
  'Technology', 'Travel', 'Sports', 'Fashion', 'Foodie', 'History', 'Health & Wellness', 'Science'
];

const communityInterestData = [
    { interest: 'Activism', count: 120 },
    { interest: 'Art & Culture', count: 95 },
    { interest: 'Movies & TV', count: 80 },
    { interest: 'Health & Wellness', count: 75 },
    { interest: 'Music', count: 60 },
]

const latestNews = [
    { id: 'news1', title: "Pride Month: A Look Back at Key Moments in History", source: "Community Times", time: "2h ago", tags: ['History', 'Activism'] },
    { id: 'news2', title: "New Study Highlights Mental Health Disparities in LGBTQ+ Youth", source: "Health Today", time: "5h ago", tags: ['Health & Wellness', 'Science'] },
    { id: 'news3', title: "‘Heartstopper’ Season 3 Release Date Announced", source: "Entertainment Weekly", time: "1d ago", tags: ['Movies & TV'] },
]


export default function LoveAndSelfPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedIdentities, setSelectedIdentities] = useState<string[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    const currentUserId = 'student-user-1';

     useEffect(() => {
        const savedIdentities = localStorage.getItem('love-and-self-identities');
        const savedInterests = localStorage.getItem('love-and-self-interests');
        if (savedIdentities) {
            setSelectedIdentities(JSON.parse(savedIdentities));
        }
        if (savedInterests) {
            setSelectedInterests(JSON.parse(savedInterests));
        }
    }, []);

    useEffect(() => {
        setLoadingEvents(true);
        const q = collection(db, 'community-events');
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const eventsData: Event[] = [];
            querySnapshot.forEach((doc) => {
                eventsData.push({ id: doc.id, ...doc.data() } as Event);
            });
            setAllEvents(eventsData);
            setLoadingEvents(false);
        });

        return () => unsubscribe();
    }, []);

    const toggleSelection = (category: 'identities' | 'interests', value: string) => {
        const selections = category === 'identities' ? selectedIdentities : selectedInterests;
        const setSelections = category === 'identities' ? setSelectedIdentities : setSelectedInterests;
        const currentSelections = [...selections];
        
        if (currentSelections.includes(value)) {
            setSelections(currentSelections.filter(item => item !== value));
        } else {
            setSelections([...currentSelections, value]);
        }
    }

    const handlePersonalize = () => {
        localStorage.setItem('love-and-self-identities', JSON.stringify(selectedIdentities));
        localStorage.setItem('love-and-self-interests', JSON.stringify(selectedInterests));
        toast({
            title: 'Personalized!',
            description: 'Your dashboard content has been updated.',
        });
        router.push('/love-and-self/resources');
    }

    const handleRSVP = async (eventId: string, hasRsvpd: boolean) => {
        const eventRef = doc(db, 'community-events', eventId);
        try {
            if (hasRsvpd) {
                await updateDoc(eventRef, {
                    rsvps: arrayRemove(currentUserId)
                });
                toast({ title: "RSVP Canceled", description: "You are no longer registered for this event."});
            } else {
                await updateDoc(eventRef, {
                    rsvps: arrayUnion(currentUserId)
                });
                toast({ title: "RSVP'd!", description: "You're registered for the event."});
            }
        } catch (error) {
            console.error("Error updating RSVP: ", error);
            toast({ variant: "destructive", title: "Error", description: "Could not update RSVP. Please try again." });
        }
    };


    const getCuratedEvents = () => {
        if (loadingEvents) return [];
        const userTags = new Set([...selectedIdentities, ...selectedInterests]);
        if (userTags.size === 0) {
            return allEvents.filter(event => event.tags.includes('All'));
        }
        const curated = allEvents.filter(event => 
            event.tags.includes('All') || event.tags.some(tag => userTags.has(tag))
        );
        return curated.length > 0 ? curated : allEvents.slice(0, 3);
    }

    const upcomingEvents = getCuratedEvents();

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center text-white">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Welcome to Your Safe Space
        </h1>
        <p className="text-white/80">
          Connect, learn, and grow in a community that understands and celebrates you.
        </p>
      </div>

       <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/love-and-self/questionnaires" passHref><Button variant="outline" className="w-full flex-col h-20"><ClipboardList /><span className="mt-1 text-xs">Questionnaires</span></Button></Link>
                <Link href="/love-and-self/mood-mapping" passHref><Button variant="outline" className="w-full flex-col h-20"><BarChart2 /><span className="mt-1 text-xs">Mood Map</span></Button></Link>
                <Link href="/love-and-self/progress" passHref><Button variant="outline" className="w-full flex-col h-20"><Trophy /><span className="mt-1 text-xs">My Progress</span></Button></Link>
                <Link href="/love-and-self/schedule" passHref><Button variant="outline" className="w-full flex-col h-20"><Calendar /><span className="mt-1 text-xs">My Schedule</span></Button></Link>
                <Link href="/journal" passHref><Button variant="outline" className="w-full flex-col h-20"><NotebookText /><span className="mt-1 text-xs">My Journal</span></Button></Link>
                <Link href="/love-and-self/resources" passHref><Button variant="outline" className="w-full flex-col h-20"><Library /><span className="mt-1 text-xs">Resource Hub</span></Button></Link>
                <Link href="/love-and-self/education" passHref><Button variant="outline" className="w-full flex-col h-20"><BookOpen /><span className="mt-1 text-xs">Education</span></Button></Link>
                <Link href="/love-and-self/ai-chat" passHref><Button variant="outline" className="w-full flex-col h-20"><Bot /><span className="mt-1 text-xs">AI Chat</span></Button></Link>
                <Link href="/love-and-self/be-your-own-voice" passHref><Button variant="outline" className="w-full flex-col h-20"><Milestone /><span className="mt-1 text-xs">Be Your Own Voice</span></Button></Link>
            </CardContent>
        </Card>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                 <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Newspaper className="w-6 h-6 text-primary" /> Latest News & Articles</CardTitle>
                        <CardDescription>Stay updated with news and stories relevant to the community.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {latestNews.map(news => (
                            <div key={news.id} className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold">{news.title}</p>
                                    <p className="text-sm text-muted-foreground">{news.source} &bull; {news.time}</p>
                                    <div className="flex gap-2 mt-1">
                                        {news.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Read</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="w-6 h-6 text-primary" /> Personalize Your Experience</CardTitle>
                        <CardDescription>Help us tailor content for you. This information is kept private.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">My Identity</h3>
                            <div className="flex flex-wrap gap-2">
                                {identities.map(identity => {
                                    const isSelected = selectedIdentities.includes(identity);
                                    return (
                                        <Button key={identity} variant={isSelected ? "default" : "outline"} onClick={() => toggleSelection('identities', identity)} className="rounded-full">
                                            {isSelected && <Check className="mr-2 h-4 w-4" />}
                                            {identity}
                                        </Button>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">My Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {interests.map(interest => {
                                    const isSelected = selectedInterests.includes(interest);
                                    return (
                                        <Button key={interest} variant={isSelected ? "secondary" : "outline"} onClick={() => toggleSelection('interests', interest)} className="rounded-full">
                                            {isSelected && <Check className="mr-2 h-4 w-4" />}
                                            {interest}
                                        </Button>
                                    )
                                })}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button onClick={handlePersonalize}>Personalize</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="space-y-6">
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp className="w-6 h-6 text-primary" /> Community Pulse</CardTitle>
                        <CardDescription>Top interests in our community.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-[250px] w-full">
                            <ResponsiveContainer>
                                <BarChart data={communityInterestData} layout="vertical">
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="interest" type="category" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip content={<ChartTooltipContent />} cursor={{fill: 'hsl(var(--muted))'}} />
                                    <Bar dataKey="count" radius={5} fill="hsl(var(--primary))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                 <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Upcoming Community Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loadingEvents ? (
                            <p>Loading events...</p>
                        ) : (
                        <ul className="space-y-4">
                            {upcomingEvents.slice(0,2).map(event => {
                                const hasRsvpd = event.rsvps?.includes(currentUserId) ?? false;
                                return (
                                <li key={event.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{event.title}</p>
                                        <p className="text-sm text-muted-foreground">{event.date.toDate().toLocaleDateString()}</p>
                                    </div>
                                    <Button size="sm" onClick={() => handleRSVP(event.id, hasRsvpd)} disabled={hasRsvpd}>
                                        {hasRsvpd ? "RSVP'd" : "RSVP"}
                                    </Button>
                                </li>
                            )})}
                        </ul>
                        )}
                    </CardContent>
                </Card>

            </div>
       </div>

    </div>
  );
}

    
