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
  MessageSquare,
  Shield,
  BarChart2,
  Sparkles,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const communityStats = [
    { label: 'Active Members', value: '1,200+', icon: <Users className="w-6 h-6 text-primary" /> },
    { label: 'Connections Made', value: '5,000+', icon: <Heart className="w-6 h-6 text-primary" /> },
    { label: 'Community Events', value: '50+', icon: <Calendar className="w-6 h-6 text-primary" /> },
];

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
  'Technology', 'Travel', 'Sports', 'Fashion', 'Foodie', 'History'
];


export default function LoveAndSelfPage() {
    const { toast } = useToast();
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
        
        if (selections.includes(value)) {
            setSelections(selections.filter(item => item !== value));
        } else {
            setSelections([...selections, value]);
        }
    }

    const handleSaveChanges = () => {
        localStorage.setItem('love-and-self-identities', JSON.stringify(selectedIdentities));
        localStorage.setItem('love-and-self-interests', JSON.stringify(selectedInterests));
        toast({
            title: 'Preferences Saved!',
            description: 'Your dashboard content has been updated.',
        });
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
          <CardTitle className="flex items-center gap-2"><Sparkles className="w-6 h-6 text-primary" /> Personalize Your Experience</CardTitle>
          <CardDescription>Help us tailor content for you. This information is kept private.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
            <Button onClick={handleSaveChanges}>Save Preferences</Button>
        </CardFooter>
      </Card>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {communityStats.map(stat => (
            <Card key={stat.label} className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                    {stat.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>What would you like to do today?</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <Link href="/love-and-self/global-chat" passHref>
                    <Button variant="outline" className="w-full h-20 flex-col gap-1">
                        <MessageSquare />
                        <span>Global Chat</span>
                    </Button>
                </Link>
                 <Link href="/love-and-self/consultation" passHref>
                    <Button variant="outline" className="w-full h-20 flex-col gap-1">
                        <Users />
                        <span>Consult</span>
                    </Button>
                </Link>
                 <Link href="/love-and-self/resources" passHref>
                    <Button variant="outline" className="w-full h-20 flex-col gap-1">
                        <Shield />
                        <span>Resources</span>
                    </Button>
                </Link>
                 <Link href="/love-and-self/mood-mapping" passHref>
                    <Button variant="outline" className="w-full h-20 flex-col gap-1">
                        <BarChart2 />
                        <span>Mood Map</span>
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

    