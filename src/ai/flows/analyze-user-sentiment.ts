
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
  videoDataUri: z
    .string()
    .optional()
    .describe(
      'An optional video recording of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type AnalyzeUserSentimentInput = z.infer<
  typeof AnalyzeUserSentimentInputSchema
>;

// Define the output schema
const EmotionScoreSchema = z.object({
  emotion: z
    .string()
    .describe(
      'The detected emotion (e.g., Happiness, Sadness, Anger, Neutral, Surprise).'
    ),
  score: z
    .number()
    .min(0)
    .max(100)
    .describe('The confidence score for this emotion, from 0 to 100.'),
});

const AnalyzeUserSentimentOutputSchema = z.object({
  overallSentiment: z
    .string()
    .describe(
      'The overall dominant sentiment of the user (e.g., Positive, Negative, Neutral, Mixed).'
    ),
  emotionRatings: z
    .array(EmotionScoreSchema)
    .min(3)
    .max(5)
    .describe(
      'A list of 3-5 detected emotions and their corresponding scores from 0-100.'
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
{{#if videoDataUri}}
Video: {{media url=videoDataUri}}
{{/if}}
Text: {{{text}}}

1.  **Individual Analysis**: Determine the sentiment from each modality (facial expression, voice tone, and text).
2.  **Emotion Ratings**: Based on all inputs, identify a list of 3 to 5 primary emotions (e.g., Happiness, Sadness, Anger, Neutral, Surprise, Anxiety). For each emotion, provide a confidence score on a scale of 0 to 100 representing how strongly that emotion is present.
3.  **Overall Sentiment**: Based on the emotion ratings, determine the single, dominant overall sentiment (e.g., Positive, Negative, Neutral, Mixed).

Provide a JSON output with the overall sentiment, the detailed emotion ratings, and the individual sentiment analysis for each modality.`,
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
