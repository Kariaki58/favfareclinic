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
import { Textarea } from '@/components/ui/textarea';
import { services, timeSlots } from '@/app/lib/data';
import { cn } from '@/lib/utils';
import { CheckCircle, Loader2, CalendarIcon, Clock } from 'lucide-react';
import { createBooking } from '@/app/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  date: z.date({ required_error: 'Please select a date' }),
  time: z.string().min(1, 'Please select a time'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  paymentOption: z.string().min(1, 'Please select a payment option'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: '',
      date: undefined,
      time: '',
      name: '',
      phone: '',
      paymentOption: '',
      notes: '',
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
    if (step === 2) fields = ['name', 'phone', 'paymentOption'];
    
    const isValid = await form.trigger(fields);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleServiceChange = (value: string) => {
    form.setValue('service', value);
    const service = services.find(s => s.title === value);
    setSelectedService(service);
  };

  if (isSubmitted) {
    return (
      <Card className="animate-fade-in text-center">
        <CardContent className="p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Appointment Requested!</h2>
          <p className="text-muted-foreground mb-4">
            Thank you for choosing Favfare The Clinic! We've received your booking request and will contact you shortly to confirm your appointment.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 text-left max-w-md mx-auto">
            <h3 className="font-semibold mb-2">Next Steps:</h3>
            <ul className="text-sm space-y-1">
              <li>• We'll call you within 24 hours to confirm</li>
              <li>• Please keep your phone accessible</li>
              <li>• Arrive 10 minutes early for your appointment</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  const steps = [
    { title: "Select Service", description: "Choose your preferred cosmetic dentistry service", fields: ['service'] },
    { title: "Date & Time", description: "Select your preferred appointment slot", fields: ['date', 'time'] },
    { title: "Your Details", description: "Provide your contact information", fields: ['name', 'phone', 'paymentOption'] }
  ];

  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{steps[step].title}</CardTitle>
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
                  <div className="space-y-6">
                    <FormField control={form.control} name="service" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Select Service</FormLabel>
                        <Select onValueChange={(value) => handleServiceChange(value)} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Choose a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.title} value={service.title} className="py-3">
                                <div className="flex justify-between items-center w-full">
                                  <span>{service.title}</span>
                                  <Badge variant="secondary" className="ml-2">
                                    {service.price}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {selectedService && (
                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                        <h4 className="font-semibold text-lg mb-2">{selectedService.title}</h4>
                        {/* <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{selectedService.duration}</span>
                        </div> */}
                        <p className="text-sm text-muted-foreground">{selectedService.longDescription}</p>
                      </div>
                    )}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <FormField control={form.control} name="date" render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-lg">Select Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                              initialFocus
                              className="rounded-md border mx-auto"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="time" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Preferred Time</FormLabel>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {timeSlots.map(time => (
                            <Button 
                              key={time} 
                              type="button" 
                              variant={field.value === time ? "default" : "outline"} 
                              onClick={() => field.onChange(time)}
                              className="h-12"
                            >
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
                        <FormLabel className="text-lg">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+234 916 943 8645" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="paymentOption" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Payment Option</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="paystack">Book & Pay Online (Paystack)</SelectItem>
                            <SelectItem value="arrival">Pay on Arrival</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="notes" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific concerns or questions..." 
                            {...field} 
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Progress Steps */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-full transition-colors",
                      index === step ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={prevStep} className="min-w-[100px]">
                  Back
                </Button>
              )}
              
              {step < steps.length - 1 && (
                <Button 
                  type="button" 
                  onClick={nextStep} 
                  className={cn("min-w-[100px]", step === 0 && 'ml-auto')}
                >
                  Continue
                </Button>
              )}
              
              {step === steps.length - 1 && (
                <Button type="submit" disabled={isPending} className="min-w-[150px] ml-auto">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Submit Booking'
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}