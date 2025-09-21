
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
  DialogClose,
} from '@/components/ui/dialog';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, ArrowLeft, MoreVertical, Trash2, Edit, Eye, Loader2, Pen, Eraser } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Masonry from 'masonry-layout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';


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


const DrawingCanvas = ({ onDrawingChange, initialDrawing }: { onDrawingChange: (dataUrl: string) => void, initialDrawing?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(5);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.lineCap = 'round';
                context.lineJoin = 'round';
                contextRef.current = context;

                if (initialDrawing) {
                    const image = new window.Image();
                    image.src = initialDrawing;
                    image.onload = () => {
                        context.drawImage(image, 0, 0);
                    }
                }
            }
        }
    }, [initialDrawing]);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
            contextRef.current.lineWidth = lineWidth;
            if (tool === 'eraser') {
                 contextRef.current.globalCompositeOperation = 'destination-out';
            } else {
                contextRef.current.globalCompositeOperation = 'source-over';
            }
        }
    }, [color, lineWidth, tool]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (contextRef.current) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            setIsDrawing(true);
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !contextRef.current) return;
        contextRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        contextRef.current.stroke();
    };
    
    const stopDrawing = () => {
        if (contextRef.current) {
            contextRef.current.closePath();
            setIsDrawing(false);
            if (canvasRef.current) {
                onDrawingChange(canvasRef.current.toDataURL());
            }
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas && contextRef.current) {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
            onDrawingChange(canvas.toDataURL());
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 rounded-md border p-2">
                    <Label>Tool</Label>
                    <Button type="button" variant={tool === 'pen' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('pen')}><Pen/></Button>
                    <Button type="button" variant={tool === 'eraser' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('eraser')}><Eraser/></Button>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-2">
                    <Label>Color</Label>
                     <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8" />
                </div>
                <div className="col-span-2 space-y-2 rounded-md border p-2">
                    <Label>Brush Size: {lineWidth}</Label>
                    <Slider defaultValue={[lineWidth]} max={50} step={1} onValueChange={(value) => setLineWidth(value[0])} />
                </div>
            </div>
            <canvas
                ref={canvasRef}
                width="500"
                height="350"
                className="rounded-lg border bg-white cursor-crosshair w-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <Button type="button" onClick={clearCanvas} variant="outline" className="w-full">Clear Canvas</Button>
        </div>
    );
};


export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [drawingData, setDrawingData] = useState<string | undefined>(undefined);

  const gridRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedEntries = localStorage.getItem('journalEntries');
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      } else {
        setEntries(initialEntries);
      }
    } catch (error) {
      console.error("Failed to load journal entries from localStorage", error);
      setEntries(initialEntries);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    }
    if (gridRef.current) {
        const msnry = new Masonry(gridRef.current, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            percentPosition: true,
            gutter: 16,
        });

        // Use imagesLoaded library if image loading is an issue for layout
        msnry.layout?.();
        return () => msnry.destroy?.();
    }
  }, [entries, isLoading]);

  const handleAddEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    if (title && content) {
      const newEntry: JournalEntry = {
        id: Date.now(),
        title,
        content,
        date: new Date().toISOString().split('T')[0],
        image: drawingData
      };
      setEntries([newEntry, ...entries]);
      setAddDialogOpen(false);
      setDrawingData(undefined);
    }
  };

  const handleEditEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedEntry) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    if (title && content) {
        const updatedEntry = { ...selectedEntry, title, content, image: drawingData };
        setEntries(entries.map(e => e.id === selectedEntry.id ? updatedEntry : e));
        setEditDialogOpen(false);
        setSelectedEntry(null);
        setDrawingData(undefined);
    }
  };

  const handleDeleteEntry = (id: number) => {
      setEntries(entries.filter(e => e.id !== id));
  }

  const openViewDialog = (entry: JournalEntry) => {
      setSelectedEntry(entry);
      setViewDialogOpen(true);
  }

  const openEditDialog = (entry: JournalEntry) => {
      setSelectedEntry(entry);
      setDrawingData(entry.image);
      setEditDialogOpen(true);
  }

  if (isLoading) {
      return (
          <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="ml-2">Loading your journal...</p>
          </div>
      )
  }

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
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {setAddDialogOpen(open); if (!open) setDrawingData(undefined); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" /> Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add a New Journal Entry</DialogTitle>
              <DialogDescription>
                Capture a thought, feeling, or memory. Express yourself with words and drawings.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEntry} className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-auto pr-6">
              <div className="space-y-4 flex flex-col">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div className="space-y-2 flex-1 flex flex-col">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" name="content" required className="flex-1" />
                </div>
              </div>
              <div className="space-y-4">
                 <Label>Drawing (Optional)</Label>
                 <DrawingCanvas onDrawingChange={setDrawingData} />
              </div>
              <DialogFooter className="md:col-span-2">
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
                           <div className="relative aspect-[4/3] w-full cursor-pointer" onClick={() => openViewDialog(entry)}>
                                <Image
                                    src={entry.image}
                                    alt={entry.title}
                                    layout="fill"
                                    objectFit="cover"
                                    data-ai-hint={entry.imageHint || 'journal photo'}
                                    className="rounded-t-lg"
                                />
                            </div>
                        )}
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle>{entry.title}</CardTitle>
                                <CardDescription>{new Date(entry.date).toLocaleDateString()}</CardDescription>
                            </div>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon"><MoreVertical /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => openViewDialog(entry)}><Eye className="mr-2"/>View</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openEditDialog(entry)}><Edit className="mr-2"/>Edit</DropdownMenuItem>
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive px-2 py-1.5 font-normal h-auto"><Trash2 className="mr-2"/>Delete</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>This action cannot be undone. This will permanently delete your journal entry.</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteEntry(entry.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent onClick={() => openViewDialog(entry)} className="cursor-pointer">
                            <p className="text-sm text-muted-foreground line-clamp-3">{entry.content}</p>
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

         {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={(open) => {setEditDialogOpen(open); if (!open) setDrawingData(undefined); }}>
          <DialogContent className="max-w-4xl w-full h-[90vh]">
            <DialogHeader>
              <DialogTitle>Edit Journal Entry</DialogTitle>
            </DialogHeader>
            {selectedEntry && (
              <form onSubmit={handleEditEntry} className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-auto pr-6">
                 <div className="space-y-4 flex flex-col">
                    <div className="space-y-2">
                    <Label htmlFor="edit-title">Title</Label>
                    <Input id="edit-title" name="title" defaultValue={selectedEntry.title} required />
                    </div>
                    <div className="space-y-2 flex-1 flex flex-col">
                    <Label htmlFor="edit-content">Content</Label>
                    <Textarea id="edit-content" name="content" defaultValue={selectedEntry.content} required className="flex-1" />
                    </div>
                </div>
                <div className="space-y-4">
                    <Label>Drawing</Label>
                    <DrawingCanvas onDrawingChange={setDrawingData} initialDrawing={selectedEntry.image} />
                </div>
                <DialogFooter className="md:col-span-2">
                  <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
        
        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent className="sm:max-w-2xl">
                {selectedEntry && (
                   <>
                     <DialogHeader>
                        <DialogTitle>{selectedEntry.title}</DialogTitle>
                        <DialogDescription>{new Date(selectedEntry.date).toLocaleDateString()}</DialogDescription>
                    </DialogHeader>
                    {selectedEntry.image && (
                         <div className="relative aspect-video w-full mt-4">
                            <Image src={selectedEntry.image} alt={selectedEntry.title} layout="fill" objectFit="contain" />
                        </div>
                    )}
                    <div className="py-4 whitespace-pre-wrap text-sm text-muted-foreground">
                        {selectedEntry.content}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                   </>
                )}
            </DialogContent>
        </Dialog>
    </div>
  );
}
