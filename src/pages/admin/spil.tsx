import { LayoutAdmin } from '@/Layout_Admin';
import { GameCardRoot } from '@/Types/gamecard';
import { GameRoot } from '@/Types/gamelist';
import { SpilListe } from '../../modules/GameListAdmin/SpilListe';
import { supabase } from '../../../utils/supabaseClient';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export const fetchDBGameData = async () => {
  let { data, error } = await supabase.from('gamelist').select('*');
  return data as GameCardRoot[];
};

export const fetchGameData = async (searchString: string, gameId: number) => {
  const res = await fetch(`/api/gamelist?search=${searchString}&gameId=${gameId}`);
  const data = await res.json();
  return data;
};

export default function Spil() {
  const router = useRouter();
  // COMMENT OUT FROM HERE TO DISABLE LOGIN GUARD
  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (data.session === null) {
        router.push('/login');
      }
    }

    getSession();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutAdmin>
        <main>
          <section>
            <div className='flex justify-center'>
              <div className='spacer w-full'>
                <h1 className='mt-20'>Admin Spil</h1>
                <p>
                  Her kan du administrere hvilke spil, som er til rådighed i jeres sortiment. Det er muligt at tilføje, redigere
                  og fjerne spil.
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className='flex justify-center'>
              <div className='spacer w-full'>
                <SpilListe />
              </div>
            </div>
          </section>
        </main>
      </LayoutAdmin>
    </QueryClientProvider>
  );
}
