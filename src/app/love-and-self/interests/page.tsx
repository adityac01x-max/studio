
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const identities = [
  'Lesbian', 'Gay', 'Bisexual', 'Transgender', 'Queer', 'Questioning',
  'Intersex', 'Asexual', 'Pansexual', 'Non-binary', 'Genderqueer', 'Two-spirit',
  'Heterosexual', 'Others'
];

const interests = [
  'Art & Culture', 'Activism', 'Movies & TV', 'Gaming', 'Music', 'Literature',
  'Technology', 'Travel', 'Sports', 'Fashion', 'Foodie', 'History'
];

export default function InterestsPage() {
    const { toast } = useToast();
    const [selectedIdentities, setSelectedIdentities] = useState<string[]>(['Queer', 'Non-binary']);
    const [selectedInterests, setSelectedInterests] = useState<string[]>(['Art & Culture', 'Music']);

    const toggleSelection = (category: 'identities' | 'interests', value: string) => {
        const selections = category === 'identities' ? selectedIdentities : selectedInterests;
        const setSelections = category === 'identities' ? setSelectedIdentities : setSelectedInterests;
        
        if (selections.includes(value)) {
            setSelections(selections.filter(item => item !== value));
        } else {
            setSelections([...selections, value]);
        }
    }

    const handleSaveChanges = () => {
        toast({
            title: 'Preferences Saved!',
            description: 'Your profile has been updated.',
        });
    }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          My Interests & Identity
        </h1>
        <p className="text-muted-foreground">
          Help us personalize your experience by sharing a bit about yourself. This information is kept private.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Identity</CardTitle>
          <CardDescription>Select the labels that resonate with you. You can choose as many as you like.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {identities.map(identity => {
                const isSelected = selectedIdentities.includes(identity);
                return (
                    <Button key={identity} variant={isSelected ? "default" : "outline"} onClick={() => toggleSelection('identities', identity)} className="rounded-full">
                        {isSelected && <Check className="mr-2 h-4 w-4" />}
                        {identity}
                    </Button>
                )
            })}
          </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>My Interests</CardTitle>
          <CardDescription>What do you love to do? Select your hobbies and passions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {interests.map(interest => {
                 const isSelected = selectedInterests.includes(interest);
                 return (
                    <Button key={interest} variant={isSelected ? "secondary" : "outline"} onClick={() => toggleSelection('interests', interest)} className="rounded-full">
                         {isSelected && <Check className="mr-2 h-4 w-4" />}
                         {interest}
                    </Button>
                 )
            })}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
}
