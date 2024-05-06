import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem } from '../Shop/ShoppingCart';

// 定义上下文
interface NumberContextType {
    // 数字选择器
    selectedNumbers: number[];
    setSelectedNumbers: React.Dispatch<React.SetStateAction<number[]>>;
    handleNumberSelect: (number: number) => void;
    selectedCount: number; // 新增的状态
    additionalText?: string;
    setAdditionalText: React.Dispatch<React.SetStateAction<string>>;

    // 文本选择器
    selectedButtonIndexes: number[];
    setSelectedButtonIndexes: React.Dispatch<React.SetStateAction<number[]>>;
    additionalTextValues: { [key: string]: string };
    buttonText: string[];
    handlePress: (index: number, buttonText: string[]) => void;

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
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    currentPage: string;
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>;

    // 弹出 Add 按钮
    showAddButton: boolean;
    setshowAddButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const NumberContext = createContext<NumberContextType | undefined>(undefined);

// 提供上下文的组件
export const NumberProvider: React.FC<any> = ({ children }) => {

    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [selectedCount, setSelectedCount] = useState(0); // 新增的状态
    const [currentPage, setCurrentPage] = useState<string>(''); // 新增 PagesSwitch 组件 状态
    const [additionalText, setAdditionalText] = useState<string>(''); // 新增 PagesSwitch 组件 title 状态
    const [title, setTitle] = useState<string>(''); // 获取 PagesSwitch 中的 title
    const [showAddButton, setshowAddButton] = useState<boolean>(false); // 新增 ButtonGraup 组件状态
    // ================================数字选择器======================================
    useEffect(() => {
        setSelectedCount(selectedNumbers.length);
        console.log(selectedNumbers);
    }, [selectedNumbers]);

    const handleNumberSelect = (number: number) => {
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
        } else {
            setSelectedNumbers([...selectedNumbers, number]);
        }
    };
    // ================================数字选择器======================================
    // ================================文本选择器======================================
    const [selectedButtonIndexes, setSelectedButtonIndexes] = useState<number[]>([]);

    useEffect(() => {
        setSelectedCount(selectedButtonIndexes.length);
    }, [selectedButtonIndexes]);

    const handlePress = useCallback((index: number) => {
        setSelectedButtonIndexes(prevSelectedIndexes => {
            const indexInSelected = prevSelectedIndexes.indexOf(index);
            if (indexInSelected === -1) {
                return [...prevSelectedIndexes, index];
            } else {
                return prevSelectedIndexes.filter(i => i !== index);
            }
        });
    }, []);
    // ================================文本选择器======================================
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
        // 数字选择器
        selectedNumbers,
        setSelectedNumbers,
        handleNumberSelect,
        selectedCount,
        additionalText,
        setAdditionalText,

        // 文本选择器
        selectedButtonIndexes,
        setSelectedButtonIndexes,
        additionalTextValues: {},
        buttonText: [],
        handlePress,

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

        // 弹出 Add 按钮
        showAddButton,
        setshowAddButton,
        currentPage,
        setCurrentPage,
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