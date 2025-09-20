
'use server';
/**
 * @fileOverview A Genkit flow for analyzing a story written for the Thematic Apperception Test (TAT).
 *
 * - analyzeTatStory - A function that provides a psychological analysis of a TAT story.
 * - AnalyzeTatStoryInput - The input type for the analyzeTatStory function.
 * - AnalyzeTatStoryOutput - The return type for the analyzeTatStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTatStoryInputSchema = z.object({
  story: z.string().describe('The story written by the user based on the TAT image.'),
});
export type AnalyzeTatStoryInput = z.infer<typeof AnalyzeTatStoryInputSchema>;

const AnalyzeTatStoryOutputSchema = z.object({
  mainTheme: z.string().describe('The primary theme identified in the story (e.g., Achievement, Intimacy, Power, Loss, Conflict).'),
  mainCharacterAnalysis: z.string().describe("A brief analysis of the main character's apparent feelings, traits, or state of mind (e.g., 'The main character seems to be experiencing internal conflict and sadness.')."),
  interpersonalRelationships: z.string().describe("An analysis of how the characters interact, describing the nature of their relationship (e.g., 'The relationship appears strained and distant,' 'There is a supportive and caring connection between the figures.')."),
  characterNeeds: z.array(z.string()).describe("List of the primary character's main needs or drives (e.g., 'Need for connection', 'Desire for success', 'Need for autonomy')."),
  conflicts: z.array(z.string()).describe('List of key conflicts or tensions present in the narrative (e.g., "Internal conflict between duty and desire", "External conflict with authority", "Struggle against failure").'),
  outcome: z.string().describe('The perceived outcome of the story (e.g., Positive, Negative, Ambiguous, Resolved, Unresolved).'),
  assumedWorldview: z.string().describe("A high-level interpretation of the story's underlying worldview (e.g., 'The story suggests a world where communication is difficult,' 'The narrative reflects a belief in eventual reconciliation.')."),
  summary: z.string().describe('A brief, 1-2 sentence interpretive summary of the story, focusing on the underlying psychological dynamics. This is for reflection and not a diagnosis.'),
});
export type AnalyzeTatStoryOutput = z.infer<typeof AnalyzeTatStoryOutputSchema>;

export async function analyzeTatStory(input: AnalyzeTatStoryInput): Promise<AnalyzeTatStoryOutput> {
  return analyzeTatStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTatStoryPrompt',
  input: {schema: AnalyzeTatStoryInputSchema},
  output: {schema: AnalyzeTatStoryOutputSchema},
  prompt: `You are a psychological analyst specializing in projective tests like the Thematic Apperception Test (TAT). You are provided with a story written by a user in response to an ambiguous image. Your task is to provide a detailed, analytical, and non-diagnostic interpretation of the story for the user's self-reflection.

The user saw an image and wrote the following story:
"{{{story}}}"

Analyze the story based on the following dimensions. Your analysis should be supportive and use cautious language (e.g., "seems to," "may suggest," "explores themes of").

1.  **Main Theme**: Identify the central theme. Is it about achievement, failure, relationships, loneliness, conflict, etc.?
2.  **Main Character Analysis**: Describe the main character's apparent feelings, traits, and state of mind.
3.  **Interpersonal Relationships**: Analyze the relationship between the characters. Is it supportive, strained, distant, or something else?
4.  **Character Needs**: What does the main character seem to need or want? (e.g., connection, autonomy, success, safety).
5.  **Conflicts**: What are the main sources of tension in the story? (e.g., internal struggles, interpersonal conflict, societal pressures).
6.  **Outcome**: How does the story end? Is it resolved? Is the ending happy, sad, or uncertain?
7.  **Assumed Worldview**: What underlying beliefs about the world or relationships might this story reflect? (e.g., a belief that effort leads to success, that relationships are inherently difficult).
8.  **Summary**: Provide a gentle, 1-2 sentence interpretive summary that ties together the main points. Example: "The story seems to explore feelings of relationship conflict and a need for resolution, suggesting a worldview where open communication is a significant challenge."
`,
});

const analyzeTatStoryFlow = ai.defineFlow(
  {
    name: 'analyzeTatStoryFlow',
    inputSchema: AnalyzeTatStoryInputSchema,
    outputSchema: AnalyzeTatStoryOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
