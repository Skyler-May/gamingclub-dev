import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddDataButton from "../../../../components/Buttons/AddDataToCartsButton";
import SideTabNavigation from "../../../../navigation/SideNavigator/SideTabNavigation";
import { useNumberContext } from "../../../../components/contexts/NumberContext";

import PagesSwitch from "../../../../navigation/PagesSwitchNavigation/PagesSwitchNavigation";
import SpecialNumberScreenA from "./specialNumberScreens/SpecialNumberScreenA";
import SpecialNumberScreenB from "./specialNumberScreens/SpecialNumberScreenB";
import GetLotteryResults from "../../../../services/GetLotteryResults";
import CountdownTimer from "../../../../components/Timer/CountdownTimer";
import SpecialZodiacScreen from "./SpecialZodiacScreen/SpecialZodiacScreen";
import TwoSpecialZodiacScreen from "./CombinationZodiacScreens/TwoSpecialZodiacScreen/TwoSpecialZodiacScreen";
import ThreeSpecialZodiacScreen from "./CombinationZodiacScreens/ThreeSpecialZodiacScreen/ThreeSpecialZodiacScreen";
import FourSpecialZodiacScreen from "./CombinationZodiacScreens/FourSpecialZodiacScreen/FourSpecialZodiacScreen";
import FiveSpecialZodiacScreen from "./CombinationZodiacScreens/FiveSpecialZodiacScreen/FiveSpecialZodiacScreen";

interface Tab {
    label: string;
    content: JSX.Element;
    isSelected: boolean;
}

const NewMScreen: React.FC = () => {
    const { showAddDataButton, popupAddDataButton, selectedTab, setSelectedTab } = useNumberContext();

    const pages = {
        shop: [
            { key: '1', component: <SpecialNumberScreenA />, title: 'TM A' },
            { key: '2', component: <SpecialNumberScreenB />, title: 'TM B' },
        ],
        hotle: [
            { key: '1', component: <SpecialZodiacScreen />, title: 'TX' },
        ],
        milkteashop: [
            { key: '1', component: <TwoSpecialZodiacScreen />, title: '2L' },
            { key: '2', component: <ThreeSpecialZodiacScreen />, title: '3L' },
            { key: '3', component: <FourSpecialZodiacScreen />, title: '4L' },
            { key: '4', component: <FiveSpecialZodiacScreen />, title: '5L' },
        ],
    };

    const tabs: Tab[] = [
        {
            label: 'TM',
            content: <View key="TM"><PagesSwitch pages={pages.shop} /></View>,
            isSelected: false,
        },
        {
            label: 'TX',
            content: <View key="TX"><PagesSwitch pages={pages.hotle} /></View>,
            isSelected: false,
        },
        {
            label: 'LX',
            content: <View key="LX"><PagesSwitch pages={pages.milkteashop} /></View>,
            isSelected: false,
        },
        {
            label: '咖啡店',
            content: <View key="CoffeeShop"><Text>Content of Tab 4</Text></View>,
            isSelected: false,
        },
    ];

    // 在父组件中定义计算函数
    const calculateExpect = (expect: string): number => {
        return parseInt(expect) + 1;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', height: 50, }}>
                    <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'green', fontSize: 20 }}>
                            {/* <GetLotteryResults showExpect={true} /> */}
                            余额：99999
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '50%', }}>
                        <Text>
                            <GetLotteryResults calculateExpect={calculateExpect} />
                        </Text>
                        <Text style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <CountdownTimer />
                        </Text>
                    </View>
                </View>
                <View style={{ marginLeft: 10, height: 100, }}>
                    <Text><GetLotteryResults showExpect={true} showOpenCode={true} showZodiac={true} showWave={true} /></Text>
                </View>
            </View>
            <SideTabNavigation tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {popupAddDataButton && <AddDataButton />}
            {showAddDataButton && <AddDataButton />}
        </View >
    );


};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        // backgroundColor: 'darkblue',
        height: 150,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
        borderColor: 'gray',
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

export default NewMScreen;