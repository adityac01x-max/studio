
'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { LocationProvider } from '@/hooks/use-location';
import { UserRoleProvider } from '@/hooks/use-user-role';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserRoleProvider>
      <LocationProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </LocationProvider>
    </UserRoleProvider>
  );
}
