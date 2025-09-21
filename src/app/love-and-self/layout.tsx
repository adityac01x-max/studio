
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

export default function LoveAndSelfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="love-and-self-theme">
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <LoveAndSelfSidebar />
        </Sidebar>
        <SidebarInset>
          <ScrollArea className="h-full">
            <div className="p-4 md:p-8 pt-6">{children}</div>
          </ScrollArea>
        </SidebarInset>
        <Toaster />
        <QuickActionBar />
      </SidebarProvider>
    </div>
  );
}
