import { supabase } from '../utils/supabaseClient';
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
import { addNewGameAtom, gameIdAtom, showAddGameAtom } from '../states/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import ControlledEditableField from './ControlledEditableField';
import ControlledEditableTextarea from './ControlledEditableTextarea';
import { Label } from '@/components/Inputfields/label';
import Image from 'next/image';

export const AddGameSheet = (game: Game) => {
  const [addOpen, setAddOpen] = useAtom(showAddGameAtom);
  const [gameId, setGameId] = useAtom(gameIdAtom);
  const [addNewGame, setAddNewGame] = useAtom(addNewGameAtom);
  const [chosenGameTags, setChosenGameTags] = useState<Array<string>>([]);
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

  const queryClient = useQueryClient();

  const gameTags = [
    { name: 'Action', value: 0 },
    { name: 'Adventure', value: 1 },
    { name: 'Role-Playing Game (RPG)', value: 2 },
    { name: 'Shooter', value: 3 },
    { name: 'Simulation', value: 4 },
    { name: 'Strategy', value: 5 },
    { name: 'Sports', value: 6 },
    { name: 'Multiplayer', value: 7 },
    { name: 'Indie', value: 8 },
    { name: 'Open World', value: 9 },
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
      platforms: addNewGame?.platforms || [],
      tags: [],
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
    console.log('Submitted data', gameData);
    console.log('selected tags', selectedTags);

    gameData.tags = selectedTags;
    gameData.platforms = selectedPlatform;

    const { data, error } = await supabase.from('gamelist').insert([gameData]).select();

    queryClient.invalidateQueries({ queryKey: ['hydrate-gameDBData'] });

    if (error) {
      console.error('Supabase error:', error);
      // Handle the error appropriately
      return;
    }
  };

  console.log(game);
  const handleClose = () => {
    setGameId(0);
    setAddOpen(false);
  };

  return (
    <>
      <Sheet
        open={addOpen}
        onOpenChange={() => handleClose()}
      >
        <SheetContent className="w-[400px] overflow-scroll">
          <SheetHeader>
            <SheetTitle>Rediger spil</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>
            {addNewGame?.background_image && (
              <Image
                src={addNewGame?.background_image}
                alt=""
                width={500}
                height={500}
              />
            )}
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label>Spiltitel</Label>
                <ControlledEditableField
                  control={control}
                  name="title"
                  type="text"
                  hasError={errors.title}
                  placeholder="spiltitel"
                />
              </div>

              <div>
                <Label>Beskrivelse</Label>
                <ControlledEditableTextarea
                  control={control}
                  name="description"
                  type="text"
                  hasError={errors.description}
                  placeholder="Spilbeskrivelse"
                />
              </div>

              <div>
                <Label>Konsoller</Label>
                <div className="flex gap-1">
                  {consoles.map((console, index) => (
                    <div className="bg-contrastCol w-fit px-2 rounded-full">
                      <Label key={index}>
                        <input
                          value={console.value}
                          type="checkbox"
                          {...register('platforms')}
                          onChange={() => handlePlatformChange(console)}
                        />
                        {console.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Tags</Label>
                <div className="flex gap-1 flex-wrap">
                  {gameTags.map((tag, index) => (
                    <div className="bg-contrastCol w-fit px-2 rounded-full">
                      <Label key={index}>
                        <input
                          disabled
                          type="checkbox"
                          {...register('tags')}
                          onChange={() => handleCheckboxChange(tag)}
                        />
                        {tag.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <input type="submit" />
              </div>
            </form>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
