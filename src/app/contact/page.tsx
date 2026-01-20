"use client"

import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const ContactForm = () => {
    const formSchema = z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters." }),
        email: z.string().email({ message: "Please enter a valid email address." }),
        phone: z.string().optional(),
        message: z.string().min(10, { message: "Message must be at least 10 characters." }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // In a real app, you'd handle form submission here
        console.log(values);
        alert("Thank you for your message! We will get back to you shortly.");
        form.reset();
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl><Input placeholder="+234 916 943 8645" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl><Textarea placeholder="How can we help you with your smile?" className="min-h-[120px]" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" className="w-full">Send Message</Button>
            </form>
        </Form>
    )
}


export default function ContactPage() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-placeholder');

  const contactDetails = [
    { 
      icon: MapPin, 
      text: 'Lagos, Nigeria', 
      href: 'https://maps.google.com/?q=Lagos,Nigeria',
      description: 'Visit our cosmetic dentistry clinic in Lagos'
    },
    { 
      icon: Phone, 
      text: '+234 916 943 8645', 
      href: 'tel:+2349169438645',
      description: 'Call us directly'
    },
    { 
      icon: Mail, 
      text: 'Favfareclinic@gmail.com', 
      href: 'mailto:Favfareclinic@gmail.com',
      description: 'Send us an email'
    },
    { 
      icon: Clock, 
      text: 'Mon - Fri: 9:00 AM - 5:00 PM\nSat: 10:00 AM - 2:00 PM',
      description: 'Our working hours'
    },
    { 
      icon: MessageCircle, 
      text: 'WhatsApp: +234 916 943 8645', 
      href: 'https://wa.me/2349169438645',
      description: 'Chat with us on WhatsApp'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Contact Favfare The Clinic</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get in touch with us for premium cosmetic dentistry services in Lagos. We're here to help you achieve your perfect smile.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form Card */}
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Have questions about our services? Reach out and we'll get back to you as soon as possible.
                </p>
            </CardHeader>
            <CardContent>
                <ContactForm />
            </CardContent>
        </Card>

        {/* Contact Info and Map */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
                <p className="text-muted-foreground">
                  Multiple ways to reach Favfare The Clinic
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    {item.href ? (
                      <a 
                        href={item.href} 
                        target={item.href.startsWith('http') ? '_blank' : '_self'}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="text-foreground hover:text-primary transition-colors font-medium block"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium whitespace-pre-line">{item.text}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
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
            </CardContent>
          </Card>
          
          {/* <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Our Location</CardTitle>
                <p className="text-muted-foreground">
                  Visit our clinic in Lagos for premium cosmetic dentistry services
                </p>
            </CardHeader>
            <CardContent>
              {mapImage && (
                <div className="aspect-video rounded-lg overflow-hidden relative shadow-inner border">
                    <Image 
                      src={mapImage.imageUrl} 
                      alt="Favfare The Clinic location in Lagos, Nigeria" 
                      fill 
                      className="object-cover" 
                      data-ai-hint={mapImage.imageHint} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                        <h3 className="font-semibold">Favfare The Clinic</h3>
                        <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
                      </div>
                    </div>
                </div>
              )}
              
              <div className="mt-4 text-center">
                <Button asChild variant="outline" size="sm">
                  <a 
                    href="https://maps.google.com/?q=Lagos,Nigeria" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>

      {/* Quick Action Section */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact us today to schedule your consultation and take the first step towards a more confident smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/book-appointment">Book Appointment Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://wa.me/2349169438645" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Quick Chat on WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}