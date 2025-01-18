import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from './src/screens/AboutScreen';
import BillingScreen from './src/screens/BillingScreen';
import PlansScreen from './src/screens/PlansScreen';



const Drawer =createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={HomeScreen}/>
        <Drawer.Screen name='About' component={AboutScreen}/>
        <Drawer.Screen name='Billing' component={BillingScreen}/>
        <Drawer.Screen name='Plans' component={PlansScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
    
    
  );
}
