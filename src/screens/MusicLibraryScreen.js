import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchTracks } from '../../SonavixApi';
import { usePlaylist } from '../components/playlistContext';

const MusicLibraryScreen = () => {
  const { playlists, addToPlaylist } = usePlaylist(); // using addToPlaylist from context
  const route = useRoute();
  const navigation = useNavigation();
  const { query } = route.params || ''; // Get query from navigation

  const [tracks, setTracks] = useState([]);
  const [favorites, setFavorites] = useState([]); // Track favorite songs
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      searchTracks(query); // Automatically search with the passed query
    }
  }, [query]);

  const searchTracks = async (searchQuery) => {
    setLoading(true);
    try {
      const fetchedTracks = await fetchTracks(searchQuery);
      setTracks(fetchedTracks);
    } catch (error) {
      console.error('Error fetching tracks:', error);
      Alert.alert('Error', 'Failed to fetch tracks.');
    }
    setLoading(false);
  };

  const toggleFavorite = (track) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === track.id)) {
        // If already in favorites, remove it
        return prevFavorites.filter((fav) => fav.id !== track.id);
      } else {
        // Otherwise, add to favorites
        return [...prevFavorites, track];
      }
    });
  };

  // Function to add track to a default playlist ("My Playlist")
  const handleAddToPlaylist = (track) => {
    // Check if the default playlist exists; if not, alert user to create one.
    if (!playlists['My Playlist']) {
      Alert.alert('No Playlist', 'Please create "My Playlist" first.');
      return;
    }
    addToPlaylist('My Playlist', track);
    Alert.alert('Success', `Added "${track.name}" to My Playlist`);
  };

  const renderTrack = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    return (
      <View style={styles.trackCard}>
        <Image source={{ uri: item.album.images[0].url }} style={styles.trackImage} />
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle}>{item.name}</Text>
          <Text style={styles.trackArtist}>{item.artists[0].name}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteButton}>
          <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddToPlaylist(item)} style={styles.playlistButton}>
          <Text style={styles.playlistButtonText}>Add to Playlist</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1282A2" />
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={renderTrack}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tracks found. Try a different query.</Text>
          }
        />
      )}
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('FavoritesScreen', { favorites })}
      >
        <Text style={styles.favoritesButtonText}>View Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0A1128',
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#034078',
    borderRadius: 8,
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: '#FEFCFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackArtist: {
    color: '#FEFCFB',
    fontSize: 14,
    marginTop: 2,
  },
  favoriteButton: {
    marginLeft: 10,
  },
  favoriteIcon: {
    fontSize: 18,
    color: '#FEFCFB',
  },
  favoriteActive: {
    color: '#FF4D6D',
  },
  playlistButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#1282A2',
    borderRadius: 5,
  },
  playlistButtonText: {
    color: '#FEFCFB',
    fontSize: 12,
  },
  favoritesButton: {
    padding: 10,
    backgroundColor: '#1282A2',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  favoritesButtonText: {
    color: '#FEFCFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#FEFCFB',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MusicLibraryScreen;
