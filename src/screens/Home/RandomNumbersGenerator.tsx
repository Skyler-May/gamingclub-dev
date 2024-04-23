import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';

// 生成指定范围内的随机整数
function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成指定范围内的随机数数组
function getRandomNumbers(min: number, max: number, count: number): number[] {
    const numbers: number[] = [];
    for (let i = 0; i < count; i++) {
        const randomNumber = getRandomInt(min, max);
        numbers.push(randomNumber);
    }
    return numbers;
}

const RandomNumbersGenerator: React.FC = () => {
    const handleClick = () => {
        const randomNumbers = getRandomNumbers(1, 100, 10); // 生成10个范围在1到100之间的随机数
        Alert.alert('生成的随机数', randomNumbers.join(', ')); // 使用 Alert 显示生成的随机数数组
    };

    return (
        <TouchableOpacity onPress={handleClick}>
            <Text>生成随机数</Text>
        </TouchableOpacity>
    );
};

export default RandomNumbersGenerator;
