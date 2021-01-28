import * as React from 'react';
import {Image, StyleSheet, Text, View,Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Component} from "react";
import HomeScreen from "../../screens/HomeScreen";
import QiblaFinderScreen from "../../screens/QiblaFinderScreen";
import SurahListScreen from "../../screens/SurahListScreen";
import CalenderScreen from "../../screens/CalenderScreen";
import TasbihScreen from "../../screens/TasbihScreen";
import SurahDetailScreen from "../../screens/SurahDetailScreen";
import NotificationsSettingScreen from "../../screens/NotificationsSettingScreen";
import LocationScreen from "../../screens/LocationScreen";
import createStackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import {inject, observer} from "mobx-react";
import * as Constants from "../../stores/Constants";
import CommonDataManager from "../../util/CommonDataManager";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


@inject('userStore')
@observer
class BottomTabs extends Component {


  render() {
    return (
      <>
        <NavigationContainer>
          <MyTabs/>
        </NavigationContainer>
      </>
    );

  }


}

function SetTabIcon(props) {
  return (
    <Image
      source={props.value}
      style={{width: hp('3%'), height: hp('3%'), tintColor: props.color, resizeMode: 'contain'}}
    />
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#8CBF1F',
        style: {
          // Remove border top on both android & ios
          /* borderTopColor: "transparent",
           elevation: 0,
           shadowColor: '#5bc4ff',
           borderTopWidth: 0,*/

          elevation: 10,


            height:Platform.OS === 'ios' ? hp('12%') : hp('9%'),


          position: 'absolute',
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
        }
      }
      }
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
            unmountOnBlur:true,
            tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <SetTabIcon value={require('../../../assets/icon_home.png')} color={color}/>

          ),
        }}
      />

      <Tab.Screen
        name="QiblaScreen"
        component={QiblaStackScreen}
        options={{
            unmountOnBlur:true,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <SetTabIcon value={require('../../../assets/icon_kibla_finder.png')} color={color}/>
          ),
        }}
      />

      <Tab.Screen
        name="SurahScreen"
        component={SurahStackScreen}
        options={{
            unmountOnBlur:true,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <SetTabIcon value={require('../../../assets/icon_surah.png')}
                        color={color}/>
          ),
        }}
      />

      <Tab.Screen
        name="CalenderScreen"
        component={CalenderStackScreen}
        options={{
            unmountOnBlur:true,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <SetTabIcon value={require('../../../assets/icon_calendar.png')} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="TasbihScreen"
        component={TasbihStackScreen}
        options={{
            unmountOnBlur:true,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <SetTabIcon value={require('../../../assets/icon_tasbih.png')} color={color}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
    >
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="Location" component={LocationScreen}/>
      <HomeStack.Screen name="Setting" component={NotificationsSettingScreen}/>
    </HomeStack.Navigator>
  );
}



const SurahStack = createStackNavigator();

function SurahStackScreen() {
    if(CommonDataManager.getInstance().isLocationSet()) {
        return (
            <SurahStack.Navigator
                screenOptions={{headerShown: false}}
            >
                <SurahStack.Screen name="SurahListScreen" component={SurahListScreen}/>
                <SurahStack.Screen name="SurahDetailScreen" component={SurahDetailScreen}/>
                <SurahStack.Screen name="Location" component={LocationScreen}/>
                <SurahStack.Screen name="Setting" component={NotificationsSettingScreen}/>
            </SurahStack.Navigator>
        );
    }else {
        return (
            <TasbihStack.Navigator
                screenOptions={{headerShown: false}}>
                <TasbihStack.Screen name="Location" component={LocationScreen}/>
            </TasbihStack.Navigator>
        );
    }
}

const QiblaStack = createStackNavigator();

function QiblaStackScreen() {
    if(CommonDataManager.getInstance().isLocationSet()) {
        return (
            <QiblaStack.Navigator
                screenOptions={{headerShown: false}}
            >
            <QiblaStack.Screen name="QiblaScreen" component={QiblaFinderScreen}/>
            <QiblaStack.Screen name="Location" component={LocationScreen}/>
            <QiblaStack.Screen name="Setting" component={NotificationsSettingScreen}/>
        </QiblaStack.Navigator>
        );
    }
    else{
        return (
            <TasbihStack.Navigator
                screenOptions={{headerShown: false}}>
                <TasbihStack.Screen name="Location" component={LocationScreen}/>
            </TasbihStack.Navigator>
    );
}
}

const CalenderStack = createStackNavigator();

function CalenderStackScreen() {

    if(CommonDataManager.getInstance().isLocationSet()) {
        return (
            <CalenderStack.Navigator
                screenOptions={{headerShown: false}}
            >
                <CalenderStack.Screen name="CalenderScreen" component={CalenderScreen}/>
                <CalenderStack.Screen name="Location" component={LocationScreen}/>
                <CalenderStack.Screen name="Setting" component={NotificationsSettingScreen}/>
            </CalenderStack.Navigator>
        );
    }
    else{
            return (
                <TasbihStack.Navigator
                    screenOptions={{headerShown: false}}>
                    <TasbihStack.Screen name="Location" component={LocationScreen}/>
                </TasbihStack.Navigator>
            );
        }

}


const TasbihStack = createStackNavigator();

function TasbihStackScreen() {

    if(CommonDataManager.getInstance().isLocationSet()) {

        return (
            <TasbihStack.Navigator
                screenOptions={{headerShown: false}}
            >
                <TasbihStack.Screen name="TasbihScreen" component={TasbihScreen}/>
                <TasbihStack.Screen name="Location" component={LocationScreen}/>
                <TasbihStack.Screen name="Setting" component={NotificationsSettingScreen}/>
            </TasbihStack.Navigator>
        );
    }else{
        return (
            <TasbihStack.Navigator
                screenOptions={{headerShown: false}}>
                <TasbihStack.Screen name="Location" component={LocationScreen}/>
            </TasbihStack.Navigator>
        );
    }
}

function LocationScreenReq(){


}


export default BottomTabs;
