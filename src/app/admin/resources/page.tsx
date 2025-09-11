
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  PlusCircle,
  Trash2,
  Library,
  BookOpen,
  Headphones,
  PlayCircle,
  ArrowLeft,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

const initialResources = [
  {
    id: 'vid1',
    title: 'Mindfulness Meditation (Hindi)',
    type: 'Video',
    language: 'Hindi',
    url: 'https://www.youtube.com/watch?v=example1',
  },
  {
    id: 'aud1',
    title: 'Calming Ocean Sounds',
    type: 'Audio',
    language: 'N/A',
    url: 'https://www.spotify.com/example1',
  },
  {
    id: 'gui1',
    title: 'Guide to Managing Stress (English)',
    type: 'Guide',
    language: 'English',
    url: 'https://www.example.com/guide-stress',
  },
    {
    id: 'vid2',
    title: 'Yoga for Beginners (Tamil)',
    type: 'Video',
    language: 'Tamil',
    url: 'https://www.youtube.com/watch?v=example2',
  },
];

export default function AdminResourcesPage() {
  const [resources, setResources] = useState(initialResources);
  const [open, setOpen] = useState(false);

  const handleAddResource = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const language = formData.get('language') as string;
    const url = formData.get('url') as string;

    if (title && type && language && url) {
      const newResource = {
        id: `res${resources.length + 1}`,
        title,
        type,
        language,
        url,
      };
      setResources([...resources, newResource]);
      setOpen(false);
      form.reset();
    }
  };

    const handleDeleteResource = (id: string) => {
    setResources(resources.filter(res => res.id !== id));
  }

  const TypeIcon = ({ type }: { type: string }) => {
    if (type === 'Video') return <PlayCircle className="w-5 h-5 text-primary" />;
    if (type === 'Audio') return <Headphones className="w-5 h-5 text-primary" />;
    if (type === 'Guide') return <BookOpen className="w-5 h-5 text-primary" />;
    return null;
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <div className='flex-1'>
          <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
            <Library className="w-8 h-8 text-primary" />
            Manage Resources
          </h1>
          <p className="text-muted-foreground">
            Add, view, or remove resources from the student hub.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>
                Fill in the details for the new resource.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddResource} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Audio">Audio</SelectItem>
                      <SelectItem value="Guide">Guide/Article</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select name="language" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Bengali">Bengali</SelectItem>
                      <SelectItem value="Telugu">Telugu</SelectItem>
                      <SelectItem value="N/A">N/A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" name="url" type="url" required />
              </div>
              <DialogFooter>
                <Button type="submit">Add Resource</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <TypeIcon type={resource.type} />
                        {resource.type}
                    </div>
                  </TableCell>
                  <TableCell>{resource.language}</TableCell>
                  <TableCell>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                      {resource.url}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteResource(resource.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
