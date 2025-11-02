'use server';

import { z } from 'zod';

// Schema for booking form
const bookingSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  date: z.date({ required_error: 'Please select a date' }),
  time: z.string().min(1, 'Please select a time'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

export type BookingFormState = {
  message: string;
  errors?: {
    service?: string[];
    date?: string[];
    time?: string[];
    name?: string[];
    email?: string[];
    phone?: string[];
  };
};

export async function createBooking(
  prevState: BookingFormState,
  formData: FormData
) {
  const rawFormData = {
    service: formData.get('service'),
    // The date from FormData is a string, needs to be converted
    date: new Date(formData.get('date') as string),
    time: formData.get('time'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  };

  const validatedFields = bookingSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: 'Failed to create booking. Please check your entries.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Here you would typically save the data to a database
  // and integrate with a booking system like Calendly.
  // For this demo, we'll just simulate a success response.
  console.log('Booking created:', validatedFields.data);

  // This will be a successful state
  return {
    message: 'success',
  };
}
