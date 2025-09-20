
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const profileSchema = z.object({
  age: z.string({ required_error: 'Please select an age range.' }),
  gender: z.string({ required_error: 'Please select a gender.' }),
  contentPreference: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  movieGenre: z.string().optional(),
  musicGenre: z.string().optional(),
  bookCategory: z.string().optional(),
  occupation: z.string({ required_error: 'Please select an occupation status.' }),
  otherOccupation: z.string().optional(),
  nationality: z.string().min(1, 'Nationality is required.'),
});

const movieGenres = [
  'Action', 'Science Fiction', 'Adventure', 'Drama', 'Thriller', 'Comedy',
  'Crime', 'Romance', 'Fantasy', 'Western', 'Mystery', 'Animation',
  'Family', 'Horror', 'NA'
];

const musicGenres = [
  'pop', 'rock', 'hip-hop', 'latin', 'country', 'electronic', 'gaming',
  'j-pop', 'metal', 'reggae', 'k-pop', 'arabic', 'folk', 'indian',
  'lofi', 'classical', 'indie', 'bollywood', 'NA'
];

const bookCategories = [
  'History', 'General', 'Fiction', 'Cooking', 'Reference', 'Self-help',
  'Personal Growth', 'Self-Esteem', 'Poetry', 'Biography & Autobiography',
  'Diet & Nutrition', 'Diets', 'Military Science', 'Technology & Engineering',
  'Religion', 'Bibical Biography', 'Personal Memories', 'Philosophy',
  'Political Science', 'Romance', 'NA'
];

export default function ProfilePage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      contentPreference: [],
    },
  });

  const watchOccupation = form.watch('occupation');

  function onSubmit(data: z.infer<typeof profileSchema>) {
    console.log(data);
    toast({
      title: 'Profile Updated',
      description: 'Your preferences have been saved successfully.',
    });
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          My Profile
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
          <CardDescription>
            Tell us more about yourself to personalize your experience.
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
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-4"
                      >
                        {['Under 18', '19-25', '26-40', '41-55', '56 and above'].map((age) => (
                          <FormItem key={age} className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value={age} />
                            </FormControl>
                            <FormLabel className="font-normal">{age}</FormLabel>
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-4"
                      >
                        {['Male', 'Female', 'Non-binary', 'Other'].map((gender) => (
                          <FormItem key={gender} className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value={gender} />
                            </FormControl>
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
                name="contentPreference"
                render={() => (
                  <FormItem>
                    <FormLabel>Content Preference</FormLabel>
                    <div className="flex flex-wrap gap-4">
                      {['Movies', 'Music', 'Books'].map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="contentPreference"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item}
                                className="flex flex-row items-start space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                    control={form.control}
                    name="movieGenre"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Genre (Movies)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {movieGenres.map(genre => <SelectItem key={genre} value={genre}>{genre}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="musicGenre"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Genre (Music)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {musicGenres.map(genre => <SelectItem key={genre} value={genre}>{genre}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="bookCategory"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category (Books)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {bookCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </div>

                <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Occupation Status</FormLabel>
                        <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-4"
                        >
                            {['Employed', 'House wife', 'Business', 'Student', 'Other'].map((occ) => (
                            <FormItem key={occ} className="flex items-center space-x-2">
                                <FormControl>
                                <RadioGroupItem value={occ} />
                                </FormControl>
                                <FormLabel className="font-normal">{occ}</FormLabel>
                            </FormItem>
                            ))}
                        </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                {watchOccupation === 'Other' && (
                    <FormField
                        control={form.control}
                        name="otherOccupation"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Please specify your occupation</FormLabel>
                            <FormControl>
                                <Input placeholder="Your occupation" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

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

              <Button type="submit">Save Preferences</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
