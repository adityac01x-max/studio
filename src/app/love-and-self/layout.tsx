
import { LoveAndSelfSidebar } from './sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollArea } from '@/components/ui/scroll-area';
import './theme.css';
import { QuickActionBar } from '@/components/quick-action-bar';
import {
  Home,
  ClipboardList,
  BarChart2,
  Trophy,
  Calendar,
  NotebookText,
  Library,
  BookOpen,
  Users,
  Bot,
  Milestone,
} from 'lucide-react';

const loveAndSelfActionGroups = [
  {
    title: 'Core Tools',
    actions: [
      { href: '/love-and-self', label: 'Dashboard', icon: Home },
      {
        href: '/love-and-self/questionnaires',
        label: 'Questionnaires',
        icon: ClipboardList,
      },
      {
        href: '/love-and-self/mood-mapping',
        label: 'Mood Mapping',
        icon: BarChart2,
      },
    ],
  },
  {
    title: 'My Journey',
    actions: [
      { href: '/love-and-self/progress', label: 'My Progress', icon: Trophy },
      {
        href: '/love-and-self/schedule',
        label: 'My Schedule',
        icon: Calendar,
      },
      { href: '/journal', label: 'My Journal', icon: NotebookText },
    ],
  },
  {
    title: 'Support',
    actions: [
      { href: '/love-and-self/resources', label: 'Resource Hub', icon: Library },
      {
        href: '/love-and-self/education',
        label: 'Education Center',
        icon: BookOpen,
      },
      {
        href: '/love-and-self/consultation',
        label: 'Consultation',
        icon: Users,
      },
      { href: '/love-and-self/ai-chat', label: 'AI First-Aid', icon: Bot },
      {
        href: '/love-and-self/be-your-own-voice',
        label: 'Be Your Own Voice',
        icon: Milestone,
      },
    ],
  },
];


export default function LoveAndSelfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="love-and-self-theme">
      <SidebarProvider>
        <Sidebar>
          <LoveAndSelfSidebar />
        </Sidebar>
        <SidebarInset>
          <ScrollArea className="h-full">
            <div className="p-4 md:p-8 pt-6">{children}</div>
          </ScrollArea>
          <QuickActionBar actionGroups={loveAndSelfActionGroups} />
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </div>
  );
}
