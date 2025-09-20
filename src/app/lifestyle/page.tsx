'use client';

import { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wind, Droplets, Flame, Mountain, PlayCircle, Bed, Footprints, HeartPulse, Brain, Palette, Sprout } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Pie, PieChart, ResponsiveContainer } from 'recharts';


const moods = [
  { name: 'Stressed', icon: <Flame className="w-6 h-6" />, color: 'bg-red-500/10 text-red-500' },
  { name: 'Anxious', icon: <Wind className="w-6 h-6" />, color: 'bg-yellow-500/10 text-yellow-500' },
  { name: 'Sad', icon: <Droplets className="w-6 h-6" />, color: 'bg-blue-500/10 text-blue-500' },
  { name: 'Tired', icon: <Mountain className="w-6 h-6" />, color: 'bg-gray-500/10 text-gray-500' },
];

const exercises = {
  Stressed: [
    { title: '15-Min Stress Relief Yoga', videoUrl: 'https://www.youtube.com/embed/sJ0StD0eCxE?autoplay=1', imageId: 'video-1' },
    { title: 'High-Intensity Interval Training (HIIT)', videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI?autoplay=1', imageId: 'video-2' },
    { title: 'Mindful Walking Meditation', videoUrl: 'https://www.youtube.com/embed/O_6KHzq3fMU?autoplay=1', imageId: 'guide-1' },
  ],
  Anxious: [
    { title: '20-Min Calming Pilates', videoUrl: 'https://www.youtube.com/embed/vlv8Y6b-1sM?autoplay=1', imageId: 'video-2' },
    { title: 'Guided Breathing for Anxiety', videoUrl: 'https://www.youtube.com/embed/F28MGLlpP90?autoplay=1', imageId: 'guide-2' },
    { title: 'Gentle Stretching Routine', videoUrl: 'https://www.youtube.com/embed/50kH47ZztHs?autoplay=1', imageId: 'video-1' },
  ],
  Sad: [
    { title: '30-Min Feel-Good Dance Cardio', videoUrl: 'https://www.youtube.com/embed/T44x9t2-Szc?autoplay=1', imageId: 'lifestyle-1' },
    { title: 'Uplifting Full Body Workout', videoUrl: 'https://www.youtube.com/embed/9PO3p1gLpZ4?autoplay=1', imageId: 'lifestyle-2' },
    { title: 'Outdoor Jogging Inspiration', videoUrl: 'https://www.youtube.com/embed/R4i-4f2tIxE?autoplay=1', imageId: 'lifestyle-3' },
  ],
  Tired: [
    { title: '10-Min Energizing Morning Yoga', videoUrl: 'https://www.youtube.com/embed/V-Sj-vI2b3Y?autoplay=1', imageId: 'guide-1' },
    { title: 'Quick & Effective Energy Boosting Workout', videoUrl: 'https://www.youtube.com/embed/P_S6bV2o6a4?autoplay=1', imageId: 'video-2' },
    { title: 'Low-Impact Cardio for a Gentle Boost', videoUrl: 'https://www.youtube.com/embed/50kH47ZztHs?autoplay=1', imageId: 'video-1' },
  ],
};

type Mood = keyof typeof exercises;

const HealthStatCard = ({ icon, title, value, goal, unit, color }: { icon: React.ReactNode, title: string, value: number, goal: number, unit: string, color: string }) => (
    <Card className="flex flex-col items-center justify-center p-4 text-center">
        <div className={`p-3 rounded-full mb-2 ${color}/20`}>{icon}</div>
        <p className="font-bold text-lg">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
        <Progress value={(value / goal) * 100} className="w-full h-2 mt-2" />
        <p className="text-xs text-muted-foreground mt-1">Goal: {goal} {unit}</p>
    </Card>
);

const DrawingCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            context.beginPath();
            context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            setIsDrawing(true);
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');
        if (context) {
            context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            context.strokeStyle = color;
            context.lineWidth = 3;
            context.stroke();
        }
    };

    const stopDrawing = () => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            context.closePath();
            setIsDrawing(false);
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    return (
        <div className="space-y-4">
             <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10" />
                </div>
                <Button onClick={clearCanvas} variant="outline">Clear</Button>
            </div>
            <canvas
                ref={canvasRef}
                width="500"
                height="400"
                className="rounded-lg border bg-white cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
        </div>
    );
};


export default function LifestylePage() {
  const [selectedMood, setSelectedMood] = useState<Mood>('Stressed');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const getImageForExercise = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/student-login" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Lifestyle & Wellness
        </h1>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
          <HealthStatCard icon={<Bed className="w-6 h-6 text-blue-500" />} title="Sleep" value={6} goal={8} unit="hrs" color="bg-blue-500" />
          <HealthStatCard icon={<Footprints className="w-6 h-6 text-green-500" />} title="Steps" value={4503} goal={10000} unit="steps" color="bg-green-500" />
          <HealthStatCard icon={<HeartPulse className="w-6 h-6 text-red-500" />} title="Heart Rate" value={72} goal={60} unit="bpm" color="bg-red-500" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Brain className="w-6 h-6 text-primary"/>Mindful Games</CardTitle>
                <CardDescription>Engage in quick games to calm your mind and reduce stress.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20">Pattern Matching</Button>
                <Button variant="outline" className="h-20">Breathing Exercise</Button>
                <Button variant="outline" className="h-20">Mindful Puzzle</Button>
                <Button variant="outline" className="h-20">Zen Garden</Button>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette className="w-6 h-6 text-primary"/>Creative Corner</CardTitle>
                <CardDescription>Unleash your creativity with drawing and coloring activities.</CardDescription>
            </CardHeader>
            <CardContent>
                <DrawingCanvas />
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>
            Select a mood to get personalized exercise recommendations to help you feel better.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moods.map((mood) => (
              <Button
                key={mood.name}
                variant={selectedMood === mood.name ? 'default' : 'outline'}
                className={`h-24 flex flex-col gap-2 ${selectedMood === mood.name ? '' : mood.color}`}
                onClick={() => {
                  setSelectedMood(mood.name as Mood);
                  setActiveVideo(null);
                }}
              >
                {mood.icon}
                <span>{mood.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
       <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sprout className="w-6 h-6 text-primary"/>Green Hobbies</CardTitle>
                <CardDescription>Connect with nature by starting your own little garden.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <Image src="https://picsum.photos/seed/gardening/600/400" alt="Person gardening" data-ai-hint="gardening hands" width={600} height={400} className="rounded-lg object-cover aspect-video" />
                <div className="space-y-4">
                    <h3 className="font-bold">The Benefits of Planting</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Reduces stress and promotes relaxation.</li>
                        <li>Improves air quality in your home.</li>
                        <li>Provides a sense of accomplishment.</li>
                        <li>Encourages mindfulness and patience.</li>
                    </ul>
                    <Button>Get Started with Planting</Button>
                </div>
            </CardContent>
        </Card>

      <div>
        <h2 className="text-2xl font-bold font-headline my-6">
          Exercises for when you're feeling {selectedMood.toLowerCase()}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises[selectedMood].map((exercise) => {
            const image = getImageForExercise(exercise.imageId);
            const isVideoActive = activeVideo === exercise.videoUrl;
            return (
              <Card key={exercise.title}>
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    {isVideoActive ? (
                      <iframe
                          className="w-full h-full rounded-t-lg"
                          src={exercise.videoUrl}
                          title={exercise.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                      ></iframe>
                    ) : (
                      image && (
                        <div className="relative w-full h-full cursor-pointer" onClick={() => setActiveVideo(exercise.videoUrl)}>
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                data-ai-hint={image.imageHint}
                                width={600}
                                height={400}
                                className="rounded-t-lg object-cover aspect-video"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <PlayCircle className="w-16 h-16 text-white/80" />
                            </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
                <CardHeader>
                  <CardTitle className="text-lg">{exercise.title}</CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
