// src/components/HomeTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManagePlaylistScreen from '../screens/PlaylistScreen'; // Ensure you have a PlaylistScreen component
import ProfileScreen from '../screens/ProfileScreen';
import MusicLibraryScreen from '../screens/MusicLibraryScreen';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for icons

const Tab = createBottomTabNavigator();

const HomeTabs = ({route}) => {
  const initialParams = route?.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configure icons for each tab
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Manage') {
            iconName = focused ? 'albums' : 'albums-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1282A2',
        tabBarInactiveTintColor: '#FEFCFB',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A1128',
          borderTopWidth: 0,
        },
      })}
    >
        <Tab.Screen name="Home" component={HomeScreen} initialParams={initialParams} />
      <Tab.Screen name="Manage" component={ManagePlaylistScreen} />
      <Tab.Screen name="Library" component={MusicLibraryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={initialParams} />
      
    </Tab.Navigator>
  );
};

export default HomeTabs;
