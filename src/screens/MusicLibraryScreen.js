import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

// Import the function to fetch tracks from the helper
import { fetchTracks } from '../../sonavixApi'; 
import { Audio } from 'expo-av';

const MusicLibraryScreen = ({ route, navigation }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query = '' } = route.params || {};  // Get the query from route params
  
  const [isPlaying, setIsPlaying] = useState(false); // State to track if a song is playing
  const [currentTrack, setCurrentTrack] = useState(null); // State to track current track
  const sound = useRef(new Audio.Sound()); // Audio reference

  // Fetch tracks when query changes
  useEffect(() => {
    const loadTracks = async () => {
      setLoading(true);
      try {
        const fetchedTracks = await fetchTracks(query);  // Fetch tracks using the helper
        setTracks(fetchedTracks);  // Set the fetched tracks in state
      } catch (err) {
        setError('Failed to load tracks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      loadTracks();
    }
  }, [query]);

  const handleTrackPress = async (track) => {
    const previewUrl = track.preview_url;  // Get the dynamic preview URL for the track
    console.log('Preview URL:', previewUrl);
  
    if (isPlaying && currentTrack?.id === track.id) {
      await sound.current.stopAsync(); // Stop the track if it's already playing
      setIsPlaying(false);
    } else {
      if (!previewUrl) {
        alert('No preview available for this track!');
        return;
      }
  
      try {
        // Check if sound is still loading
        if (sound.current._loading) {
          console.log('Sound is already loading, please wait...');
          return; // Prevent loading a new sound while the current one is still loading
        }
  
        await sound.current.loadAsync({ uri: previewUrl });  // Load and play the track
        await sound.current.playAsync();
        setCurrentTrack(track);
        setIsPlaying(true);
      } catch (err) {
        setError('Failed to play track.');
        console.error(err);
      }
    }
  };
  
  // Render each track item
  const renderTrack = ({ item }) => (
    <TouchableOpacity style={styles.trackCard} onPress={() => handleTrackPress(item)}>
      <Image
        source={{
          uri: item.album.images?.[0]?.url || 'https://via.placeholder.com/80',  // Fallback image if no image
        }}
        style={styles.trackImage}
      />
      <Text style={styles.trackTitle}>{item.name}</Text>
      <Text style={styles.trackArtist}>{item.artists?.[0]?.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Go Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>

      <Text style={styles.screenTitle}>Music Library</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1282A2" />  // Loading state
      ) : error ? (
        <Text style={styles.errorMessage}>{error}</Text>  // Error message
      ) : tracks.length === 0 ? (
        <Text style={styles.emptyMessage}>No tracks found for "{query}"</Text>  // No tracks found
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item, index) => item.id || `${item.name}-${index}`}
          renderItem={renderTrack}
          numColumns={2}
          contentContainerStyle={styles.trackContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1128',
    padding: 20,
  },
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#034078',
    borderRadius: 5,
  },
  goBackText: {
    color: '#FEFCFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FEFCFB',
    marginBottom: 20,
    textAlign: 'center',
  },
  trackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackCard: {
    backgroundColor: '#05183E',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    width: '45%',
  },
  trackImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  trackTitle: {
    color: '#1282A2',
    fontSize: 16,
    textAlign: 'center',
  },
  trackArtist: {
    color: '#FEFCFB',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyMessage: {
    color: '#FEFCFB',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  errorMessage: {
    color: '#FF0000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MusicLibraryScreen;
