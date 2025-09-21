
import { LifestyleSidebar } from './sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuickActionBar } from '@/components/quick-action-bar';
import { LayoutGrid, Gamepad2, Bike, Sprout } from 'lucide-react';

const lifestyleActionGroups = [
  {
    title: 'Lifestyle',
    actions: [
      { href: '/lifestyle', label: 'Dashboard', icon: LayoutGrid },
      {
        href: '/lifestyle/activities',
        label: 'Activities',
        icon: Gamepad2,
      },
      { href: '/lifestyle/exercises', label: 'Exercises', icon: Bike },
      { href: '/lifestyle/greenhouse', label: 'Greenhouse', icon: Sprout },
    ],
  },
];

export default function LifestyleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <LifestyleSidebar />
      </Sidebar>
      <SidebarInset>
        <ScrollArea className="h-full">
          <div className="p-4 md:p-8 pt-6">{children}</div>
        </ScrollArea>
        <QuickActionBar actionGroups={lifestyleActionGroups} />
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
