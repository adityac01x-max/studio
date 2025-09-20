
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { RiskManagementDialog } from './risk-management-dialog';
import { FileText, ChevronDown, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';


const phq9Questions = [
  { id: 'q1', text: 'Little interest or pleasure in doing things' },
  { id: 'q2', text: 'Feeling down, depressed, or hopeless' },
  {
    id: 'q3',
    text: 'Trouble falling or staying asleep, or sleeping too much',
  },
  { id: 'q4', text: 'Feeling tired or having little energy' },
  { id: 'q5', text: 'Poor appetite or overeating' },
  {
    id: 'q6',
    text: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
  },
  {
    id: 'q7',
    text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
  },
  {
    id: 'q8',
    text: 'Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
  },
  {
    id: 'q9',
    text: 'Thoughts that you would be better off dead, or of hurting yourself',
  },
];

const gad7Questions = [
  { id: 'g1', text: 'Feeling nervous, anxious, or on edge' },
  { id: 'g2', text: 'Not being able to stop or control worrying' },
  { id: 'g3', text: 'Worrying too much about different things' },
  { id: 'g4', text: 'Trouble relaxing' },
  { id: 'g5', text: 'Being so restless that it is hard to sit still' },
  { id: 'g6', text: 'Becoming easily annoyed or irritable' },
  { id: 'g7', text: 'Feeling afraid as if something awful might happen' },
];

const ghq12Questions = [
    { id: 'ghq1', text: 'Been able to concentrate on whatever you’re doing?' },
    { id: 'ghq2', text: 'Lost much sleep over worry?' },
    { id: 'ghq3', text: 'Felt that you were playing a useful part in things?' },
    { id: 'ghq4', text: 'Felt capable of making decisions about things?' },
    { id: 'ghq5', text: 'Felt constantly under strain?' },
    { id: 'ghq6', text: 'Felt you couldn’t overcome your difficulties?' },
    { id: 'ghq7', text: 'Been able to enjoy your normal day-to-day activities?' },
    { id: 'ghq8', text: 'Been able to face up to your problems?' },
    { id: 'ghq9', text: 'Been feeling unhappy and depressed?' },
    { id: 'ghq10', text: 'Been losing confidence in yourself?' },
    { id: 'ghq11', text: 'Been thinking of yourself as a worthless person?' },
    { id: 'ghq12', text: 'Been feeling reasonably happy, all things considered?' },
];

const baiQuestions = [
    { id: 'bai1', text: 'Numbness or tingling' },
    { id: 'bai2', text: 'Feeling hot' },
    { id: 'bai3', text: 'Wobbliness in legs' },
    { id: 'bai4', text: 'Unable to relax' },
    { id: 'bai5', text: 'Fear of the worst happening' },
    { id: 'bai6', text: 'Dizzy or lightheaded' },
    { id: 'bai7', text: 'Heart pounding or racing' },
    { id: 'bai8', text: 'Unsteady' },
    { id: 'bai9', text: 'Terrified or afraid' },
    { id: 'bai10', text: 'Nervous' },
    { id: 'bai11', text: 'Feeling of choking' },
    { id: 'bai12', text: 'Hands trembling' },
    { id: 'bai13', text: 'Shaky / unsteady' },
    { id: 'bai14', text: 'Fear of losing control' },
    { id: 'bai15', text: 'Difficulty in breathing' },
    { id: 'bai16', text: 'Fear of dying' },
    { id: 'bai17', text: 'Scared' },
    { id: 'bai18', text: 'Indigestion' },
    { id: 'bai19', text: 'Faint / lightheaded' },
    { id: 'bai20', text: 'Face flushed' },
    { id: 'bai21', text: 'Hot / cold sweats' },
];

const bigFiveQuestions = [
    { id: 'bf1', text: 'Is talkative' },
    { id: 'bf2', text: 'Tends to find fault with others' },
    { id: 'bf3', text: 'Does a thorough job' },
    { id: 'bf4', text: 'Is depressed, blue' },
    { id: 'bf5', text: 'Is original, comes up with new ideas' },
    { id: 'bf6', text: 'Is reserved' },
    { id: 'bf7', text: 'Is helpful and unselfish with others' },
    { id: 'bf8', text: 'Can be somewhat careless' },
    { id: 'bf9', text: 'Is relaxed, handles stress well' },
    { id: 'bf10', text: 'Is curious about many different things' },
];

const options = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
];

const ghqOptions = [
  { label: 'Better than usual', value: 0 },
  { label: 'Same as usual', value: 1 },
  { label: 'Less than usual', value: 2 },
  { label: 'Much less than usual', value: 3 },
];

const bigFiveOptions = [
    { label: 'Disagree Strongly', value: 1 },
    { label: 'Disagree a little', value: 2 },
    { label: 'Neither agree nor disagree', value: 3 },
    { label: 'Agree a little', value: 4 },
    { label: 'Agree Strongly', value: 5 },
];

const createSurveySchema = (questions: { id: string }[]) => {
  const schemaShape = questions.reduce((acc, q) => {
    acc[q.id] = z.string({ required_error: 'Please select an option.' });
    return acc;
  }, {} as Record<string, z.ZodString>);
  return z.object(schemaShape);
};

const phq9Schema = createSurveySchema(phq9Questions);
const gad7Schema = createSurveySchema(gad7Questions);
const ghq12Schema = createSurveySchema(ghq12Questions);
const baiSchema = createSurveySchema(baiQuestions);
const bigFiveSchema = createSurveySchema(bigFiveQuestions);

type SurveyScores = {
  phq9: number | null;
  gad7: number | null;
  ghq12: number | null;
  bai: number | null;
  bigFive: Record<string, number> | null;
};

const getScoreInterpretation = (
  type: 'phq9' | 'gad7' | 'ghq12' | 'bai',
  score: number | null
) => {
  if (score === null) return { level: '', color: '' };

  if (type === 'phq9') {
    if (score <= 4)
      return { level: 'Minimal depression', color: 'text-green-500' };
    if (score <= 9)
      return { level: 'Mild depression', color: 'text-yellow-500' };
    if (score <= 14)
      return { level: 'Moderate depression', color: 'text-orange-500' };
    if (score <= 19)
      return {
        level: 'Moderately severe depression',
        color: 'text-red-500',
      };
    return { level: 'Severe depression', color: 'text-red-600' };
  } else if (type === 'gad7') {
    if (score <= 4)
      return { level: 'Minimal anxiety', color: 'text-green-500' };
    if (score <= 9) return { level: 'Mild anxiety', color: 'text-yellow-500' };
    if (score <= 14)
      return { level: 'Moderate anxiety', color: 'text-orange-500' };
    return { level: 'Severe anxiety', color: 'text-red-500' };
  } else if (type === 'bai') {
    if (score <= 7) return { level: 'Minimal anxiety', color: 'text-green-500' };
    if (score <= 15) return { level: 'Mild anxiety', color: 'text-yellow-500' };
    if (score <= 25) return { level: 'Moderate anxiety', color: 'text-orange-500' };
    return { level: 'Severe anxiety', color: 'text-red-500' };
  } else { // GHQ-12
     if (score <= 12) return { level: 'Low psychological distress', color: 'text-green-500' };
     if (score <= 15) return { level: 'Mild psychological distress', color: 'text-yellow-500' };
     if (score <= 20) return { level: 'Moderate psychological distress', color: 'text-orange-500' };
     return { level: 'Severe psychological distress', color: 'text-red-500' };
  }
};

const surveyHistory = [
  { date: 'Jan', phq9: 12, gad7: 10, ghq12: 14 },
  { date: 'Feb', phq9: 14, gad7: 11, ghq12: 16 },
  { date: 'Mar', phq9: 10, gad7: 8, ghq12: 12 },
  { date: 'Apr', phq9: 8, gad7: 7, ghq12: 10 },
  { date: 'May', phq9: 5, gad7: 5, ghq12: 8 },
  { date: 'Jun', phq9: 7, gad7: 6, ghq12: 9 },
];

const SurveyForm = ({
  questions,
  schema,
  responseOptions,
  onSubmit,
}: {
  questions: {id: string, text: string}[];
  schema: z.ZodObject<any>;
  responseOptions: {label: string, value: number}[];
  onSubmit: (data: z.infer<typeof schema>) => void;
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={question.id} className="space-y-2 border-b pb-4">
               <FormLabel className='font-medium'>{index + 1}. {question.text}</FormLabel>
                <FormField
                  control={form.control}
                  name={question.id}
                  render={({ field }) => (
                    <FormItem className="space-y-3 pt-2">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                        >
                          {responseOptions.map((option) => (
                            <FormItem
                              key={option.value}
                              className="flex items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={String(option.value)}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          ))}
        </div>
        <Button type="submit" size="lg" className="w-full">
          View My Results
        </Button>
      </form>
    </Form>
  );
};

export function MentalHealthSurvey() {
  const [scores, setScores] = useState<SurveyScores>({
    phq9: null,
    gad7: null,
    ghq12: null,
    bai: null,
    bigFive: null,
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [openSurvey, setOpenSurvey] = useState<string | null>(null);

  const toggleSurvey = (survey: string) => {
    setOpenSurvey(openSurvey === survey ? null : survey);
  };

  const handlePhq9Submit = (data: z.infer<typeof phq9Schema>) => {
    const score = Object.values(data).reduce(
      (sum, val) => sum + parseInt(val as string, 10),
      0
    );
    setScores((s) => ({ ...s, phq9: score }));
    if (score >= 10) {
      setDialogOpen(true);
    }
     setOpenSurvey(null);
  };

  const handleGad7Submit = (data: z.infer<typeof gad7Schema>) => {
    const score = Object.values(data).reduce(
      (sum, val) => sum + parseInt(val as string, 10),
      0
    );
    setScores((s) => ({ ...s, gad7: score }));
    if (score >= 10) {
      setDialogOpen(true);
    }
     setOpenSurvey(null);
  };

  const handleGhq12Submit = (data: z.infer<typeof ghq12Schema>) => {
    const score = Object.values(data).reduce(
      (sum, val) => sum + parseInt(val as string, 10),
      0
    );
    setScores((s) => ({ ...s, ghq12: score }));
     if (score >= 15) {
      setDialogOpen(true);
    }
     setOpenSurvey(null);
  };

  const handleBaiSubmit = (data: z.infer<typeof baiSchema>) => {
    const score = Object.values(data).reduce((sum, val) => sum + parseInt(val, 10), 0);
    setScores(s => ({ ...s, bai: score }));
    if (score >= 16) {
      setDialogOpen(true);
    }
    setOpenSurvey(null);
  };

  const handleBigFiveSubmit = (data: z.infer<typeof bigFiveSchema>) => {
    const reverseScoredKeys = ['bf2', 'bf4', 'bf6', 'bf8', 'bf9'];
    const parsedData = Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = parseInt(value, 10);
      return acc;
    }, {} as Record<string, number>);

    const scores = {
      Extraversion: (parsedData['bf1'] + (6 - parsedData['bf6'])) / 2,
      Agreeableness: ((6 - parsedData['bf2']) + parsedData['bf7']) / 2,
      Conscientiousness: (parsedData['bf3'] + (6 - parsedData['bf8'])) / 2,
      Neuroticism: ((6 - parsedData['bf4']) + (6 - parsedData['bf9'])) / 2,
      Openness: (parsedData['bf5'] + parsedData['bf10']) / 2,
    };
    setScores(s => ({ ...s, bigFive: scores }));
    setOpenSurvey(null);
  };

  const phq9Interpretation = getScoreInterpretation('phq9', scores.phq9);
  const gad7Interpretation = getScoreInterpretation('gad7', scores.gad7);
  const ghq12Interpretation = getScoreInterpretation('ghq12', scores.ghq12);
  const baiInterpretation = getScoreInterpretation('bai', scores.bai);

  const resultsAvailable = scores.phq9 !== null || scores.gad7 !== null || scores.ghq12 !== null || scores.bai !== null || scores.bigFive !== null;

  const bigFiveDataForChart = scores.bigFive ? Object.entries(scores.bigFive).map(([name, value]) => ({ name, value })) : [];


  const surveys = [
    {
      id: 'phq9',
      title: 'Depression (PHQ-9)',
      description: 'A 9-item depression screening tool.',
      isCompleted: scores.phq9 !== null,
      component: (
        <SurveyForm
          questions={phq9Questions}
          schema={phq9Schema}
          responseOptions={options}
          onSubmit={handlePhq9Submit}
        />
      ),
    },
    {
      id: 'gad7',
      title: 'Anxiety (GAD-7)',
      description: 'A 7-item anxiety screening tool.',
      isCompleted: scores.gad7 !== null,
      component: (
        <SurveyForm
          questions={gad7Questions}
          schema={gad7Schema}
          responseOptions={options}
          onSubmit={handleGad7Submit}
        />
      ),
    },
    {
      id: 'ghq12',
      title: 'General Health (GHQ-12)',
      description: 'A 12-item general health questionnaire.',
      isCompleted: scores.ghq12 !== null,
      component: (
        <SurveyForm
          questions={ghq12Questions}
          schema={ghq12Schema}
          responseOptions={ghqOptions}
          onSubmit={handleGhq12Submit}
        />
      ),
    },
    {
      id: 'bai',
      title: 'Beck Anxiety Inventory (BAI)',
      description: 'A 21-item scale to measure the severity of anxiety.',
      isCompleted: scores.bai !== null,
      component: (
          <SurveyForm
              questions={baiQuestions}
              schema={baiSchema}
              responseOptions={options}
              onSubmit={handleBaiSubmit}
          />
      ),
    },
    {
        id: 'bigFive',
        title: 'Big Five Personality Test',
        description: 'A short 10-item personality assessment.',
        isCompleted: scores.bigFive !== null,
        component: (
            <SurveyForm
                questions={bigFiveQuestions}
                schema={bigFiveSchema}
                responseOptions={bigFiveOptions}
                onSubmit={handleBigFiveSubmit}
            />
        ),
    },
  ];

  return (
    <>
      <div className="space-y-4">
        {surveys.map((survey) => (
          <Collapsible
            key={survey.id}
            open={openSurvey === survey.id}
            onOpenChange={() => toggleSurvey(survey.id)}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  'w-full p-4 rounded-lg border flex items-center justify-between transition-colors',
                  openSurvey === survey.id
                    ? 'bg-muted'
                    : 'hover:bg-muted/50',
                  survey.isCompleted && 'border-green-500/50 bg-green-500/5'
                )}
              >
                <div className="flex items-center gap-4 text-left">
                  <FileText className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-bold">{survey.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {survey.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                    {survey.isCompleted && <CheckCircle className="w-5 h-5 text-green-500"/>}
                    <ChevronDown
                    className={cn(
                        'w-5 h-5 text-muted-foreground transition-transform',
                        openSurvey === survey.id && 'rotate-180'
                    )}
                    />
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <Card>
                <CardContent className="p-6">
                    {survey.component}
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      {resultsAvailable && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold font-headline mb-4 text-center">
            Your Detailed Report
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scores.phq9 !== null && (
              <Card>
                <CardHeader>
                  <CardTitle>PHQ-9 Depression Score</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <ChartContainer config={{}} className="h-[250px] w-full">
                    <ResponsiveContainer>
                      <PieChart>
                        <Tooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={[
                            { value: scores.phq9 },
                            { value: 27 - scores.phq9 },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          startAngle={90}
                          endAngle={-270}
                          innerRadius="60%"
                          outerRadius="80%"
                          cy="50%"
                          strokeWidth={0}
                        >
                          <Cell fill="hsl(var(--chart-2))" />
                          <Cell fill="hsl(var(--muted))" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <p className="text-4xl font-bold">
                    {scores.phq9}{' '}
                    <span className="text-lg font-normal text-muted-foreground">
                      / 27
                    </span>
                  </p>
                  <p
                    className={`text-lg font-semibold ${phq9Interpretation.color}`}
                  >
                    {phq9Interpretation.level}
                  </p>
                </CardContent>
              </Card>
            )}
            {scores.gad7 !== null && (
              <Card>
                <CardHeader>
                  <CardTitle>GAD-7 Anxiety Score</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <ChartContainer config={{}} className="h-[250px] w-full">
                    <ResponsiveContainer>
                      <PieChart>
                        <Tooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={[
                            { value: scores.gad7 },
                            { value: 21 - scores.gad7 },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          startAngle={90}
                          endAngle={-270}
                          innerRadius="60%"
                          outerRadius="80%"
                          cy="50%"
                          strokeWidth={0}
                        >
                          <Cell fill="hsl(var(--chart-5))" />
                          <Cell fill="hsl(var(--muted))" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <p className="text-4xl font-bold">
                    {scores.gad7}{' '}
                    <span className="text-lg font-normal text-muted-foreground">
                      / 21
                    </span>
                  </p>
                  <p
                    className={`text-lg font-semibold ${gad7Interpretation.color}`}
                  >
                    {gad7Interpretation.level}
                  </p>
                </CardContent>
              </Card>
            )}
             {scores.ghq12 !== null && (
              <Card>
                <CardHeader>
                  <CardTitle>GHQ-12 General Health Score</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <ChartContainer config={{}} className="h-[250px] w-full">
                    <ResponsiveContainer>
                      <PieChart>
                        <Tooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={[
                            { value: scores.ghq12 },
                            { value: 36 - scores.ghq12 },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          startAngle={90}
                          endAngle={-270}
                          innerRadius="60%"
                          outerRadius="80%"
                          cy="50%"
                          strokeWidth={0}
                        >
                          <Cell fill="hsl(var(--chart-1))" />
                          <Cell fill="hsl(var(--muted))" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <p className="text-4xl font-bold">
                    {scores.ghq12}{' '}
                    <span className="text-lg font-normal text-muted-foreground">
                      / 36
                    </span>
                  </p>
                  <p
                    className={`text-lg font-semibold ${ghq12Interpretation.color}`}
                  >
                    {ghq12Interpretation.level}
                  </p>
                </CardContent>
              </Card>
            )}
            {scores.bai !== null && (
                <Card>
                    <CardHeader>
                        <CardTitle>Beck Anxiety Inventory (BAI) Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <ChartContainer config={{}} className="h-[250px] w-full">
                        <ResponsiveContainer>
                            <PieChart>
                                <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie data={[{ value: scores.bai }, { value: 63 - scores.bai }]} dataKey="value" nameKey="name" startAngle={90} endAngle={-270} innerRadius="60%" outerRadius="80%" cy="50%" strokeWidth={0}>
                                    <Cell fill="hsl(var(--chart-3))" />
                                    <Cell fill="hsl(var(--muted))" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        </ChartContainer>
                        <p className="text-4xl font-bold">{scores.bai} <span className="text-lg font-normal text-muted-foreground">/ 63</span></p>
                        <p className={`text-lg font-semibold ${baiInterpretation.color}`}>{baiInterpretation.level}</p>
                    </CardContent>
                </Card>
            )}
          </div>

            {scores.bigFive && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Big Five Personality Results</CardTitle>
                        <CardDescription>Your scores for the five major personality traits.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-[300px] w-full">
                            <ResponsiveContainer>
                                <BarChart data={bigFiveDataForChart}>
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[1, 5]}/>
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                      {bigFiveDataForChart.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                                      ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            )}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Survey Score History</CardTitle>
              <CardDescription>
                Track your mental health survey scores over time. Lower scores
                are better.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <LineChart data={surveyHistory}>
                    <XAxis
                      dataKey="date"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 36]}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="phq9"
                      name="PHQ-9"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="gad7"
                      name="GAD-7"
                      stroke="hsl(var(--chart-5))"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="ghq12"
                      name="GHQ-12"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}

      <RiskManagementDialog open={isDialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}

    