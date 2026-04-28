import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { services as staticServices } from '@/app/lib/data';
import { createClient } from '@/lib/supabase/server';
import { ServiceDescription } from '@/components/ServiceDescription';

export const metadata: Metadata = {
  title: 'Our Services & Pricing - Favfare The Clinic',
  description: 'Premium cosmetic dentistry services in Lagos. View our complete service list with transparent pricing.',
};

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: dbServices } = await supabase.from('services').select('*');
  
  const displayServices = dbServices && dbServices.length > 0 ? dbServices : staticServices;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Page Header */}
      <section className="py-20 md:py-32 relative bg-background overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-up">
          <Badge variant="outline" className="mb-6 border-primary/20 text-primary bg-primary/5 text-sm px-4 py-1.5 rounded-full shadow-sm">
            Premium Cosmetic Dentistry
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-foreground">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Services & Pricing</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            Transparent, affordable pricing for all our premium cosmetic dentistry services. 
            Achieve the smile you deserve with professional care in Lagos.
          </p>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-20 md:py-32 bg-secondary/20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">Complete Service Menu</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse our comprehensive range of cosmetic and general dentistry services
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {displayServices.map((service: any, index: any) => {
              // Handle both static data (camelCase) and Supabase data (snake_case)
              const shortDesc = service.short_description || service.shortDescription || '';
              const longDesc = service.long_description || service.longDescription || shortDesc;
              
              return (
              <div key={service.id || service.title} className="animate-fade-up" style={{ animationDelay: `${(index % 4) * 150}ms` }}>
                <Card className="group h-full flex flex-col bg-white/70 dark:bg-card/50 backdrop-blur-xl border-white/50 hover:border-primary/30 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-2 rounded-3xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <CardHeader className="pb-4 pt-8">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-headline group-hover:text-primary transition-colors">{service.title}</CardTitle>
                        <CardDescription className="text-base mt-2 leading-relaxed line-clamp-2">{shortDesc}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold px-4 py-2 bg-primary/10 text-primary border-none shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                        {service.price}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6 flex-grow">
                    <div className="bg-secondary/30 rounded-2xl p-4 border border-border/50 h-full">
                      <ServiceDescription text={longDesc} maxLength={120} />
                    </div>
                  </CardContent>
                  <CardFooter className="pb-8">
                    <Button asChild className="w-full rounded-full h-12 group-hover:bg-primary group-hover:text-white transition-all shadow-md hover:shadow-lg" variant="outline">
                      <Link href="/book-appointment">Book This Service <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Why Choose Favfare Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Why Choose Favfare The Clinic?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
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
              <div key={index} className="text-center p-8 bg-white/50 dark:bg-card/40 backdrop-blur-md rounded-3xl border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-fade-up" style={{ animationDelay: `${(index + 1) * 150}ms` }}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                  <CheckCircle className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold font-headline text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-up">
          <div className="bg-white/10 p-4 rounded-full inline-block mb-6 shadow-xl backdrop-blur-sm border border-white/20">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90 leading-relaxed">
            Book your appointment today and take the first step towards a more confident you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-white text-primary hover:bg-gray-100 shadow-xl hover:scale-105 transition-all duration-300">
              <Link href="/book-appointment">Book Appointment Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-2 border-white/50 text-white bg-white/5 hover:bg-white/20 hover:text-white backdrop-blur-sm transition-all duration-300">
              <a href="https://wa.me/2349169438645">Chat on WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}