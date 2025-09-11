'use server';
/**
 * @fileOverview An AI-guided chatbot that offers coping strategies and resources based on the user's current emotional state.
 *
 * - provideAICopingStrategies - A function that provides coping strategies to the user.
 * - ProvideAICopingStrategiesInput - The input type for the provideAICopingStrategies function.
 * - ProvideAICopingStrategiesOutput - The return type for the provideAICopingStrategies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideAICopingStrategiesInputSchema = z.object({
  emotionalState: z.string().describe('The current emotional state of the user.'),
  query: z.string().describe('The user query or concern.'),
});
export type ProvideAICopingStrategiesInput = z.infer<typeof ProvideAICopingStrategiesInputSchema>;

const ProvideAICopingStrategiesOutputSchema = z.object({
  response: z.string().describe('The AI-generated response providing coping strategies and resources.'),
});
export type ProvideAICopingStrategiesOutput = z.infer<typeof ProvideAICopingStrategiesOutputSchema>;

export async function provideAICopingStrategies(input: ProvideAICopingStrategiesInput): Promise<ProvideAICopingStrategiesOutput> {
  return provideAICopingStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideAICopingStrategiesPrompt',
  input: {schema: ProvideAICopingStrategiesInputSchema},
  output: {schema: ProvideAICopingStrategiesOutputSchema},
  prompt: `You are a mental health chatbot designed to provide coping strategies and resources to students based on their current emotional state and concerns.

  Emotional State: {{{emotionalState}}}
  User Query: {{{query}}}

  Based on the user's emotional state and query, provide relevant coping strategies, resources, and guidance. Refer the student to a professional if needed.
  Keep the response concise and easy to understand.
  `,
});

const provideAICopingStrategiesFlow = ai.defineFlow(
  {
    name: 'provideAICopingStrategiesFlow',
    inputSchema: ProvideAICopingStrategiesInputSchema,
    outputSchema: ProvideAICopingStrategiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
