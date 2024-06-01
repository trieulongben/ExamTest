import React from 'react';
import {Button, Text, View} from 'react-native';
import {storage} from '../../utils/storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const _clearStorage = () => {
    storage.clearAll();
  };

  return (
    <View>
      <SafeAreaView />
      <Text>Home</Text>
      <Button title="Clear Storage" onPress={_clearStorage} />
    </View>
  );
};

export default HomeScreen;
