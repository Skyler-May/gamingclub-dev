import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddDataButton from "../../../../components/Buttons/AddDataButton";
import SideTabNavigation from "../../../../components/SideNavigator/SideTabNavigation";
import { useNumberContext } from "../../../../components/Contexts/NumberContext";

import PagesSwitch from "../../../../components/Switch/PagesSwitch";
import SpecialNumberA from "../components/specialNumbers/SpecialNumberA";
import SpecialNumberB from "../components/specialNumbers/SpecialNumberB";
import GetLotteryResults from "../components/dataSource/GetLotteryResults";
import CountdownTimer from "../../../../components/Timer/CountdownTimer";


interface Tab {
    label: string;
    content: JSX.Element;
    isSelected: boolean;
}

const NewMScreen: React.FC = () => {
    const { selectedNumbers } = useNumberContext();
    const shouldShowAddDataButton = selectedNumbers.length >= 1;

    const pages = [
        { key: '1', component: <SpecialNumberA />, title: '商店 A' },
        { key: '2', component: <SpecialNumberB />, title: '商店 B' },
        // { key: '3', component: <SpecialNumberA />, title: '饭店' },
        // { key: '4', component: <SpecialNumberA />, title: '咖啡店' },
    ];

    const [selectedTab, setSelectedTab] = useState<number>(0);

    const tabs: Tab[] = [
        {
            label: '商店',
            content: <View><PagesSwitch pages={pages} /></View>,
            isSelected: false, // 初始化 isSelected 属性
        },
        {
            label: '酒店',
            content: <View><Text>Content of Tab 2</Text></View>,
            isSelected: false,
        },
        {
            label: '奶茶店',
            content: <View><Text>Content of Tab 3</Text></View>,
            isSelected: false,
        },
        {
            label: '咖啡店',
            content: <View><Text>Content of Tab 4</Text></View>,
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
            {shouldShowAddDataButton && <AddDataButton />}
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