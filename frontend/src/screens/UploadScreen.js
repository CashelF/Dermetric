import React, { useState } from 'react';
import { Dimensions, View, Image, Text, StyleSheet, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../assets/colors/colors';
import { useNavigation } from '@react-navigation/native';
import ClipLoader from "react-spinners/ClipLoader";

// Constants and utility functions
const SERVER_URL = 'https://api.cashel.dev';
const screenWidth = Dimensions.get('window').width;
const ellipseHeight = screenWidth * 1.6;
const doctorImage = require('../../assets/images/UploadScreenDoctor.png');

const base64ToBlob = (base64, mimeType) => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

const UploadScreen = () => {
  const navigation = useNavigation();
  const [isUploading, setIsUploading] = useState(false); 

  const requestPermissionAndPickImage = async () => {
    // Request permission (if not already granted)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Photo access is not enabled!");
      return;
    }

    // Launch the image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (pickerResult.canceled === true) {
      return;
    }

    return pickerResult;
  };

  const createFormData = (photo = {}) => {
    const mimeTypeMatch = photo.uri.match(/^data:(.*);base64,/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : null;

    let formData = new FormData();

    if(photo.uri.startsWith('file://')) {
      formData.append('file', {
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        type: mimeType || 'image/jpeg',
        name: photo.fileName || 'image.jpg'
      });
    } else{
      const imageBlob = base64ToBlob(photo.uri, photo.type || 'image/jpeg');
      formData.append('file', imageBlob, photo.fileName || 'image.jpg');
    }

    return formData;
  };

    const handleUpload = async () => {
      try {
        const pickerResult = await requestPermissionAndPickImage();
        if (!pickerResult) {
          return;
        }
        setIsUploading(true); 
        
        const formData = createFormData({
          uri: pickerResult.assets[0].uri,
          type: 'image/jpeg', // Adjust based on actual image type
          name: 'photo.jpg', // Adjust based on actual image name or use a generated name
        });
  
        const response = await fetch(`${SERVER_URL}/api/ml/predict`, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong with the API call');
        }
  
        const result = await response.json();
        navigation.navigate('ResultScreen', { resultData: result });
      } catch (error) {
        console.error('Error during image upload: ', error);
        alert('Error during image upload. Please try again.');
      }
      finally {
        setIsUploading(false); 
      } 
    };  

/*
 <View style={styles.container}>
      
      {isUploading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.accent}
          />
        </View>
      )} 
*/
  return (
    /*
    <View style={styles.container}>
      
      {isUploading && (
        <View style={styles.loaderContainer}> 
          <ClipLoader
          color={colors.accent} 
          loading={isUploading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
        </View>
      )} 
      */
    <View style={styles.container}>
      
      {isUploading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.accent}
          />
        </View>
      )} 
      <View style={styles.imageAndEllipseContainer}>
        <View style={styles.ellipse} />
        <Text style={styles.title}>Dermetric</Text>
        <Image source={doctorImage} style={styles.image} />
      </View>
      <Text style={styles.header}>AI Medical Assistant</Text>
      <Text style={styles.description}>
        Use our image classification machine learning algorithms to test for skin disorders
      </Text>
      {!isUploading && ( 
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Nunito-Bold', fontWeight: '700' }}>Upload Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
      color: colors.accent,
      fontSize: 36,
      marginBottom: 50,
      fontFamily: 'Nunito-Bold',
      fontWeight: '700',
    },
    imageAndEllipseContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    ellipse: {
      position: 'absolute',
      top: -ellipseHeight / 1.6,
      width: screenWidth,
      height: ellipseHeight,
      backgroundColor: colors.primary,
      borderRadius: screenWidth,
      transform: [{ scaleX: 1.25 }],
    },
    image: {
        width: screenWidth * 0.4,
        height: screenWidth * 0.4 * (231/269),
        zIndex: 1,
        aspectRatio: 1,
    },
    header: {
        fontSize: 22,
        marginTop: 50,
        marginBottom: 20,
        fontFamily: 'Nunito-Bold',
        fontWeight: '700',
    },
    description: {
        fontSize: 20,
        fontFamily: 'Nunito-Regular',
        textAlign: 'center',
        marginHorizontal: 50,
        marginBottom: 50,
    },
    button: {
      /*
        backgroundColor: colors.accent,
        borderRadius: 20,
        paddingHorizontal: 20, 
        paddingVertical: 20, 
        
        marginBottom: 30, 
         width: '75%',
        width: screenWidth * 0.25, 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        */
        backgroundColor: colors.accent,
        borderRadius: 20,
        padding: 10,
        width: screenWidth * 0.75,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, 
    },
});

export default UploadScreen;
