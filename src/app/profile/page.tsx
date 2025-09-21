
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { AppLogo } from '@/components/icons';
import { MultiSelect } from '@/components/ui/multi-select';
import { ArrowLeft, Award, UserCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState, useEffect } from 'react';
import { useUserRole } from '@/hooks/use-user-role.tsx';
import { Label } from '@/components/ui/label';

const ages = ['Under 18', '19-25', '26-40', '41-55', '56 and above'];
const genders = ['Male', 'Female', 'Non-binary', 'Other'];
const occupations = ['Employed', 'House wife', 'Business', 'Student'];
const contentPreferences = ['Movies', 'Music', 'Books'];
const movieGenres = ['Action', 'Science Fiction', 'Adventure', 'Drama', 'Thriller', 'Comedy', 'Crime', 'Romance', 'Fantasy', 'Western', 'Mystery', 'Animation', 'Family', 'Horror', 'NA'];
const musicGenres = ['pop', 'rock', 'hip-hop', 'latin', 'country', 'electronic', 'gaming', 'j-pop', 'metal', 'reggae', 'k-pop', 'arabic', 'folk', 'indian', 'lofi', 'classical', 'indie', 'bollywood', 'NA'];
const bookCategories = ['History', 'General', 'Fiction', 'Cooking', 'Reference', 'Self-help', 'Personal Growth', 'Self-Esteem', 'Poetry', 'Biography & Autobiography', 'Diet & Nutrition', 'Diets', 'Military Science', 'Technology & Engineering', 'Religion', 'Bibical Biography', 'Personal Memories', 'Philosophy', 'Political Science', 'Romance', 'NA'];

const profileSchema = z.object({
  age: z.string({ required_error: 'Please select an age range.' }),
  gender: z.string({ required_error: 'Please select a gender.' }),
  contentPreference: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  movieGenres: z.array(z.string()).optional(),
  musicGenres: z.array(z.string()).optional(),
  bookCategories: z.array(z.string()).optional(),
  occupation: z.string({ required_error: 'Please select an occupation status.' }),
  occupationOther: z.string().optional(),
  nationality: z.string().min(1, { message: 'Nationality is required.' }),
}).refine(data => !(data.occupation === 'Other' && !data.occupationOther), {
    message: 'Please specify your occupation',
    path: ['occupationOther'],
});

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { userRole, setUserRole } = useUserRole();
  const [peerId, setPeerId] = useState('');
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isEnlistDialogOpen, setEnlistDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      age: '19-25',
      gender: 'Non-binary',
      contentPreference: ['Movies', 'Music'],
      movieGenres: ['Adventure', 'Animation'],
      musicGenres: ['pop', 'lofi'],
      bookCategories: [],
      nationality: 'Indian',
      occupation: 'Student'
    },
  });
  
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        form.reset(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Failed to load profile from localStorage", error);
    }
  }, [form]);

  const contentPreference = form.watch('contentPreference');

  function onSubmit(data: z.infer<typeof profileSchema>) {
    try {
        localStorage.setItem('userProfile', JSON.stringify(data));
        toast({
            title: 'Profile Updated!',
            description: 'Your profile has been successfully updated.',
        });
    } catch (error) {
        console.error("Failed to save profile to localStorage", error);
        toast({
            variant: 'destructive',
            title: 'Error Saving Profile',
            description: 'Could not save your profile. Please try again.',
        });
    }
  }

  const handleEnlistAsPeer = () => {
    setIsCheckingId(true);
    // Simulate checking the ID with a timeout
    setTimeout(() => {
        const storedPeers = JSON.parse(localStorage.getItem('peerSupporters') || '[]');
        const isValid = storedPeers.some((p: { peerId: string }) => p.peerId === peerId);

        if (isValid) {
            setUserRole('peer');
            toast({
                title: 'Congratulations!',
                description: 'You have been successfully enlisted as a Peer Supporter.',
            });
            setEnlistDialogOpen(false);
        } else {
            toast({
                variant: 'destructive',
                title: 'Invalid ID',
                description: 'The peer ID you entered is not valid. Please check and try again.',
            });
        }
        setIsCheckingId(false);
        setPeerId('');
    }, 1000);
  }

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
         <h1 className="font-headline text-3xl font-bold tracking-tight">
          My Profile
        </h1>
      </div>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline mt-2">Edit Your Profile</CardTitle>
          <CardDescription>
            Personalize your experience by telling us a bit about yourself.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age (Years)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select your age range" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ages.map(age => <SelectItem key={age} value={age}>{age}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-4 pt-2">
                            {genders.map(gender => (
                              <FormItem key={gender} className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value={gender} /></FormControl>
                                <FormLabel className="font-normal">{gender}</FormLabel>
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
                    name="occupation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Occupation Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select your occupation" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {occupations.map(occ => <SelectItem key={occ} value={occ}>{occ}</SelectItem>)}
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                             {form.watch('occupation') === 'Other' && (
                                <FormField
                                    control={form.control}
                                    name="occupationOther"
                                    render={({ field }) => (
                                        <FormItem className="mt-2">
                                            <FormControl>
                                                <Input {...field} placeholder="Please specify" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="nationality"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nationality</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Indian" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contentPreference"
                        render={() => (
                            <FormItem>
                                <FormLabel>Content Preference</FormLabel>
                                <div className="flex flex-wrap gap-4 pt-2">
                                {contentPreferences.map((item) => (
                                    <FormField
                                    key={item}
                                    control={form.control}
                                    name="contentPreference"
                                    render={({ field }) => (
                                        <FormItem key={item} className="flex flex-row items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                checked={field.value?.includes(item)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                    ? field.onChange([...(field.value || []), item])
                                                    : field.onChange(field.value?.filter((value) => value !== item));
                                                }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">{item}</FormLabel>
                                        </FormItem>
                                    )}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                  
                    {contentPreference.includes('Movies') && (
                        <FormField
                            control={form.control}
                            name="movieGenres"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Genre (Movies)</FormLabel>
                                <MultiSelect
                                    selected={field.value ?? []}
                                    options={movieGenres.map(g => ({label: g, value: g}))}
                                    onChange={field.onChange}
                                    placeholder="Select movie genres"
                                />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    )}
                    {contentPreference.includes('Music') && (
                        <FormField
                            control={form.control}
                            name="musicGenres"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Genre (Music)</FormLabel>
                                <MultiSelect
                                    selected={field.value ?? []}
                                    options={musicGenres.map(g => ({label: g, value: g}))}
                                    onChange={field.onChange}
                                    placeholder="Select music genres"
                                />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    )}
                    {contentPreference.includes('Books') && (
                        <FormField
                            control={form.control}
                            name="bookCategories"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category (Books)</FormLabel>
                                <MultiSelect
                                    selected={field.value ?? []}
                                    options={bookCategories.map(c => ({label: c, value: c}))}
                                    onChange={field.onChange}
                                    placeholder="Select book categories"
                                />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    )}
              <Button type="submit" className="w-full" size="lg">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
         <CardFooter className="flex flex-col items-center gap-4 border-t pt-6">
            <p className="text-sm text-muted-foreground">Want to help others?</p>
            <Dialog open={isEnlistDialogOpen} onOpenChange={setEnlistDialogOpen}>
            <DialogTrigger asChild>
                 <Button variant="link" className="text-primary p-0 h-auto">
                    <Award className="mr-2 h-4 w-4" /> Enlist as a Peer Supporter
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Become a Peer Supporter</DialogTitle>
                    <DialogDescription>
                        Enter the unique ID provided by the administration to upgrade your account to a Peer Supporter role.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor="peer-id">Peer Supporter ID</Label>
                    <Input id="peer-id" value={peerId} onChange={(e) => setPeerId(e.target.value)} placeholder="Enter your unique ID"/>
                </div>
                <DialogFooter>
                    <Button onClick={handleEnlistAsPeer} disabled={isCheckingId || !peerId}>
                        {isCheckingId && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Verify and Enlist
                    </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
