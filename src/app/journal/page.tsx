
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Trash2, Edit, MoreHorizontal, Loader2, BookOpen, Smile, Frown, Meh } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

type Mood = 'Positive' | 'Negative' | 'Neutral';

type JournalEntry = {
  id: number;
  title: string;
  content: string;
  date: string;
  mood: Mood;
  imageUrl?: string;
};

const mockEntries: JournalEntry[] = [
    {
        id: 1,
        title: 'A Moment of Peace',
        content: 'Today, I took a walk in the park during my lunch break. The sun was warm, and a gentle breeze was blowing. I sat on a bench and just watched the leaves dance in the wind. It was a simple moment, but it brought me a profound sense of calm and gratitude. I felt disconnected from my worries, even if just for a little while. I want to remember this feeling.',
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        mood: 'Positive',
        imageUrl: 'https://picsum.photos/seed/peace/600/400'
    },
    {
        id: 2,
        title: 'Tackled a Difficult Task',
        content: "I finally finished the project I've been procrastinating on for weeks. It wasn't as bad as I thought it would be once I got started. I feel a huge weight off my shoulders. It's a good reminder that often, the anticipation is worse than the reality. I feel accomplished and motivated to keep this momentum going.",
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        mood: 'Positive',
        imageUrl: 'https://picsum.photos/seed/task/600/400'
    },
    {
        id: 4,
        title: 'Feeling a bit down',
        content: "Feeling a bit overwhelmed and sad today. Not sure why, just one of those days where everything feels heavy. I hope tomorrow is better.",
        date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
        mood: 'Negative',
        imageUrl: 'https://picsum.photos/seed/sad-day/600/400'
    },
    {
        id: 5,
        title: 'Just a regular day',
        content: "Nothing much happened today. Went to classes, did some homework. It was an okay day, not particularly good or bad. Just a neutral, average day.",
        date: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
        mood: 'Neutral',
        imageUrl: 'https://picsum.photos/seed/neutral-day/600/400'
    },
    {
        id: 3,
        title: 'A Small Act of Kindness',
        content: 'I complimented a stranger on their jacket today, and their face lit up. It was a small interaction, but it made both of us smile. It costs nothing to be kind, and it made my whole day better. It\'s amazing how a few positive words can change the energy around you.',
        date: new Date().toISOString(), // Today
        mood: 'Positive',
        imageUrl: 'https://picsum.photos/seed/kindness/600/400'
    },
    {
        id: 6,
        title: 'Frustrated with my progress',
        content: "I feel like I'm not making any progress on my goals. It's frustrating to put in the effort and not see results. I feel stuck.",
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        mood: 'Negative',
        imageUrl: 'https://picsum.photos/seed/frustrated/600/400'
    },
    {
        id: 7,
        title: 'An uneventful evening',
        content: "Spent the evening watching a movie. It was okay, but not memorable. Just a quiet night in. Nothing special to report.",
        date: new Date(Date.now() - 86400000 * 6).toISOString(),
        mood: 'Neutral',
        imageUrl: 'https://picsum.photos/seed/uneventful/600/400'
    },
    {
        id: 8,
        title: 'Argument with a friend',
        content: "Had a disagreement with a close friend today. It left me feeling really upset and drained. I hope we can work it out soon.",
        date: new Date().toISOString(),
        mood: 'Negative',
        imageUrl: 'https://picsum.photos/seed/argument/600/400'
    }
];

const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

const JournalGrid = ({ entries, onEdit, onView, onDelete }: { entries: JournalEntry[], onEdit: (e: JournalEntry) => void, onView: (e: JournalEntry) => void, onDelete: (e: JournalEntry) => void }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 border-dashed border-2 rounded-lg mt-4">
        <BookOpen className="mx-auto w-12 h-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No entries for this mood</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Click "Add Entry" to add one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="flex flex-col">
          {entry.imageUrl && (
            <div className="relative w-full h-48">
              <Image src={entry.imageUrl} alt={entry.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint="journal image" />
            </div>
          )}
          <CardHeader>
            <CardTitle className="truncate">{entry.title}</CardTitle>
            <CardDescription>
              {new Date(entry.date).toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="line-clamp-4 text-sm text-muted-foreground">
              {entry.content}
            </p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onView(entry)}>View</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onEdit(entry)}>
                  <Edit className="mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(entry)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};


export default function JournalPage() {
  const { toast } = useToast();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState<JournalEntry | null>(null);
  const [entryToView, setEntryToView] = useState<JournalEntry | null>(null);
  const [entryToDelete, setEntryToDelete] = useState<JournalEntry | null>(null);

  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem('journalEntries');
      if (savedEntries && JSON.parse(savedEntries).length > 0) {
        setEntries(JSON.parse(savedEntries));
      } else {
        setEntries(mockEntries);
      }
    } catch (error) {
      console.error('Failed to load journal entries from localStorage', error);
      setEntries(mockEntries);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('journalEntries', JSON.stringify(entries));
      } catch (error) {
        console.error('Failed to save journal entries to localStorage', error);
      }
    }
  }, [entries, isLoading]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const mood = formData.get('mood') as Mood;
    const imageFile = formData.get('image') as File;

    if (!mood) {
        toast({ title: 'Error', description: 'Please select a mood for your entry.', variant: 'destructive'});
        return;
    }

    let imageUrl = entryToEdit?.imageUrl;
    if (imageFile && imageFile.size > 0) {
        try {
            imageUrl = await fileToDataURL(imageFile);
        } catch (error) {
            toast({ title: 'Error', description: 'Could not upload image.', variant: 'destructive'});
            return;
        }
    }


    if (entryToEdit) {
      // Editing existing entry
      setEntries(
        entries.map((entry) =>
          entry.id === entryToEdit.id
            ? { ...entry, title, content, mood, imageUrl, date: new Date().toISOString() }
            : entry
        )
      );
      toast({ title: 'Success', description: 'Journal entry updated.' });
    } else {
      // Adding new entry
      const newEntry: JournalEntry = {
        id: Date.now(),
        title,
        content,
        mood,
        imageUrl,
        date: new Date().toISOString(),
      };
      setEntries([newEntry, ...entries]);
      toast({ title: 'Success', description: 'New journal entry added.' });
    }
    setDialogOpen(false);
    setEntryToEdit(null);
  };

  const openEditDialog = (entry: JournalEntry) => {
    setEntryToEdit(entry);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (entryToDelete) {
      setEntries(entries.filter((entry) => entry.id !== entryToDelete.id));
      toast({
        title: 'Deleted',
        description: 'Journal entry has been deleted.',
      });
      setEntryToDelete(null);
    }
  };
  
  const positiveEntries = entries.filter(e => e.mood === 'Positive');
  const negativeEntries = entries.filter(e => e.mood === 'Negative');
  const neutralEntries = entries.filter(e => e.mood === 'Neutral');

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
            <Link href="/dashboard" passHref>
            <Button variant="outline" size="icon">
                <ArrowLeft />
                <span className="sr-only">Back</span>
            </Button>
            </Link>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
            My Journal
            </h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEntryToEdit(null); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" /> Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {entryToEdit ? 'Edit Journal Entry' : 'New Journal Entry'}
              </DialogTitle>
              <DialogDescription>
                {entryToEdit
                  ? 'Make changes to your journal entry.'
                  : 'Write down your thoughts and feelings. This is a safe space.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={entryToEdit?.title || ''}
                  placeholder="e.g., A good day"
                  required
                />
              </div>
               <div className="space-y-2">
                <Label>Mood</Label>
                <RadioGroup name="mood" defaultValue={entryToEdit?.mood} className="flex gap-4 pt-2">
                    <Label className={cn("flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground", entryToEdit?.mood === 'Positive' && "border-green-500")}>
                        <RadioGroupItem value="Positive" className="sr-only" />
                        <Smile className="w-8 h-8 text-green-500 mb-2"/>
                        Positive
                    </Label>
                    <Label className={cn("flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground", entryToEdit?.mood === 'Negative' && "border-red-500")}>
                        <RadioGroupItem value="Negative" className="sr-only" />
                        <Frown className="w-8 h-8 text-red-500 mb-2"/>
                        Negative
                    </Label>
                    <Label className={cn("flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground", entryToEdit?.mood === 'Neutral' && "border-yellow-500")}>
                        <RadioGroupItem value="Neutral" className="sr-only" />
                        <Meh className="w-8 h-8 text-yellow-500 mb-2"/>
                        Neutral
                    </Label>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Body</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={entryToEdit?.content || ''}
                  placeholder="What's on your mind?"
                  required
                  rows={10}
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="image">Image (Optional)</Label>
                <Input id="image" name="image" type="file" accept="image/*" />
                 {entryToEdit?.imageUrl && (
                    <div className="mt-2">
                        <p className="text-sm text-muted-foreground">Current image:</p>
                        <Image src={entryToEdit.imageUrl} alt="Current journal image" width={100} height={100} className="rounded-md mt-1" />
                    </div>
                )}
              </div>
              <DialogFooter>
                <Button type="submit">
                  {entryToEdit ? 'Save Changes' : 'Save Entry'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="positive">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="negative">Negative</TabsTrigger>
          <TabsTrigger value="neutral">Neutral</TabsTrigger>
        </TabsList>
        <TabsContent value="positive">
            <JournalGrid entries={positiveEntries} onEdit={openEditDialog} onView={setEntryToView} onDelete={setEntryToDelete} />
        </TabsContent>
        <TabsContent value="negative">
            <JournalGrid entries={negativeEntries} onEdit={openEditDialog} onView={setEntryToView} onDelete={setEntryToDelete} />
        </TabsContent>
        <TabsContent value="neutral">
            <JournalGrid entries={neutralEntries} onEdit={openEditDialog} onView={setEntryToView} onDelete={setEntryToDelete} />
        </TabsContent>
      </Tabs>


      {/* View Entry Dialog */}
      <Dialog open={!!entryToView} onOpenChange={() => setEntryToView(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{entryToView?.title}</DialogTitle>
            <DialogDescription>
              {entryToView ? new Date(entryToView.date).toLocaleString() : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="prose dark:prose-invert max-h-[60vh] overflow-y-auto p-1 space-y-4">
            {entryToView?.imageUrl && (
                 <div className="relative w-full aspect-video">
                    <Image src={entryToView.imageUrl} alt={entryToView.title} layout="fill" objectFit="contain" className="rounded-md" />
                 </div>
            )}
            <p style={{ whiteSpace: 'pre-wrap' }}>{entryToView?.content}</p>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!entryToDelete} onOpenChange={() => setEntryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your journal entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
