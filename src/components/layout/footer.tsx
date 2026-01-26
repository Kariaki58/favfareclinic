import Link from 'next/link';
import { Logo } from './logo';
import { Button } from '../ui/button';
import { Instagram, MessageCircle, MapPin, Phone, Mail, Music } from 'lucide-react';

const footerNavs = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services & Pricing' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/favfareclinic?igsh=bDQ3ZW5iNzVwM25x', icon: Instagram, label: 'Instagram' },
  { href: 'http://wa.me/2349169438645', icon: MessageCircle, label: 'WhatsApp' },
  { href: 'https://www.tiktok.com/@favfare', icon: Music, label: 'TikTok' },
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
              Premium cosmetic dentistry in Lagos. Safe, professional, and beautiful results that boost your confidence.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>The Grenadines Homes, Lekki-Ajah
            Cardinal Anthony Olubunmi Okogie Road, Lekki</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
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
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+2349169438645" className="hover:text-primary transition-colors">
                  +234 916 943 8645
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:Favfareclinic@gmail.com" className="hover:text-primary transition-colors">
                  Favfareclinic@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a 
                  href="https://wa.me/2349169438645" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp Available
                </a>
              </div>
            </div>
          </div>
          
          {/* Socials & CTA */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Button key={social.label} variant="ghost" size="icon" asChild className="h-9 w-9">
                    <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/book-appointment">Book Appointment</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href="https://wa.me/2349169438645" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Favfare The Clinic - Lagos. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Premium Cosmetic Dentistry</span>
              <span>•</span>
              <span>Safe & Professional</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}