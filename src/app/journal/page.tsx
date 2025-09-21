
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
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Trash2, Edit, MoreHorizontal, Loader2, BookOpen } from 'lucide-react';
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type JournalEntry = {
  id: number;
  title: string;
  content: string;
  date: string;
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
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error('Failed to load journal entries from localStorage', error);
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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (entryToEdit) {
      // Editing existing entry
      setEntries(
        entries.map((entry) =>
          entry.id === entryToEdit.id
            ? { ...entry, title, content, date: new Date().toISOString() }
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
                <Label htmlFor="content">Body</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={entryToEdit?.content || ''}
                  placeholder="What's on your mind?"
                  required
                  rows={15}
                />
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

      {entries.length === 0 ? (
        <div className="text-center py-12 border-dashed border-2 rounded-lg">
          <BookOpen className="mx-auto w-12 h-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Your journal is empty</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Click "Add Entry" to write your first journal post.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <Card key={entry.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="truncate">{entry.title}</CardTitle>
                <CardDescription>
                  {new Date(entry.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-4 text-sm text-muted-foreground">
                  {entry.content}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEntryToView(entry)}>View</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => openEditDialog(entry)}>
                      <Edit className="mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setEntryToDelete(entry)}
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
      )}

      {/* View Entry Dialog */}
      <Dialog open={!!entryToView} onOpenChange={() => setEntryToView(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{entryToView?.title}</DialogTitle>
            <DialogDescription>
              {entryToView ? new Date(entryToView.date).toLocaleString() : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="prose dark:prose-invert max-h-[60vh] overflow-y-auto">
            <p>{entryToView?.content}</p>
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
