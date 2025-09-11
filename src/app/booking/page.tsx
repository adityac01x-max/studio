import { CounselorBooking } from '@/components/counselor-booking';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function BookingPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">
            Confidential Counselor Booking
          </CardTitle>
          <CardDescription>
            Book a private session with an on-campus counselor. Your privacy
            is our top priority.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CounselorBooking />
        </CardContent>
      </Card>
    </div>
  );
}

    