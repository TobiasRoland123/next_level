import { LayoutAdmin } from '@/Layout_Admin';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { supabase } from '../../../utils/supabaseClient';
import { json } from 'stream/consumers';
import { UserBookingsProps } from '@/Types/adminBooking';
import { DataTable } from '@/components/BookingTable/data-table';
import { columns } from '@/components/BookingTable/columns';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteEntry } from '@/states/store';
import { useAtom } from 'jotai';
import { Bookings } from '@/Types/Bookings';

export async function getServerSideProps() {
  let { data: UserBookings } = await supabase.from('UserBookings').select('*');
  let { data: Bookings, error } = await supabase.from('Bookings').select('*');
  //console.log("error", error);

  return { props: { UserBookings, Bookings } };
}

export default function Booking({ UserBookings, Bookings }: { UserBookings: UserBookingsProps[]; Bookings: Bookings[] }) {
  const [showExpiredBookings, setShowExpiredBookings] = useState<Boolean>(false);
  const [openDialogAlert, setOpenDialogAlert] = useState(false);
  const [sendID, setSendID] = useAtom(deleteEntry);

  const sendToSupabaseBookings = async (object: any) => {
    const { data, error } = await supabase.from('Bookings').update([object]).eq('id', object.id).select();
    if (data) {
      //console.log("bookingData is updated!", data);
    } else if (error) {
      //console.log("error", error);
    }
  };
  const sendToSupabaseUserBookings = async (idValue: number | null) => {
    const { error } = await supabase.from('UserBookings').delete().eq('id', idValue);
    if (error) {
      //console.log("error", error);
    }
  };

  function seeBookings() {
    //console.log(Bookings);
  }

  useEffect(() => {
    if (sendID !== null) {
      setOpenDialogAlert(true);
    } else {
      setOpenDialogAlert(false);
    }
  }, [sendID]);

  function deleteBookingEntry(id: number | null) {
    //console.log(id);
    // get the Booking from the UserBookings
    const userBooking = () => {
      for (let i = 0; i < UserBookings.length; i++) {
        if (UserBookings[i].id === id) {
          return UserBookings[i];
        }
      }
    };
    const antal = userBooking()?.antal;
    const start = userBooking()?.startTid;
    const slut = userBooking()?.slutTid;
    const dato = userBooking()?.dato;
    const bookingID = userBooking()?.id;

    //console.log("antal", antal, "start", start, "slut", slut, "bookingID", bookingID);

    //Get the base times to remove
    const basePc = [
      { time: '14.00', booked: false },
      { time: '14.30', booked: false },
      { time: '15.00', booked: false },
      { time: '15.30', booked: false },
      { time: '16.00', booked: false },
      { time: '16.30', booked: false },
      { time: '17.00', booked: false },
      { time: '17.30', booked: false },
      { time: '18.00', booked: false },
      { time: '18.30', booked: false },
      { time: '19.00', booked: false },
      { time: '19.30', booked: false },
      { time: '20.00', booked: false },
    ];

    const startToBook = basePc.findIndex((index) => index.time === start);
    const endToBook = basePc.findIndex((index) => index.time === slut);
    const timesToBook = basePc.slice(startToBook, endToBook + 1).map((time) => time.time);
    //console.log("startToBook", startToBook);
    //console.log("endToBook", endToBook);
    //console.log("timesToBook", timesToBook);

    const dayBooking = () => {
      for (let i = 0; i < Bookings.length; i++) {
        //@ts-ignore
        if (Bookings[i].date === dato) {
          return Bookings[i];
        }
      }
    };

    //console.log(dayBooking());

    const tempBooking = [dayBooking()?.PC1, dayBooking()?.PC2, dayBooking()?.PC3, dayBooking()?.PC4, dayBooking()?.PC5];
    //console.log("tempBooking", tempBooking);

    let updatedExistingDay;
    for (let i = 1; i < 6; i++) {
      if (antal && i <= antal) {
        //console.log("i:", i, "userAmount:", antal);

        let updatedPcs = 0;

        updatedExistingDay = tempBooking.map((pc) => {
          //console.log("pc", pc);

          if (updatedPcs === timesToBook.length * antal) {
            return pc;
          } else {
            // @ts-ignore
            const newPcs = pc.map((timeSlot) => {
              //console.log("timeSlot", timeSlot);

              //@ts-ignore
              if (timesToBook.includes(timeSlot.time) && timeSlot.booked === true) {
                //@ts-ignore
                //console.log("im included: ", timeSlot.time);
                //@ts-ignore
                updatedPcs++;
                return { time: timeSlot.time, booked: false, bookedCount: 0 };
              } else {
                //@ts-ignore
                //console.log("im not included:", timeSlot.time);

                return timeSlot;
              }
            });
            return newPcs;
          }
        });
        //console.log("existingDay", dayBooking());
        //console.log("tempBooking", tempBooking);
        //console.log("updatedExistingDay", updatedExistingDay);
      }
    }

    const supabaseObject = updatedExistingDay && {
      id: dayBooking()?.id,
      date: userBooking()?.dato,
      PC1: updatedExistingDay[0],
      PC2: updatedExistingDay[1],
      PC3: updatedExistingDay[2],
      PC4: updatedExistingDay[3],
      PC5: updatedExistingDay[4],
      NLP: null,
    };
    //console.log("supabaseObject", supabaseObject);

    sendToSupabaseBookings(supabaseObject);
    sendToSupabaseUserBookings(id);
    setSendID(null);
  }

  const sortedBookings = (a: UserBookingsProps, b: UserBookingsProps) => {
    // Compare by "dato"
    const dateComparison = a.dato.toString().localeCompare(b.dato.toString());

    // If "dato" is the same, compare by "startTid"
    if (dateComparison === 0) {
      return a.startTid.localeCompare(b.startTid);
    }

    return dateComparison;
  };

  const bookingsToday = () => {
    const today = new Date().toISOString().split('T')[0];
    const bookings: UserBookingsProps[] = [];
    for (let i = 0; i < UserBookings.length; i++) {
      const userDate = UserBookings[i].dato.toString();
      if (userDate === today) {
        bookings.push(UserBookings[i]);
      }
    }

    const sortedbooking = bookings.sort(sortedBookings);
    //sort bookings according to start Time
    return sortedbooking;
  };
  const futureBookings = () => {
    //filter out dates from today and before today ++ sort according to starttimes.
    const today = new Date();

    // Filter the array based on date comparison
    const filteredArray = UserBookings.filter((item) => {
      const itemDate = new Date(item.dato);
      return itemDate >= today;
    });

    const sortedbooking = filteredArray.sort(sortedBookings);
    //sort bookings according to start Time

    return sortedbooking;
  };

  const allBookings = () => {
    //filter out dates from today and after today ++ sort according to starttimes.
    const today = new Date().toISOString().split('T')[0];
    const bookings: UserBookingsProps[] = [];
    for (let i = 0; i < UserBookings.length; i++) {
      const userDate = UserBookings[i].dato.toString();
      if (userDate !== today) {
        bookings.push(UserBookings[i]);
      }
    }
    const sortedbooking = bookings.sort(sortedBookings);
    //sort bookings according to start Time
    return sortedbooking;
  };

  // COMMENT OUT FROM HERE TO DISABLE LOGIN GUARD
  // const router = useRouter();

  // getSession();
  // async function getSession() {
  //   const { data, error } = await supabase.auth.getSession();
  //   if (data.session === null) {
  //     router.push('/login');
  //   }
  // }

  function showData() {
    //console.log("UserBookings", UserBookings);
    //console.log("Bookings", Bookings);
  }

  showData();

  function isChecked(e: any) {
    setShowExpiredBookings(e);
  }

  // En checkbox om du vil se forrige bookinger også, lav et tredje table under der viser disse.
  return (
    <>
      <LayoutAdmin>
        <main className='spacer pb-10 '>
          <h1 className='mt-20'>Administrer bookinger</h1>
          <section>
            <article>
              <h3>Bookinger i dag</h3>
              <div className='bg-contrastCol mt-8 p-4 lg:block flex align-middle justify-center bookingTable'>
                {bookingsToday().length < 1 ? (
                  <p className='m-0'>Ingen bookinger i dag.</p>
                ) : (
                  <DataTable
                    columns={columns}
                    data={bookingsToday()}
                    udløbne={false}
                  />
                )}
              </div>
            </article>
            <article>
              <h3>Alle bookinger</h3>
              {/* <DataTable columns={columns} data={futureBookings()} udløbne={true} onCheckedChange={(e: any) => isChecked(e)} /> */}
              <div className='bg-contrastCol mt-8 p-4 lg:block flex align-middle justify-center'>
                {UserBookings.length < 1 ? (
                  <p className='m-0'>Ingen bookinger.</p>
                ) : showExpiredBookings ? (
                  <DataTable
                    columns={columns}
                    data={allBookings()}
                    udløbne={true}
                    onCheckedChange={(e: any) => isChecked(e)}
                  />
                ) : (
                  <DataTable
                    columns={columns}
                    data={futureBookings()}
                    udløbne={true}
                    onCheckedChange={(e: any) => isChecked(e)}
                  />
                )}
              </div>
            </article>
          </section>
        </main>
        <AlertDialog
          open={openDialogAlert}
          onOpenChange={setOpenDialogAlert}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSendID(null)}>Fortryd</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteBookingEntry(sendID)}>Slet booking</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </LayoutAdmin>
    </>
  );
}
