import React from 'react';
import { View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import NumberSelector from '../../../../../components/Selector/NumberSelector/NumberSelector';
import { useNumberContext } from "../../../../../components/contexts/NumberContext";

const SpecialNumberScreenA = () => {
    const handleNumberSelectParent = (number: string | number) => {

        console.log(`Number ${number} selected in parent component.`);
    };

    // 定义 selectedNumberButtonStyle 函数
    const getColorByIndex = (index: number): string => {
        if (
            index === 0 || index === 1 || index === 6 || index === 7 || index === 11 || index === 12 ||
            index === 17 || index === 18 || index === 22 || index === 23 || index === 28 || index === 29 ||
            index === 33 || index === 34 || index === 39 || index === 44 || index === 45
        ) {
            return 'red';
        } else if (
            index === 2 || index === 3 || index === 8 || index === 9 || index === 13 || index === 14 ||
            index === 19 || index === 24 || index === 25 || index === 30 || index === 35 || index === 36 ||
            index === 40 || index === 41 || index === 46 || index === 47
        ) {
            return 'blue';
        } else {
            return 'green';
        }
    };

    const selectedNumberButtonStyle = (index: number): ViewStyle => {
        // 根据颜色返回相应的样式
        const color = getColorByIndex(index);

        switch (color) {
            case 'red':
                return styles.selectedNumberButtonRed;
            case 'blue':
                return styles.selectedNumberButtonBlue;
            case 'green':
                return styles.selectedNumberButtonGreen;
            default:
                return {}; // 默认样式
        }
    };

    const NumberButtonDefaultTextStyle = (index: number): TextStyle => {
        // 根据颜色返回相应的样式
        const color = getColorByIndex(index);
        let fontSize = 20; // 默认字体大小

        switch (color) {
            case 'red':
                return { color: 'red', fontSize };
            case 'blue':
                return { color: 'blue', fontSize };
            case 'green':
                return { color: 'green', fontSize };
            default:
                return { color: '', fontSize }; // 默认颜色和字体大小
        }
    };

    const selectedNumberButtonText = (): TextStyle => {
        return { color: 'white' };
    }

    // 使用上下文 管理弹出 AddDataButton 状态
    const { popupAddDataButton, setPopupAddDataButton } = useNumberContext()
    const handlePopupAddDataButtonChange = (popupAddDataButton: boolean) => {
        setPopupAddDataButton(popupAddDataButton);
    };

    return (
        <View style={styles.container}>
            <NumberSelector
                itemSize={60}
                itemsPerRow={4}
                onSelect={handleNumberSelectParent}
                length={49}
                left={100}
                right={0}
                startFromOne={true}
                prependZero={true}
                renderText={true}
                additionalText={"波音747"}
                maxSelectedNumberCount={4}

                selectedNumberButtonStyle={selectedNumberButtonStyle}
                NumberButtonDefaultTextStyle={NumberButtonDefaultTextStyle}
                selectedNumberButtonText={selectedNumberButtonText}
                minSelectedNumberCount={1} // 设置弹出 AddDataButton 按钮的长度
                onPopupAddDataButtonChange={handlePopupAddDataButtonChange}
                popupAddDataButton={popupAddDataButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'green',
    },
    selectedNumberButtonRed: {
        backgroundColor: 'red',
    },

    selectedNumberButtonBlue: {
        backgroundColor: 'blue',
    },

    selectedNumberButtonGreen: {
        backgroundColor: 'green',
    },
});


export default SpecialNumberScreenA;
