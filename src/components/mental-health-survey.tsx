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
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { RiskManagementDialog } from './risk-management-dialog';

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

const options = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
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

type SurveyScores = {
  phq9: number | null;
  gad7: number | null;
};

const getScoreInterpretation = (
  type: 'phq9' | 'gad7',
  score: number | null
) => {
  if (score === null) return '';

  if (type === 'phq9') {
    if (score <= 4) return 'Minimal depression';
    if (score <= 9) return 'Mild depression';
    if (score <= 14) return 'Moderate depression';
    if (score <= 19) return 'Moderately severe depression';
    return 'Severe depression';
  } else {
    if (score <= 4) return 'Minimal anxiety';
    if (score <= 9) return 'Mild anxiety';
    if (score <= 14) return 'Moderate anxiety';
    return 'Severe anxiety';
  }
};

const SurveyForm = ({
  questions,
  schema,
  onSubmit,
}: {
  questions: typeof phq9Questions;
  schema: z.ZodObject<any>;
  onSubmit: (score: number) => void;
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    const score = Object.values(data).reduce(
      (sum, val) => sum + parseInt(val as string, 10),
      0
    );
    onSubmit(score);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {questions.map((question, index) => (
          <FormField
            key={question.id}
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  {index + 1}. {question.text}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                  >
                    {options.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={String(option.value)} />
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
        ))}
        <Button type="submit">View My Results</Button>
      </form>
    </Form>
  );
};

export function MentalHealthSurvey() {
  const [scores, setScores] = useState<SurveyScores>({
    phq9: null,
    gad7: null,
  });
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handlePhq9Submit = (score: number) => {
    setScores((s) => ({ ...s, phq9: score }));
    if (score >= 10) {
      // Moderate to severe depression
      setDialogOpen(true);
    }
  };

  const handleGad7Submit = (score: number) => {
    setScores((s) => ({ ...s, gad7: score }));
    if (score >= 10) {
      // Moderate to severe anxiety
      setDialogOpen(true);
    }
  };

  const chartData = [
    {
      name: 'Depression (PHQ-9)',
      score: scores.phq9,
      interpretation: getScoreInterpretation('phq9', scores.phq9),
      fill: 'hsl(var(--chart-2))',
    },
    {
      name: 'Anxiety (GAD-7)',
      score: scores.gad7,
      interpretation: getScoreInterpretation('gad7', scores.gad7),
      fill: 'hsl(var(--chart-5))',
    },
  ];

  const resultsAvailable = scores.phq9 !== null || scores.gad7 !== null;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <Tabs defaultValue="phq9" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="phq9">Depression (PHQ-9)</TabsTrigger>
            <TabsTrigger value="gad7">Anxiety (GAD-7)</TabsTrigger>
          </TabsList>
          <TabsContent value="phq9">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  PHQ-9 Depression Survey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SurveyForm
                  questions={phq9Questions}
                  schema={phq9Schema}
                  onSubmit={handlePhq9Submit}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gad7">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  GAD-7 Anxiety Survey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SurveyForm
                  questions={gad7Questions}
                  schema={gad7Schema}
                  onSubmit={handleGad7Submit}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Card className={resultsAvailable ? '' : 'flex items-center justify-center'}>
          <CardHeader>
            <CardTitle className="font-headline">Your Results</CardTitle>
          </CardHeader>
          <CardContent>
            {resultsAvailable ? (
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 27]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name, item) => (
                            <div className="flex flex-col">
                              <span className="font-bold">
                                Score: {value}
                              </span>
                              <span>{item.payload.interpretation}</span>
                            </div>
                          )}
                        />
                      }
                    />
                    <Bar dataKey="score" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="text-center text-muted-foreground h-[300px] flex items-center justify-center">
                <p>Your results will be displayed here after you complete a survey.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <RiskManagementDialog open={isDialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
