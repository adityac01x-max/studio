
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
  Shield,
  Siren,
  Library,
  Users,
  BookUser,
  Calendar,
} from 'lucide-react';

const adminActionGroups = [
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

export default function AdminDashboardLayout({
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
        <QuickActionBar actionGroups={adminActionGroups} />
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
