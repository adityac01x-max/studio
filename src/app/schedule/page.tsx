
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
import { User, Clock, MapPin, FileText, Users, Wind } from 'lucide-react';
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
    type: 'Consultation',
    report: {
      notes:
        'Patient discussed feelings of anxiety related to upcoming exams. We practiced breathing exercises and discussed time management strategies. Patient seemed receptive and engaged.',
      followUp: 'Practice breathing exercises twice daily. Try to implement the 5-minute rule for procrastination.',
    },
  },
  {
    id: 'session-2',
    title: 'Peer Support Meeting',
    counselor: 'Rohan Kumar',
    date: '2024-07-29',
    time: '02:00 PM - 03:00 PM',
    location: 'Student Union, Room 5',
    type: 'Peer Support',
    report: {
      notes:
        'Discussed challenges with balancing social life and academics. Shared experiences with other peers. The group was supportive and offered practical advice.',
      followUp: 'Connect with one peer from the group for a coffee chat this week.',
    },
  },
  {
    id: 'session-3',
    title: 'Session with Dr. Sunita Sharma',
    counselor: 'Dr. Sunita Sharma',
    date: '2024-07-31',
    time: '10:00 AM - 11:00 AM',
    location: 'Counseling Center, Room 2',
    type: 'Consultation',
    report: {
      notes: 'This is an upcoming session. Notes will be available after completion.',
      followUp: 'Come prepared to discuss progress on time management strategies.',
    },
  },
  {
    id: 'session-4',
    title: 'Mindfulness Workshop',
    counselor: 'College Wellness Dept.',
    date: '2024-08-01',
    time: '04:00 PM - 05:00 PM',
    location: 'Virtual Meeting',
    type: 'Workshop',
    report: {
      notes: 'This is an upcoming workshop. A summary will be provided after the event.',
      followUp: 'N/A',
    },
  },
   {
    id: 'session-5',
    title: 'Session with Dr. Rohan Mehra',
    counselor: 'Dr. Rohan Mehra',
    date: '2024-08-02',
    time: '09:00 AM - 10:00 AM',
    location: 'Counseling Center, Room 1',
    type: 'Consultation',
    report: {
      notes: 'This is an upcoming session. Notes will be available after completion.',
      followUp: 'N/A',
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

export default function SchedulePage() {
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
    <div>
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
