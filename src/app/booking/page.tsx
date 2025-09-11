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
    <div className="flex-1 p-4 md:p-8 pt-6">
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
    </div>
  );
}
