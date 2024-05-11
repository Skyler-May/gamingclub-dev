import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNumberContext } from '../../components/contexts/NumberContext';

interface PagesSwitchProps {
    pages: {
        key: string;
        component: ReactNode;
        title: string;
    }[];
}

const PagesSwitch: React.FC<PagesSwitchProps> = ({ pages }) => {
    const [currentPage, setCurrentPage] = useState<string>(pages[0].key);
    const scrollViewRef = useRef<ScrollView>(null);
    const { setTitle, setSelectedNumbers, setSelectedButtonIndexes } = useNumberContext(); // 获取setTitle方法

    const renderPage = () => {
        const page = pages.find(p => p.key === currentPage);
        return page ? page.component : null;
    };

    const scrollToPage = (index: number) => {
        setCurrentPage(pages[index].key);
        scrollViewRef.current?.scrollTo({ x: index * 80, animated: true });
        setSelectedNumbers([]);
        setSelectedButtonIndexes([]);
    };

    // 设置标题到上下文
    useEffect(() => {
        const currentPageData = pages.find(page => page.key === currentPage);
        if (currentPageData) {
            console.log('setTitle:', currentPageData.title); // 打印日志
            setTitle(currentPageData.title);

        }
    }, [currentPage, pages, setTitle]);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                contentContainerStyle={styles.menu}
                style={styles.scrollView}
            >
                {pages.map((page, index) => (
                    <TouchableOpacity
                        key={page.key}
                        onPress={() => scrollToPage(index)}
                        style={[styles.button, currentPage === page.key && styles.selectedButton]}
                    >
                        <Text style={[styles.menuText, currentPage === page.key ? styles.selectedText : { color: 'gray' }]}>{page.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.page}>
                {renderPage()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: '#eee',
    },
    scrollView: {
        maxHeight: 40, // 设置ScrollView的最大高度
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5, // 调整左右内边距
        paddingVertical: 5, // 调整上下内边距
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 25,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    selectedButton: {
        backgroundColor: 'darkblue',
    },
    menuText: {
        fontSize: 12,
    },
    selectedText: {
        color: 'white',
    },
    page: {
        flex: 1,
    },
});

export default PagesSwitch;
