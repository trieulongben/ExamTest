import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
const FullScreenLoading = () => {
  return (
    <View style={styles.fullScreenLoad}>
      <ActivityIndicator />
    </View>
  );
};

export default React.memo(FullScreenLoading);

const styles = StyleSheet.create({
  fullScreenLoad: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5',
    position: 'absolute',
    zIndex: 5,
  },
});
