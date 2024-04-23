// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import AddDataButton from '../../components/Buttons/AddDataButton';
// import DataComponent from '../../utils/api/api';


// const TestScreen = () => {
//     const handleAddDataPress = () => {
//         // 在此处定义按下按钮时的逻辑
//         console.log('Add data button pressed');
//     };

//     return (
//         <View style={styles.container}>
//             {/* 传递 handleAddDataPress 函数作为 onPress 属性 */}
//             {/* <AddDataButton /> */}
//             <DataComponent />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: '#F9AB80',
//     },
// });

// export default TestScreen;

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

type LotteryResult = {
    expect: string;
    openCode: string;
    zodiac: string;
    openTime: string;
    wave: string;
    info: string;
};

const App = () => {
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
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ expect }) => expect}
                    renderItem={({ item }) => (
                        <View>
                            <Text>期数: {item.expect}</Text>
                            <Text>开奖号码: {item.openCode}</Text>
                            <Text>生肖: {item.zodiac}</Text>
                            <Text>开奖时间: {item.openTime}</Text>
                            <Text>波色: {item.wave}</Text>
                            <Text>信息: {item.info}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default App;