
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { generateHopeVideo } from '@/ai/flows/generate-hope-video';
import { useToast } from '@/hooks/use-toast';

type JournalEntry = {
  id: number;
  title: string;
  content: string;
  date: string;
  mood: 'Positive' | 'Negative' | 'Neutral';
  imageUrl?: string;
};

export default function HopeVideoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const generateVideo = async () => {
      try {
        const savedEntries = localStorage.getItem('journalEntries');
        if (!savedEntries) {
          setError('No journal entries found to generate a video.');
          setIsLoading(false);
          return;
        }
        
        const entries: JournalEntry[] = JSON.parse(savedEntries);
        const positiveEntries = entries.filter(e => e.mood === 'Positive');
        
        if (positiveEntries.length === 0) {
          setError('No positive journal entries found. Write some positive entries to enable this feature!');
          setIsLoading(false);
          return;
        }

        // Get the titles of the 5 most recent positive entries
        const positiveMemories = positiveEntries
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)
          .map(e => e.title);

        toast({
          title: 'Creating Your Video...',
          description: 'This may take a minute. Please wait.',
        });

        const result = await generateHopeVideo({ positiveMemories });

        setVideoUrl(result.videoDataUrl);
        setAudioUrl(result.audioDataUrl);

      } catch (e: any) {
        console.error('Video generation failed:', e);
        setError('Could not generate the video. Please try again later.');
        toast({
          variant: 'destructive',
          title: 'Video Generation Failed',
          description: e.message || 'An unexpected error occurred.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateVideo();
  }, [toast]);

  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Your Hope-Filled Moment
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>A Video Just For You</CardTitle>
          <CardDescription>
            Based on your own positive memories, here is a short video to bring a moment of light.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
            {isLoading && (
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-muted-foreground">Generating your personalized video...</p>
                <p className="text-sm text-muted-foreground">(This may take up to a minute)</p>
              </div>
            )}
            {error && (
              <div className="text-center text-destructive p-4">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}
            {videoUrl && (
              <video src={videoUrl} controls autoPlay className="w-full h-full rounded-lg">
                Your browser does not support the video tag.
              </video>
            )}
          </div>
           {audioUrl && (
              <audio src={audioUrl} autoPlay className="w-full mt-4" />
            )}
        </CardContent>
      </Card>
    </div>
  );
}
