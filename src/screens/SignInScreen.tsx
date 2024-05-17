// screens/SignInScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../types';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        navigation.navigate('HomeScreen', { tabBarVisible: true });
    };

    const handleRegister = async () => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert('Registration Success', `Welcome, ${userCredential.user.email}!`);
            navigation.navigate('HomeScreen', { tabBarVisible: true });
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('Registration Error', error.message);
            } else {
                Alert.alert('Unexpected Error', String(error));
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Sign In" onPress={handleSignIn} />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
    },
});

export default SignInScreen;
