import { useEffect, useState } from 'react';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchGameData, fetchDBGameData } from '../../pages/admin/spil';
import {
  addNewGameAtom,
  editGameAtom,
  gameIdAtom,
  showAddGameAtom,
  showEditGameAtom,
} from '../../states/store';
import { AddGameSheet } from '../../components/AddGameSheet/AddGameSheet';
import { GameCard } from '@/components/GameCard/GameCard';
import { EditGameSheet } from '../../components/EditGameSheet/EditGameSheet';
import { supabase } from '../../../utils/supabaseClient';
import { useAtom } from 'jotai';
import { useQueries } from '@tanstack/react-query';
import { Result } from '@/Types/gamelist';
import { GameCardRoot } from '@/Types/gamecard';
import { FilterField } from '@/components/FilterField/FilterField';
import { AscendingDescending } from '@/components/AscendingDescending/AscendingDescending';

export const SpilListe = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [gameId, setGameId] = useAtom(gameIdAtom);
  const [addNewGame, setAddNewGame] = useAtom(addNewGameAtom);
  const [editGame, setEditGame] = useAtom(editGameAtom);
  const [open, setOpen] = useState<boolean>(false);
  const [addOpen, setAddOpen] = useAtom(showAddGameAtom);
  const [editOpen, setEditOpen] = useAtom(showEditGameAtom);
  const [acsending, setAcsedning] = useState(true);
  const [genreValue, setGenreValue] = useState('');
  const [searchValue, setSearcheValue] = useState('');
  const [filteredGames, setFilteredGames] = useState<GameCardRoot[] | null>(null);

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

  const { data: gameData, isLoading: gameDataIsLoading } = results[0];

  const { data: dbGameData, isLoading: dbGameDataIsLoading } = results[1];

  /* Filter funktion */

  const gameTags = [
    { name: 'Action', value: 0 },
    { name: 'Adventure', value: 1 },
    { name: 'RPG', value: 2 },
    { name: 'Shooter', value: 3 },
    { name: 'Simulation', value: 4 },
    { name: 'Strategy', value: 5 },
    { name: 'Sports', value: 6 },
    { name: 'Multiplayer', value: 7 },
    { name: 'Indie', value: 8 },
    { name: 'Open World', value: 9 },
    { name: 'MOBA', value: 10 },
    { name: 'Competitive', value: 11 },
    { name: 'FPS', value: 12 },
    { name: 'Party', value: 13 },
    { name: 'Battle Royale', value: 14 },
    { name: 'Racing', value: 15 },
    { name: 'Co-op', value: 16 },
    { name: 'Survival', value: 17 },
  ];

  const handleSelectChange = (value: string, type: string) => {
    type === 'genre' && setGenreValue(value);
    type === 'search' && setSearcheValue(value);
  };

  const onChangeSort = () => {
    setAcsedning(!acsending);
  };

  const filterGames = (genreValue: string, searchValue: string) => {
    if (dbGameData) {
      const filteredGameList = dbGameData.filter(game => {
        const hasGenre =
          genreValue && genreValue !== 'Alle'
            ? game.tags.some(tag => tag.name === genreValue)
            : true;
        const matchesSearch = searchValue
          ? game.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            game.id.toString().includes(searchValue.toLowerCase()) ||
            game.platforms.some(
              platform => platform.name.toString().toLowerCase() === searchValue.toLowerCase()
            ) ||
            game.tags.some(tag => tag.name.toLowerCase() === searchValue.toLowerCase())
          : true;

        return hasGenre && matchesSearch;
      });
      const sortedGames = filteredGameList?.sort((a, b) => {
        return acsending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      });

      setFilteredGames(sortedGames);
      console.log('filteredGameList: ', filteredGameList.length);
    }
  };

  useEffect(() => {
    filterGames(genreValue, searchValue);
  }, [dbGameData, acsending, genreValue, searchValue]);

  useEffect(() => {
    if (gameId !== 0) {
      const selectedGameData = gameData;
      setAddNewGame(selectedGameData);
      setAddOpen(true);
    }
  }, [gameId && !gameDataIsLoading]);

  /* Image loader */

  console.log('gameData & db', gameData && gameData?.results, dbGameData);
  return (
    <div className='w-full flex flex-col gap-3'>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <div className='flex items-center w-full md:justify-between flex-wrap gap-6 mb-6'>
          <PopoverTrigger asChild>
            <Button
              role='combobox'
              aria-expanded={open}
              size='default'
              className='justify-between w-fit uppercase font-bold hover:bg-transparent hover:border-accentCol rounded border-2 border-transparent transition-colors duration-300 md:mr-auto'
            >
              Tilføj spil
              <PlusCircle className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>

          <FilterField
            filterType='search'
            inputPlaceholder='Søg'
            onChange={handleSelectChange}
          />

          <AscendingDescending
            onChange={onChangeSort}
            trueState='A-Z'
            falseState='Z-A'
            pressed={acsending}
            className=' md:order-2 w-fit'
          />

          <FilterField
            filterType='dropDown'
            dropDownHeader='Genre'
            dropDownItems={gameTags.map(tag => tag.name)}
            onChange={handleSelectChange}
          />
        </div>
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
                {gameData.results.map((game: Result) => (
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

      <AddGameSheet {...addNewGame} />
      <EditGameSheet {...editGame} />

      <div className='flex flex-wrap gap-6 justify-center sm:justify-between lg:grid lg:grid-cols-3 xl:grid-cols-4'>
        {dbGameData &&
          !dbGameDataIsLoading &&
          filteredGames &&
          filteredGames.map(game => (
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

export default SpilListe;
