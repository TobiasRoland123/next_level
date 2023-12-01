import { GameRoot, Platform2, PlatformArr, Result, Tag } from '@/Types/gamelist';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Spil() {
  const [gameData, setGameData] = useState<GameRoot & Result>();
  const [searchString, setSearchString] = useState('');
  const [gameId, setGameId] = useState(0);
  const [gameList, setGameList] = useState<Result[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformArr>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

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

  const handlePlatformChange = (platform: Platform2) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleTagChange = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(id => id !== tag));
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

    return console.log('payload', saveGame), setGameList(updatedList as Result[]);
  }

  useEffect(() => {
    console.log('gamelist', gameList);
  }, [gameList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/gamelist?search=${searchString}&gameId=${gameId}`);
        if (response.ok) {
          const jsonData = await response.json();
          console.log('data', jsonData);

          setGameData(jsonData);
        } else {
          console.error('api req failed');
        }
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchData();
  }, [searchString, gameId]);

  // COMMENT OUT TO HERE TO DISABLE LOGIN GUARD
  return (
    <>
      <h2 className="mt-20">Admin Spil</h2>

      <div>
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
      </div>
    </>
  );
}
