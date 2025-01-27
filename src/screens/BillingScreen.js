import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  View,
} from 'react-native';

const BillingScreen = ({ route, navigation }) => {
  // Safely get selected plan details from route params
  const { selectedPlan } = route.params || {}; // Fallback to empty object if undefined

  if (!selectedPlan) {
    // Handle the case when selectedPlan is not passed
    Alert.alert('Error', 'No plan selected!');
    return null; // or navigate back
  }

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Handle billing info update
  const handleUpdateBilling = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidCardNumber(cardNumber)) {
      Alert.alert('Error', 'Please enter a valid card number.');
      return;
    }

    if (!isValidExpiryDate(expiryDate)) {
      Alert.alert('Error', 'Please enter a valid expiry date.');
      return;
    }

    if (!isValidCVV(cvv)) {
      Alert.alert('Error', 'Please enter a valid CVV.');
      return;
    }

    Alert.alert('Success', `Billing info updated for ${selectedPlan.name}!`);
  };

  // Validate card number (basic check for now)
  const isValidCardNumber = (cardNumber) => {
    return /^\d{16}$/.test(cardNumber); // Check if card number is 16 digits
  };

  // Validate expiry date (MM/YY format)
  const isValidExpiryDate = (expiryDate) => {
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const expiryDateObj = new Date(`20${year}`, month - 1);
    return expiryDateObj > currentDate;
  };

  // Validate CVV
  const isValidCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv); // Check if CVV is 3 or 4 digits
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Billing Information</Text>

      <Text style={styles.planInfo}>
        You are paying for the{' '}
        <Text style={styles.planName}>{selectedPlan.name}</Text> plan.
      </Text>

      {/* Card Number */}
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        placeholderTextColor="#034078"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="number-pad"
      />

      {/* Expiry Date */}
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        placeholderTextColor="#034078"
        value={expiryDate}
        onChangeText={setExpiryDate}
        keyboardType="number-pad"
      />

      {/* CVV */}
      <TextInput
        style={styles.input}
        placeholder="CVV"
        placeholderTextColor="#034078"
        value={cvv}
        onChangeText={setCvv}
        secureTextEntry
        keyboardType="number-pad"
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdateBilling}>
        <Text style={styles.buttonText}>Update Billing Info</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0A1128',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#034078',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  navButtonText: {
    color: '#FEFCFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FEFCFB',
    marginBottom: 30,
  },
  planInfo: {
    fontSize: 16,
    color: '#FEFCFB',
    marginBottom: 20,
    textAlign: 'center',
  },
  planName: {
    fontWeight: 'bold',
    color: '#1282A2',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FEFCFB',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#001F54',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#034078',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FEFCFB',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BillingScreen;
