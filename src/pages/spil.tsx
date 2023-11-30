import { Hero } from '@/modules/Hero/Hero';
import { supabase } from '../pages/utils/supabaseClient';
import { GameCard } from '@/components/GameCard/GameCard';
import { GameRoot, PlatformArr, Result, Tag } from '@/Types/gamelist';

export async function getServerSideProps() {
  let { data: gamelist, error } = await supabase.from('gamelist').select('*');

  return { props: { gamelist } };
}
export default function Spil({ gamelist }: { gamelist: Result[] }) {
  return (
    <>
      <Hero
        isFrontPage={false}
        header="Vores spil"
        redWord="spil"
        content="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters"
      />

      <section>
        <div className="flex justify-center">
          <div className="spacer w-full ">
            <div className="flex flex-wrap gap-6 justify-center md:justify-between lg:justify-start">
              {gamelist &&
                gamelist.map(game => (
                  <div
                    key={game.id}
                    className="mb-10 "
                  >
                    <GameCard
                      Name={game.title}
                      Image_={`${game.background_image}`}
                      Console={game.platforms.map(platform => platform.name)}
                      Tags={game.tags.map(tag => tag.name)}
                      Description={game.description}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
