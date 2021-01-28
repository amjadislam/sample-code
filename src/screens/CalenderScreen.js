import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {StatusBar} from "expo-status-bar";
import DefaultBg from "../compnenets/DefaultBg";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Calender from "../compnenets/calenderScreen/Calender";


import IslamicEventAdapter from "../compnenets/calenderScreen/IslamicEventAdapter";
import {inject, observer} from "mobx-react";
import PrayerDateTime from "../stores/model/PrayerDateTime";
import NextPrayerCell from "../compnenets/homeScreen/NextPrayerCell";
import SetLocationDate from "../compnenets/homeScreen/SetLocationDate";
import PreferencesStorage from "../util/PreferencesStorage";
import {PREF_CONSTANTS} from "../stores/Constants";
import {PrayerTime} from "../stores/models";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import i18n from "i18n-js";


@inject('userStore')
@observer
class CalenderScreen extends Component {


    state = {
        calenderData: [],
        dates: {}
    }

    static getDerivedStateFromProps(props, current_state) {

        /*        if(current_state.calenderData !== props.calenderData){

                    let newData =  Calender.MapHijriDates(props.calenderData)

                    return {
                        calenderData: props.calenderData,
                        dates: newData,
                    }

                }*/

        return null
    }

    /*static getIslamicEvents(calenderData:[]){
        let datest = {}

       /!* if(calenderData !== null) {
            for (let i = 0; i < 30; i++) {
                //ToastAndroid.show(calenderData.get(i).date.gregorian.day+ " / " +calenderData.get(i).date.hijri.day, ToastAndroid.SHORT);
                datest[calenderData.get(i).date.gregorian.day] = calenderData.get(i).date.hijri.day

            }
        }*!/

        return datest;

    }*/

    componentDidMount() {
        PreferencesStorage.getData(PREF_CONSTANTS.USER_LATITUDE)
            .then(lat => {

                PreferencesStorage.getData(PREF_CONSTANTS.USER_LONGITUDE)
                    .then(lng => {

                        this.props.userStore.getCalendar((prayerTimes: PrayerTime[]) => {

                        }, lat, lng)

                    });

            });
    }

    getCurrentDate() {

        const monthNames = [
            i18n.t('january') ,i18n.t('february') , i18n.t('march'),
            i18n.t('april') ,i18n.t('may') , i18n.t('june'),
            i18n.t('july') , i18n.t('august') ,i18n.t('september') ,
            i18n.t('october'),i18n.t('november') , i18n.t('december')
        ]
        let today = new Date();
        let date =/*today.getDate() + " "+*/ monthNames[today.getMonth()] /*+" "+ today.getFullYear()*/;

        return date
    }

    render() {
        return (
            <DefaultBg>

                <View style={styles.container}>
                    <SetLocationDate
                        {...this.props}
                        navigation={this.props.navigation}
                        title={i18n.t('calendar')}
                    />
                    <ScrollView style={{flex: 1,}} contentContainerStyle={{alignItems: 'center'}}>
                        <View style={{
                            flex: 1, flexDirection: 'row', marginRight: 15, marginLeft: 15,

                        }}>

                            <Text style={{fontSize: wp("4%"), color: 'white'}}>
                                {this.getCurrentDate()} / {this.props.userStore.islamicMonth}
                            </Text>

                        </View>

                        <Calender  {...this.props} calenderData={this.props.userStore.prayerDateTimeList}/>
                        <IslamicEventAdapter {...this.props} calenderData={this.props.userStore.prayerDateTimeList}/>
                        <View style={{height: 100}}/>
                    </ScrollView>
                </View>

            </DefaultBg>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,

        alignItems: 'center',
    },

});

export default CalenderScreen;
