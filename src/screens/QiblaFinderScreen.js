import React, {Component} from 'react';
import {StyleSheet, Text, View,ToastAndroid} from "react-native";
import {StatusBar} from "expo-status-bar";
import DefaultBg from "../compnenets/DefaultBg";
import {QiblaCompass} from "../compnenets/finderQibla/QiblaCompass";

import {inject, observer} from "mobx-react";
import SetLocationDate from "../compnenets/homeScreen/SetLocationDate";
import PreferencesStorage from "../util/PreferencesStorage";
import {PREF_CONSTANTS} from "../stores/Constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import i18n from "i18n-js";



@inject('userStore')
@observer
class QiblaFinderScreen extends Component{





    componentDidMount() {

        PreferencesStorage.getData(PREF_CONSTANTS.USER_LATITUDE)
            .then(lat => {

                PreferencesStorage.getData(PREF_CONSTANTS.USER_LONGITUDE)
                    .then(lng => {

                        this.props.userStore.getQibleDirection(lat,lng)

                    });

            });
    }


    onLocationUpdate(address) {
        //console.log('Click happened Parent');
        //ToastAndroid.show(address, ToastAndroid.SHORT)
        //this.getUserLocation().then((locationEnabled: boolean) => this.loadHomeDataWithLocation());

        PreferencesStorage.getData(PREF_CONSTANTS.USER_LATITUDE)
            .then(lat => {

                PreferencesStorage.getData(PREF_CONSTANTS.USER_LONGITUDE)
                    .then(lng => {

                        this.props.userStore.getQibleDirection(lat,lng)

                    });

            });

    }

    render() {
        return (
            <DefaultBg>
                <View style={styles.container}>
                <SetLocationDate
                    {...this.props}
                    navigation={this.props.navigation}
                    onLocationUpdate = {
                        (address) => this.onLocationUpdate(address)
                    }

                    title ={i18n.t('qiblaFounder')}
                />
                <QiblaCompass qiblaDirection={this.props.userStore.qiblaDirection}/>
                </View>


            </DefaultBg>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop:50,

    },
});


export default QiblaFinderScreen;
