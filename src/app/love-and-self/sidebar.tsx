
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  BookOpen,
  Bot,
  Calendar,
  Users,
  Heart,
  Home,
  MessageSquare,
  Sparkles,
  LogOut,
} from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { href: '/love-and-self', label: 'Dashboard', icon: Home },
  { href: '/love-and-self/global-chat', label: 'Global Chat', icon: MessageSquare },
  { href: '/love-and-self/interests', label: 'My Interests', icon: Sparkles },
  { href: '/love-and-self/consultation', label: 'Consultation', icon: Users },
  { href: '/love-and-self/schedule', label: 'My Schedule', icon: Calendar },
  { href: '/love-and-self/resources', label: 'Resource Center', icon: BookOpen },
  { href: '/love-and-self/ai-chat', label: 'AI First-Aid', icon: Bot },
  { href: '/love-and-self/mood-mapping', label: 'Mood Mapping', icon: BarChart2 },
];


export function LoveAndSelfSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <>
      <SidebarHeader className="flex items-center justify-between p-2">
        <Link
          href="/love-and-self"
          className="flex items-center gap-2 p-2 font-headline font-bold text-lg"
        >
          <div className="p-1.5 rounded-md bg-primary text-primary-foreground">
            <Heart className="w-5 h-5" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden">Love & Self</span>
        </Link>
        <div className="group-data-[collapsible=icon]:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: 'group-data-[collapsible=icon]:block hidden',
                  }}
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between'
          } p-2`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`flex ${
                  isCollapsed ? 'justify-center' : 'justify-start'
                } items-center gap-2 p-2 h-auto w-full`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={'https://picsum.photos/seed/lgbtq-user/100/100'} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="text-left">
                    <p className="text-sm font-medium">Community Member</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Community Member
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    student@college.ac.in
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                 <Link href="/student-login">
                  <LogOut className="mr-2 h-4 w-4" />
                  Back to Main Menu
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {!isCollapsed && <ThemeToggle />}
        </div>
      </SidebarFooter>
    </>
  );
}
