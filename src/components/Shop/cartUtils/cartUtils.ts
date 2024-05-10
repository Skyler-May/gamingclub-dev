// cartUtils.ts

import { Alert } from 'react-native';
import { CartItem } from '../Carts/ShoppingCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNumberContext } from '../../Contexts/NumberContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../types';

const navigation = useNavigation<NavigationProp<RootStackParamList>>();

const { selectedNumbers,
    setSelectedNumbers,
    title,
    additionalText,
    selectedButtonIndexes,
    setSelectedButtonIndexes,
    defaultButtonTextValue,
    generateAdditionalTextValue,
    setselectedAmounts,
} = useNumberContext();

// 处理 Tm 商品数据 添加购物车逻辑 (调用第一个函数)
export const handleAddTmToCartPress = (
    selectedNumbers: number[],
    selectedAmounts: string, // 添加 selectedAmounts 参数
    cartItems: CartItem[],
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
    title: string,
    additionalText: string = '',
    navigation: any,
) => {

    if (selectedNumbers.length < 0) {
        Alert.alert('提示', '请输入有效的值');
        return;
    } else if (selectedAmounts === '') {
        Alert.alert('提示', '请输入有效金额');
        return;
    }
    // 将所选项目添加到购物车中
    const newCartItems: CartItem[] = [];
    selectedNumbers.forEach(number => {
        // 格式化数字为两位数
        const formattedNumber = number < 10 ? `0${number}` : `${number}`;

        return newCartItems.push({
            id: number,
            name: `${title} - @${formattedNumber}`, // 使用格式化后的数字
            quantity: 1, // 默认数量为1
            price: parseFloat(selectedAmounts),
            additionalText: `${additionalText}`,
        });
    });

    // 添加到数组中，并使用console.log()检查数组内容
    console.log('New cart item:', newCartItems);
    console.log('Additional Text:', additionalText);


    // 合并新项目和当前项目，并设置新的购物车项目
    const updatedCartItems = [...cartItems, ...newCartItems];
    setCartItems(updatedCartItems);

    // 将购物车项目存储到 AsyncStorage
    AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        .then(() => console.log('Cart items successfully stored in AsyncStorage'))
        .catch(error => console.error('Error storing cart items in AsyncStorage:', error));

    console.log('您的金额:', selectedAmounts);
    // console.log('您选择的数值:', data);
    console.log('Data to be added to cart:', cartItems);

    setSelectedNumbers([]);
    // setselectedAmounts('');

    navigation.navigate('Shop', { tabBarVisible: true });
};




// 处理 Tx 文本商品数据 添加购物车逻辑 (调用第二个函数)
export const handleAddTxToCartPress = (
    cartItems: CartItem[],
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
    selectedAmounts: string,
    selectedButtonIndexes: number[],
    title: string,
    defaultButtonTextValue: string[],
    generateAdditionalTextValue: string[],
    navigation: any,
) => {
    // 逻辑判断
    if (selectedButtonIndexes.length === 0) {
        Alert.alert('提示', '请选择有效的按钮');
        return;
    } else if (selectedAmounts === '') {
        Alert.alert('提示', '请输入有效金额');
        return;
    }

    // 创建要添加到购物车的新项目数组
    const newCartItems: CartItem[] = selectedButtonIndexes.map((index, i) => {
        return {
            id: index, // 使用按钮索引作为购物车项目的ID
            name: `${title} - @${defaultButtonTextValue[i]}`, // 使用格式化后的数字
            quantity: 1, // 默认数量为1
            price: parseFloat(selectedAmounts),
            additionalText: generateAdditionalTextValue[i] || '', // 使用按钮的附加文本值，如果未定义则为空字符串
        };
    });

    // 输出新的购物车项目，用于调试目的
    console.log('New cart items:', newCartItems);

    // 合并新项目和当前项目，并设置新的购物车项目
    const updatedCartItems = [...cartItems, ...newCartItems];
    setCartItems(updatedCartItems);

    // 将购物车项目存储到 AsyncStorage
    AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        .then(() => console.log('Cart items successfully stored in AsyncStorage'))
        .catch(error => console.error('Error storing cart items in AsyncStorage:', error));

    // 输出额外的调试信息
    console.log('您的金额:', selectedAmounts);
    console.log('Data to be added to cart:', newCartItems);

    // 清空金额输入框
    // setselectedAmounts('');
    setSelectedButtonIndexes([]);
    // 导航到 'Shop' 页面
    navigation.navigate('Shop', { tabBarVisible: true });
};


// 处理 Lx 文本商品数据 添加购物车逻辑 (调用第三个函数)
export const handleAddLxToCartPress = (
    cartItems: CartItem[],
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
    selectedAmounts: string,
    selectedButtonIndexes: number[],
    title: string,
    defaultButtonTextValue: string[],
    generateAdditionalTextValue: string[],
    navigation: any,
) => {
    // 逻辑判断
    if (selectedButtonIndexes.length === 0) {
        Alert.alert('提示', '请选择有效的按钮');
        return;
    } else if (selectedAmounts === '') {
        Alert.alert('提示', '请输入有效金额');
        return;
    }

    // 创建要添加到购物车的新项目
    const selectedIndex = selectedButtonIndexes[0]; // 取第一个选中的按钮索引
    const newCartItem: CartItem = {
        id: selectedIndex, // 使用按钮索引作为购物车项目的ID
        name: `${title} — [${defaultButtonTextValue.join(',')}]`, // 将所有选中的按钮值合并为一个字符串
        quantity: 1, // 默认数量为1
        price: parseFloat(selectedAmounts),
        additionalText: generateAdditionalTextValue[0] || '0', // 将所有附加文本值合并为一个字符串，如果未定义则为 '0'
    };

    // 输出新的购物车项目，用于调试目的
    console.log('New cart item:', newCartItem);

    // 合并新项目和当前项目，并设置新的购物车项目
    const updatedCartItems = [...cartItems, newCartItem];
    setCartItems(updatedCartItems);

    // 将购物车项目存储到 AsyncStorage
    AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        .then(() => console.log('Cart items successfully stored in AsyncStorage'))
        .catch(error => console.error('Error storing cart items in AsyncStorage:', error));

    // 输出额外的调试信息
    console.log('您的金额:', selectedAmounts);
    console.log('Data to be added to cart:', newCartItem);

    // 清空金额输入框
    setselectedAmounts('');
    setSelectedButtonIndexes([]);
    // 导航到 'Shop' 页面
    navigation.navigate('Shop', { tabBarVisible: true });
};