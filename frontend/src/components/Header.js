
import React from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

const windowHeight = Dimensions.get('window').height;

const Header = () => {
  return (
    <SafeAreaView>
        <View style={styles.headerContainer}>
            <FontAwesome name='home' style={styles.leftIcon} size={32}></FontAwesome>
            <FontAwesome name='medkit' style={styles.rightIcon} size={32}></FontAwesome>
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
  leftIcon: {
    color: '#45B3CB'
  },
  rightIcon: {
    color: '#45B3CB'
  }
});

export default Header;

