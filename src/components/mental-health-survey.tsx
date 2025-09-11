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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import {
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

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
  } else {
    if (score <= 4)
      return { level: 'Minimal anxiety', color: 'text-green-500' };
    if (score <= 9) return { level: 'Mild anxiety', color: 'text-yellow-500' };
    if (score <= 14)
      return { level: 'Moderate anxiety', color: 'text-orange-500' };
    return { level: 'Severe anxiety', color: 'text-red-500' };
  }
};

const surveyHistory = [
  { date: 'Jan', phq9: 12, gad7: 10 },
  { date: 'Feb', phq9: 14, gad7: 11 },
  { date: 'Mar', phq9: 10, gad7: 8 },
  { date: 'Apr', phq9: 8, gad7: 7 },
  { date: 'May', phq9: 5, gad7: 5 },
  { date: 'Jun', phq9: 7, gad7: 6 },
];

const SurveyForm = ({
  questions,
  schema,
  onSubmit,
}: {
  questions: typeof phq9Questions | typeof gad7Questions;
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
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {questions.map((question, index) => (
          <FormField
            key={question.id}
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem className="space-y-3 rounded-lg border bg-card p-4">
                <FormLabel>
                  {index + 1}. {question.text}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-2"
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
  });
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handlePhq9Submit = (score: number) => {
    setScores((s) => ({ ...s, phq9: score }));
    if (score >= 10) {
      setDialogOpen(true);
    }
  };

  const handleGad7Submit = (score: number) => {
    setScores((s) => ({ ...s, gad7: score }));
    if (score >= 10) {
      setDialogOpen(true);
    }
  };

  const phq9Interpretation = getScoreInterpretation('phq9', scores.phq9);
  const gad7Interpretation = getScoreInterpretation('gad7', scores.gad7);

  const resultsAvailable = scores.phq9 !== null || scores.gad7 !== null;

  return (
    <>
      <Tabs defaultValue="phq9" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="phq9">Depression (PHQ-9)</TabsTrigger>
          <TabsTrigger value="gad7">Anxiety (GAD-7)</TabsTrigger>
        </TabsList>
        <TabsContent value="phq9">
          <SurveyForm
            questions={phq9Questions}
            schema={phq9Schema}
            onSubmit={handlePhq9Submit}
          />
        </TabsContent>
        <TabsContent value="gad7">
          <SurveyForm
            questions={gad7Questions}
            schema={gad7Schema}
            onSubmit={handleGad7Submit}
          />
        </TabsContent>
      </Tabs>

      {resultsAvailable && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold font-headline mb-4 text-center">
            Your Detailed Report
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
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
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Survey Score History (PHQ-9 & GAD-7)</CardTitle>
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
                      domain={[0, 27]}
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

    