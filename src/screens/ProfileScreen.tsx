import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PersonalCenter from '../components/user/PersonalCenter';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <PersonalCenter user={{ name: 'John Doe', email: 'john@example.com', avatar: 'https://file.moyublog.com/d/file/2021-02-21/751d49d91fe63a565dff18b3b97ca7c8.jpg' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666666',
    },
});

export default ProfileScreen;
