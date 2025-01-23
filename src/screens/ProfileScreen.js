import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ route }) => {
  const { username = 'Guest', email = 'Not provided' } = route.params || {};
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.replace('Login'); // Navigate back to Login screen on logout
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={require('../assets/images/profile.jpg')} 
        style={styles.profilePicture}
      />

      {/* Username */}
      <Text style={styles.username}>{username}</Text>

      {/* Email */}
      <Text style={styles.email}>{email}</Text>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1128',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderColor: '#FEFCFB',
    borderWidth: 2,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FEFCFB',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#1282A2',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#1282A2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  logoutButtonText: {
    color: '#FEFCFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
