'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookUser,
  Bot,
  CalendarDays,
  FileText,
  Home,
  Library,
} from 'lucide-react';
import { AppLogo } from './icons';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from './ui/sidebar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSidebar } from './ui/sidebar';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/survey', label: 'Survey', icon: FileText },
  { href: '/chat', label: 'AI Chat', icon: Bot },
  { href: '/resources', label: 'Resources', icon: Library },
  { href: '/booking', label: 'Booking', icon: CalendarDays },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <>
      <SidebarHeader className="flex items-center justify-between p-2">
        <Link
          href="/"
          className="flex items-center gap-2 p-2 font-headline font-bold text-lg"
        >
          <AppLogo />
          <span className="group-data-[collapsible=icon]:hidden">Anubhuti</span>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full flex ${
                isCollapsed ? 'justify-center' : 'justify-start'
              } items-center gap-2 p-2 h-auto`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="text-left">
                  <p className="text-sm font-medium">Student User</p>
                  <p className="text-xs text-muted-foreground">
                    student@university.edu
                  </p>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  Student User
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  student@university.edu
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BookUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  );
}
