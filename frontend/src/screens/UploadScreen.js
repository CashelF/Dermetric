import React, { useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import DescriptionText from '../components/DescriptionText';
import colors from '../../assets/colors/colors';
const doctorImage = require('../../assets/images/UploadScreenDoctor.svg');

const UploadScreen = () => {
  const [description, setDescription] = useState('Use our image classification machine learning algorithms to test for skin disorders');
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri, type: response.type, name: 'upload.jpg' };
        setImage(source);
  
        
        let formData = new FormData();
        formData.append('file', source);
  
        try {
          const response = await fetch('http://dermetric.com/api/ml/predict', {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) {
            throw new Error('Something went wrong with the API call');
          }
  
          const result = await response.json();
          console.log('API Response: ', result);
        } catch (error) {
          console.error('Error during image upload: ', error);
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
