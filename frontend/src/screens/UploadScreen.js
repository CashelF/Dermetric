import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { View, Image, Text, StyleSheet, Button, Platform } from 'react-native';
import DescriptionText from '../components/DescriptionText';
import colors from '../../assets/colors/colors';

const doctorImage = require('../../assets/images/UploadScreenDoctor.svg');
const SERVER_URL = 'http://localhost:5000';

const UploadScreen = () => {
  const [description, setDescription] = useState('Use our image classification machine learning algorithms to test for skin disorders');

  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
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

    console.log('Form Data: ', formData);

    return formData;
  };

  const handleUpload = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
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
        <Image
            source={doctorImage}
            style={styles.image}
        />
      <Text style={styles.header}>AI Medical Assistant</Text>
      <DescriptionText description={description} setDescription={setDescription} />
      <Button title="Upload" style={styles.button} onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 269,
        height: 231,
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'Nunito-Bold'
    },
    button: {
        color: colors.accent,
        borderRadius: 5,
        padding: 10,
        width: 100,
        height: 50,
    },
});

export default UploadScreen;
