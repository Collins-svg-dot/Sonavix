import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { validateLoginForm } from '../utils/validationLoginform';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    // Check if user is already logged in
    const checkLoginStatus = async () => {
      const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
      if (isAuthenticated === 'true') {
        navigation.navigate('DrawerNavigator', { screen: 'Home' });
        // Redirect to the main app
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    const validationErrors = validateLoginForm(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Save authentication state
      await AsyncStorage.setItem('isAuthenticated', 'true');
      Alert.alert('Login Successful');
      navigation.navigate('DrawerNavigator', { screen: 'Home' });
      // Navigate to main app
    } else {
      Alert.alert('Error', 'Please fix the validation errors');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={[styles.input, errors.email && { borderColor: 'red' }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.password && { borderColor: 'red' }]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      {/* Go to Homepage Button */}
      <TouchableOpacity
        style={[styles.button, styles.homeButton]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Go to Homepage</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0A1128',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FEFCFB',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#FEFCFB',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#0A1128',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#1282A2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: '#034078',
  },
  buttonText: {
    color: '#FEFCFB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#1282A2',
    textAlign: 'center',
    marginTop: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default LoginScreen;
