
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
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


function DiamondIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
    </svg>
  );
}

function FlameIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}


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


export default function LoveAndSelfPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedIdentities, setSelectedIdentities] = useState<string[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    // Mock current user ID
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

       <div className="grid gap-6 md:grid-cols-2">
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
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>
                    Engage more, earn more.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                    <DiamondIcon className="w-6 h-6 text-primary" />
                    <div>
                        <div className="font-bold">30</div>
                        <div className="text-sm text-muted-foreground">Points</div>
                    </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <FlameIcon className="w-6 h-6 text-primary" />
                    <div>
                        <div className="font-bold">1</div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                    </div>
                    <div className="col-span-2">
                    <Link href="/love-and-self/progress" passHref>
                        <Button className="w-full">
                        <Trophy className="w-5 h-5 mr-2" />
                        View My Progress
                        </Button>
                    </Link>
                    </div>
                </CardContent>
            </Card>
        </div>


      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>What would you like to do today?</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                 <Link href="/love-and-self/consultation" passHref>
                    <Button variant="outline" className="w-full h-20 flex-col gap-1">
                        <Users />
                        <span>Consult</span>
                    </Button>
                </Link>
                 <Link href="/love-and-self/resources" passHref>
                    <Button variant="outline" className="w-full h-20 flex-col gap-1">
                        <Library />
                        <span>Resource Hub</span>
                    </Button>
                </Link>
                 <Link href="/love-and-self/education" passHref>
                    <Button variant="outline" className="w-full h-20 flex-col gap-1">
                        <BookOpen />
                        <span>Education</span>
                    </Button>
                </Link>
                 <Link href="/love-and-self/mood-mapping" passHref>
                    <Button variant="outline" className="w-full h-20 flex-col gap-1">
                        <BarChart2 />
                        <span>Mood Map</span>
                    </Button>
                </Link>
                 <Link href="/love-and-self/ai-chat" passHref>
                    <Button variant="outline" className="w-full h-20 flex-col gap-1">
                        <Bot />
                        <span>AI Chat</span>
                    </Button>
                </Link>
                 <Link href="/love-and-self/questionnaires" passHref>
                    <Button variant="outline" className="w-full h-20 flex-col gap-1">
                        <ClipboardList />
                        <span>Questionnaires</span>
                    </Button>
                </Link>
            </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Upcoming Community Events</CardTitle>
                <CardDescription>Join our upcoming events to connect and learn.</CardDescription>
            </CardHeader>
            <CardContent>
                {loadingEvents ? (
                    <p>Loading events...</p>
                ) : (
                <ul className="space-y-4">
                    {upcomingEvents.map(event => {
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
  );
}

    