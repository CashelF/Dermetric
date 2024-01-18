import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'

const ResultScreen = () => {
  const route = useRoute();
  const result1 = route.params?.resultData;
  const result = result1["prediction"]
  console.log(result);
  var items = Object.keys(result).map(
    (key) => { return [key, result[key]] 
  });
  items.sort(
    (first, second) => { return second[1] - first[1] }
  );
  console.log(items)
  var full_name = {"MEL": "Melanoma", "NV": "Melanocytic Nevus", "BCC": "Basal Cell Carcinoma", "AK": "Actinic Keratosis", "BKL": "Benign Keratosis", "DF" : "Dermatofibroma", "VASC": "Vascular Lesion", "SCC": "Squamous Cell Carcinoma"}
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
                    <Text style={styles.innerNamePerc}>{items[0][0]}</Text>
                    <Text style={styles.innerNamePerc}>{(items[0][1] * 100).toFixed(2)}%</Text>
                </View>
                <Text style={styles.descriptionText}>{full_name[items[0][0]]}</Text>
            </View>
        </View>

        <View style={styles.box}>
            <View style={{...styles.inner, backgroundColor: '#ED7390'}}>
                <FontAwesome name='medkit' style={styles.innerIcon} size={32}></FontAwesome>
                <View style={styles.innerInlineText}>
                    <Text style={styles.innerNamePerc}>{items[1][0]}</Text>
                    <Text style={styles.innerNamePerc}>{(items[1][1] * 100).toFixed(2)}%</Text>
                </View>
                <Text style={styles.descriptionText}>{full_name[items[1][0]]}</Text>
            </View>
        </View>
      
        <View style={styles.box}>
            <View style={{...styles.inner, backgroundColor: '#E59850'}}>
                <FontAwesome name='medkit' style={styles.innerIcon} size={32}></FontAwesome>
                <View style={styles.innerInlineText}>
                    <Text style={styles.innerNamePerc}>{items[2][0]}</Text>
                        <Text style={styles.innerNamePerc}>{(items[2][1] * 100).toFixed(2)}%</Text>
                </View>
                <Text style={styles.descriptionText}>{full_name[items[2][0]]}</Text>
            </View>
        </View>
      
        <View style={styles.box}>
            <View style={{...styles.inner, backgroundColor: '#45B3CB'}}>
                <FontAwesome name='medkit' style={styles.innerIcon} size={32}></FontAwesome>
                <View style={styles.innerInlineText}>
                    <Text style={styles.innerNamePerc}>{items[3][0]}</Text>
                    <Text style={styles.innerNamePerc}>{(items[3][1] * 100).toFixed(2)}%</Text>
                </View>
                <Text style={styles.descriptionText}>{full_name[items[3][0]]}</Text>
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


