
'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ChevronDown, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Data for Questionnaires
const kinseyQuestions = [
  {
    value: '0',
    label: 'Exclusively Heterosexual',
    description: 'No homosexual experiences or desires.',
  },
  {
    value: '1',
    label: 'Predominantly Heterosexual, only incidentally Homosexual',
    description: 'Primarily heterosexual, but with some homosexual experiences.',
  },
  {
    value: '2',
    label: 'Predominantly Heterosexual, but more than incidentally Homosexual',
    description:
      'More than incidental homosexual experiences but still primarily heterosexual.',
  },
  {
    value: '3',
    label: 'Equally Heterosexual and Homosexual',
    description:
      'Experiences and desires are about evenly split between heterosexual and homosexual.',
  },
  {
    value: '4',
    label: 'Predominantly Homosexual, but more than incidentally Heterosexual',
    description:
      'Primarily homosexual, but with more than incidental heterosexual experiences.',
  },
  {
    value: '5',
    label: 'Predominantly Homosexual, only incidentally Heterosexual',
    description: 'Almost entirely homosexual with some heterosexual experience.',
  },
  {
    value: '6',
    label: 'Exclusively Homosexual',
    description: 'No heterosexual experiences or desires.',
  },
  {
    value: 'X',
    label: 'No Socio-sexual Contacts or Reactions',
    description: 'Asexual or non-sexual.',
  },
];

const kleinGridVariables = [
  'Sexual Attraction',
  'Sexual Behavior',
  'Sexual Fantasies',
  'Emotional Preference',
  'Social Preference',
  'Self-Identification',
  'Lifestyle',
];
const kleinTimeFrames = ['Past', 'Present', 'Ideal'];
const kleinOptions = [
  { value: 1, label: 'Other Sex Only' },
  { value: 2, label: 'Other Sex Mostly' },
  { value: 3, label: 'Other Sex Somewhat More' },
  { value: 4, label: 'Both Sexes Equally' },
  { value: 5, label: 'Same Sex Somewhat More' },
  { value: 6, label: 'Same Sex Mostly' },
  { value: 7, label: 'Same Sex Only' },
];

const minorityStressQuestions = [
    { id: 'ms1', text: 'In the past year, have you felt that you had to hide your sexual orientation or gender identity to avoid discrimination or judgment?' },
    { id: 'ms2', text: 'Have you experienced rejection from family or friends because of your identity?' },
    { id: 'ms3', text: 'Have you been treated unfairly at work or school due to your identity?' },
    { id: 'ms4', text: 'Do you worry about being physically harmed because of your identity?' },
    { id: 'ms5', text: 'Have you felt that you needed to be on guard to protect yourself from harassment?' },
];
const stressOptions = [
    { label: 'Never', value: 0 },
    { label: 'Rarely', value: 1 },
    { label: 'Sometimes', value: 2 },
    { label: 'Often', value: 3 },
];

// Main Component
export default function LoveAndSelfQuestionnairesPage() {
  const [openQuestionnaire, setOpenQuestionnaire] = useState<string | null>(
    null
  );
  const [kinseyScore, setKinseyScore] = useState<string | null>(null);
  const [kleinScores, setKleinScores] = useState<Record<string, Record<string, number>>>({});
  const [stressScore, setStressScore] = useState<number | null>(null);

  const toggleQuestionnaire = (id: string) => {
    setOpenQuestionnaire(openQuestionnaire === id ? null : id);
  };
  
  const handleKleinChange = (variable: string, time: string, value: number) => {
    setKleinScores(prev => ({
        ...prev,
        [variable]: {
            ...prev[variable],
            [time]: value
        }
    }));
  };

  const calculateKleinTotal = (time: 'Past' | 'Present' | 'Ideal') => {
    return kleinGridVariables.reduce((total, variable) => {
        return total + (kleinScores[variable]?.[time] || 0);
    }, 0)
  }

  const handleStressSubmit = () => {
    const totalScore = Object.values(minorityStressFormState).reduce((acc, val) => acc + parseInt(val, 10), 0);
    setStressScore(totalScore);
    toggleQuestionnaire('minorityStress');
  }

  const [minorityStressFormState, setMinorityStressFormState] = useState<Record<string, string>>({});


  const questionnaires = [
    {
      id: 'kinsey',
      title: 'The Kinsey Scale',
      description:
        'Explore your sexual orientation on a continuum. This is for self-reflection only.',
      isCompleted: kinseyScore !== null,
    },
    {
      id: 'klein',
      title: 'Klein Sexual Orientation Grid (KSOG)',
      description:
        'A more detailed look at orientation across different times in your life.',
      isCompleted: Object.keys(kleinScores).length > 0,
    },
    {
      id: 'minorityStress',
      title: 'Minority Stress Scale',
      description: 'Reflect on experiences related to stigma and discrimination.',
      isCompleted: stressScore !== null,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/love-and-self" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Self-Discovery Questionnaires
          </h1>
          <p className="text-muted-foreground">
            Confidential tools to help you understand yourself better. These are not diagnostic.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {questionnaires.map((q) => (
          <Collapsible
            key={q.id}
            open={openQuestionnaire === q.id}
            onOpenChange={() => toggleQuestionnaire(q.id)}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  'w-full p-4 rounded-lg border flex items-center justify-between transition-colors',
                  openQuestionnaire === q.id ? 'bg-muted' : 'hover:bg-muted/50',
                  q.isCompleted && 'border-green-500/50 bg-green-500/5'
                )}
              >
                <div className="text-left">
                  <h3 className="font-bold">{q.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {q.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                    {q.isCompleted && <CheckCircle className="w-5 h-5 text-green-500"/>}
                    <ChevronDown
                    className={cn(
                        'w-5 h-5 text-muted-foreground transition-transform',
                        openQuestionnaire === q.id && 'rotate-180'
                    )}
                    />
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <Card>
                <CardContent className="p-6">
                  {/* KINSEY SCALE */}
                  {q.id === 'kinsey' && (
                    <div>
                      <RadioGroup onValueChange={setKinseyScore} value={kinseyScore || ''} className="space-y-4">
                        {kinseyQuestions.map((kq) => (
                          <Label key={kq.value} className="flex items-start gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent/50 has-[:checked]:bg-accent has-[:checked]:border-primary">
                            <RadioGroupItem value={kq.value} id={`kinsey-${kq.value}`} />
                            <div className="grid gap-1.5">
                                <p className="font-semibold">{kq.label}</p>
                                <p className="text-sm text-muted-foreground">{kq.description}</p>
                            </div>
                          </Label>
                        ))}
                      </RadioGroup>
                      {kinseyScore !== null && (
                         <Card className="mt-6 bg-muted/50">
                            <CardHeader>
                                <CardTitle>Your Kinsey Scale Result</CardTitle>
                                <CardDescription>Your selection suggests you identify as: <span className="font-bold text-primary">{kinseyQuestions.find(kq => kq.value === kinseyScore)?.label}</span>.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">This scale is a tool for self-exploration. Your position on it can change over time. It's a way to describe your experiences, not a rigid label.</p>
                            </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* KLEIN GRID */}
                  {q.id === 'klein' && (
                     <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">For each variable, choose one number from 1 to 7 to describe yourself for each of the three periods in your life.</p>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Variable</TableHead>
                                        {kleinTimeFrames.map(tf => <TableHead key={tf} className="text-center">{tf}</TableHead>)}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {kleinGridVariables.map(variable => (
                                        <TableRow key={variable}>
                                            <TableCell className="font-medium">{variable}</TableCell>
                                            {kleinTimeFrames.map(time => (
                                                 <TableCell key={time}>
                                                    <RadioGroup onValueChange={(val) => handleKleinChange(variable, time, parseInt(val))} value={String(kleinScores[variable]?.[time] || '')}>
                                                        <div className="flex justify-around">
                                                        {kleinOptions.slice(0, 7).map(opt => (
                                                            <RadioGroupItem key={opt.value} value={String(opt.value)} id={`${variable}-${time}-${opt.value}`} className="h-5 w-5"/>
                                                        ))}
                                                        </div>
                                                    </RadioGroup>
                                                 </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">1 = Other Sex Only, 4 = Both Sexes Equally, 7 = Same Sex Only</p>
                        {Object.keys(kleinScores).length > 0 && (
                             <Card className="mt-6 bg-muted/50">
                                <CardHeader>
                                    <CardTitle>Your Klein Grid Summary</CardTitle>
                                    <CardDescription>This grid provides a snapshot, not a diagnosis. It acknowledges that sexuality can be fluid.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-3 gap-4 text-center">
                                    {kleinTimeFrames.map(time => (
                                        <div key={time}>
                                            <p className="font-bold text-lg">{time}</p>
                                            <p className="text-2xl font-bold text-primary">{calculateKleinTotal(time as any)}</p>
                                            <p className="text-xs text-muted-foreground">Total Score</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                  )}

                   {/* MINORITY STRESS SCALE */}
                   {q.id === 'minorityStress' && (
                        <div className="space-y-6">
                            {minorityStressQuestions.map((msq, index) => (
                                <div key={msq.id} className="border-b pb-4">
                                     <p className="font-medium mb-2">{index + 1}. {msq.text}</p>
                                      <RadioGroup onValueChange={(val) => setMinorityStressFormState(prev => ({...prev, [msq.id]: val}))} value={minorityStressFormState[msq.id] || ''} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-2">
                                        {stressOptions.map(opt => (
                                             <Label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                                                <RadioGroupItem value={String(opt.value)} />
                                                <span>{opt.label}</span>
                                            </Label>
                                        ))}
                                    </RadioGroup>
                                </div>
                            ))}
                            <Button onClick={handleStressSubmit}>Calculate My Score</Button>
                            {stressScore !== null && (
                                <Card className="mt-6 bg-muted/50">
                                    <CardHeader>
                                        <CardTitle>Your Minority Stress Score</CardTitle>
                                        <CardDescription>Your score is <span className="font-bold text-primary">{stressScore}</span> out of 15.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">A higher score can indicate greater exposure to minority stress. This is not a measure of your personal resilience, but a reflection of societal pressures. Understanding this can be a first step toward finding coping strategies. Consider discussing these results with a counselor.</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                   )}
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}

