import * as Notifications from "expo-notifications";
import XDate from "xdate";
import {Platform, StyleSheet, Switch, View} from "react-native";
import PreferencesStorage from "./PreferencesStorage";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import {useRef, useState} from "react";
import i18n from "i18n-js";
import {PREF_CONSTANTS} from "../stores/Constants";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

let hours = 0;
let minutes = 0;

export default class NotificationsUtil {


    static registerAllNotifications = async (prayersList) => {

        console.log("registerAllNotifications 1")
        registerForPushNotificationsAsync().then(token => {

            if (prayersList != null && prayersList.length > 0) {

                getTime(0, prayersList)
                schedulePushNotification(i18n.t('fajr_prayer'), hours, minutes, 'fajar1111').then(r => {
                    getTime(1, prayersList)
                    schedulePushNotification(i18n.t('dhuhr_prayer'), hours, minutes, 'Dhuhr1111').then(r => {
                        getTime(2, prayersList)
                        schedulePushNotification(i18n.t('asar_prayer'), hours, minutes, 'Asar1111').then(r => {
                            getTime(3, prayersList)
                            schedulePushNotification(i18n.t('maghrib_prayer'), hours, minutes, 'Maghrib1111').then(r => {
                                getTime(4, prayersList)
                                schedulePushNotification(i18n.t('isha_prayer'), hours, minutes, 'Isha1111')

                            })

                        })

                    })

                })


                PreferencesStorage.storeData(PREF_CONSTANTS.USER_FIRST_TIME_NOTIFICATIONS, JSON.stringify(true))
            }

        })

    }

}


const getTime = (index, prayersList) => {

    let parts = prayersList[index].time.match(/^([0-1][0-9]|[2][0-3]).+([0-5][0-9]).+/);
    let prayerTime = new XDate()
    prayerTime.setHours(parts[1], parts[2])

    hours = prayerTime.getHours()
    minutes = parseInt(prayerTime.getMinutes(), 10)

}


async function schedulePushNotification(prayerName, hours, minutes, prayerPrefID) {

    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: prayerName,
            body: i18n.t('itsTimeToPray'),
            data: {data: 'goes here'},
        },
        trigger: {
            hour: hours,
            minute: minutes,
            //seconds: 5,
            repeats: true
        },
    });
    console.log("const identifier = ", identifier)
    await PreferencesStorage.storeData(prayerPrefID, identifier).then(r => {
            return 1
        }
    )

}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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
