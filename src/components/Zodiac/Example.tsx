import React from 'react';
import { View, Text } from 'react-native';
import useChineseZodiacAges from '../../components/Zodiac/GetChineseZodiacAges';


const TestScreen: React.FC = () => {
    const zodiacAges = useChineseZodiacAges();

    // 获取鼠的年龄
    const mouseAge = zodiacAges.find(({ zodiac }) => zodiac === '鼠')?.age;

    // 获取牛的年龄
    const bullAge = zodiacAges.find(({ zodiac }) => zodiac === '牛')?.age;

    // 获取虎的年龄
    const tigerAge = zodiacAges.find(({ zodiac }) => zodiac === '虎')?.age;

    // 获取虎的年龄
    const drangonAge = zodiacAges.find(({ zodiac }) => zodiac === '龙')?.age;

    // 输出每个目标生肖的年龄
    console.log('鼠的年龄:', mouseAge);
    console.log('牛的年龄:', bullAge);
    console.log('虎的年龄:', tigerAge);
    console.log('龙的年龄:', drangonAge);

    return null; // 返回null，因为这个组件不需要渲染任何内容
};

export default TestScreen;

