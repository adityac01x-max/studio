// The directive tells the Next.js runtime that it should only be executed on the server.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing user sentiment using facial expression recognition, voice tone detection, and text analysis.
 *
 * analyzeUserSentiment - A function that orchestrates the sentiment analysis process.
 * AnalyzeUserSentimentInput - The input type for the analyzeUserSentiment function.
 * AnalyzeUserSentimentOutput - The return type for the analyzeUserSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const AnalyzeUserSentimentInputSchema = z.object({
  faceDataUri: z
    .string()
    .describe(
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  voiceDataUri: z
    .string()
    .describe(
      'The user voice recording, as a data URI that must include a MIME type and use Base64 encoding. Expected format:  data:<mimetype>;base64,<encoded_data>.'
    ),
  text: z.string().describe('A text description of the user feelings.'),
});
export type AnalyzeUserSentimentInput = z.infer<
  typeof AnalyzeUserSentimentInputSchema
>;

// Define the output schema
const AnalyzeUserSentimentOutputSchema = z.object({
  overallSentiment: z
    .string()
    .describe(
      'The overall sentiment of the user (positive, negative, or neutral).'
    ),
  facialExpressionSentiment: z
    .string()
    .describe('The sentiment derived from facial expressions.'),
  voiceToneSentiment: z
    .string()
    .describe('The sentiment derived from voice tone.'),
  textSentiment: z.string().describe('The sentiment derived from the text.'),
});
export type AnalyzeUserSentimentOutput = z.infer<
  typeof AnalyzeUserSentimentOutputSchema
>;

// Exported function to analyze user sentiment
export async function analyzeUserSentiment(
  input: AnalyzeUserSentimentInput
): Promise<AnalyzeUserSentimentOutput> {
  return analyzeUserSentimentFlow(input);
}

// Define the prompt
const analyzeUserSentimentPrompt = ai.definePrompt({
  name: 'analyzeUserSentimentPrompt',
  input: {schema: AnalyzeUserSentimentInputSchema},
  output: {schema: AnalyzeUserSentimentOutputSchema},
  prompt: `You are a sentiment analysis expert. Analyze the user's sentiment based on the following information:

Facial Expression: {{media url=faceDataUri}}
Voice Tone: {{media url=voiceDataUri}}
Text: {{{text}}}

Determine the sentiment from each modality (facial expression, voice tone, and text) and provide an overall sentiment.

Consider all factors and use a confidence level for each one.

Output the overall sentiment, facial expression sentiment, voice tone sentiment, and text sentiment.`, // MUST be valid Handlebars syntax
});

// Define the flow
const analyzeUserSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeUserSentimentFlow',
    inputSchema: AnalyzeUserSentimentInputSchema,
    outputSchema: AnalyzeUserSentimentOutputSchema,
  },
  async input => {
    const {output} = await analyzeUserSentimentPrompt(input);
    return output!;
  }
);
