
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, PlusCircle, Edit, Trash2, Milestone, Users } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const initialRooms = [
    { id: 'room1', name: 'Coming Out Stories', description: 'A safe space to share and listen to coming out experiences.', members: 12 },
    { id: 'room2', name: 'Navigating Relationships', description: 'Discuss challenges and joys in queer relationships.', members: 8 },
    { id: 'room3', name: 'Trans & Non-Binary Hangout', description: 'A casual space for trans and non-binary folks to connect.', members: 21 },
    { id: 'room4', name: 'Art & Activism', description: 'Share your creative work and discuss how art can drive change.', members: 5 },
];

export default function ProfessionalRoomsPage() {
    const { toast } = useToast();
    const [rooms, setRooms] = useState(initialRooms);
    const [isCreateOpen, setCreateOpen] = useState(false);

    const handleCreateRoom = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
    
        if (name && description) {
          const newRoom = {
            id: `room${rooms.length + 1}`,
            name,
            description,
            members: 0,
          };
          setRooms([newRoom, ...rooms]);
          setCreateOpen(false);
          toast({ title: 'Room Created', description: `The room "${name}" has been successfully created.`})
        }
      };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/professional/dashboard" passHref>
                    <Button variant="outline" size="icon">
                        <ArrowLeft />
                        <span className="sr-only">Back to Dashboard</span>
                    </Button>
                </Link>
                <div className="flex-1">
                    <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Milestone className="w-8 h-8 text-primary" />
                        Manage Community Rooms
                    </h1>
                    <p className="text-muted-foreground">
                        Create and manage group discussion rooms for the 'Be Your Own Voice' section.
                    </p>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Create Room
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Community Room</DialogTitle>
                            <DialogDescription>
                                Fill in the details for the new discussion room.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateRoom} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Room Name</Label>
                                <Input id="name" name="name" required placeholder="e.g., Mindfulness & Meditation Group" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" required placeholder="A short description of the room's purpose." />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create Room</Button>
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
                                <TableHead>Room Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Members</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rooms.map(room => (
                                <TableRow key={room.id}>
                                    <TableCell className="font-medium">{room.name}</TableCell>
                                    <TableCell className="text-muted-foreground max-w-sm truncate">{room.description}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            {room.members}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
