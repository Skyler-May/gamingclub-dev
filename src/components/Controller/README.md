# 按钮控制器使用方法

## 示例：

```bash
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Countdown from '../../components/Controller/TimerController'; // 导入控制器


const FiveTbopButtons = () => {
    return (
        // 包裹按钮，设置属性
        <Countdown startTime={{ hour: 2, minute: 30 }} endTime={{ hour: 2, minute: 32 }}>
            {(isDisabled, remainingTime) => (

                <View style={styles.container}>
                
                    {/* 锁按钮 */}
                    <TouchableOpacity 
                    style={[
                        styles.button, 
                        isDisabled && styles.disabledButton // 锁按钮
                        ]} 
                        disabled={isDisabled}
                        >

                        {/* 锁文本 */}
                        <Text 
                        style={[
                            styles.buttonText, 
                            { color: isDisabled ? 'gray' : 'white' } // 锁文本
                            ]}
                            >
                            Tbop 1
                            </Text>

                    </TouchableOpacity>
                </View>
            
            )}
        </Countdown>
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
```