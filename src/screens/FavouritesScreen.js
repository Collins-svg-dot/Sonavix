import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FavoritesScreen = ({ route }) => {
  const { favorites } = route.params || [];
  const navigation = useNavigation();  // Hook to get navigation prop

  const renderFavorite = ({ item }) => (
    <TouchableOpacity style={styles.songCard}>
      <Image source={{ uri: item.album.images[0].url }} style={styles.songImage} />
      <View style={styles.trackInfo}>
        <Text style={styles.songName}>{item.name}</Text>
        <Text style={styles.songArtist}>{item.artists[0].name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>

      {/* Buttons to go back and navigate to home */}
      <View style={styles.buttonContainer}>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderFavorite}
        />
      ) : (
        <Text style={styles.emptyText}>No favorites yet. Add some tracks!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1128', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FEFCFB', marginBottom: 20 },
  emptyText: { color: '#FEFCFB', textAlign: 'center', marginTop: 20 },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1282A2',
    padding: 10,
    borderRadius: 10,
  },
  songImage: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  trackInfo: {
    flex: 1,
  },
  songName: { fontSize: 16, fontWeight: 'bold', color: '#FEFCFB' },
  songArtist: { fontSize: 14, color: '#FEFCFB' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default FavoritesScreen;
