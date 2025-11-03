import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { services } from '@/app/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore the wide range of dental services we offer, from routine check-ups and cleanings to advanced cosmetic dentistry and implants.',
};

export default function ServicesPage() {
  const whyChooseUs = [
    { title: 'Advanced Technology', description: 'We use the latest tools and techniques for more accurate and comfortable treatments.' },
    { title: 'Patient-Centered Care', description: 'Your comfort and goals are at the heart of everything we do.' },
    { title: 'Experienced Team', description: 'Our skilled professionals are dedicated to providing the highest quality of care.' },
    { title: 'Transparent Pricing', description: 'Clear, upfront information about costs so you can make informed decisions.' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Our Dental Services</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
            Comprehensive care to meet all your dental needs. We're committed to helping you achieve and maintain a healthy, beautiful smile for life.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const serviceImage = PlaceHolderImages.find((img) => img.id === service.image);
              return (
                <Card key={service.title} className="flex flex-col">
                  {serviceImage && (
                    <div className="relative aspect-video">
                      <Image
                        src={serviceImage.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover rounded-t-lg"
                        data-ai-hint={serviceImage.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{service.longDescription}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild>
                      <Link href="/book-appointment">Book Now</Link>
                    </Button>
                    <Button variant="ghost">Learn More</Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose Fav Fare?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We're different. Here's what sets us apart.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
