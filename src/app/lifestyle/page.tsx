
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wind, Droplets, Flame, Mountain, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const moods = [
  { name: 'Stressed', icon: <Flame className="w-6 h-6" />, color: 'bg-red-500/10 text-red-500' },
  { name: 'Anxious', icon: <Wind className="w-6 h-6" />, color: 'bg-yellow-500/10 text-yellow-500' },
  { name: 'Sad', icon: <Droplets className="w-6 h-6" />, color: 'bg-blue-500/10 text-blue-500' },
  { name: 'Tired', icon: <Mountain className="w-6 h-6" />, color: 'bg-gray-500/10 text-gray-500' },
];

const exercises = {
  Stressed: [
    { title: '15-Min Stress Relief Yoga', videoUrl: 'https://www.youtube.com/embed/sJ0StD0eCxE', imageId: 'video-1' },
    { title: 'High-Intensity Interval Training (HIIT)', videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI', imageId: 'video-2' },
    { title: 'Mindful Walking Meditation', videoUrl: 'https://www.youtube.com/embed/O_6KHzq3fMU', imageId: 'guide-1' },
  ],
  Anxious: [
    { title: '20-Min Calming Pilates', videoUrl: 'https://www.youtube.com/embed/vlv8Y6b-1sM', imageId: 'video-2' },
    { title: 'Guided Breathing for Anxiety', videoUrl: 'https://www.youtube.com/embed/F28MGLlpP90', imageId: 'guide-2' },
    { title: 'Gentle Stretching Routine', videoUrl: 'https://www.youtube.com/embed/50kH47ZztHs', imageId: 'video-1' },
  ],
  Sad: [
    { title: '30-Min Feel-Good Dance Cardio', videoUrl: 'https://www.youtube.com/embed/T44x9t2-Szc', imageId: 'lifestyle-1' },
    { title: 'Uplifting Full Body Workout', videoUrl: 'https://www.youtube.com/embed/9PO3p1gLpZ4', imageId: 'lifestyle-2' },
    { title: 'Outdoor Jogging Inspiration', videoUrl: 'https://www.youtube.com/embed/R4i-4f2tIxE', imageId: 'lifestyle-3' },
  ],
  Tired: [
    { title: '10-Min Energizing Morning Yoga', videoUrl: 'https://www.youtube.com/embed/V-Sj-vI2b3Y', imageId: 'guide-1' },
    { title: 'Quick & Effective Energy Boosting Workout', videoUrl: 'https://www.youtube.com/embed/P_S6bV2o6a4', imageId: 'video-2' },
    { title: 'Low-Impact Cardio for a Gentle Boost', videoUrl: 'https://www.youtube.com/embed/50kH47ZztHs', imageId: 'video-1' },
  ],
};

type Mood = keyof typeof exercises;

export default function LifestylePage() {
  const [selectedMood, setSelectedMood] = useState<Mood>('Stressed');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const getImageForExercise = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Lifestyle & Wellness
        </h1>
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
                  setActiveVideo(null); // Reset active video when mood changes
                }}
              >
                {mood.icon}
                <span>{mood.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">
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
                          src={`${exercise.videoUrl}?autoplay=1`}
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
