import { LayoutAdmin } from '@/Layout_Admin';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { supabase } from '../../../utils/supabaseClient';

export default function Admin() {
  // COMMENT OUT FROM HERE TO DISABLE LOGIN GUARD
  const router = useRouter();

  getSession();
  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session === null) {
      router.push('/login');
      router.push('/login');
    }
  }
  // COMMENT OUT TO HERE TO DISABLE LOGIN GUARD
  return (
    <>
      <LayoutAdmin>
        <main className='spacer'>
          <h1 className='mt-20'> Admin site </h1>
          <div className=' flex flex-col gap-4 mt-6'>
            <a
              href='/admin/spil'
              className='underline text-accentCol hover:text-blue-600'
            >
              Her kan du tilføje/fjerne eller ændre spil.
            </a>
            <a
              href='/admin/spil'
              className='underline text-accentCol hover:text-blue-600'
            >
              Eller du kan se / slette PC bookinger.
            </a>
          </div>
        </main>
      </LayoutAdmin>
    </>
  );
}
