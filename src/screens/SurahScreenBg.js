import React,{Component} from "react";
import {StyleSheet, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


const SurahScreenBg  = props => {

    return (
            <View style={Styles.surahListContainer}>
                {props.children}
            </View>
        );
}

export const SurahScreenVerseBg  = props => {

    return (
        <View style={Styles.surahListRow}>
            {props.children}
        </View>
    );
}


export default SurahScreenBg;

const Styles = StyleSheet.create({
    surahListContainer: {
        flex: 1,
        bottom: 0,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        width: wp('100%'),
        padding:25,
        paddingBottom:50,
        resizeMode: 'stretch',


    },
    surahListRow: {
        flexDirection:'row',

        marginTop:10,
        borderRadius:15,
        backgroundColor:'#F9F9FC',
        padding:10,
        alignItems: 'center',
        resizeMode: 'stretch',

    },
});
