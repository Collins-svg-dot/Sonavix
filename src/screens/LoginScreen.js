import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validateLoginForm } from '../utils/validationLoginform';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handleLogin = () => {
    const validationErrors = validateLoginForm(email, password); // Call validation logic
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const normalizedEmail = email.trim().toLowerCase(); // Trim and convert email to lowercase
  
      if (normalizedEmail === '' && password === '') {
        Alert.alert('Login Successful');
        navigation.replace('Home'); // Navigate to the Drawer after login
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
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
