import { LayoutAdmin } from '@/Layout_Admin';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { supabase } from '../../../utils/supabaseClient';
import { json } from 'stream/consumers';
import { UserBookingsProps } from '@/Types/adminBooking';
import { DataTable } from '@/components/BookingTable/data-table';
import { columns } from '@/components/BookingTable/columns';
import { useState } from 'react';

export async function getServerSideProps() {
  let { data: UserBookings, error } = await supabase.from('UserBookings').select('*');
  console.log(error);

  return { props: { UserBookings } };
}

export default function Booking({ UserBookings }: { UserBookings: UserBookingsProps[] }) {
  const [showExpiredBookings, setShowExpiredBookings] = useState<Boolean>(false);

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
    console.log(UserBookings);
    const today = new Date().toISOString().split('T')[0];
    const bookings: UserBookingsProps[] = [];
    for (let i = 0; i < UserBookings.length; i++) {
      const userDate = UserBookings[i].dato.toString();
      console.log('userDate', userDate, 'today', today);
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
    console.log(UserBookings);
    const today = new Date().toISOString().split('T')[0];
    const bookings: UserBookingsProps[] = [];
    for (let i = 0; i < UserBookings.length; i++) {
      const userDate = UserBookings[i].dato.toString();
      console.log('userDate', userDate, 'today', today);
      if (userDate !== today) {
        bookings.push(UserBookings[i]);
      }
    }
    const sortedbooking = bookings.sort(sortedBookings);
    //sort bookings according to start Time
    return sortedbooking;
    //sort bookings according to start Time
    return bookings;
  };

  // COMMENT OUT FROM HERE TO DISABLE LOGIN GUARD
  const router = useRouter();
  getSession();
  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session === null) {
      router.push('/login');
    }
  }

  function showData() {
    console.log(UserBookings);
    const dato = new Date(UserBookings[0].dato);
    console.log('dato', dato);
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
              <div className='bg-contrastCol mt-8 p-4 lg:block bookingTable'>
                {/* <DataTable columns={columns} data={UserBookings} udløbne={false} /> */}
                <DataTable columns={columns} data={bookingsToday()} udløbne={false} />
              </div>
            </article>
            <article>
              <h3>Alle bookinger</h3>
              {/* <DataTable columns={columns} data={futureBookings()} udløbne={true} onCheckedChange={(e: any) => isChecked(e)} /> */}
              <div className='bg-contrastCol mt-8 p-4 lg:block'>{showExpiredBookings ? <DataTable columns={columns} data={allBookings()} udløbne={true} onCheckedChange={(e: any) => isChecked(e)} /> : <DataTable columns={columns} data={futureBookings()} udløbne={true} onCheckedChange={(e: any) => isChecked(e)} />}</div>
            </article>
          </section>
        </main>
      </LayoutAdmin>
    </>
  );
}
