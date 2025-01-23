const clientID = '699b7cb6393c4c849242145433d96aa1';  // Your Spotify Client ID
const clientSecret = '3d9f0807cb944bb58b37d1aff8db56e2';  // Your Spotify Client Secret

// Function to get an access token from Spotify
const getAccessToken = async () => {
  const encodedCredentials = btoa(`${clientID}:${clientSecret}`);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedCredentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;  // Return the access token
};

// Function to fetch tracks from Spotify using the access token
const fetchTracks = async (query) => {
  const accessToken = await getAccessToken();  // Get the access token

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  return data?.tracks?.items || [];  // Return the track items or an empty array if no tracks found
};

export { fetchTracks };
