'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500',
        isScrolled ? 'bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b border-white/20 shadow-sm py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between bg-white/40 dark:bg-card/40 backdrop-blur-md rounded-full px-4 md:px-6 py-2 md:py-3 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <Link href="/" className="flex items-center gap-2">
            <Logo className={cn(isScrolled || pathname !== '/' ? 'text-primary' : 'text-primary')} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:text-primary relative group',
                  pathname === link.href ? 'text-primary' : (isScrolled || pathname !== '/') ? 'text-foreground' : 'text-foreground/90'
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300",
                  pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <Button asChild className="hidden md:flex rounded-full px-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <Link href="/book-appointment">Book Appointment</Link>
            </Button>
            
            {/* Mobile Navigation Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/50 hover:bg-white/80">
                  <Menu className={cn((isScrolled || pathname !== '/') ? 'text-foreground' : 'text-foreground')} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r-0 rounded-r-3xl">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="border-b pb-6 pt-2">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                      <Logo className="text-primary"/>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-6 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'text-xl font-headline transition-colors hover:text-primary hover:translate-x-2 duration-300',
                          pathname === link.href ? 'text-primary font-bold' : 'text-foreground'
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <Button asChild className="mt-auto rounded-full h-14 text-lg mb-6 shadow-xl" size="lg">
                    <Link href="/book-appointment" onClick={() => setIsMobileMenuOpen(false)}>Book Appointment</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
