const API_KEY = process.env.NEXT_PUBLIC_RAWG_APIKEY;

const handler = async (req, res) => {
  const search = req.query.search;
  const gameId = req.query.gameId;
  try {
    //console.log('API_KEY:', API_KEY);
    const rawgResponse = await fetch(
      `https://api.rawg.io/api/games${
        gameId == 0 ? '' : `/${gameId}`
      }?key=${API_KEY}${search !== '' ? `&search=${search}` : ''}`
    );

    if (!rawgResponse.ok) {
      throw new Error('failed');
    }
    const rawgData = await rawgResponse.json();
    res.status(200).json(rawgData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'internal server error' });
  }
};

export default handler;
