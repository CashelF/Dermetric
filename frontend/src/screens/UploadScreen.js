import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import ImageUploadButton from '../components/ImageUploadButton';
import ImageView from '../components/ImageView';
import DescriptionText from '../components/DescriptionText';

const doctorImage = require('../../assets/images/UploadScreenDoctor.svg');

const UploadScreen = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('Use our image classification machine learning algorithms to test for skin disorders');

  const handleUpload = () => {
    console.log('Image: ', image);
    console.log('Description: ', description);
    // Add your upload logic here
  };

  return (
    <View style={styles.container}>
        <Image
            source={doctorImage}
            style={styles.image}
        />
      <Text style={styles.header}>AI Medical Assistant</Text>
      <DescriptionText description={description} setDescription={setDescription} />
      <ImageUploadButton setImage={setImage} />
      <Button title="Upload" onPress={handleUpload} />
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
});

export default UploadScreen;
