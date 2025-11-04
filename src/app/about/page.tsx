import Image from 'next/image';
import { Metadata } from 'next';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Favfare The Clinic - Premium Cosmetic Dentistry in Lagos',
  description: 'Learn about Favfare The Clinic\'s mission to boost your confidence through premium cosmetic dentistry services in Lagos. Safe, professional, beautiful results.',
};

export default function AboutPage() {
  const aboutHeroImage = PlaceHolderImages.find((img) => img.id === 'about-team');
  const dentistPortrait = PlaceHolderImages.find((img) => img.id === 'dentist-portrait');
  const clinicImages = ['clinic-1', 'clinic-2', 'clinic-3'].map(id => 
    PlaceHolderImages.find(img => img.id === id)
  ).filter(Boolean) as typeof PlaceHolderImages;

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 bg-primary/10">
        {aboutHeroImage && (
          <Image
            src={aboutHeroImage.imageUrl}
            alt={aboutHeroImage.description}
            fill
            className="object-cover object-center"
            data-ai-hint={aboutHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center font-headline">
            About Favfare The Clinic
          </h1>
        </div>
      </section>

      {/* Our Mission & Philosophy */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            Where Confidence Begins With Your Smile
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            At Favfare The Clinic, we specialize in premium cosmetic dentistry focused on teeth whitening and smile aesthetics. Our mission is to give you a brighter, healthier-looking smile that boosts your confidence in Lagos, Nigeria.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">S</span>
              </div>
              <h3 className="font-semibold mb-2">Safe</h3>
              <p className="text-sm text-muted-foreground">Professional treatments using certified materials and safe procedures</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">P</span>
              </div>
              <h3 className="font-semibold mb-2">Professional</h3>
              <p className="text-sm text-muted-foreground">Qualified dental professionals dedicated to excellence</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">B</span>
              </div>
              <h3 className="font-semibold mb-2">Beautiful Results</h3>
              <p className="text-sm text-muted-foreground">Focus on aesthetic excellence and natural-looking outcomes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              {dentistPortrait && (
                <Image
                  src="/dentist_owner.jpeg"
                  alt="Favour Nnabuihe - Founder of Favfare The Clinic"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg aspect-square object-cover mx-auto"
                  data-ai-hint="Portrait of Favour Nnabuihe, founder and lead cosmetic dentist at Favfare The Clinic"
                />
              )}
            </div>
            <div className="md:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-2">Meet Favour Nnabuihe</h2>
              <p className="text-primary font-semibold mb-4">Founder & Lead Cosmetic Dentist</p>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Favour Nnabuihe is the passionate founder and lead cosmetic dentist at Favfare The Clinic. With extensive training and experience in cosmetic dentistry, Favour specializes in teeth whitening, smile aesthetics, and helping clients achieve their dream smiles.
                </p>
                <p>
                  "I believe that everyone deserves to feel confident about their smile. At Favfare The Clinic, we don't just transform teeth—we transform lives by boosting confidence and self-esteem through beautiful, natural-looking results."
                </p>
                <p>
                  Our clinic in Lagos is built on the principles of safety, professionalism, and delivering exceptional cosmetic results that make our clients proud to smile.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild variant="outline" className="flex items-center gap-2">
                    <a href="tel:+2349169438645">
                      <Phone className="h-4 w-4" />
                      Call Us
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex items-center gap-2">
                    <a href="https://wa.me/2349169438645" target="_blank" rel="noopener noreferrer">
                      <span>WhatsApp</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Focus */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Our Cosmetic Dentistry Specialties
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We specialize in smile-enhancing treatments that deliver visible results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Teeth Whitening',
                description: 'Professional in-office whitening for dramatically brighter smiles'
              },
              {
                title: 'Smile Aesthetics',
                description: 'Complete smile makeovers including gap closures and bonding'
              },
              {
                title: 'Dental Cosmetics',
                description: 'Gold teeth, fashion braces, and aesthetic enhancements'
              },
              {
                title: 'Oral Care',
                description: 'Scaling, polishing, and preventive treatments'
              }
            ].map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clinic Showcase */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Our Lagos Clinic
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A comfortable, professional environment designed for your cosmetic dentistry experience
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <Carousel className="w-full">
              <CarouselContent>
                {clinicImages.map((image, index) => image && (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="p-2">
                        <div className="relative aspect-video">
                          <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="rounded-md object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Contact Information */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-lg p-8 border">
              <h3 className="text-xl font-semibold mb-4">Visit Our Clinic</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Lagos, Nigeria</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+2349169438645" className="hover:text-primary transition-colors">
                    +234 916 943 8645
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:nnabuifefavour8@gmail.com" className="hover:text-primary transition-colors">
                    nnabuifefavour8@gmail.com
                  </a>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/book-appointment">Book Appointment</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://wa.me/2349169438645" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}