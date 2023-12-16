import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const DescriptionText = ({ description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular'
  },
});

export default DescriptionText;
