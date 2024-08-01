import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/slices/cartSlice';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import toastConfig from '../config/toastConfig';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addItem(product));
    Toast.show({
      type: 'success',
      text1: 'Item Added!',
      text2: `${product.title} has been added to your cart.`,
      position: 'bottom',
      bottomOffset: 70,
    });
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
      Toast.show({
        type: 'info',
        text1: 'Removed from Favorites',
        text2: `${product.title} has been removed from your favorites.`,


      });
    } else {
      dispatch(addFavorite(product));
      Toast.show({
        type: 'info',
        text1: 'Added to Favorites',
        text2: `${product.title} has been added to your favorites.`,

      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color={isFavorite ? 'red' : 'gray'} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.rating}>Rating: {product.rating.rate} ({product.rating.count})</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <Toast config={toastConfig} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 5,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e91e63',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  rating: {
    fontSize: 16,
    marginBottom: 20,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#888',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
