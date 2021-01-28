import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import DefaultBg from "../compnenets/DefaultBg";
import SurahListAdapter from "../compnenets/surahScreen/SurahListAdapter";
import SetLocationDate from "../compnenets/homeScreen/SetLocationDate";
import {inject, observer} from "mobx-react";
import {PrayerTime, Surah} from "../stores/models";
import ProgrssDialog from "../compnenets/ProgrssDialog";
import PreferencesStorage from "../util/PreferencesStorage";
import {PREF_CONSTANTS} from "../stores/Constants";

import {ToastAndroid} from "react-native";
import UtilMethods from "../util/UtilMethods";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import i18n from "i18n-js";

@inject('userStore')
@observer
class SurahListScreen extends Component {

    state = {
        animating: false,
        surahsList: []
    }

    componentDidMount() {

        this.setState({animating: true})

        this.props.userStore.getSurahListing(() => {
            if (this.props.userStore.versusList.length == 0) {

                UtilMethods.getVersesData()
                    .then(verses => {

                        this.props.userStore.versusList = verses
                        this.setState({animating: false})

                    });
            } else {
                this.setState({animating: false})
            }
        })


    }

    render() {
        return (
            <View style={styles.progress_container}>
                <DefaultBg>
                    <View style={styles.container}>

                        <SetLocationDate {...this.props} navigation={this.props.navigation}
                                         title={i18n.t('quran')}
                        />
                        <SurahListAdapter
                            {...this.props}

                            surahsListing={this.props.userStore.surahsList}
                        />
                        {/*#03A63C*/}
                    </View>
                </DefaultBg>
                <ProgrssDialog  {...this.props} animating={this.state.animating} barColor={'white'}/>
            </View>

        )
            ;
    }

}

const styles = StyleSheet.create({

    progress_container: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection:'column'

    },
});

export default SurahListScreen;
