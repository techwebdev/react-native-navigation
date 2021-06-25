import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const BookmarksScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Bookmarks Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
