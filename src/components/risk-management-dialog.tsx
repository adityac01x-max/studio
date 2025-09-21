
'use client';

import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Phone, MessageCircle, Video } from 'lucide-react';
import { Button } from './ui/button';

interface RiskManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RiskManagementDialog({
  open,
  onOpenChange,
}: RiskManagementDialogProps) {
  const router = useRouter();

  const handleContactHelpline = () => {
    // In a real app, this would initiate a call
    window.location.href = 'tel:1800-599-0019';
  };

  const handleCopingStrategies = () => {
    router.push('/chat');
    onOpenChange(false);
  };
  
  const handleHopeVideo = () => {
    router.push('/hope-video');
    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-headline text-destructive">
            You're Not Alone, Help is Available
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your responses suggest you might be going through a difficult time.
            It's important to talk to someone. Please consider reaching out for
            support.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4 space-y-4">
          <Button
            onClick={handleContactHelpline}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <Phone className="mr-2" /> Call National Helpline (1800-599-0019)
          </Button>
          <Button
            onClick={handleHopeVideo}
            className="w-full"
            variant="secondary"
          >
            <Video className="mr-2" /> Watch a Hope-Filled Video
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            You can also call a free, confidential service 24/7.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={handleCopingStrategies}>
            <MessageCircle className="mr-2" /> Try AI Coping Strategies
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
