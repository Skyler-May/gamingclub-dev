import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import GamesLobbyScreen from './src/screens/GamesLobbyScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TestScreen from './src/screens/TestScreen';
import NewMScreen from './src/games/lhc/newam/screens/NewMScreen';
import { NumberProvider } from './src/games/lhc/newam/contexts/NumberContext';
import ShopScreen from './src/components/shop/ShopScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NumberProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="NewMScreen" component={NewMScreen} />
          <Stack.Screen name="ShopScreen" component={ShopScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NumberProvider>
  );
};

const TabNavigator = () => {

  return (
    <Tab.Navigator>
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
