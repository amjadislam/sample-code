import React from 'react';
import { createStackNavigator, } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BottomTabs from "./src/compnenets/bottomNavigation/BottomNavigationTabs";
import {Provider} from 'mobx-react';
import userStore from './src/stores/UserStore';

import {loadLocalization} from "./src/util/Strings";

const Stack = createStackNavigator();

const stores = {userStore};

export default function App() {
    return (
      <Provider {...stores}>
        <BottomTabs/>
      </Provider>
    );

}

loadLocalization()



const AppNavigator = () => {
  return (
      <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerTitle: false,
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerShown: false,
          }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />

      </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
