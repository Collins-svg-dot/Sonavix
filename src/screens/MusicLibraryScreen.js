import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import base64 from 'base-64';

const MusicLibrary = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const CLIENT_ID = '699b7cb6393c4c849242145433d96aa1'; // Your Client ID
  const CLIENT_SECRET = '3d9f0807cb944bb58b37d1aff8db56e2'; // Your Client Secret

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await fetchSpotifyToken(CLIENT_ID, CLIENT_SECRET);
        const tracks = await fetchSpotifySongs('music', token); // Example query
        setSongs(tracks);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSong = ({ item }) => (
    <TouchableOpacity
      style={styles.songCard}
      onPress={() =>
        Alert.alert(
          'Play Song',
          `You selected: ${item.name}\nArtist: ${item.artists[0].name}`
        )
      }
    >
      <Image
        source={{ uri: item.album.images[0]?.url }}
        style={styles.songImage}
      />
      <View>
        <Text style={styles.songName}>{item.name}</Text>
        <Text style={styles.songArtist}>{item.artists[0]?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading songs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spotify Songs</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderSong}
      />
    </View>
  );
};

// Helper functions for token and song fetching
const fetchSpotifyToken = async (clientId, clientSecret) => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const credentials = base64.encode(`${clientId}:${clientSecret}`);

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Spotify token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token; // Use this token for API requests
};

const fetchSpotifySongs = async (query, token) => {
  const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query
  )}&type=track&limit=10`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch songs: ${response.statusText}`);
  }

  const data = await response.json();
  return data.tracks.items; // Array of song objects
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1128', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FEFCFB', marginBottom: 20 },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1282A2',
    padding: 10,
    borderRadius: 10,
  },
  songImage: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  songName: { fontSize: 16, fontWeight: 'bold', color: '#FEFCFB' },
  songArtist: { fontSize: 14, color: '#FEFCFB' },
  loadingText: { color: '#FEFCFB', fontSize: 18, marginTop: 20 },
});

export default MusicLibrary;
