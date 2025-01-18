import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const plans = [
    {
        id: '1',
        name: 'Free plan',
        price: 'KSH0',
        description: ' -The Free Plan gives you access to the core features of our platform, perfect for new users who want to experience the basics of what we offer without any commitment.\n- Access to basic music library**: Enjoy a limited selection of songs and playlists.\n- Playlists and Favorites**: Create your own playlists and favorite songs for easy access.\n- Standard Audio Quality**: Listen to music in standard audio quality.\n- Ad-Supported**: Enjoy your music with occasional advertisements.\n- Limited Skips**: Limited song skips per hour.\n- Upgrade to one of our paid plans for enhanced features, including ad-free listening, higher-quality audio, and access to exclusive content!'
      
    },
  {
    id: '2',
    name: 'Basic Plan',
    price: 'KSH55/month',
    description: `- Access to basic music library.\n- Limited skips (10/day).\n- Standard audio quality.\n- No offline downloads.`,
  },
  {
    id: '3',
    name: 'Premium Plan',
    price: 'KSH200/month',
    description: `- Full access to the entire music library.\n- Unlimited skips.\n- High-quality audio (320kbps).\n- Offline downloads.\n- No ads.`,
  },
  {
    id: '4',
    name: 'Pro Plan',
    price: 'KSH400/month',
    description: `- Everything in Premium, plus:\n- Family sharing (up to 5 accounts).\n- Personalized recommendations.\n- Priority customer support.\n- Exclusive early access to new features.`,
  },
];

const PlansScreen = ({ navigation }) => {
  const handleSelectPlan = (plan) => {
    // Navigate to Billing Screen with selected plan details
    navigation.navigate('Billing', { selectedPlan: plan }); // plan should contain the selected plan data

  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <Text style={styles.planDescription}>{plan.description}</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => handleSelectPlan(plan)}
          >
            <Text style={styles.selectButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1128',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FEFCFB',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  planCard: {
    backgroundColor: '#034078',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  planName: {
    fontSize: 20,
    color: '#FEFCFB',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  planPrice: {
    fontSize: 18,
    color: '#1282A2',
    marginBottom: 10,
  },
  planDescription: {
    fontSize: 16,
    color: '#FEFCFB',
    marginBottom: 15,
    lineHeight: 22,
  },
  selectButton: {
    backgroundColor: '#1282A2',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FEFCFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlansScreen;
