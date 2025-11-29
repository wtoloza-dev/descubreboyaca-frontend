/**
 * Main Layout Component
 * 
 * Wrapper component that provides the standard page layout
 * with header and footer for most pages.
 * 
 * Usage:
 * <MainLayout>
 *   <YourPageContent />
 * </MainLayout>
 */

import { Header, Footer } from '@/components/organisms';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </>
  );
};

