
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
import { ArrowLeft, PlusCircle, Edit, Trash2, Milestone, Users, X } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MultiSelect } from '@/components/ui/multi-select';

const allStudents = [
    { value: 'STU-anon-345', label: 'STU-anon-345' },
    { value: 'STU-anon-789', label: 'STU-anon-789' },
    { value: 'STU-anon-123', label: 'STU-anon-123' },
    { value: 'STU-anon-456', label: 'STU-anon-456' },
    { value: 'STU-anon-101', label: 'STU-anon-101' },
    { value: 'STU-anon-999', label: 'STU-anon-999' },
];


const initialRooms = [
    { id: 'room1', name: 'Coming Out Stories', description: 'A safe space to share and listen to coming out experiences.', members: ['STU-anon-123', 'STU-anon-456'] },
    { id: 'room2', name: 'Navigating Relationships', description: 'Discuss challenges and joys in queer relationships.', members: ['STU-anon-345'] },
    { id: 'room3', name: 'Trans & Non-Binary Hangout', description: 'A casual space for trans and non-binary folks to connect.', members: ['STU-anon-789', 'STU-anon-101', 'STU-anon-999'] },
    { id: 'room4', name: 'Art & Activism', description: 'Share your creative work and discuss how art can drive change.', members: [] },
];

type Room = typeof initialRooms[0];

export default function ProfessionalRoomsPage() {
    const { toast } = useToast();
    const [rooms, setRooms] = useState(initialRooms);
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);

    // State for create form
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomDesc, setNewRoomDesc] = useState('');
    const [newRoomMembers, setNewRoomMembers] = useState<string[]>([]);

    // State for edit form
    const [editRoomName, setEditRoomName] = useState('');
    const [editRoomDesc, setEditRoomDesc] = useState('');
    const [editRoomMembers, setEditRoomMembers] = useState<string[]>([]);

    const handleCreateRoom = () => {
        if (newRoomName && newRoomDesc) {
          const newRoom = {
            id: `room${rooms.length + 1}`,
            name: newRoomName,
            description: newRoomDesc,
            members: newRoomMembers,
          };
          setRooms([newRoom, ...rooms]);
          setCreateOpen(false);
          toast({ title: 'Room Created', description: `The room "${newRoomName}" has been successfully created.`});
          // Reset form
          setNewRoomName('');
          setNewRoomDesc('');
          setNewRoomMembers([]);
        }
    };
    
    const openEditDialog = (room: Room) => {
        setRoomToEdit(room);
        setEditRoomName(room.name);
        setEditRoomDesc(room.description);
        setEditRoomMembers(room.members);
        setEditOpen(true);
    }
    
    const handleEditRoom = () => {
        if (roomToEdit) {
            setRooms(rooms.map(r => r.id === roomToEdit.id ? { ...r, name: editRoomName, description: editRoomDesc, members: editRoomMembers } : r));
            setEditOpen(false);
            setRoomToEdit(null);
            toast({ title: 'Room Updated', description: 'The room details have been saved.' });
        }
    }

    const handleDeleteRoom = (id: string) => {
        setRooms(rooms.filter(room => room.id !== id));
        toast({ title: 'Room Deleted', variant: 'destructive'});
    }


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
                                Fill in the details and add initial members to the new discussion room.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Room Name</Label>
                                <Input id="name" name="name" required placeholder="e.g., Mindfulness & Meditation Group" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" required placeholder="A short description of the room's purpose." value={newRoomDesc} onChange={(e) => setNewRoomDesc(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="members">Add Members (Optional)</Label>
                                <MultiSelect
                                    placeholder="Search for students to add..."
                                    options={allStudents}
                                    selected={newRoomMembers}
                                    onChange={setNewRoomMembers}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateRoom}>Create Room</Button>
                        </DialogFooter>
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
                                            {room.members.length}
                                            <div className="flex -space-x-2">
                                                {room.members.slice(0,3).map(memberId => (
                                                    <Avatar key={memberId} className="w-6 h-6 border-2 border-background">
                                                        <AvatarImage src={`https://picsum.photos/seed/${memberId}/100/100`} />
                                                        <AvatarFallback>{memberId.slice(-2)}</AvatarFallback>
                                                    </Avatar>
                                                ))}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(room)}><Edit className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteRoom(room.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
                 <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit: {roomToEdit?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Room Name</Label>
                            <Input id="edit-name" value={editRoomName} onChange={(e) => setEditRoomName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea id="edit-description" value={editRoomDesc} onChange={(e) => setEditRoomDesc(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label>Manage Members</Label>
                            <Card>
                                <CardContent className="p-4 space-y-4">
                                     <MultiSelect
                                        placeholder="Search for students to add..."
                                        options={allStudents}
                                        selected={editRoomMembers}
                                        onChange={setEditRoomMembers}
                                    />
                                    <div className="max-h-48 overflow-y-auto space-y-2">
                                        {editRoomMembers.map(memberId => (
                                            <div key={memberId} className="flex items-center justify-between bg-muted p-2 rounded-md">
                                                <div className="flex items-center gap-2">
                                                     <Avatar className="w-8 h-8">
                                                        <AvatarImage src={`https://picsum.photos/seed/${memberId}/100/100`} />
                                                        <AvatarFallback>{memberId.slice(-2)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium">{memberId}</span>
                                                </div>
                                                <Button size="icon" variant="ghost" onClick={() => setEditRoomMembers(editRoomMembers.filter(m => m !== memberId))}>
                                                    <X className="w-4 h-4"/>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
                        <Button onClick={handleEditRoom}>Save Changes</Button>
                    </DialogFooter>
                 </DialogContent>
            </Dialog>
        </div>
    )
}

    