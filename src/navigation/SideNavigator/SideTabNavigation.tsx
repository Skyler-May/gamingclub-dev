import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNumberContext } from '../../components/contexts/NumberContext';

interface Tab {
    label: string;
    content: JSX.Element;
    isSelected: boolean;
}

interface SideTabNavigationProps {
    tabs: Tab[];
    selectedTab: number;
    setSelectedTab: (index: number) => void;
}

const SideTabNavigation: React.FC<SideTabNavigationProps> = ({ tabs, selectedTab, setSelectedTab, }) => {
    const { setSelectedNumbers, setSelectedButtonIndexes, setShowAddDataButton, setPopupAddDataButton } = useNumberContext()

    const handleTabPress = (index: number) => {
        setSelectedTab(index);
        setSelectedNumbers([]);
        setSelectedButtonIndexes([]);
        setShowAddDataButton(false);
        setPopupAddDataButton(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabsContainer}>
                <ScrollView>
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tab, index === selectedTab && styles.selectedTab]}
                            onPress={() => handleTabPress(index)}>
                            <Text style={[styles.tabText, index === selectedTab && styles.selectedTabText]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.contentContainer}>
                {tabs[selectedTab].content}
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: '#ddd',
    },
    tabsContainer: {
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: '#ddd',
    },
    tab: {
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    selectedTab: {
        backgroundColor: '#4C7E8080',
        borderTopRightRadius: 25,
        borderBottomEndRadius: 25,
    },
    selectedTabText: {
        color: 'white',
    },
    tabText: {
        fontSize: 16,
        color: 'gray',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SideTabNavigation;