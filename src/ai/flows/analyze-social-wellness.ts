'use server';
/**
 * @fileOverview A Genkit flow for analyzing a student's social wellness based on anonymized chat data.
 *
 * - analyzeSocialWellness - A function that provides a high-level summary of social well-being.
 * - AnalyzeSocialWellnessInput - The input type for the analyzeSocialWellness function.
 * - AnalyzeSocialWellnessOutput - The return type for the analyzeSocialWellness function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSocialWellnessInputSchema = z.object({
  messages: z.array(z.string()).describe('An array of anonymized chat messages from a student.'),
});
export type AnalyzeSocialWellnessInput = z.infer<typeof AnalyzeSocialWellnessInputSchema>;

const AnalyzeSocialWellnessOutputSchema = z.object({
  engagementLevel: z.string().describe('The student\'s level of engagement in conversations (e.g., High, Medium, Low, Isolated).'),
  sentimentTrend: z.string().describe('The overall trend of the student\'s sentiment (e.g., Positive, Negative, Mixed, Neutral, Improving, Declining).'),
  keyThemes: z.array(z.string()).describe('A list of 2-3 key anonymized themes or topics that appear frequently (e.g., "Academic Stress", "Social Plans", "Difficulty Connecting"). Do not include specific names or details.'),
  socialSummary: z.string().describe('A brief, 1-2 sentence qualitative summary of the student\'s social well-being based on the provided data. This should be a high-level observation and must not reveal specific message content.'),
});
export type AnalyzeSocialWellnessOutput = z.infer<typeof AnalyzeSocialWellnessOutputSchema>;

export async function analyzeSocialWellness(input: AnalyzeSocialWellnessInput): Promise<AnalyzeSocialWellnessOutput> {
  return analyzeSocialWellnessFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSocialWellnessPrompt',
  input: {schema: AnalyzeSocialWellnessInputSchema},
  output: {schema: AnalyzeSocialWellnessOutputSchema},
  prompt: `You are a social behavior analyst for a student wellness platform. Your task is to analyze a series of anonymized chat messages from a single student to assess their social well-being. You MUST NOT reveal, repeat, or quote any part of the messages provided. Your analysis should be a high-level, qualitative summary.

Based on the following messages, provide an analysis of the student's social wellness.
Messages:
{{#each messages}}
- {{{this}}}
{{/each}}

1.  **Engagement Level**: Determine if the student is highly engaged, moderately engaged, or seems isolated based on message frequency and length.
2.  **Sentiment Trend**: Analyze the overall sentiment. Is it generally positive, negative, mixed, or is there a noticeable trend (e.g., improving, declining)?
3.  **Key Themes**: Identify 2-3 high-level, anonymized themes. Examples: "Discussing academic pressures," "Making social arrangements," "Expressing feelings of loneliness." DO NOT use specifics from the chat.
4.  **Social Summary**: Provide a brief, 1-2 sentence summary of the student's social well-being. Example: "The student appears to be actively engaging with peers but expresses significant stress related to academics." or "The student's engagement is low, and messages suggest they may be feeling isolated."
`,
});

const analyzeSocialWellnessFlow = ai.defineFlow(
  {
    name: 'analyzeSocialWellnessFlow',
    inputSchema: AnalyzeSocialWellnessInputSchema,
    outputSchema: AnalyzeSocialWellnessOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
