import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  ActivityIndicator, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const ProfileScreen = ({ route }) => {
  // Get initial values from route params, or set defaults.
  const { username: initialUsername = 'Guest', email: initialEmail = 'Not provided' } = route.params || {};
  const navigation = useNavigation();

  // Local state for editing mode and inputs.
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  
  // Profile picture state: initially use a local image.
  const [profilePic, setProfilePic] = useState(require('../assets/images/profile.jpg'));

  // Reanimated shared value for fade-in animation.
  const picOpacity = useSharedValue(0);
  const animatedPicStyle = useAnimatedStyle(() => ({
    opacity: picOpacity.value,
  }));

  useEffect(() => {
    picOpacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSave = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Profile Updated', `Username: ${username}\nEmail: ${email}`);
      setIsEditing(false);
    }, 1500);
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change functionality goes here.');
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Function to ask for permissions and pick an image.
  const pickImage = async (fromCamera = false) => {
    let permissionResult;
    if (fromCamera) {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
  
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access camera or media library is required!');
      return;
    }
  
    let pickerResult;
    if (fromCamera) {
      pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
    }
  
    console.log('Picker Result:', pickerResult);
  
    // Adjust for the new response structure:
    if (!pickerResult.canceled) {
      // Some versions use `assets` array; check if it exists and has a uri
      if (pickerResult.assets && pickerResult.assets.length > 0) {
        setProfilePic({ uri: pickerResult.assets[0].uri });
      } else if (pickerResult.uri) {
        setProfilePic({ uri: pickerResult.uri });
      }
    } else {
      Alert.alert('No Image Selected', 'You did not select an image.');
    }
  };
  
  // Show options to choose image source.
  const handleChangeProfilePicture = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'From Gallery', onPress: () => pickImage(false) },
        { text: 'Take a Picture', onPress: () => pickImage(true) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChangeProfilePicture}>
        <Animated.Image source={profilePic} style={[styles.profilePicture, animatedPicStyle]} />
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={[styles.input, styles.usernameInput]}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          placeholderTextColor="#aaa"
        />
      ) : (
        <Text style={styles.username}>{username}</Text>
      )}

      {isEditing ? (
        <TextInput
          style={[styles.input, styles.emailInput]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      ) : (
        <Text style={styles.email}>{email}</Text>
      )}

      {isEditing && (
        <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
      )}

      {isEditing ? (
        <TouchableOpacity style={styles.editButton} onPress={handleSave}>
          {loading ? (
            <ActivityIndicator size="small" color="#FEFCFB" />
          ) : (
            <Text style={styles.editButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

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
    width: 120,
    height: 120,
    borderRadius: 60,
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
  input: {
    backgroundColor: '#FEFCFB',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    width: 250,
    color: '#0A1128',
  },
  usernameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emailInput: {
    fontSize: 16,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#1282A2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  editButtonText: {
    color: '#FEFCFB',
    fontSize: 16,
    fontWeight: 'bold',
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
  changePasswordButton: {
    backgroundColor: '#034078',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  changePasswordText: {
    color: '#FEFCFB',
    fontSize: 14,
  },
});

export default ProfileScreen;
