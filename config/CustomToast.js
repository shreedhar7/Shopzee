// CustomToast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const CustomToast = ({ text1, text2 }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/login.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  lottie: {
    width: 50,
    height: 50,
  },
  textContainer: {
    marginLeft: 10,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  text2: {
    fontSize: 14,
    color: '#666',
  },
});

export default CustomToast;
