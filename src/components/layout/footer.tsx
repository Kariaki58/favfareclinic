import Link from 'next/link';
import { Logo } from './logo';
import { Button } from '../ui/button';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const footerNavs = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Twitter, label: 'Twitter' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm max-w-xs">
              Providing top-tier dental care with a gentle touch and modern technology. Your smile is our priority.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerNavs.map((nav) => (
                <li key={nav.label}>
                  <Link
                    href={nav.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {nav.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>123 Dental St, Smileville, CA 90210</p>
              <p>Email: <a href="mailto:contact@precisiondental.com" className="hover:text-primary">contact@precisiondental.com</a></p>
              <p>Phone: <a href="tel:123-456-7890" className="hover:text-primary">(123) 456-7890</a></p>
            </div>
          </div>
          
           {/* Socials & CTA */}
           <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
             <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="ghost" size="icon" asChild>
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  </a>
                </Button>
              ))}
            </div>
            <Button asChild>
                <Link href="/book-appointment">Book an Appointment</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Precision Dental. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
