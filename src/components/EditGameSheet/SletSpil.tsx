import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { editGameAtom, showEditGameAtom } from '../../states/store';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { supabase } from '../../../utils/supabaseClient';

export const SletSpil = () => {
  const [editOpen, setEditOpen] = useAtom(showEditGameAtom);
  const [editGame, setEditGame] = useAtom(editGameAtom);
  const queryClient = useQueryClient();
  const handleDeleteGame = async () => {
    const { data, error } = await supabase.from('gamelist').delete().eq('id', editGame.id);
    queryClient.invalidateQueries({ queryKey: ['hydrate-gameDBData'] });
    setEditOpen(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          className='max uppercase font-bold hover:bg-transparent border-2 border-accentCol transition-colors duration-300'
          size='sm'
          type='button'
        >
          Slet
        </Button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogContent className='border-none max-w-[500px]'>
          <AlertDialogHeader>
            <h4>Er du sikker?</h4>
          </AlertDialogHeader>
          <AlertDialogDescription>
            <p>
              Denne handling kan ikke fortrydes. Dette vil permanent slette spillet og vil selv
              skulle tilføje det igen.
            </p>
          </AlertDialogDescription>
          <div className='flex justify-end gap-3'>
            <AlertDialogAction asChild>
              <Button
                className='w-fit uppercase font-bold hover:bg-transparent border-2 border-accentCol transition-colors duration-300'
                size='sm'
                onClick={() => handleDeleteGame()}
              >
                Slet
              </Button>
            </AlertDialogAction>
            <AlertDialogCancel asChild>
              <Button
                className='w-fit uppercase font-bold hover:bg-transparent border-2 border-accentCol transition-colors duration-300'
                size='sm'
              >
                Fortryd
              </Button>
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};
