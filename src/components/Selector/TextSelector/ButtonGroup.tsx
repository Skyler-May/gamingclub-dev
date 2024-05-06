import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { useNumberContext } from '../../Contexts/NumberContext';

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
    buttonText: string[];
    onPress: (indexes: number[]) => void;
    textStyle?: StyleProp<TextStyle>;
    buttonTextArray: string[];
    generateAdditionalText: (text: string) => string; // 新增的 prop，用于生成附加文本值

    minSelectedCount: number; // 新增的 prop，用于确定所需的最小选定按钮数量
    onShowAddDataButtonChange: (AddDataButton: boolean) => void; // 新增的 prop，用于处理 showAddDataButton 的逻辑
    showAddDataButton: boolean; // Add this line
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
    Right,
    Left,
    itemsPerRow,
    itemSize,
    height,
    containerStyle = {},
    buttonStyle = {},
    selectedButtonStyle = {},
    buttonText = [],
    onPress = (_indexes: number[]) => { },
    textStyle = {},
    buttonTextArray,
    generateAdditionalText,
    minSelectedCount,
    onShowAddDataButtonChange,

    showAddDataButton, // Add this line

}: ButtonGroupProps) => {
    const windowWidth = Dimensions.get('window').width;
    const horizontalMargin = (windowWidth - Left - Right - itemsPerRow * itemSize) / (itemsPerRow + 1);
    const verticalMargin = horizontalMargin;
    // const [selectedCount, setSelectedCount] = useState<number>(1);
    const {
        selectedButtonIndexes,
        setSelectedButtonIndexes,
        additionalTextValues: additionalValues,
        buttonText: contextButtonText
    } = useNumberContext();

    useEffect(() => {
        // setSelectedCount(selectedButtonIndexes.length);
        console.log("选定的按钮索引:", selectedButtonIndexes);
        console.log("选择的按钮文本：", selectedButtonIndexes.map(index => buttonText[index]));
        console.log("按钮附加文本值：", selectedButtonIndexes.map(index => generateAdditionalText(buttonText[index])));

        // 在这里计算弹出 showAddDataButton 的值，并将其传递给父组件处理
        const showAddDataButton = selectedButtonIndexes.length >= minSelectedCount;
        onShowAddDataButtonChange(showAddDataButton);
    }, [selectedButtonIndexes, buttonText, generateAdditionalText]);

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
                    {generateAdditionalText(text)} {/* 使用传入的函数生成附加文本值 */}
                </Text>
            </TouchableOpacity>
        );
    }, [selectedButtonIndexes, textStyle, buttonStyle, selectedButtonStyle, itemsPerRow, itemSize, height, horizontalMargin, verticalMargin, handlePress, generateAdditionalText]);

    const buttons = useMemo(() => buttonText.map(renderButton), [buttonText, renderButton]);

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
