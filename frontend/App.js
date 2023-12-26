import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font';
import UploadScreen from './src/screens/UploadScreen';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
      'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    });
  }

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  return (
    <View style={styles.container}>
      <UploadScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
