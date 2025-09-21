

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const consultationSchema = z.object({
  date: z.date({
    required_error: 'A date is required.',
  }),
  time: z.string({
    required_error: 'A time slot is required.',
  }),
  notes: z.string().optional(),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

const pastSessions = [
  {
    id: 1,
    date: '2024-04-15',
    counselor: 'Dr. Ananya Sharma',
    type: 'College Counselor',
    status: 'Completed',
  },
  {
    id: 2,
    date: '2024-05-02',
    counselor: 'Rohan Kumar (Peer)',
    type: 'Peer Support',
    status: 'Completed',
  },
];

const nearbyProfessionals = [
  {
    id: 'prof1',
    name: 'Dr. Meera Desai, PhD',
    specialty: 'Cognitive Behavioral Therapy',
    address: '123 Wellness Ave, Jayanagar',
    distance: '2.5 km',
  },
  {
    id: 'prof2',
    name: 'Sameer Joshi, M.Phil',
    specialty: 'Anxiety & Stress Management',
    address: '456 Serenity Blvd, Koramangala',
    distance: '3.1 km',
  },
];

export default function ConsultationPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [useGeolocation, setUseGeolocation] = useState(false);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
  });

  function onSubmit(data: ConsultationFormValues) {
    setIsLoading(true);
    console.log(data);

    setTimeout(() => {
      toast({
        title: 'Appointment Booked!',
        description: `Your session is confirmed for ${format(
          data.date,
          'PPP'
        )} at ${data.time}.`,
      });
      form.reset();
      setIsLoading(false);
    }, 1000);
  }

  const handleGeolocation = () => {
    if (!useGeolocation) {
      toast({
        title: 'Geolocation Disabled',
        description: 'Please agree to the terms to enable geolocation.',
      });
      return;
    }
    toast({
      title: 'Searching for Professionals...',
      description: 'Please allow location access in your browser.',
    });
    // Geolocation logic would go here
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Confidential Counselor Consultation
        </h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">
              Schedule an Appointment
            </CardTitle>
            <CardDescription>
              Choose a date and time that works for you. All sessions are
              confidential.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Available Time Slots</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          {timeSlots.map((slot) => (
                            <FormItem
                              key={slot}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Button
                                  asChild
                                  variant={
                                    field.value === slot
                                      ? 'default'
                                      : 'outline'
                                  }
                                  className="w-full"
                                >
                                  <label className="w-full h-full flex items-center justify-center cursor-pointer">
                                    <RadioGroupItem
                                      value={slot}
                                      className="sr-only"
                                    />
                                    {slot}
                                  </label>
                                </Button>
                              </FormControl>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Anything you'd like your counsellor to know beforehand?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Book Appointment
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Past Sessions</CardTitle>
              <CardDescription>
                A record of your previous consultations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Counselor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.counselor}</TableCell>
                       <TableCell>{session.type}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{session.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
