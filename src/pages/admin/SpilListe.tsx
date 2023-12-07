import { useEffect, useState } from 'react';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchGameData, fetchDBGameData } from './spil';

import {
  addNewGameAtom,
  editGameAtom,
  gameIdAtom,
  showAddGameAtom,
  showEditGameAtom,
} from '../states/store';
import { AddGameSheet } from './AddGameSheet';
import { GameCard } from '@/components/GameCard/GameCard';
import { EditGameSheet } from './EditGameSheet';
import { supabase } from '../../../utils/supabaseClient';
import { useAtom } from 'jotai';
import { useQueries } from '@tanstack/react-query';

export const SpilListe = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [gameId, setGameId] = useAtom(gameIdAtom);
  const [addNewGame, setAddNewGame] = useAtom(addNewGameAtom);
  const [editGame, setEditGame] = useAtom(editGameAtom);
  const [open, setOpen] = useState<boolean>(false);
  const [addOpen, setAddOpen] = useAtom(showAddGameAtom);
  const [editOpen, setEditOpen] = useAtom(showEditGameAtom);

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

  useEffect(() => {
    if (gameId !== 0) {
      console.log('penis');
      setAddNewGame(gameData);
      setAddOpen(true);
    }
  }, [gameId && !gameDataIsLoading]);

  console.log('gameData & db', gameData && gameData?.results, dbGameData);
  return (
    <div>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            role='combobox'
            aria-expanded={open}
            className='justify-between max uppercase font-bold hover:bg-transparent border-2 border-accentCol transition-colors duration-300'
          >
            Tilføj spil
            <PlusCircle className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          className='w-[250px] overflow-hidden p-0 border-none'
        >
          <Command className='flex rounded bg-contrastCol border-b-transparent text-sm file:border-none transition ease-in duration-300 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-secondaryCol disabled:cursor-not-allowed disabled:opacity-50'>
            <CommandInput
              placeholder='Søg på et spil...'
              className='h-9'
              onValueChange={e => setSearchString(e)}
            />

            {gameData?.results && gameId == 0 && searchString.length > 3 && (
              <CommandList className='w-full h-full'>
                {gameData.results.map(game => (
                  <CommandItem
                    onSelect={() => {
                      setGameId(game.id);
                      setOpen(false);
                    }}
                  >
                    {game.name}
                  </CommandItem>
                ))}
              </CommandList>
            )}
          </Command>
        </PopoverContent>
      </Popover>

      <AddGameSheet
        game={addNewGame}
        dataLoading={gameDataIsFetching}
      />
      <EditGameSheet game={editGame} />

      <div className='flex flex-wrap gap-3 '>
        {dbGameData &&
          !dbGameDataIsLoading &&
          dbGameData.map(game => (
            <GameCard
              Name={game.title}
              Image_={`${game.background_image}`}
              Console={game.platforms.map(platform => platform.name)}
              Tags={game.tags.map(tag => tag.name)}
              Description={game.description}
              IsAdmin
              onClick={() => {
                console.log(game.title);
                setEditGame(game);
                setEditOpen(true);
                console.log(editGame);
              }}
            />
          ))}
      </div>
    </div>
  );
};
