
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'student' | 'peer';

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRoleState] = useState<UserRole>('student');

  useEffect(() => {
    // Load role from localStorage on initial load
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole && (savedRole === 'student' || savedRole === 'peer')) {
      setUserRoleState(savedRole);
    }
  }, []);

  const setUserRole = (role: UserRole) => {
    // Save role to localStorage and update state
    localStorage.setItem('userRole', role);
    setUserRoleState(role);
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
