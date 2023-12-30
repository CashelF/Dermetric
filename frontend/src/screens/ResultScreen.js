import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';

const ResultScreen = () => {
  const route = useRoute();
  const result = route.params?.resultData;
  console.log(result);
  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Hello,</Text>
        <Text style={styles.mainText}>These are your top matches</Text>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.box}>
            <View style={{...styles.inner, backgroundColor: '#45B3CB'}}>
                <Text>Box 1</Text>
            </View>
        </View>

        <View style={styles.box}>
            <View style={{...styles.inner, backgroundColor: '#ED7390'}}>
                <Text>Box 1</Text>
            </View>
        </View>
      
        <View style={styles.box}>
            <View style={{...styles.inner, backgroundColor: '#E59850'}}>
                <Text>Box 1</Text>
            </View>
        </View>
      
        <View style={styles.box}>
            <View style={{...styles.inner, backgroundColor: '#45B3CB'}}>
                <Text>Box 1</Text>
            </View>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  boxContainer: {
    height: '65%',
    marginHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: '50%',
    height: '50%',
    padding: 5,
  },
  inner : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  mainTextContainer: {
    marginHorizontal: 22,
  },
  mainText: {
    fontSize: 24,
    lineHeight: 32
  }
});

export default ResultScreen;


