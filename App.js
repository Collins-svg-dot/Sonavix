import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from './src/screens/AboutScreen';
import BillingScreen from './src/screens/BillingScreen';
import PlansScreen from './src/screens/PlansScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MusicLibraryScreen from './src/screens/MusicLibraryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FavoritesScreen from './src/screens/FavouritesScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import SplashScreen from './src/screens/SplashScreen'
import HomeScreen from './src/screens/HomeScreen';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication

  useEffect(() => {
    setTimeout(() => {
      setIsSplashDone(true);
    }, 4000);
  }, []);

  // Authentication Stack (Login, SignUp)
  function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    );
  }
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
    )};  

  // Drawer Navigator (Main App)
  function DrawerNavigator() {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack}/>
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Billing" component={BillingScreen} />
        <Drawer.Screen name="Plans" component={PlansScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Feedback" component={FeedbackScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {!isSplashDone ? (
        <SplashScreen />
      ) : isAuthenticated ? (
        <DrawerNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
