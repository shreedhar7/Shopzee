import React, { useRef, useState, useEffect } from 'react';
import { Animated, Dimensions, FlatList, Image, View, StyleSheet } from 'react-native';

// Import your local images
import image1 from '../assets/add1.jpg';
import image2 from '../assets/add3.jpg';
import image3 from '../assets/add2.jpg';

const { width: screenWidth } = Dimensions.get('window');

// Update images array with local image imports
const images = [image1, image2, image3];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // Automatic scrolling function
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        flatListRef.current.scrollToOffset({ offset: nextIndex * screenWidth, animated: true });
        return nextIndex;
      });
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false, // Set to true if you're not using `onScroll` listener
      listener: (event) => {
        const index = Math.floor(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentIndex(index);
      }
    }
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item, index) => `carousel-image-${index}`} // Unique key for each image
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? '#e91e63' : '#ccc' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  image: {
    width: screenWidth,
    height: 200,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default Carousel;
