import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import TextTicker from 'react-native-text-ticker';

export default class BannerBar extends Component {
  render() {
    const screenWidth = Dimensions.get('window').width;
    return (
      <View style={styles.container}>
        <TextTicker
          style={{ fontSize: 20, textAlign: 'right' }}
          duration={20000}
          loop
          bounce
          repeatSpacer={screenWidth}
          marqueeDelay={0}
          useNativeDriver
        >
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry and typesetting industry.
          </Text>
        </TextTicker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
