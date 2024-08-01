// config/toastConfig.js
import React from 'react';
import { StyleSheet, View, Text,Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';


const screenWidth = Dimensions.get('window').width;

const CustomToast = ({ text1, text2, backgroundColor, lottieSource }) => (
  <View style={[styles.toastContainer, { backgroundColor }]}>
    <LottieView
      source={lottieSource}
      autoPlay
      loop={false}
      style={styles.lottie}
    />
    <View style={styles.textContainer}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  </View>
);

export default {
  success: (internalState) => (
    <CustomToast
      text1={internalState.text1}
      text2={internalState.text2}
      backgroundColor="white"
      lottieSource={require('../assets/login.json')}
    />
  ),
  error: (internalState) => (
    <CustomToast
      text1={internalState.text1}
      text2={internalState.text2}
      backgroundColor="red"
      lottieSource={require('../assets/login.json')}
    />
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    width : screenWidth*0.9
  },
  lottie: {
    width: 50,
    height: 50,
  },
  textContainer: {
    marginLeft: 10,
  },
  toastText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
