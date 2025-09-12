
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, FileText, PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

const students = [
  {
    id: 'STU-anon-345',
    riskLevel: 'High',
    lastCheckIn: '2024-07-28',
    avatar: 'https://picsum.photos/seed/STU-anon-345/100/100',
    phq9: 18,
    gad7: 10,
    treatmentPlan: [
        { id: 'tp1', goal: 'Reduce anxiety symptoms', action: 'Weekly CBT sessions, daily mindfulness exercises.', status: 'In Progress' },
    ]
  },
  {
    id: 'STU-anon-789',
    riskLevel: 'High',
    lastCheckIn: '2024-07-27',
    avatar: 'https://picsum.photos/seed/STU-anon-789/100/100',
    phq9: 15,
    gad7: 16,
    treatmentPlan: []
  },
  {
    id: 'STU-anon-123',
    riskLevel: 'Moderate',
    lastCheckIn: '2024-07-27',
    avatar: 'https://picsum.photos/seed/STU-anon-123/100/100',
    phq9: 14,
    gad7: 9,
    treatmentPlan: [
        { id: 'tp2', goal: 'Improve mood and energy levels', action: 'Bi-weekly check-ins, encourage social activities.', status: 'In Progress' },
    ]
  },
];


export default function ProfessionalStudentsPage() {
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
            <Users className="w-8 h-8 text-primary" />
            Manage Students
          </h1>
          <p className="text-muted-foreground">
            View student reports and manage their treatment plans.
          </p>
        </div>
      </div>
      
      {students.map(student => (
        <Card key={student.id}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Avatar className='w-16 h-16'>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.id.slice(-2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{student.id}</CardTitle>
                            <CardDescription>Last check-in: {student.lastCheckIn}</CardDescription>
                        </div>
                    </div>
                     <Badge
                      variant={
                        student.riskLevel === 'High' ? 'destructive' : 'default'
                      }
                      className={
                        student.riskLevel === 'Moderate'
                          ? 'bg-orange-500'
                          : ''
                      }
                    >
                      {student.riskLevel} Risk
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">PHQ-9 Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{student.phq9}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">GAD-7 Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{student.gad7}</p>
                        </CardContent>
                    </Card>
                </div>
                 <div>
                    <h4 className="font-semibold text-lg mb-2">Personalized Treatment Plan</h4>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Goal</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {student.treatmentPlan.length > 0 ? student.treatmentPlan.map(plan => (
                                <TableRow key={plan.id}>
                                    <TableCell>{plan.goal}</TableCell>
                                    <TableCell>{plan.action}</TableCell>
                                    <TableCell><Badge variant="secondary">{plan.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24">No treatment plan created yet.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                 </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline"><PlusCircle className="mr-2"/> Add to Plan</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add to Treatment Plan for {student.id}</DialogTitle>
                        <DialogDescription>
                            Define a new goal and action for this student.
                        </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="goal">Goal</Label>
                                <Input id="goal" name="goal" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="action">Action/Intervention</Label>
                                <Textarea id="action" name="action" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Input id="status" name="status" defaultValue="In Progress" required />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add Goal</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                <Button><FileText className="mr-2"/> View Full Report</Button>
            </CardFooter>
        </Card>
      ))}
    </div>
  );
}
