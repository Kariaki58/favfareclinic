import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Star } from 'lucide-react';
import { services } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Our Services & Pricing - Favfare The Clinic',
  description: 'Premium cosmetic dentistry services in Lagos. View our complete service list with transparent pricing.',
};

export default function ServicesPage() {
  const featuredServices = services.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">Premium Cosmetic Dentistry</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Our Services & Pricing</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
            Transparent, affordable pricing for all our premium cosmetic dentistry services. 
            Achieve the smile you deserve with professional care in Lagos.
          </p>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Complete Service Menu</h2>
            <p className="mt-4 text-muted-foreground">
              Browse our comprehensive range of cosmetic and general dentistry services
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Card key={service.title} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <Badge variant="secondary" className="text-base font-semibold px-3 py-1">
                      {service.price}
                    </Badge>
                  </div>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  {/* <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{service.duration}</span>
                  </div> */}
                  <p className="text-sm text-muted-foreground">{service.longDescription}</p>
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

      {/* Why Choose Favfare Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose Favfare The Clinic?</h2>
            <p className="mt-4 text-muted-foreground">
              Experience the difference with our patient-focused approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Safe & Professional',
                description: 'All treatments performed by qualified professionals using certified materials'
              },
              {
                title: 'Beautiful Results',
                description: 'Focus on aesthetic excellence and natural-looking outcomes'
              },
              {
                title: 'Affordable Pricing',
                description: 'Transparent pricing with no hidden costs'
              },
              {
                title: 'Confidence Boost',
                description: 'Transform your smile and boost your self-confidence'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book your appointment today and take the first step towards a more confident you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/book-appointment">Book Appointment Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white">
              <a href="https://wa.me/2349169438645">Chat on WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}