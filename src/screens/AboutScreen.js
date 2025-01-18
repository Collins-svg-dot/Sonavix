import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Sonavix</Text>
      
      <Text style={styles.sectionTitle}>What is Sonavix?</Text>
      <Text style={styles.text}>
        Sonavix is a modern, minimalist music app designed to bring you an immersive and personalized music experience. Whether you're a casual listener or a music aficionado, Sonavix offers something for everyone.
      </Text>
      
      <Text style={styles.sectionTitle}>Key Features</Text>
      <Text style={styles.text}>
        - Mood-Based UI: Automatically changes the theme to match your current mood.
      </Text>
      <Text style={styles.text}>
        - Real-Time Collaborative Playlists: Create and share playlists with friends in real-time.
      </Text>
      <Text style={styles.text}>
        - Gamified Listening Streaks: Keep track of your listening habits and earn rewards.
      </Text>
      
      <Text style={styles.sectionTitle}>Why Choose Sonavix?</Text>
      <Text style={styles.text}>
        With its user-friendly interface, unique features like mood-based theming, and cutting-edge music technology, Sonavix is perfect for users who want a seamless, intuitive, and fun way to enjoy their music.
      </Text>
      
      <Text style={styles.sectionTitle}>Available Platforms</Text>
      <Text style={styles.text}>Available on iOS and Android devices.</Text>
      
      <Text style={styles.sectionTitle}>Pricing</Text>
      <Text style={styles.text}>
        Unlock all premium features with our monthly subscription and enjoy an ad-free experience, unlimited skips, and access to exclusive content!
      </Text>
      
      <Text style={styles.sectionTitle}>Stay Connected</Text>
      <Text style={styles.text}>Follow us on Instagram, Twitter, and Facebook for updates.</Text>
      
      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.text}>For support or inquiries, reach out to us at support@sonavix.com.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#0A1128',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FEFCFB',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#FEFCFB',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#FEFCFB',
    marginBottom: 10,
  },
});

export default AboutScreen;
