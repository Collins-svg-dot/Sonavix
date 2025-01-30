import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(null);
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !rating || !comments) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    Alert.alert('Thank You!', 'Your feedback has been submitted.');
    
    // Reset form fields
    setName('');
    setEmail('');
    setRating(null);
    setComments('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#bbb"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        placeholderTextColor="#bbb"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Rate Your Experience:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={[styles.star, rating >= star && styles.selectedStar]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={[styles.input, styles.commentBox]}
        placeholder="Write your feedback..."
        placeholderTextColor="#bbb"
        value={comments}
        onChangeText={setComments}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Feedback</Text>
      </TouchableOpacity>

      {/* Go Back to Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Go Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1128',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FEFCFB',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#034078',
    color: '#FEFCFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  commentBox: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    color: '#FEFCFB',
    fontSize: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 30,
    color: '#bbb',
    marginRight: 10,
  },
  selectedStar: {
    color: '#FFD700',
  },
  submitButton: {
    backgroundColor: '#1282A2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#FEFCFB',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#FF4D6D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  homeButtonText: {
    color: '#FEFCFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
