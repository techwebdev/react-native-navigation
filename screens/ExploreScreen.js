import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Explore Screen</Text>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
