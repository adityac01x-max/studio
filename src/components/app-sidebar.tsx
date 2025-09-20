
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  BookUser,
  Bot,
  Calendar,
  FileText,
  Heart,
  Home,
  Library,
  Users,
  Shield,
  LogOut,
  Siren,
  Briefcase,
  MessageSquare,
  Video,
  ClipboardList,
  FileWarning,
  Activity,
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
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
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
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/survey', label: 'Surveys', icon: FileText },
  { href: '/analysis', label: 'Mood to Content Mapping', icon: BarChart2 },
  { href: '/consultation', label: 'Consultation', icon: Users },
  { href: '/resources', label: 'Resource Hub', icon: Library },
  { href: '/schedule', label: 'My Schedule', icon: Calendar },
  { href: '/chat', label: 'AI First-Aid', icon: Bot },
  { href: '/progress', label: 'Health Report', icon: Activity },
  { href: '/projective-tests', label: 'Projective Tests', icon: FileWarning },
];

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield },
  { href: '/admin/sos', label: 'SOS & High-Risk', icon: Siren },
  { href: '/admin/resources', label: 'Manage Resources', icon: Library },
  { href: '/admin/peers', label: 'Manage Peers', icon: Users },
  { href: '/admin/counselors', label: 'Manage Counselors', icon: BookUser },
  { href: '/admin/schedule', label: 'Manage Schedule', icon: Calendar },
];

const professionalNavItems = [
    { href: '/professional/dashboard', label: 'Dashboard', icon: Briefcase },
    { href: '/professional/students', label: 'Students', icon: Users },
    { href: '/professional/schedule', label: 'Schedule', icon: Calendar },
    { href: '/professional/chat', label: 'Chat', icon: MessageSquare },
    { href: '/professional/video', label: 'Video Calls', icon: Video },
    { href: '/professional/questionnaires', label: 'Questionnaires', icon: ClipboardList },
]


function DiamondIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
    </svg>
  );
}

function FlameIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  
  const isAdminRoute = pathname.startsWith('/admin');
  const isProfessionalRoute = pathname.startsWith('/professional');

  const studentNavItems = [
    ...navItems,
  ]

  const currentNavItems = isAdminRoute ? adminNavItems : isProfessionalRoute ? professionalNavItems : studentNavItems;
  const currentUser = isAdminRoute
    ? { name: 'Admin User', email: 'admin@college.ac.in', avatarSeed: 'admin' }
    : isProfessionalRoute
    ? { name: 'Dr. Sharma', email: 's.sharma@college.ac.in', avatarSeed: 'psychologist' }
    : { name: 'Student User', email: 'student@college.ac.in', avatarSeed: 'user' };
  
  const homeLink = isAdminRoute ? '/admin/dashboard' : isProfessionalRoute ? '/professional/dashboard' : '/dashboard';


  return (
    <>
      <SidebarHeader className="flex items-center justify-between p-2">
        <Link
          href={homeLink}
          className="flex items-center gap-2 p-2 font-headline font-bold text-lg"
        >
          <div className="p-1.5 rounded-md bg-primary text-primary-foreground">
            <Heart className="w-5 h-5" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden">Anubhuti</span>
        </Link>
        <div className="group-data-[collapsible=icon]:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {currentNavItems.map((item) => (
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
        {!isAdminRoute && !isProfessionalRoute && (
            <>
        <SidebarGroup
          className={
            isCollapsed
              ? 'p-0'
              : 'p-2 border-t border-sidebar-border mx-2'
          }
        >
          <SidebarGroupLabel className={isCollapsed ? 'hidden' : 'px-0'}>
            My Stats
          </SidebarGroupLabel>

          <div
            className={`flex ${
              isCollapsed ? 'flex-col items-center gap-2' : 'gap-4'
            }`}
          >
            <div
              className={`flex items-center gap-2 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <DiamondIcon
                className={`text-primary ${isCollapsed ? 'w-5 h-5' : 'w-6 h-6'}`}
              />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-bold text-sm">30</span>
                  <span className="text-xs text-muted-foreground">Points</span>
                </div>
              )}
            </div>
            <div
              className={`flex items-center gap-2 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <FlameIcon
                className={`text-primary ${isCollapsed ? 'w-5 h-5' : 'w-6 h-6'}`}
              />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-bold text-sm">1</span>
                  <span className="text-xs text-muted-foreground">Day Streak</span>
                </div>
              )}
            </div>
          </div>
        </SidebarGroup>
         <SidebarSeparator
          className={isCollapsed ? 'hidden' : 'block my-0'}
        />
        </>
        )}


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
                  <AvatarImage src={`https://picsum.photos/seed/${currentUser.avatarSeed}/100/100`} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="text-left">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {currentUser.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                    <BookUser className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
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
