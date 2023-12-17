import { useState } from 'react';
import { Input } from '@/components/Inputfields/Inputfield';
import { Button } from '@/components/Button/Button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { MdError } from 'react-icons/md';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import * as z from 'zod';
import InputMask from 'react-input-mask';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormField,
  Form,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserBooking } from '@/Types/calendar';
import { formattedDate } from '@/calendarFunctions/calendarFunctions';
import { useAtom } from 'jotai';
import { bookingCompleteAtom } from '@/states/store';
import { FaUserGroup } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { Bookings } from '@/Types/Bookings';
import { supabase } from '../../../utils/supabaseClient';

interface BookingProps {
  userChoices: UserBooking;
  bookingOverview: Array<Bookings>;
}

export const BookingForm: React.FC<BookingProps> = ({ userChoices, bookingOverview }) => {
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [isBookingValid, setIsBookingValid] = useState<boolean | null>(null);
  const [bookingComplete, setBookingComplete] = useAtom(bookingCompleteAtom);
  const antal = userChoices.amount;
  const dato = userChoices.date;
  const startTid = userChoices.startTime?.time;
  const slutTid = userChoices.endTime?.time;
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supaKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const router = useRouter();

  const [user, setUser] = useState({ email: '', navn: '', telefon: '' });

  const timerImellem = () => {
    const startTimeString: string | undefined = startTid?.replace('.', ':');
    const endTimeString: string | undefined = slutTid?.replace('.', ':');

    // Convert time strings to Date objects
    const startTime: Date = new Date(`2000-01-01T${startTimeString}`);
    const endTime: Date = new Date(`2000-01-01T${endTimeString}`);

    // Calculate the time difference in milliseconds
    const timeDiffMillis: number = endTime.getTime() - startTime.getTime();

    // Convert milliseconds to hours
    const hoursDiff: number = timeDiffMillis / (1000 * 60 * 60);

    return hoursDiff;
  };

  // Errormessages for validation of the string in the input field.
  const formSchema = z.object({
    email: z.string().email('Indtast en gyldig email'),

    navn: z.string().min(1, {
      message: 'Dit navn skal minimum have 1 tegn ',
    }),
    telefon: z
      .union([
        z.string().length(0, { message: 'Indtast venligst et gyldigt telefonnummer' }),
        z.string().min(8),
      ])
      .optional(),
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
    updateSupabase();

    try {
      setSupabaseError(null);
      setIsBookingValid(null);

      const { data, error } = await supabase
        .from('UserBookings')
        .insert([
          {
            dato,
            antal,
            startTid,
            slutTid,
            navn: values.navn,
            email: values.email,
            telefon: values.telefon,
          },
        ])
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
        setBookingComplete(true);
      }
    } catch (error) {
      console.error('Error:', error);
      console.error('Error:', error);
    }
  };

  const sendToSupabase = async (object: any) => {
    const { data, error } = await supabase.from('Bookings').insert([object]).select();
  };

  const basePc = [
    { time: '14.00', booked: false, bookedCount: 0 },
    { time: '14.30', booked: false, bookedCount: 0 },
    { time: '15.00', booked: false, bookedCount: 0 },
    { time: '15.30', booked: false, bookedCount: 0 },
    { time: '16.00', booked: false, bookedCount: 0 },
    { time: '16.30', booked: false, bookedCount: 0 },
    { time: '17.00', booked: false, bookedCount: 0 },
    { time: '17.30', booked: false, bookedCount: 0 },
    { time: '18.00', booked: false, bookedCount: 0 },
    { time: '18.30', booked: false, bookedCount: 0 },
    { time: '19.00', booked: false, bookedCount: 0 },
    { time: '19.30', booked: false, bookedCount: 0 },
    { time: '20.00', booked: false, bookedCount: 0 },
  ];

  const createBooking = (amount: number, alreadyDate: boolean) => {
    const startToBook = basePc.findIndex(index => index.time === userChoices?.startTime?.time);
    const endToBook = basePc.findIndex(index => index.time === userChoices?.endTime?.time);
    const timesToBook = basePc.slice(startToBook, endToBook + 1).map(time => time.time);

    if (!alreadyDate) {
      const bookedPcs: Array<Array<{ time: string; booked: boolean; bookedCount: number }>> = [];

      for (let i = 1; i < 6; i++) {
        if (i <= amount) {
          console.log('i:', i, 'userAmount:', amount);

          bookedPcs.push(
            basePc.map(timeSlot => {
              if (timesToBook.includes(timeSlot.time) && timeSlot.booked === false) {
                console.log('im included: ', timeSlot.time);

                return { time: timeSlot.time, booked: true, bookedCount: 0 };
              } else {
                console.log('im not included:', timeSlot.time);

                return timeSlot;
              }
            })
          );
        } else {
          bookedPcs.push(basePc);
        }
      }
      const supabaseObject = {
        date: userChoices?.date,
        PC1: bookedPcs[0],
        PC2: bookedPcs[1],
        PC3: bookedPcs[2],
        PC4: bookedPcs[3],
        PC5: bookedPcs[4],
        NLP: null,
      };

      console.log('supabaseObject', supabaseObject);

      sendToSupabase(supabaseObject);

      console.log('NEW PC');
    } else {
      const existingDay = () => {
        for (let i = 0; i < bookingOverview.length; i++) {
          //@ts-ignore
          if (bookingOverview[i].date === userChoices?.date) {
            return bookingOverview[i];
          }
        }
      };

      const tempBooking = [
        existingDay()?.PC1,
        existingDay()?.PC2,
        existingDay()?.PC3,
        existingDay()?.PC4,
        existingDay()?.PC5,
      ];

      let updatedExistingDay;
      for (let i = 1; i < 6; i++) {
        if (i <= amount) {
          console.log('i:', i, 'userAmount:', amount);

          let updatedPcs = 0;

          updatedExistingDay = tempBooking.map(pc => {
            console.log('pc', pc);

            if (updatedPcs === timesToBook.length * amount) {
              return pc;
            } else {
              // @ts-ignore
              const newPcs = pc.map(timeSlot => {
                console.log('timeSlot', timeSlot);

                //@ts-ignore
                if (timesToBook.includes(timeSlot.time) && timeSlot.booked === false) {
                  //@ts-ignore
                  console.log('im included: ', timeSlot.time);
                  //@ts-ignore
                  updatedPcs++;
                  return { time: timeSlot.time, booked: true, bookedCount: 0 };
                } else {
                  //@ts-ignore
                  console.log('im not included:', timeSlot.time);

                  return timeSlot;
                }
              });
              return newPcs;
            }
          });
          console.log('existingDay', existingDay());
          console.log('tempBooking', tempBooking);
          console.log('updatedExistingDay', updatedExistingDay);
        }
      }

      const supabaseObject = updatedExistingDay && {
        id: existingDay()?.id,
        date: userChoices?.date,
        PC1: updatedExistingDay[0],
        PC2: updatedExistingDay[1],
        PC3: updatedExistingDay[2],
        PC4: updatedExistingDay[3],
        PC5: updatedExistingDay[4],
        NLP: null,
      };
      console.log('supabaseObject', supabaseObject);
      sendUpdateToSupabase(supabaseObject);
    }
  };

  async function sendUpdateToSupabase(supabaseObject: any) {
    const { data, error } = await supabase
      .from('Bookings')
      .update([supabaseObject])
      .eq('id', supabaseObject.id)
      .select();
    console.log('$123', data);
    console.log('pusherror', error);
  }

  function updateSupabase() {
    const newSupabaseObject = [
      [
        { time: '14.00', booked: false, bookedCount: 0 },
        { time: '14.30', booked: false, bookedCount: 0 },
        { time: '15.00', booked: false, bookedCount: 0 },
        { time: '15.30', booked: false, bookedCount: 0 },
        { time: '16.00', booked: false, bookedCount: 0 },
        { time: '16.30', booked: false, bookedCount: 0 },
        { time: '17.00', booked: false, bookedCount: 0 },
        { time: '17.30', booked: false, bookedCount: 0 },
        { time: '18.00', booked: false, bookedCount: 0 },
        { time: '18.30', booked: false, bookedCount: 0 },
        { time: '19.00', booked: false, bookedCount: 0 },
        { time: '19.30', booked: false, bookedCount: 0 },
        { time: '20.00', booked: false, bookedCount: 0 },
      ],
      [
        { time: '14.00', booked: false, bookedCount: 0 },
        { time: '14.30', booked: false, bookedCount: 0 },
        { time: '15.00', booked: false, bookedCount: 0 },
        { time: '15.30', booked: false, bookedCount: 0 },
        { time: '16.00', booked: false, bookedCount: 0 },
        { time: '16.30', booked: false, bookedCount: 0 },
        { time: '17.00', booked: false, bookedCount: 0 },
        { time: '17.30', booked: false, bookedCount: 0 },
        { time: '18.00', booked: false, bookedCount: 0 },
        { time: '18.30', booked: false, bookedCount: 0 },
        { time: '19.00', booked: false, bookedCount: 0 },
        { time: '19.30', booked: false, bookedCount: 0 },
        { time: '20.00', booked: false, bookedCount: 0 },
      ],
      [
        { time: '14.00', booked: false, bookedCount: 0 },
        { time: '14.30', booked: false, bookedCount: 0 },
        { time: '15.00', booked: false, bookedCount: 0 },
        { time: '15.30', booked: false, bookedCount: 0 },
        { time: '16.00', booked: false, bookedCount: 0 },
        { time: '16.30', booked: false, bookedCount: 0 },
        { time: '17.00', booked: false, bookedCount: 0 },
        { time: '17.30', booked: false, bookedCount: 0 },
        { time: '18.00', booked: false, bookedCount: 0 },
        { time: '18.30', booked: false, bookedCount: 0 },
        { time: '19.00', booked: false, bookedCount: 0 },
        { time: '19.30', booked: false, bookedCount: 0 },
        { time: '20.00', booked: false, bookedCount: 0 },
      ],
      [
        { time: '14.00', booked: false, bookedCount: 0 },
        { time: '14.30', booked: false, bookedCount: 0 },
        { time: '15.00', booked: false, bookedCount: 0 },
        { time: '15.30', booked: false, bookedCount: 0 },
        { time: '16.00', booked: false, bookedCount: 0 },
        { time: '16.30', booked: false, bookedCount: 0 },
        { time: '17.00', booked: false, bookedCount: 0 },
        { time: '17.30', booked: false, bookedCount: 0 },
        { time: '18.00', booked: false, bookedCount: 0 },
        { time: '18.30', booked: false, bookedCount: 0 },
        { time: '19.00', booked: false, bookedCount: 0 },
        { time: '19.30', booked: false, bookedCount: 0 },
        { time: '20.00', booked: false, bookedCount: 0 },
      ],
      [
        { time: '14.00', booked: false, bookedCount: 0 },
        { time: '14.30', booked: false, bookedCount: 0 },
        { time: '15.00', booked: false, bookedCount: 0 },
        { time: '15.30', booked: false, bookedCount: 0 },
        { time: '16.00', booked: false, bookedCount: 0 },
        { time: '16.30', booked: false, bookedCount: 0 },
        { time: '17.00', booked: false, bookedCount: 0 },
        { time: '17.30', booked: false, bookedCount: 0 },
        { time: '18.00', booked: false, bookedCount: 0 },
        { time: '18.30', booked: false, bookedCount: 0 },
        { time: '19.00', booked: false, bookedCount: 0 },
        { time: '19.30', booked: false, bookedCount: 0 },
        { time: '20.00', booked: false, bookedCount: 0 },
      ],
    ];
    let alreadyDate: boolean = bookingOverview.some(
      // @ts-ignore
      el => el.date === userChoices?.date
    );

    //Loop through each pc and change booked === true for the times used, for every amount of PC booked
    userChoices?.amount && createBooking(userChoices?.amount, alreadyDate);
  }

  return (
    <>
      <article
        id='contactForm'
        className='w-full'
      >
        <div className='bg-contrastCol mt-6 p-4 lg:block '>
          <h4 className='mt-0'>Kontaktoplysnigner</h4>
          <p>
            Så mangler vi bare de sidste detaljer for at din booking er klaret! Udfyld navn, email
            og telefonnummer for at fuldføre din reservation.
          </p>
          <h4>Booking Oplysninger</h4>

          <p className='flex flex-row align-middle'>
            <FaCalendarAlt className='inline-block mr-3 text-accentCol' />{' '}
            <span>{formattedDate(dato as string)}</span>
          </p>
          <p className='flex flex-row align-middle'>
            <FaUserGroup className='inline-block mr-3 text-accentCol' />{' '}
            <span>{antal} computere</span>
          </p>
          <p className='flex flex-row align-middle'>
            <IoTime className='inline-block mr-3 text-accentCol' />
            <span>
              {timerImellem()} timer ({startTid} - {slutTid})
            </span>
          </p>
        </div>
      </article>
      <article>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleBooking)}
            className='w-full'
          >
            <FormField
              control={form.control}
              name='navn'
              render={({ field }) => (
                <FormItem className='mt-5'>
                  <FormLabel>Navn</FormLabel>
                  <FormControl>
                    <div
                      style={{ position: 'relative' }}
                      className={
                        form.formState.errors.navn || isBookingValid === false ? 'shake' : ''
                      }
                    >
                      <Input
                        placeholder='John Jensen'
                        style={{
                          borderColor:
                            form.formState.isSubmitted &&
                            (form.formState.errors.navn || isBookingValid === false)
                              ? 'red'
                              : isBookingValid === true
                              ? 'green'
                              : 'none',
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
                    <div
                      style={{ position: 'relative' }}
                      className={
                        form.formState.errors.email || isBookingValid === false ? 'shake' : ''
                      }
                    >
                      <Input
                        placeholder='john@jensen.dk'
                        style={{
                          borderColor:
                            form.formState.isSubmitted &&
                            (form.formState.errors.email || isBookingValid === false)
                              ? 'red'
                              : isBookingValid === true
                              ? 'green'
                              : 'none',
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
                    <div
                      style={{ position: 'relative' }}
                      className={
                        form.formState.errors.telefon || isBookingValid === false ? 'shake' : ''
                      }
                    >
                      <InputMask
                        className='flex h-10 w-full rounded bg-contrastCol px-3 py-2 border-b-transparent border-b-2 text-sm file:border-0 transition ease-in duration-300 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-secondaryCol disabled:cursor-not-allowed disabled:opacity-50'
                        placeholder='12 34 56 78'
                        mask='99 99 99 99'
                        maskChar=''
                        {...field}
                        id='telefon'
                        type='tel'
                        style={{
                          borderColor: form.formState.errors.telefon
                            ? 'red'
                            : form.formState.touchedFields.telefon
                            ? 'green'
                            : '',
                        }}
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
            <Button className='mt-4'>Book din tid</Button>
          </form>
        </Form>
      </article>
      {/* <button onClick={() => console.log(bookingOverview)}>Test</button>; */}
    </>
  );
};

export default BookingForm;
