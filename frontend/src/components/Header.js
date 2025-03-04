import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width: screenWidth, height: windowHeight } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && screenWidth > 768;

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
                <FontAwesome name='home' style={styles.leftIcon} size={isDesktop ? 36 : 32} />
            </TouchableOpacity>
            <FontAwesome name='medkit' style={styles.rightIcon} size={isDesktop ? 36 : 32} />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: isDesktop ? 80 : windowHeight * 0.1, // Fixed height on desktop, percentage on mobile
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: isDesktop ? '10%' : 22,
    // Center on desktop with max-width
    ...(isDesktop && {
      maxWidth: 1200,
      alignSelf: 'center',
      width: '80%',
      paddingHorizontal: 20
    })
  },
  leftIcon: {
    color: '#45B3CB'
  },
  rightIcon: {
    color: '#45B3CB'
  }
});

export default Header;