import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Game } from '@/Types/gamelist';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useAtom } from 'jotai';
import { addNewGameAtom, gameIdAtom, showAddGameAtom } from '../../states/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import ControlledEditableField from '../EditableInputField/ControlledEditableField';
import ControlledEditableTextarea from '../ControlledEditableTextArea/ControlledEditableTextarea';
import { Label } from '@/components/Inputfields/label';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '../../../utils/supabaseClient';
import { Checkbox } from '../ui/checkbox';

export const AddGameSheet = (game: Game) => {
  const [addOpen, setAddOpen] = useAtom(showAddGameAtom);
  const [gameId, setGameId] = useAtom(gameIdAtom);
  const [addNewGame, setAddNewGame] = useAtom(addNewGameAtom);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedTags, setSelectedTags] = useState<Array<{ name: string; value: number }>>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Array<{ name: string; value: number }>>(
    []
  );

  const handleCheckboxChange = (tag: { name: string; value: number }) => {
    if (selectedTags.some(selectedTag => selectedTag.value === tag.value)) {
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag.value !== tag.value));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePlatformChange = (platform: { name: string; value: number }) => {
    if (selectedPlatform.some(selectedPlatform => selectedPlatform.value === platform.value)) {
      setSelectedPlatform(
        selectedPlatform.filter(selectedPlatform => selectedPlatform.value !== platform.value)
      );
    } else {
      setSelectedPlatform([...selectedPlatform, platform]);
    }
  };

  const handleImageLoad = () => {
    console.log('Is loaded now');

    setIsLoaded(true);
  };

  const queryClient = useQueryClient();

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

  const consoles = [
    { name: 'PC', value: 0 },
    { name: 'PS5', value: 1 },
    { name: 'VR', value: 2 },
  ];

  console.log('add new game', addNewGame);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    register,
  } = useForm<Game>({
    defaultValues: {
      id: addNewGame?.id || undefined,
      title: addNewGame?.name || '',
      platforms: selectedPlatform || [],
      tags: addNewGame?.tags || [],
      description: addNewGame?.description_raw || '',
      background_image: addNewGame?.background_image || '',
    },
  });

  useEffect(() => {
    setValue('id', addNewGame?.id || 0);
    setValue('title', addNewGame?.name || '');
    setValue('description', addNewGame?.description_raw || '');
    setValue('background_image', addNewGame?.background_image || '');
  }, [addNewGame, setValue]);

  const onSubmit: SubmitHandler<Game> = async gameData => {
    setSubmitting(true);
    console.log('Submitted data', gameData);
    console.log('selected tags', selectedTags);
    gameData.tags = selectedTags;
    gameData.platforms = selectedPlatform;

    const { data, error } = await supabase.from('gamelist').insert([gameData]).select();

    queryClient.invalidateQueries({ queryKey: ['hydrate-gameDBData'] });

    if (error) {
      console.error('Supabase error:', error);
      return;
    }

    console.log('before', selectedTags);

    setSelectedPlatform([]);
    setSelectedTags([]);

    console.log('after', selectedTags);

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setGameId(0);
      setAddOpen(false);
      console.log('on close', selectedTags);
    }, 3000);
  };

  console.log(game);
  const handleClose = () => {
    setGameId(0);
    setAddOpen(false);
    setIsLoaded(false);
  };

  return (
    <>
      <Sheet
        open={addOpen}
        onOpenChange={() => handleClose()}
      >
        <SheetContent className='w-[400px] overflow-scroll border-none'>
          <SheetHeader>
            <SheetTitle>Tilføj spil</SheetTitle>
            <SheetDescription></SheetDescription>
            {!isLoaded && <Skeleton className='w-[350px] h-[200px]' />}
            {addNewGame?.background_image && (
              <div className={`${!isLoaded && 'h-0 w-0'}`}>
                <Image
                  src={addNewGame?.background_image}
                  className='aspect-video'
                  alt=''
                  width={350}
                  height={200}
                  quality={10}
                  onLoad={() => {
                    setIsLoaded(true);
                  }}
                />
              </div>
            )}
            <form
              className='flex flex-col gap-3'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label>Spiltitel</Label>
                <ControlledEditableField
                  control={control}
                  name='title'
                  type='text'
                  hasError={errors.title}
                  placeholder='spiltitel'
                />
              </div>

              <div>
                <Label>Beskrivelse</Label>
                <ControlledEditableTextarea
                  control={control}
                  name='description'
                  type='text'
                  hasError={errors.description}
                  placeholder='Spilbeskrivelse'
                />
              </div>

              <div>
                <Label>Platforme</Label>
                <div className='flex gap-1'>
                  {consoles.map((console, index) => (
                    <div
                      className={`${
                        selectedPlatform.some(p => p.value === console.value)
                          ? 'bg-accentCol'
                          : 'bg-contrastCol'
                      } w-fit px-2 rounded-full transition ease-in-out duration-150  `}
                    >
                      <Label
                        className='flex h-5 items-center gap-1'
                        key={index}
                      >
                        <Checkbox
                          className={`border-none transition-all ease-in-out data-[state=checked]:bg-transparent duration-150 ${
                            selectedPlatform.some(p => p.value === console.value)
                              ? 'w-4 opacity-100'
                              : 'w-0 opacity-0'
                          } `}
                          value={console.value}
                          checked={selectedPlatform.some(p => p.value === console.value)}
                          {...register('platforms')}
                          onCheckedChange={() => handlePlatformChange(console)}
                        />
                        {console.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Tags</Label>
                <div className='flex gap-1 flex-wrap'>
                  {gameTags.map((tag, index) => (
                    <div
                      className={`${
                        selectedTags.some(p => p.value === tag.value)
                          ? 'bg-accentCol'
                          : 'bg-contrastCol'
                      } w-fit px-2 rounded-full ${
                        !selectedTags.some(p => p.value === tag.value) && selectedTags.length >= 3
                          ? 'opacity-25'
                          : ''
                      } transition ease-in-out duration-150 `}
                    >
                      <Label
                        className='flex h-5 items-center gap-1'
                        key={index}
                      >
                        <Checkbox
                          value={tag.value}
                          className={`border-none transition-all ease-in-out data-[state=checked]:bg-transparent duration-150 ${
                            selectedTags.some(p => p.value === tag.value)
                              ? 'w-4 opacity-100'
                              : 'w-0 opacity-0'
                          }`}
                          checked={selectedTags.some(p => p.value === tag.value)}
                          {...register('tags')}
                          onCheckedChange={() => handleCheckboxChange(tag)}
                          disabled={
                            !selectedTags.some(p => p.value === tag.value) &&
                            selectedTags.length >= 3
                          }
                        />
                        {tag.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Button
                  className='max uppercase font-bold hover:bg-transparent border-2 border-accentCol transition-colors duration-300'
                  type='submit'
                  size='sm'
                >
                  {submitting
                    ? 'Tilføjer spil...'
                    : submitted
                    ? 'Spillet er blevet tilføjet!'
                    : 'Tilføj spil'}
                </Button>
              </div>
            </form>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
