import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlayCircle, Headphones, BookOpen } from 'lucide-react';

const resources = [
  {
    id: 'vid1',
    title: 'Mindfulness Meditation for Beginners',
    description:
      'A 10-minute guided video to help you start your mindfulness journey.',
    type: 'Videos',
    image: PlaceHolderImages.find((img) => img.id === 'video-1'),
  },
  {
    id: 'aud1',
    title: 'Calming Ocean Sounds',
    description:
      '30 minutes of pure ocean waves to help you relax and fall asleep.',
    type: 'Audio',
    image: PlaceHolderImages.find((img) => img.id === 'audio-2'),
  },
  {
    id: 'gui1',
    title: 'Guide to Managing Stress',
    description:
      'An introductory guide with practical tips for managing daily stress.',
    type: 'Guides',
    image: PlaceHolderImages.find((img) => img.id === 'guide-1'),
  },
  {
    id: 'vid2',
    title: 'Introduction to Yoga',
    description: 'A beginner-friendly yoga session to connect mind and body.',
    type: 'Videos',
    image: PlaceHolderImages.find((img) => img.id === 'video-2'),
  },
  {
    id: 'aud2',
    title: 'Forest Ambience for Focus',
    description:
      'Enhance your concentration with the gentle sounds of a forest.',
    type: 'Audio',
    image: PlaceHolderImages.find((img) => img.id === 'audio-1'),
  },
  {
    id: 'gui2',
    title: 'The Art of Journaling',
    description:
      'Learn how journaling can be a powerful tool for self-reflection.',
    type: 'Guides',
    image: PlaceHolderImages.find((img) => img.id === 'guide-2'),
  },
];

const ResourceCard = ({ resource }: { resource: (typeof resources)[0] }) => (
  <Card className="flex flex-col">
    <CardHeader className="p-0">
      {resource.image && (
        <Image
          src={resource.image.imageUrl}
          alt={resource.image.description}
          data-ai-hint={resource.image.imageHint}
          width={600}
          height={400}
          className="rounded-t-lg object-cover aspect-video"
        />
      )}
    </CardHeader>
    <CardContent className="flex-1 pt-6">
      <CardTitle className="font-headline text-lg mb-2">
        {resource.title}
      </CardTitle>
      <CardDescription>{resource.description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button className="w-full">
        {resource.type === 'Videos' && <PlayCircle className="mr-2" />}
        {resource.type === 'Audio' && <Headphones className="mr-2" />}
        {resource.type === 'Guides' && <BookOpen className="mr-2" />}
        Access Resource
      </Button>
    </CardFooter>
  </Card>
);

export default function ResourcesPage() {
  const resourceTypes = ['All', 'Videos', 'Audio', 'Guides'];

  return (
    <div className="space-y-4">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Resource Hub
      </h1>
      <p className="text-muted-foreground">
        Explore our curated collection of psychoeducational resources to
        support your mental wellness journey.
      </p>
      <Tabs defaultValue="All" className="space-y-4">
        <TabsList>
          {resourceTypes.map((type) => (
            <TabsTrigger key={type} value={type}>
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
        {resourceTypes.map((type) => (
          <TabsContent key={type} value={type} className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources
                .filter(
                  (resource) => type === 'All' || resource.type === type
                )
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

    