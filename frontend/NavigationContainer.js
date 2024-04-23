// NavigationContainer.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UploadScreen from './src/screens/UploadScreen';
import ResultScreen from './src/screens/ResultScreen';
import NavigationBar from './src/screens/NavigationBar';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Upload">
      <Stack.Screen
        name="Upload"
        component={UploadScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={NavigationBar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  /*
  <Stack.Navigator>
    <Stack.Screen name="UploadScreen" component={UploadScreen} />
    <Stack.Screen name="ResultScreen" component={ResultScreen} />
  </Stack.Navigator>
  */
);

export default AppNavigator;
