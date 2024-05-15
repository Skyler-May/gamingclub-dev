import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TestScreen: React.FC = () => {
    const handleButtonPress = () => {
        // 在这里处理按钮点击事件
        console.log('Button pressed');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Test Screen</Text>
            <Button title="Press Me" onPress={handleButtonPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default TestScreen;
