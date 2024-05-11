/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Appearance, Keyboard, Platform, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';

import HomeScreen from './src/screens/Home/HomeScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import GamesLobbyScreen from './src/screens/Game/GamesLobbyScreen';

import TestScreen from './src/screens/Test/TestScreen';
import { NumberProvider } from './src/components/contexts/NumberContext';
import ShopScreen from './src/components/Shop/ShopScreen';
import NewMScreen from './src/games/LHC/NewMacau/screens/NewMScreen';
import { useEffect, useState } from 'react';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const containerStyle = { flex: 1, backgroundColor: theme === 'dark' ? 'black' : 'white' };
  const textStyle = { color: theme === 'dark' ? 'white' : 'black' };

  return (
    <NumberProvider>
      <View style={containerStyle}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="NewMScreen" component={NewMScreen} options={{ headerTitleAlign: 'center' }} />
            <Stack.Screen name="Shop" component={ShopScreen} options={{ headerTitleAlign: 'center' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </NumberProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// 在这里定义 TabNavigator 组件
const TabNavigator = () => {
  // 使用 React.useState 定义状态
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  // 使用 React.useEffect 处理键盘显示和隐藏事件
  React.useEffect(() => {
    // 添加键盘显示事件监听器
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    // 添加键盘隐藏事件监听器
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // 返回清理函数，在组件卸载时移除事件监听器
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []); // useEffect 的第二个参数为空数组，表示仅在组件挂载和卸载时执行一次

  // 返回底部导航栏
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          display: isKeyboardVisible ? 'none' : 'flex', // 根据键盘是否可见来控制底部导航栏的显示
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '首页',
          headerTitleAlign: 'center',
          tabBarIcon: () => (
            <Icon name="home-outline" size={30} color="#900" />
          ),
        }}
      />
      <Tab.Screen
        name="Games"
        component={GamesLobbyScreen}
        options={{
          tabBarLabel: '游戏',
          headerTitleAlign: 'center',
          tabBarIcon: () => (
            <Icon name="game-controller-outline" size={30} color="#900" />
          ),
        }}
      />
      <Tab.Screen
        name="Personal Center"
        component={ProfileScreen}
        options={{
          tabBarLabel: '个人中心',
          headerTitleAlign: 'center',
          tabBarIcon: () => (
            <Icon name="person-outline" size={30} color="#900" />
          ),
        }}
      />
      <Tab.Screen name="TestPage"
        component={TestScreen}
        options={{
          tabBarLabel: '测试页',
          headerTitleAlign: 'center',
          tabBarIcon: () => (
            <Icon name="logo-react" size={30} color="#900" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;


























// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type { PropsWithChildren } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({ children, title }: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
