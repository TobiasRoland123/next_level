import { LayoutAdmin } from '@/Layout_Admin';
import { supabase } from '../utils/supabaseClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GameCardRoot } from '@/Types/gamecard';
import { GameRoot } from '@/Types/gamelist';

import { SpilListe } from './SpilListe';

const queryClient = new QueryClient();

export const fetchDBGameData = async () => {
  let { data, error } = await supabase.from('gamelist').select('*');
  return data as GameCardRoot[];
};

export const fetchGameData = async (searchString: string, gameId: number) => {
  const res = await fetch(`/api/gamelist?search=${searchString}&gameId=${gameId}`);
  const data: GameRoot = await res.json();
  return data;
};

export default function Spil() {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutAdmin>
        <main className="spacer flex flex-col w-full">
          <h1 className="mt-20">Admin Spil</h1>
          <div className="flex justify-center w-full">
            <SpilListe />
          </div>
        </main>
      </LayoutAdmin>
    </QueryClientProvider>
  );
}
