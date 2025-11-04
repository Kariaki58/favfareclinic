'use server';

import { z } from 'zod';

// Update the booking schema to match the new form structure
const bookingSchema = z.object({
  service: z.string().min(1, 'Service is required'),
  date: z.date({ required_error: 'Date is required' }),
  time: z.string().min(1, 'Time is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  paymentOption: z.string().min(1, 'Payment option is required'),
  notes: z.string().optional(),
});

export type BookingFormState = {
  message: string;
  errors?: {
    service?: string[];
    date?: string[];
    time?: string[];
    name?: string[];
    phone?: string[];
    paymentOption?: string[];
    notes?: string[];
  };
};

export async function createBooking(
  prevState: BookingFormState,
  formData: FormData
) {
  // Parse the date string from FormData
  const dateString = formData.get('date') as string;
  let date: Date;
  
  try {
    date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return {
        message: 'Invalid date format',
        errors: {
          date: ['Please select a valid date'],
        },
      };
    }
  } catch (error) {
    return {
      message: 'Invalid date format',
      errors: {
        date: ['Please select a valid date'],
      },
    };
  }

  const rawFormData = {
    service: formData.get('service'),
    date: date,
    time: formData.get('time'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    paymentOption: formData.get('paymentOption'),
    notes: formData.get('notes') || '',
  };

  const validatedFields = bookingSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.log('Validation errors:', validatedFields.error.flatten());
    return {
      message: 'Failed to create booking. Please check your entries.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Here you would typically save the data to a database
  // and integrate with a booking system or send notifications
  console.log('Booking created:', validatedFields.data);

  // Example: Send WhatsApp notification (you would implement this)
  // await sendWhatsAppNotification(validatedFields.data);

  // Example: Save to database (you would implement this)
  // await saveBookingToDatabase(validatedFields.data);

  // This will be a successful state
  return {
    message: 'success',
  };
}

// Example function to send WhatsApp notification
async function sendWhatsAppNotification(bookingData: any) {
  // This is where you would integrate with WhatsApp API
  // For example, using the WhatsApp Business API or a service like Twilio
  const message = `New Booking Request:
Service: ${bookingData.service}
Date: ${bookingData.date.toDateString()}
Time: ${bookingData.time}
Name: ${bookingData.name}
Phone: ${bookingData.phone}
Payment: ${bookingData.paymentOption}
Notes: ${bookingData.notes || 'None'}`;

  console.log('WhatsApp message:', message);
  // Implement actual WhatsApp sending logic here
}

// Example function to save to database
async function saveBookingToDatabase(bookingData: any) {
  // This is where you would save to your database
  // For example, using Prisma, Drizzle, or any other ORM
  console.log('Saving to database:', bookingData);
  // Implement actual database saving logic here
}