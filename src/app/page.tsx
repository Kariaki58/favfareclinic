'use client';

export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
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
    { value: '5+', label: 'Years of Experience', icon: Award },
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

const galleryImages = [
  { id: 'gallery-1', description: 'Teeth whitening transformation result', imageUrl: '/slime_3.jpeg' },
  { id: 'gallery-2', description: 'Smile makeover before and after', imageUrl: '/dental_3.jpg' },
  { id: 'gallery-3', description: 'Cosmetic dentistry beautiful smile', imageUrl: '/dental_4.jpg' },
  { id: 'gallery-4', description: 'Professional teeth cleaning results', imageUrl: '/dental_5.jpg' },
  { id: 'gallery-5', description: 'Dental veneers transformation', imageUrl: '/slime_image.jpg' },
  { id: 'gallery-6', description: 'Teeth gap closure result', imageUrl: '/dental_7.jpg' },
  { id: 'gallery-7', description: 'Hollywood smile makeover', imageUrl: '/images.jpeg' },
  { id: 'gallery-8', description: 'Cosmetic dental bonding before after', imageUrl: '/dentist_19.jpg' },
];

// Create a type for gallery items
type GalleryItem = {
  id: string;
  description: string;
  imageUrl: string;
};

export default function Home() {
  const supabase = createClient();
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [dbGallery, setDbGallery] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const [{ data: servicesData }, { data: galleryData }] = await Promise.all([
        supabase.from('services').select('*'),
        supabase.from('gallery_images').select('*')
      ]);
      if (servicesData) setDbServices(servicesData);
      if (galleryData) setDbGallery(galleryData);
    };
    fetchData();
  }, [supabase]);

  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const whyChooseImage = PlaceHolderImages.find((img) => img.id === 'why-choose-us');
  
  // Use DB services if available, otherwise fallback to static data
  const allServices = dbServices.length > 0 ? dbServices : services;
  const highlightedServices = allServices.slice(0, 3);
  const popularServices = allServices.slice(0, 4);
  
  // Combine static and DB gallery images
  const allGalleryImages = [
    ...dbGallery.map(img => ({ id: img.id, description: img.description || 'Transformation', imageUrl: img.url })),
    ...galleryImages
  ];

  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[85vh] min-h-[600px] text-foreground overflow-hidden bg-background">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="absolute inset-0 z-10 flex flex-col md:flex-row container mx-auto px-4 h-full">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center h-full z-20 pt-20 md:pt-0 pr-0 md:pr-10 relative">
              <div className="max-w-2xl animate-fade-up space-y-6">
                <Badge variant="outline" className="mb-2 text-xs md:text-sm px-4 py-1.5 border-primary/30 bg-primary/5 text-primary shadow-sm rounded-full animate-scale-in">
                  Premium Cosmetic Dentistry in Lagos
                </Badge>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-headline text-foreground leading-[1.1]">
                  Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 animate-gradient-x">Confidence</span><br/> Begins With Your Smile
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground animate-fade-up delay-200">
                  Safe, professional, and beautiful results. Premium cosmetic dentistry services designed to transform your smile and boost your confidence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-up delay-300">
                  <Button asChild size="lg" className="h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
                    <Link href="/book-appointment">
                      Book Appointment Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full border-2 hover:bg-secondary/50 transition-all duration-300">
                    <Link href="/services">View Services & Pricing</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Image/Graphic */}
            <div className="flex-1 hidden md:flex items-center justify-center relative h-full z-10 animate-fade-in delay-300">
               <div className="relative w-[90%] h-[80%] rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border-[8px] border-white/50 backdrop-blur-sm animate-float-slow">
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
                 {/* Glass Overlay on Image */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-white shadow-xl flex items-center gap-4">
                    <div className="bg-primary/90 p-3 rounded-full shrink-0">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold font-headline">500+ Happy Smiles</p>
                      <p className="text-sm opacity-90">Transformed in Lagos</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Quick Services & Pricing Preview */}
        <section className="py-20 md:py-32 relative bg-secondary/30 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">Popular Services</Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
                Affordable Smile Transformations
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Premium cosmetic dentistry services at transparent prices in Lagos
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            >
              {popularServices.map((service, index) => (
                <motion.div 
                  key={service.title} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`group bg-white/60 dark:bg-card/40 backdrop-blur-xl border-white/40 dark:border-white/10 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full flex flex-col`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <CardHeader className="pb-4 pt-8">
                      <CardTitle className="text-xl font-headline">{service.title}</CardTitle>
                      <div className="text-3xl font-bold text-primary tracking-tight mt-2">{service.price}</div>
                    </CardHeader>
                    <CardContent className="pb-6 flex-grow">
                      <p className="text-muted-foreground leading-relaxed">{service.shortDescription}</p>
                    </CardContent>
                    <CardFooter className="pb-8">
                      <Button asChild className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all" variant="outline">
                        <Link href="/book-appointment">Book Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-16"
            >
              <Button asChild variant="outline" className="rounded-full h-12 px-8 border-2 hover:bg-primary hover:text-white transition-all duration-300">
                <Link href="/services">View All Services & Pricing <ChevronRight className="ml-1 h-4 w-4"/></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 md:py-32 relative bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl -translate-y-1/2"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-white">
                Trusted by Lagos Residents
              </h2>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/80">
                We are proud of our commitment to excellence and patient satisfaction in cosmetic dentistry.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mb-4 border border-white/20 shadow-xl">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-4xl md:text-5xl font-bold font-headline text-white tracking-tight">{stat.value}</p>
                  <p className="text-sm md:text-base text-primary-foreground/80 mt-2 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Highlighted Services Section */}
        <section id="services" className="py-20 md:py-32 bg-background relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
                Our Signature Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Specialized cosmetic treatments designed to enhance your smile and boost your confidence
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
            >
              {highlightedServices.map((service, index) => (
                <motion.div 
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`group h-full flex flex-col text-center bg-white/80 dark:bg-card/60 backdrop-blur-xl border-white/50 hover:border-primary/30 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-3 rounded-3xl overflow-hidden`}>
                    <CardHeader className="items-center pt-10">
                      <div className="p-5 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                        <div className="text-primary group-hover:text-white transition-colors duration-500">
                          {serviceIcons[service.title as keyof typeof serviceIcons] || <Sparkles className="h-8 w-8" />}
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-headline">{service.title}</CardTitle>
                      <div className="text-3xl font-bold text-primary tracking-tight mt-2">{service.price}</div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4 leading-relaxed">{service.shortDescription}</p>
                    </CardContent>
                    <CardFooter className="pb-10">
                      <Button asChild className="w-full rounded-full h-12" variant="default">
                        <Link href="/book-appointment">Book This Service</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Showcase Section */}
        <section className="py-20 md:py-32 bg-secondary/20 relative">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">Before & After</Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
                Smile Transformations Gallery
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See the beautiful results we've achieved for our clients at Favfare The Clinic in Lagos.
              </p>
            </motion.div>
            
            {/* 8 Image Grid - Sleek Layout */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto"
            >
              {allGalleryImages.slice(0, 8).map((galleryItem, index) => (
                <motion.button
                  key={galleryItem.id}
                  onClick={() => setSelectedImage(galleryItem)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`relative aspect-square rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-500 group`}
                >
                  <Image
                    src={galleryItem.imageUrl}
                    alt={galleryItem.description}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-left">
                      {galleryItem.description}
                    </p>
                    <div className="flex items-center text-primary-foreground/80 text-sm mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <Sparkles className="h-4 w-4 mr-1" /> View Image
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center mt-16"
            >
              <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 border-2 border-primary/20 hover:bg-primary/5 transition-all duration-300">
                <a 
                  href="https://www.tiktok.com/@favfare" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 group"
                >
                  <span className="font-medium">View More Transformations on TikTok</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 md:py-32 bg-background relative overflow-hidden">
            <div className="absolute top-1/2 -left-64 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div 
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7 }}
                    >
                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">Excellence</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-8">Why Choose Favfare The Clinic?</h2>
                        <motion.ul 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ staggerChildren: 0.15 }}
                          className="space-y-8"
                        >
                           {whyChooseUsItems.map((item, index) => (
                             <motion.li 
                               key={index} 
                               initial={{ opacity: 0, x: -20 }}
                               whileInView={{ opacity: 1, x: 0 }}
                               transition={{ duration: 0.5 }}
                               className={`flex items-start group`}
                             >
                               <div className="flex-shrink-0 mt-1">
                                 <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-primary/10">
                                   <CheckCircle className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                                 </div>
                               </div>
                               <div className="ml-6">
                                 <h3 className="text-xl font-bold font-headline mb-2">{item.title}</h3>
                                 <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                               </div>
                             </motion.li>
                           ))}
                        </motion.ul>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className="relative"
                    >
                        <div className="relative aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 border-8 border-white/50 backdrop-blur-sm">
                            {whyChooseImage && (
                                <Image
                                    src="/dentist_owner.jpeg"
                                    alt={whyChooseImage.description}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    data-ai-hint={whyChooseImage.imageHint}
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
                        </div>
                        {/* Floating Element */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 animate-float-slow hidden md:block"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-3 rounded-full text-green-600">
                                    <Activity className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="font-bold font-headline text-2xl">100%</p>
                                    <p className="text-sm text-muted-foreground font-medium">Safe Procedures</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">Testimonials</Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
                What Our Patients Say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Hear from satisfied clients who have transformed their smiles with us in Lagos.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative max-w-5xl mx-auto"
            >
              <Carousel
                opts={{ align: 'start', loop: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="h-full py-2">
                        <Card className="h-full bg-white/70 dark:bg-card/50 backdrop-blur-xl border-white/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-3xl">
                          <CardContent className="pt-8 px-6 pb-8 flex flex-col items-center text-center">
                            <div className="flex mb-6 bg-yellow-50 dark:bg-yellow-900/20 py-2 px-4 rounded-full">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 mx-0.5" />
                              ))}
                            </div>
                            <p className="text-muted-foreground mb-8 text-lg italic leading-relaxed flex-grow">
                              "{testimonial.quote}"
                            </p>
                            <div className="pt-4 border-t border-border/50 w-full">
                                <p className="font-bold font-headline text-lg">{testimonial.name}</p>
                                <p className="text-sm text-primary font-medium mt-1">
                                  {testimonial.location}
                                </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12 border-2 border-primary/20 hover:bg-primary hover:text-white transition-colors" />
                <CarouselNext className="hidden md:flex -right-12 h-12 w-12 border-2 border-primary/20 hover:bg-primary hover:text-white transition-colors" />
              </Carousel>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="text-center max-w-2xl mx-auto mb-16"
                >
                    <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">FAQs</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have questions about our cosmetic dentistry services? Here are some common queries.
                    </p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="max-w-3xl mx-auto"
                >
                    <Accordion type="single" collapsible className="w-full space-y-4">
                       {faqs.map((faq, index) => (
                         <AccordionItem key={index} value={`item-${index}`} className="bg-white/50 dark:bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-md transition-all">
                           <AccordionTrigger className="text-lg md:text-xl font-headline text-left hover:text-primary transition-colors py-6">
                             {faq.question}
                           </AccordionTrigger>
                           <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                             {faq.answer}
                           </AccordionContent>
                         </AccordionItem>
                       ))}
                    </Accordion>
                </motion.div>
                 <motion.div 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5 }}
                   className="text-center mt-16"
                 >
                    <p className="text-muted-foreground text-lg">
                        Have more questions?
                        <Button variant="link" asChild className="text-lg font-medium text-primary hover:text-primary/80">
                           <Link href="/contact">Contact Us</Link>
                        </Button>
                    </p>
                </motion.div>
            </div>
        </section>

        {/* WhatsApp Quick Connect */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-green-400/5 to-transparent z-0"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="max-w-3xl mx-auto bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-white/50 rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-green-500/10"
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <WhatsAppIcon className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-3xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
                Questions? Let's Chat!
              </h3>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                Get quick answers about our services, pricing, or availability directly on WhatsApp. We're here to help you achieve your perfect smile.
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-full h-14 px-10 text-lg shadow-lg shadow-green-600/30 hover:shadow-green-600/50 hover:-translate-y-1 transition-all duration-300">
                <a href="https://wa.me/2349169438645" target="_blank" rel="noopener noreferrer" className="group">
                  <WhatsAppIcon className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Chat on WhatsApp
                </a>
              </Button>
            </motion.div>
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