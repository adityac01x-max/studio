'use server';
/**
 * @fileOverview A Genkit flow for generating a short, uplifting video from positive journal entries.
 *
 * - generateHopeVideo - A function that creates a video based on positive memories.
 * - GenerateHopeVideoInput - The input type for the generateHopeVideo function.
 * - GenerateHopeVideoOutput - The return type for the generateHopeVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import wav from 'wav';

const GenerateHopeVideoInputSchema = z.object({
  positiveMemories: z.array(z.string()).describe("A list of positive memories or journal entry snippets."),
});
export type GenerateHopeVideoInput = z.infer<typeof GenerateHopeVideoInputSchema>;

const GenerateHopeVideoOutputSchema = z.object({
  videoUrl: z.string().url().describe("The data URI of the generated video."),
  audioUrl: z.string().url().describe("The data URI of the generated audio."),
});
export type GenerateHopeVideoOutput = z.infer<typeof GenerateHopeVideoOutputSchema>;

export async function generateHopeVideo(input: GenerateHopeVideoInput): Promise<GenerateHopeVideoOutput> {
  return generateHopeVideoFlow(input);
}


const generateHopeVideoFlow = ai.defineFlow(
  {
    name: 'generateHopeVideoFlow',
    inputSchema: GenerateHopeVideoInputSchema,
    outputSchema: GenerateHopeVideoOutputSchema,
  },
  async (input) => {
    
    // Generate Video and Audio in parallel
    const [videoPromise, audioPromise] = await Promise.allSettled([
        ai.generate({
            model: googleAI.model('veo-2.0-generate-001'),
            prompt: `Create a short, uplifting, and hopeful video montage based on these memories: ${input.positiveMemories.join(', ')}. The style should be dreamlike, soft-focus, and inspiring, with gentle transitions.`,
            config: {
                durationSeconds: 8,
                aspectRatio: '16:9',
            },
        }),
        ai.generate({
            model: googleAI.model('gemini-2.5-flash-preview-tts'),
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Algenib' },
                  },
                },
            },
            prompt: "Here is a moment of hope, just for you. Remember the good times, and know that you are strong and capable.",
        }),
    ]);

    if (videoPromise.status === 'rejected') {
        console.error("Video generation failed:", videoPromise.reason);
        throw new Error('Failed to generate video.');
    }
    if (audioPromise.status === 'rejected') {
        console.error("Audio generation failed:", audioPromise.reason);
        throw new Error('Failed to generate audio.');
    }

    let { operation } = videoPromise.value;
    const { media: audioMedia } = audioPromise.value;

    if (!operation) {
        throw new Error('Expected the video model to return an operation');
    }
     if (!audioMedia) {
      throw new Error('no audio media returned');
    }

    // Wait for video operation to complete
    while (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
        operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
        throw new Error('Failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video || !video.media?.url) {
        throw new Error('Failed to find the generated video in the operation output.');
    }

    const audioBuffer = Buffer.from(
      audioMedia.url.substring(audioMedia.url.indexOf(',') + 1),
      'base64'
    );
    const audioWavBase64 = await toWav(audioBuffer);


    return {
        videoUrl: video.media.url,
        audioUrl: `data:audio/wav;base64,${audioWavBase64}`,
    };
  }
);


async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
