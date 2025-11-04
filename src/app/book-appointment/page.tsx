import BookingForm from '@/components/booking-form';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Book an Appointment - Favfare The Clinic',
  description: 'Schedule your cosmetic dentistry appointment at Favfare The Clinic in Lagos. Quick, easy, and secure booking.',
};

export default function BookAppointmentPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Book Your Appointment</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Take the first step towards a more confident smile. Book your premium cosmetic dentistry service in Lagos.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <BookingForm />
      </div>
      
      {/* Additional Contact Options */}
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Prefer to book directly?</h3>
          <p className="text-muted-foreground mb-4">
            Contact us via WhatsApp or phone for immediate assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <a href="https://wa.me/2349169438645" target="_blank" rel="noopener noreferrer">
                WhatsApp: +234 916 943 8645
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="tel:+2349169438645">
                Call: +234 916 943 8645
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}