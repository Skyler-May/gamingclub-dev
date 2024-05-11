import React, { useEffect, useState } from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { CartItem } from '../Shop/Carts/ShoppingCart';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNumberContext } from '../contexts/NumberContext';
import { RootStackParamList } from '../../../types';

interface AddDataToCartsProps {

}

const AddDataToCarts: React.FC<AddDataToCartsProps> = () => {
    const { selectedNumbers,
        setSelectedNumbers,
        title,
        additionalText,
        selectedButtonIndexes,
        setSelectedButtonIndexes,
        defaultButtonTextValue,
        generateAdditionalTextValue,
        selectedTab,
    } = useNumberContext();
    const [selectedAmounts, setselectedAmounts] = useState('');
    const [defaultAmounts, setDefaultAmounts] = useState<number[]>([5, 10, 20, 50, 100]);
    const [isEditingDefaultAmount, setIsEditingDefaultAmount] = useState<boolean>(false);
    const [editedDefaultAmounts, setEditedDefaultAmounts] = useState<string[]>(defaultAmounts.map(String));
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    console.log('Title from context:', title);
    // console.log('所选号码长度:', selectedNumbers.length);
    console.log('buttonText:', defaultButtonTextValue);








    // 处理编辑默认金额按钮点击事件的函数
    const handleEditDefaultAmountButtonPress = () => {
        // 设置正在编辑默认金额状态为true
        setIsEditingDefaultAmount(true);
    };

    // 处理输入框聚焦事件的函数
    const handleInputFocus = (index: number) => {
        // 创建编辑后的默认金额副本
        const newEditedAmounts = [...editedDefaultAmounts];
        // 将当前索引的默认金额值设为空字符串
        newEditedAmounts[index] = '';
        // 更新编辑后的默认金额
        setEditedDefaultAmounts(newEditedAmounts);
    };

    // 处理输入框失焦事件的函数
    const handleInputBlur = (index: number) => {
        // 获取编辑后的值
        const editedValue = editedDefaultAmounts[index];
        // 如果编辑后的值是空白的
        if (editedValue.trim() === '') {
            // 创建默认金额的副本
            const newEditedAmounts = [...editedDefaultAmounts];
            // 将默认金额的值还原到编辑后的值
            newEditedAmounts[index] = defaultAmounts[index].toString();
            // 更新编辑后的默认金额
            setEditedDefaultAmounts(newEditedAmounts);
        }
    };

    // 处理快捷金额按钮按下后添加到输入框
    const handleQuickAmountButtonPress = (number: number) => {
        setselectedAmounts(Math.floor(number).toString());
    };

    // 处理模态框保存按钮逻辑
    const handleModleSaveButtonPress = () => {
        const hasEmptyOrZero = editedDefaultAmounts.some((value) => value.trim() === '' || parseInt(value) === 0);

        if (hasEmptyOrZero) {
            Alert.alert('警告', '金额不能为空且不能为 0');
            return;
        }

        const isUniqueKey = editedDefaultAmounts.every((value, index) => {
            return editedDefaultAmounts.indexOf(value) === index;
        });

        if (!isUniqueKey) {
            Alert.alert('警告', '金额重复，请重新输入');
            return;
        }

        setDefaultAmounts(editedDefaultAmounts.map(parseFloat));
        setIsEditingDefaultAmount(false);
    };

    // 处理输入框金额改变的逻辑
    const handleInputAmountsChange = (text: string) => {
        // 如果输入框的值为空或者删除所有数字后为空，则将输入框的值设置为空字符串
        if (text === '' || (text === '0' && selectedAmounts === '0')) {
            setselectedAmounts('');
        } else {
            // 否则，将输入框的值设置为输入值的整数部分
            setselectedAmounts(Math.floor(Number(text)).toString());
        }
    };






    // 处理初始化状态函数
    const handleCleanAllPress = () => {
        setSelectedNumbers([]);
        setselectedAmounts('');
        setSelectedButtonIndexes([]);
    }







    // 处理 Tm 商品数据 添加购物车逻辑 (调用第一个函数)
    const handleAddTmToCartPress = (selectedNumbers: number[], cartItems: CartItem[], setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>) => {
        let data = selectedNumbers.map(number => [selectedAmounts, number]);

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
        console.log('您选择的数值:', data);
        console.log('Data to be added to cart:', cartItems);

        setSelectedNumbers([]);
        setselectedAmounts('');

        navigation.navigate('Shop', { tabBarVisible: true });
    };

    // 处理 Tx 文本商品数据 添加购物车逻辑 (调用第二个函数)
    const handleAddTxToCartPress = (
        cartItems: CartItem[],
        setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
        defaultButtonTextValue: string[],
        generateAdditionalTextValue: string[],
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
        setselectedAmounts('');
        setSelectedButtonIndexes([]);
        // 导航到 'Shop' 页面
        navigation.navigate('Shop', { tabBarVisible: true });
    };

    // 处理 TwoLx 文本商品数据 添加购物车逻辑 (调用第三个函数)
    const handleAddTwoLxToCartPress = (
        cartItems: CartItem[],
        setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
        defaultButtonTextValue: string[],
        generateAdditionalTextValue: string[],
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
            name: `${title} - [${defaultButtonTextValue.join(',')}]`, // 将所有选中的按钮值合并为一个字符串
            quantity: TwoLxCombinationsQuantity, // 默认数量为1
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

    // 处理 ThreeLx 文本商品数据 添加购物车逻辑 (调用第三个函数)
    const handleAddThreeLxToCartPress = (
        cartItems: CartItem[],
        setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
        defaultButtonTextValue: string[],
        generateAdditionalTextValue: string[],
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
            name: `${title} - [${defaultButtonTextValue.join(',')}]`, // 将所有选中的按钮值合并为一个字符串
            quantity: ThreeLxCombinationsQuantity, // 默认数量为1
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

    // 处理 FourLx 文本商品数据 添加购物车逻辑 (调用第三个函数)
    const handleAddFourLxToCartPress = (
        cartItems: CartItem[],
        setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
        defaultButtonTextValue: string[],
        generateAdditionalTextValue: string[],
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
            name: `${title} - [${defaultButtonTextValue.join(',')}]`, // 将所有选中的按钮值合并为一个字符串
            quantity: FourLxCombinationsQuantity, // 默认数量为1
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

    // 处理 FiveLx 文本商品数据 添加购物车逻辑 (调用第三个函数)
    const handleAddFiveLxToCartPress = (
        cartItems: CartItem[],
        setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
        defaultButtonTextValue: string[],
        generateAdditionalTextValue: string[],
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
            name: `${title} - [${defaultButtonTextValue.join(',')}]`, // 将所有选中的按钮值合并为一个字符串
            quantity: FiveLxCombinationsQuantity, // 默认数量为1
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

    // 计算组合数量的辅助函数
    function factorial(n: number): number {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // 计算组合数量
    function calculateCombinations(n: number, k: number): number {
        return factorial(n) / (factorial(k) * factorial(n - k));
    }

    const selectedButtonIndexesLength = selectedButtonIndexes.length;

    const TwoLxCombinationsQuantity = calculateCombinations(selectedButtonIndexesLength, 2);
    console.log("Number of TwoLx combinations:", TwoLxCombinationsQuantity);

    const ThreeLxCombinationsQuantity = calculateCombinations(selectedButtonIndexesLength, 3);
    console.log("Number of ThreeLx combinations:", ThreeLxCombinationsQuantity);

    const FourLxCombinationsQuantity = calculateCombinations(selectedButtonIndexesLength, 4);
    console.log("Number of FourLx combinations:", FourLxCombinationsQuantity);

    const FiveLxCombinationsQuantity = calculateCombinations(selectedButtonIndexesLength, 5);
    console.log("Number of FiveLx combinations:", FiveLxCombinationsQuantity);

    const [quantityRenderAndRandomConditionAndClickSituation1, setquantityRenderAndRandomConditionAndClickSituation1] = useState(false);
    const [quantityRenderAndRandomConditionAndClickSituation2, setquantityRenderAndRandomConditionAndClickSituation2] = useState(false);
    const [quantityRenderAndRandomConditionAndClickSituation3, setquantityRenderAndRandomConditionAndClickSituation3] = useState(false);
    const [quantityRenderAndRandomConditionAndClickSituation4, setquantityRenderAndRandomConditionAndClickSituation4] = useState(false);
    const [quantityRenderAndRandomConditionAndClickSituation5, setquantityRenderAndRandomConditionAndClickSituation5] = useState(false);
    const [quantityRenderAndRandomConditionAndClickSituation6, setquantityRenderAndRandomConditionAndClickSituation6] = useState(false);



    // 生成指定范围内的 TM 随机整数
    function getTmRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 生成指定范围内的 TM 随机数数组
    function getTmRandomNumbers(min: number, max: number, count: number): number[] {
        const numbers: number[] = [];
        while (numbers.length < count) {
            const selectedNumber = getTmRandomInt(min, max);
            if (!numbers.includes(selectedNumber)) {
                numbers.push(selectedNumber);
            }
        }
        return numbers;
    }

    // 定义 TM 点击事件
    const handleTmClick = () => {
        const selectedNumbers = getTmRandomNumbers(1, 49, 48); // 生成48个范围在1到49之间的随机数
        setSelectedNumbers([])
        setSelectedNumbers(selectedNumbers); // 更新上下文中的选定数字
    };

    // 生成指定范围内的 TX 随机整数
    function getTxRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 生成指定范围内的 TX 随机数数组
    function getTxRandomNumbers(min: number, max: number, count: number): number[] {
        const numbers: number[] = [];
        while (numbers.length < count) {
            const selectedButtonIndexes = getTxRandomInt(min, max);
            if (!numbers.includes(selectedButtonIndexes)) {
                numbers.push(selectedButtonIndexes);
            }
        }
        return numbers;
    }

    // 定义 TX 点击事件
    const handleTxClick = () => {
        const selectedButtonIndexes = getTxRandomNumbers(1, 11, 1); // 生成1个范围在1到12之间的随机数
        setSelectedButtonIndexes([])
        setSelectedButtonIndexes(selectedButtonIndexes); // 更新上下文中的选定数字
    };

    // 生成指定范围内的 TwoLx 随机整数
    function getTwoLxRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 生成指定范围内的 TwoLx 随机数数组
    function getTwoLxRandomNumbers(min: number, max: number, count: number): number[] {
        const numbers: number[] = [];
        while (numbers.length < count) {
            const selectedButtonIndexes = getTwoLxRandomInt(min, max);
            if (!numbers.includes(selectedButtonIndexes)) {
                numbers.push(selectedButtonIndexes);
            }
        }
        return numbers;
    }

    // 定义 TwoLx 点击事件
    const handleTwoLxClick = () => {
        const selectedButtonIndexes = getTwoLxRandomNumbers(1, 11, 2); // 生成1个范围在1到12之间的随机数
        setSelectedButtonIndexes([])
        setSelectedButtonIndexes(selectedButtonIndexes); // 更新上下文中的选定数字
    };


    // 生成指定范围内的 ThreeLx 随机整数
    function getThreeLxRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 生成指定范围内的 ThreeLx 随机数数组
    function getThreeLxRandomNumbers(min: number, max: number, count: number): number[] {
        const numbers: number[] = [];
        while (numbers.length < count) {
            const selectedButtonIndexes = getThreeLxRandomInt(min, max);
            if (!numbers.includes(selectedButtonIndexes)) {
                numbers.push(selectedButtonIndexes);
            }
        }
        return numbers;
    }

    // 定义 ThreeLx 点击事件
    const handleThreeLxClick = () => {
        const selectedButtonIndexes = getThreeLxRandomNumbers(1, 11, 3); // 生成1个范围在1到12之间的随机数
        setSelectedButtonIndexes([])
        setSelectedButtonIndexes(selectedButtonIndexes); // 更新上下文中的选定数字
    };

    // 生成指定范围内的 FourLx 随机整数
    function getFourLxRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 生成指定范围内的 FourLx 随机数数组
    function getFourLxRandomNumbers(min: number, max: number, count: number): number[] {
        const numbers: number[] = [];
        while (numbers.length < count) {
            const selectedButtonIndexes = getFourLxRandomInt(min, max);
            if (!numbers.includes(selectedButtonIndexes)) {
                numbers.push(selectedButtonIndexes);
            }
        }
        return numbers;
    }

    // 定义 FourLx 点击事件
    const handleFourLxClick = () => {
        const selectedButtonIndexes = getFourLxRandomNumbers(1, 11, 4); // 生成1个范围在1到12之间的随机数
        setSelectedButtonIndexes([])
        setSelectedButtonIndexes(selectedButtonIndexes); // 更新上下文中的选定数字
    };

    // 生成指定范围内的 FiveLx 随机整数
    function getFiveLxRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 生成指定范围内的 FiveLx 随机数数组
    function getFiveLxRandomNumbers(min: number, max: number, count: number): number[] {
        const numbers: number[] = [];
        while (numbers.length < count) {
            const selectedButtonIndexes = getFiveLxRandomInt(min, max);
            if (!numbers.includes(selectedButtonIndexes)) {
                numbers.push(selectedButtonIndexes);
            }
        }
        return numbers;
    }

    // 定义 FiveLx 点击事件
    const handleFiveLxClick = () => {
        const selectedButtonIndexes = getFiveLxRandomNumbers(1, 11, 5); // 生成1个范围在1到12之间的随机数
        setSelectedButtonIndexes([])
        setSelectedButtonIndexes(selectedButtonIndexes); // 更新上下文中的选定数字
    };









    useEffect(() => {
        if (title === 'TM A' || title === 'TM B') {
            setquantityRenderAndRandomConditionAndClickSituation1(true);
            setquantityRenderAndRandomConditionAndClickSituation2(false); // 确保只有一个条件为true
            setquantityRenderAndRandomConditionAndClickSituation3(false);
            setquantityRenderAndRandomConditionAndClickSituation4(false);
            setquantityRenderAndRandomConditionAndClickSituation5(false);
            setquantityRenderAndRandomConditionAndClickSituation6(false);
        } else if (title === 'TX') {
            setquantityRenderAndRandomConditionAndClickSituation1(false);
            setquantityRenderAndRandomConditionAndClickSituation2(true); // 确保只有一个条件为true
            setquantityRenderAndRandomConditionAndClickSituation3(false);
            setquantityRenderAndRandomConditionAndClickSituation4(false);
            setquantityRenderAndRandomConditionAndClickSituation5(false);
            setquantityRenderAndRandomConditionAndClickSituation6(false);
        } else if (title === '2L') {
            setquantityRenderAndRandomConditionAndClickSituation1(false);
            setquantityRenderAndRandomConditionAndClickSituation2(false); // 确保只有一个条件为true
            setquantityRenderAndRandomConditionAndClickSituation3(true);
            setquantityRenderAndRandomConditionAndClickSituation4(false);
            setquantityRenderAndRandomConditionAndClickSituation5(false);
            setquantityRenderAndRandomConditionAndClickSituation6(false);
        } else if (title === '3L') {
            setquantityRenderAndRandomConditionAndClickSituation1(false);
            setquantityRenderAndRandomConditionAndClickSituation2(false); // 确保只有一个条件为true
            setquantityRenderAndRandomConditionAndClickSituation3(false);
            setquantityRenderAndRandomConditionAndClickSituation4(true);
            setquantityRenderAndRandomConditionAndClickSituation5(false);
            setquantityRenderAndRandomConditionAndClickSituation6(false);
        } else if (title === '4L') {
            setquantityRenderAndRandomConditionAndClickSituation1(false);
            setquantityRenderAndRandomConditionAndClickSituation2(false); // 确保只有一个条件为true
            setquantityRenderAndRandomConditionAndClickSituation3(false);
            setquantityRenderAndRandomConditionAndClickSituation4(false);
            setquantityRenderAndRandomConditionAndClickSituation5(true);
            setquantityRenderAndRandomConditionAndClickSituation6(false);
        }
        else if (title === '5L') {
            setquantityRenderAndRandomConditionAndClickSituation1(false);
            setquantityRenderAndRandomConditionAndClickSituation2(false); // 确保只有一个条件为true
            setquantityRenderAndRandomConditionAndClickSituation3(false);
            setquantityRenderAndRandomConditionAndClickSituation4(false);
            setquantityRenderAndRandomConditionAndClickSituation5(false);
            setquantityRenderAndRandomConditionAndClickSituation6(true);
        }
    }, [title]);









    return (
        <View style={styles.container}>
            <View style={styles.amountButtonContainer}>
                {/* 设置快捷金额按钮 */}
                <TouchableOpacity onPress={handleEditDefaultAmountButtonPress} style={styles.iconButton}>
                    <Icon name="edit" size={24} color="#900" />
                    <Text style={{ fontSize: 12, color: 'gray' }}>快捷</Text>
                </TouchableOpacity>

                {defaultAmounts.map((number) => (
                    <TouchableOpacity
                        key={number}
                        style={[
                            styles.amountButton,
                            selectedAmounts === number.toString() && styles.selectedAmountButton,
                        ]}
                        onPress={() => handleQuickAmountButtonPress(number)}
                    >
                        <Text style={styles.amountButtonText}>{number}</Text>
                    </TouchableOpacity>
                ))}

            </View>
            {/* 模态框修改快捷金额 */}
            <Modal visible={isEditingDefaultAmount} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setIsEditingDefaultAmount(false)} style={styles.modalCloseButton}>
                            <Icon name="closesquare" size={30} color="#900" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>编辑快捷金额</Text>
                        {defaultAmounts.map((amount, index) => (
                            <View key={amount.toString()}>
                                <Text style={styles.modalAmountLabel}>{`金额 ${index + 1}:`}</Text>
                                <TextInput
                                    value={editedDefaultAmounts[index]}
                                    onChangeText={(text) => {
                                        const newEditedAmounts = [...editedDefaultAmounts];
                                        newEditedAmounts[index] = text;
                                        setEditedDefaultAmounts(newEditedAmounts);
                                    }}
                                    keyboardType="numeric"
                                    style={styles.modalInput}
                                    onFocus={() => handleInputFocus(index)}
                                    onBlur={() => handleInputBlur(index)}
                                />
                            </View>
                        ))}
                        <TouchableOpacity onPress={handleModleSaveButtonPress} style={styles.modalSaveButton}>
                            <Text style={styles.modalSaveButtonText}>保存</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.addDataButtonContainer}>

                <TouchableOpacity onPress={handleCleanAllPress} style={styles.iconButton}>
                    <Icon name="delete" size={24} color="#900" />
                    <Text style={{ fontSize: 12, color: 'gray' }}>清空</Text>
                </TouchableOpacity>

                <View style={styles.countContainer}>
                    {/* <Text style={styles.count}>({selectedNumbers.length})</Text> */}
                    {
                        quantityRenderAndRandomConditionAndClickSituation1 && (
                            <React.Fragment>
                                <Text style={styles.count}>({selectedNumbers.length})</Text>
                                <Text style={styles.text}>数量</Text>
                            </React.Fragment>
                        )
                    }
                    {
                        quantityRenderAndRandomConditionAndClickSituation2 && (
                            <React.Fragment>
                                <Text style={styles.count}>({selectedButtonIndexes.length})</Text>
                                <Text style={styles.text}>数量</Text>
                            </React.Fragment>
                        )
                    }
                    {
                        quantityRenderAndRandomConditionAndClickSituation3 && (
                            <React.Fragment>
                                <Text style={styles.count}>({TwoLxCombinationsQuantity})</Text>
                                <Text style={styles.text}>数量</Text>
                            </React.Fragment>
                        )
                    }
                    {
                        quantityRenderAndRandomConditionAndClickSituation4 && (
                            <React.Fragment>
                                <Text style={styles.count}>({ThreeLxCombinationsQuantity})</Text>
                                <Text style={styles.text}>数量</Text>
                            </React.Fragment>
                        )
                    }
                    {
                        quantityRenderAndRandomConditionAndClickSituation5 && (
                            <React.Fragment>
                                <Text style={styles.count}>({FourLxCombinationsQuantity})</Text>
                                <Text style={styles.text}>数量</Text>
                            </React.Fragment>
                        )
                    }
                    {
                        quantityRenderAndRandomConditionAndClickSituation6 && (
                            <React.Fragment>
                                <Text style={styles.count}>({FiveLxCombinationsQuantity})</Text>
                                <Text style={styles.text}>数量</Text>
                            </React.Fragment>
                        )
                    }
                </View>




                <TouchableOpacity style={styles.iconButton} onPress={() => {
                    if (quantityRenderAndRandomConditionAndClickSituation1) {
                        handleTmClick()
                    } else if (quantityRenderAndRandomConditionAndClickSituation2) {
                        handleTxClick()
                    } else if (quantityRenderAndRandomConditionAndClickSituation3) {
                        handleTwoLxClick()
                    } else if (quantityRenderAndRandomConditionAndClickSituation4) {
                        handleThreeLxClick()
                    } else if (quantityRenderAndRandomConditionAndClickSituation5) {
                        handleFourLxClick()
                    } else {
                        handleFiveLxClick()
                    }
                }}>
                    <Icon name="shake" size={24} color="#900" />
                    <Text style={{ fontSize: 12, color: 'gray' }}>随机</Text>
                </TouchableOpacity>
                {/* 添加到购物车 */}
                <TextInput
                    style={styles.input}
                    placeholder="输入金额"
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                    onChangeText={handleInputAmountsChange}
                    value={selectedAmounts}
                />
                <TouchableOpacity style={styles.addDataButton} onPress={() => {
                    if (quantityRenderAndRandomConditionAndClickSituation1) {
                        handleAddTmToCartPress(selectedNumbers, cartItems, setCartItems);
                    } else if (quantityRenderAndRandomConditionAndClickSituation2) {
                        handleAddTxToCartPress(cartItems, setCartItems, defaultButtonTextValue, generateAdditionalTextValue);
                    } else if (quantityRenderAndRandomConditionAndClickSituation3) {
                        handleAddTwoLxToCartPress(cartItems, setCartItems, defaultButtonTextValue, generateAdditionalTextValue);
                    } else if (quantityRenderAndRandomConditionAndClickSituation4) {
                        handleAddThreeLxToCartPress(cartItems, setCartItems, defaultButtonTextValue, generateAdditionalTextValue);
                    } else if (quantityRenderAndRandomConditionAndClickSituation5) {
                        handleAddFourLxToCartPress(cartItems, setCartItems, defaultButtonTextValue, generateAdditionalTextValue);
                    } else if (quantityRenderAndRandomConditionAndClickSituation6) {
                        handleAddFiveLxToCartPress(cartItems, setCartItems, defaultButtonTextValue, generateAdditionalTextValue);
                    }
                }}>
                    <Text style={styles.addDataButtonText}>添加</Text>
                </TouchableOpacity>

            </View>
        </View >
    );
};

export default AddDataToCarts;
