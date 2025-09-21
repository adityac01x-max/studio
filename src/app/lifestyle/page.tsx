
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Footprints, HeartPulse, Brain, Palette, Sprout, ArrowRight, Wind, Droplets, Flame, Mountain, Activity, BarChart2, NotebookText, Home, Gamepad2, Bike } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';


const HealthStatCard = ({ icon, title, value, goal, unit, color, href }: { icon: React.ReactNode, title: string, value: number, goal: number, unit: string, color: string, href: string }) => (
    <Link href={href} passHref>
        <Card className="flex flex-col items-center justify-center p-4 text-center hover:border-primary transition-colors h-full">
            <div className={`p-3 rounded-full mb-2 ${color}/20`}>{icon}</div>
            <p className="font-bold text-lg">{value}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
            <Progress value={(value / goal) * 100} className="w-full h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Goal: {goal} {unit}</p>
        </Card>
    </Link>
);

const moods = [
  { name: 'Stressed', icon: <Flame className="w-6 h-6" />, color: 'bg-red-500/10 text-red-500' },
  { name: 'Anxious', icon: <Wind className="w-6 h-6" />, color: 'bg-yellow-500/10 text-yellow-500' },
  { name: 'Sad', icon: <Droplets className="w-6 h-6" />, color: 'bg-blue-500/10 text-blue-500' },
  { name: 'Tired', icon: <Mountain className="w-6 h-6" />, color: 'bg-gray-500/10 text-gray-500' },
];

export default function LifestyleDashboardPage() {
  return (
    <div className="space-y-6">
       <div className="space-y-2">
         <h1 className="font-headline text-3xl font-bold tracking-tight">
          Lifestyle & Wellness
        </h1>
        <p className="text-muted-foreground">
          Your personal space for health, creativity, and relaxation.
        </p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Explore activities for your mind and body.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Link href="/lifestyle/activities" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Gamepad2 className="w-6 h-6 text-primary" />
              <span>Activities</span>
            </Button>
          </Link>
          <Link href="/lifestyle/exercises" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Bike className="w-6 h-6 text-primary" />
              <span>Exercises</span>
            </Button>
          </Link>
          <Link href="/lifestyle/greenhouse" passHref>
            <Button variant="outline" className="w-full h-20 flex-col gap-2">
              <Sprout className="w-6 h-6 text-primary" />
              <span>Greenhouse</span>
            </Button>
          </Link>
        </CardContent>
      </Card>

       <div className="grid gap-6 md:grid-cols-3">
          <HealthStatCard href="/lifestyle" icon={<Bed className="w-6 h-6 text-blue-500" />} title="Sleep" value={6} goal={8} unit="hrs" color="bg-blue-500" />
          <HealthStatCard href="/lifestyle" icon={<Footprints className="w-6 h-6 text-green-500" />} title="Steps" value={4503} goal={10000} unit="steps" color="bg-green-500" />
          <HealthStatCard href="/lifestyle" icon={<HeartPulse className="w-6 h-6 text-red-500" />} title="Heart Rate" value={72} goal={60} unit="bpm" color="bg-red-500" />
      </div>

       <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>
            Select a mood to get personalized exercise recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {moods.map((mood) => (
               <Link href="/lifestyle/exercises" key={mood.name} passHref>
                <Button
                    variant={'outline'}
                    className={`h-24 flex flex-col gap-2 ${mood.color}`}
                >
                    {mood.icon}
                    <span>{mood.name}</span>
                </Button>
             </Link>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
