// import React from 'react';
// import { StyleSheet, View, Image, Text } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import PersonalCenter from '../../components/Usre/Profile/PersonalCenter';

// interface UserInfo {
//     name: string;
//     email: string;
//     avatar: string;
// }

// const ProfileScreen: React.FC = () => {
//     const user: UserInfo = {
//         name: 'John Doe',
//         email: 'john@example.com',
//         avatar: 'https://t7.baidu.com/it/u=3691080281,11347921&fm=193&f=jpg'
//     };

//     return (
//         <LinearGradient
//             colors={['#FF9966', '#FF5E62']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.gradient}
//         >
//             <View style={styles.container}>
//                 <PersonalCenter user={user} />
//             </View>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     gradient: {
//         flex: 1,
//     },
// });

// export default ProfileScreen;


import React from 'react';
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';

const App = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Text>Pull down to see RefreshControl indicator</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;