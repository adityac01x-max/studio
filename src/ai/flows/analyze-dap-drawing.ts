
'use server';
/**
 * @fileOverview A Genkit flow for analyzing a drawing from the Draw-A-Person (DAP) test.
 *
 * - analyzeDapDrawing - A function that provides a psychological interpretation of a DAP drawing.
 * - AnalyzeDapDrawingInput - The input type for the analyzeDapDrawing function.
 * - AnalyzeDapDrawingOutput - The return type for the analyzeDapDrawing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDapDrawingInputSchema = z.object({
  drawingDataUri: z.string().describe("A drawing of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type AnalyzeDapDrawingInput = z.infer<typeof AnalyzeDapDrawingInputSchema>;

const AnalyzeDapDrawingOutputSchema = z.object({
  overallImpression: z.string().describe('A high-level impression of the drawing (e.g., "The figure appears grounded and stable," "The drawing has a light, energetic quality").'),
  keyFeatures: z.array(z.string()).describe('A list of 2-4 notable features in the drawing (e.g., "Emphasis on the head," "Figure is large on the page," "Lack of facial details," "Shading used on clothing").'),
  emotionalIndicators: z.array(z.string()).describe('A list of potential emotional indicators suggested by the drawing style and features (e.g., "Potential focus on intellectual-social aspects," "May indicate feelings of emptiness or identity confusion," "Suggests some anxiety or stress").'),
  summary: z.string().describe('A brief, 1-2 sentence interpretive summary for self-reflection. This is not a diagnosis. Example: "The drawing may highlight a focus on social connection and communication, while also suggesting some underlying anxieties."'),
});
export type AnalyzeDapDrawingOutput = z.infer<typeof AnalyzeDapDrawingOutputSchema>;

export async function analyzeDapDrawing(input: AnalyzeDapDrawingInput): Promise<AnalyzeDapDrawingOutput> {
  return analyzeDapDrawingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDapDrawingPrompt',
  input: {schema: AnalyzeDapDrawingInputSchema},
  output: {schema: AnalyzeDapDrawingOutputSchema},
  prompt: `You are a psychological analyst specializing in projective tests like the Draw-A-Person (DAP) test. You are provided with a drawing of a person. Your task is to provide a gentle, high-level, non-diagnostic interpretation for the user's self-reflection.

Drawing:
{{media url=drawingDataUri}}

Analyze the drawing based on common DAP interpretation guidelines, but keep your language accessible and cautious. Focus on:
1.  **Overall Impression**: What is the general feeling of the drawing? Is it grounded, floating, rigid, dynamic?
2.  **Key Features**: Note 2-4 prominent features. Consider size, placement, emphasis (e.g., large head, small hands), and omissions (e.g., missing feet, no facial features).
3.  **Potential Emotional Indicators**: Based on the features, what emotional themes *might* be present? (e.g., Emphasis on head -> intellectual concerns; Shaky lines -> anxiety; No hands -> feelings of helplessness). Frame these as possibilities, not certainties.
4.  **Summary**: Provide a gentle, 1-2 sentence interpretive summary. Example: "The drawing's emphasis on the head could suggest a focus on thoughts and social interaction, while the light line pressure might indicate a sensitive nature."

Your analysis MUST be supportive and avoid making definitive statements or diagnoses. Use cautious language like "may suggest," "could indicate," "might reflect," and "themes of." Do not state anything as a fact.
`,
});

const analyzeDapDrawingFlow = ai.defineFlow(
  {
    name: 'analyzeDapDrawingFlow',
    inputSchema: AnalyzeDapDrawingInputSchema,
    outputSchema: AnalyzeDapDrawingOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
