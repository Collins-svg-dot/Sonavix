import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [themeColor, setThemeColor] = useState('#1282A2'); // Default theme color
  const navigation = useNavigation();

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleNotifications = () => setIsNotificationsEnabled((prev) => !prev);

  const changeTheme = (color) => setThemeColor(color);

  const themeOptions = ['#1282A2', '#034078', '#001F54', '#FEFCFB', '#0A1128'];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#0A1128' : '#FEFCFB' },
      ]}
    >
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.goBackText, { color: themeColor }]}>
          Go Back
        </Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          { color: isDarkMode ? '#FEFCFB' : '#0A1128' },
        ]}
      >
        Settings
      </Text>

      {/* Dark Mode Toggle */}
      <View style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: themeColor }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#1282A2' : '#FEFCFB'}
          trackColor={{ false: '#C4C4C4', true: '#034078' }}
        />
      </View>

      {/* Notifications Toggle */}
      <View style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: themeColor }]}>
          Notifications
        </Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
          thumbColor={isNotificationsEnabled ? '#1282A2' : '#FEFCFB'}
          trackColor={{ false: '#C4C4C4', true: '#034078' }}
        />
      </View>

      {/* Change Theme */}
      <Text style={[styles.sectionTitle, { color: themeColor }]}>
        Change Theme Color
      </Text>
      <View style={styles.themeOptionsContainer}>
        {themeOptions.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorCircle,
              { backgroundColor: color, borderColor: themeColor },
            ]}
            onPress={() => changeTheme(color)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    padding: 10,
  },
  goBackText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
  },
  themeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: 5,
  },
});

export default SettingsScreen;
