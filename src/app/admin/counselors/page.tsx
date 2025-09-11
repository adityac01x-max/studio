
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
import { PlusCircle, Trash2, BookUser, ArrowLeft } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import Link from 'next/link';

const initialCounselors = [
  {
    id: 'counselor1',
    name: 'Dr. Sunita Sharma',
    email: 'sunita.sharma@college.ac.in',
    specialty: 'Clinical Psychology, Stress Management',
    availability: 'Mon, Wed, Fri (9am - 5pm)',
    avatar: 'https://picsum.photos/seed/counselor1/100/100',
  },
  {
    id: 'counselor2',
    name: 'Dr. Rohan Mehra',
    email: 'rohan.mehra@college.ac.in',
    specialty: 'Anxiety & Depression, CBT',
    availability: 'Tue, Thu (10am - 6pm)',
    avatar: 'https://picsum.photos/seed/counselor2/100/100',
  },
];

export default function AdminCounselorsPage() {
  const [counselors, setCounselors] = useState(initialCounselors);
  const [open, setOpen] = useState(false);

  const handleAddCounselor = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const specialty = formData.get('specialty') as string;
    const availability = formData.get('availability') as string;

    if (name && email && specialty && availability) {
      const newCounselor = {
        id: `counselor${counselors.length + 1}`,
        name,
        email,
        specialty,
        availability,
        avatar: `https://picsum.photos/seed/${name}/100/100`,
      };
      setCounselors([...counselors, newCounselor]);
      setOpen(false);
      form.reset();
    }
  };

  const handleDeleteCounselor = (id: string) => {
    setCounselors(counselors.filter(counselor => counselor.id !== id));
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
            <BookUser className="w-8 h-8 text-primary" />
            Manage Counselors
          </h1>
          <p className="text-muted-foreground">
            Add, view, or remove college counselors.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Add Counselor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Counselor</DialogTitle>
              <DialogDescription>
                Fill in the details for the new counselor.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCounselor} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="e.g. Dr. Priya Singh" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="e.g. priya.singh@college.ac.in" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input id="specialty" name="specialty" placeholder="e.g. Clinical Psychology" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Input id="availability" name="availability" placeholder="e.g. Mon, Wed (10am - 4pm)" required />
              </div>
              <DialogFooter>
                <Button type="submit">Add Counselor</Button>
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
                <TableHead>Counselor</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {counselors.map((counselor) => (
                <TableRow key={counselor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={counselor.avatar} />
                        <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{counselor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{counselor.specialty}</TableCell>
                  <TableCell>{counselor.availability}</TableCell>
                  <TableCell>{counselor.email}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCounselor(counselor.id)}>
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
