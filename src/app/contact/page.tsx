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
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// Metadata for a client component should be handled in a parent layout or page.
// We can't export it from here. We'll rely on the root layout's metadata.

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
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
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
                        <FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl><Textarea placeholder="How can we help you?" className="min-h-[120px]" {...field} /></FormControl>
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
    { icon: MapPin, text: '123 Dental St, Smileville, CA 90210', href: '#' },
    { icon: Phone, text: '(123) 456-7890', href: 'tel:123-456-7890' },
    { icon: Mail, text: 'contact@precisiondental.com', href: 'mailto:contact@precisiondental.com' },
    { icon: Clock, text: 'Mon - Fri: 9:00 AM - 5:00 PM' },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Get In Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We're here to help and answer any question you might have. We look forward to hearing from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form Card */}
        <Card>
            <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
                <ContactForm />
            </CardContent>
        </Card>

        {/* Contact Info and Map */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
                <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <item.icon className="h-6 w-6 text-primary mt-1" />
                  {item.href ? (
                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">{item.text}</Link>
                  ) : (
                    <p className="text-muted-foreground">{item.text}</p>
                  )}
                </div>
              ))}
               <Button asChild className="w-full mt-4">
                  <Link href="/book-appointment">Book Appointment Online</Link>
                </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle>Our Location</CardTitle>
            </CardHeader>
            <CardContent>
              {mapImage && (
                <div className="aspect-video rounded-lg overflow-hidden relative shadow-inner">
                    <Image src={mapImage.imageUrl} alt="Map to clinic" fill className="object-cover" data-ai-hint={mapImage.imageHint} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
