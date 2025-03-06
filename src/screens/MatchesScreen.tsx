import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { RootStackScreenProps } from '../types/navigation';

const MatchesScreen: React.FC<RootStackScreenProps<'Matches'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Matches</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MatchesScreen; 