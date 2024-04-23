import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface UserInfo {
    name: string;
    email: string;
    avatar: string;
}

interface Props {
    user: UserInfo;
}

const PersonalCenter: React.FC<Props> = ({ user }) => {
    const handleOptionPress = (option: string) => {
        // 在这里执行相应的操作，比如导航到设置页面、个人资料页面等
        console.log(`Option "${option}" pressed.`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.options}>
                <Text style={styles.optionsTitle}>个人中心选项</Text>
                <TouchableOpacity onPress={() => handleOptionPress('设置')} style={styles.option}>
                    <Text>设置</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionPress('个人资料')} style={styles.option}>
                    <Text>个人资料</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionPress('安全设置')} style={styles.option}>
                    <Text>安全设置</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionPress('隐私设置')} style={styles.option}>
                    <Text>隐私设置</Text>
                </TouchableOpacity>
                {/* 这里可以添加更多选项 */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        color: '#666666',
        marginTop: 5,
    },
    options: {
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        paddingTop: 20,
    },
    optionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    option: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default PersonalCenter;
