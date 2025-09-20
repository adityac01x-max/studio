
'use client';
import Image from 'next/image';
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
import { PlayCircle, Headphones, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const placeholderImages = [
    { id: 'lgbtq-vid1', url: 'https://picsum.photos/seed/lgbtq-vid1/600/400', hint: 'pride flag' },
    { id: 'lgbtq-aud1', url: 'https://picsum.photos/seed/lgbtq-aud1/600/400', hint: 'podcast microphone' },
    { id: 'lgbtq-gui1', url: 'https://picsum.photos/seed/lgbtq-gui1/600/400', hint: 'open book rainbow' },
    { id: 'lgbtq-vid2', url: 'https://picsum.photos/seed/lgbtq-vid2/600/400', hint: 'protest signs' },
    { id: 'lgbtq-aud2', url: 'https://picsum.photos/seed/lgbtq-aud2/600/400', hint: 'people talking' },
    { id: 'lgbtq-gui2', url: 'https://picsum.photos/seed/lgbtq-gui2/600/400', hint: 'couple holding hands' },
];

const getImage = (id: string) => placeholderImages.find(img => img.id === id);


const resources = [
  {
    id: 'vid1',
    title: 'Understanding Gender Identity',
    description: 'A short animated video explaining the basics of gender identity.',
    type: 'Videos',
    image: getImage('lgbtq-vid1'),
  },
  {
    id: 'aud1',
    title: 'The Queer Joy Podcast',
    description: 'Listen to stories of resilience and joy from the community.',
    type: 'Audio',
    image: getImage('lgbtq-aud1'),
  },
  {
    id: 'gui1',
    title: 'Guide to Coming Out',
    description: 'A supportive guide on navigating the coming out process at your own pace.',
    type: 'Guides',
    image: getImage('lgbtq-gui1'),
  },
  {
    id: 'vid2',
    title: 'A History of Pride',
    description: 'Learn about the history of the LGBTQ+ rights movement.',
    type: 'Videos',
    image: getImage('lgbtq-vid2'),
  },
  {
    id: 'aud2',
    title: 'Chosen Family Stories',
    description: 'Heartwarming stories about the importance of chosen family.',
    type: 'Audio',
    image: getImage('lgbtq-aud2'),
  },
  {
    id: 'gui2',
    title: 'Healthy Relationships in Queer Communities',
    description: 'Tips for building and maintaining healthy relationships.',
    type: 'Guides',
    image: getImage('lgbtq-gui2'),
  },
];

const ResourceCard = ({ resource }: { resource: (typeof resources)[0] }) => (
  <Card className="flex flex-col bg-card/80 backdrop-blur-sm">
    <CardHeader className="p-0">
      {resource.image && (
        <Image
          src={resource.image.url}
          alt={resource.title}
          data-ai-hint={resource.image.hint}
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

export default function LoveAndSelfResourcesPage() {
  const resourceTypes = ['All', 'Videos', 'Audio', 'Guides'];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/love-and-self" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-white">
          Resource &amp; Education Center
        </h1>
      </div>
      <p className="text-muted-foreground text-white/80">
        Explore resources curated for and by the LGBTQIA+ community.
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
