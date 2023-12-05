import { GameRoot, Platform2, PlatformArr, Result, Tag } from "@/Types/gamelist";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { LayoutAdmin } from "@/Layout_Admin";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";
import { FaAccusoft } from "react-icons/fa";
import { supabase } from "../../../utils/supabaseClient";
import { GameCardRoot } from "@/Types/gamecard";
import Image from "next/image";
import { GameCard } from "@/components/GameCard/GameCard";

export async function getServerSideProps() {
  let { data: gamelist, error } = await supabase.from("gamelist").select("*");

  return { props: { gamelist } };
}

export default function Spil({ gamelist }: { gamelist: GameCardRoot[] }) {
  const [gameData, setGameData] = useState<GameRoot & Result>();
  const [searchString, setSearchString] = useState("");
  const [gameId, setGameId] = useState(0);
  const [gameList, setGameList] = useState<Result[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformArr>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log("game list", gamelist);

  let headings = Object.keys(gamelist[1]);

  // COMMENT OUT FROM HERE TO DISABLE LOGIN GUARD
  const router = useRouter();
  const supabase = createClient(
    "https://zwcshwxjwoffkdrdvbtp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Y3Nod3hqd29mZmtkcmR2YnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNzg5NzgsImV4cCI6MjAxNjY1NDk3OH0.yq0erC0CIBZmUG9uMC8u1YVyG4g2dsf3PrpekxJDq34"
  );
  getSession();
  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session === null) {
      router.push("/login");
    }
  }

  /* GAME LIST HANDLERS */

  /* GAME LIST FETCH */

  const handlePlatformChange = (platform: Platform2) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((id) => id !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleTagChange = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((id) => id !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  async function handleClick() {
    const saveGame = {
      id: gameData?.id,
      title: gameData?.name,
      background_image: gameData?.background_image,
      description: gameData?.description,
      platforms: selectedPlatforms.map((platform) => ({
        id: platform.id,
        name: platform.name,
        slug: platform.slug,
      })),
      tags: selectedTags.map((tag) => ({ id: tag.id, name: tag.name, slug: tag.slug })),
    };

    const { data, error } = await supabase.from("gamelist").insert([saveGame]).select();

    if (error) {
      console.error("Supabase error:", error);
      // Handle the error appropriately
      return;
    }

    const updatedList = [...gameList, saveGame];

    setSelectedPlatforms([]);
    setSelectedTags([]);

    return console.log("payload", saveGame), setGameList(updatedList as Result[]);
  }

  useEffect(() => {
    console.log("gamelist", gameList);
  }, [gameList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/gamelist?search=${searchString}&gameId=${gameId}`);
        if (response.ok) {
          const jsonData = await response.json();
          console.log("data", jsonData);

          setGameData(jsonData);
        } else {
          console.error("api req failed");
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, [searchString, gameId]);

  console.log("game data", gameData);

  // COMMENT OUT TO HERE TO DISABLE LOGIN GUARD
  return (
    <>
      <LayoutAdmin>
        <main>
          <h1 className="mt-20">Admin Spil</h1>
          <div className="spacer w-full">
            {/*  <div>
        <input
          type="text"
          onChange={e => setSearchString(e.target.value)}
        />
        <button onClick={() => console.log(searchString)}>search</button>

        <div>
          {gameData &&
            gameId == 0 &&
            gameData?.results?.map((game, index) => {
              return (
                <p
                  onClick={() => setGameId(game.id)}
                  key={game.id}
                >
                  {game.name}
                </p>
              );
            })}
          {gameId != 0 && gameData && (
            <>
              <button
                onClick={() => {
                  setGameId(0);
                  setSelectedPlatforms([]);
                  setSelectedTags([]);
                }}
              >
                back
              </button>
              <p>{gameData.name}</p>
              <img src={gameData.background_image} />
              <p
                dangerouslySetInnerHTML={{
                  __html: gameData?.description?.replace(/\n/g, '<br />'),
                }}
              ></p>
              {gameData.platforms &&
                gameData?.platforms.map(platform => (
                  <div key={platform.platform.id}>
                    <input
                      type="checkbox"
                      key={platform.platform.id}
                      id={platform.platform.id}
                      checked={selectedPlatforms.includes(platform.platform)}
                      onChange={() => handlePlatformChange(platform.platform)}
                    />
                    <label htmlFor={platform.platform.id}>{platform.platform.name}</label>
                  </div>
                ))}
              {gameData.tags &&
                gameData.tags.map(tag => (
                  <div key={tag.id}>
                    <input
                      type="checkbox"
                      key={tag.id}
                      id={tag.id}
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                    />
                    <label htmlFor={tag.id}>{tag.name}</label>
                  </div>
                ))}
              <button
                className="w-4 h-2 bg-white"
                onClick={() => handleClick()}
              ></button>
            </>
          )}
        </div>
      </div> */}

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
                  <PopoverContent className="w-[250px] h-[300px] overflow-hidden p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search game..."
                        className="h-9"
                        onValueChange={(e) => setSearchString(e)}
                      />
                      <CommandEmpty>No game found.</CommandEmpty>
                      <CommandGroup className="overflow-scroll">
                        {gameData?.results.map((game) => (
                          <CommandItem
                            key={game.name}
                            value={game.name}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue);
                              setOpen(false);
                            }}
                          >
                            {game.name}
                            <CheckIcon className={cn("ml-auto h-4 w-4", value === game.name ? "opacity-100" : "opacity-0")} />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}
            <div className="flex flex-wrap gap-3 ">
              {gamelist &&
                gamelist.map((game) => (
                  <GameCard
                    Name={game.title}
                    Image_={`${game.background_image}`}
                    Console={game.platforms.map((platform) => platform.name)}
                    Tags={game.tags.map((tag) => tag.name)}
                    Description={game.description}
                  />
                ))}
            </div>
          </div>
        </main>
      </LayoutAdmin>
    </>
  );
}
