'use client';
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';
import ProfilePage from '../profile/page';
import { QuickActionBar } from '@/components/quick-action-bar';
import {
  FileText,
  BarChart2,
  FileWarning,
  Activity,
  Trophy,
  NotebookText,
  Library,
  Users,
  Calendar,
  Bot,
} from 'lucide-react';

const studentActionGroups = [
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
      { href: '/schedule', label: 'My Schedule', icon: Calendar },
      { href: '/chat', label: 'AI First-Aid', icon: Bot },
    ],
  },
];


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isProfilePage = pathname === '/profile';

  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <ScrollArea className="h-full">
          <div className="p-4 md:p-8 pt-6">{isProfilePage ? <ProfilePage /> : children}</div>
        </ScrollArea>
        <QuickActionBar actionGroups={studentActionGroups} />
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
