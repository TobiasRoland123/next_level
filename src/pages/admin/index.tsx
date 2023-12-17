import { LayoutAdmin } from '@/Layout_Admin';
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
          <p>Her kan du tilføje/fjerne eller ændre spil.</p>
          <p>Eller du kan se / slette PC bookinger.</p>
        </main>
      </LayoutAdmin>
    </>
  );
}
