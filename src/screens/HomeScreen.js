import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const trendingTracks = [
  { id: '1', title: 'GPB', artist: 'Central Cee', image: require('../assets/images/gpb.jpg') },
  { id: '2', title: 'Need Me', artist: 'Fireboy', image: require('../assets/images/needme.png') },
  { id: '3', title: 'Biri Marung', artist: 'Mr Pilato', image: require('../assets/images/birimarung.jpg') },
];

const recommendedSongs = [
  { id: '4', title: 'Shake it to the Max', artist: 'Moliy', image: require('../assets/images/Image.jpg') },
  { id: '5', title: 'TGIF', artist: 'Glorilla', image: require('../assets/images/tgif.jpeg') },
  { id: '6', title: 'Push 2 Start', artist: 'Tyla', image: require('../assets/images/push2start.jpg') },
];

const recentlyPlayed = [
  { id: '7', title: 'Alibi', artist: 'Sevdaliza', image: require('../assets/images/Alibi.jpg') },
  { id: '8', title: 'Did It First', artist: 'Ice Spice', image: require('../assets/images/diditfirst.jpg') },
  { id: '9', title: 'Dior', artist: 'Pop Smoke', image: require('../assets/images/dior.jpg') },
];

const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  else if (hour < 18) return 'Good Afternoon';
  else return 'Good Evening';
};

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username ='Guest'} = route?.params || {}; // Avoid undefined errors
  const [searchQuery, setSearchQuery] = useState('');

  const logoOpacity = useSharedValue(0);
  const welcomeOpacity = useSharedValue(0);
  const greetingTranslateX = useSharedValue(-300);
  const searchBarWidth = useSharedValue('90%');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('MusicLibrary', { query: searchQuery });
    } else {
      alert('Please enter a search term');
    }
  };

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 1000 });
    welcomeOpacity.value = withTiming(1, { duration: 1500 });
    greetingTranslateX.value = withSpring(0, { damping: 10 });
  }, []);

  const logoStyle = useAnimatedStyle(() => ({ opacity: logoOpacity.value }));
  const welcomeStyle = useAnimatedStyle(() => ({ opacity: welcomeOpacity.value }));
  const greetingStyle = useAnimatedStyle(() => ({ transform: [{ translateX: greetingTranslateX.value }] }));
  const searchBarStyle = useAnimatedStyle(() => ({ width: searchBarWidth.value }));

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.Image source={require('../assets/images/Preview.png')} style={[styles.logo, logoStyle]} />
        <Animated.Text style={[styles.welcomeText, welcomeStyle]}>Welcome to Sonavix</Animated.Text>
        <Animated.Text style={[styles.greetingText, greetingStyle]}>
          {getTimeGreeting()}, {username}
        </Animated.Text>

        {/* Login and Signup Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <Animated.View style={[styles.searchBarContainer, searchBarStyle]}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for songs..."
            placeholderTextColor="#034078"
            onFocus={() => (searchBarWidth.value = withSpring('100%', { damping: 15 }))}
            onBlur={() => (searchBarWidth.value = withSpring('90%', { damping: 15 }))}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </Animated.View>

        {/* Trending Tracks */}
        <Text style={styles.sectionTitle}>Trending Tracks</Text>
        <FlatList
          data={trendingTracks}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.trackItem} onPress={() => alert(`Playing: ${item.title}`)}>
              <Image source={item.image} style={styles.trackImage} />
              <Text style={styles.trackText}>{item.title} - {item.artist}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        {/* Recommended Songs */}
        <Text style={styles.sectionTitle}>Recommended Songs</Text>
        <FlatList
          data={recommendedSongs}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.trackItem} onPress={() => alert(`Playing: ${item.title}`)}>
              <Image source={item.image} style={styles.trackImage} />
              <Text style={styles.trackText}>{item.title} - {item.artist}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        {/* Recently Played */}
        <Text style={styles.sectionTitle}>Recently Played</Text>
        <FlatList
          data={recentlyPlayed}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.trackItem} onPress={() => alert(`Playing: ${item.title}`)}>
              <Image source={item.image} style={styles.trackImage} />
              <Text style={styles.trackText}>{item.title} - {item.artist}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1128' },
  scrollView: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20 },
  logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 20 },
  welcomeText: { fontSize: 24, color: '#FEFCFB', fontWeight: 'bold', textAlign: 'center' },
  greetingText: { fontSize: 18, color: '#FEFCFB', textAlign: 'center', marginVertical: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  button: { backgroundColor: '#1282A2', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, marginHorizontal: 10 },
  buttonText: { color: '#FEFCFB', fontSize: 16, fontWeight: 'bold' },
  searchBarContainer: { alignSelf: 'center', backgroundColor: '#FEFCFB', borderRadius: 20, padding: 10, marginTop: 10 },
  searchBar: { textAlign: 'center', color: '#001F54' },
  sectionTitle: { fontSize: 20, color: '#FEFCFB', fontWeight: 'bold', marginTop: 20 },
  trackItem: { marginRight: 10, alignItems: 'center' },
  trackImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 5 },
  trackText: { color: '#FEFCFB', fontSize: 14, textAlign: 'center' },
});

export default HomeScreen;
