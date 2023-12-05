import { GameRoot, Platform, Tag, Game } from '@/Types/gamelist';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { LayoutAdmin } from '@/Layout_Admin';
import { useDebounce } from 'usehooks-ts';

import { Command, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { GameCardRoot } from '@/Types/gamecard';
import { GameCard } from '@/components/GameCard/GameCard';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/Inputfields/Inputfield';
import { Textarea } from '@/components/Textarea/textarea';

export async function getServerSideProps() {
  let { data: gamelist, error } = await supabase.from('gamelist').select('*');

  const channels = supabase
    .channel('custom-all-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'gamelist' }, payload => {
      console.log('Change received!', payload);
    })
    .subscribe();

  return { props: { gamelist, channels } };
}

export async function getGames(searchString: string, gameId: number) {
  const response = await fetch(`/api/gamelist?search=${searchString}&gameId=${gameId}`);

  if (response.ok) {
    const data = await response.json();
    console.log('data games function', data);

    return data;
  }
}

export default function Spil({ gamelist }: { gamelist: GameCardRoot[] }) {
  const [gameData, setGameData] = useState<GameRoot>();
  const [searchString, setSearchString] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchString, 1000);
  const [gameId, setGameId] = useState(0);
  const [gameList, setGameList] = useState<GameCardRoot[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [showEditGame, setShowEditGame] = useState(false);
  const [showAddGame, setShowAddGame] = useState(false);
  const [editGame, setEditGame] = useState<GameCardRoot>();
  const [addGame, setAddGame] = useState<Game>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forceRender, setForceRender] = useState(false);
  const [gameListLoading, setGameListLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log('game list', gamelist);

  let headings = Object.keys(gamelist[1]);

  // COMMENT OUT FROM HERE TO DISABLE LOGIN GUARD
  const router = useRouter();
  const supabase = createClient(
    'https://zwcshwxjwoffkdrdvbtp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Y3Nod3hqd29mZmtkcmR2YnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNzg5NzgsImV4cCI6MjAxNjY1NDk3OH0.yq0erC0CIBZmUG9uMC8u1YVyG4g2dsf3PrpekxJDq34'
  );
  getSession();
  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session === null) {
      router.push('/login');
    }
  }

  /* GAME LIST HANDLERS */

  /* GAME LIST FETCH */

  const handleFieldChange = (fieldName: string, newValue: string) => {
    console.log(`Field ${fieldName} changed to: ${newValue}`);
  };

  async function handleAddGame(game: Game) {
    console.log('Add game selected', game);
    const saveGame = {
      id: game?.id,
      title: game?.name,
      background_image: game?.background_image,
      description: game?.description,
      platforms: selectedPlatforms.map(platform => ({
        id: platform.id,
        name: platform.name,
        slug: platform.slug,
      })),
      tags: selectedTags.map(tag => ({ id: tag.id, name: tag.name, slug: tag.slug })),
    };

    const { data, error } = await supabase.from('gamelist').insert([saveGame]).select();

    if (error) {
      console.error('Supabase error:', error);
      // Handle the error appropriately
      return;
    }

    const updatedList = [...gameList, saveGame];

    setSelectedPlatforms([]);
    setSelectedTags([]);

    return console.log('payload', saveGame), setGameList(updatedList as GameCardRoot[]);
  }

  async function handleEditClick() {
    const saveGame = {
      id: editGame?.id,
      title: editGame?.title,
      background_image: editGame?.background_image,
      description: editGame?.description,
      platforms: selectedPlatforms.map(platform => ({
        id: platform.id,
        name: platform.name,
        slug: platform.slug,
      })),
      tags: selectedTags.map(tag => ({ id: tag.id, name: tag.name, slug: tag.slug })),
    };

    const { data, error } = await supabase
      .from('gamelist')
      .update([saveGame])
      .eq('id', editGame?.id);

    if (error) {
      console.error('Supabase error:', error);
      // Handle the error appropriately
      return;
    }

    setSelectedPlatforms([]);
    setSelectedTags([]);
    setShowEditGame(false);

    return console.log('payload', saveGame);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/gamelist?search=${searchString}&gameId=${gameId}`);
        if (response.ok) {
          const jsonData = await response.json();
          console.log('data', jsonData);

          setGameData(jsonData);
          setIsLoading(false);
        } else {
          console.error('api req failed');
        }
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchData();
  }, [debouncedValue, gameId, forceRender]);

  useEffect(() => {
    console.log('gameData updated:', gameData);
  }, [gameData]);

  console.log('game data', gameData);

  // COMMENT OUT TO HERE TO DISABLE LOGIN GUARD
  return (
    <>
      <LayoutAdmin>
        <main className="spacer w-full">
          <h1 className="mt-20">Admin Spil</h1>
          <div className="">
            {isClient && (
              <div>
                <Popover
                  open={open}
                  onOpenChange={setOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[250px] justify-between max"
                    >
                      <p className="text-ellipsis overflow-hidden ... mt-0">{value}</p>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[250px]overflow-hidden p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search game..."
                        className="h-9"
                        onValueChange={e => setSearchString(e)}
                      />

                      {!isLoading && (
                        <CommandGroup className="w-full h-full">
                          {gameData &&
                            gameData?.results &&
                            gameData?.results.length > 0 &&
                            gameData?.results.map((game, index) => {
                              return (
                                <p
                                  key={parseInt(game.id)}
                                  /* value={game.id}
                                onSelect={currentValue => {
                                  setValue(currentValue === value ? '' : currentValue);

                                  console.log('value', currentValue);

                                  setOpen(false);
                                  setShowAddGame(true);
                                  setAddGame(game);
                                }} */
                                >
                                  {game.name}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      value === game.name ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </p>
                              );
                            })}
                        </CommandGroup>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <div className="flex flex-wrap gap-3 ">
              {gamelist &&
                !gameListLoading &&
                gamelist.map(game => (
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
                      setShowEditGame(true);
                      console.log(editGame);
                    }}
                  />
                ))}
            </div>
          </div>
        </main>

        {editGame && (
          <Sheet
            open={showEditGame}
            onOpenChange={() => setShowEditGame(showEditGame ? false : true)}
          >
            <SheetContent className="w-[400px]">
              <SheetHeader>
                <SheetTitle>Rediger spil</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </SheetDescription>
              </SheetHeader>

              <>
                <div>
                  <Label htmlFor={editGame.title}>Spil titel</Label>
                  <Input
                    id={editGame.title}
                    value={editGame.title}
                    className=""
                    onChange={e => setEditGame({ ...editGame, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor={editGame.description}>Beskrivelse</Label>
                  <Textarea
                    id={editGame.description}
                    value={editGame.description}
                    onChange={e => setEditGame({ ...editGame, description: e.target.value })}
                    className="resize-none"
                  />
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-3">
                    {editGame.tags.map(tag => (
                      <div className="flex items-center gap-1 bg-contrastCol rounded-full px-2">
                        <label>
                          <input
                            type="checkbox"
                            className="h-3"
                          />{' '}
                          {tag.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Platforms</Label>
                  <div className="flex flex-wrap gap-3">
                    {editGame.platforms.map(platform => (
                      <div className="flex items-center gap-1 bg-contrastCol rounded-full px-2">
                        <label>
                          <input
                            type="checkbox"
                            className="h-3"
                          />{' '}
                          {platform.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button onClick={() => handleEditClick()}></Button>
              </>
            </SheetContent>
          </Sheet>
        )}
        {addGame && (
          <Sheet
            open={showAddGame}
            onOpenChange={() => setShowAddGame(showAddGame ? false : true)}
          >
            <SheetContent className="w-[400px] overflow-scroll">
              <SheetHeader>
                <SheetTitle>Tilføj spil</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </SheetDescription>
              </SheetHeader>
              <>
                <div>
                  <Label htmlFor={addGame.name}>Spil titel</Label>
                  <Input
                    id={addGame.name}
                    value={addGame.name}
                    className=""
                  />
                </div>
                <div>
                  <Label htmlFor={addGame.description}>Beskrivelse</Label>
                  <Textarea
                    id={addGame.description}
                    value={addGame.description}
                    onChange={e => handleFieldChange(addGame.description, e.target.value)}
                    className="resize-none"
                  />
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-3">
                    {addGame.tags.map(tag => (
                      <div
                        className={`flex items-center gap-1 ${
                          tag.checked ? 'bg-accentCol' : 'bg-contrastCol'
                        }  rounded-full px-2`}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={tag.checked}
                            onClick={() => (tag.checked = true)}
                            className="h-3"
                          />{' '}
                          {tag.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            </SheetContent>
          </Sheet>
        )}
      </LayoutAdmin>
    </>
  );
}
