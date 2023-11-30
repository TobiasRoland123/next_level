import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Spil() {
  const [data, setData] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [gameId, setGameId] = useState(0);
  const [gameList, setGameList] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*         const response = await fetch(`/utils/gamelist?search=${searchString}&gameId=${gameId}`); */
        const response = await fetch(`/utils/gamelist?search=${searchString}&gameId=${gameId}`);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
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
      <h2>Admin Spil</h2>
    </>
  );
}
