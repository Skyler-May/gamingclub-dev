import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

interface getLotteryResultsProps {
    expect?: string;
    openCode?: string;
    zodiac?: string;
    openTime?: string;
    wave?: string;
    info?: string;
}

type LotteryResult = {
    expect: string;
    openCode: string;
    zodiac: string;
    openTime: string;
    wave: string;
    info: string;
};

const getLotteryResults: React.FC<getLotteryResultsProps> = ({ }) => {
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
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ expect }) => expect}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'darkblue' }}>
                                    {/* 渲染开奖号码 */}
                                    <View style={{ backgroundColor: item.wave.split(',')[0], padding: 5, borderRadius: 5, marginRight: 5 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{item.openCode.split(',')[0]}</Text>

                                    </View>
                                    <View style={{ backgroundColor: item.wave.split(',')[1], padding: 5, borderRadius: 5, marginRight: 5 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{item.openCode.split(',')[1]}</Text>
                                    </View>
                                    <View style={{ backgroundColor: item.wave.split(',')[2], padding: 5, borderRadius: 5, marginRight: 5 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{item.openCode.split(',')[2]}</Text>
                                    </View>
                                    <View style={{ backgroundColor: item.wave.split(',')[3], padding: 5, borderRadius: 5, marginRight: 5 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{item.openCode.split(',')[3]}</Text>
                                    </View>
                                    <View style={{ backgroundColor: item.wave.split(',')[4], padding: 5, borderRadius: 5, marginRight: 5 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{item.openCode.split(',')[4]}</Text>
                                    </View>
                                    <View style={{ backgroundColor: item.wave.split(',')[5], padding: 5, borderRadius: 5, marginRight: 5 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{item.openCode.split(',')[5]}</Text>
                                    </View>
                                    {/* 加号 */}
                                    <View style={{ marginRight: 5 }}>
                                        <Text style={{ fontSize: 16 }}>+</Text>
                                    </View>
                                    {/* 最后一个开奖号码 */}

                                </View>


                                <View style={styles.zodiacContainer}>
                                    {/* 渲染生肖 */}
                                    <View style={styles.zodiacItem}>
                                        <Text style={styles.zodiacText}>{item.zodiac.split(',')[0]}</Text>
                                    </View>
                                    <View style={styles.zodiacItem}>
                                        <Text style={styles.zodiacText}>{item.zodiac.split(',')[1]}</Text>
                                    </View>
                                    <View style={styles.zodiacItem}>
                                        <Text style={styles.zodiacText}>{item.zodiac.split(',')[2]}</Text>
                                    </View>
                                    <View style={styles.zodiacItem}>
                                        <Text style={styles.zodiacText}>{item.zodiac.split(',')[3]}</Text>
                                    </View>
                                    <View style={styles.zodiacItem}>
                                        <Text style={styles.zodiacText}>{item.zodiac.split(',')[4]}</Text>
                                    </View>
                                    <View style={styles.zodiacItem}>
                                        <Text style={styles.zodiacText}>{item.zodiac.split(',')[5]}</Text>
                                    </View>
                                    {/* 最后一个生肖 */}
                                    {/* <View style={{ padding: 5, borderRadius: 5 }}>
                                        <Text style={styles.zodiacText}>{item.zodiac.split(',')[6]}</Text>
                                    </View> */}
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text>第期: {item.expect} </Text>
                                    <Text>第期: {item.expect} </Text>
                                    <Text>第期: {item.expect} </Text>
                                    <Text>第期: {item.expect} </Text>
                                    {/* <Text>开奖时间: {item.openTime}</Text> */}
                                    {/* <Text>信息: {item.info}</Text> */}
                                </View>
                                <View style={{
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    backgroundColor: 'green',
                                    flex: 1,
                                    height: 200,
                                }}>
                                    <View style={{ backgroundColor: item.wave.split(',')[6], borderRadius: 20, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{item.openCode.split(',')[6]}</Text>
                                    </View>
                                    <View style={{ backgroundColor: 'red', borderRadius: 5 }}>
                                        <Text style={{ fontSize: 14 }}>{item.zodiac.split(',')[6]}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    zodiacContainer: {
        flexDirection: 'row',
        backgroundColor: 'blue',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    zodiacItem: {
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },

    zodiacText: {
        fontSize: 16,
        color: '#000',
        backgroundColor: '#ddd',
    },
})

export default getLotteryResults;
