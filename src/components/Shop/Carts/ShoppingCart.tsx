import React, { useState, useEffect } from 'react';
import styles from './styles';
import { View, Text, Button, VirtualizedList, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../../../types';

interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    additionalText: string;
}

// 添加商品到购物车的函数
export const addItemToCart = (item: CartItem, cartItems: CartItem[], setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>) => {
    console.log('Adding item to cart:', item); // 打印添加的商品信息
    setCartItems([...cartItems, item]);
};

const ShoppingCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
    const [batchPrice, setBatchPrice] = useState<string>('');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const storedCartItems = await AsyncStorage.getItem('cartItems');
                if (storedCartItems !== null) {
                    console.log('Successfully fetched cart items from AsyncStorage:', storedCartItems);
                    setCartItems(JSON.parse(storedCartItems));
                } else {
                    console.log('No cart items found in AsyncStorage.');
                }
            } catch (error) {
                console.error('Error fetching cart items from AsyncStorage:', error);
            }
        };
        console.log('Retrieved cart items:', cartItems); // 添加此行日志

        fetchCartItems();
    }, []);

    // 从购物车中移除商品
    // const removeItemFromCart = (id: number) => {
    //     console.log('Removing item from cart:', id); // 打印移除的商品ID
    //     setCartItems(cartItems.filter(item => item.id !== id));
    //     navigation.goBack();
    // };
    const removeItemFromCart = (id: number, cartItems: CartItem[], setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>, navigation: any) => {
        console.log('Removing item from cart:', id); // 打印移除的商品ID
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);

        // 如果删除最后一个项目后购物车为空，则返回上一个页面
        if (updatedCartItems.length === 0) {
            navigation.goBack();
        }
    };

    // 更新购物车中商品的数量
    const updateItemQuantity = (id: number, quantity: number) => {
        console.log('Updating item quantity:', id, quantity); // 打印更新的商品ID和数量
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const updateItemPrice = (itemId: number, value: string) => {
        setInputValues({ ...inputValues, [itemId]: value });
        // You may add validation logic here if needed
        // For simplicity, assuming the input is always valid
        const newCartItems = cartItems.map(item =>
            item.id === itemId ? { ...item, price: parseInt(value, 10) } : item
        );
        setCartItems(newCartItems);
    };

    // 数字选择器附加文本
    const updaAdditionalText = (id: number, additionalText: string) => {
        console.log('Updating item quantity:', id, additionalText);
        setCartItems(cartItems.map(item => item.id === id ? { ...item, additionalText } : item));
    };

    // 计算购物车中商品的总价
    const calculateTotalPrice = (): number => {
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    // 计算购物车中商品的总数
    const calculateTotalQuantity = (): number => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // 渲染购物车商品项
    const renderItem = ({ item }: { item: CartItem }) => {
        console.log('Rendering item:', item); // 添加渲染日志

        return (
            <View style={styles.cartItemContainer}>
                <View style={styles.cartItem}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'orangered' }}>{item.name}</Text>
                    <Text style={{ color: 'gray' }}>{item.additionalText}</Text>
                </View>
                {/* <TextInput
                    style={styles.input}
                    value={item.quantity.toString()}
                    onChangeText={text => updateItemQuantity(item.id, parseInt(text))}
                    keyboardType="numeric"
                /> */}

                {/* 更改金额 */}
                <View style={styles.cartItem}>
                    <TextInput
                        key={item.id} // 添加 key 属性
                        style={styles.input}
                        value={inputValues[item.id] !== undefined ? inputValues[item.id] : item.price.toString()}
                        onChangeText={(text: string) => updateItemPrice(item.id, text)}
                        keyboardType="numeric"
                    />
                    <Button title="Remove" onPress={() => removeItemFromCart(item.id, cartItems, setCartItems, navigation)} />
                </View>
                <View style={styles.cartItem}>
                    <Text style={{ color: 'gray' }}>商品金额: ${item.price.toFixed(2)}</Text>
                    <Text style={{ color: 'gray' }}>商品数量: {item.quantity.toFixed()}</Text>
                </View>
            </View>

        );
    };

    console.log('Current cart items:', cartItems); // 打印当前购物车中的商品列表

    const handleSubmit = () => {
        // 存储要提交的数据
        const dataToSubmit = [];

        // 遍历 cartItems
        for (const item of cartItems) {
            // 检查 item.price 是否为空、为 0 或为 NaN
            if (item.price === null || item.price === 0 || isNaN(item.price)) {
                // 如果满足条件，则不提交
                Alert.alert('提示0', '金额有误');
                console.log(`Item price is invalid for item: ${item.name}.`);
                return;
            }
            // 将有效的 item 添加到要提交的数据中
            dataToSubmit.push({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                id: item.id,
                additionalText: item.additionalText,
            });
        }
        // 打印要提交的数据
        console.log("Submitting the following data to backend:", dataToSubmit);
        console.log("Submitting to backend...");
        // 这里添加提交到后端的逻辑
        navigation.navigate('NewMScreen', { tabBarVisible: true });
    };


    const handleBatchUpdate = () => {
        const price = parseInt(batchPrice, 10);
        if (isNaN(price) || price === 0) {
            Alert.alert('警告', '金额不能为空或非有效金额0');
        } else {
            setCartItems(cartItems.map(item => ({ ...item, price: price })));
            setInputValues({}); // 清空输入框的值
            setBatchPrice(''); // 清空输入框
        }
    };

    // 所有删除按钮
    const handleRemoveAll = () => {
        setCartItems([]);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.batchUpdate}>
                <TouchableOpacity style={styles.batchUpdateButton} onPress={handleBatchUpdate}>
                    <TextInput
                        style={styles.batchUpdateInput}
                        placeholder="修改金额"
                        placeholderTextColor="gray"
                        value={batchPrice}
                        onChangeText={(text) => {
                            // 移除除数字和开头的0之外的其他字符
                            const formattedText = text.replace(/^0+(\d+)/, '$1').replace(/\D/g, '');
                            setBatchPrice(formattedText);
                        }}
                        keyboardType="numeric"
                    />
                    <Text style={{ color: 'darkgreen' }}>批量修改</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.batchUpdateButton} onPress={handleRemoveAll}>
                    <Text style={{ color: 'gray', left: -10 }}>删除全部</Text>
                </TouchableOpacity>
            </View>
            <VirtualizedList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                getItemCount={() => cartItems.length}
                getItem={(data, index) => data[index]}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ width: 100 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.totalText}>总数:</Text>
                        <Text style={styles.totalNumber}>{calculateTotalQuantity().toFixed()}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.totalText}>总额:</Text>
                        <Text style={styles.totalNumber}>${calculateTotalPrice().toFixed()}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>提交</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ShoppingCart;
export type { CartItem };
