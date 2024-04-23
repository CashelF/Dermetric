import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from '../components/Header';

function ConditionsScreen() {
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

      const getBackgroundColor = (index) => {
        const colors = [
          '#45B3CB', // Blue
          'rgb(237, 115, 144)', // Pink
          'rgb(229, 152, 80)'  // Orange
        ];
        return colors[index % 3]; // Cycle through 0, 1, 2
      };

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.mainTextContainer}>
                <Text style={styles.mainText}>Hello!</Text>
                <Text style={styles.mainText}>These are common conditions:</Text>
            </View>

            <ScrollView style={styles.boxContainer}>
                {Object.keys(full_name).map((key, index) => (
                <View key={index} style={[styles.box, {backgroundColor: getBackgroundColor(index)}]}>
                    <View style={styles.inner}>
                    <Text style={styles.fullname}>{full_name[key]}</Text>
                    <Text style={styles.descriptionText}>{descriptions[key]}</Text>
                    </View>
                </View>
                ))}
            </ScrollView>
         </View>
    );
}

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
      borderRadius: 15,
    },
    inner : {
      paddingHorizontal: 10,
      paddingVertical: '4%',
      borderRadius: 15,
    },
      innerSecond: {
        paddingHorizontal: 10,
        paddingVertical: '4%',
        borderRadius: 15,
      },
      innerThird: {
        paddingHorizontal: 10,
        paddingVertical: '4%', 
        borderRadius: 15,
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

export default ConditionsScreen;