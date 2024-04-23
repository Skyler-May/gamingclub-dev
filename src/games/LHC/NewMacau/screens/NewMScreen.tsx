import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddDataButton from "../../../../components/Buttons/AddDataButton";
import SideTabNavigation from "../../../../components/SideNavigator/SideTabNavigation";
import { useNumberContext } from "../../../../components/Contexts/NumberContext";

import PagesSwitch from "../../../../components/Switch/PagesSwitch";
import SpecialNumberA from "../components/specialNumbers/SpecialNumberA";
import SpecialNumberB from "../components/specialNumbers/SpecialNumberB";


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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#ddd' }}>Herder</Text>
            </View>
            <SideTabNavigation tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {shouldShowAddDataButton && <AddDataButton />}
        </View>
    );


};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'darkblue',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        borderWidth: 1,
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