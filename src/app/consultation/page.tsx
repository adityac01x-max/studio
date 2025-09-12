
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Loader2,
  MapPin,
  Search,
  MessageSquare,
  Video,
} from 'lucide-react';
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
  CardFooter,
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
} from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
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

const counselors = [
  {
    id: 'counselor1',
    name: 'Dr. Sunita Sharma',
    specialty: 'Clinical Psychology',
    avatar: 'https://picsum.photos/seed/counselor1/100/100',
  },
  {
    id: 'counselor2',
    name: 'Dr. Rohan Mehra',
    specialty: 'Anxiety & Depression',
    avatar: 'https://picsum.photos/seed/counselor2/100/100',
  },
];

const peerSupporters = [
  {
    id: 'peer1',
    name: 'Rohan Kumar',
    year: '3rd Year, Psychology',
    availability: 'Mon, Wed, Fri',
    avatar: 'https://picsum.photos/seed/peer1/100/100',
  },
  {
    id: 'peer2',
    name: 'Priya Singh',
    year: '4th Year, Sociology',
    availability: 'Tue, Thu',
    avatar: 'https://picsum.photos/seed/peer2/100/100',
  },
  {
    id: 'peer3',
    name: 'Aditya Verma',
    year: '3rd Year, Social Work',
    availability: 'Mon, Fri',
    avatar: 'https://picsum.photos/seed/peer3/100/100',
  },
];

const nearbyProfessionals = [
  {
    id: 'prof1',
    name: 'Dr. Meera Desai, PhD',
    specialty: 'Cognitive Behavioral Therapy',
    address: '123 Wellness Ave, Jayanagar',
    distance: '2.5 km',
    avatar: 'https://picsum.photos/seed/prof1/100/100',
  },
  {
    id: 'prof2',
    name: 'Sameer Joshi, M.Phil',
    specialty: 'Anxiety & Stress Management',
    address: '456 Serenity Blvd, Koramangala',
    distance: '3.1 km',
    avatar: 'https://picsum.photos/seed/prof2/100/100',
  },
  {
    id: 'prof3',
    name: 'Dr. Fatima Ahmed, PsyD',
    specialty: 'Trauma & PTSD',
    address: '789 Harmony Ln, Indiranagar',
    distance: '4.0 km',
    avatar: 'https://picsum.photos/seed/prof3/100/100',
  },
];

const CounselorScheduler = ({ title }: { title: string }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
  });

  function onSubmit(data: ConsultationFormValues) {
    setIsLoading(true);
    console.log(data);

    setTimeout(() => {
      toast({
        title: 'Appointment Booked!',
        description: `Your session with a ${title} is confirmed for ${format(
          data.date,
          'PPP'
        )} at ${data.time}.`,
      });
      form.reset();
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">
          Schedule with a {title}
        </CardTitle>
        <CardDescription>
          Choose a date and time that works for you. All sessions are
          confidential.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                field.value === slot ? 'default' : 'outline'
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
                      placeholder="Anything you'd like your peer supporter or counselor to know beforehand?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Book Appointment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default function ConsultationPage() {
  const [useGeolocation, setUseGeolocation] = useState(false);
  const { toast } = useToast();

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
      <Tabs defaultValue="counselor" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="peer">Peer-to-Peer Support</TabsTrigger>
          <TabsTrigger value="counselor">College Counselor</TabsTrigger>
          <TabsTrigger value="professionals">Nearby Professionals</TabsTrigger>
        </TabsList>

        <TabsContent value="peer" className="space-y-6">
          <h3 className="text-xl font-bold font-headline">
            Connect with a Peer Supporter
          </h3>
          <p className="text-muted-foreground">
            Our peer supporters are trained students who can offer a listening
            ear and share their own experiences. It's a great first step if
            you're not sure where to start.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {peerSupporters.map((peer) => (
              <Card key={peer.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex flex-col items-center text-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={peer.avatar} />
                      <AvatarFallback>{peer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-lg">{peer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {peer.year}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <Badge variant="outline" className="w-full justify-center">
                    Available: {peer.availability}
                  </Badge>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Link
                    href={`/student-chat?professionalId=${peer.id}`}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2" /> Chat
                    </Button>
                  </Link>
                  <Link
                    href={`/student-video?professionalId=${peer.id}`}
                    className="w-full"
                  >
                    <Button className="w-full">
                      <Video className="mr-2" /> Video Call
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="counselor" className="space-y-6">
          <h3 className="text-xl font-bold font-headline">
            Connect with a College Counselor
          </h3>
          <p className="text-muted-foreground">
            Book a confidential session with a professional on-campus counselor.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {counselors.map((counselor) => (
              <Card key={counselor.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex flex-col items-center text-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={counselor.avatar} />
                      <AvatarFallback>
                        {counselor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-lg">{counselor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {counselor.specialty}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex flex-col gap-2">
                  <Link
                    href={`/student-chat?professionalId=${counselor.id}`}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2" /> Chat
                    </Button>
                  </Link>
                  <Link
                    href={`/student-video?professionalId=${counselor.id}`}
                    className="w-full"
                  >
                    <Button className="w-full">
                      <Video className="mr-2" /> Video Call
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="professionals" className="space-y-6">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Find Nearby Professionals</CardTitle>
              <CardDescription>
                Opt-in to share your location and find licensed therapists and
                counselors near you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="geolocation-terms"
                  checked={useGeolocation}
                  onCheckedChange={(checked) => setUseGeolocation(!!checked)}
                />
                <label
                  htmlFor="geolocation-terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to use my device's location to find nearby
                  professionals. This is a one-time search and my location will
                  not be stored.
                </label>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Enter pincode or city" />
                <Button onClick={handleGeolocation}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nearbyProfessionals.map((prof) => (
              <Card key={prof.id}>
                <CardHeader className="flex-row items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={prof.avatar} />
                    <AvatarFallback>{prof.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-bold">{prof.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {prof.specialty}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{prof.address}</span>
                  </div>
                  <p className="text-sm font-medium">{prof.distance} away</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    