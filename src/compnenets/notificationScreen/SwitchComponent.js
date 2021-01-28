
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef  } from "react";
import {View, Switch, StyleSheet, Platform,ToastAndroid} from "react-native";
import PreferencesStorage from "../../util/PreferencesStorage";
import XDate from "xdate";
import {inject, observer} from "mobx-react";
import {min} from "react-native-reanimated";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});



const CustomSwitch = (props) => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    let hours = 0;
    let minutes = 0;

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);



    const [isEnabled, setIsEnabled] = useState(props.isSelected);


    useEffect(() => {
        setIsEnabled(props.isSelected);
    }, [props.isSelected]);




    const getTime = () =>{

        let parts=props.userStore.prayersList[props.index].time.match(/^([0-1][0-9]|[2][0-3]).+([0-5][0-9]).+/);
        let prayerTime =  new XDate()
        prayerTime.setHours(parts[1],parts[2])

        hours = prayerTime.getHours()
        minutes = parseInt(prayerTime.getMinutes(), 10)
        //ToastAndroid.show(hours+":"+minutes, ToastAndroid.SHORT)
    }


    getTime()
    const toggleSwitch = () =>{!


        setIsEnabled(previousState => !previousState)

        if(!isEnabled) {

            schedulePushNotification(props.prayerName,hours,minutes,props.prayerPrefID )

        }else{

            cancelPushNotification(props.prayerPrefID)

        }
    };




    return (
        <View style={styles.container}>
            <Switch

                trackColor={{ false: "white", true: "white" }}
                thumbColor={isEnabled ? "#8CBF1F" : "#F2CB05"}
                ios_backgroundColor="white"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        transform:[{ scaleX: 1 }, { scaleY: 1 }],

    }
});


function cancelPushNotification(prayerPrefID){



    PreferencesStorage.getData(prayerPrefID).then(identifier => {

        //ToastAndroid.show(+"identifier ",identifier, ToastAndroid.SHORT)
        //console.log("cancel identifier = ",identifier)

        if(identifier.trim().length>0) {
            Notifications.cancelScheduledNotificationAsync(identifier).then(r => {
                PreferencesStorage.storeData(prayerPrefID, "")
            });
        }


    });

}

async function schedulePushNotification(prayerName,hours,minutes,prayerPrefID) {

    //cancelPushNotification(prayerName)

    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: prayerName,
            body: 'Its time to pray!!',
            data: { data: 'goes here' },
        },
        trigger: {
            hour: hours,
            minute: minutes,
            //seconds:5,
            repeats: true },
    });
    console.log("const identifier = ",identifier)

    await PreferencesStorage.storeData(prayerPrefID, identifier)

    //await Notifications.cancelScheduledNotificationAsync(identifier);
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}


export default CustomSwitch;
