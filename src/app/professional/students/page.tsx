
'use client';
import { useState } from 'react';
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
import { ArrowLeft, Users, FileText, PlusCircle, Edit, Trash2, Loader2, BarChart, Activity, Sparkles, Wand2 } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeSocialWellness, AnalyzeSocialWellnessOutput } from '@/ai/flows/analyze-social-wellness';
import { useToast } from '@/hooks/use-toast';


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
    ],
    chatHistory: [
        "I'm so stressed about the upcoming midterms.",
        "Does anyone know if the library is open late this week?",
        "I bombed that chemistry quiz. Feeling like a failure.",
        "Thanks for the notes, you're a lifesaver!",
        "I just want this week to be over.",
    ]
  },
  {
    id: 'STU-anon-789',
    riskLevel: 'High',
    lastCheckIn: '2024-07-27',
    avatar: 'https://picsum.photos/seed/STU-anon-789/100/100',
    phq9: 15,
    gad7: 16,
    treatmentPlan: [],
    chatHistory: [
        "Hey.",
        "Anyone there?",
        "I guess not.",
    ]
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
    ],
    chatHistory: [
        "Who's going to the movie night on Friday?",
        "I'm down for that! Should we grab dinner before?",
        "The new Marvel movie was amazing!",
        "Let's organize a study group for the history final.",
        "Great session today, everyone was so supportive.",
    ]
  },
];

const SocialWellnessReport = ({ studentId, chatHistory }: { studentId: string; chatHistory: string[] }) => {
    const [report, setReport] = useState<AnalyzeSocialWellnessOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const generateReport = async () => {
        setIsLoading(true);
        setReport(null);
        try {
            const result = await analyzeSocialWellness({ messages: chatHistory });
            setReport(result);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not generate the social wellness report.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 space-y-4">
             <div className="text-center">
                <Button onClick={generateReport} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Generate Social Wellness Report
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Analyzes anonymized chat data to provide high-level insights. Does not read or display message content.</p>
            </div>
            {report && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2"><Activity /> Engagement Level</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Badge variant="secondary">{report.engagementLevel}</Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2"><BarChart /> Sentiment Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <Badge variant="secondary">{report.sentimentTrend}</Badge>
                        </CardContent>
                    </Card>
                     <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2"><Sparkles/> Key Themes</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                           {report.keyThemes.map((theme, i) => (
                               <Badge key={i} variant="outline">{theme}</Badge>
                           ))}
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2 bg-muted/30">
                        <CardHeader>
                            <CardTitle className="text-base">AI Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm italic text-muted-foreground">"{report.socialSummary}"</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};


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
            <CardContent>
                <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="plan">Treatment Plan</TabsTrigger>
                        <TabsTrigger value="social">Social Wellness</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
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
                    </TabsContent>
                    <TabsContent value="plan" className="mt-4">
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
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="mt-4"><PlusCircle className="mr-2"/> Add to Plan</Button>
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
                    </TabsContent>
                     <TabsContent value="social" className="mt-4">
                        <SocialWellnessReport studentId={student.id} chatHistory={student.chatHistory} />
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-6">
                <Button><FileText className="mr-2"/> View Full Report</Button>
            </CardFooter>
        </Card>
      ))}
    </div>
  );
}
