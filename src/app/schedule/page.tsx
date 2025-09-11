
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const scheduledSessions = [
  {
    id: 'session-1',
    title: 'Session with Dr. Sunita Sharma',
    counselor: 'Dr. Sunita Sharma',
    date: '2024-07-29',
    time: '10:00 AM - 11:00 AM',
    location: 'Counseling Center, Room 2',
  },
  {
    id: 'session-2',
    title: 'Peer Support Meeting',
    counselor: 'Rohan Kumar',
    date: '2024-07-29',
    time: '02:00 PM - 03:00 PM',
    location: 'Student Union, Room 5',
  },
  {
    id: 'session-3',
    title: 'Session with Dr. Sunita Sharma',
    counselor: 'Dr. Sunita Sharma',
    date: '2024-07-31',
    time: '10:00 AM - 11:00 AM',
    location: 'Counseling Center, Room 2',
  },
  {
    id: 'session-4',
    title: 'Session with Dr. Rohan Mehra',
    counselor: 'Dr. Rohan Mehra',
    date: '2024-08-01',
    time: '09:00 AM - 10:00 AM',
    location: 'Counseling Center, Room 1',
  },
  {
    id: 'session-5',
    title: 'Session with Dr. Sunita Sharma',
    counselor: 'Dr. Sunita Sharma',
    date: '2024-08-02',
    time: '02:00 PM - 03:00 PM',
    location: 'Counseling Center, Room 2',
  },
];

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const sessionDays = scheduledSessions.map((c) => new Date(c.date));

  const filteredSessions = date
    ? scheduledSessions.filter(
        (c) => format(new Date(c.date), 'PPP') === format(date, 'PPP')
      )
    : scheduledSessions.filter((c) => new Date(c.date) >= new Date());

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          My Schedule
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                {date
                  ? `Showing sessions for ${format(date, 'PPP')}`
                  : 'Showing all upcoming sessions. Select a day to see its schedule.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredSessions.length > 0 ? (
                <div className="space-y-4">
                  {filteredSessions.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="pt-6 grid gap-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              with {item.counselor}
                            </p>
                          </div>
                          <Badge variant="secondary">Consultation</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{item.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No sessions scheduled for this day.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Scheduled Sessions</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <User className="w-8 h-8 text-primary" />
              <div className="text-3xl font-bold">
                {scheduledSessions.length}
              </div>
              <p className="text-muted-foreground">Sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                modifiers={{ booked: sessionDays }}
                modifiersClassNames={{
                  booked: 'bg-primary/20 rounded-full',
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
