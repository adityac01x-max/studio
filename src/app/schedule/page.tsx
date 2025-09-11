
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
import { ArrowLeft, BookOpen, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const scheduledClasses = [
  {
    id: 'psy101-1',
    title: 'Introduction to Psychology',
    instructor: 'Dr. Alok Kumar',
    date: '2024-07-29',
    time: '10:00 AM - 11:30 AM',
    location: 'Room 301, Arts Block',
  },
  {
    id: 'psy202-1',
    title: 'Cognitive Psychology',
    instructor: 'Dr. Sunita Sharma',
    date: '2024-07-29',
    time: '02:00 PM - 03:30 PM',
    location: 'Room 405, Science Complex',
  },
  {
    id: 'psy101-2',
    title: 'Introduction to Psychology',
    instructor: 'Dr. Alok Kumar',
    date: '2024-07-31',
    time: '10:00 AM - 11:30 AM',
    location: 'Room 301, Arts Block',
  },
  {
    id: 'psy305-1',
    title: 'Abnormal Psychology',
    instructor: 'Dr. Rohan Mehra',
    date: '2024-08-01',
    time: '09:00 AM - 10:30 AM',
    location: 'Room 210, Arts Block',
  },
  {
    id: 'psy202-2',
    title: 'Cognitive Psychology',
    instructor: 'Dr. Sunita Sharma',
    date: '2024-08-02',
    time: '02:00 PM - 03:30 PM',
    location: 'Room 405, Science Complex',
  },
];

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const classDays = scheduledClasses.map((c) => new Date(c.date));

  const filteredClasses = date
    ? scheduledClasses.filter(
        (c) => format(new Date(c.date), 'PPP') === format(date, 'PPP')
      )
    : scheduledClasses.filter((c) => new Date(c.date) >= new Date());

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
          My Class Schedule
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Psychology Classes</CardTitle>
              <CardDescription>
                {date
                  ? `Showing classes for ${format(date, 'PPP')}`
                  : 'Showing all upcoming classes. Select a day to see its schedule.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredClasses.length > 0 ? (
                <div className="space-y-4">
                  {filteredClasses.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="pt-6 grid gap-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              with {item.instructor}
                            </p>
                          </div>
                          <Badge variant="secondary">Psychology</Badge>
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
                    No classes scheduled for this day.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Scheduled Classes</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <div className="text-3xl font-bold">
                {scheduledClasses.length}
              </div>
              <p className="text-muted-foreground">Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                modifiers={{ booked: classDays }}
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
