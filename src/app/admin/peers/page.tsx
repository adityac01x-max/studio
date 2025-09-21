
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
import { PlusCircle, Trash2, Users, ArrowLeft, Copy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';


const generatePeerId = () => {
  return `PEER-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

const initialPeerSupporters = [
  {
    id: 'peer1',
    peerId: generatePeerId(),
    name: 'Rohan Kumar',
    email: 'rohan.kumar.22@college.ac.in',
    year: '3rd Year, Psychology',
    avatar: 'https://picsum.photos/seed/peer1/100/100',
  },
  {
    id: 'peer2',
    peerId: generatePeerId(),
    name: 'Priya Singh',
    email: 'priya.singh.21@college.ac.in',
    year: '4th Year, Sociology',
    avatar: 'https://picsum.photos/seed/peer2/100/100',
  },
  {
    id: 'peer3',
    peerId: generatePeerId(),
    name: 'Aditya Verma',
    email: 'aditya.verma.22@college.ac.in',
    year: '3rd Year, Social Work',
    avatar: 'https://picsum.photos/seed/peer3/100/100',
  },
];

export default function AdminPeersPage() {
  const { toast } = useToast();
  const [peers, setPeers] = useState(initialPeerSupporters);
  const [open, setOpen] = useState(false);

  // Store peers in localStorage to be accessed by the profile page for verification
  useEffect(() => {
    localStorage.setItem('peerSupporters', JSON.stringify(peers.map(p => ({ peerId: p.peerId, name: p.name }))));
  }, [peers]);

  const handleAddPeer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const year = formData.get('year') as string;

    if (name && email && year) {
        const newPeer = {
            id: `peer${peers.length + 1}`,
            peerId: generatePeerId(),
            name,
            email,
            year,
            avatar: `https://picsum.photos/seed/${name}/100/100`,
        };
        setPeers([...peers, newPeer]);
        setOpen(false);
        form.reset();
        toast({
          title: "Peer Supporter Added",
          description: `A new ID has been generated for ${name}.`
        })
    }
  };

  const handleDeletePeer = (id: string) => {
    setPeers(peers.filter(peer => peer.id !== id));
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "The Peer ID has been copied."
    });
  }

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
            <Users className="w-8 h-8 text-primary" />
            Manage Peer Supporters
          </h1>
          <p className="text-muted-foreground">
            Add, view, or remove trained peer supporters and generate their unique IDs.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Add Peer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Peer Supporter</DialogTitle>
              <DialogDescription>
                Fill in the details. A unique ID will be generated upon creation.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPeer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="e.g. Anjali Gupta" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="e.g. anjali.gupta.23@college.ac.in" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year & Major</Label>
                <Input id="year" name="year" placeholder="e.g. 2nd Year, Computer Science" required />
              </div>
              <DialogFooter>
                <Button type="submit">Add Supporter</Button>
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
                <TableHead>Student</TableHead>
                <TableHead>Peer ID</TableHead>
                <TableHead>Year & Major</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peers.map((peer) => (
                <TableRow key={peer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={peer.avatar} />
                        <AvatarFallback>{peer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{peer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{peer.peerId}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(peer.peerId)}>
                        <Copy className="h-4 w-4"/>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{peer.year}</TableCell>
                  <TableCell>{peer.email}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDeletePeer(peer.id)}>
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
