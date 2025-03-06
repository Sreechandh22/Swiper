declare module 'react-native-swipe-cards' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  interface SwipeCardsProps<T> {
    cards: T[];
    renderCard: (card: T) => React.ReactNode;
    renderNoMoreCards: () => React.ReactNode;
    onYup: (card: T) => void;
    onNope: (card: T) => void;
    cardStyle?: ViewStyle;
    stackStyle?: ViewStyle;
    stackScale?: number;
    stackSeparation?: number;
    stackDepth?: number;
  }

  export default class SwipeCards<T> extends Component<SwipeCardsProps<T>> {}
} 