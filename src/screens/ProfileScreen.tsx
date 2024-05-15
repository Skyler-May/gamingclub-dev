import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.avatar}
            />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
            <Text style={styles.bio}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed finibus tortor ac odio consequat, quis ullamcorper libero vehicula.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default ProfileScreen;
