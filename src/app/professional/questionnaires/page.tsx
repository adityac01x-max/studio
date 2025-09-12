
'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { ArrowLeft, PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

const questionnaires = [
  { id: 'q-phq9', title: 'PHQ-9 (Depression)', questions: 9, status: 'Active' },
  { id: 'q-gad7', title: 'GAD-7 (Anxiety)', questions: 7, status: 'Active' },
  { id: 'q-ghq12', title: 'GHQ-12 (General Health)', questions: 12, status: 'Active' },
  { id: 'q-custom1', title: 'Post-Session Feedback', questions: 5, status: 'Draft' },
]

export default function ProfessionalQuestionnairesPage() {
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
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Manage Questionnaires
          </h1>
          <p className="text-muted-foreground">
            Create, edit, and manage questionnaires for students.
          </p>
        </div>
        <Button>
            <PlusCircle className="mr-2"/>
            Create Questionnaire
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>No. of Questions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {questionnaires.map(q => (
                    <TableRow key={q.id}>
                        <TableCell className="font-medium">{q.title}</TableCell>
                        <TableCell>{q.questions}</TableCell>
                        <TableCell>{q.status}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon"><Edit className="w-4 h-4"/></Button>
                            <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive"/></Button>
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
