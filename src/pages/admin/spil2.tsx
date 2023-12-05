import { LayoutAdmin } from '@/Layout_Admin';
import { supabase } from '../utils/supabaseClient';
import { QueryClient, QueryClientProvider, useQueries, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { GameCardRoot } from '@/Types/gamecard';
import { GameRoot } from '@/Types/gamelist';

const queryClient = new QueryClient();

const fetchDBGameData = async () => {
  let { data, error } = await supabase.from('gamelist').select('*');
  return data as GameCardRoot[];
};

const fetchGameData = async (searchString: string, gameId: number) => {
  const res = await fetch(`/api/gamelist?search=${searchString}&gameId=${gameId}`);
  const data: GameRoot = await res.json();
  return data;
};

/* export async function getGames(searchString: string, gameId: number) {
  const response = await fetch(`/api/gamelist?search=${searchString}&gameId=${gameId}`);

  if (response.ok) {
    const data = await response.json();
    console.log('data games function', data);

    return data;
  }
} */

export default function Spil() {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutAdmin>
        <SpilListe />
      </LayoutAdmin>
    </QueryClientProvider>
  );
}

export const SpilListe = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [gameId, setGameId] = useState<number>(0);

  const gameTags = [''];

  /* Subscribe til supabase ændringer */
  supabase
    .channel('room1')
    .on('postgres_changes', { event: '*', schema: '*' }, payload => {
      console.log('Change received!', payload);
    })
    .subscribe();

  const results = useQueries({
    queries: [
      {
        queryKey: ['hydrate-gameData', searchString, gameId],
        queryFn: () => fetchGameData(searchString, gameId),
      },
      {
        queryKey: ['hydrate-gameDBData'],
        queryFn: () => fetchDBGameData(),
      },
    ],
  });

  const {
    data: gameData,
    isLoading: gameDataIsLoading,
    isFetching: gameDataIsFetching,
    error: gameDataError,
  } = results[0];

  const {
    data: dbGameData,
    isLoading: dbGameDataIsLoading,
    isFetching: dbGameDataIsFetching,
    error: dbGameDataError,
  } = results[1];

  console.log('gameData & db', gameData && gameData?.results, dbGameData);
  return (
    <>
      {gameData &&
        gameId == 0 &&
        gameData.results.map(game => (
          <p
            onClick={() => setGameId(game.id)}
            key={game.id}
          >
            {game.name}
          </p>
        ))}
      {dbGameData?.map(game => (
        <p key={game.id}>{game.title}</p>
      ))}
    </>
  );
};
