// NavigationContainer.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UploadScreen from './src/screens/UploadScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="UploadScreen" component={UploadScreen} />
    <Stack.Screen name="ResultScreen" component={ResultScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
