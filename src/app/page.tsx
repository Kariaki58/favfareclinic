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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
  'Dental Implants': <Smile className="h-8 w-8 text-primary" />,
  'Family Dentistry': <Heart className="h-8 w-8 text-primary" />,
};

const stats = [
    { value: '1,500+', label: 'Happy Patients', icon: Smile },
    { value: '15+', label: 'Years of Experience', icon: Award },
    { value: '500+', label: '5-Star Reviews', icon: Star },
    { value: '10,000+', label: 'Procedures Done', icon: Activity },
];

const whyChooseUsItems = [
    { title: 'Advanced Technology', description: 'We use the latest tools for precise and comfortable treatments.' },
    { title: 'Patient-Centered Care', description: 'Your comfort and goals are our top priority.' },
    { title: 'Comfortable Environment', description: 'A calm, welcoming space to make you feel at ease.' },
    { title: 'Experienced Team', description: 'Skilled professionals dedicated to excellence in dental care.' },
];

const faqs = [
    { question: "What should I expect on my first visit?", answer: "Your first visit includes a comprehensive exam, x-rays if needed, and a consultation with Dr. Reed. We'll discuss your dental history and goals to create a personalized treatment plan." },
    { question: "Do you accept dental insurance?", answer: "Yes, we accept most major dental insurance plans. Please contact our office with your insurance information, and we'll be happy to verify your coverage." },
    { question: "What are your office hours?", answer: "We are open Monday to Friday, from 9:00 AM to 5:00 PM. We are closed on weekends and major holidays." },
    { question: "What should I do in case of a dental emergency?", answer: "If you have a dental emergency, please call our office immediately. We offer same-day appointments for urgent cases to provide prompt care." },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const whyChooseImage = PlaceHolderImages.find((img) => img.id === 'why-choose-us');
  const highlightedServices = services.slice(0, 3);
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);

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
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline">
                Brighten Your Smile with Precision, Comfort, and Care.
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                Experience modern dentistry in a calm, welcoming environment —
                trusted by thousands of happy patients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg">
                  <Link href="/book-appointment">
                    Book Appointment Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/services">Explore Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Highlighted Services Section */}
        <section id="services" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Expert Care, Personalized For You
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                From routine check-ups to life-changing transformations, we
                offer a complete range of dental services.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlightedServices.map((service) => (
                <Card
                  key={service.title}
                  className="group animate-slide-up hover:shadow-primary/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                >
                  <CardHeader className="items-center text-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      {serviceIcons[service.title as keyof typeof serviceIcons]}
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription>{service.shortDescription}</CardDescription>
                    <Button variant="link" asChild className="mt-4 text-primary">
                      <Link href="/services">
                        Learn More <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Our Practice by the Numbers
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                We are proud of our commitment to excellence and patient satisfaction.
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


        {/* Before & After Gallery Preview */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Transforming Smiles, Changing Lives
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                See the real results our patients have experienced.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {beforeAndAfters.slice(0, 4).map((item) => {
                const beforeImg = PlaceHolderImages.find(p => p.id === item.beforeId);
                const afterImg = PlaceHolderImages.find(p => p.id === item.afterId);
                return (
                  <div key={item.id} className="grid grid-cols-2 gap-2 group">
                    {beforeImg && 
                      <button onClick={() => setSelectedImage(beforeImg)} className="relative aspect-square focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
                        <Image src={beforeImg.imageUrl} alt="Before smile" fill className="rounded-lg object-cover" data-ai-hint={beforeImg.imageHint}/>
                        <Badge variant="secondary" className="absolute top-2 left-2">Before</Badge>
                      </button>
                    }
                    {afterImg &&
                      <button onClick={() => setSelectedImage(afterImg)} className="relative aspect-square focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
                        <Image src={afterImg.imageUrl} alt="After smile" fill className="rounded-lg object-cover" data-ai-hint={afterImg.imageHint}/>
                        <Badge className="absolute top-2 left-2">After</Badge>
                      </button>
                    }
                  </div>
                );
              })}
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                    <Link href="/contact">View More Transformations</Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Why Choose Fav Fare?</h2>
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
                We are proud to have earned the trust of our community.
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
                        Have questions? We have answers. Here are some of the most common queries we receive.
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

        <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
            {selectedImage && (
                <DialogContent className="max-w-none w-screen h-screen p-0 border-0 bg-black/80 flex items-center justify-center">
                    <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/20 p-2 text-white opacity-80 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                    <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                        <Image src={selectedImage.imageUrl} alt={selectedImage.description} fill className="object-contain" data-ai-hint={selectedImage.imageHint}/>
                    </div>
                </DialogContent>
            )}
        </Dialog>

      </main>
    </div>
  );
}
