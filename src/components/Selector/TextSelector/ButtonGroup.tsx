import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { useNumberContext } from '../../contexts/NumberContext';
import { Platform, ToastAndroid } from 'react-native';
import Toast from 'react-native-toast-message';

interface ButtonGroupProps {
    itemsPerRow: number;
    itemSize: number;
    height: number;
    Right: number;
    Left: number;
    defaultText: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    selectedButtonStyle?: StyleProp<ViewStyle>;
    defaultButtonTextValue: string[];
    generateAdditionalTextValue: (text: string) => string; // 新增的 prop，用于生成附加文本值
    onPress: (indexes: number[]) => void;
    textStyle?: StyleProp<TextStyle>;
    minSelectedCount: number; // 新增的 prop，用于确定所需的最小选定按钮数量
    onShowAddDataButtonChange: (AddDataButton: boolean) => void; // 新增的 prop，用于处理 showAddDataButton 的逻辑
    showAddDataButton: boolean;
    maxSelectedButtonCount: number; // 新增属性用于设置最大选中按钮数量
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
    Right,
    Left,
    itemsPerRow,
    itemSize,
    height,
    containerStyle,
    buttonStyle,
    selectedButtonStyle,
    defaultButtonTextValue,
    generateAdditionalTextValue,
    textStyle,
    minSelectedCount,
    onShowAddDataButtonChange,
    maxSelectedButtonCount, // 新增的属性
}: ButtonGroupProps) => {
    const windowWidth = Dimensions.get('window').width;
    const horizontalMargin = (windowWidth - Left - Right - itemsPerRow * itemSize) / (itemsPerRow + 1);
    const verticalMargin = horizontalMargin;
    const { selectedButtonIndexes, setSelectedButtonIndexes, setDefaultButtonTextValue, setGenerateAdditionalTextValue } = useNumberContext();

    useEffect(() => {
        // console.log("选定的按钮索引ID:", selectedButtonIndexes);
        // console.log("defaultButtonTextValue", selectedButtonIndexes.map(index => defaultButtonTextValue[index]));
        // console.log("generateAdditionalTextValue", selectedButtonIndexes.map(index => generateAdditionalTextValue(defaultButtonTextValue[index])));

        // 在这里计算弹出 showAddDataButton 的值，并将其传递给父组件处理
        const showAddDataButton = selectedButtonIndexes.length >= minSelectedCount;
        onShowAddDataButtonChange(showAddDataButton);
    }, [selectedButtonIndexes, defaultButtonTextValue, generateAdditionalTextValue]);

    // const handlePress = useCallback((index: number) => {
    //     setSelectedButtonIndexes(prevSelectedIndexes => {
    //         const indexInSelected = prevSelectedIndexes.indexOf(index);
    //         if (indexInSelected === -1) {
    //             return [...prevSelectedIndexes, index];
    //         } else {
    //             return prevSelectedIndexes.filter(i => i !== index);
    //         }
    //     });
    // }, []);

    useEffect(() => {
        // 在这里更新上下文中的值，当 selectedButtonIndexes 更新时触发
        setDefaultButtonTextValue(selectedButtonIndexes.map(index => defaultButtonTextValue[index]));
        setGenerateAdditionalTextValue(selectedButtonIndexes.map(index => generateAdditionalTextValue(defaultButtonTextValue[index])));
    }, [selectedButtonIndexes]);


    const handlePress = useCallback((index: number) => {
        setSelectedButtonIndexes(prevSelectedIndexes => {
            const indexInSelected = prevSelectedIndexes.indexOf(index);
            if (indexInSelected === -1) {
                // 检查当前选中按钮数量是否超过最大选中按钮数量
                if (prevSelectedIndexes.length < maxSelectedButtonCount) {
                    return [...prevSelectedIndexes, index];
                } else {
                    if (Platform.OS === 'android') {
                        // 在Android平台上使用ToastAndroid
                        ToastAndroid.show(`已经达到最大选中数量：${maxSelectedButtonCount}`, ToastAndroid.SHORT);
                    } else {
                        // 在iOS平台上使用Toast组件
                        Toast.show({
                            text1: '提示',
                            text2: `已经达到最大选中数量：${maxSelectedButtonCount}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                    }
                    return prevSelectedIndexes;
                }
            } else {
                return prevSelectedIndexes.filter(i => i !== index);
            }
        });
    }, [maxSelectedButtonCount]);










    const renderButton = useCallback((text: string, index: number) => {
        const isButtonSelected = selectedButtonIndexes.includes(index);
        return (
            <TouchableOpacity
                key={index.toString()} // You can replace text with a stable identifier if possible
                style={[
                    styles.item,
                    buttonStyle,
                    isButtonSelected ? selectedButtonStyle : null,
                    {
                        width: itemSize,
                        height: height,
                        marginLeft: index % itemsPerRow === 0 ? horizontalMargin : horizontalMargin / 2,
                        marginRight:
                            index % itemsPerRow === itemsPerRow - 1
                                ? horizontalMargin
                                : horizontalMargin / 2,
                        marginTop: verticalMargin / 2,
                        marginBottom: verticalMargin / 2,
                    },
                ]}
                onPress={() => handlePress(index)}
            >
                {text &&
                    <Text style={[
                        styles.defaultTextColor,
                        isButtonSelected ? { color: 'white' } : textStyle
                    ]}>
                        {text}
                    </Text>
                }

                <Text style={[
                    styles.additionalDefaultTextColor,
                    isButtonSelected ? { color: 'white' } : textStyle
                ]}>
                    {generateAdditionalTextValue(text)} {/* 使用传入的函数生成附加文本值 */}
                </Text>
            </TouchableOpacity>
        );
    }, [selectedButtonIndexes, textStyle, buttonStyle, selectedButtonStyle, itemsPerRow, itemSize, height, horizontalMargin, verticalMargin, handlePress, generateAdditionalTextValue]);

    const buttons = useMemo(() => defaultButtonTextValue.map(renderButton), [defaultButtonTextValue, renderButton]);

    return (
        <ScrollView>
            <View style={[styles.container, containerStyle]}>
                {buttons}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingVertical: 5,
    },
    item: {
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    defaultTextColor: {
        color: 'darkblue',
        fontSize: 20,
    },
    additionalDefaultTextColor: {
        fontSize: 12,
        color: 'gray',
    },
});

export default ButtonGroup;
