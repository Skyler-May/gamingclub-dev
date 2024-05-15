# 数字选择器使用方法

## 说明：

```bash
import React from 'react';
import { View, StyleSheet } from 'react-native';
import NumberSelector from '../../components/Selectors/NumberSelector';

# 父组件
const ParentComponent: React.FC = () => {

    # 声明函数 
    function handleNumberSelect(number: string | number): void {
        console.log('Selected number:', number);
    }

    # 声明样式函数
    //============================================================================
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
        let fontSize = 16; // 默认字体大小

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

    // 定义 selectedNumberButtonText 函数
    const selectedNumberButtonText = (index: number): TextStyle => {
        return { color: 'white' };
    }

    //===========================================================================

    return (
        <View style={styles.container}>
            <NumberSelector
                itemSize={60}                   # 元素宽高相等 (接受数字)
                itemsPerRow={5}                 # 每行个数 (接受数字)
                onSelect={handleNumberSelect}   # 调用函数 (接受函数)
                length={10}                     # 元素长度 (接受数字)
                left={0}                        # 预留屏幕左边尺寸 (接受数字)
                right={0}                       # 预留屏幕右边尺寸 (接受数字)
                startFromOne={true}             # 渲染数字索引开始，0 或 1 (接受false 或 true)
                prependZero={false}             # 渲染数字格式 小于 10 前置 0 (接受false 或 true)
				additionalText={""}				# 自定义添加的文本 (接受字符串 或 "")
				renderText={false}				# 控制索引渲染 (接受false 或 true)

                # 按钮选择样式
                selectedNumberButtonStyle={selectedNumberButtonStyle}
                selectedNumberButtonText={selectedNumberButtonText}
                NumberButtonDefaultTextStyle={NumberButtonDefaultTextStyle}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    // 设置函数接受的指定已知属性
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

export default ParentComponent;
```