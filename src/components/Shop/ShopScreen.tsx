import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ShoppingCart from './ShoppingCart';
import { useNavigation } from '@react-navigation/core';
import CountdownTimer from '../Timer/CountdownTimer';


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

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View>
                    <View style={styles.item}>
                        <Text style={styles.title}>第 20240112 期</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}><CountdownTimer sleepStartTime="21:15" sleepEndTime="21:33" /></Text>
                    </View>
                </View>
                <View>
                    <View style={styles.item}>
                        <Text style={styles.title}>This </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>This is screen</Text>
                    </View>
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
        height: 100, // 调整头部高度
        // backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerItem: {
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flex: 1,
        // backgroundColor: 'darkblue', // 更改项目的背景颜色
        width: Dimensions.get('window').width / 2, // 将项目宽度设置为屏幕宽度的一半
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        // color: 'white',
    },
});

export default ShopScreen;