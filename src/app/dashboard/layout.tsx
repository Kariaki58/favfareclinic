import { Metadata } from 'next';
import { SidebarProvider } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'Dashboard | Fav Fare Clinic',
  description: 'Manage your clinic services, bookings, and more.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      {children}
    </div>
  );
}
