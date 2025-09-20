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
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { AppLogo } from '@/components/icons';

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

export default function StudentSignupPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      contentPreference: [],
      movieGenres: [],
      musicGenres: [],
      bookCategories: [],
      nationality: '',
    },
  });

  const contentPreference = form.watch('contentPreference');

  function onSubmit(data: z.infer<typeof profileSchema>) {
    console.log(data);
    toast({
      title: 'Account Created!',
      description: 'Your profile has been successfully created.',
    });
    router.push('/student-login');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary rounded-full p-3 w-fit">
                <AppLogo className="w-8 h-8 text-primary-foreground" />
            </div>
          <CardTitle className="text-3xl font-headline mt-2">Create Your Student Profile</CardTitle>
          <CardDescription>
            Help us personalize your experience by telling us a bit about yourself.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info Column */}
                <div className="space-y-6">
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
                </div>
                {/* Preferences Column */}
                <div className="space-y-6">
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
                                                    ? field.onChange([...field.value, item])
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
                                <Select onValueChange={value => field.onChange([value])}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a movie genre" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    {movieGenres.map(genre => <SelectItem key={genre} value={genre}>{genre}</SelectItem>)}
                                </SelectContent>
                                </Select>
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
                                <Select onValueChange={value => field.onChange([value])} >
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a music genre" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    {musicGenres.map(genre => <SelectItem key={genre} value={genre}>{genre}</SelectItem>)}
                                </SelectContent>
                                </Select>
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
                                <Select onValueChange={value => field.onChange([value])}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a book category" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    {bookCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    )}
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">Create Account and Proceed</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
