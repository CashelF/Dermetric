import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const windowHeight = Dimensions.get('window').height;

const Header = () => {
  const navigation = useNavigation(); // Get navigation object

  // Function to navigate to the UploadScreen
  const navigateToUpload = () => {
    navigation.navigate('Upload'); // Ensure 'Upload' is the correct name of your UploadScreen in the navigator
  };

  return (
    <SafeAreaView>
        <View style={styles.headerContainer}>
            {/* Make the icon clickable */}
            <TouchableOpacity onPress={navigateToUpload}>
                <FontAwesome name='home' style={styles.leftIcon} size={32} />
            </TouchableOpacity>
            <FontAwesome name='medkit' style={styles.rightIcon} size={32} />
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
    marginHorizontal: 22,
  },
  leftIcon: {
    color: '#45B3CB'
  },
  rightIcon: {
    color: '#45B3CB'
  }
});

export default Header;
