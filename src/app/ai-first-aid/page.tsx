import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AiFirstAidPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader>
          <CardTitle>AI First-Aid</CardTitle>
          <CardDescription>
            This is a placeholder page for AI First-Aid.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for AI First-Aid will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
