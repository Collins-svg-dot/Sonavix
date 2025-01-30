import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { Audio } from 'expo-av';
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();
  const [fadeAnimText1] = useState(new Animated.Value(0)); // Initial opacity for the first text (Welcome to Sonavix)
  const [fadeAnimText2] = useState(new Animated.Value(0)); // Initial opacity for the second text (Feel the music)

  const [fadeAnimIcon] = useState(new Animated.Value(0)); // Initial opacity for the logo

  useEffect(() => {
    let soundObject;
    const playAudio = async () => {
      try {
        // Load and play "Welcome to Sonavix" voiceover
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/audio/Sonavix.mp3")
        );
        soundObject = sound;
        await sound.playAsync(); // Play the sound

    

        // Fade in the logo (Icon)
        Animated.timing(fadeAnimIcon, {
          toValue: 1,
          duration: 1500, // Fade-in duration for the logo (1.5 seconds)
          useNativeDriver: true,
        }).start();

        // Fade in the first text ("Welcome to Sonavix")
        Animated.timing(fadeAnimText1, {
          toValue: 1,
          duration: 2000, // Fade-in duration for the first text (2 seconds)
          useNativeDriver: true,
        }).start();

        // Fade in the second text ("Feel the music, live the moment")
        setTimeout(() => {
          Animated.timing(fadeAnimText2, {
            toValue: 1,
            duration: 2000, // Fade-in duration for the second text (2 seconds)
            useNativeDriver: true,
          }).start();
        }, 1500); // Delay the fade-in of the second text

        // Wait for the audio to finish before navigating
        setTimeout(() => {
          navigation.navigate("Home"); // Navigate to the "Home" screen
        }, 5000); // Adjust this to match the total duration of your splash screen (audio + animation)

      } catch (error) {
        console.error("Error playing audio:", error);
        navigation.navigate("Home"); 
      }
    };

    playAudio(); 

    
    return () => {
      if (soundObject) {
        soundObject.unloadAsync(); 
      }
    };
  }, [navigation, fadeAnimText1, fadeAnimText2, fadeAnimIcon]); 

  return (
    <View style={styles.container}>
    
      <Animated.Image
        source={require("../assets/images/splashicon.jpg")}
        style={[styles.logo, { opacity: fadeAnimIcon }]} 
      />

      
      <Animated.Text
        style={[styles.text1, { opacity: fadeAnimText1 }]} 
      >
        Welcome to Sonavix
      </Animated.Text>

      
      <Animated.Text
        style={[styles.text2, { opacity: fadeAnimText2 }]} 
      >
        Feel the music, live the moment
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1128", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20, 
  },
  text1: {
    fontSize: 36, 
    fontWeight: "bold",
    color: "#1282A2", 
    textAlign: "center",
    marginBottom: 10, 
  },
  text2: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#FFFFFF", 
    textAlign: "center",
  },
});

export default SplashScreen;
