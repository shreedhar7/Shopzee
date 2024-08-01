import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { auth } from '../config/firebaseConfig'; // Adjust import according to your project structure

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuthStatus = async () => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          // User is logged in, navigate to the MainTabs
          navigation.replace('MainTabs');
        } else {
          // User is not logged in, navigate to the Login screen
          navigation.replace('Login');
        }
      });

      // Clean up the subscription
      return () => unsubscribe();
    };

    checkAuthStatus();
  }, [navigation]);

  return (
      <View style={styles.container}>
        <Image
          source={require('../assets/shopzee.png')} // Adjust the path as needed
          style={styles.logo}
        />
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loggin In...</Text>
        <Text style={styles.footerText}>Shreedhar Thiruvengadan</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff', // Splash screen background color
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
      resizeMode: 'contain',
    },
    loadingText: {
      color: '#000',
      fontSize: 18,
    },
    footerText: {
      position: 'absolute',
      bottom: 20,
      color: '#999',
      fontSize: 16,

    },
  });

  export default SplashScreen;
