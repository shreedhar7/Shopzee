// screens/CartScreen.js
import React from 'react';
import { View, Text, Button, FlatList,SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, clearCart } from '../store/slices/cartSlice';

const Order = () => {
   return (
      <SafeAreaView>
         <View>
            <Text>Order</Text>
         </View>
      </SafeAreaView>
   )
}

export default Order;