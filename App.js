import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import BillingScreen from './src/screens/BillingScreen';
import PlansScreen from './src/screens/PlansScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MusicLibraryScreen  from './src/screens/MusicLibraryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FavoritesScreen from './src/screens/FavouritesScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home, Login, and Signup screens
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="MusicLibrary" component={MusicLibraryScreen}/>
      <Stack.Screen name="FavoritesScreen"  component={FavoritesScreen}/>

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Billing" component={BillingScreen} />
        <Drawer.Screen name="Plans" component={PlansScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
