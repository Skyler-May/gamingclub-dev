import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Countdown from '../../components/Controller/ButtonLockController';



const FiveTbopButtons = () => {

    return (
        <View>
            <Countdown
                startTime={{ hour: 21, minute: 23 }}
                endTime={{ hour: 22, minute: 33 }}
            >
                {(isDisabled, remainingTime) => (
                    <View style={styles.container}>
                        {/* 锁按钮 */}
                        <TouchableOpacity style={[styles.button, isDisabled && styles.disabledButton]} disabled={isDisabled}>
                            {/* 锁文本 */}
                            <Text style={[styles.buttonText, { color: isDisabled ? 'gray' : 'white' }]}>Tbop 1</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Countdown>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default FiveTbopButtons;

