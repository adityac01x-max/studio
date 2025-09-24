
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, Clock, MapPin, FileText, Users, Wind, ArrowLeft } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import Link from 'next/link';

const scheduledSessions = [
  {
    id: 'session-1',
    title: 'Consultation with Dr. Alex Chen',
    counselor: 'Dr. Alex Chen (LGBTQ+ Affirming)',
    date: '2024-07-30',
    time: '11:00 AM - 12:00 PM',
    location: 'Virtual Meeting',
    type: 'Consultation',
    report: {
      notes:
        'Discussed feelings around identity and navigating family conversations. Explored resources for finding local community.',
      followUp: 'Journal about values and what authenticity means to you.',
    },
  },
  {
    id: 'session-2',
    title: 'Queer Peer Support Circle',
    counselor: 'Priya Singh (Peer Lead)',
    date: '2024-08-01',
    time: '06:00 PM - 07:00 PM',
    location: 'Student Union, Room 3',
    type: 'Peer Support',
    report: {
      notes: 'Group discussion on the theme of "Chosen Family." Shared personal stories and offered mutual support. A very positive and validating atmosphere.',
      followUp: 'N/A',
    },
  },
  {
    id: 'session-3',
    title: 'Coming Out Stories Workshop',
    counselor: 'Community Hub',
    date: '2024-08-05',
    time: '04:00 PM - 05:30 PM',
    location: 'Virtual Workshop',
    type: 'Workshop',
    report: {
      notes: 'Upcoming workshop focused on sharing and listening to coming out experiences in a safe, moderated space.',
      followUp: 'Registration is required. Come with an open heart.',
    },
  },
   {
    id: 'session-4',
    title: 'Self-Esteem & Identity Session',
    counselor: 'Dr. Meera Desai',
    date: '2024-08-08',
    time: '01:00 PM - 02:00 PM',
    location: 'Counseling Center, Room 4',
    type: 'Consultation',
    report: {
      notes: 'This is an upcoming session.',
      followUp: 'Please complete the self-esteem questionnaire beforehand.',
    },
  },
];

type Session = (typeof scheduledSessions)[0];

const SessionIcon = ({type}: {type: string}) => {
    switch (type) {
        case 'Consultation': return <User className="w-4 h-4"/>;
        case 'Peer Support': return <Users className="w-4 h-4"/>;
        case 'Workshop': return <Wind className="w-4 h-4"/>;
        default: return <User className="w-4 h-4"/>;
    }
}

export default function LoveAndSelfSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const sessionDays = scheduledSessions.map((c) => new Date(c.date));

  const filteredSessions = date
    ? scheduledSessions.filter(
        (c) => format(new Date(c.date), 'PPP') === format(date, 'PPP')
      )
    : scheduledSessions.filter((c) => new Date(c.date) >= new Date());

  const handleOpenDialog = (session: Session) => {
    setSelectedSession(session);
    setDialogOpen(true);
  };

  return (
     <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
            <Link href="/love-and-self">
            <Button variant="outline" size="icon">
                <ArrowLeft />
                <span className="sr-only">Back</span>
            </Button>
            </Link>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
                My Schedule
            </h1>
        </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card/80 backdrop-blur-sm">
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
                    <Card key={item.id} className="bg-card/80 backdrop-blur-sm">
                      <CardContent className="pt-6 grid gap-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              with {item.counselor}
                            </p>
                          </div>
                           <Badge variant="secondary" className="flex items-center gap-2">
                            <SessionIcon type={item.type} />
                            {item.type}
                          </Badge>
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
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Report
                        </Button>
                      </CardFooter>
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
          <Card className="bg-card/80 backdrop-blur-sm">
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
          <Card className="bg-card/80 backdrop-blur-sm">
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

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        {selectedSession && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Session Report</DialogTitle>
              <DialogDescription>
                A summary of your session on{' '}
                {format(new Date(selectedSession.date), 'PPP')} with{' '}
                {selectedSession.counselor}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <h4 className="font-semibold mb-2">Counselor's Notes</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedSession.report.notes}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Follow-up Actions</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedSession.report.followUp}
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
