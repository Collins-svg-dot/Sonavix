import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { usePlaylist } from '../components/playlistContext';

const PlaylistScreen = () => {
  const { playlists, createPlaylist, deletePlaylist } = usePlaylist();
  const [newPlaylist, setNewPlaylist] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Playlists</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Playlist Name"
        value={newPlaylist}
        onChangeText={setNewPlaylist}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        createPlaylist(newPlaylist);
        setNewPlaylist('');
      }}>
        <Text style={styles.buttonText}>Create Playlist</Text>
      </TouchableOpacity>

      <FlatList
        data={Object.keys(playlists)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.playlistItem}>
            <Text style={styles.playlistText}>{item}</Text>
            <TouchableOpacity onPress={() => deletePlaylist(item)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0A1128' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FEFCFB', textAlign: 'center' },
  input: { backgroundColor: '#FEFCFB', padding: 10, marginVertical: 10, borderRadius: 5 },
  button: { backgroundColor: '#1282A2', padding: 10, alignItems: 'center', borderRadius: 5 },
  buttonText: { color: '#FEFCFB', fontWeight: 'bold' },
  playlistItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  playlistText: { color: '#FEFCFB', fontSize: 18 },
  deleteText: { color: '#E5383B', fontSize: 16 },
});

export default PlaylistScreen;
