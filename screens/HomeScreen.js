import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Animated, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Alert, SafeAreaView, Platform, StatusBar } from 'react-native';
import { fetchProducts } from '../services/products';
import { auth } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import Carousel from './Carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Import SafeAreaInsets

const screenWidth = Dimensions.get('window').width;

const categories = ['Mens', 'Womens', 'Jewelry', 'Gadgets', 'Appliances', 'Gifts', 'Gold', 'Silver'];

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets(); // Get Safe Area Insets

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newProducts = await fetchProducts(page);
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setHasMore(newProducts.length > 0);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        console.error("Error signing out: ", error);
      });
  };

  const confirmLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: handleLogout,
        },
      ],
      { cancelable: false }
    );
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
        <Text style={styles.rating}>Rating: {item.rating.rate} ({item.rating.count})</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const updateLayout = () => {
      setNumColumns(screenWidth > 600 ? 3 : 2);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => {
      subscription?.remove();
    };
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/shopzee.png')}
          />
          <TouchableOpacity>
            <Fontisto name="search" size={24} color="#4E4D4D" style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </View>

        <Animated.FlatList
          ListHeaderComponent={
            <>
              <FlatList
                data={categories}
                keyExtractor={(item, index) => `category-${index}`} // Unique key for each category
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryText}>{item}</Text>
                  </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
              />
              <Carousel />
            </>
          }
          data={products}
          keyExtractor={(item, index) => `${item.id}-${index}`} // Ensuring unique keys
          renderItem={renderProduct}
          numColumns={numColumns} // Dynamic number of columns
          columnWrapperStyle={styles.columnWrapper}
          key={numColumns} // Trigger re-render when numColumns changes
          onEndReached={loadProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productContainer: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  footer: {
    paddingVertical: 20,
  },
  tinyLogo: {
    resizeMode: 'center',
    height: 30,
    width: 100,
  },
  categoriesContainer: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;
