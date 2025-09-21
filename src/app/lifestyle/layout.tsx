
import { LifestyleSidebar } from './sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuickActionBar } from '@/components/quick-action-bar';

export default function LifestyleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <LifestyleSidebar />
      </Sidebar>
      <SidebarInset>
        <ScrollArea className="h-full">
          <div className="p-4 md:p-8 pt-6">{children}</div>
        </ScrollArea>
        <QuickActionBar />
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
