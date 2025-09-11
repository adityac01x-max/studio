import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge as BadgeIcon, Star, Heart, CheckCircle } from 'lucide-react';

const badges = [
  {
    icon: <CheckCircle className="w-10 h-10 text-green-500" />,
    title: 'First Step',
    description: 'Completed your first survey.',
    unlocked: true,
  },
  {
    icon: <Heart className="w-10 h-10 text-red-500" />,
    title: 'Mindful Moment',
    description: 'Completed a mindfulness exercise.',
    unlocked: true,
  },
  {
    icon: <Star className="w-10 h-10 text-yellow-500" />,
    title: 'Streak Starter',
    description: 'Maintained a 3-day streak of check-ins.',
    unlocked: false,
  },
  {
    icon: <BadgeIcon className="w-10 h-10 text-blue-500" />,
    title: 'Resource Explorer',
    description: 'Accessed 5 resources from the hub.',
    unlocked: false,
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-green-500" />,
    title: 'Survey Superstar',
    description: 'Completed both PHQ-9 and GAD-7.',
    unlocked: true,
  },
  {
    icon: <Star className="w-10 h-10 text-yellow-500" />,
    title: 'Weekly Warrior',
    description: 'Completed all weekly goals.',
    unlocked: false,
  },
];

export default function BadgesPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
          <BadgeIcon className="w-8 h-8 text-primary" />
          Your Badges
        </h1>
        <p className="text-muted-foreground">
          Collect badges by completing activities and reaching milestones.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge, index) => (
            <Card
              key={index}
              className={`flex flex-col items-center text-center ${
                badge.unlocked ? '' : 'opacity-50 bg-muted/50'
              }`}
            >
              <CardHeader>
                {badge.icon}
                <CardTitle className="mt-2">{badge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{badge.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
