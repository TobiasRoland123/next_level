import { Hero } from '@/modules/Hero/Hero';
import { supabase } from '../pages/utils/supabaseClient';

export async function getServerSideProps() {
  let { data: gamelist, error } = await supabase.from('gamelist').select('*');

  return { props: { gamelist } };
}
export default function Spil({ gamelist }: { gamelist: any }) {
  return (
    <>
      <Hero
        isFrontPage={false}
        header="Vores spil"
        redWord="spil"
        content="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters"
      />
      {gamelist &&
        gamelist.map(game => (
          <>
            <p>{game.title}</p>
            {game.platforms?.map(platform => (
              <p>{platform.name}</p>
            ))}
          </>
        ))}
    </>
  );
}
