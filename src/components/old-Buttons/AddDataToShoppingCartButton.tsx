
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import { useNumberContext } from '../Contexts/NumberContext';
import { CartItem } from '../Shop/ShoppingCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../../../types';

interface AddDataToShoppingCartProps {
    // id: number;
    // name: string;
    // quantity: number;
    // price: number;
}

const AddDataToShoppingCart: React.FC<AddDataToShoppingCartProps> = ({

}) => {
    // const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [selectedAmounts, setselectedAmounts] = useState('');
    const [defaultAmounts, setDefaultAmounts] = useState<number[]>([5, 10, 20, 50, 100]);
    const [isEditingDefaultAmount, setIsEditingDefaultAmount] = useState(false);
    const [editedDefaultAmounts, setEditedDefaultAmounts] = useState(defaultAmounts.map(String));
    const { selectedNumbers, setSelectedNumbers } = useNumberContext();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // =======================处理添加按钮的按下逻辑判断==============================

    const handleAddDataToShoppingCartPress = (selectedNumbers: number[], cartItems: CartItem[], setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>) => {
        let data = selectedNumbers.map(number => [selectedAmounts, number]);

        if (selectedNumbers.length < 0) {
            Alert.alert('提示', '请输入有效的值');
            return;
        } else if (selectedAmounts === '') {
            Alert.alert('提示', '请输入有效金额');
            return;
        }
        // ++++购物车++++
        // 将所选项目添加到购物车中
        const newCartItems: CartItem[] = [];
        selectedNumbers.forEach(number => {
            return newCartItems.push({
                id: number,
                name: `商品属性 - @${number}`, // 根据你的逻辑来设置商品名称
                quantity: 1, // 默认数量为1
                price: parseFloat(selectedAmounts),
            });
        });

        // 合并新项目和当前项目，并设置新的购物车项目
        const updatedCartItems = [...cartItems, ...newCartItems];
        setCartItems(updatedCartItems);

        // 将购物车项目存储到 AsyncStorage
        AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
            .then(() => console.log('Cart items successfully stored in AsyncStorage'))
            .catch(error => console.error('Error storing cart items in AsyncStorage:', error));

        console.log('您的金额:', selectedAmounts);
        console.log('您选择的数值:', data);
        setSelectedNumbers([]);
        setselectedAmounts('');
        navigation.navigate('Shop', { tabBarVisible: true });
        console.log('Data to be added to cart:', cartItems); // 添加此行日志
    };
    // ++++购物车++++

    // =======================处理添加按钮的按下逻辑判断==============================

    // ===================处理快捷金额添加数据按===================
    const handleAddDataPress = (number: number) => {
        setselectedAmounts(Math.floor(number).toString());
    };
    // ===================处理快捷金额添加数据按===================

    // ===================处理修改快捷金额并保存======================
    const handleSaveDefaultAmounts = () => {
        // 检查用户输入是否有效
        const parsedAmounts = editedDefaultAmounts.map(parseFloat);
        if (parsedAmounts.some(isNaN)) {
            Alert.alert('错误', '请输入有效的金额');
            return;
        }
        setDefaultAmounts(parsedAmounts);
        setIsEditingDefaultAmount(false);
    };
    const handleEditDefaultAmount = () => {
        setIsEditingDefaultAmount(true);
    };
    //----------------------
    const handleInputChangeWithCheck = (index: number, newValue: string) => {
        // 检查输入的值是否为整数
        const intValue = parseInt(newValue);
        if (isNaN(intValue) || intValue === 0) {
            // 如果输入的值不是有效的非零整数，显示错误消息并清空输入值
            Alert.alert('警告', '请输入有效的非零整数');
            // 清空输入值
            const newEditedAmounts = [...editedDefaultAmounts];
            newEditedAmounts[index] = "";
            setEditedDefaultAmounts(newEditedAmounts);
            return;
        }

        // 检查编辑后的默认值数组中是否存在重复值
        const isDuplicate: boolean = editedDefaultAmounts.some((value, i) => i !== index && parseInt(value) === intValue);

        if (isDuplicate) {
            // 如果存在重复值，显示错误消息并清空输入值
            Alert.alert('警告', '输入的值重复，请重新输入');
            // 清空输入值
            const newEditedAmounts = [...editedDefaultAmounts];
            newEditedAmounts[index] = "";
            setEditedDefaultAmounts(newEditedAmounts);
        } else {
            // 如果没有重复值，更新编辑后的默认值数组
            const newEditedAmounts = [...editedDefaultAmounts];
            newEditedAmounts[index] = intValue.toString(); // 将整数值转换为字符串
            setEditedDefaultAmounts(newEditedAmounts);
        }
    };

    const handleAmountsChange = (text: string) => {
        // 如果输入框的值为空或者删除所有数字后为空，则将输入框的值设置为空字符串
        if (text === '' || (text === '0' && selectedAmounts === '0')) {
            setselectedAmounts('');
        } else {
            // 否则，将输入框的值设置为输入值的整数部分
            setselectedAmounts(Math.floor(Number(text)).toString());
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.bottomButtonContainer}>
                {/* 设置快捷金额按钮 */}
                <TouchableOpacity onPress={handleEditDefaultAmount} style={{ flexDirection: 'column', alignItems: 'center' }}>
                    {/* <FontAwesomeIcon icon={faEdit} size={20} color={'gray'} /> */}
                    <Text style={{ fontSize: 10, color: 'white' }}>快捷</Text>
                </TouchableOpacity>
                {defaultAmounts.map((number) => (
                    <TouchableOpacity
                        key={number}
                        style={[
                            styles.numberButtonKey,
                            selectedAmounts === number.toString() && styles.selectedButton
                        ]}
                        onPress={() => handleAddDataPress(number)}
                    >
                        <Text style={styles.numberButtonText}>{number}</Text>
                    </TouchableOpacity>
                ))}
                {/* 模态框修改快捷金额 */}
                <Modal visible={isEditingDefaultAmount} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {defaultAmounts.map((amount, index) => (
                                <View key={amount.toString()}>
                                    <TextInput
                                        value={editedDefaultAmounts[index]}
                                        onChangeText={text => {
                                            const newEditedAmounts = [...editedDefaultAmounts];
                                            newEditedAmounts[index] = text;
                                            setEditedDefaultAmounts(newEditedAmounts);
                                        }}
                                        keyboardType="numeric"
                                        style={styles.modalInput}
                                        clearTextOnFocus={true}
                                        onFocus={() => {
                                            // 当用户点击输入框时，清空默认值
                                            if (parseInt(editedDefaultAmounts[index]) === defaultAmounts[index]) {
                                                const newEditedAmounts = [...editedDefaultAmounts];
                                                newEditedAmounts[index] = "";
                                                setEditedDefaultAmounts(newEditedAmounts);
                                            }
                                        }}
                                        onBlur={() => {
                                            // 如果输入为空，则恢复默认值
                                            if (editedDefaultAmounts[index] === "") {
                                                const newEditedAmounts = [...editedDefaultAmounts];
                                                newEditedAmounts[index] = defaultAmounts[index].toString();
                                                setEditedDefaultAmounts(newEditedAmounts);
                                            } else {
                                                handleInputChangeWithCheck(index, editedDefaultAmounts[index]); // 在失焦时执行失焦检查
                                            }
                                        }}
                                    />
                                </View>
                            ))}
                            <TouchableOpacity onPress={handleSaveDefaultAmounts} style={styles.saveButton}>
                                <Text style={styles.saveButtonText}>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* 添加到购物车 */}
                <TouchableOpacity style={styles.submitButton} onPress={() => handleAddDataToShoppingCartPress(selectedNumbers, cartItems, setCartItems)}>

                    <TextInput
                        style={styles.input}
                        placeholder="输入金额"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        onChangeText={handleAmountsChange}
                        value={selectedAmounts}
                    />
                    <Text style={styles.submitButtonText}>添加</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'lightyellow',
        height: 100,
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        bottom: 0,
        left: 0,
        right: 0,
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'darkslategrey',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    submitButtonText: {
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 5,
        height: 40,
        width: 80,
        fontSize: 14,
        left: -10,
    },
    bottomButtonContainer: {
        // backgroundColor: 'darkslategrey ',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: 'green',
    },
    numberButtonKey: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'darkblue',
        padding: 10,
        marginHorizontal: 3,
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    numberButtonText: {
        color: 'white',
        fontSize: 12,
        position: 'absolute',
        zIndex: 1,
    },
    //模态框
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        color: 'orangered',
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    saveButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    editButton: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default AddDataToShoppingCart;
