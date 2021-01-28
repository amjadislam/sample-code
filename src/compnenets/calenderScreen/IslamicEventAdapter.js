import React, {Component} from "react";

import {FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import SurahScreenBg, {SurahScreenVerseBg} from "../../screens/SurahScreenBg";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import IslamicEventRow from "./IslamicEventRow";
import SurahListRow from "../surahScreen/SurahListRow";
import IslamicEvent from "../../stores/model/IslamicEvent";
import PrayerCalenderDate from "../../stores/model/PrayerCalenderDate";
import i18n from "i18n-js";


class IslamicEventAdapter extends Component{


    state = {
        calenderData:[],
        events : {}
    }

    constructor(props) {
        super(props);

    }

    static getDerivedStateFromProps(props, current_state){

        if(current_state.calenderData !== props.calenderData){
            let newData =  IslamicEventAdapter.getIslamicEvents(props.calenderData)
            return {
                calenderData: props.calenderData,
                events: newData,
            }

        }

        return null
    }

    static getIslamicEvents(calenderData:[]){
        let datest = []

        if(calenderData !== null) {
            for (let i = 0; i < 30; i++) {
                if(calenderData.get(i)?.date?.hijri?.holidays?.length>0) {

                    let prayerCalenderDate:PrayerCalenderDate = calenderData.get(i).date;
                    let id = i;
                    let eventName:String = prayerCalenderDate?.hijri?.holidays?.get(0);
                    let islamicMonth:String =prayerCalenderDate?.hijri?.month.en;
                    let islamicDay:String =prayerCalenderDate?.hijri?.day;
                    let islamicYear:String =prayerCalenderDate?.hijri?.year;
                    let islamicAbbreviated = prayerCalenderDate?.hijri?.designation?.abbreviated
                    let islamicDate = islamicDay+" "+islamicMonth+" "+islamicYear+" "+islamicAbbreviated;
                    let gregorianDate:String = prayerCalenderDate?.gregorian?.date;
                    datest.push(new IslamicEvent(id,eventName,islamicDate,gregorianDate));


                }
            }
        }

        return datest;

    }


    render() {
        return(
            <View>
                <View style={Styles.container}>
                    <Text style={Styles.surahListTitle}>{i18n.t('next_islamic_events')}</Text>

                    {(this.state.events.length>0) && (
                        <FlatList style={{flex: 1}}
                                  data={this.state.events}
                                  renderItem={({item}) =>
                                      <IslamicEventRow islamicEvent={item}/>
                                  }/>
                    )}
                    {this.state.events==0 && (
                        <Text style={Styles.noItemTitle}>{i18n.t('noIslamicEvent')}</Text>
                    )}



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
    noItemTitle: {
        fontSize:15,
        marginTop:45,
        textAlign:'center',
        color:'white',
        width: wp('100%'),
        alignSelf:'center',
        resizeMode: 'stretch',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        width: wp('100%'),

        // resizeMode: 'stretch',
        // alignSelf: 'stretch',
    },


});

export default IslamicEventAdapter;
