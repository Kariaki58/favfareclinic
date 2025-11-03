"use client";

import { useState, useTransition } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { services, timeSlots } from '@/app/lib/data';
import { cn } from '@/lib/utils';
import { CheckCircle, Loader2 } from 'lucide-react';
import { createBooking } from '@/app/lib/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  date: z.date({ required_error: 'Please select a date' }),
  time: z.string().min(1, 'Please select a time'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

type FormData = z.infer<typeof formSchema>;

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: '',
      date: undefined,
      time: '',
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
          if (value instanceof Date) {
              formData.append(key, value.toISOString());
          } else {
              formData.append(key, value);
          }
      });

      const result = await createBooking({ message: '' }, formData);

      if (result.message === 'success') {
        setIsSubmitted(true);
      } else {
        toast({
          variant: "destructive",
          title: "Booking Failed",
          description: result.message || "Please check your information and try again.",
        });
      }
    });
  };

  const nextStep = async () => {
    let fields: (keyof FormData)[] = [];
    if (step === 0) fields = ['service'];
    if (step === 1) fields = ['date', 'time'];
    
    const isValid = await form.trigger(fields);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  if (isSubmitted) {
    return (
      <Card className="animate-fade-in text-center">
        <CardContent className="p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Appointment Requested!</h2>
          <p className="text-muted-foreground">
            Thank you! We've received your request and will contact you shortly to confirm your appointment.
          </p>
        </CardContent>
      </Card>
    );
  }

  const steps = [
    { title: "Select Service", description: "Choose the service you're interested in.", fields: ['service'] },
    { title: "Pick Date & Time", description: "Select a convenient date and time for your visit.", fields: ['date', 'time'] },
    { title: "Your Information", description: "Please provide your contact details.", fields: ['name', 'email', 'phone'] }
  ];

  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{steps[step].title}</CardTitle>
        <CardDescription>{steps[step].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <FormField control={form.control} name="service" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}

                {step === 1 && (
                  <div className="space-y-4">
                     <FormField control={form.control} name="date" render={({ field }) => (
                        <FormItem className="flex flex-col items-center">
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                initialFocus
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                     )} />
                     <FormField control={form.control} name="time" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time</FormLabel>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {timeSlots.map(time => (
                                    <Button key={time} type="button" variant={field.value === time ? "default" : "outline"} onClick={() => field.onChange(time)}>
                                        {time}
                                    </Button>
                                ))}
                            </div>
                             <FormMessage />
                        </FormItem>
                     )} />
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input placeholder="+234 916 943 8645" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              {step > 0 && <Button type="button" variant="outline" onClick={prevStep}>Back</Button>}
              {step < steps.length - 1 && <Button type="button" onClick={nextStep} className={cn(step === 0 && 'ml-auto')}>Next</Button>}
              {step === steps.length - 1 && (
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Request Appointment
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
