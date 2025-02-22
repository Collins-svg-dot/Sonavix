import React, { createContext, useState, useContext } from 'react';

const PlaylistContext = createContext();

export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState({});

  // Create a new playlist
  const createPlaylist = (name) => {
    if (playlists[name]) return alert('Playlist already exists!');
    setPlaylists({ ...playlists, [name]: [] });
  };

  // Add a song to a playlist
  const addToPlaylist = (playlistName, song) => {
    if (!playlists[playlistName]) return;
    setPlaylists({
      ...playlists,
      [playlistName]: [...playlists[playlistName], song],
    });
  };

  // Remove a song from a playlist
  const removeFromPlaylist = (playlistName, songId) => {
    if (!playlists[playlistName]) return;
    setPlaylists({
      ...playlists,
      [playlistName]: playlists[playlistName].filter((song) => song.id !== songId),
    });
  };

  // Delete a playlist
  const deletePlaylist = (playlistName) => {
    const updatedPlaylists = { ...playlists };
    delete updatedPlaylists[playlistName];
    setPlaylists(updatedPlaylists);
  };

  return (
    <PlaylistContext.Provider value={{ playlists, createPlaylist, addToPlaylist, removeFromPlaylist, deletePlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};
