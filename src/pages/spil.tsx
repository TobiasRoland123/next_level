import { supabase } from "../../utils/supabaseClient";
import { GameCard } from "@/components/GameCard/GameCard";
import { GameRoot, PlatformArr, Result, Tag } from "@/Types/gamelist";
import { GameCardRoot } from "@/Types/gamecard";
import { Layout } from "@/Layout";
import { Hero } from "@/modules/Hero/Hero";
import { SelectField } from "@/components/Select/SelectField";
import { FilterField } from "@/components/FilterField/FilterField";
import { useEffect, useState } from "react";
import { boolean } from "zod";

export async function getServerSideProps() {
  let { data: gamelist, error } = await supabase.from("gamelist").select("*");
  console.log(gamelist);

  return { props: { gamelist } };
}

export default function Spil({ gamelist }: { gamelist: GameCardRoot[] }) {
  // set Up useState
  const [visibleGames, setVisibleGames] = useState(gamelist);
  const [arrangedValue, setArrangedValue] = useState("");
  const [genreValue, setGenreValue] = useState("");
  const [searchValue, setSearcheValue] = useState("");

  const handleSelectChange = (value: string, type: string) => {
    type === "genre" && setGenreValue(value);
    type === "search" && setSearcheValue(value);
    type === "arranged" && setArrangedValue(value);
  };

  const filterGames = (genreValue: string, searchValue: string) => {
    // console.log("props ", "'", arrangedValue, genreValue, searchValue, "'");
    // console.log("gameList: ", gamelist);

    const filteredGameList = gamelist.filter((game) => {
      const hasGenre = genreValue ? game.tags.some((tag) => tag.name === genreValue) : true;

      return hasGenre;
    });
    setVisibleGames(filteredGameList);
    console.log("filteredGameList: ", filteredGameList);
  };

  useEffect(() => {
    filterGames(genreValue, searchValue);
  }, [arrangedValue, genreValue, searchValue]);

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
                <div className="flex flex-col gap-6">
                  <FilterField
                    filterType="dropDown"
                    dropDownHeader="Genre"
                    dropDownItems={["Multiplayer", "din far", "filip^2"]}
                    onChange={handleSelectChange}
                  />
                  <FilterField
                    filterType="dropDown"
                    dropDownItems={["Din mor", "din far", "filip^2"]}
                    dropDownHeader="Arranged"
                    onChange={handleSelectChange}
                  />
                  {/* <FilterField
                    filterType="search"
                    inputProps={{ labelText: "Søg" }}
                  /> */}
                </div>
              </div>
            </div>
          </nav>
          <section>
            <div className="flex justify-center">
              <div className="spacer w-full ">
                <div className="flex flex-wrap gap-6 justify-center sm:justify-between lg:grid lg:grid-cols-3 xl:grid-cols-4">
                  {/*     <div className="flex flex-wrap gap-6 justify-center md:justify-between lg:justify-start"> */}
                  {gamelist &&
                    gamelist.map((game) => (
                      <div
                        key={game.id}
                        className="mb-10 "
                      >
                        <GameCard
                          Name={game.title}
                          Image_={`${game.background_image}`}
                          Console={game.platforms.map((platform) => platform.name)}
                          Tags={game.tags.map((tag) => tag.name)}
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
