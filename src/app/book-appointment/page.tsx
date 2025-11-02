import BookingForm from '@/components/booking-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Schedule your visit with Precision Dental in a few easy steps.',
};

export default function BookAppointmentPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-fade-in">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Book Your Appointment</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Take the first step towards a healthier, brighter smile. Our online booking is quick, easy, and secure.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <BookingForm />
      </div>
    </div>
  );
}
