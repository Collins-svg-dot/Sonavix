const clientID = '699b7cb6393c4c849242145433d96aa1';
const clientSecret = '3d9f0807cb944bb58b37d1aff8db56e2';

// Function to get an access token
export const getAccessToken = async () => {
  const credentials = btoa(`${clientID}:${clientSecret}`);

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
  }
};

// Function to fetch tracks based on a search query
export const fetchTracks = async (query) => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data?.tracks?.items || [];
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};
