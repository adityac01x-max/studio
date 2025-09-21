
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

export default function ProfessionalDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <ScrollArea className="h-full">
          <div className="p-4 md:p-8 pt-6">{children}</div>
        </ScrollArea>
      </SidebarInset>
      <Toaster />
      <QuickActionBar />
    </SidebarProvider>
  );
}
