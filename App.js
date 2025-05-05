import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import BillingScreen from './src/screens/BillingScreen';
import PlansScreen from './src/screens/PlansScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MusicLibraryScreen from './src/screens/MusicLibraryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FavoritesScreen from './src/screens/FavouritesScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import SplashScreen from './src/screens/SplashScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import PlaylistScreen from './src/screens/PlaylistScreen'; // New Playlist screen
import { PlaylistProvider } from './src/components/playlistContext';
import HomeTabs from './src/components/HomeTabs';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);

  useEffect(() => {
    // Show splash screen for 4 seconds
    setTimeout(() => {
      setIsSplashDone(true);
    }, 4000);
  }, []);

  // HomeStack now includes PlaylistScreen
  function HomeStack({ route }) {
    const initialParams = route?.params;
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} initialParams={initialParams} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="MusicLibrary" component={MusicLibraryScreen} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
      </Stack.Navigator>
    );
  }

  // DrawerNavigator includes HomeStack and other screens but not PlaylistScreen
  function DrawerNavigator() {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Billing" component={BillingScreen} />
        <Drawer.Screen name="Plans" component={PlansScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Feedback" component={FeedbackScreen} />
      </Drawer.Navigator>
    );
  }

  return (
    <PlaylistProvider>
      <NavigationContainer>
        {isSplashDone ? <DrawerNavigator /> : <SplashScreen />}
      </NavigationContainer>
    </PlaylistProvider>
  );
}
