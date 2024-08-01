import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../store/slices/cartSlice';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

export default function PaymentsScreen({ route, navigation }) {
  const { items, totalAmount } = route.params;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (name && address && mobileNumber) {
      const orderDetails = {
        name,
        address,
        mobileNumber,
        paymentMethod,
        items,
        totalAmount,
        timestamp: new Date().toISOString(),
      };
      dispatch(placeOrder(orderDetails));
      setModalVisible(true); // Show the modal after placing the order
    } else {
      Alert.alert('Missing Details', 'Please fill in all the details.');

    }
  };

  const handleModalHide = () => {
    // Navigate to CartScreen after modal is hidden
    navigation.navigate('CartScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />
      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder="Enter your mobile number"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Payment Method</Text>
      <RadioButton.Group
        value={paymentMethod}
        onValueChange={setPaymentMethod}
      >
        <View style={styles.radioContainer}>
          <RadioButton value="gpay" />
          <Image
              style={styles.tinyLogo}
              source={require('../assets/gpay.png')}
            />
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="paytm" />
          <Image
                style={styles.tinyLogo}
                source={require('../assets/paytm.png')}
              />
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="phonepe" />
          <Image
                style={styles.tinyLogo2}
                source={require('../assets/phonpe.png')}
              />
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="cash" />
          <Text style={styles.radioLabel}>Cash on Delivery</Text>
        </View>
      </RadioButton.Group>
      <Text style={styles.orderSummaryTitle}>Order Summary:</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemSummary}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDetailsText}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemDetailsText}>Price: ${item.price.toFixed(2)}</Text>
          </View>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Amount: ${totalAmount.toFixed(2)}</Text>
      </View>
      <Button title="Buy" onPress={handleSubmit} color="#888" />

      {/* Modal for Order Placed */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onModalHide={handleModalHide} // Handle navigation after modal is hidden
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <LottieView
            source={require('../assets/login.json')} // Replace with your Lottie file path
            autoPlay
            loop={false}
            style={styles.lottie}
          />
          <Text style={styles.modalText}>Order Placed</Text>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  itemSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDetailsText: {
    fontSize: 14,
    color: '#555',
  },
  totalContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  tinyLogo : {
     height: 20 ,
     width : 50,
     resizeMode : 'contain'
  },
  tinyLogo2 : {
     height: 25 ,
     width : 70,
     resizeMode : 'contain'
  },
});
