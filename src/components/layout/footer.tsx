import Link from 'next/link';
import { Logo } from './logo';
import { Button } from '../ui/button';
import { Instagram, MessageCircle, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const footerNavs = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services & Pricing' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/favfareclinic?igsh=bDQ3ZW5iNzVwM25x', icon: Instagram, label: 'Instagram' },
  { href: 'http://wa.me/2349169438645', icon: MessageSquare, label: 'WhatsApp' },
  { href: 'https://www.tiktok.com/@favfare', icon: TikTokIcon, label: 'TikTok' },
];

export function Footer() {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Logo and About */}
          <div className="md:col-span-4 space-y-6">
            <Logo />
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Premium cosmetic dentistry in Lagos. Safe, professional, and beautiful results that boost your confidence.
            </p>
            <div className="flex items-start space-x-3 text-sm text-muted-foreground bg-white/50 dark:bg-card/50 p-4 rounded-2xl border border-white/60">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="leading-relaxed">The Grenadines Homes, Lekki-Ajah<br/>
              Cardinal Anthony Olubunmi Okogie Road, Lekki</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="font-headline font-semibold text-foreground text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {footerNavs.map((nav) => (
                <li key={nav.label}>
                  <Link
                    href={nav.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-primary opacity-0 group-hover:opacity-100">-</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{nav.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3">
            <h3 className="font-headline font-semibold text-foreground text-lg mb-6">Contact Info</h3>
            <div className="space-y-4 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-3 hover:text-primary transition-colors">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+2349169438645">+234 916 943 8645</a>
              </div>
              <div className="flex items-center gap-3 hover:text-primary transition-colors">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:Favfareclinic@gmail.com">Favfareclinic@gmail.com</a>
              </div>
               <div className="flex items-center gap-3 hover:text-primary transition-colors">
                <div className="p-2 bg-green-100 rounded-full text-green-600">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <a 
                  href="https://wa.me/2349169438645" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  WhatsApp Available
                </a>
              </div>
            </div>
          </div>
          
          {/* Socials & CTA */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="font-headline font-semibold text-foreground text-lg mb-6">Follow Us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Button key={social.label} variant="outline" size="icon" asChild className="h-10 w-10 rounded-full border-primary/20 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:-translate-y-1">
                    <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3 pt-2">
              <Button asChild className="w-full rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <Link href="/book-appointment">Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-sm text-muted-foreground font-medium">
              &copy; {new Date().getFullYear()} Favfare The Clinic - Lagos. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium bg-white/50 dark:bg-card/50 px-4 py-1.5 rounded-full border border-white/60">
              <span className="text-primary">Premium Cosmetic Dentistry</span>
              <span className="text-border">•</span>
              <span>Safe & Professional</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}