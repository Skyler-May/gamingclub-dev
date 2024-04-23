import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions, TextStyle, ViewStyle, Button } from 'react-native';
import { useNumberContext } from '../Contexts/NumberContext';

interface NumberSelectorProps {
    // 默认属性
    onSelect: (number: string | number) => void;
    length: number;
    itemSize: number;
    itemsPerRow: number;
    left: number;
    right: number;
    startFromOne?: boolean;
    prependZero?: boolean;
    additionalText?: string;
    renderText?: boolean;

    // 按钮选中长度弹出其他组件
    selectedNumbers?: number;

    // 按钮选中及默认样式
    selectedNumberButtonStyle: (index: number) => ViewStyle;
    selectedNumberButtonText: (index: number) => TextStyle;
    NumberButtonDefaultTextStyle: (index: number) => TextStyle;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({
    onSelect,
    length,
    itemSize,
    left,
    right,
    itemsPerRow,
    startFromOne,
    prependZero,
    additionalText,
    renderText,

    selectedNumberButtonStyle,
    selectedNumberButtonText,
    NumberButtonDefaultTextStyle,
}) => {
    const windowWidth = Dimensions.get('window').width;
    const horizontalMargin = (windowWidth - left - right - itemsPerRow * itemSize) / (itemsPerRow + 1);
    const verticalMargin = horizontalMargin;
    // const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const { selectedNumbers, setSelectedNumbers, setAdditionalText } = useNumberContext();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            paddingVertical: 5,
        },
        item: {
            width: itemSize,
            height: itemSize,
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            // borderWidth: 1,
            // borderColor: 'gray',
        },
    });

    // 弹出指定组件
    const [selectedCount, setSelectedCount] = useState(1);

    useEffect(() => {
        setSelectedCount(selectedNumbers.length);
        console.log(selectedNumbers);
    }, [selectedNumbers]);

    // 处理选择逻辑
    const handleNumberSelect = (number: number) => {
        const formattedNumber = prependZero && number < 10 ? `0${number}` : `${number}`;
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
        } else {
            setSelectedNumbers([...selectedNumbers, number]);
        }
        onSelect(formattedNumber.toString());
        console.log('Additional Text:', additionalText);

        // 只有在 additionalText 有值时才调用 setAdditionalText 函数 (这条代码分成重要)
        if (additionalText !== undefined) {
            setAdditionalText(additionalText);
        }
    };

    // 定义起始索引
    const startIndex = startFromOne ? 1 : 0;

    return (
        <ScrollView>
            <View style={styles.container}>
                {Array.from({ length }, (_, index) => index + startIndex).map((number, index) => (
                    <TouchableOpacity
                        key={number.toString()}
                        style={[
                            styles.item,
                            {
                                marginLeft: index % itemsPerRow === 0 ? horizontalMargin : 0,
                                marginBottom: index < length - itemsPerRow ? verticalMargin : 0,
                                marginRight: horizontalMargin,
                            },
                            // 设置按钮选中后样式背景色
                            selectedNumbers.includes(number) && selectedNumberButtonStyle(index)
                        ]}
                        onPress={() => handleNumberSelect(number)}
                    >
                        {renderText &&
                            <Text style={[
                                NumberButtonDefaultTextStyle(index),
                                selectedNumbers.includes(number) && selectedNumberButtonText(index)
                            ]}
                            >
                                {prependZero && number < 10 ? `0${number}` : `${number}`}
                            </Text>}
                        {additionalText &&
                            <Text style={[
                                { fontSize: 12, color: 'gray' },
                                selectedNumbers.includes(number) &&
                                selectedNumberButtonText(index)]}>
                                {additionalText}
                            </Text>
                        }
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView >
    );
};

export default NumberSelector;
