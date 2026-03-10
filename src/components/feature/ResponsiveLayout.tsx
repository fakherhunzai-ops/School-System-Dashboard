import { ReactNode } from 'react';

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  return (
    <div className="ml-0 lg:ml-64 min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
