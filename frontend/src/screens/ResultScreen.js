import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'

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
                <FontAwesome name='medkit' style={styles.innerIcon} size={32}></FontAwesome>
                <View style={styles.innerInlineText}>
                    <Text style={styles.innerNamePerc}>Name</Text>
                    <Text style={styles.innerNamePerc}>90%</Text>
                </View>
                <Text style={styles.descriptionText}>Description</Text>
            </View>
        </View>

        <View style={styles.box}>
            <View style={{...styles.inner, backgroundColor: '#ED7390'}}>
                <FontAwesome name='medkit' style={styles.innerIcon} size={32}></FontAwesome>
                <View style={styles.innerInlineText}>
                    <Text style={styles.innerNamePerc}>Name</Text>
                    <Text style={styles.innerNamePerc}>90%</Text>
                </View>
                <Text style={styles.descriptionText}>Description</Text>
            </View>
        </View>
      
        <View style={styles.box}>
            <View style={{...styles.inner, backgroundColor: '#E59850'}}>
                <FontAwesome name='medkit' style={styles.innerIcon} size={32}></FontAwesome>
                <View style={styles.innerInlineText}>
                    <Text style={styles.innerNamePerc}>Name</Text>
                        <Text style={styles.innerNamePerc}>90%</Text>
                </View>
                <Text style={styles.descriptionText}>Description</Text>
            </View>
        </View>
      
        <View style={styles.box}>
            <View style={{...styles.inner, backgroundColor: '#45B3CB'}}>
                <FontAwesome name='medkit' style={styles.innerIcon} size={32}></FontAwesome>
                <View style={styles.innerInlineText}>
                    <Text style={styles.innerNamePerc}>Name</Text>
                    <Text style={styles.innerNamePerc}>90%</Text>
                </View>
                <Text style={styles.descriptionText}>Description</Text>
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
    width: '100%',
    paddingHorizontal: '10%',
    paddingVertical: '30%',
    borderRadius: 15
  },
  mainTextContainer: {
    marginHorizontal: 22,
  },
  mainText: {
    fontSize: 24,
    lineHeight: 32
  },
  innerIcon: {
    color: 'white'
  },
  innerInlineText: {
    paddingTop: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerNamePerc: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionText: {
    paddingTop: '5%',
    color: 'white',
    fontSize: 12
  }
});

export default ResultScreen;


