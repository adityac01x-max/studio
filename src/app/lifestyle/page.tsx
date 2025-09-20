
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wind, Droplets, Flame, Mountain, PlayCircle, Bed, Footprints, HeartPulse, Brain, Palette, Sprout, Check, X, RefreshCw, Hand, Waves, Sun, Flower, Gem, Eraser, Pen, Plus, Trash2, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from '@/components/ui/badge';


const moods = [
  { name: 'Stressed', icon: <Flame className="w-6 h-6" />, color: 'bg-red-500/10 text-red-500' },
  { name: 'Anxious', icon: <Wind className="w-6 h-6" />, color: 'bg-yellow-500/10 text-yellow-500' },
  { name: 'Sad', icon: <Droplets className="w-6 h-6" />, color: 'bg-blue-500/10 text-blue-500' },
  { name: 'Tired', icon: <Mountain className="w-6 h-6" />, color: 'bg-gray-500/10 text-gray-500' },
];

const exercises = {
  Stressed: [
    { title: '15-Min Stress Relief Yoga', videoUrl: 'https://www.youtube.com/embed/sJ0StD0eCxE?autoplay=1', imageId: 'video-1' },
    { title: 'High-Intensity Interval Training (HIIT)', videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI?autoplay=1', imageId: 'video-2' },
    { title: 'Mindful Walking Meditation', videoUrl: 'https://www.youtube.com/embed/O_6KHzq3fMU?autoplay=1', imageId: 'guide-1' },
  ],
  Anxious: [
    { title: '20-Min Calming Pilates', videoUrl: 'https://www.youtube.com/embed/vlv8Y6b-1sM?autoplay=1', imageId: 'video-2' },
    { title: 'Guided Breathing for Anxiety', videoUrl: 'https://www.youtube.com/embed/F28MGLpP90?autoplay=1', imageId: 'guide-2' },
    { title: 'Gentle Stretching Routine', videoUrl: 'https://www.youtube.com/embed/50kH47ZztHs?autoplay=1', imageId: 'video-1' },
  ],
  Sad: [
    { title: '30-Min Feel-Good Dance Cardio', videoUrl: 'https://www.youtube.com/embed/T44x9t2-Szc?autoplay=1', imageId: 'lifestyle-1' },
    { title: 'Uplifting Full Body Workout', videoUrl: 'https://www.youtube.com/embed/9PO3p1gLpZ4?autoplay=1', imageId: 'lifestyle-2' },
    { title: 'Outdoor Jogging Inspiration', videoUrl: 'https://www.youtube.com/embed/R4i-4f2tIxE?autoplay=1', imageId: 'lifestyle-3' },
  ],
  Tired: [
    { title: '10-Min Energizing Morning Yoga', videoUrl: 'https://www.youtube.com/embed/V-Sj-vI2b3Y?autoplay=1', imageId: 'guide-1' },
    { title: 'Quick & Effective Energy Boosting Workout', videoUrl: 'https://www.youtube.com/embed/P_S6bV2o6a4?autoplay=1', imageId: 'video-2' },
    { title: 'Low-Impact Cardio for a Gentle Boost', videoUrl: 'https://www.youtube.com/embed/50kH47ZztHs?autoplay=1', imageId: 'video-1' },
  ],
};

type Mood = keyof typeof exercises;

const HealthStatCard = ({ icon, title, value, goal, unit, color }: { icon: React.ReactNode, title: string, value: number, goal: number, unit: string, color: string }) => (
    <Card className="flex flex-col items-center justify-center p-4 text-center">
        <div className={`p-3 rounded-full mb-2 ${color}/20`}>{icon}</div>
        <p className="font-bold text-lg">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
        <Progress value={(value / goal) * 100} className="w-full h-2 mt-2" />
        <p className="text-xs text-muted-foreground mt-1">Goal: {goal} {unit}</p>
    </Card>
);

const DrawingCanvas = () => {
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
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas && contextRef.current) {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
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

const generatePattern = (size: number, patternCount: number) => {
  const cards = Array.from({ length: size * size }, (_, i) => ({
    id: i,
    isPattern: false,
    isSelected: false,
    isCorrect: false,
    isIncorrect: false,
  }));
  let patternIndices = new Set<number>();
  while (patternIndices.size < patternCount) {
    patternIndices.add(Math.floor(Math.random() * cards.length));
  }
  patternIndices.forEach(index => {
    cards[index].isPattern = true;
  });
  return cards;
};

const PatternMatchingGame = () => {
    const gridSize = 4;
    const patternCount = 5;
    const [cards, setCards] = useState(generatePattern(gridSize, patternCount));
    const [isRevealed, setIsRevealed] = useState(true);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'won'>('intro');

    const resetGame = useCallback(() => {
        setCards(generatePattern(gridSize, patternCount));
        setIsRevealed(true);
        setGameState('intro');
    }, []);

    useEffect(() => {
        if (gameState === 'intro') {
            const timer = setTimeout(() => {
                setIsRevealed(false);
                setGameState('playing');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [gameState]);

    const handleCardClick = (id: number) => {
        if (gameState !== 'playing') return;

        setCards(prevCards => {
            const newCards = [...prevCards];
            const card = newCards.find(c => c.id === id);
            if (card) {
                card.isSelected = !card.isSelected;
            }
            return newCards;
        });
    };
    
    const checkPattern = () => {
        let correctSelections = 0;
        let allCorrect = true;

        const newCards = cards.map(card => {
            const isSelected = card.isSelected;
            const isPattern = card.isPattern;
            let isCorrect = false;
            let isIncorrect = false;

            if (isSelected && isPattern) {
                isCorrect = true;
                correctSelections++;
            } else if (isSelected && !isPattern) {
                isIncorrect = true;
                allCorrect = false;
            } else if (!isSelected && isPattern) {
                allCorrect = false;
            }
            return { ...card, isCorrect, isIncorrect };
        });
        
        if (allCorrect && correctSelections === patternCount) {
             setGameState('won');
        }

        setCards(newCards);

        if (!allCorrect) {
            setTimeout(() => {
                setCards(prev => prev.map(c => ({...c, isIncorrect: false})))
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
             <p className="text-muted-foreground text-center h-10">
                {gameState === 'intro' && `Memorize the pattern. It will disappear in 3 seconds...`}
                {gameState === 'playing' && `Select the tiles that were part of the pattern.`}
                {gameState === 'won' && `Congratulations! You found the pattern.`}
            </p>
            <div className="grid grid-cols-4 gap-2">
                {cards.map(card => (
                    <button
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        disabled={gameState !== 'playing'}
                        className={cn(
                            "w-16 h-16 rounded-md transition-all",
                            "border-2",
                            card.isCorrect ? "bg-green-500 border-green-700" :
                            card.isIncorrect ? "bg-red-500 border-red-700" :
                            card.isSelected ? "bg-primary/50 border-primary" :
                            (isRevealed && card.isPattern) ? "bg-accent" : "bg-muted hover:bg-muted/80"
                        )}
                    />
                ))}
            </div>
            <div className="flex gap-4 mt-4">
                <Button onClick={resetGame} variant="outline"><RefreshCw className="mr-2"/>New Game</Button>
                {gameState === 'playing' && <Button onClick={checkPattern}>Check Answer</Button>}
                 {gameState === 'won' && <Button onClick={resetGame}>Play Again</Button>}
            </div>
        </div>
    )
}

const BreathingExercise = () => {
    const [text, setText] = useState('Get ready...');
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        const cycle = () => {
            setText('Breathe in...');
            setAnimationClass('animate-expand');
            setTimeout(() => {
                setText('Hold...');
                setAnimationClass('animate-expand'); // Keep it expanded
            }, 4000);
            setTimeout(() => {
                setText('Breathe out...');
                setAnimationClass('animate-shrink');
            }, 7000);
        };
        const interval = setInterval(cycle, 12000);
        cycle(); // Start immediately
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-80 gap-8">
            <style jsx>{`
                .animate-expand {
                    animation: expand 4s ease-in-out forwards;
                }
                .animate-shrink {
                    animation: shrink 5s ease-in-out forwards;
                }
                @keyframes expand {
                    from { transform: scale(0.5); }
                    to { transform: scale(1); }
                }
                @keyframes shrink {
                    from { transform: scale(1); }
                    to { transform: scale(0.5); }
                }
            `}</style>
            <div className={cn("w-48 h-48 rounded-full bg-blue-300/50 flex items-center justify-center transition-transform duration-1000", animationClass)}>
                <p className="text-xl font-semibold text-blue-800">{text}</p>
            </div>
            <p className="text-muted-foreground">Follow the on-screen instructions.</p>
        </div>
    );
};

const MindfulPuzzleGame = () => {
    const gridSize = 3;
    const [imageUrl, setImageUrl] = useState("https://picsum.photos/seed/puzzle-nature/300/300");

    const shuffle = (array: number[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const [tiles, setTiles] = useState(() => shuffle([...Array(gridSize * gridSize).keys()]));
    const [selectedTile, setSelectedTile] = useState<number | null>(null);
    const [isWon, setIsWon] = useState(false);
    
    const resetGame = useCallback(() => {
        const newSeed = Math.floor(Math.random() * 1000);
        setImageUrl(`https://picsum.photos/seed/puzzle-${newSeed}/300/300`);
        setTiles(shuffle([...Array(gridSize * gridSize).keys()]));
        setIsWon(false);
        setSelectedTile(null);
    }, []);

    useEffect(() => {
        const checkWin = tiles.every((tile, index) => tile === index);
        if (checkWin) setIsWon(true);
    }, [tiles]);

    const handleTileClick = (index: number) => {
        if (isWon) return;

        if (selectedTile === null) {
            setSelectedTile(index);
        } else {
            const newTiles = [...tiles];
            [newTiles[selectedTile], newTiles[index]] = [newTiles[index], newTiles[selectedTile]];
            setTiles(newTiles);
            setSelectedTile(null);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
             <p className="text-muted-foreground text-center h-10">
                {isWon ? "Congratulations! You solved the puzzle." : "Click two tiles to swap them. Rearrange to form the original image."}
            </p>
            <div className="relative w-[300px] h-[300px]">
                <div className="grid grid-cols-3 w-full h-full gap-1">
                    {tiles.map((tile, index) => {
                        const row = Math.floor(tile / gridSize);
                        const col = tile % gridSize;
                        return (
                            <button
                                key={index}
                                onClick={() => handleTileClick(index)}
                                className={cn("w-[98px] h-[98px] bg-cover bg-no-repeat transition-all duration-300 rounded-md outline-none focus:ring-2 focus:ring-primary", selectedTile === index && "ring-2 ring-primary scale-95")}
                                style={{
                                    backgroundImage: `url(${imageUrl})`,
                                    backgroundPosition: `-${col * 100}px -${row * 100}px`,
                                    backgroundSize: '300px 300px'
                                }}
                            />
                        );
                    })}
                </div>
            </div>
             <div className="flex gap-4 mt-4">
                <Button onClick={resetGame} variant="outline"><RefreshCw className="mr-2"/>Reset Game</Button>
            </div>
        </div>
    );
};

const ZenGarden = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [tool, setTool] = useState<'rake' | 'rock' | 'clear'>('rake');
    const [rocks, setRocks] = useState<{x: number, y: number, size: number}[]>([]);

    const draw = useCallback(() => {
         const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Sand background
        ctx.fillStyle = '#f0e5d1';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Sand pattern
        ctx.strokeStyle = '#d3c5b4';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 5) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }

        // Draw rocks
        rocks.forEach(rock => {
             ctx.beginPath();
             ctx.arc(rock.x, rock.y, rock.size, 0, Math.PI * 2);
             ctx.fillStyle = '#a9a9a9';
             ctx.fill();
             ctx.strokeStyle = '#808080';
             ctx.stroke();
        })
    }, [rocks]);

    useEffect(() => {
        draw();
    }, [draw]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (tool === 'rock') {
            setRocks([...rocks, { x, y, size: Math.random() * 15 + 10 }]);
        }
    };
    
     const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (tool !== 'rake') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);

        const onMouseMove = (moveEvent: MouseEvent) => {
            const moveX = moveEvent.clientX - rect.left;
            const moveY = moveEvent.clientY - rect.top;
            ctx.lineTo(moveX, moveY);
            ctx.strokeStyle = '#c0b2a0';
            ctx.lineWidth = 5;
            ctx.stroke();
        };

        const onMouseUp = () => {
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mouseup', onMouseUp);
        };
        
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseup', onMouseUp);
    };

    const clearGarden = () => {
        setRocks([]);
        draw();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground">Create your own peaceful space. Select a tool and interact with the garden.</p>
            <div className="flex gap-2">
                <Button variant={tool === 'rake' ? 'default' : 'outline'} onClick={() => setTool('rake')}><Hand className="mr-2"/>Rake</Button>
                <Button variant={tool === 'rock' ? 'default' : 'outline'} onClick={() => setTool('rock')}><Gem className="mr-2"/>Place Rock</Button>
                <Button variant="destructive" onClick={clearGarden}><X className="mr-2"/>Clear Garden</Button>
            </div>
            <canvas
                ref={canvasRef}
                width="500"
                height="300"
                className="rounded-lg border-2 border-amber-800 cursor-crosshair bg-[#f0e5d1]"
                onClick={handleCanvasClick}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

const plantTypes = [
    { name: 'Snake Plant', water: 'Low', sun: 'Indirect' },
    { name: 'Succulent', water: 'Low', sun: 'Direct' },
    { name: 'Spider Plant', water: 'Medium', sun: 'Indirect' },
    { name: 'Pothos', water: 'Medium', sun: 'Indirect' },
    { name: 'Mint', water: 'High', sun: 'Direct' },
    { name: 'Basil', water: 'High', sun: 'Direct' },
];
const plantGuideCarouselItems = [
    { name: 'Snake Plant', description: 'Extremely hardy and great for beginners. Purifies the air.', imageHint: 'snake plant' },
    { name: 'Pothos', description: 'A forgiving and fast-growing vine. Thrives in various light conditions.', imageHint: 'pothos plant' },
    { name: 'Succulent', description: 'Loves sun and requires minimal watering. Comes in many shapes.', imageHint: 'succulent plant' },
    { name: 'Spider Plant', description: 'Produces "spiderettes" that can be repotted. Very easy to care for.', imageHint: 'spider plant' },
    { name: 'Mint', description: 'Aromatic and fast-growing. Great for teas and cooking.', imageHint: 'mint plant' },
]

type Plant = { id: number, name: string, type: string, water: string, sun: string };

const VirtualGreenhouse = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [isAddPlantOpen, setAddPlantOpen] = useState(false);

    const handleAddPlant = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('plantName') as string;
        const type = formData.get('plantType') as string;
        if (name && type) {
            const plantInfo = plantTypes.find(p => p.name === type);
            if (plantInfo) {
                setPlants([...plants, { id: Date.now(), name, type, ...plantInfo }]);
                setAddPlantOpen(false);
            }
        }
    };

    const handleDeletePlant = (id: number) => {
        setPlants(plants.filter(p => p.id !== id));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sprout className="w-6 h-6 text-primary"/>My Virtual Greenhouse</CardTitle>
                <CardDescription>Connect with nature by cultivating your own digital (or real) garden.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="my-plants">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="my-plants">My Plants</TabsTrigger>
                        <TabsTrigger value="guide">Planting Guide</TabsTrigger>
                        <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-plants" className="mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Your Plant Collection</h3>
                            <Dialog open={isAddPlantOpen} onOpenChange={setAddPlantOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm"><Plus className="mr-2" /> Add Plant</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add a New Plant</DialogTitle>
                                        <DialogDescription>Give your new plant a name and select its type.</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleAddPlant} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="plantName">Plant Name</Label>
                                            <Input id="plantName" name="plantName" placeholder="e.g., Sunny" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="plantType">Plant Type</Label>
                                            <Select name="plantType" required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {plantTypes.map(type => <SelectItem key={type.name} value={type.name}>{type.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Add to Greenhouse</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {plants.length > 0 ? (
                             <div className="grid md:grid-cols-2 gap-4">
                                {plants.map(plant => (
                                    <Card key={plant.id}>
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Image src={`https://picsum.photos/seed/${plant.type}/100/100`} alt={plant.type} data-ai-hint="potted plant" width={60} height={60} className="rounded-md" />
                                                <div>
                                                    <p className="font-bold">{plant.name}</p>
                                                    <p className="text-sm text-muted-foreground">{plant.type}</p>
                                                </div>
                                            </div>
                                             <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => handleDeletePlant(plant.id)} className="text-destructive">
                                                        <Trash2 className="mr-2"/> Remove
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="flex justify-around text-center">
                                                <div>
                                                    <Sun className="mx-auto text-yellow-500"/>
                                                    <p className="text-xs font-bold">{plant.sun}</p>
                                                    <p className="text-xs text-muted-foreground">Sunlight</p>
                                                </div>
                                                <div>
                                                    <Droplets className="mx-auto text-blue-500"/>
                                                    <p className="text-xs font-bold">{plant.water}</p>
                                                    <p className="text-xs text-muted-foreground">Water</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="outline" className="w-full"><Droplets className="mr-2" /> Water Plant</Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 border-dashed border-2 rounded-lg">
                                <p className="text-muted-foreground">Your greenhouse is empty.</p>
                                <p className="text-sm text-muted-foreground">Click "Add Plant" to get started!</p>
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="guide" className="mt-4 space-y-6">
                        <div>
                             <h4 className="font-semibold mb-2">Beginner Plant Carousel</h4>
                             <Carousel className="w-full max-w-lg mx-auto">
                                <CarouselContent>
                                    {plantGuideCarouselItems.map((item, index) => (
                                    <CarouselItem key={index}>
                                        <Card>
                                            <CardHeader className="flex-row gap-4 items-center">
                                                 <Image src={`https://picsum.photos/seed/${item.imageHint}/150/150`} alt={item.name} data-ai-hint={item.imageHint} width={100} height={100} className="rounded-lg"/>
                                                <div>
                                                    <CardTitle>{item.name}</CardTitle>
                                                    <CardDescription>{item.description}</CardDescription>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                        <div className="prose prose-sm dark:prose-invert">
                            <h4 className="mt-6">Getting Started with Planting</h4>
                            <ol>
                                <li><strong>Choose Your Pot:</strong> Select a pot with drainage holes to prevent root rot.</li>
                                <li><strong>Pick Your Soil:</strong> Use a quality potting mix suitable for your chosen plant.</li>
                                <li><strong>Planting:</strong> Gently place your plant in the pot, and fill with soil, leaving a little space at the top.</li>
                                <li><strong>Watering:</strong> Water thoroughly after planting. Let the soil dry out slightly between waterings.</li>
                                <li><strong>Sunlight:</strong> Place your plant in a spot with the right amount of light for its needs (check the plant's tag!).</li>
                            </ol>
                        </div>
                    </TabsContent>
                    <TabsContent value="benefits" className="mt-4 prose prose-sm dark:prose-invert">
                         <h4>The Benefits of Planting</h4>
                         <ul>
                            <li>Reduces stress and promotes relaxation.</li>
                            <li>Improves air quality in your home.</li>
                            <li>Provides a sense of accomplishment.</li>
                            <li>Encourages mindfulness and patience.</li>
                        </ul>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}


export default function LifestylePage() {
  const [selectedMood, setSelectedMood] = useState<Mood>('Stressed');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const getImageForExercise = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  }

  const gameComponents = {
      "Pattern Matching": <PatternMatchingGame />,
      "Breathing Exercise": <BreathingExercise />,
      "Mindful Puzzle": <MindfulPuzzleGame />,
      "Zen Garden": <ZenGarden />,
  }
  
  type GameName = keyof typeof gameComponents;

  const games: { name: GameName, icon: React.ReactNode }[] = [
    { name: "Pattern Matching", icon: <Brain /> },
    { name: "Breathing Exercise", icon: <Waves /> },
    { name: "Mindful Puzzle", icon: <Sun /> },
    { name: "Zen Garden", icon: <Flower /> },
  ]


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/student-login" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Lifestyle & Wellness
        </h1>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
          <HealthStatCard icon={<Bed className="w-6 h-6 text-blue-500" />} title="Sleep" value={6} goal={8} unit="hrs" color="bg-blue-500" />
          <HealthStatCard icon={<Footprints className="w-6 h-6 text-green-500" />} title="Steps" value={4503} goal={10000} unit="steps" color="bg-green-500" />
          <HealthStatCard icon={<HeartPulse className="w-6 h-6 text-red-500" />} title="Heart Rate" value={72} goal={60} unit="bpm" color="bg-red-500" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Brain className="w-6 h-6 text-primary"/>Mindful Games</CardTitle>
                <CardDescription>Engage in quick games to calm your mind and reduce stress.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                 {games.map(game => (
                     <Dialog key={game.name}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="h-20 flex flex-col gap-2">
                                {game.icon}
                                {game.name}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>{game.name}</DialogTitle>
                            </DialogHeader>
                            {gameComponents[game.name]}
                        </DialogContent>
                    </Dialog>
                 ))}
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette className="w-6 h-6 text-primary"/>Creative Corner</CardTitle>
                <CardDescription>Unleash your creativity with a digital drawing canvas.</CardDescription>
            </CardHeader>
            <CardContent>
                <DrawingCanvas />
            </CardContent>
        </Card>
      </div>

       <VirtualGreenhouse />

      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>
            Select a mood to get personalized exercise recommendations to help you feel better.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moods.map((mood) => (
              <Button
                key={mood.name}
                variant={selectedMood === mood.name ? 'default' : 'outline'}
                className={`h-24 flex flex-col gap-2 ${selectedMood === mood.name ? '' : mood.color}`}
                onClick={() => {
                  setSelectedMood(mood.name as Mood);
                  setActiveVideo(null);
                }}
              >
                {mood.icon}
                <span>{mood.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold font-headline my-6">
          Exercises for when you're feeling {selectedMood.toLowerCase()}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises[selectedMood].map((exercise) => {
            const image = getImageForExercise(exercise.imageId);
            const isVideoActive = activeVideo === exercise.videoUrl;
            return (
              <Card key={exercise.title}>
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    {isVideoActive ? (
                      <iframe
                          className="w-full h-full rounded-t-lg"
                          src={exercise.videoUrl}
                          title={exercise.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                      ></iframe>
                    ) : (
                      image && (
                        <div className="relative w-full h-full cursor-pointer" onClick={() => setActiveVideo(exercise.videoUrl)}>
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                data-ai-hint={image.imageHint}
                                width={600}
                                height={400}
                                className="rounded-t-lg object-cover aspect-video"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <PlayCircle className="w-16 h-16 text-white/80" />
                            </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
                <CardHeader>
                  <CardTitle className="text-lg">{exercise.title}</CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
