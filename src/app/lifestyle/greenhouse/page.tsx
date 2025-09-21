
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sprout, Plus, Trash2, MoreHorizontal, Sun, Droplets, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
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
import Link from 'next/link';


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

export default function GreenhousePage() {
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
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/lifestyle" passHref>
                <Button variant="outline" size="icon">
                    <ArrowLeft />
                    <span className="sr-only">Back to Lifestyle Dashboard</span>
                </Button>
                </Link>
                <div className='flex-1'>
                    <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2"><Sprout className="w-8 h-8 text-primary"/>My Virtual Greenhouse</h1>
                    <p className="text-muted-foreground">Connect with nature by cultivating your own digital (or real) garden.</p>
                </div>
            </div>
            <Card>
                <CardContent className="pt-6">
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
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <h4 className="mt-6 font-semibold">Getting Started with Planting</h4>
                                <ol className="list-decimal list-inside space-y-2">
                                    <li><strong>Choose Your Pot:</strong> Your pot is your plant's home. Ensure it has drainage holes at the bottom to prevent water from pooling, which can cause root rot. The size should be appropriate for your plant—not too big, not too small.</li>
                                    <li><strong>Pick Your Soil:</strong> Good soil is crucial. Use a quality potting mix, as garden soil is too heavy. Different plants have different needs; for example, succulents prefer a well-draining cactus mix.</li>
                                    <li><strong>Planting:</strong> Gently remove the plant from its nursery pot. Place it in the new pot, and fill the surrounding space with soil, patting it down gently. Leave about an inch of space from the rim.</li>
                                    <li><strong>Watering:</strong> After planting, give it a good drink of water. Moving forward, the "when" and "how much" will depend on the plant. A general rule is to let the top inch of soil dry out before watering again.</li>
                                    <li><strong>Sunlight:</strong> Light is food for plants. Check your plant's tag for its preference—"direct sun," "indirect light," or "low light"—and place it in a spot that meets those needs.</li>
                                </ol>
                            </div>
                        </TabsContent>
                        <TabsContent value="benefits" className="mt-4 prose prose-sm dark:prose-invert max-w-none">
                            <h4 className="font-semibold">The Mental and Physical Benefits of Gardening</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Stress Reduction:</strong> Interacting with plants can lower cortisol levels, the body's primary stress hormone. The repetitive, gentle nature of gardening is inherently calming.</li>
                                <li><strong>Improved Air Quality:</strong> Many common houseplants are natural air purifiers. They absorb toxins and release oxygen, creating a healthier indoor environment.</li>
                                <li><strong>Sense of Accomplishment:</strong> Watching a plant grow and thrive from your care provides a powerful sense of purpose and achievement, boosting self-esteem.</li>
                                <li><strong>Mindfulness and Patience:</strong> Gardening encourages you to be present. It's a practice in patience, as growth takes time, teaching you to appreciate the slow and steady process of development.</li>
                            </ul>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
