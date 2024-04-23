import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../Shop/ShoppingCart';

// 定义上下文
interface NumberContextType {
    selectedNumbers: number[];
    setSelectedNumbers: React.Dispatch<React.SetStateAction<number[]>>;
    handleNumberSelect: (number: number) => void;
    selectedCount: number; // 新增的状态

    additionalText?: string;
    setAdditionalText: React.Dispatch<React.SetStateAction<string>>;

    // 购物车相关上下文
    cartItems: CartItem[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    updateItemPrice: (id: number, price: number) => void;
    calculateTotalPrice: () => number;
    calculateTotalQuantity: () => number;

    // 页面切换器 标题
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;// 添加用于设置title的方法
}

const NumberContext = createContext<NumberContextType | undefined>(undefined);

// 提供上下文的组件
export const NumberProvider: React.FC<any> = ({ children }) => {

    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [selectedCount, setSelectedCount] = useState(0); // 新增的状态
    const [additionalText, setAdditionalText] = useState<string>('');
    // 获取 PagesSwitch 中的 title
    const [title, setTitle] = useState<string>(''); // 添加title状态和设置title的方法

    // ================================选择器======================================
    const handleNumberSelect = (number: number) => {
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
        } else {
            setSelectedNumbers([...selectedNumbers, number]);
        }
    };
    // ================================选择器======================================
    // ================================购物车======================================
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    console.log('NumberDataProvider is called with selectedNumbers:', selectedNumbers, 'and cartItems:', cartItems);
    console.log('Using NumberDataContext with selectedNumbers:', selectedNumbers, 'and cartItems:', cartItems);
    console.log('Using NumberDataContext with additionalText:', additionalText, 'and cartItems:', cartItems);

    const addItemToCart = (item: CartItem) => {
        console.log('Adding item to cart:', item);
        setCartItems([...cartItems, item]);
    };

    const removeItemFromCart = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const updateItemQuantity = (id: number, quantity: number) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const updateItemPrice = (id: number, price: number) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, price } : item));
    };

    const calculateTotalPrice = (): number => {
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    // 计算购物车中商品的总数
    const calculateTotalQuantity = (): number => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const updaAdditionalText = (id: number, additionalText: string) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, additionalText } : item));
    };
    // ================================购物车======================================

    const contextValue: NumberContextType = {
        selectedNumbers,
        setSelectedNumbers,
        handleNumberSelect,
        selectedCount,

        additionalText,
        setAdditionalText,

        // 购物车相关上下文
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        updateItemPrice,
        calculateTotalPrice,
        calculateTotalQuantity,

        // 页面切换器相关
        title,
        setTitle,

    };

    return (
        <NumberContext.Provider value={contextValue}>
            {children}
        </NumberContext.Provider>
    );
};

// 自定义钩子，用于在子组件中访问上下文
export const useNumberContext = () => {
    const context = useContext(NumberContext);
    if (!context) {
        throw new Error('useNumberContext must be used within a NumberProvider');
    }
    return context;
};