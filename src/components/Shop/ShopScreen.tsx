import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ShoppingCart from './Carts/ShoppingCart';
import { useNavigation } from '@react-navigation/core';
import CountdownTimer from '../Timer/CountdownTimer';
import GetLotteryResults from '../../services/GetLotteryResults';

const ShopScreen: React.FC = () => {
    const navigation = useNavigation();

    // useEffect(() => {
    //         const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    //             // 阻止页面跳转
    //             e.preventDefault();

    //             // 弹出警告
    //             Alert.alert(
    //                 '警告',
    //                 '您确定要离开此页面吗？您的数据可能不会被保存。',
    //                 [
    //                     {
    //                         text: '取消',
    //                         onPress: () => { },
    //                         style: 'cancel',
    //                     },
    //                     {
    //                         text: '确认',
    //                         onPress: () => navigation.dispatch(e.data.action),
    //                     },
    //                 ],
    //             );
    //         });

    //         return unsubscribe;
    //     }, [navigation]);
    // 在父组件中定义计算函数
    const calculateExpect = (expect: string): number => {
        return parseInt(expect) + 1;

    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.item}>
                    <Text><GetLotteryResults calculateExpect={calculateExpect} /></Text>
                    <Text><CountdownTimer sleepStartTime="21:15" sleepEndTime="21:33" /></Text>
                </View>
                <View style={styles.item}>
                    <Text style={{ color: 'gray', fontSize: 16 }}>余额：</Text>
                    <Text style={styles.itemText}>999999</Text>
                </View>
            </View>
            <ShoppingCart />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 100,
        // backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        // backgroundColor: 'darkblue',
        width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default ShopScreen;