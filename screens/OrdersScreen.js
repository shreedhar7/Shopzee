import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function OrdersScreen() {
  const orders = useSelector((state) => state.cart.orders);
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);

  const handleToggleOrder = (index) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productText}>Quantity: {item.quantity}</Text>
        <Text style={styles.productText}>Price: ${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderOrder = ({ item, index }) => (
    <View style={styles.orderContainer}>
      <TouchableOpacity onPress={() => handleToggleOrder(index)} style={styles.orderHeader}>
        <Text style={styles.orderName}>{item.name}</Text>
        <Text style={styles.orderText}>Address: {item.address}</Text>
        <Text style={styles.orderText}>Total: ${item.totalAmount.toFixed(2)}</Text>
        <Text style={styles.orderText}>Orderd on :  {formatDate(item.timestamp)}</Text>
      </TouchableOpacity>

      {expandedOrderIndex === index && item.items && item.items.length > 0 && (
        <FlatList
          data={item.items}
          keyExtractor={(product, index) => `product-${index}`}
          renderItem={renderProduct}
          style={styles.productList}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => `order-${index}`}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 10,
  },
  orderContainer: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  orderHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderText: {
    fontSize: 14,
    color: '#666',
  },
  productList: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productText: {
    fontSize: 14,
    color: '#555',
  },
});
