
'use client';

import { useState } from 'react';
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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Masonry from 'masonry-layout';
import React, { useEffect, useRef } from 'react';

type JournalEntry = {
  id: number;
  title: string;
  date: string;
  content: string;
  image?: string;
  imageHint?: string;
};

const initialEntries: JournalEntry[] = [
  {
    id: 1,
    title: 'Sunny Day at the Park',
    date: '2024-07-28',
    content:
      'Felt so good to be outside today. The sun was warm and there was a gentle breeze. I watched dogs playing and just felt a sense of peace.',
    image: 'https://picsum.photos/seed/journal1/600/400',
    imageHint: 'park sun',
  },
  {
    id: 2,
    title: 'Finished a Great Book',
    date: '2024-07-27',
    content:
      "Just finished reading 'The Midnight Library.' What a fantastic story. It really made me think about life's possibilities and the choices we make. Feeling inspired.",
    image: 'https://picsum.photos/seed/journal2/600/800',
    imageHint: 'book cafe',
  },
  {
    id: 3,
    title: 'Coffee with a Friend',
    date: '2024-07-26',
    content:
      'Caught up with an old friend today over coffee. We laughed so much and it was just what I needed. Grateful for good company.',
  },
  {
    id: 4,
    title: 'Tried a New Recipe',
    date: '2024-07-25',
    content: 'Made homemade pasta for the first time! It was a bit messy but so much fun. And it tasted delicious!',
    image: 'https://picsum.photos/seed/journal4/800/600',
    imageHint: 'homemade pasta',
  },
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const msnry = new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true,
        gutter: 16
      });
        // ImagesLoaded can be used here to perfect layout after images load
        msnry.layout?.();
        return () => msnry.destroy?.();
    }
  }, [entries]);

  const handleAddEntry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File;

    if (title && content) {
      const newEntry: JournalEntry = {
        id: Date.now(),
        title,
        content,
        date: new Date().toISOString().split('T')[0],
      };
      if (imageFile && imageFile.size > 0) {
        newEntry.image = URL.createObjectURL(imageFile);
      }
      setEntries([newEntry, ...entries]);
      setAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
            <Link href="/dashboard" passHref>
            <Button variant="outline" size="icon">
                <ArrowLeft />
                <span className="sr-only">Back to Dashboard</span>
            </Button>
            </Link>
            <div className="flex-1">
            <h1 className="font-headline text-3xl font-bold tracking-tight">
                My Memory Journal
            </h1>
            <p className="text-muted-foreground">
                A space to capture positive moments and reflections.
            </p>
            </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" /> Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Journal Entry</DialogTitle>
              <DialogDescription>
                Capture a thought, feeling, or memory.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEntry} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" required rows={5} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image (Optional)</Label>
                <Input id="image" name="image" type="file" accept="image/*" />
              </div>
              <DialogFooter>
                <Button type="submit">Save Entry</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

       <div ref={gridRef} className="w-full">
            {entries.map((entry) => (
                <div key={entry.id} className="grid-item w-full sm:w-1/2 md:w-1/3 p-2">
                    <Card>
                        {entry.image && (
                            <CardContent className="p-0">
                            <Image
                                src={entry.image}
                                alt={entry.title}
                                width={600}
                                height={400}
                                data-ai-hint={entry.imageHint || 'journal photo'}
                                className="rounded-t-lg object-cover w-full h-auto"
                            />
                            </CardContent>
                        )}
                        <CardHeader>
                            <CardTitle>{entry.title}</CardTitle>
                            <CardDescription>{new Date(entry.date).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{entry.content}</p>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
         {entries.length === 0 && (
            <div className="text-center py-24 border-dashed border-2 rounded-lg">
                <h3 className="text-xl font-semibold">Your Journal is Empty</h3>
                <p className="text-muted-foreground mt-2">Click "Add Entry" to capture your first memory.</p>
            </div>
         )}
    </div>
  );
}
