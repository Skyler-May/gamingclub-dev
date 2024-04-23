import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // 这里你可以添加搜索的逻辑
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={handleSearch}
                value={searchQuery}
                placeholder="Serch..."
                placeholderTextColor="#ff0000" // 这里设置占位符文本的颜色为红色
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#000',

    },
    input: {
        height: 40,
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 10,

    },
});

export default SearchBar;
