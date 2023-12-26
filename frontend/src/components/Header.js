
import React from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

const windowHeight = Dimensions.get('window').height;

const Header = () => {
  return (
    <SafeAreaView>
        <View style={styles.headerContainer}>
            <FontAwesome name='home' size={32}></FontAwesome>
            <FontAwesome name='medkit' size={32}></FontAwesome>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: windowHeight * 0.1, // 10% of the screen height
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal:22,
  },
  iconStyle: {
    marginLeft: 'auto'
  },
  rightIcon: {
    // Additional styling for the right icon if needed
  }
});

export default Header;

