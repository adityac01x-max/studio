
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
import { Button } from '@/components/ui/button';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  FileText,
  Trash2,
  Edit,
  PlusCircle,
  ArrowLeft,
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

const allSessions = [
  {
    id: 'session-1',
    studentId: 'STU-anon-123',
    counselor: 'Dr. Sunita Sharma',
    date: '2024-07-29',
    time: '10:00 AM - 11:00 AM',
    location: 'Counseling Center, Room 2',
    status: 'Completed',
  },
  {
    id: 'session-2',
    studentId: 'STU-anon-456',
    counselor: 'Rohan Kumar',
    date: '2024-07-29',
    time: '02:00 PM - 03:00 PM',
    location: 'Student Union, Room 5',
    status: 'Completed',
  },
  {
    id: 'session-3',
    studentId: 'STU-anon-789',
    counselor: 'Dr. Sunita Sharma',
    date: '2024-07-31',
    time: '10:00 AM - 11:00 AM',
    location: 'Counseling Center, Room 2',
    status: 'Upcoming',
  },
  {
    id: 'session-4',
    studentId: 'STU-anon-101',
    counselor: 'Dr. Rohan Mehra',
    date: '2024-08-01',
    time: '09:00 AM - 10:00 AM',
    location: 'Counseling Center, Room 1',
    status: 'Upcoming',
  },
  {
    id: 'session-5',
    studentId: 'STU-anon-112',
    counselor: 'Dr. Sunita Sharma',
    date: '2024-08-02',
    time: '02:00 PM - 03:00 PM',
    location: 'Counseling Center, Room 2',
    status: 'Upcoming',
  },
];

type Session = typeof allSessions[0];

export default function AdminSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sessions, setSessions] = useState(allSessions);
  const [isNewSessionDialogOpen, setNewSessionDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState<Session | null>(null);

  const sessionDays = sessions.map((c) => new Date(c.date));

  const filteredSessions = date
    ? sessions.filter(
        (c) => format(new Date(c.date), 'PPP') === format(date, 'PPP')
      )
    : sessions;

  const upcomingSessionsCount = sessions.filter(
    (s) => s.status === 'Upcoming'
  ).length;

  const handleAddSession = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newSession = Object.fromEntries(formData.entries()) as Omit<
      Session,
      'id'
    >;

    setSessions([
      ...sessions,
      {
        ...newSession,
        id: `session-${sessions.length + 1}`,
        status: 'Upcoming',
      },
    ]);
    setNewSessionDialogOpen(false);
    form.reset();
  };

  const handleEditSession = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!sessionToEdit) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const updatedSession = Object.fromEntries(formData.entries()) as Omit<
      Session,
      'id'
    >;

    setSessions(
      sessions.map((s) =>
        s.id === sessionToEdit.id ? { ...s, ...updatedSession } : s
      )
    );
    setEditDialogOpen(false);
    setSessionToEdit(null);
  };

  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const openEditDialog = (session: Session) => {
    setSessionToEdit(session);
    setEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
         <Link href="/admin/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Manage Schedule
        </h1>
      </div>


      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Sessions</CardTitle>
              <CardDescription>
                {date
                  ? `Showing sessions for ${format(date, 'PPP')}`
                  : 'Showing all sessions. Select a day to filter.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID (Anon)</TableHead>
                    <TableHead>Counselor</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.length > 0 ? (
                    filteredSessions.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.studentId}
                        </TableCell>
                        <TableCell>{item.counselor}</TableCell>
                        <TableCell>{item.time}</TableCell>
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
                            onClick={() => openEditDialog(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSession(item.id)}
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
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <User className="w-8 h-8 text-primary" />
              <div className="text-3xl font-bold">{upcomingSessionsCount}</div>
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
          <Dialog
            open={isNewSessionDialogOpen}
            onOpenChange={setNewSessionDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="w-full">
                <PlusCircle className="mr-2" />
                Schedule New Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Session</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new session.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSession} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID (Anonymized)</Label>
                  <Input id="studentId" name="studentId" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="counselor">Counselor</Label>
                  <Input id="counselor" name="counselor" required />
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
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" required />
                </div>
                <DialogFooter>
                  <Button type="submit">Schedule</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Session</DialogTitle>
          </DialogHeader>
          {sessionToEdit && (
            <form onSubmit={handleEditSession} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID (Anonymized)</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  defaultValue={sessionToEdit.studentId}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="counselor">Counselor</Label>
                <Input
                  id="counselor"
                  name="counselor"
                  defaultValue={sessionToEdit.counselor}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={sessionToEdit.date}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="text"
                  defaultValue={sessionToEdit.time}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={sessionToEdit.location}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={sessionToEdit.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
