/*
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const ResultScreen = () => {
  const route = useRoute();
  const result1 = route.params?.resultData;
  const result = result1["prediction"];

  //const rotation = useRef(new Animated.Value(0)).current;
  const arrowIconRef = useRef(null);
  const [rotation, setRotation] = useState(new Animated.Value(0));

const rotateArrow = () => {
  const toValue = expandedIndex === index ? 1 : 0;
  Animated.timing(rotation, {
    toValue,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();
};


  var items = Object.keys(result).map((key) => [key, result[key]]);
  items.sort((first, second) => second[1] - first[1]);
  items = items.slice(0, 4); // slice to include only the top 4 matches

  var full_name = {
    "MEL": "Melanoma", 
    "NV": "Melanocytic Nevus", 
    "BCC": "Basal Cell Carcinoma", 
    "AK": "Actinic Keratosis", 
    "BKL": "Benign Keratosis", 
    "DF" : "Dermatofibroma", 
    "VASC": "Vascular Lesion", 
    "SCC": "Squamous Cell Carcinoma"
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    Animated.timing(rotation, {
      toValue: expandedIndex === index ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
  <View style={styles.container}>
    <Header />
    
    <View style={styles.mainTextContainer}>
      <Text style={styles.mainText}>Hello!</Text>
      <Text style={styles.mainText}>These are your top matches:</Text>
    </View>

    <View style={styles.boxContainer}>
      {items.map((item, index) => (
        <View key={index} style={[styles.box, index === 1 ? styles.innerSecond : index === 2 ? styles.innerThird : styles.inner]}>
          <TouchableOpacity onPress={() => { toggleExpanded(index); rotateArrow(); }}>
            <View style={[styles.innerContent, { backgroundColor: index === 1 ? 'rgb(237, 115, 144)' : index === 2 ? 'rgb(229, 152, 80)' : '#45B3CB' }]}>
              <View style={styles.row}>
                {expandedIndex === index ? (
                  <Animated.View style={[styles.arrowIcon, { transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }]}>
                    <FontAwesome5 name="angle-down" style={styles.arrowIcon} />
                  </Animated.View>
                ) : (
                  <FontAwesome5 name="angle-right" style={styles.arrowIcon} />
                )}
                <FontAwesome name='medkit' style={styles.innerIcon} size={24}></FontAwesome>
                <Text style={styles.shortenedName}>{item[0]} - {(item[1] * 100).toFixed(2)}%</Text>
              </View>
              {expandedIndex === index && (
                <View style={styles.expandedContent}>
                  <Text style={styles.fullname}>{full_name[item[0]]}</Text>
                  <Text style={styles.descriptionText}>{getDescription(item[0])}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>        
      ))}
    </View>
  </View>
);

};
*/
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const ResultScreen = () => {
  const route = useRoute();
  const result1 = route.params?.resultData;
  const result = result1["prediction"];

  const [rotation, setRotation] = useState(new Animated.Value(0));
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    rotateArrow(index);
  };

  const rotateArrow = (index) => {
    const toValue = expandedIndex === index ? 0 : 1;
    Animated.timing(rotation, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  var items = Object.keys(result).map((key) => [key, result[key]]);
  items.sort((first, second) => second[1] - first[1]);
  items = items.slice(0, 4); // slice to include only the top 4 matches

  var full_name = {
    "MEL": "Melanoma", 
    "NV": "Melanocytic Nevus", 
    "BCC": "Basal Cell Carcinoma", 
    "AK": "Actinic Keratosis", 
    "BKL": "Benign Keratosis", 
    "DF" : "Dermatofibroma", 
    "VASC": "Vascular Lesion", 
    "SCC": "Squamous Cell Carcinoma"
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Hello!</Text>
        <Text style={styles.mainText}>These are your top matches:</Text>
      </View>

      <View style={styles.boxContainer}>
        {items.map((item, index) => (
          <View key={index} style={[styles.box, index === 1 ? styles.innerSecond : index === 2 ? styles.innerThird : styles.inner]}>
            <TouchableOpacity onPress={() => { toggleExpanded(index); }}>
              <View style={[styles.innerContent, { backgroundColor: index === 1 ? 'rgb(237, 115, 144)' : index === 2 ? 'rgb(229, 152, 80)' : '#45B3CB' }]}>
                <View style={styles.row}>
                  {expandedIndex === index ? (
                    <Animated.View style={[styles.arrowIcon, { transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }]}>
                      <FontAwesome5 name="angle-down" style={styles.arrowIcon} />
                    </Animated.View>
                  ) : (
                    <FontAwesome5 name="angle-right" style={styles.arrowIcon} />
                  )}
                  <FontAwesome name='medkit' style={styles.innerIcon} size={24}></FontAwesome>
                  <Text style={styles.shortenedName}>{item[0]} - {(item[1] * 100).toFixed(2)}%</Text>
                </View>
                {expandedIndex === index && (
                  <View style={styles.expandedContent}>
                    <Text style={styles.fullname}>{full_name[item[0]]}</Text>
                    <Text style={styles.descriptionText}>{getDescription(item[0])}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>        
        ))}
      </View>
    </View>
  );

};




const getDescription = (code) => {
  const descriptions = {
    "MEL": "A type of skin cancer that develops from the pigment-producing cells known as melanocytes.",
    "NV": "Commonly known as a mole, these are typically benign skin growths that result from a proliferation of melanocytes.",
    "BCC": "A form of skin cancer that begins in the basal cells – cells within the skin that produce new skin cells as old ones die off.",
    "AK": "A rough, scaly patch on the skin that develops from years of exposure to the sun and is considered a precancerous skin lesion.",
    "BKL": "A benign skin lesion that includes seborrheic keratoses and solar lentigines. These are common non-cancerous growths.",
    "DF": "A non-cancerous round, brownish skin growth, typically found on the lower legs.",
    "VASC": "These are skin lesions that are made up of blood vessels that have abnormally proliferated. They include things like cherry angiomas, angiokeratomas, and pyogenic granulomas.",
    "SCC": "A form of skin cancer that develops in the squamous cells, which make up the middle and outer layers of the skin."
  };
  return descriptions[code];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    height: '25%', 
  },
  box: {
    marginBottom: 10,
  },
  inner : {
    paddingHorizontal: 10,
    paddingVertical: '4%',
    borderRadius: 15,
    backgroundColor: '#45B3CB', // default blue 
  },
    innerSecond: {
      paddingHorizontal: 10,
      paddingVertical: '4%',
      borderRadius: 15,
      backgroundColor: 'rgb(237, 115, 144)', // pink color 
    },
    innerThird: {
      paddingHorizontal: 10,
      paddingVertical: '4%', 
      borderRadius: 15,
      backgroundColor: 'rgb(229, 152, 80)', // orange color
    },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    marginRight: 10,
    color: 'white',
  },
  innerIcon: {
    color: 'white',
    marginRight: 10,
  },
  shortenedName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  expandedContent: {
    marginTop: 10,
  },
  fullname: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    paddingTop: 5,
    color: 'white',
    fontSize: 14,
  },
  mainTextContainer: {
    marginHorizontal: 22,
  },
  mainText: {
    fontSize: 24,
    lineHeight: 32,
  },
  arrowIcon: {
    color: 'white',
    marginRight: 10,
    fontSize: 24,
  },
});

export default ResultScreen;