import React from 'react';
import { View } from 'react-native';
import GetLotteryResults from '../../games/LHC/NewMacau/components/dataSource/GetLotteryResults';


const TestScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <GetLotteryResults />
        </View>
    );
};

export default TestScreen;
