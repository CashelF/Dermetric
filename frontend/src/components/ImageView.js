import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageView = ({ image }) => {
  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ImageView;
