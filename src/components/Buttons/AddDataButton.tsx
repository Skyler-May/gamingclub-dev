import React, { useState } from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { CartItem } from '../Shop/ShoppingCart';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNumberContext } from '../Contexts/NumberContext';
import { RootStackParamList } from '../../../types';


interface AddDataButtonProps {

}

const AddDataButton: React.FC<AddDataButtonProps> = () => {
    // const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const { selectedNumbers, setSelectedNumbers, title, additionalText } = useNumberContext();
    const [selectedAmounts, setselectedAmounts] = useState('');
    const [defaultAmounts, setDefaultAmounts] = useState<number[]>([5, 10, 20, 50, 100]);
    const [isEditingDefaultAmount, setIsEditingDefaultAmount] = useState<boolean>(false);
    const [editedDefaultAmounts, setEditedDefaultAmounts] = useState<string[]>(defaultAmounts.map(String));
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    console.log('Title from context:', title);
    console.log('所选号码长度:', selectedNumbers.length);

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

    // 定义点击事件
    // const handleClick = () => {
    //     // 清除所有手动选择的商品
    //     setSelectedNumbers([]);
    //     const randomNumbers = getRandomNumbers(1, 49, 10); // 生成10个范围在1到100之间的随机数
    //     setSelectedNumbers(randomNumbers); // 更新上下文中的选定数字
    // };

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


    // 处理添加数据按钮的逻辑
    const handleAddDataButtonPress = (selectedNumbers: number[], cartItems: CartItem[], setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>) => {
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
            return newCartItems.push({
                id: number,
                name: `${title} - @${number}`, // 根据你的逻辑来设置商品名称
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

                <TouchableOpacity onPress={() => setSelectedNumbers([])} style={styles.iconButton}>
                    <Icon name="delete" size={24} color="#900" />
                    <Text style={{ fontSize: 12, color: 'gray' }}>清空</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleClick} style={styles.iconButton}>
                    <Icon name="shake" size={24} color="#900" />
                    <Text style={{ fontSize: 12, color: 'gray' }}>随机</Text>
                </TouchableOpacity> */}
                <View style={styles.countContainer}>
                    <Text style={styles.count}>({selectedNumbers.length})</Text>
                    <Text style={styles.text}>数量</Text>
                </View>
                {/* 添加到购物车 */}
                <TextInput
                    style={styles.input}
                    placeholder="输入金额"
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                    onChangeText={handleInputAmountsChange}
                    value={selectedAmounts}
                />
                <TouchableOpacity style={styles.addDataButton} onPress={() => handleAddDataButtonPress(selectedNumbers, cartItems, setCartItems)}>
                    <Text style={styles.addDataButtonText}>添加</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddDataButton;
