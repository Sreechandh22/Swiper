declare module 'react-native-deck-swiper' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  interface SwiperProps {
    cards: any[];
    cardIndex: number;
    renderCard: (card: any) => React.ReactNode;
    onSwiped?: (index: number) => void;
    onSwipedLeft?: (index: number) => void;
    onSwipedRight?: (index: number) => void;
    stackSize?: number;
    backgroundColor?: string;
    verticalSwipe?: boolean;
    animateCardOpacity?: boolean;
    style?: ViewStyle;
  }

  export default class Swiper extends Component<SwiperProps> {}
} 