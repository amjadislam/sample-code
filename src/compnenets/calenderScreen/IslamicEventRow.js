import React, {Component} from "react";

import {StyleSheet, Text,View} from "react-native";
import SurahScreenBg, {SurahScreenVerseBg} from "../../screens/SurahScreenBg";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import IslamicEvent from "../../stores/model/IslamicEvent";


class IslamicEventRow extends Component{

    state = {
        islamicEvent : new IslamicEvent()
    }
    constructor(props) {
        super(props);

        this.state.islamicEvent = props.islamicEvent
    }


    render() {
        return(
            <View>
                <View style={Styles.container}>
                    <SurahScreenVerseBg>
                        <View style={{flex:1,padding: 10, flexDirection:'row',alignItems: 'center'}}>
                            <View style={{flex:1}}>
                                <Text style={{fontSize:17, color:'#03A63C',}}> {this.state.islamicEvent.eventName}</Text>
                                <Text style={{fontSize:15, color:'black',}}>{this.state.islamicEvent.islamicDate}</Text>
                            </View>
                            <Text style={{fontSize:15, color:'black',marginLeft:10}}>{this.state.islamicEvent.gregorianDate}</Text>
                        </View>
                    </SurahScreenVerseBg>

                </View>
            </View>
        );
    }


}
const Styles = StyleSheet.create({


    surahListTitle: {


        fontSize:20,
        padding:15,

        color:'white',
        width: wp('100%'),

        resizeMode: 'stretch',
    },
    container: {
        alignItems: 'center',

        width: wp('100%'),
        paddingLeft: 10,
        paddingRight:10,

        // resizeMode: 'stretch',
        // alignSelf: 'stretch',
    },


});

export default IslamicEventRow;
