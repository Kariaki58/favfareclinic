import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Smile,
  ChevronRight,
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
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { services, testimonials, beforeAndAfters } from '@/app/lib/data';

const serviceIcons = {
  'Teeth Whitening': <Sparkles className="h-8 w-8 text-primary" />,
  'Dental Implants': <Smile className="h-8 w-8 text-primary" />,
  'Family Dentistry': <Heart className="h-8 w-8 text-primary" />,
};

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const highlightedServices = services.slice(0, 3);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[80vh] min-h-[600px] text-white">
          <div className="absolute inset-0 bg-black/50 z-10" />
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
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
              <p className="mt-4 text-lg text-muted-foreground">
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
                    <CardTitle className="text-xl font-bold">
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

        {/* Before & After Gallery Preview */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Transforming Smiles, Changing Lives
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
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
                      <div className="relative aspect-square">
                        <Image src={beforeImg.imageUrl} alt="Before smile" fill className="rounded-lg object-cover" data-ai-hint={beforeImg.imageHint}/>
                        <Badge variant="secondary" className="absolute top-2 left-2">Before</Badge>
                      </div>
                    }
                    {afterImg &&
                      <div className="relative aspect-square">
                        <Image src={afterImg.imageUrl} alt="After smile" fill className="rounded-lg object-cover" data-ai-hint={afterImg.imageHint}/>
                        <Badge className="absolute top-2 left-2">After</Badge>
                      </div>
                    }
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                What Our Patients Say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We are proud to have earned the trust of our community.
              </p>
            </div>
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
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

      </main>
    </div>
  );
}
