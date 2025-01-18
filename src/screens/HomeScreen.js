import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring 
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  // Animation values
  const logoOpacity = useSharedValue(0);
  const welcomeOpacity = useSharedValue(0);
  const greetingTranslateX = useSharedValue(-300);
  const searchBarWidth = useSharedValue('90%');

  const navigation =useNavigation();

  useEffect(() => {
    // Trigger animations on component mount
    logoOpacity.value = withTiming(1, { duration: 1000 });
    welcomeOpacity.value = withTiming(1, { duration: 1500 });
    greetingTranslateX.value = withSpring(0, { damping: 10 });
  }, []);

  // Animated styles
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  const welcomeStyle = useAnimatedStyle(() => ({
    opacity: welcomeOpacity.value,
  }));

  const greetingStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: greetingTranslateX.value }],
  }));

  const searchBarStyle = useAnimatedStyle(() => ({
    width: searchBarWidth.value,
  }));

  const handleSearchFocus = () => {
    searchBarWidth.value = withSpring('100%', { damping: 15 });
  };

  const handleSearchBlur = () => {
    searchBarWidth.value = withSpring('90%', { damping: 15 });
  };

  const openDrawer= () => {
    navigation.openDrawer();
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animated.Image
        source={require('../assets/images/Preview.png')}
        style={[styles.logo, logoStyle]}
      />

      {/* Welcome Message */}
      <Animated.Text style={[styles.welcomeText, welcomeStyle]}>
        Welcome to Sonavix
      </Animated.Text>

      {/* Greeting Message */}
      <Animated.Text style={[styles.greetingText, greetingStyle]}>
        {getTimeGreeting()}, User!
      </Animated.Text>

      {/* Login/Signup Buttons */}
      <View style={styles.authButtons}>
        <TouchableOpacity>
          <Text style={styles.authText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.authText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Toggle Menu */}
      <TouchableOpacity style={styles.toggleButton}>
        <Text style={styles.toggleText} onPress={openDrawer}></Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <Animated.View style={[styles.searchBarContainer, searchBarStyle]}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for songs..."
          placeholderTextColor="#034078"
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
      </Animated.View>
    </View>
  );
};

const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  else if (hour < 18) return 'Good Afternoon';
  else return 'Good Evening';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1128',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FEFCFB',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 18,
    color: '#FEFCFB',
    marginBottom: 20,
  },
  authButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginBottom: 20,
  },
  authText: {
    color: '#1282A2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  toggleText: {
    color: '#FEFCFB',
    fontSize: 18,
  },
  searchBarContainer: {
    height: 40,
    backgroundColor: '#FEFCFB',
    borderRadius: 20,
    marginTop: 30,
    justifyContent: 'center',
  },
  searchBar: {
    height: '100%',
    paddingHorizontal: 15,
    color: '#001F54',
  },
});

export default HomeScreen;
