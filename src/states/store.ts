import { Game, GameRoot } from '@/Types/gamelist';
import { atom } from 'jotai';

export const showAddGameAtom = atom<boolean>(false);
export const showEditGameAtom = atom<boolean>(false);
export const gameIdAtom = atom<number>(0);
export const addNewGameAtom = atom<Game>({} as Game);
export const editGameAtom = atom<Game>({} as Game);
