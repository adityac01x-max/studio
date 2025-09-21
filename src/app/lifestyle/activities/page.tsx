
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Palette, Check, X, RefreshCw, Hand, Waves, Sun, Flower, Gem, Eraser, Pen, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

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

export default function ActivitiesPage() {
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
        <Link href="/lifestyle" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Lifestyle Dashboard</span>
          </Button>
        </Link>
        <div className='flex-1'>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Mindful Activities
          </h1>
          <p className="text-muted-foreground">
            Engage in games and creative exercises to calm your mind and reduce stress.
          </p>
        </div>
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
    </div>
  );
}
