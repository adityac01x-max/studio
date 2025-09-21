'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Pen, Eraser, Trash2, RectangleHorizontal, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type Tool = 'pen' | 'eraser' | 'rectangle' | 'circle';

export const DrawingCanvas = ({ onDrawingChange, initialImage }: { onDrawingChange: (dataUrl: string) => void, initialImage?: string | null }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null);
    const [tool, setTool] = useState<Tool>('pen');
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(5);
    
    const colors = ['#000000', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

    const initializeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                contextRef.current = context;
                 context.fillStyle = '#FFFFFF';
                 context.fillRect(0, 0, canvas.width, canvas.height);
                if (initialImage) {
                    const image = new window.Image();
                    image.crossOrigin = 'anonymous';
                    image.src = initialImage;
                    image.onload = () => {
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        onDrawingChange(canvas.toDataURL('image/png'));
                    };
                     image.onerror = () => { // Handle image load errors (e.g. CORS)
                        context.fillStyle = '#FFFFFF';
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        onDrawingChange(canvas.toDataURL('image/png'));
                    }
                } else {
                    onDrawingChange(canvas.toDataURL('image/png'));
                }
            }
        }
    }, [initialImage, onDrawingChange]);

    useEffect(() => {
        initializeCanvas();
    }, [initializeCanvas]);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
            contextRef.current.fillStyle = color;
            contextRef.current.lineWidth = lineWidth;
            contextRef.current.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
        }
    }, [color, lineWidth, tool]);

    const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
        const rect = canvasRef.current!.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { x, y } = getMousePos(e);
        setStartPoint({ x, y });
        setIsDrawing(true);
        if (contextRef.current) {
             if (tool === 'pen' || tool === 'eraser') {
                contextRef.current.beginPath();
                contextRef.current.moveTo(x, y);
            }
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !contextRef.current || !startPoint) return;
        const { x, y } = getMousePos(e);
        if (tool === 'pen' || tool === 'eraser') {
            contextRef.current.lineTo(x, y);
            contextRef.current.stroke();
        }
    };

    const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !contextRef.current || !startPoint) return;
        
        const { x, y } = getMousePos(e);

        if (tool === 'rectangle') {
            contextRef.current.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y);
        } else if (tool === 'circle') {
             const radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2));
             contextRef.current.beginPath();
             contextRef.current.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
             contextRef.current.stroke();
        }

        setIsDrawing(false);
        setStartPoint(null);
        if (canvasRef.current) {
            onDrawingChange(canvasRef.current.toDataURL('image/png'));
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas && contextRef.current) {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
            contextRef.current.fillStyle = '#FFFFFF';
            contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
            onDrawingChange(canvas.toDataURL());
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md border p-2">
                <div className="flex items-center gap-2">
                    <Label className="mr-2">Tool</Label>
                    <Button variant={tool === 'pen' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('pen')}><Pen /></Button>
                    <Button variant={tool === 'eraser' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('eraser')}><Eraser /></Button>
                    <Button variant={tool === 'rectangle' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('rectangle')}><RectangleHorizontal /></Button>
                    <Button variant={tool === 'circle' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('circle')}><Circle /></Button>
                </div>
                 <div className="flex items-center gap-2">
                    <Label className="mr-2">Color</Label>
                    {colors.map(c => (
                        <Button key={c} style={{backgroundColor: c}} className={cn("w-6 h-6 rounded-full border-2", color === c ? 'border-primary' : 'border-transparent')} onClick={() => setColor(c)} />
                    ))}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="icon" className="w-6 h-6 rounded-full" style={{backgroundColor: color}} />
                        </PopoverTrigger>
                         <PopoverContent className="w-auto p-0">
                           <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-16 h-16" />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="col-span-2 space-y-2">
                    <Label>Brush Size: {lineWidth}</Label>
                    <Slider defaultValue={[lineWidth]} max={50} step={1} onValueChange={(value) => setLineWidth(value[0])} />
                </div>
            </div>
            <canvas
                ref={canvasRef}
                width="600"
                height="400"
                className="rounded-lg border bg-white cursor-crosshair w-full aspect-[3/2]"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <Button onClick={clearCanvas} variant="outline" className="w-full">
                <Trash2 className="mr-2" /> Clear Canvas
            </Button>
        </div>
    );
};
