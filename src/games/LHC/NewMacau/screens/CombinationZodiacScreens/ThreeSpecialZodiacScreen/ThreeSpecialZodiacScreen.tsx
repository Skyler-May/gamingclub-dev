import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonGroup from '../../../../../../components/Selector/TextSelector/ButtonGroup';
import { useNumberContext } from "../../../../../../components/contexts/NumberContext";

const ThreeSpecialZodiacScreen = () => {
    const defaultButtonTextValue: string[] = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    ];

    // 生成附加文本值的函数
    const generateAdditionalTextValue = (text: string): string => {
        return text === 'e' ? '8.5' : '10.5';
    };

    // 处理按钮点击事件
    const handlePress = (_index: number): void => {
        console.log(`Button ${ButtonGroup} pressed.`);
    };

    // 处理多个按钮点击事件
    const handleMultiplePress = (indexes: number[]): void => {
        console.log('Selected button indexes:', indexes);
        indexes.forEach((index) => handlePress(index));
    };

    // 处理弹出 showAddDataButton 的逻辑
    const { showAddDataButton, setShowAddDataButton } = useNumberContext()
    const handleShowAddButtonChange = (showAddDataButton: boolean) => {
        setShowAddDataButton(showAddDataButton);
    };

    return (
        <View style={styles.container}>
            {/* 使用 ButtonGroup 组件 */}
            <ButtonGroup
                itemsPerRow={2}
                itemSize={120}
                height={60}
                containerStyle={styles.buttonGroupContainer}
                buttonStyle={styles.button}
                selectedButtonStyle={styles.selectedButton}
                defaultButtonTextValue={defaultButtonTextValue}
                onPress={handleMultiplePress}
                Left={100}
                Right={0}
                defaultText={true}
                generateAdditionalTextValue={generateAdditionalTextValue} // 传递生成附加文本值的函数
                minSelectedCount={3} // 设置所需的最小选定按钮数量
                onShowAddDataButtonChange={handleShowAddButtonChange} // 传递处理 showAddDataButton 的回调函数
                showAddDataButton={showAddDataButton}
                maxSelectedButtonCount={12}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
    },
    buttonGroupContainer: {
        // marginTop: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'black',
    },
});

export default ThreeSpecialZodiacScreen;