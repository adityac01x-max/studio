'use server';
/**
 * @fileOverview This file defines a Genkit flow for moderating chat content.
 *
 * moderateChatContent - A function that analyzes a message for inappropriate content.
 * ModerateChatContentInput - The input type for the moderateChatContent function.
 * ModerateChatContentOutput - The return type for the moderateChatContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateChatContentInputSchema = z.object({
  message: z.string().describe('The chat message to analyze.'),
});
export type ModerateChatContentInput = z.infer<
  typeof ModerateChatContentInputSchema
>;

const ModerateChatContentOutputSchema = z.object({
  isProblematic: z
    .boolean()
    .describe('Whether the message contains problematic content.'),
  reason: z
    .string()
    .optional()
    .describe(
      'The reason why the message was flagged as problematic (e.g., "Contains cuss words", "Political statement").'
    ),
});
export type ModerateChatContentOutput = z.infer<
  typeof ModerateChatContentOutputSchema
>;

export async function moderateChatContent(
  input: ModerateChatContentInput
): Promise<ModerateChatContentOutput> {
  return moderateChatContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moderateChatContentPrompt',
  input: {schema: ModerateChatContentInputSchema},
  output: {schema: ModerateChatContentOutputSchema},
  prompt: `You are a content moderation AI for a mental wellness app. Your task is to ensure the chat environment is safe and supportive.

Analyze the following chat message: "{{{message}}}"

Determine if the message contains any of the following:
- Cuss words or explicit profanity
- Political statements or partisan discussions
- Triggering content (e.g., detailed descriptions of self-harm, violence, hate speech, eating disorders)

If the message contains any of the above, set "isProblematic" to true and provide a brief, neutral "reason". Otherwise, set "isProblematic" to false. Do not be overly sensitive; allow for general discussions of feelings and mental health.`,
});

const moderateChatContentFlow = ai.defineFlow(
  {
    name: 'moderateChatContentFlow',
    inputSchema: ModerateChatContentInputSchema,
    outputSchema: ModerateChatContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
