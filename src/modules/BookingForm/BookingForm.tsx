import { FormEvent, useState } from 'react';
import { Input } from '@/components/Inputfields/Inputfield';
import { Button } from '@/components/Button/Button';
import { createClient } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { MdError } from 'react-icons/md';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import * as z from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from '@/Layout';
import { FormControl, FormItem, FormLabel, FormDescription, FormMessage, FormField, Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserBooking } from '@/Types/calendar';

interface BookingProps {
  userChoices: UserBooking;
}

export const BookingForm: React.FC<BookingProps> = ({ userChoices }) => {
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [isBookingValid, setIsBookingValid] = useState<boolean | null>(null);
  const antal = userChoices.amount;
  const dato = userChoices.date;
  const startTid = userChoices.startTime?.time;
  const slutTid = userChoices.endTime?.time;
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supaKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const router = useRouter();

  //   const supabase = createClientComponentClient();
  const [user, setUser] = useState({ email: '', navn: '', telefon: '' });

  const supabase = createClient('https://zwcshwxjwoffkdrdvbtp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Y3Nod3hqd29mZmtkcmR2YnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNzg5NzgsImV4cCI6MjAxNjY1NDk3OH0.yq0erC0CIBZmUG9uMC8u1YVyG4g2dsf3PrpekxJDq34');

  // Errormessages for validation of the string in the input field.
  const formSchema = z.object({
    email: z.string().email('Indtast en gyldig email'),
    navn: z.string().min(1, {
      message: 'Dit navn skal minimum have 1 tegn ',
    }),
    telefon: z.union([z.string().length(0, { message: 'Indtast venligst et gyldigt telefonnummer' }), z.string().min(8)]).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      navn: user.navn,
      telefon: user.telefon,
    },
  });

  const handleBooking = async (values: z.infer<typeof formSchema>) => {
    try {
      setSupabaseError(null);
      setIsBookingValid(null);

      const { data, error } = await supabase
        .from('UserBookings')
        .insert([{ dato, antal, startTid, slutTid, navn: values.navn, email: values.email, telefon: values.telefon }])
        .select();

      // ! Set errormessage for Supabase here.
      if (error) {
        console.log(error);
        let errorMessage = 'Fej bror';
        setSupabaseError(errorMessage); // Set the error message
        setIsBookingValid(false);
        throw new Error(errorMessage);
      }

      if (data) {
        console.log('data', data);
        setIsBookingValid(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleBooking)} className='w-full'>
        <FormField
          control={form.control}
          name='navn'
          render={({ field }) => (
            <FormItem className='mt-5'>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <div style={{ position: 'relative' }} className={form.formState.errors.navn || isBookingValid === false ? 'shake' : ''}>
                  <Input
                    style={{
                      borderColor: form.formState.isSubmitted && (form.formState.errors.navn || isBookingValid === false) ? 'red' : isBookingValid === true ? 'green' : 'none',
                    }}
                    {...field}
                    id='navn'
                    type='text'
                  />
                  {form.formState.errors.navn || isBookingValid === false ? (
                    <div className='absolute top-2 right-0 pr-3 flex items-center pointer-events-none'>
                      <div>
                        <MdError className={'text-red-500 text-2xl'} />
                      </div>
                    </div>
                  ) : form.formState.isSubmitted && !form.formState.errors.email ? (
                    <div className='absolute top-2 right-0 pr-3 flex items-center pointer-events-none'>
                      <div>
                        <IoIosCheckmarkCircle className={'text-green-500 text-2xl'} />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </FormControl>
              <FormDescription className='text-transparent'>
                Placeholder text
                {/* Remove text-transparent if you need to use the field description */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='mt-5'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div style={{ position: 'relative' }} className={form.formState.errors.email || isBookingValid === false ? 'shake' : ''}>
                  <Input
                    style={{
                      borderColor: form.formState.isSubmitted && (form.formState.errors.email || isBookingValid === false) ? 'red' : isBookingValid === true ? 'green' : 'none',
                    }}
                    {...field}
                    id='email'
                    type='email'
                  />
                  {form.formState.errors.email || isBookingValid === false ? (
                    <div className='absolute top-2 right-0 pr-3 flex items-center pointer-events-none'>
                      <div>
                        <MdError className={'text-red-500 text-2xl'} />
                      </div>
                    </div>
                  ) : form.formState.isSubmitted && !form.formState.errors.email ? (
                    <div className='absolute top-2 right-0 pr-3 flex items-center pointer-events-none'>
                      <div>
                        <IoIosCheckmarkCircle className={'text-green-500 text-2xl'} />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </FormControl>
              <FormDescription className='text-transparent'>
                Placeholder text
                {/* Remove text-transparent if you need to use the field description */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='telefon'
          render={({ field }) => (
            <FormItem className='mt-5'>
              <FormLabel>Telefon nummmer</FormLabel>
              <FormControl>
                <div style={{ position: 'relative' }} className={form.formState.errors.telefon || isBookingValid === false ? 'shake' : ''}>
                  <Input
                    style={{
                      borderColor: form.formState.isSubmitted && (form.formState.errors.telefon || isBookingValid === false) ? 'red' : isBookingValid === true ? 'green' : 'none',
                    }}
                    {...field}
                    id='telefon'
                    type='tel'
                  />
                  {form.formState.errors.telefon || isBookingValid === false ? (
                    <div className='absolute top-2 right-0 pr-3 flex items-center pointer-events-none'>
                      <div>
                        <MdError className={'text-red-500 text-2xl'} />
                      </div>
                    </div>
                  ) : form.formState.isSubmitted && !form.formState.errors.telefon ? (
                    <div className='absolute top-2 right-0 pr-3 flex items-center pointer-events-none'>
                      <div>
                        <IoIosCheckmarkCircle className={'text-green-500 text-2xl'} />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </FormControl>
              <FormDescription className='text-transparent'>
                Placeholder text
                {/* Remove text-transparent if you need to use the field description */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Book din tid</Button>
      </form>
    </Form>
  );
};

export default BookingForm;
