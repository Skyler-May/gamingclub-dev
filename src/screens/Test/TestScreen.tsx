import React from 'react';
import { View } from 'react-native';
import GetLotteryResults from '../../services/GetLotteryResults';
import CountdownTimer from '../../components/Timer/CountdownTimer';


const TestScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            {/* <GetLotteryResults
                showExpect={true}
                showOpenCode={true}
                showZodiac={true}
            // showOpenTime={false}
            // showWave={true}
            // showInfo={false}
            /> */}
            <CountdownTimer />
        </View>
    );
};

export default TestScreen;


