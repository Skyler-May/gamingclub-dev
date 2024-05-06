import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonGroup from '../../../../../../components/Selector/TextSelector/ButtonGroup';
import { useNumberContext } from '../../../../../../components/Contexts/NumberContext';

const TwoSpecialZodiacScreen = () => {
    const buttonTextArray: string[] = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
    ];

    // 生成附加文本值的函数
    const generateAdditionalText = (text: string): string => {
        return text === 'A' ? '9.5' : '11.5';
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

    // // 处理 shopsubmit 的逻辑
    // const [shopsubmit, setShopsubmit] = useState<boolean>(false); // 控制提交按钮的状态
    const { showAddButton, setshowAddButton } = useNumberContext()
    const handleShopSubmitChange = (submit: boolean) => {
        setshowAddButton(submit);
    };

    return (
        <View style={styles.container}>
            {/* 使用 ButtonGroup 组件 */}
            <ButtonGroup
                itemsPerRow={2}
                itemSize={100}
                height={50}
                containerStyle={styles.buttonGroupContainer}
                buttonStyle={styles.button}
                selectedButtonStyle={styles.selectedButton}
                buttonText={buttonTextArray}
                onPress={handleMultiplePress}
                Left={100}
                Right={0}
                defaultText={true}
                buttonTextArray={buttonTextArray}
                generateAdditionalText={generateAdditionalText} // 传递生成附加文本值的函数
                minSelectedCount={1} // 设置所需的最小选定按钮数量
                onShopSubmitChange={handleShopSubmitChange} // 传递处理 shopsubmit 的回调函数
                shopsubmit={showAddButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    buttonGroupContainer: {
        marginTop: 10,
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

export default TwoSpecialZodiacScreen;