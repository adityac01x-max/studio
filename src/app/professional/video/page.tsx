
'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const students = [
  { id: 'STU-anon-101', name: 'Student 101', avatar: 'https://picsum.photos/seed/STU-anon-101/100/100' },
  { id: 'STU-anon-345', name: 'Student 345', avatar: 'https://picsum.photos/seed/STU-anon-345/100/100' },
  { id: 'STU-anon-789', name: 'Student 789', avatar: 'https://picsum.photos/seed/STU-anon-789/100/100' },
];

function VideoCallContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const studentIdFromParams = searchParams.get('studentId');
  
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(studentIdFromParams ?? undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  useEffect(() => {
    if (studentIdFromParams) {
        setSelectedStudentId(studentIdFromParams);
        if (students.some(s => s.id === studentIdFromParams)) {
          startCall(studentIdFromParams);
        }
    }
  }, [studentIdFromParams]);
  
  const startCall = async (studentId: string) => {
    if (!studentId) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasCameraPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCallActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings to use this feature.',
      });
    }
  }

  const endCall = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCallActive(false);
    setHasCameraPermission(undefined);
    setSelectedStudentId(undefined);
  }

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    }
  }

  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    }
  }

  if (!isCallActive) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle>Start a Video Call</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Select onValueChange={setSelectedStudentId} defaultValue={selectedStudentId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a student to call" />
                    </SelectTrigger>
                    <SelectContent>
                        {students.map(student => (
                            <SelectItem key={student.id} value={student.id}>
                                <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={student.avatar} />
                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{student.name} ({student.id})</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={() => startCall(selectedStudentId!)} disabled={!selectedStudentId} className="w-full">
                    <VideoIcon className="mr-2" /> Start Call
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="flex-1 relative overflow-hidden">
      <CardHeader className="absolute top-0 left-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4 w-full">
        <div className="flex items-center gap-3 text-white">
          <Avatar>
            <AvatarImage src={selectedStudent?.avatar} />
            <AvatarFallback>{selectedStudent?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-bold tracking-tight">
              Video Call with {selectedStudent?.name}
            </h1>
            <p className="text-xs text-white/80">Connecting...</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={selectedStudent?.avatar} />
              <AvatarFallback>{selectedStudent?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="font-bold">{selectedStudent?.name}</p>
            <p>Waiting for student to join...</p>
          </div>
        </div>

        <Card className={cn("absolute bottom-20 right-4 w-48 h-36 border-2 border-primary overflow-hidden transition-opacity", isCameraOff && "opacity-0")}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
          />
        </Card>
        {isCameraOff && (
          <Card className="absolute bottom-20 right-4 w-48 h-36 bg-muted flex items-center justify-center">
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

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background/80 backdrop-blur-sm p-3 rounded-full border">
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={toggleMute}>
            {isMuted ? <MicOff /> : <Mic />}
            <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={toggleCamera}>
            {isCameraOff ? <VideoOff /> : <VideoIcon />}
            <span className="sr-only">{isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}</span>
          </Button>
          <Button variant="destructive" size="icon" className="rounded-full w-12 h-12" onClick={endCall}>
            <PhoneOff />
            <span className="sr-only">End Call</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


export default function ProfessionalVideoPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/professional/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
            Video Call
        </h1>
      </div>
      <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin"/></div>}>
        <VideoCallContent />
      </Suspense>
    </div>
  );
}

