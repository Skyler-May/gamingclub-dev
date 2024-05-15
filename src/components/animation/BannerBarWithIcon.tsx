import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextTicker from 'react-native-text-ticker';

interface BannerBarWithIconProps {
    BannerBarText: string;
}

const BannerBarWithIcon: React.FC<BannerBarWithIconProps> = ({ BannerBarText }) => {
    return (
        <View style={styles.container}>
            {/* 左侧的小喇叭图标 */}
            <View style={styles.BannerBarIconContainer}>
                <Text>&#x1F4E2;</Text>
            </View>
            {/* 滚动文本 */}
            <View style={styles.textContainer}>
                <TextTicker
                    style={styles.text}
                    duration={20000}
                    loop
                    bounce
                    repeatSpacer={50} // 根据需要调整间距
                    marqueeDelay={0}
                    useNativeDriver
                >
                    <Text>{BannerBarText}</Text>
                </TextTicker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        // backgroundColor: '#fff', // 为了方便查看容器位置，这里设置了背景色为白色
        borderRadius: 5,
    },
    BannerBarIconContainer: {
        marginRight: 10,
    },
    textContainer: {
        // backgroundColor: '#fff',

        flex: 1,
    },
    text: {
        fontSize: 16,
        textAlign: 'right',
        color: '#FF7800',
    },
});

export default BannerBarWithIcon;

