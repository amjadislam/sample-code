import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import DefaultBg from "../compnenets/DefaultBg";

import CircleSliderContainer from "../compnenets/tasbih/CircleSliderContainer";
import SetLocationDate from "../compnenets/homeScreen/SetLocationDate";
import {inject, observer} from "mobx-react";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import i18n from "i18n-js";



@inject('userStore')
@observer
class TasbihScreen extends Component{


    render() {
        return (
            <DefaultBg>
            <View style={styles.container}>
                <SetLocationDate   {...this.props} navigation={this.props.navigation}
                                   title ={i18n.t('tasbih')}
                />
                <CircleSliderContainer/>
                {/*<StatusBar style="auto" />*/}
            </View>
            </DefaultBg>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default TasbihScreen;
