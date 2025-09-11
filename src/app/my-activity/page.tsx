import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, CheckCircle, FileText, Bot, Users } from 'lucide-react';

const activities = [
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: 'Completed PHQ-9 Survey',
    description: 'You earned 10 points for checking in.',
    date: '2 days ago',
  },
  {
    icon: <Bot className="w-6 h-6 text-primary" />,
    title: 'Used AI First-Aid',
    description: 'You explored coping strategies.',
    date: '3 days ago',
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-500" />,
    title: 'Read a Guide',
    description: 'You accessed the "Managing Stress" guide.',
    date: '4 days ago',
  },
  {
    icon: <Users className="w-6 h-6 text-orange-500" />,
    title: 'Booked a Session',
    description: 'You scheduled an appointment with a counsellor.',
    date: '5 days ago',
  },
];

export default function MyActivityPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
          <Activity className="w-8 h-8 text-primary" />
          My Activity
        </h1>
        <p className="text-muted-foreground">
          A log of your recent activities and accomplishments on the platform.
        </p>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Here is a list of your most recent actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.date}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
