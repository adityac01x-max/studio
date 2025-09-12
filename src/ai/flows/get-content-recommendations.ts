'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating content recommendations based on user mood and language.
 *
 * getContentRecommendations - A function that provides music, book, and movie recommendations.
 * GetContentRecommendationsInput - The input type for the getContentRecommendations function.
 * GetContentRecommendationsOutput - The return type for the getContentRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetContentRecommendationsInputSchema = z.object({
  mood: z.string().describe('The current mood or sentiment of the user.'),
  language: z.string().describe('The preferred language for the content.'),
});
export type GetContentRecommendationsInput = z.infer<
  typeof GetContentRecommendationsInputSchema
>;

const RecommendationSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  author: z.string().optional(),
  year: z.number().optional(),
  url: z.string().url().describe('A URL to access the content.'),
});

const GetContentRecommendationsOutputSchema = z.object({
  music: z
    .array(RecommendationSchema)
    .describe('A list of music playlist recommendations.'),
  books: z.array(RecommendationSchema).describe('A list of book recommendations.'),
  movies: z
    .array(RecommendationSchema)
    .describe('A list of movie recommendations.'),
});
export type GetContentRecommendationsOutput = z.infer<
  typeof GetContentRecommendationsOutputSchema
>;

export async function getContentRecommendations(
  input: GetContentRecommendationsInput
): Promise<GetContentRecommendationsOutput> {
  return getContentRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getContentRecommendationsPrompt',
  input: {schema: GetContentRecommendationsInputSchema},
  output: {schema: GetContentRecommendationsOutputSchema},
  prompt: `You are a content recommendation engine. Based on the user's mood and preferred language, provide a list of 3 music playlists, 3 books, and 3 movies.

Mood: {{{mood}}}
Language: {{{language}}}

Provide diverse recommendations that are suitable for the given mood. For each item, provide a title, a brief description or author/year where applicable, and a valid URL to access the content (e.g., a link to Spotify, Apple Music, a book store, or a movie streaming service).
`,
});

const getContentRecommendationsFlow = ai.defineFlow(
  {
    name: 'getContentRecommendationsFlow',
    inputSchema: GetContentRecommendationsInputSchema,
    outputSchema: GetContentRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
