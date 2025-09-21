
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

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isProfilePage = pathname === '/profile';

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <ScrollArea className="h-full">
          <div className="p-4 md:p-8 pt-6">{isProfilePage ? <ProfilePage /> : children}</div>
        </ScrollArea>
      </SidebarInset>
      <Toaster />
      <QuickActionBar />
    </SidebarProvider>
  );
}
