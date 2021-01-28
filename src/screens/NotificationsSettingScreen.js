import React, {Component} from "react";
import DefaultBg from "../compnenets/DefaultBg";

import SurahScreenBg, {SurahScreenVerseBg} from "./SurahScreenBg";
import {StyleSheet, Image, Text, View, ScrollView} from "react-native";

import NotificationSetting from "../compnenets/notificationScreen/NotificationSetting";
import SetLocationDate from "../compnenets/homeScreen/SetLocationDate";
import {inject, observer} from "mobx-react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import i18n from "i18n-js";


@inject('userStore')
@observer
class NotificationsSettingScreen extends Component {

    render() {
        return (
            <DefaultBg>
                <View style={styles.container}>

                    <SetLocationDate
                        {...this.props}
                        navigation={this.props.navigation}/>
                    <SurahScreenBg>
                        <Image style={styles.appIcon} source={require('../../assets/wamy_brasil_icon.png')}/>


                        <ScrollView style={{flex: 1}}>
                            <NotificationSetting icon={require('../../assets/icon_fajar.png')}
                                                 prayerName={i18n.t('fajr_prayer')} index = {0}
                                                 prayerPrefID = {'fajar1111'}
                            />
                            <NotificationSetting icon={require('../../assets/icon_dhuhr.png')}
                                                 prayerName={i18n.t('dhuhr_prayer')} index = {1}
                                                 prayerPrefID = {'Dhuhr1111'}
                            />
                            <NotificationSetting icon={require('../../assets/icon_asr.png')}
                                                 prayerName={i18n.t('asar_prayer')} index = {2}
                                                 prayerPrefID = {'Asar1111'}
                            />
                            <NotificationSetting icon={require('../../assets/icon_maghrib.png')}
                                                 prayerName={i18n.t('maghrib_prayer')}  index = {3}
                                                 prayerPrefID = {'Maghrib1111'}
                            />
                            <NotificationSetting icon={require('../../assets/icon_isha.png')}
                                                 prayerName={i18n.t('isha_prayer')}  index = {4}
                                                 prayerPrefID = {'Isha1111'}
                            />
                            <View style={{height: 50}}/>


                        </ScrollView>


                    </SurahScreenBg>

                </View>
            </DefaultBg>

        );

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    appIcon: {
        width: wp('90%'),
        height: hp('14%'),
        resizeMode: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        // alignItems:'center',
        // justifyContent:'center'

    },
});

export default NotificationsSettingScreen;
