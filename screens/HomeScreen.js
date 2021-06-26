import React from 'react';

import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';

import {useTheme} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const {colors, dark} = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <Text style={{color: colors.text}}>Home Screen</Text>
      <Button
        title="Go to details screen"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
