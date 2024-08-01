import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { auth } from '../config/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed

const screenWidth = Dimensions.get('window').width;

const ProfileScreen = ({ navigation }) => {
  const user = auth.currentUser; // Get the current authenticated user

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: 'cancel' },
        { text: "Logout", onPress: () => auth.signOut() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.displayName || 'N/A'}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Favorites')}>
          <Icon name="favorite" size={20} color="#fff" style={styles.optionIcon} />
          <Text style={styles.optionText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Orders')}>
          <Icon name="list-alt" size={20} color="#fff" style={styles.optionIcon} />
          <Text style={styles.optionText}>Orders</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="exit-to-app" size={20} color="#fff" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <View style={{alignItems:'center',justifyContent :'center',marginBottom:-13}}>
        <Text style={styles.footerText}>Developed by Shreedhar Thiruvengadan</Text>
        <Text style={styles.footerText}>Version - 1.0.1</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Light cyan background
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#00796b', // Darker cyan for border
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004d40', // Dark cyan
  },
  email: {
    fontSize: 18,
    color: '#00796b', // Darker cyan
  },
  options: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#888888', // Dark cyan
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  optionIcon: {
    marginLeft: 15,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: 30,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CFCFCF', // Gray
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: screenWidth * 0.5,
    marginBottom: 20,
  },
  logoutIcon: {
    marginLeft: 15,
    color: '#000',
  },
  logoutText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  footerText: {
    color: '#BCBABA', // Darker cyan for footer text
    fontSize: 14,

  },
});

export default ProfileScreen;
