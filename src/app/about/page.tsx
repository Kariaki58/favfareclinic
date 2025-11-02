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
import { Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Precision Dental\'s mission, our expert team, and our state-of-the-art clinic.',
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
            About Precision Dental
          </h1>
        </div>
      </section>

      {/* Our Mission & Philosophy */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            Our Mission & Philosophy
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Precision Dental, our mission is to provide exceptional, patient-centered dental care in a comfortable and modern environment. We believe that a healthy smile is the foundation of overall wellness, and we are committed to using the latest technology and techniques to deliver outstanding results. Our philosophy is rooted in trust, transparency, and a gentle touch, ensuring every patient feels valued and understood.
          </p>
        </div>
      </section>

      {/* Meet the Dentist */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              {dentistPortrait && (
                <Image
                  src={dentistPortrait.imageUrl}
                  alt={dentistPortrait.description}
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg aspect-square object-cover mx-auto"
                  data-ai-hint={dentistPortrait.imageHint}
                />
              )}
            </div>
            <div className="md:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-2">Meet Dr. Evelyn Reed</h2>
              <p className="text-primary font-semibold mb-4">Lead Dentist & Founder</p>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Dr. Evelyn Reed is a graduate of the University of Pennsylvania School of Dental Medicine and has over 15 years of experience in cosmetic and restorative dentistry. She is passionate about creating beautiful, healthy smiles and is dedicated to lifelong learning in her field.
                </p>
                <p>
                  "My greatest joy is seeing the confidence that a new smile brings to my patients. I believe in a collaborative approach, where we work together to achieve your dental goals. Your comfort and health are my top priorities."
                </p>
                <Button asChild variant="ghost" className="text-primary hover:text-primary">
                  <Link href="#" aria-label="Dr. Reed's LinkedIn Profile">
                    <Linkedin className="mr-2 h-5 w-5" />
                    View Professional Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clinic Showcase */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Our State-of-the-Art Clinic
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Step into a space designed for your comfort and equipped with the latest in dental technology.
            </p>
          </div>
          <Carousel className="w-full max-w-4xl mx-auto">
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
      </section>
    </div>
  );
}
