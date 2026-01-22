'use server';

import { z } from 'zod';
import { Resend } from 'resend';

// Initialize Resend with the API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Update the booking schema to match the new form structure
const bookingSchema = z.object({
  service: z.string().min(1, 'Service is required'),
  date: z.date({ required_error: 'Date is required' }),
  time: z.string().min(1, 'Time is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  paymentOption: z.string().min(1, 'Payment option is required'),
  notes: z.string().optional(),
});

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
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

export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
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
    email: formData.get('email'),
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

  // Send Email Notification
  try {
    const { name, email, service, date, time, phone, paymentOption, notes } = validatedFields.data;
    
    // Notify Clinic
    await resend.emails.send({
      from: 'Favfare Clinic <onboarding@favfare.com.ng>',
      to: ["Favfareclinic@gmail.com"],
      subject: `New Appointment Request: ${name} - ${service}`,
      replyTo: email,
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date.toDateString()}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Payment Option:</strong> ${paymentOption}</p>
        <p><strong>Notes:</strong> ${notes || 'None'}</p>
      `
    });

    // Send Confirmation to Client
    await resend.emails.send({
      from: 'Favfare Clinic <onboarding@favfare.com.ng>',
      to: [email],
      subject: `Booking Request Received - Favfare Clinic`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1a1a1a;">Hello ${name},</h2>
          <p>Thank you for choosing <strong>Favfare Clinic</strong>! We've received your booking request for <strong>${service}</strong>.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Appointment Details:</h3>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${date.toDateString()}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
            <p style="margin: 5px 0;"><strong>Service:</strong> ${service}</p>
          </div>

          <p>Wait! To finalize your booking, please confirm your appointment via WhatsApp by clicking the button on the confirmation page or using our contact number.</p>
          
          <p>We look forward to seeing you!</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">
            Favfare Clinic<br />
            Phone: +234 916 943 8645
          </p>
        </div>
      `
    });
    console.log('Booking emails sent successfully');
  } catch (error) {
    console.error('Error sending booking emails:', error);
  }

  console.log('Booking created:', validatedFields.data);

  // This will be a successful state
  return {
    message: 'success',
  };
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
) {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  };

  const validatedFields = contactSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: 'Failed to send message. Please check your entries.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { name, email, phone, message } = validatedFields.data;

    const res = await resend.emails.send({
      from: 'Favfare Clinic Contact <onboarding@favfare.com.ng>',
      to: ["Favfareclinic@gmail.com"],
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    console.log(res);
    console.log('Contact form email sent successfully');
  } catch (error) {
    console.error('Error sending contact email:', error);
    return {
      message: 'Failed to send email. Please try again later.',
    };
  }

  return {
    message: 'success',
  };
}