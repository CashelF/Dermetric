import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DescriptionInput = ({ description, setDescription }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={setDescription}
      value={description}
      placeholder="Enter description"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
});

export default DescriptionInput;
