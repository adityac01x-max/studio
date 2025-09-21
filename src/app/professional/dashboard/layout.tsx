
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarContent,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuickActionBar } from '@/components/quick-action-bar';
import {
  Briefcase,
  Users,
  Calendar,
  MessageSquare,
  Video,
  ClipboardList,
  Milestone,
} from 'lucide-react';

const professionalActionGroups = [
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

export default function ProfessionalDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <ScrollArea className="h-full">
          <div className="p-4 md:p-8 pt-6">{children}</div>
        </ScrollArea>
        <QuickActionBar actionGroups={professionalActionGroups} />
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
