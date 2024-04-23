// GamesLobbyScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
// import { RootStackParamList } from '../../../../types';

// 导入导航参数类型

const GamesLobbyScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const goToNewMScreen = () => {
        // 传递正确的导航参数类型
        navigation.navigate('NewMScreen', { tabBarVisible: true });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>游戏大厅</Text>
            <TouchableOpacity
                onPress={goToNewMScreen}
                style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: 'blue',
                    borderRadius: 10,
                    width: 200,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Text style={{ color: 'white', }}>New M Screen</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GamesLobbyScreen;
