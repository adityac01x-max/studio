import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

const leaderboardData = [
  { rank: 1, studentId: 'STU-845', points: 1250, level: 'Gold' },
  { rank: 2, studentId: 'STU-123', points: 1100, level: 'Gold' },
  { rank: 3, studentId: 'STU-456', points: 980, level: 'Silver' },
  { rank: 4, studentId: 'STU-789', points: 950, level: 'Silver' },
  { rank: 5, studentId: 'STU-234', points: 800, level: 'Bronze' },
  { rank: 6, studentId: 'STU-567', points: 750, level: 'Bronze' },
  { rank: 7, studentId: 'You', points: 745, level: 'Bronze' },
  { rank: 8, studentId: 'STU-890', points: 600, level: 'Bronze' },
  { rank: 9, studentId: 'STU-901', points: 550, level: 'Bronze' },
  { rank: 10, studentId: 'STU-112', points: 480, level: 'Bronze' },
];

export default function LeaderboardPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
          <Trophy className="w-8 h-8 text-primary" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground">
          See how you rank among your peers. Keep participating to climb up!
        </p>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((user) => (
                  <TableRow
                    key={user.rank}
                    className={user.studentId === 'You' ? 'bg-accent/50' : ''}
                  >
                    <TableCell className="font-medium text-lg">
                      {user.rank}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`https://picsum.photos/seed/${user.studentId}/100/100`}
                          />
                          <AvatarFallback>
                            {user.studentId.slice(4, 6)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.studentId}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.level === 'Gold'
                            ? 'default'
                            : user.level === 'Silver'
                              ? 'secondary'
                              : 'outline'
                        }
                        className={
                          user.level === 'Gold'
                            ? 'bg-yellow-500 text-white'
                            : user.level === 'Silver'
                              ? 'bg-slate-400 text-white'
                              : ''
                        }
                      >
                        {user.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {user.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
