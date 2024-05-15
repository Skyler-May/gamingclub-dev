import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

interface GetLotteryResultsProps {
    showExpect?: boolean;
    showOpenCode?: boolean;
    showZodiac?: boolean;
    showOpenTime?: boolean;
    showWave?: boolean;
    showInfo?: boolean;
    shouldCalculateExpect?: boolean; // 新增属性来控制是否计算期数
    calculateExpect?: (expect: string) => number;
}

type LotteryResult = {
    expect: string;
    openCode: string;
    zodiac: string;
    openTime: string;
    wave: string;
    info: string;
};

const GetLotteryResults: React.FC<GetLotteryResultsProps> = ({
    showExpect = false,
    showOpenCode = false,
    showZodiac = false,
    showOpenTime = false,
    showWave = false,
    showInfo = false,
    shouldCalculateExpect = false, // 新增属性来控制是否计算期数
    calculateExpect
}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<LotteryResult[]>([]);

    const getLotteryResults = async () => {
        try {
            const response = await fetch('https://api.macaumarksix.com/api/live2');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLotteryResults();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ expect }) => expect}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, }}>
                            <View style={{ flex: 1 }}>
                                {showExpect && !shouldCalculateExpect && <Text style={{ color: 'gray' }}>第 {item.expect} 期 开奖结果</Text>}
                                {calculateExpect && <Text style={{ color: 'gray' }}>第 {calculateExpect(item.expect)} 期 截止</Text>}
                                {showOpenTime && <Text style={{ color: 'gray' }}>开奖时间: {item.openTime}</Text>}
                                {showInfo && <Text style={{ color: 'gray' }}>信息: {item.info}</Text>}
                            </View>

                            <View style={{ flexDirection: 'row', }}>
                                {showOpenCode && showZodiac &&
                                    [...Array(6)].map((_, index) => (
                                        <View style={styles.openCodeWithzodiacContainer} key={index}>
                                            <View style={{ backgroundColor: item.wave.split(',')[index], borderRadius: 20, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 16, color: 'white' }}>{item.openCode.split(',')[index]}</Text>
                                            </View>
                                            <View style={styles.zodiacContainer}>
                                                <Text style={{ fontSize: 16, color: 'gray' }}>{item.zodiac.split(',')[index]}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                                {showWave && (
                                    <View style={styles.openCodeWithzodiacContainer}>
                                        <View style={{ borderRadius: 20, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gray' }}>+</Text>
                                        </View>
                                    </View>
                                )}
                                {showOpenCode && showZodiac && (
                                    <View style={styles.openCodeWithzodiacContainer}>
                                        <View style={{ backgroundColor: item.wave.split(',')[6], borderRadius: 20, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16, color: 'white' }}>{item.openCode.split(',')[6]}</Text>
                                        </View>
                                        <View style={styles.zodiacContainer}>
                                            <Text style={{ fontSize: 16, color: 'gray' }}>{item.zodiac.split(',')[6]}</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}
                />
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'blue',
    },

    openCodeWithzodiacContainer: {
        alignItems: 'center',
        margin: 2,
        // backgroundColor: 'cornsilk',
    },
    zodiacContainer: {
        borderRadius: 20,
        width: 30,
        height: 30,
        // backgroundColor: 'cornsilk',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default GetLotteryResults;
