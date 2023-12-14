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
    }
  }
  // COMMENT OUT TO HERE TO DISABLE LOGIN GUARD
  return (
    <>
      <LayoutAdmin>
        <main>
          <h1 className='mt-20'> Admin site </h1>
        </main>
      </LayoutAdmin>
    </>
  );
}
