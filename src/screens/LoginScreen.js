import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Handle login
  const handleLogin = () => {
    console.log('Login button pressed'); // Debugging log to check if button press is detected

    if (!email || !password) {
      Alert.alert('Error', 'Email and Password are required');
      return;
    }

    // Simulate a successful login
    Alert.alert('Login Successful');

    // Navigate to Home screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: {username}}],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

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
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0A1128' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FEFCFB', textAlign: 'center', marginBottom: 20 },
  input: { height: 50, backgroundColor: '#FEFCFB', borderRadius: 5, paddingHorizontal: 15, marginBottom: 10, color: '#0A1128' },
  button: { backgroundColor: '#1282A2', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FEFCFB', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#1282A2', textAlign: 'center', marginTop: 15 },
});

export default LoginScreen;
