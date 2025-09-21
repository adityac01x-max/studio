
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2, MapPin, Users, BookUser, Search } from 'lucide-react';
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
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { usePathname } from 'next/navigation';

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


const peerSupporters = [
  {
    id: 'peer1',
    name: 'Rohan Kumar',
    year: '3rd Year, Psychology',
    avatar: 'https://picsum.photos/seed/peer1/100/100',
    availability: 'Mon, Wed, Fri (5pm - 8pm)'
  },
  {
    id: 'peer2',
    name: 'Priya Singh',
    year: '4th Year, Sociology',
    avatar: 'https://picsum.photos/seed/peer2/100/100',
    availability: 'Tue, Thu (6pm - 9pm)'
  },
];

const collegeCounselors = [
  {
    id: 'counselor1',
    name: 'Dr. Sunita Sharma',
    specialty: 'Clinical Psychology, Stress Management',
    avatar: 'https://picsum.photos/seed/counselor1/100/100',
    availability: 'Mon, Wed, Fri (9am - 5pm)'
  },
  {
    id: 'counselor2',
    name: 'Dr. Rohan Mehra',
    specialty: 'Anxiety & Depression, CBT',
    avatar: 'https://picsum.photos/seed/counselor2/100/100',
    availability: 'Tue, Thu (10am - 6pm)'
  },
];

const nearbyProfessionals = [
  {
    id: 'prof1',
    name: 'Dr. Meera Desai, PhD',
    specialty: 'Cognitive Behavioral Therapy',
    address: '123 Wellness Ave, Jayanagar',
    distance: '2.5 km',
    avatar: 'https://picsum.photos/seed/prof1/100/100'
  },
  {
    id: 'prof2',
    name: 'Sameer Joshi, M.Phil',
    specialty: 'Anxiety & Stress Management',
    address: '456 Serenity Blvd, Koramangala',
    distance: '3.1 km',
    avatar: 'https://picsum.photos/seed/prof2/100/100'
  },
  {
    id: 'prof3',
    name: 'Dr. Fatima Khan, MD',
    specialty: 'Psychiatry, LGBTQ+ Affirming',
    address: '789 Harmony Rd, Indiranagar',
    distance: '4.0 km',
    avatar: 'https://picsum.photos/seed/prof3/100/100'
  },
];

const CounselorBookingForm = ({ counselorId }: { counselorId: string }) => {
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
            description: `Your session with ${counselorId} is confirmed for ${format(
            data.date,
            'PPP'
            )} at ${data.time}.`,
        });
        form.reset();
        setIsLoading(false);
        }, 1000);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
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
                        <FormItem>
                        <FormLabel>Available Times</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-2"
                            >
                            {timeSlots.map((time) => (
                                <FormItem key={time} className="flex-1">
                                <FormControl>
                                     <RadioGroupItem value={time} className="sr-only" />
                                </FormControl>
                                <FormLabel className="flex items-center justify-center p-2 rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary has-[:checked]:bg-primary/10 cursor-pointer">
                                    {time}
                                </FormLabel>
                                </FormItem>
                            ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Anything you'd like to share with the counselor beforehand?"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Confirm Appointment
                </Button>
            </form>
        </Form>
    );
};


export function CounselorConsultation() {
  const { toast } = useToast();
  const pathname = usePathname();
  const [useGeolocation, setUseGeolocation] = useState(false);
  const [activeTab, setActiveTab] = useState('peer');
  const [bookingCounselor, setBookingCounselor] = useState<string | null>(null);

  const getBasePath = () => {
    if (pathname.startsWith('/love-and-self')) return '/love-and-self';
    if (pathname.startsWith('/lifestyle')) return '/lifestyle';
    return '';
  };
  const basePath = getBasePath();

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
      <Card>
        <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="peer">
                    <Users className="mr-2"/>
                    Peer Support
                </TabsTrigger>
                <TabsTrigger value="college">
                    <BookUser className="mr-2"/>
                    College Counselors
                </TabsTrigger>
                <TabsTrigger value="nearby">
                    <MapPin className="mr-2"/>
                    Nearby Professionals
                </TabsTrigger>
            </TabsList>
            <TabsContent value="peer" className="mt-6">
                 <div className="space-y-4">
                    {peerSupporters.map(peer => (
                        <Card key={peer.id}>
                             <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={peer.avatar} />
                                        <AvatarFallback>{peer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{peer.name}</CardTitle>
                                        <CardDescription>{peer.year}</CardDescription>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Link href={`${basePath}/student-chat?professionalId=${peer.id}`} passHref>
                                        <Button>Chat Now</Button>
                                    </Link>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="college" className="mt-6">
                 <div className="space-y-4">
                    {collegeCounselors.map(counselor => (
                        <Card key={counselor.id}>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={counselor.avatar} />
                                        <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{counselor.name}</CardTitle>
                                        <CardDescription>{counselor.specialty}</CardDescription>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">{counselor.availability}</p>
                                     <Button className="mt-2" onClick={() => setBookingCounselor(bookingCounselor === counselor.id ? null : counselor.id)}>
                                        {bookingCounselor === counselor.id ? 'Cancel' : 'Book Appointment'}
                                    </Button>
                                </div>
                            </CardHeader>
                            {bookingCounselor === counselor.id && (
                                 <CardContent>
                                    <CounselorBookingForm counselorId={counselor.id}/>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="nearby" className="mt-6">
                <div className="space-y-6">
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={useGeolocation} onCheckedChange={(checked) => setUseGeolocation(checked as boolean)} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I agree to use my location to find nearby professionals.
                    </label>
                    </div>
                    <Button onClick={handleGeolocation} className="w-full md:w-auto">
                        <Search className="mr-2" />
                        Find Near Me
                    </Button>

                     <div className="space-y-4">
                        {nearbyProfessionals.map(prof => (
                            <Card key={prof.id}>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={prof.avatar} />
                                            <AvatarFallback>{prof.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">{prof.name}</CardTitle>
                                            <CardDescription>{prof.specialty}</CardDescription>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold">{prof.distance}</p>
                                        <p className="text-xs text-muted-foreground">{prof.address}</p>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
