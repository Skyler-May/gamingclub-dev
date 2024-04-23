import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import TextTicker from 'react-native-text-ticker';

const TestBanner = () => {
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        // 在这里可以添加任何副作用
        // 这里只是一个示例
    }, []);

    return (
        <View style={styles.container}>

            <TextTicker
                style={{ fontSize: 20, textAlign: 'right' }}
                duration={5000}
                loop
                bounce
                repeatSpacer={screenWidth}
                marqueeDelay={0}
                useNativeDriver
            >
                {[<Text key={1}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry.
                </Text>]}
            </TextTicker>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        height: 30,
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});



export default TestBanner;