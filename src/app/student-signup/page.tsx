
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
import Image from 'next/image';
import Link from 'next/link';

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});

export default function StudentSignupPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof signupSchema>) {
    console.log(data);
    toast({
      title: 'Account Created!',
      description: "We've created your account for you.",
    });
    // In a real app, you'd handle signup logic here.
    // For now, we'll just redirect to the profile setup page.
    router.push('/profile');
  }

  return (
     <div className="flex min-h-screen flex-col md:flex-row">
       <div className="relative md:w-1/2 hidden md:block">
         <Image
          src="https://picsum.photos/seed/signup/1200/1600"
          alt="A person writing in a journal"
          fill
          className="object-cover"
          data-ai-hint="journal writing"
        />
        <div className="absolute inset-0 bg-primary/80 flex flex-col justify-center items-center text-primary-foreground p-8">
          <AppLogo className="w-20 h-20" />
          <h1 className="font-headline text-6xl font-bold mt-4">Anubhuti</h1>
          <p className="mt-4 text-xl text-center">
            A step towards a healthier mind. Your space for mental well-being
            and support.
          </p>
        </div>
      </div>
       <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <AppLogo className="w-12 h-12 mx-auto mb-2 text-primary"/>
          <CardTitle className="text-3xl font-headline">Create Your Account</CardTitle>
          <CardDescription>
            Join our community to access wellness tools and support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="student@college.ac.in" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </Form>
        </CardContent>
         <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-xs text-muted-foreground">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
        </CardFooter>
      </Card>
      </div>
    </div>
  );
}
