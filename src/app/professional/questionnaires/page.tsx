
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
import { ArrowLeft, PlusCircle, Edit, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const initialQuestionnaires = [
  { id: 'q-phq9', title: 'PHQ-9 (Depression)', questions: 9, status: 'Active' },
  { id: 'q-gad7', title: 'GAD-7 (Anxiety)', questions: 7, status: 'Active' },
  { id: 'q-ghq12', title: 'GHQ-12 (General Health)', questions: 12, status: 'Active' },
  { id: 'q-custom1', title: 'Post-Session Feedback', questions: 5, status: 'Draft' },
]

export default function ProfessionalQuestionnairesPage() {
  const [questionnaires, setQuestionnaires] = useState(initialQuestionnaires);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [questionnaireToEdit, setQuestionnaireToEdit] = useState<any>(null);

  const handleAddQuestionnaire = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const questions = (formData.get('questions') as string).split('\n').filter(q => q.trim() !== '');
    
    if (title && questions.length > 0) {
      const newQuestionnaire = {
        id: `q-custom${questionnaires.length}`,
        title,
        questions: questions.length,
        status: 'Draft',
      };
      setQuestionnaires([...questionnaires, newQuestionnaire]);
      setCreateDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
      setQuestionnaires(questionnaires.filter(q => q.id !== id));
  }

  const openEditDialog = (q: any) => {
      setQuestionnaireToEdit(q);
      setEditDialogOpen(true);
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
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Manage Questionnaires
          </h1>
          <p className="text-muted-foreground">
            Create, edit, and manage questionnaires for students.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2"/>
                    Create Questionnaire
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                 <DialogHeader>
                    <DialogTitle>Create New Questionnaire</DialogTitle>
                    <DialogDescription>
                        Manually create a new questionnaire or upload one from a file.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="manual">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="manual">Create Manually</TabsTrigger>
                        <TabsTrigger value="upload">Upload File</TabsTrigger>
                    </TabsList>
                    <TabsContent value="manual">
                        <form onSubmit={handleAddQuestionnaire} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Questionnaire Title</Label>
                                <Input id="title" name="title" required placeholder="e.g. Weekly Mood Check-in"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="questions">Questions</Label>
                                <Textarea id="questions" name="questions" required placeholder="Enter each question on a new line." rows={8}/>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create and Save as Draft</Button>
                            </DialogFooter>
                        </form>
                    </TabsContent>
                    <TabsContent value="upload">
                         <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="file-upload">Upload File</Label>
                                <Input id="file-upload" type="file" accept=".json,.csv" />
                                <p className="text-sm text-muted-foreground">
                                    Upload a JSON or CSV file. The file should contain a list of questions.
                                </p>
                            </div>
                             <DialogFooter>
                                <Button>
                                    <Upload className="mr-2 h-4 w-4"/> Upload and Create
                                </Button>
                            </DialogFooter>
                         </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
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
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(q)}><Edit className="w-4 h-4"/></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(q.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Questionnaire</DialogTitle>
            </DialogHeader>
            {questionnaireToEdit && (
                 <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-title">Title</Label>
                        <Input id="edit-title" defaultValue={questionnaireToEdit.title} />
                    </div>
                     <div className="space-y-2">
                        <Label>Status</Label>
                        <Input defaultValue={questionnaireToEdit.status} />
                    </div>
                     <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                 </form>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
