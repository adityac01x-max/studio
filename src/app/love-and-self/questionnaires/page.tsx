
'use client';
import { useState } from 'react';
import Link from 'next/link';
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
  const [kleinFinished, setKleinFinished] = useState(false);

  const toggleQuestionnaire = (id: string) => {
    setOpenQuestionnaire(openQuestionnaire === id ? null : id);
  };
  
  const handleKleinChange = (variable: string, time: string, value: number) => {
    setKleinFinished(false);
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

  const handleFinishKlein = () => {
    setKleinFinished(true);
    toggleQuestionnaire('klein');
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
      isCompleted: kleinFinished,
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
          <h1 className="font-headline text-3xl font-bold tracking-tight text-white">
            Self-Discovery Questionnaires
          </h1>
          <p className="text-muted-foreground text-white/80">
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
                  'w-full p-4 rounded-lg border flex items-center justify-between transition-colors bg-card/80 backdrop-blur-sm',
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
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* KINSEY SCALE */}
                  {q.id === 'kinsey' && (
                    <div className="space-y-6">
                      <p className="text-sm text-muted-foreground">This scale was developed to show that sexuality is not a binary. Reflect on your history of sexual attraction, behavior, and fantasies, and select the one statement that best describes you.</p>
                      <RadioGroup onValueChange={(value) => { setKinseyScore(value); toggleQuestionnaire('kinsey'); }} value={kinseyScore || ''} className="space-y-4">
                        {kinseyQuestions.map((kq) => (
                          <Label key={kq.value} className="flex items-start gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent/50 has-[:checked]:bg-accent has-[:checked]:border-primary bg-background/50">
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
                                <CardTitle>Your Kinsey Scale Result: {kinseyScore}</CardTitle>
                                <CardDescription>Your selection corresponds to: <span className="font-bold text-primary">{kinseyQuestions.find(kq => kq.value === kinseyScore)?.label}</span>.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">The Kinsey Scale was revolutionary for its time, challenging the simple heterosexual/homosexual binary. It introduced the idea that sexuality can be a fluid spectrum. Your result is a snapshot of your feelings and experiences, not a fixed identity. It's a tool to help you reflect on the diverse and personal nature of human sexuality.</p>
                            </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* KLEIN GRID */}
                  {q.id === 'klein' && (
                     <div className="space-y-6">
                        <p className="text-sm text-muted-foreground">The Klein Grid expands on the Kinsey Scale by looking at seven different dimensions of sexuality over three different time periods. For each variable, choose one number from 1 (Other Sex Only) to 7 (Same Sex Only) to describe yourself for your Past, Present, and Ideal future.</p>
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
                                                 <TableCell key={time} className="min-w-[200px]">
                                                    <RadioGroup onValueChange={(val) => handleKleinChange(variable, time, parseInt(val))} value={String(kleinScores[variable]?.[time] || '')} className="flex justify-around">
                                                        {kleinOptions.slice(0, 7).map(opt => (
                                                          <div key={opt.value} className="flex flex-col items-center">
                                                            <RadioGroupItem value={String(opt.value)} id={`${variable}-${time}-${opt.value}`} />
                                                            <Label htmlFor={`${variable}-${time}-${opt.value}`} className="text-xs mt-1">{opt.value}</Label>
                                                          </div>
                                                        ))}
                                                    </RadioGroup>
                                                 </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground text-center">
                          <span>1 = Other Sex Only</span>
                          <span>4 = Both Sexes Equally</span>
                          <span>7 = Same Sex Only</span>
                        </div>
                         <CardFooter className="px-0">
                           <Button onClick={handleFinishKlein}>Finish & View Summary</Button>
                         </CardFooter>
                        {kleinFinished && (
                             <Card className="mt-6 bg-muted/50">
                                <CardHeader>
                                    <CardTitle>Your Detailed Klein Grid Report</CardTitle>
                                    <CardDescription>This grid provides a snapshot, not a diagnosis. It shows that sexuality is complex and can be fluid across different aspects of life and time. Notice how your scores may differ between variables and across your past, present, and ideal self—this variation is normal and part of self-discovery.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
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
                                                            <TableCell key={time} className="text-center font-bold text-lg text-primary">
                                                                {kleinScores[variable]?.[time] || '-'}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                                <TableRow className="bg-accent/20">
                                                     <TableCell className="font-bold">Total Score</TableCell>
                                                     {kleinTimeFrames.map(time => (
                                                        <TableCell key={time} className="text-center font-bold text-lg text-primary">
                                                            {calculateKleinTotal(time as any)}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div>
                                        <h4 className='font-semibold mt-4'>Interpreting Your Grid:</h4>
                                        <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                                            <li><span className='font-bold'>Low scores (1-2)</span> generally indicate a stronger orientation towards the other sex.</li>
                                            <li><span className='font-bold'>Mid-range scores (3-5)</span> suggest some level of bisexuality or attraction to more than one gender.</li>
                                            <li><span className='font-bold'>High scores (6-7)</span> generally indicate a stronger orientation towards the same sex.</li>
                                            <li><span className='font-bold'>Variability is Key:</span> The power of this grid is in seeing the differences. Does your behavior differ from your fantasies? Is your ideal self different from your past? These are all points for personal reflection.</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                  )}

                   {/* MINORITY STRESS SCALE */}
                   {q.id === 'minorityStress' && (
                        <div className="space-y-6">
                             <p className="text-sm text-muted-foreground">This scale helps you reflect on potential experiences of social stress related to your identity as a member of a minority group. Please answer based on your experiences over the past year.</p>
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
                            <Button onClick={handleStressSubmit} disabled={Object.keys(minorityStressFormState).length < minorityStressQuestions.length}>Calculate My Score</Button>
                            {stressScore !== null && (
                                <Card className="mt-6 bg-muted/50">
                                    <CardHeader>
                                        <CardTitle>Your Minority Stress Result</CardTitle>
                                        <CardDescription>Your score is <span className="font-bold text-primary">{stressScore}</span> out of {minorityStressQuestions.length * 3}.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <p className="text-sm text-muted-foreground">A higher score can indicate greater exposure to minority stress. This is not a measure of your personal resilience or a mental health diagnosis. Instead, it is a reflection of the societal pressures you may be facing due to your identity. Recognizing these external stressors is a crucial first step toward developing effective coping mechanisms and building resilience.</p>
                                        <p className="text-sm text-muted-foreground">This tool can help you understand the unique challenges you might be navigating. If your score is high, it may be beneficial to discuss these results with a counselor or a peer supporter. They can help you explore strategies for managing this stress and fostering a strong sense of self-worth.</p>
                                    </CardContent>
                                     <CardFooter>
                                        <Button asChild variant="secondary">
                                            <Link href="/love-and-self/consultation">Find Support</Link>
                                        </Button>
                                    </CardFooter>
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
