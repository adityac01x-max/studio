'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bot, Grip, LucideIcon } from 'lucide-react';
import Link from 'next/link';

type ActionItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type ActionGroup = {
  title: string;
  actions: ActionItem[];
};

interface QuickActionBarProps {
  actionGroups: ActionGroup[];
}

export function QuickActionBar({ actionGroups }: QuickActionBarProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 flex items-center justify-center"
        >
          <Grip className="h-8 w-8" />
          <span className="sr-only">Open Quick Actions</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4 mb-2" side="top" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Quick Actions</h4>
            <p className="text-sm text-muted-foreground">
              Quickly access important features.
            </p>
          </div>
          <div className="grid gap-2">
            {actionGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground px-2">
                  {group.title}
                </p>
                {group.actions.map((action) => (
                  <Link href={action.href} key={action.href} passHref>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
