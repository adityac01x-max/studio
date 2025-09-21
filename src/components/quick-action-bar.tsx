
'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Bot,
  Grip,
  LucideIcon,
  FileText,
  BarChart2,
  FileWarning,
  Activity,
  Trophy,
  NotebookText,
  Library,
  Users,
  Calendar,
  Shield,
  Siren,
  BookUser,
  Briefcase,
  MessageSquare,
  Video,
  ClipboardList,
  Milestone,
  Home,
  BookOpen,
  LayoutGrid,
  Gamepad2,
  Bike,
  Sprout
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ActionItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type ActionGroup = {
  title: string;
  actions: ActionItem[];
};

const studentActionGroups: ActionGroup[] = [
  {
    title: 'Core Tools',
    actions: [
      { href: '/survey', label: 'Surveys', icon: FileText },
      { href: '/analysis', label: 'Analysis', icon: BarChart2 },
      {
        href: '/projective-tests',
        label: 'Projective Tests',
        icon: FileWarning,
      },
    ],
  },
  {
    title: 'My Journey',
    actions: [
      { href: '/health-report', label: 'Health Report', icon: Activity },
      { href: '/progress', label: 'My Progress', icon: Trophy },
      { href: '/journal', label: 'My Journal', icon: NotebookText },
    ],
  },
  {
    title: 'Support',
    actions: [
      { href: '/resources', label: 'Resource Hub', icon: Library },
      { href: '/consultation', label: 'Consultation', icon: Users },
      { href: '/student-chat', label: 'My Chats', icon: MessageSquare },
      { href: '/schedule', label: 'My Schedule', icon: Calendar },
      { href: '/chat', label: 'AI First-Aid', icon: Bot },
    ],
  },
];

const adminActionGroups: ActionGroup[] = [
  {
    title: 'Management',
    actions: [
      { href: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield },
      { href: '/admin/sos', label: 'SOS & High-Risk', icon: Siren },
      { href: '/admin/resources', label: 'Manage Resources', icon: Library },
      { href: '/admin/peers', label: 'Manage Peers', icon: Users },
      { href: '/admin/counselors', label: 'Manage Counselors', icon: BookUser },
      { href: '/admin/schedule', label: 'Manage Schedule', icon: Calendar },
    ],
  },
];

const professionalActionGroups: ActionGroup[] = [
  {
    title: 'Professional Tools',
    actions: [
      { href: '/professional/dashboard', label: 'Dashboard', icon: Briefcase },
      { href: '/professional/students', label: 'Students', icon: Users },
      { href: '/professional/schedule', label: 'Schedule', icon: Calendar },
      { href: '/professional/chat', label: 'Chat', icon: MessageSquare },
      { href: '/professional/video', label: 'Video Calls', icon: Video },
      {
        href: '/professional/questionnaires',
        label: 'Questionnaires',
        icon: ClipboardList,
      },
      {
        href: '/professional/rooms',
        label: 'Community Rooms',
        icon: Milestone,
      },
    ],
  },
];

const loveAndSelfActionGroups: ActionGroup[] = [
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
      {
        href: '/love-and-self/student-chat',
        label: 'My Chats',
        icon: MessageSquare,
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

const lifestyleActionGroups: ActionGroup[] = [
    {
        title: 'Lifestyle',
        actions: [
            { href: '/lifestyle', label: 'Dashboard', icon: LayoutGrid },
            { href: '/lifestyle/activities', label: 'Activities', icon: Gamepad2 },
            { href: '/lifestyle/exercises', label: 'Exercises', icon: Bike },
            { href: '/lifestyle/greenhouse', label: 'Greenhouse', icon: Sprout },
            { href: '/lifestyle/consultation', label: 'Consultation', icon: Users },
            { href: '/lifestyle/student-chat', label: 'My Chats', icon: MessageSquare },
            { href: '/lifestyle/ai-chat', label: 'AI First-Aid', icon: Bot },
        ],
    },
];


export function QuickActionBar() {
  const pathname = usePathname();

  let actionGroups: ActionGroup[] = studentActionGroups;
  if (pathname.startsWith('/admin')) {
    actionGroups = adminActionGroups;
  } else if (pathname.startsWith('/professional')) {
    actionGroups = professionalActionGroups;
  } else if (pathname.startsWith('/love-and-self')) {
    actionGroups = loveAndSelfActionGroups;
  } else if (pathname.startsWith('/lifestyle')) {
    actionGroups = lifestyleActionGroups;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 flex items-center justify-center"
        >
          <Grip className="h-8 w-8" />
          <span className="sr-only">Open Quick Actions</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4 mb-2" side="top" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Quick Actions</h4>
            <p className="text-sm text-muted-foreground">
              Quickly access important features.
            </p>
          </div>
          <div className="grid gap-2">
            {actionGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground px-2">
                  {group.title}
                </p>
                {group.actions.map((action) => (
                  <Link href={action.href} key={action.href} passHref>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
