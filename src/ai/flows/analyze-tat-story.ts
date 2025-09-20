
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
  mainTheme: z.string().describe('The primary theme identified in the story (e.g., Achievement, Intimacy, Power, Loss).'),
  primaryCharacterNeeds: z.array(z.string()).describe("List of the primary character's main needs or drives (e.g., 'Need for connection', 'Desire for success')."),
  potentialConflicts: z.array(z.string()).describe('List of key conflicts or tensions present in the narrative (e.g., "Internal conflict between duty and desire", "External conflict with authority").'),
  outcome: z.string().describe('The perceived outcome of the story (e.g., Positive, Negative, Ambiguous, Resolved, Unresolved).'),
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
  prompt: `You are a psychological analyst specializing in projective tests like the Thematic Apperception Test (TAT). You are provided with a story written by a user in response to an ambiguous image. Your task is to provide a brief, high-level, non-diagnostic interpretation of the story for the user's self-reflection.

The image shows a person of ambiguous gender sitting on a bed, with their head in their hands. In the background, another person is standing by a door.

User's Story:
"{{{story}}}"

Based on the story, analyze the following components:
1.  **Main Theme**: Identify the central theme. Is it about achievement, failure, relationships, loneliness, conflict, etc.?
2.  **Primary Character's Needs**: What does the main character seem to need or want? (e.g., connection, autonomy, success, safety).
3.  **Potential Conflicts**: What are the main sources of tension in the story? (e.g., internal struggles, interpersonal conflict).
4.  **Outcome**: How does the story end? Is it resolved? Is the ending happy, sad, or uncertain?
5.  **Summary**: Provide a gentle, 1-2 sentence interpretive summary. Frame it as a possibility for reflection. Example: "The story seems to explore feelings of relationship conflict and a need for resolution." or "This narrative may touch on themes of ambition and the pressures of success."

Your analysis should be supportive and avoid making definitive statements or diagnoses. Use cautious language (e.g., "seems to," "may suggest," "explores themes of").
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
