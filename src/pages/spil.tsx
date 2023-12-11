import { supabase } from "../../utils/supabaseClient";
import { GameCard } from "@/components/GameCard/GameCard";
import { GameCardRoot } from "@/Types/gamecard";
import { Layout } from "@/Layout";
import { Hero } from "@/modules/Hero/Hero";
import { FilterField } from "@/components/FilterField/FilterField";
import { useEffect, useState } from "react";
import { AscendingDescending } from "@/components/AscendingDescending/AscendingDescending";

export async function getServerSideProps() {
  let { data: gamelist, error } = await supabase.from("gamelist").select("*");
  console.log(gamelist);

  return { props: { gamelist } };
}

export default function Spil({ gamelist }: { gamelist: GameCardRoot[] }) {
  // set Up useState
  const [acsending, setAcsedning] = useState(true);
  const [genreValue, setGenreValue] = useState("");
  const [searchValue, setSearcheValue] = useState("");

  const [filteredGames, setFilteredGames] = useState<GameCardRoot[] | null>(null);

  const handleSelectChange = (value: string, type: string) => {
    type === "genre" && setGenreValue(value);
    type === "search" && setSearcheValue(value);
  };

  const onChangeSort = () => {
    setAcsedning(!acsending);
  };

  const filterGames = (genreValue: string, searchValue: string) => {
    const filteredGameList = gamelist.filter((game) => {
      const hasGenre = genreValue && genreValue !== "Alle" ? game.tags.some((tag) => tag.name === genreValue) : true;
      const matchesSearch = searchValue
        ? game.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          game.id.toString().includes(searchValue.toLowerCase()) ||
          game.platforms.some((platform) => platform.name.toString().toLowerCase() === searchValue.toLowerCase()) ||
          game.tags.some((tag) => tag.name.toLowerCase() === searchValue.toLowerCase())
        : true;

      return hasGenre && matchesSearch;
    });

    const sortedGames = filteredGameList.sort((a, b) => {
      return acsending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });

    setFilteredGames(sortedGames);
    console.log("filteredGameList: ", filteredGameList);
  };

  useEffect(() => {
    filterGames(genreValue, searchValue);
  }, [gamelist, acsending, genreValue, searchValue]);

  return (
    <>
      <Layout>
        <main>
          <Hero
            isFrontPage={false}
            header="Vores spil"
            redWord={["spil"]}
            content="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters"
          />

          <nav className="flex justify-center">
            <div className="spacer w-full">
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-6 w-full">
                  <FilterField
                    filterType="search"
                    inputPlaceholder="Søg"
                    onChange={handleSelectChange}
                  />

                  <AscendingDescending
                    onChange={onChangeSort}
                    trueState="A-Z"
                    falseState="Z-A"
                    pressed={acsending}
                    className=" md:order-2"
                  />
                  <FilterField
                    filterType="dropDown"
                    dropDownHeader="Genre"
                    dropDownItems={["Alle", "Multiplayer", "din far", "filip^2"]}
                    onChange={handleSelectChange}
                  />
                </div>
              </div>
            </div>
          </nav>
          <section>
            <div className='flex justify-center'>
              <div className='spacer w-full '>
                <div className='flex flex-wrap gap-6 justify-center sm:justify-between lg:grid lg:grid-cols-3 xl:grid-cols-4'>
                  {/*     <div className="flex flex-wrap gap-6 justify-center md:justify-between lg:justify-start"> */}
                  {filteredGames &&
                    filteredGames.map((game) => (
                      <div
                        key={game.id}
                        className='mb-10 '
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
        </main>
      </Layout>
    </>
  );
}
