
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';


export default function ProfessionalVideoPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

 useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const toggleMute = () => {
      setIsMuted(!isMuted);
      if (videoRef.current && videoRef.current.srcObject){
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
      }
  }

  const toggleCamera = () => {
      setIsCameraOff(!isCameraOff);
       if (videoRef.current && videoRef.current.srcObject){
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
      }
  }


  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/professional/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/STU-anon-101/100/100" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-headline text-2xl font-bold tracking-tight">
              Video Call with STU-anon-101
            </h1>
            <p className="text-muted-foreground">Connecting...</p>
          </div>
        </div>
      </div>
      <Card className="flex-1 relative overflow-hidden">
        <CardContent className="p-0 h-full">
          {/* Student's Video Feed (Placeholder) */}
          <div className="w-full h-full bg-muted flex items-center justify-center">
             <div className="text-center text-muted-foreground">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src="https://picsum.photos/seed/STU-anon-101/200/200" />
                    <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <p className="font-bold">STU-anon-101</p>
                <p>Waiting for student to join...</p>
            </div>
          </div>

          {/* Professional's Video Feed */}
          <Card className={cn("absolute bottom-4 right-4 w-48 h-36 border-2 border-primary overflow-hidden transition-opacity", isCameraOff && "opacity-0")}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            />
          </Card>
           {isCameraOff && (
               <Card className="absolute bottom-4 right-4 w-48 h-36 bg-muted flex items-center justify-center">
                   <VideoOff className="w-8 h-8 text-muted-foreground"/>
               </Card>
           )}

            {hasCameraPermission === false && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <Alert variant="destructive" className="max-w-sm">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access in your browser to start the video call.
                        </AlertDescription>
                    </Alert>
                </div>
            )}

          {/* Call Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background/80 backdrop-blur-sm p-3 rounded-full border">
             <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={toggleMute}>
              {isMuted ? <MicOff /> : <Mic />}
              <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={toggleCamera}>
              {isCameraOff ? <VideoOff /> : <VideoIcon />}
               <span className="sr-only">{isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}</span>
            </Button>
            <Link href="/professional/dashboard" passHref>
                <Button variant="destructive" size="icon" className="rounded-full w-12 h-12">
                <PhoneOff />
                <span className="sr-only">End Call</span>
                </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
