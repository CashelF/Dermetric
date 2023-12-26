import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { View, Image, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DescriptionText from '../components/DescriptionText';
import colors from '../../assets/colors/colors';

const screenWidth = Dimensions.get('window').width;
const ellipseHeight = screenWidth * 1.6;
const doctorImage = require('../../assets/images/UploadScreenDoctor.png');
const SERVER_URL = 'http://localhost:5000';

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
  const [description, setDescription] = useState('Use our image classification machine learning algorithms to test for skin disorders');

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

    console.log('Form Data: ', formData);

    return formData;
  };

  const handleUpload = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert('Error in image upload');
      } else {
        if (response.assets && response.assets.length > 0) {
          const firstImage = response.assets[0];

          try {
            const response = await fetch(`${SERVER_URL}/api/ml/predict`, {
              method: 'POST',
              body: createFormData(firstImage)
            });
    
            if (!response.ok) {
              throw new Error('Something went wrong with the API call');
            }
    
            const result = await response.json();
            console.log('API Response: ', result);
          } catch (error) {
            console.error('Error during image upload: ', error);
          }
        } else {
          throw new Error('No image found');
        }
      }
    });
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.imageAndEllipseContainer}>
        <View style={styles.ellipse} />
        <Text style={styles.title}>Dermetric.</Text>
        <Image source={doctorImage} style={styles.image} />
      </View>
      <Text style={styles.header}>AI Medical Assistant</Text>
      <DescriptionText style={{fontSize: 16}} description={description} setDescription={setDescription} />
      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Nunito-Bold', fontWeight: '700' }}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};

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
        width: screenWidth * 0.5,
        height: screenWidth * 0.5 * (231/269),
        zIndex: 1,
    },
    header: {
        fontSize: 18,
        marginTop: 50,
        marginBottom: 20,
        fontFamily: 'Nunito-Bold',
        fontWeight: '700',
    },
    button: {
        backgroundColor: colors.accent,
        borderRadius: 20,
        padding: 10,
        width: '75%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UploadScreen;
