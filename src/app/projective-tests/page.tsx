
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Wand2, Image as ImageIcon, Palette, Pen, Eraser } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { analyzeDapDrawing, AnalyzeDapDrawingOutput } from '@/ai/flows/analyze-dap-drawing';
import { analyzeTatStory, AnalyzeTatStoryOutput } from '@/ai/flows/analyze-tat-story';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';


const DrawingCanvas = ({ onDrawingChange }: { onDrawingChange: (dataUrl: string) => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(5);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.lineCap = 'round';
                context.lineJoin = 'round';
                contextRef.current = context;
            }
        }
    }, []);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
            contextRef.current.lineWidth = lineWidth;
            if (tool === 'eraser') {
                 contextRef.current.globalCompositeOperation = 'destination-out';
            } else {
                contextRef.current.globalCompositeOperation = 'source-over';
            }
        }
    }, [color, lineWidth, tool]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (contextRef.current) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            setIsDrawing(true);
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !contextRef.current) return;
        contextRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        contextRef.current.stroke();
    };
    
    const stopDrawing = () => {
        if (contextRef.current) {
            contextRef.current.closePath();
            setIsDrawing(false);
            if (canvasRef.current) {
                onDrawingChange(canvasRef.current.toDataURL());
            }
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas && contextRef.current) {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
            onDrawingChange(canvas.toDataURL());
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 rounded-md border p-2">
                    <Label>Tool</Label>
                    <Button variant={tool === 'pen' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('pen')}><Pen/></Button>
                    <Button variant={tool === 'eraser' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('eraser')}><Eraser/></Button>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-2">
                    <Label>Color</Label>
                     <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8" />
                </div>
                <div className="col-span-2 space-y-2 rounded-md border p-2">
                    <Label>Brush Size: {lineWidth}</Label>
                    <Slider defaultValue={[lineWidth]} max={50} step={1} onValueChange={(value) => setLineWidth(value[0])} />
                </div>
            </div>
            <canvas
                ref={canvasRef}
                width="500"
                height="350"
                className="rounded-lg border bg-white cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <Button onClick={clearCanvas} variant="outline" className="w-full">Clear Canvas</Button>
        </div>
    );
};


export default function ProjectiveTestsPage() {
    const { toast } = useToast();
    const [tatStory, setTatStory] = useState('');
    const [tatIsLoading, setTatIsLoading] = useState(false);
    const [tatResult, setTatResult] = useState<AnalyzeTatStoryOutput | null>(null);
    const [tatImageUrl, setTatImageUrl] = useState("https://picsum.photos/seed/tat-image/600/400");

    const [dapDrawing, setDapDrawing] = useState<string>('');
    const [dapIsLoading, setDapIsLoading] = useState(false);
    const [dapResult, setDapResult] = useState<AnalyzeDapDrawingOutput | null>(null);

    useEffect(() => {
        const seed = Math.floor(Math.random() * 1000);
        setTatImageUrl(`https://picsum.photos/seed/tat-image-${seed}/600/400`);
    }, []);
    

    const handleTatSubmit = async () => {
        if (tatStory.length < 20) {
            toast({
                variant: 'destructive',
                title: 'Story too short',
                description: 'Please write a story of at least 20 characters.'
            });
            return;
        }
        setTatIsLoading(true);
        setTatResult(null);
        try {
            const result = await analyzeTatStory({ story: tatStory });
            setTatResult(result);
            toast({
                title: 'Analysis Complete',
                description: 'Your TAT story analysis is ready.'
            });
        } catch (error) {
             toast({
                variant: 'destructive',
                title: 'Analysis Failed',
                description: 'Could not analyze your story. Please try again.'
            });
        } finally {
            setTatIsLoading(false);
        }
    };
    
    const handleDapSubmit = async () => {
        if (!dapDrawing) {
            toast({
                variant: 'destructive',
                title: 'No Drawing',
                description: 'Please draw a person before analyzing.'
            });
            return;
        }
        setDapIsLoading(true);
        setDapResult(null);
        try {
            const result = await analyzeDapDrawing({ drawingDataUri: dapDrawing });
            setDapResult(result);
             toast({
                title: 'Analysis Complete',
                description: 'Your DAP drawing analysis is ready.'
            });
        } catch (error) {
             toast({
                variant: 'destructive',
                title: 'Analysis Failed',
                description: 'Could not analyze your drawing. Please try again.'
            });
        } finally {
            setDapIsLoading(false);
        }
    };


  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Projective Tests
        </h1>
      </div>
      <p className="text-muted-foreground">
        Engage with these tests to explore your thoughts and feelings. These are not diagnostic tools but are for self-reflection.
      </p>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ImageIcon/> Thematic Apperception Test (TAT)</CardTitle>
                <CardDescription>Instructions: Look at the image below. What is happening? What led to this scene, and what will happen next? Write a brief story based on your interpretation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative aspect-video w-full">
                    <Image src={tatImageUrl} alt="Ambiguous scene for TAT" layout="fill" objectFit="cover" className="rounded-md" data-ai-hint="man woman bed" />
                </div>
                <Textarea 
                    placeholder="Once upon a time..." 
                    rows={6}
                    value={tatStory}
                    onChange={(e) => setTatStory(e.target.value)}
                    disabled={tatIsLoading}
                />
            </CardContent>
            <CardFooter>
                 <Button onClick={handleTatSubmit} disabled={tatIsLoading} className="w-full">
                    {tatIsLoading ? <Loader2 className="mr-2 animate-spin"/> : <Wand2 className="mr-2"/>}
                    Analyze My Story
                </Button>
            </CardFooter>
            {tatResult && (
                <CardContent className="border-t pt-6 space-y-4">
                    <h3 className="font-bold">AI Interpretation</h3>
                     <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p><strong>Main Theme:</strong> {tatResult.mainTheme}</p>
                        <p><strong>Primary Character's Needs:</strong> {tatResult.primaryCharacterNeeds.join(', ')}</p>
                        <p><strong>Potential Conflicts:</strong> {tatResult.potentialConflicts.join(', ')}</p>
                        <p><strong>Outcome:</strong> {tatResult.outcome}</p>
                        <p><strong>Interpretive Summary:</strong> {tatResult.summary}</p>
                    </div>
                </CardContent>
            )}
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette/> Draw-A-Person (DAP) Test</CardTitle>
                <CardDescription>Instructions: Use the canvas below to draw a person. It doesn't have to be perfect; just draw whatever comes to mind. Once you're done, the AI will provide a gentle, non-diagnostic interpretation for self-reflection.</CardDescription>
            </CardHeader>
             <CardContent>
                <DrawingCanvas onDrawingChange={setDapDrawing} />
            </CardContent>
            <CardFooter>
                 <Button onClick={handleDapSubmit} disabled={dapIsLoading} className="w-full">
                    {dapIsLoading ? <Loader2 className="mr-2 animate-spin"/> : <Wand2 className="mr-2"/>}
                    Analyze My Drawing
                </Button>
            </CardFooter>
            {dapResult && (
                 <CardContent className="border-t pt-6 space-y-4">
                    <h3 className="font-bold">AI Interpretation</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                       <p><strong>Overall Impression:</strong> {dapResult.overallImpression}</p>
                       <p><strong>Key Features Noted:</strong></p>
                       <ul>
                           {dapResult.keyFeatures.map((feature, i) => <li key={i}>{feature}</li>)}
                       </ul>
                       <p><strong>Potential Emotional Indicators:</strong></p>
                       <ul>
                           {dapResult.emotionalIndicators.map((indicator, i) => <li key={i}>{indicator}</li>)}
                       </ul>
                       <p><strong>Interpretive Summary:</strong> {dapResult.summary}</p>
                    </div>
                </CardContent>
            )}
        </Card>
      </div>

    </div>
  );
}
