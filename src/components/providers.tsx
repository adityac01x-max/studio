
'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { UserRoleProvider } from '@/hooks/use-user-role';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserRoleProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </UserRoleProvider>
  );
}
