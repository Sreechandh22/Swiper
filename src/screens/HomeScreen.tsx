import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import type { RootStackScreenProps } from '../types/navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface CardItem {
  id: string;
  image: string;
  name: string;
  size: string;
  gender: string;
}

// Dummy data for now
const DUMMY_ITEMS: CardItem[] = [
  { id: '1', image: 'https://picsum.photos/400/600', name: 'Item 1', size: 'M', gender: 'Unisex' },
  { id: '2', image: 'https://picsum.photos/400/601', name: 'Item 2', size: 'L', gender: 'F' },
  { id: '3', image: 'https://picsum.photos/400/602', name: 'Item 3', size: 'S', gender: 'F' },
];

const HomeScreen: React.FC<RootStackScreenProps<'Home'>> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    translateX.value = withSpring(direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5, {
      damping: 15,
      stiffness: 100,
    });
    translateY.value = withSpring(0);
    runOnJS(setCurrentIndex)(currentIndex + 1);
    if (direction === 'right') {
      runOnJS(console.log)('Liked:', DUMMY_ITEMS[currentIndex].name);
    } else {
      runOnJS(console.log)('Disliked:', DUMMY_ITEMS[currentIndex].name);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY * 0.5;
    },
    onEnd: (event) => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const direction = translateX.value > 0 ? 'right' : 'left';
        handleSwipe(direction);
      } else {
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 100,
        });
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-30, 0, 30],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const likeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 4],
      [0, 1],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const dislikeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 4, 0],
      [1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const renderCard = (item: CardItem, index: number) => {
    if (index < currentIndex) return null;

    const isFirst = index === currentIndex;
    const cardStyle = isFirst ? animatedStyle : {};

    return (
      <PanGestureHandler
        key={item.id}
        onGestureEvent={gestureHandler}
        enabled={isFirst}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View style={[styles.card, cardStyle]}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>Size: {item.size}</Text>
            <Text style={styles.cardDescription}>Gender: {item.gender}</Text>
          </View>
          {isFirst && (
            <>
              <Animated.View style={[styles.likeBadge, likeStyle]}>
                <Text style={styles.likeText}>LIKE</Text>
              </Animated.View>
              <Animated.View style={[styles.dislikeBadge, dislikeStyle]}>
                <Text style={styles.dislikeText}>NOPE</Text>
              </Animated.View>
            </>
          )}
        </Animated.View>
      </PanGestureHandler>
    );
  };

  if (currentIndex >= DUMMY_ITEMS.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noMoreText}>No more items to show!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {DUMMY_ITEMS.map((item, index) => renderCard(item, index))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.arrowButton, styles.dislikeButton]} 
          onPress={() => handleSwipe('left')}
        >
          <Text style={styles.arrowButtonText}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.arrowButton, styles.likeButton]} 
          onPress={() => handleSwipe('right')}
        >
          <Text style={styles.arrowButtonText}>✓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 1.3,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  likeBadge: {
    position: 'absolute',
    top: 50,
    right: 40,
    transform: [{ rotate: '30deg' }],
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  dislikeBadge: {
    position: 'absolute',
    top: 50,
    left: 40,
    transform: [{ rotate: '-30deg' }],
    backgroundColor: '#FF5252',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  likeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dislikeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  noMoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  arrowButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  likeButton: {
    backgroundColor: '#4CAF50',
  },
  dislikeButton: {
    backgroundColor: '#FF5252',
  },
  arrowButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 