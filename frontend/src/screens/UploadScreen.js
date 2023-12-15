import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ImageUploadButton from './components/ImageUploadButton';
import ImageView from './components/ImageView';
import DescriptionInput from './components/DescriptionInput';

const UploadScreen = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleUpload = () => {
    console.log('Image: ', image);
    console.log('Description: ', description);
    // Add your upload logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload your Image</Text>
      <ImageView image={image} />
      <DescriptionInput description={description} setDescription={setDescription} />
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
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default UploadScreen;
