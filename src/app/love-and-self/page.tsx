
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Heart,
  Calendar,
  MessageSquare,
  Shield,
  BarChart2,
} from 'lucide-react';
import Link from 'next/link';

const communityStats = [
    { label: 'Active Members', value: '1,200+', icon: <Users className="w-6 h-6 text-primary" /> },
    { label: 'Connections Made', value: '5,000+', icon: <Heart className="w-6 h-6 text-primary" /> },
    { label: 'Community Events', value: '50+', icon: <Calendar className="w-6 h-6 text-primary" /> },
];

const upcomingEvents = [
    { title: 'Virtual Queer Coffee Hour', date: 'August 5, 2024' },
    { title: 'Workshop: Navigating Relationships', date: 'August 12, 2024' },
    { title: 'Guest Speaker: A Transgender Journey', date: 'August 20, 2024' },
]

export default function LoveAndSelfPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome to Your Safe Space
        </h1>
        <p className="text-muted-foreground">
          Connect, learn, and grow in a community that understands and celebrates you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {communityStats.map(stat => (
            <Card key={stat.label}>
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
        <Card>
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
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Community Events</CardTitle>
                <CardDescription>Join our upcoming events to connect and learn.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {upcomingEvents.map(event => (
                        <li key={event.title} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{event.date}</p>
                            </div>
                            <Button size="sm">RSVP</Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
