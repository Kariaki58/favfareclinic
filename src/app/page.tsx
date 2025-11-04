'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Smile,
  ChevronRight,
  X,
  Star,
  Award,
  Activity,
  CheckCircle,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { services, testimonials, beforeAndAfters } from '@/app/lib/data';

const serviceIcons = {
  'Teeth Whitening': <Sparkles className="h-8 w-8 text-primary" />,
  'Hollywood Teeth Whitening': <Sparkles className="h-8 w-8 text-primary" />,
  'Scaling & Polishing': <Smile className="h-8 w-8 text-primary" />,
};

const stats = [
    { value: '1,500+', label: 'Happy Patients', icon: Smile },
    { value: '15+', label: 'Years of Experience', icon: Award },
    { value: '500+', label: '5-Star Reviews', icon: Star },
    { value: '10,000+', label: 'Procedures Done', icon: Activity },
];

const whyChooseUsItems = [
    { title: 'Safe & Professional', description: 'All treatments performed by qualified professionals using certified materials and safe procedures.' },
    { title: 'Beautiful Results', description: 'We focus on aesthetic excellence and natural-looking outcomes that enhance your smile.' },
    { title: 'Affordable Pricing', description: 'Transparent, competitive pricing with no hidden costs. Quality care that fits your budget.' },
    { title: 'Confidence Boost', description: 'Transform your smile and boost your self-confidence with our cosmetic dentistry expertise.' },
];

const faqs = [
    { question: "How long does teeth whitening last?", answer: "Results typically last 6-18 months depending on your diet and oral hygiene. We recommend avoiding staining foods and drinks like coffee, tea, and red wine to maintain your bright smile longer." },
    { question: "Is the teeth whitening process safe?", answer: "Yes, our teeth whitening procedures are completely safe when performed by our professionals. We use approved materials and techniques to ensure your enamel and gums are protected throughout the process." },
    { question: "Do you offer payment plans?", answer: "We offer flexible payment options for certain procedures. Please contact us directly to discuss available payment plans that can make your treatment more affordable." },
    { question: "How soon can I get an appointment?", answer: "We typically have availability within 1-3 days. For urgent cases, we offer same-day appointments when possible. You can book online or contact us via WhatsApp for immediate assistance." },
];

// Gallery images - you can replace these with your actual clinic photos
const galleryImages = [
  { id: 'gallery-1', description: 'Teeth whitening transformation result', imageUrl: '/dental_1.jpg' },
  { id: 'gallery-2', description: 'Smile makeover before and after', imageUrl: '/dental_3.jpg' },
  { id: 'gallery-3', description: 'Cosmetic dentistry beautiful smile', imageUrl: '/dental_4.jpg' },
  { id: 'gallery-4', description: 'Professional teeth cleaning results', imageUrl: '/dental_5.jpg' },
  { id: 'gallery-5', description: 'Dental veneers transformation', imageUrl: '/dental_6.jpg' },
  { id: 'gallery-6', description: 'Teeth gap closure result', imageUrl: '/dental_7.jpg' },
  { id: 'gallery-7', description: 'Hollywood smile makeover', imageUrl: '/dental_8.jpg' },
  { id: 'gallery-8', description: 'Cosmetic dental bonding before after', imageUrl: '/dental_one.jpg' },
];

// Create a type for gallery items
type GalleryItem = {
  id: string;
  description: string;
  imageUrl: string;
};

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const whyChooseImage = PlaceHolderImages.find((img) => img.id === 'why-choose-us');
  const highlightedServices = services.slice(0, 3);
  const popularServices = services.slice(0, 4);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[80vh] min-h-[600px] text-white">
          <div className="absolute inset-0 bg-black/50 z-10" />
          {heroImage && (
            <Image
              src="/banner_image.jpg"
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="relative z-20 container mx-auto flex flex-col items-center justify-center h-full text-center px-4">
            <div className="max-w-3xl animate-fade-in space-y-4">
              <Badge variant="secondary" className="mb-4 text-sm">Premium Cosmetic Dentistry in Lagos</Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline">
                Where Confidence Begins With Your Smile
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                Safe, professional, and beautiful results. Premium cosmetic dentistry services designed to transform your smile and boost your confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg">
                  <Link href="/book-appointment">
                    Book Appointment Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/services">View Services & Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Services & Pricing Preview */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">Popular Services</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Affordable Smile Transformations
              </h2>
              <p className="mt-4 text-muted-foreground">
                Premium cosmetic dentistry services at transparent prices in Lagos
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {popularServices.map((service) => (
                <Card key={service.title} className="text-center group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{service.price}</div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-muted-foreground mb-4">{service.shortDescription}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/book-appointment">Book Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/services">View All Services & Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Trusted by Lagos Residents
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                We are proud of our commitment to excellence and patient satisfaction in cosmetic dentistry.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <stat.icon className="h-10 w-10 text-primary mb-2" />
                  <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlighted Services Section */}
        <section id="services" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Our Signature Services
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                Specialized cosmetic treatments designed to enhance your smile and boost your confidence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlightedServices.map((service) => (
                <Card key={service.title} className="group text-center hover:shadow-primary/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      {serviceIcons[service.title as keyof typeof serviceIcons]}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{service.price}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{service.shortDescription}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/book-appointment">Book This Service</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Showcase Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Smile Transformations Gallery
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                See the beautiful results we've achieved for our clients at Favfare The Clinic in Lagos.
              </p>
            </div>
            
            {/* 8 Image Grid - FIXED LAYOUT */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {galleryImages.map((galleryItem) => (
                <button
                  key={galleryItem.id}
                  onClick={() => setSelectedImage(galleryItem)}
                  className="relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-transform hover:scale-105"
                >
                  <Image
                    src={galleryItem.imageUrl}
                    alt={galleryItem.description}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                </button>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <a 
                  href="https://www.tiktok.com/@favfare" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span>View More Transformations on TikTok</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Why Choose Favfare The Clinic?</h2>
                        <ul className="space-y-6">
                           {whyChooseUsItems.map((item, index) => (
                             <li key={index} className="flex items-start">
                               <div className="flex-shrink-0">
                                 <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1" />
                               </div>
                               <div>
                                 <h3 className="text-lg font-semibold">{item.title}</h3>
                                 <p className="text-muted-foreground">{item.description}</p>
                               </div>
                             </li>
                           ))}
                        </ul>
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                        {whyChooseImage && (
                            <Image
                                src="/dentist_owner.jpeg"
                                alt={whyChooseImage.description}
                                fill
                                className="object-cover"
                                data-ai-hint={whyChooseImage.imageHint}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                What Our Patients Say
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                Hear from satisfied clients who have transformed their smiles with us in Lagos.
              </p>
            </div>
            <div className="relative">
              <Carousel
                opts={{ align: 'start', loop: true }}
                className="w-full max-w-4xl mx-auto"
              >
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <Card className="h-full">
                          <CardContent className="pt-6 flex flex-col items-center text-center">
                            <div className="flex mb-4">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-muted-foreground mb-4">
                              "{testimonial.quote}"
                            </p>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.location}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-muted-foreground">
                        Have questions about our cosmetic dentistry services? Here are some common queries.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                       {faqs.map((faq, index) => (
                         <AccordionItem key={index} value={`item-${index}`}>
                           <AccordionTrigger className="text-base md:text-lg text-left">{faq.question}</AccordionTrigger>
                           <AccordionContent className="text-muted-foreground">
                             {faq.answer}
                           </AccordionContent>
                         </AccordionItem>
                       ))}
                    </Accordion>
                </div>
                 <div className="text-center mt-12">
                    <p className="text-muted-foreground">
                        Have more questions?
                        <Button variant="link" asChild>
                           <Link href="/contact">Contact Us</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </section>

        {/* WhatsApp Quick Connect */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold font-headline mb-4">
                Questions? Chat with Us!
              </h3>
              <p className="text-muted-foreground mb-6">
                Get quick answers about our services, pricing, or availability directly on WhatsApp. We're here to help you achieve your perfect smile.
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href="https://wa.me/2349169438645" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Image Modal with Better Close Button */}
        <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
            {selectedImage && (
                <DialogContent className="max-w-none w-screen h-screen p-0 border-0 bg-black/95 flex items-center justify-center">
                    <DialogClose className="absolute top-4 right-4 z-50 rounded-full bg-white/20 p-3 text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black md:top-6 md:right-6">
                        <X className="h-6 w-6 md:h-8 md:w-8" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                    <div className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center p-4">
                        <Image 
                            src={selectedImage.imageUrl} 
                            alt={selectedImage.description} 
                            fill
                            className="object-contain"
                        />
                    </div>
                </DialogContent>
            )}
        </Dialog>

      </main>
    </div>
  );
}