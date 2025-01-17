import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const { width } = Dimensions.get('window'); 

const trendingSongs = [
  {
    id: '1',
    title: 'Uk Rap',
    artist: 'Cental cee ',
    image: 'https://variety.com/wp-content/uploads/2023/06/thumbnail_Central_Cee_9_13_220722-main.jpg',
  
    
 
  },
  {
    id: '2',
    title: 'Obaa Sima',
    artist: 'Fireboy',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqtw_y7k2MZsmsijAYwjdyKTSnuD5DCYgCag&s',
  },
  {
    id: '3',
    title: 'Agora Hills',
    artist: 'Doja cat',
    image: 'https://i.ytimg.com/vi/7Vd6K6i51WQ/sddefault.jpg',
  },
  {
    id: '4',
    title: 'Truth or Dare',
    artist: 'Tyla',
    image: 'https://i1.sndcdn.com/artworks-9RFsEtWJLlUkPIo2-ATwxyw-t500x500.jpg',
  },
];

const HomeScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); 
  const [slideAnim] = useState(new Animated.Value(-100)); 

  useEffect(() => {
    // Animate the logo and welcome text
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderSongCard = ({ item }) => (
    <View style={styles.songCard}>
      <Image source={{ uri: item.image }} style={styles.albumArt} />
      <Text style={styles.songTitle}>{item.title}</Text>
      <Text style={styles.songArtist}>{item.artist}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#0A1128', '#034078']} style={styles.container}>
    
      <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
        <Image
          source={require('../assets/images/Preview.png')} 
          style={styles.logo}
        />
      </Animated.View>

      
      <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>
        Welcome to Sonavix
      </Animated.Text>

      {/* Trending Songs Section */}
      <View style={styles.trendingSection}>
        <Text style={styles.sectionTitle}>Trending Songs</Text>
        <FlatList
          data={trendingSongs}
          renderItem={renderSongCard}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.songList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#1282A2',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  trendingSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 16,
    paddingLeft: 16,
  },
  songList: {
    paddingHorizontal: 16,
  },
  songCard: {
    backgroundColor: '#05183E',
    borderRadius: 10,
    marginRight: 16,
    padding: 12,
    alignItems: 'center',
    width: width * 0.4, // 40% of the screen width
  },
  albumArt: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // Maintain square aspect ratio
    borderRadius: 8,
    marginBottom: 12,
  },
  songTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  songArtist: {
    fontSize: 14,
    color: '#B0C4DE',
    textAlign: 'center',
  },
});

export default HomeScreen;
