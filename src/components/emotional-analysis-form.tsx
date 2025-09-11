'use client';

import { analyzeUserSentiment } from '@/ai/flows/analyze-user-sentiment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useRef, useEffect } from 'react';
import {
  File,
  Loader2,
  Mic,
  Smile,
  Type,
  Frown,
  Meh,
  Activity,
  Camera,
  Video,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import type { AnalyzeUserSentimentOutput } from '@/ai/flows/analyze-user-sentiment';

const formSchema = z.object({
  text: z.string().min(10, {
    message: 'Please describe your feelings in at least 10 characters.',
  }),
  faceImage: z.string().optional(),
  voiceRecording: z
    .any()
    .refine((files) => files?.length == 1, 'Voice recording is required.')
    .refine(
      (files) => files?.[0]?.type.startsWith('audio/'),
      'Only audio files are accepted.'
    ),
});

const fileToDataUri = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const SentimentIcon = ({ sentiment }: { sentiment: string }) => {
  const lowerSentiment = sentiment.toLowerCase();
  if (lowerSentiment.includes('positive'))
    return <Smile className="text-green-500" />;
  if (lowerSentiment.includes('negative'))
    return <Frown className="text-red-500" />;
  return <Meh className="text-yellow-500" />;
};

export function EmotionalAnalysisForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalyzeUserSentimentOutput | null>(null);
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setHasCameraPermission(false);
        console.error('getUserMedia not supported on this browser');
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description:
            'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const takePicture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        form.setValue('faceImage', dataUri);
        toast({
          title: 'Photo captured!',
          description: 'Your picture has been taken for analysis.',
        });
      }
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);

    if (!values.faceImage) {
      toast({
        variant: 'destructive',
        title: 'Missing Photo',
        description: 'Please take a picture before analyzing.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const voiceDataUri = await fileToDataUri(values.voiceRecording[0]);

      const result = await analyzeUserSentiment({
        text: values.text,
        faceDataUri: values.faceImage,
        voiceDataUri,
      });

      setAnalysisResult(result);
      toast({
        title: 'Analysis Complete',
        description: 'Your emotional analysis results are ready.',
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: 'Analysis Failed',
        description:
          "We couldn't complete the analysis. Please try again later.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe your feelings</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., I've been feeling a bit stressed and anxious about my upcoming exams..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <FormLabel>Facial Expression</FormLabel>
              <div className="relative aspect-video rounded-md border bg-muted overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
                {form.getValues('faceImage') && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <p className="text-white font-bold text-lg">Photo Taken!</p>
                  </div>
                )}
              </div>
              {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access to use this feature.
                  </AlertDescription>
                </Alert>
              )}
              <Button
                type="button"
                onClick={takePicture}
                disabled={!hasCameraPermission || isLoading}
                className="w-full"
              >
                <Camera className="mr-2 h-4 w-4" />
                Take Picture
              </Button>
              <FormDescription>
                Capture a clear photo of your face.
              </FormDescription>
            </div>
            <FormField
              control={form.control}
              name="voiceRecording"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voice Tone</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a short audio recording of you describing your feelings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze My Emotions
          </Button>
        </form>
      </Form>

      {analysisResult && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold font-headline mb-4 text-center">
            Analysis Results
          </h3>
          <Card
            className={cn(
              'mb-4 border-2',
              analysisResult.overallSentiment
                .toLowerCase()
                .includes('positive') && 'border-green-500/50 bg-green-500/5',
              analysisResult.overallSentiment
                .toLowerCase()
                .includes('negative') && 'border-red-500/50 bg-red-500/5'
            )}
          >
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Activity /> Overall Sentiment
              </CardTitle>
              <CardDescription>
                Your combined emotional state based on all inputs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Badge
                variant="secondary"
                className="text-lg font-semibold py-1 px-3"
              >
                {analysisResult.overallSentiment}
              </Badge>
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smile /> Facial Expression
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="font-semibold">
                  {analysisResult.facialExpressionSentiment}
                </span>
                <SentimentIcon
                  sentiment={analysisResult.facialExpressionSentiment}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mic /> Voice Tone
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="font-semibold">
                  {analysisResult.voiceToneSentiment}
                </span>
                <SentimentIcon sentiment={analysisResult.voiceToneSentiment} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Type /> Text Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="font-semibold">
                  {analysisResult.textSentiment}
                </span>
                <SentimentIcon sentiment={analysisResult.textSentiment} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
