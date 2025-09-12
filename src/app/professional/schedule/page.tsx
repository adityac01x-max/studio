
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
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Trash2,
  Edit,
  PlusCircle,
  ArrowLeft,
  Video,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


const allSessions = [
  {
    id: 'session-1',
    studentId: 'STU-anon-123',
    studentAvatar: 'https://picsum.photos/seed/STU-anon-123/100/100',
    date: '2024-07-29',
    time: '10:00 AM - 11:00 AM',
    type: 'In-Person',
    status: 'Completed',
  },
  {
    id: 'session-2',
    studentId: 'STU-anon-456',
    studentAvatar: 'https://picsum.photos/seed/STU-anon-456/100/100',
    date: '2024-07-29',
    time: '02:00 PM - 03:00 PM',
    type: 'Video Call',
    status: 'Completed',
  },
  {
    id: 'session-3',
    studentId: 'STU-anon-789',
    studentAvatar: 'https://picsum.photos/seed/STU-anon-789/100/100',
    date: '2024-07-31',
    time: '10:00 AM - 11:00 AM',
    type: 'In-Person',
    status: 'Upcoming',
  },
  {
    id: 'session-4',
    studentId: 'STU-anon-101',
    studentAvatar: 'https://picsum.photos/seed/STU-anon-101/100/100',
    date: '2024-08-01',
    time: '09:00 AM - 10:00 AM',
    type: 'Video Call',
    status: 'Upcoming',
  },
];

type Session = typeof allSessions[0];

export default function ProfessionalSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sessions, setSessions] = useState(allSessions);
  const [isNewSessionDialogOpen, setNewSessionDialogOpen] = useState(false);
  
  const sessionDays = sessions.map((c) => new Date(c.date));

  const filteredSessions = date
    ? sessions.filter(
        (c) => format(new Date(c.date), 'PPP') === format(date, 'PPP')
      )
    : sessions;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
         <Link href="/professional/dashboard" passHref>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Sessions</CardTitle>
                <CardDescription>
                  {date
                    ? `Showing sessions for ${format(date, 'PPP')}`
                    : 'Showing all sessions.'}
                </CardDescription>
              </div>
                <Dialog
                    open={isNewSessionDialogOpen}
                    onOpenChange={setNewSessionDialogOpen}
                >
                    <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Schedule Session
                    </Button>
                    </DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Schedule New Session</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input id="studentId" name="studentId" required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" name="date" type="date" required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" name="time" type="text" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="type">Session Type</Label>
                            <Select name="type" defaultValue="In-Person">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="In-Person">In-Person</SelectItem>
                                <SelectItem value="Video Call">Video Call</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                        <Button type="submit">Schedule</Button>
                        </DialogFooter>
                    </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.length > 0 ? (
                    filteredSessions.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                           <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={item.studentAvatar} />
                                <AvatarFallback>{item.studentId.slice(-2)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{item.studentId}</span>
                            </div>
                        </TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                {item.type === 'Video Call' ? <Video className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                {item.type}
                            </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === 'Completed'
                                ? 'secondary'
                                : 'default'
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">
                        No sessions scheduled for this day.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
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
           <Card>
            <CardHeader>
                <CardTitle>Session Reminders</CardTitle>
                <CardDescription>Automatic notifications will be sent to students 24 hours before their session.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center p-4 bg-muted rounded-lg">
                    <Clock className="w-6 h-6 text-muted-foreground mr-4"/>
                    <p className="text-sm text-muted-foreground">Reminders are active. No action needed.</p>
                </div>
            </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
